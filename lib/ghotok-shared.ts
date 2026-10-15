// Ghotok Partner interest form: what both the form (browser) and the route
// handler (server) need. Nothing secret belongs in this file.

/** The consent checkbox label, stored word for word in `consent_text`. */
export const GHOTOK_CONSENT_TEXT =
  "BiyeHobe may contact me about the Matchmaker (Ghotok) Partners program. Operated by Ibaya Digital Inc.";

export const GHOTOK_LIMITS = {
  fullName: 120,
  email: 254,
  phone: 40,
  city: 80,
  country: 80,
  network: 200,
  howHelp: 2000,
} as const;

export type GhotokField = "fullName" | "email" | "phone" | "city" | "country" | "network" | "howHelp" | "consent";

/** What POST /api/ghotok-interest answers with. */
export type GhotokResponse = { status: "ok" } | { error: string; field?: GhotokField };
