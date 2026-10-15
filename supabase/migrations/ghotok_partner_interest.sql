-- ghotok_partner_interest — sign-ups from the Ghotok Partner interest form
-- (/ghotok-partners). Pair: ghotok_partner_interest_ROLLBACK.sql.
--
-- Run the whole file in one go in the Supabase SQL editor. It is one
-- transaction: if anything below raises, nothing is changed.
--
-- Only the service role (app/api/ghotok-interest) touches this table. RLS is
-- on with no policies, so anon and authenticated can neither read nor write;
-- the service role bypasses RLS. Apply this before deploying the site code:
-- until the table exists the form answers "Something went wrong".

BEGIN;

CREATE TABLE IF NOT EXISTS public.ghotok_partner_interest (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text NOT NULL,
  country text NOT NULL,
  network text,
  how_help text,
  consent_text text NOT NULL,
  ip_hash text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.ghotok_partner_interest ENABLE ROW LEVEL SECURITY;

-- The per-IP rate limit the route handler checks on every submission.
CREATE INDEX IF NOT EXISTS ghotok_partner_interest_ip_hash_created_at_idx
  ON public.ghotok_partner_interest (ip_hash, created_at);

-- Report any policy on the table (expected: none).
DO $$
DECLARE
  remaining text;
BEGIN
  SELECT string_agg(policyname, ', ')
    INTO remaining
    FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'ghotok_partner_interest';
  IF remaining IS NOT NULL THEN
    RAISE WARNING 'ghotok_partner_interest has these policies, check them: %', remaining;
  END IF;
END $$;

COMMIT;
