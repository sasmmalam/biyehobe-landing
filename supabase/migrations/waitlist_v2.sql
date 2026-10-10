-- waitlist_v2 — server-side waitlist with double opt-in, referrals and
-- Founding Members. Pair: waitlist_v2_ROLLBACK.sql.
--
-- Run the whole file in one go in the Supabase SQL editor. It is one
-- transaction: if anything below raises, nothing is changed.
--
-- After this, the anon key can no longer read or write `waitlist` at all.
-- Only the service role (app/api/waitlist, app/waitlist/confirm) touches it.
-- Deploy the new site code together with this migration: the OLD form inserts
-- with the anon key and will start failing as soon as the policy is dropped.

BEGIN;

-- 1. Stop if two rows share an email ignoring case; the unique index below
--    would fail on them. Nothing is changed; the message lists the emails.
DO $$
DECLARE
  dupes text;
BEGIN
  SELECT string_agg(format('%s (x%s)', e, n), ', ')
    INTO dupes
    FROM (
      SELECT lower(email) AS e, count(*) AS n
        FROM public.waitlist
       GROUP BY lower(email)
      HAVING count(*) > 1
    ) d;
  IF dupes IS NOT NULL THEN
    RAISE EXCEPTION 'waitlist_v2 stopped, nothing changed. Duplicate emails (ignoring case): %', dupes;
  END IF;
END $$;

-- 2. New columns.
ALTER TABLE public.waitlist
  ADD COLUMN IF NOT EXISTS gender text CHECK (gender IN ('female', 'male')),
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS referral_code text UNIQUE,
  ADD COLUMN IF NOT EXISTS referred_by text,
  ADD COLUMN IF NOT EXISTS ip_hash text,
  ADD COLUMN IF NOT EXISTS is_founding boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed')),
  ADD COLUMN IF NOT EXISTS confirm_token_hash text,
  ADD COLUMN IF NOT EXISTS confirm_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS confirmed_at timestamptz,
  ADD COLUMN IF NOT EXISTS consent_text text;

-- 3. Everyone already on the list joined before confirmation emails existed.
--    They are kept as 'confirmed' so they stay on the list and count in the
--    totals; confirmed_at stays NULL, which is how to tell them apart.
--    (Remove this statement to leave them 'pending' instead.)
UPDATE public.waitlist SET status = 'confirmed';

-- 4. One row per email, ignoring case.
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_lower_key
  ON public.waitlist (lower(email));

-- Lookups the route handler makes on every request.
CREATE INDEX IF NOT EXISTS waitlist_ip_hash_created_at_idx
  ON public.waitlist (ip_hash, created_at);
CREATE INDEX IF NOT EXISTS waitlist_confirm_token_hash_idx
  ON public.waitlist (confirm_token_hash);

-- 5. The browser may no longer insert. RLS stays on with no anon policy, so
--    anon and authenticated can neither read nor write; the service role
--    bypasses RLS.
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist;

-- 6. Report any policy still on the table (expected: none).
DO $$
DECLARE
  remaining text;
BEGIN
  SELECT string_agg(policyname, ', ')
    INTO remaining
    FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'waitlist';
  IF remaining IS NOT NULL THEN
    RAISE WARNING 'waitlist still has these policies, check them: %', remaining;
  END IF;
END $$;

COMMIT;
