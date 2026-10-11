-- waitlist_v3_unsubscribe — a working unsubscribe for waitlist emails.
-- Pair: waitlist_v3_unsubscribe_ROLLBACK.sql. Requires waitlist_v2.sql.
--
-- Run the whole file in one go in the Supabase SQL editor. It is one
-- transaction: if anything raises, nothing is changed.
--
-- Safe to apply before the new site code is deployed: the v2 code never
-- writes 'unsubscribed' and ignores the two new columns.

BEGIN;

-- 1. status may now be 'unsubscribed'. The v2 check was created inline, so
--    its name is whatever Postgres gave it; drop every check on the column.
DO $$
DECLARE
  c record;
BEGIN
  FOR c IN
    SELECT con.conname
      FROM pg_constraint con
      JOIN pg_attribute att
        ON att.attrelid = con.conrelid AND att.attnum = ANY (con.conkey)
     WHERE con.conrelid = 'public.waitlist'::regclass
       AND con.contype = 'c'
       AND att.attname = 'status'
  LOOP
    EXECUTE format('ALTER TABLE public.waitlist DROP CONSTRAINT %I', c.conname);
  END LOOP;
END $$;

ALTER TABLE public.waitlist
  ADD CONSTRAINT waitlist_status_check
  CHECK (status IN ('pending', 'confirmed', 'unsubscribed'));

-- 2. When they unsubscribed, and the sha256 of their unsubscribe token.
--    The hash is filled in the first time a person is emailed (no backfill).
ALTER TABLE public.waitlist
  ADD COLUMN IF NOT EXISTS unsubscribed_at timestamptz,
  ADD COLUMN IF NOT EXISTS unsubscribe_token_hash text;

CREATE INDEX IF NOT EXISTS waitlist_unsubscribe_token_hash_idx
  ON public.waitlist (unsubscribe_token_hash);

COMMIT;
