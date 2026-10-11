-- Rollback for waitlist_v3_unsubscribe.sql.
--
-- Roll the site code back FIRST: the v3 code reads and writes these columns.
--
-- The old status check has no 'unsubscribed', so this stops (changing
-- nothing) while any unsubscribed rows exist. They must not be turned back
-- into 'confirmed': those people asked not to be emailed. Decide what to do
-- with them, then run this again. The usual choice is to export them as a
-- do-not-email list and delete them:
--
--   SELECT email, unsubscribed_at FROM public.waitlist WHERE status = 'unsubscribed';
--   DELETE FROM public.waitlist WHERE status = 'unsubscribed';

BEGIN;

DO $$
DECLARE
  n bigint;
BEGIN
  SELECT count(*) INTO n FROM public.waitlist WHERE status = 'unsubscribed';
  IF n > 0 THEN
    RAISE EXCEPTION 'waitlist_v3 rollback stopped, nothing changed: % unsubscribed row(s) exist. See the note at the top of this file.', n;
  END IF;
END $$;

DROP INDEX IF EXISTS public.waitlist_unsubscribe_token_hash_idx;

ALTER TABLE public.waitlist
  DROP COLUMN IF EXISTS unsubscribe_token_hash,
  DROP COLUMN IF EXISTS unsubscribed_at;

ALTER TABLE public.waitlist DROP CONSTRAINT IF EXISTS waitlist_status_check;
ALTER TABLE public.waitlist
  ADD CONSTRAINT waitlist_status_check
  CHECK (status IN ('pending', 'confirmed'));

COMMIT;
