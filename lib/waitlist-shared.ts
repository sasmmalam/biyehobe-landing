import { SITE_URL } from "./site";

// Waitlist constants used by both the form (browser) and the route handler
// (server). Nothing secret belongs in this file.

/** Shown under the Join button and stored word for word in `consent_text`. */
export const CONSENT_TEXT =
  "By joining, you agree to receive emails from BiyeHobe about our launch. Unsubscribe anytime.";

export const GENDER_OPTIONS = [
  { value: "female", label: "Woman" },
  { value: "male", label: "Man" },
] as const;

export type Gender = (typeof GENDER_OPTIONS)[number]["value"];

export const DEFAULT_COUNTRY = "Canada";
export const MAX_PLACE_LENGTH = 80;

/** 7 characters of RFC 4648 base32. */
export const REFERRAL_CODE_PATTERN = /^[A-Z2-7]{7}$/;

export function referralLink(code: string): string {
  return `${SITE_URL}/?r=${code}`;
}

export function whatsappShareUrl(link: string): string {
  const text = `I joined the waitlist for BiyeHobe, a matrimonial app for Bangladeshis worldwide. Join here: ${link}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/** What GET /api/waitlist/stats answers with: aggregates of confirmed rows only. */
export interface FoundingStats {
  women: number;
  men: number;
  total: number;
  womenLeft: number;
  menLeft: number;
  totalLeft: number;
}

/** What POST /api/waitlist answers with. */
export type WaitlistResponse =
  | { status: "pending" }
  | { status: "confirmed"; referralLink: string }
  | { error: string; field?: "email" | "gender" | "city" | "country" };
