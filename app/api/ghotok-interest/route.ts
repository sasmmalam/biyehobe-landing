import { getWaitlistDb, sendEmail, sha256 } from "@/lib/waitlist";
import { CONTACT_EMAIL } from "@/lib/site";
import {
  GHOTOK_CONSENT_TEXT,
  GHOTOK_LIMITS,
  type GhotokField,
  type GhotokResponse,
} from "@/lib/ghotok-shared";

// POST /api/ghotok-interest — the Matchmaker (Ghotok) Partner interest form. Inserts with
// the service role (the table has RLS on and no anon/auth policies), then
// emails hello@. No auto-reply. Same honeypot and per-IP rate limit as
// /api/waitlist; the IP is only ever stored as a salted hash.

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{6,}$/;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function json(body: GhotokResponse, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

const OK = () => json({ status: "ok" });
const UNAVAILABLE = () => json({ error: "Something went wrong. Please try again." }, 503);

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

type Rule = {
  field: Exclude<GhotokField, "consent">;
  max: number;
  required?: string; // the error shown when it's empty
  multiline?: boolean;
  pattern?: [RegExp, string];
};

const RULES: Rule[] = [
  { field: "fullName", max: GHOTOK_LIMITS.fullName, required: "Please enter your full name." },
  {
    field: "email",
    max: GHOTOK_LIMITS.email,
    required: "Please enter your email address.",
    pattern: [EMAIL_PATTERN, "Please enter a valid email address."],
  },
  {
    field: "phone",
    max: GHOTOK_LIMITS.phone,
    pattern: [PHONE_PATTERN, "Please check the phone / WhatsApp number."],
  },
  { field: "city", max: GHOTOK_LIMITS.city, required: "Please enter your city." },
  { field: "country", max: GHOTOK_LIMITS.country, required: "Please enter your country." },
  { field: "network", max: GHOTOK_LIMITS.network },
  { field: "howHelp", max: GHOTOK_LIMITS.howHelp, multiline: true },
];

type Parsed = Record<Rule["field"], string | null>;

/** Checks every field; the first problem is returned as the error. */
function parse(body: Record<string, unknown>): { data: Parsed } | { error: string; field: GhotokField } {
  const data = {} as Parsed;
  for (const rule of RULES) {
    const raw = body[rule.field];
    const value = typeof raw === "string" ? raw.trim() : "";
    if (!value) {
      if (rule.required) return { error: rule.required, field: rule.field };
      data[rule.field] = null;
      continue;
    }
    const badChars = rule.multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/ : CONTROL_CHARS;
    if (value.length > rule.max || badChars.test(value)) {
      return { error: `Please shorten or check this field (up to ${rule.max} characters).`, field: rule.field };
    }
    if (rule.pattern && !rule.pattern[0].test(value)) {
      return { error: rule.pattern[1], field: rule.field };
    }
    data[rule.field] = value;
  }
  if (body.consent !== true) {
    return { error: "Please tick the box so we can contact you.", field: "consent" };
  }
  return { data };
}

export async function POST(request: Request) {
  const db = getWaitlistDb();
  const salt = process.env.WAITLIST_SALT;
  if (!db || !salt) {
    console.error("[ghotok] server env is incomplete");
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
  if (typeof body.website === "string" && body.website.trim()) return OK();

  const parsed = parse(body);
  if ("error" in parsed) return json({ error: parsed.error, field: parsed.field }, 400);
  const d = parsed.data;

  const ipHash = sha256(`${clientIp(request)}${salt}`);
  const { count: recent, error: rateError } = await db
    .from("ghotok_partner_interest")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", new Date(Date.now() - RATE_WINDOW_MS).toISOString());
  if (rateError) {
    console.error(`[ghotok] rate check failed: ${rateError.code}`);
    return UNAVAILABLE();
  }
  if ((recent ?? 0) >= RATE_LIMIT) {
    return json({ error: "Too many sign-ups from this connection. Please try again in an hour." }, 429);
  }

  const email = d.email!.toLowerCase();
  const { error } = await db.from("ghotok_partner_interest").insert({
    full_name: d.fullName,
    email,
    phone: d.phone,
    city: d.city,
    country: d.country,
    network: d.network,
    how_help: d.howHelp,
    consent_text: GHOTOK_CONSENT_TEXT,
    ip_hash: ipHash,
  });
  if (error) {
    console.error(`[ghotok] insert failed: ${error.code}`);
    return UNAVAILABLE();
  }

  // The row is saved either way; a failed note is logged by sendEmail().
  await sendEmail({
    to: CONTACT_EMAIL,
    subject: `New Matchmaker (Ghotok) Partner interest: ${d.fullName}, ${d.city}`,
    text: [
      `Name: ${d.fullName}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${d.phone ?? "-"}`,
      `City: ${d.city}`,
      `Country: ${d.country}`,
      `Community / network: ${d.network ?? "-"}`,
      "",
      "How they'd help:",
      d.howHelp ?? "-",
    ].join("\n"),
  });

  return OK();
}
