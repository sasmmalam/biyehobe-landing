-- Rollback for waitlist_v2.sql.
--
-- Puts the table back to email + created_at with the anon insert policy.
-- This DELETES the data in the new columns (gender, city, country, referral
-- codes, confirmation status, consent text). Export the table first if you
-- need any of it. Rows themselves are kept, including unconfirmed ones.
-- Roll the site code back as well: the v2 route handler needs these columns.

BEGIN;

DROP INDEX IF EXISTS public.waitlist_confirm_token_hash_idx;
DROP INDEX IF EXISTS public.waitlist_ip_hash_created_at_idx;
DROP INDEX IF EXISTS public.waitlist_email_lower_key;

ALTER TABLE public.waitlist
  DROP COLUMN IF EXISTS consent_text,
  DROP COLUMN IF EXISTS confirmed_at,
  DROP COLUMN IF EXISTS confirm_sent_at,
  DROP COLUMN IF EXISTS confirm_token_hash,
  DROP COLUMN IF EXISTS status,
  DROP COLUMN IF EXISTS is_founding,
  DROP COLUMN IF EXISTS ip_hash,
  DROP COLUMN IF EXISTS referred_by,
  DROP COLUMN IF EXISTS referral_code,
  DROP COLUMN IF EXISTS country,
  DROP COLUMN IF EXISTS city,
  DROP COLUMN IF EXISTS gender;

DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist;
CREATE POLICY "Anyone can join waitlist" ON public.waitlist
  FOR INSERT WITH CHECK (true);

COMMIT;
