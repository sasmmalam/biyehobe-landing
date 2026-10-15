-- Undoes ghotok_partner_interest.sql. DELETES every Ghotok Partner sign-up:
-- export the table first if you want to keep them.

BEGIN;

DROP TABLE IF EXISTS public.ghotok_partner_interest;

COMMIT;
