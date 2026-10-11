import {
  ROW_COLUMNS,
  type WaitlistRow,
  ensureReferralCode,
  getWaitlistDb,
  newConfirmToken,
  newReferralCode,
  sendConfirmationEmail,
  sha256,
} from "@/lib/waitlist";
import {
  CONSENT_TEXT,
  DEFAULT_COUNTRY,
  GENDER_OPTIONS,
  type Gender,
  MAX_PLACE_LENGTH,
  REFERRAL_CODE_PATTERN,
  type WaitlistResponse,
  referralLink,
} from "@/lib/waitlist-shared";

// POST /api/waitlist — the only way onto the waitlist. Inserts with the
// service role (the anon key has no access to the table), then emails a
// confirmation link. A signup counts once that link is opened.

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RESEND_COOLDOWN_MS = 10 * 60 * 1000;

function json(body: WaitlistResponse, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

const PENDING = () => json({ status: "pending" });
const UNAVAILABLE = () => json({ error: "Something went wrong. Please try again." }, 503);
const SEND_FAILED = () =>
  json({ error: "We couldn't send your confirmation email. Please try again in a moment." }, 502);

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toGender(value: string): Gender | undefined {
  const v = value.toLowerCase();
  return GENDER_OPTIONS.find((g) => g.value === v || g.label.toLowerCase() === v)?.value;
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Escapes LIKE wildcards so ilike() is a plain case-insensitive match. */
function likeLiteral(value: string): string {
  return value.replace(/[\\%_]/g, "\\$&");
}

export async function POST(request: Request) {
  const db = getWaitlistDb();
  const salt = process.env.WAITLIST_SALT;
  if (!db || !salt || !process.env.RESEND_API_KEY) {
    console.error("[waitlist] server env is incomplete");
    return UNAVAILABLE();
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
    if (!body || typeof body !== "object") throw new Error();
  } catch {
    return json({ error: "Something went wrong. Please try again." }, 400);
  }

  // Honeypot: a person never sees this field. Answer as if it worked.
  if (text(body.website)) return PENDING();

  const email = text(body.email).toLowerCase();
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return json({ error: "Please enter a valid email address.", field: "email" }, 400);
  }
  const gender = toGender(text(body.gender));
  if (!gender) {
    return json({ error: "Please choose Woman or Man.", field: "gender" }, 400);
  }
  const city = text(body.city);
  if (!city || city.length > MAX_PLACE_LENGTH) {
    return json({ error: "Please enter your city.", field: "city" }, 400);
  }
  const country = text(body.country) || DEFAULT_COUNTRY;
  if (country.length > MAX_PLACE_LENGTH) {
    return json({ error: "Please shorten the country name.", field: "country" }, 400);
  }
  const ref = text(body.ref).toUpperCase();

  // ── Already on the list? ──
  const { data: existing, error: lookupError } = await db
    .from("waitlist")
    .select(ROW_COLUMNS)
    .ilike("email", likeLiteral(email))
    .maybeSingle<WaitlistRow>();
  if (lookupError) {
    console.error(`[waitlist] lookup failed: ${lookupError.code}`);
    return UNAVAILABLE();
  }

  if (existing?.status === "confirmed") {
    const code = await ensureReferralCode(db, existing);
    return code ? json({ status: "confirmed", referralLink: referralLink(code) }) : UNAVAILABLE();
  }

  if (existing) {
    // Pending, or unsubscribed and signing up again: send a fresh link, at
    // most once every 10 minutes. An unsubscribed row stays unsubscribed
    // until that link is opened, so nobody else can re-subscribe them.
    const lastSent = existing.confirm_sent_at ? Date.parse(existing.confirm_sent_at) : 0;
    if (Date.now() - lastSent < RESEND_COOLDOWN_MS) return PENDING();
    const token = newConfirmToken();
    const { error } = await db
      .from("waitlist")
      .update({ confirm_token_hash: sha256(token), confirm_sent_at: new Date().toISOString() })
      .eq("id", existing.id)
      .in("status", ["pending", "unsubscribed"]);
    if (error) {
      console.error(`[waitlist] resend update failed: ${error.code}`);
      return UNAVAILABLE();
    }
    if (!(await sendConfirmationEmail(db, existing, token))) {
      await db.from("waitlist").update({ confirm_sent_at: null }).eq("id", existing.id);
      return SEND_FAILED();
    }
    return PENDING();
  }

  // ── New signup ──
  const ipHash = sha256(`${clientIp(request)}${salt}`);
  const { count: recent, error: rateError } = await db
    .from("waitlist")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", new Date(Date.now() - RATE_WINDOW_MS).toISOString());
  if (rateError) {
    console.error(`[waitlist] rate check failed: ${rateError.code}`);
    return UNAVAILABLE();
  }
  if ((recent ?? 0) >= RATE_LIMIT) {
    return json({ error: "Too many signups from this connection. Please try again in an hour." }, 429);
  }

  // A referral code only counts if it belongs to someone on the list.
  let referredBy: string | null = null;
  if (REFERRAL_CODE_PATTERN.test(ref)) {
    const { data: referrer } = await db
      .from("waitlist")
      .select("id")
      .eq("referral_code", ref)
      .maybeSingle();
    if (referrer) referredBy = ref;
  }

  const token = newConfirmToken();
  let insertedId: string | null = null;
  for (let attempt = 0; attempt < 5 && !insertedId; attempt++) {
    const { data, error } = await db
      .from("waitlist")
      .insert({
        email,
        gender,
        city,
        country,
        referral_code: newReferralCode(),
        referred_by: referredBy,
        ip_hash: ipHash,
        status: "pending",
        confirm_token_hash: sha256(token),
        confirm_sent_at: new Date().toISOString(),
        consent_text: CONSENT_TEXT,
      })
      .select("id")
      .single();
    if (data) {
      insertedId = data.id;
    } else if (error?.code === "23505" && error.message.includes("referral_code")) {
      continue; // code already taken — try another
    } else if (error?.code === "23505") {
      return PENDING(); // the same email landed a moment ago
    } else {
      console.error(`[waitlist] insert failed: ${error?.code}`);
      return UNAVAILABLE();
    }
  }
  if (!insertedId) return UNAVAILABLE();

  const recipient = { id: insertedId, email, unsubscribe_token_hash: null };
  if (!(await sendConfirmationEmail(db, recipient, token))) {
    // Leave the row; clearing confirm_sent_at lets a retry send straight away.
    await db.from("waitlist").update({ confirm_sent_at: null }).eq("id", insertedId);
    return SEND_FAILED();
  }
  return PENDING();
}
