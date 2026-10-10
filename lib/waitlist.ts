import { createHash, randomBytes, randomInt } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { CONTACT_EMAIL, SITE_URL } from "./site";
import { referralLink } from "./waitlist-shared";

// Server-only waitlist code: the service-role Supabase client, tokens and the
// two emails. Imported by app/api/waitlist/route.ts and
// app/waitlist/confirm/page.tsx — never by a client component. The keys it
// reads are not NEXT_PUBLIC_, and nothing here logs them, a token or an IP.

export const FOUNDING_MEMBER_LIMIT = 500;
export const CONFIRM_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const SENDER = "BiyeHobe <hello@send.biyehobe.com>";
const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export interface WaitlistRow {
  id: string;
  email: string;
  created_at: string;
  gender: "female" | "male" | null;
  city: string | null;
  country: string | null;
  referral_code: string | null;
  referred_by: string | null;
  status: "pending" | "confirmed";
  confirm_sent_at: string | null;
  confirmed_at: string | null;
}

export const ROW_COLUMNS =
  "id, email, created_at, gender, city, country, referral_code, referred_by, status, confirm_sent_at, confirmed_at";

let admin: SupabaseClient | null = null;

/** Service-role client, or null when the server env isn't set up. */
export function getWaitlistDb(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    admin ??= createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch {
    // createClient throws on a malformed URL (e.g. a placeholder in .env.local).
    return null;
  }
  return admin;
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function newReferralCode(): string {
  return Array.from({ length: 7 }, () => BASE32[randomInt(BASE32.length)]).join("");
}

/** 32 random bytes; only its sha256 is stored. */
export function newConfirmToken(): string {
  return randomBytes(32).toString("base64url");
}

/** Gives a row a referral code if it has none (people who joined before v2). */
export async function ensureReferralCode(db: SupabaseClient, row: WaitlistRow): Promise<string | null> {
  if (row.referral_code) return row.referral_code;
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = newReferralCode();
    const { error } = await db.from("waitlist").update({ referral_code: code }).eq("id", row.id);
    if (!error) return code;
    if (error.code !== "23505") break;
  }
  return null;
}

// ── Email (Resend) ───────────────────────────────────────────────────────────

async function sendEmail(message: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[waitlist] RESEND_API_KEY is not set");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: SENDER, reply_to: CONTACT_EMAIL, ...message }),
    });
    if (!res.ok) console.error(`[waitlist] Resend answered ${res.status} for "${message.subject}"`);
    return res.ok;
  } catch {
    console.error(`[waitlist] could not reach Resend for "${message.subject}"`);
    return false;
  }
}

export function sendConfirmationEmail(to: string, token: string): Promise<boolean> {
  const url = `${SITE_URL}/waitlist/confirm?t=${token}`;
  const removal = `Didn't sign up? Ignore this email and you won't hear from us again. To be taken off the list at any time, reply to this email or write to ${CONTACT_EMAIL}.`;
  return sendEmail({
    to,
    subject: "Confirm your BiyeHobe waitlist spot",
    text: [
      "Confirm your email to join the BiyeHobe waitlist:",
      url,
      "This link works for 7 days.",
      removal,
    ].join("\n\n"),
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#FAF8F5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5;">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;font-family:Arial,Helvetica,sans-serif;color:#0D1F1A;">
            <tr>
              <td style="font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:bold;color:#1B4D3E;padding-bottom:24px;">BiyeHobe</td>
            </tr>
            <tr>
              <td style="font-size:16px;line-height:1.6;padding-bottom:28px;">Confirm your email to join the BiyeHobe waitlist.</td>
            </tr>
            <tr>
              <td style="padding-bottom:28px;">
                <a href="${url}" style="display:inline-block;padding:14px 28px;border-radius:999px;background-color:#1B4D3E;color:#FFFFFF;font-size:15px;font-weight:bold;text-decoration:none;">Confirm my spot</a>
              </td>
            </tr>
            <tr>
              <td style="font-size:13px;line-height:1.6;color:#0D1F1A;">This link works for 7 days.<br /><br />${removal}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  });
}

async function countConfirmed(db: SupabaseClient, gender?: "female" | "male"): Promise<number> {
  let query = db
    .from("waitlist")
    .select("id", { count: "exact", head: true })
    .eq("status", "confirmed");
  if (gender) query = query.eq("gender", gender);
  const { count } = await query;
  return count ?? 0;
}

/** Tells hello@ about a newly confirmed signup. Counts are confirmed rows only. */
async function sendSignupNotification(db: SupabaseClient, row: WaitlistRow): Promise<void> {
  const [total, female, male] = await Promise.all([
    countConfirmed(db),
    countConfirmed(db, "female"),
    countConfirmed(db, "male"),
  ]);
  const other = total - female - male;
  await sendEmail({
    to: CONTACT_EMAIL,
    subject: `New waitlist signup: ${row.gender ?? "unknown"}, ${row.city ?? "unknown"}`,
    text: [
      `Confirmed: ${row.confirmed_at ?? "unknown"} (UTC)`,
      `Signed up: ${row.created_at}`,
      `City: ${row.city ?? "-"}`,
      `Country: ${row.country ?? "-"}`,
      `Gender: ${row.gender ?? "-"}`,
      `Referred by: ${row.referred_by ?? "-"}`,
      "",
      `Total confirmed: ${total}`,
      `Female: ${female} · Male: ${male}${other > 0 ? ` · Not recorded (joined before v2): ${other}` : ""}`,
    ].join("\n"),
  });
}

// ── Confirmation ─────────────────────────────────────────────────────────────

/**
 * Confirms the pending row a token belongs to. The update is a single
 * statement, so a link opened twice confirms (and notifies) once; the second
 * time the token is gone and this returns null.
 */
export async function confirmByToken(token: string): Promise<{ referralLink: string } | null> {
  const db = getWaitlistDb();
  if (!db || !/^[A-Za-z0-9_-]{20,128}$/.test(token)) return null;

  // The first 500 confirmed people are Founding Members.
  const confirmedSoFar = await countConfirmed(db);

  const { data, error } = await db
    .from("waitlist")
    .update({
      status: "confirmed",
      confirmed_at: new Date().toISOString(),
      confirm_token_hash: null,
      is_founding: confirmedSoFar < FOUNDING_MEMBER_LIMIT,
    })
    .eq("confirm_token_hash", sha256(token))
    .eq("status", "pending")
    .gte("confirm_sent_at", new Date(Date.now() - CONFIRM_TTL_MS).toISOString())
    .select(ROW_COLUMNS)
    .maybeSingle<WaitlistRow>();

  if (error) {
    console.error(`[waitlist] confirm failed: ${error.code}`);
    return null;
  }
  if (!data) return null;

  await sendSignupNotification(db, data);
  const code = await ensureReferralCode(db, data);
  return code ? { referralLink: referralLink(code) } : null;
}
