"use client";

import { useEffect, useState } from "react";
import ReferralShare from "./ReferralShare";
import {
  CONSENT_TEXT,
  DEFAULT_COUNTRY,
  GENDER_OPTIONS,
  type Gender,
  MAX_PLACE_LENGTH,
  type WaitlistResponse,
} from "@/lib/waitlist-shared";

// Waitlist v2. Posts to /api/waitlist (the browser no longer talks to
// Supabase). A signup is 'pending' until the emailed link is opened.

const TRUST_ITEMS = [
  { icon: "🔒", text: "No data sold. Ever." },
  { icon: "✓", text: "Live selfie verification" },
  { icon: "🌍", text: "Built for the diaspora" },
];

const REF_KEY = "biyehobe-ref";

// ── "Did you mean…?" for mistyped email domains ──────────────────────────────

const COMMON_DOMAINS = ["gmail", "yahoo", "hotmail", "outlook", "icloud", "live", "ymail"];
// Real providers one letter away from a name above; never "corrected".
const REAL_LOOKALIKES = ["mail", "email", "gmx"];
const COM_TYPOS = ["con", "cm", "co", "om", "comm", "coom", "cmo", "ocm", "vom", "xom", "cpm", "c"];

/** Edit distance where swapping two neighbouring letters counts as one. */
function editDistance(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array<number>(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

/** "name@gmial.com" → "name@gmail.com"; null when the domain looks fine. */
function suggestEmail(value: string): string | null {
  const email = value.trim();
  const at = email.lastIndexOf("@");
  if (at < 1) return null;
  const domain = email.slice(at + 1).toLowerCase();
  const dot = domain.indexOf(".");
  if (dot < 1) return null;
  const name = domain.slice(0, dot);
  const ending = domain.slice(dot + 1);

  const endingOk = ending === "com";
  if (!endingOk && !COM_TYPOS.includes(ending)) return null; // .ca, .co.uk … are left alone
  if (REAL_LOOKALIKES.includes(name)) return null;

  let best: string | null = null;
  if (COMMON_DOMAINS.includes(name)) {
    best = name;
  } else {
    let bestDistance = 3;
    for (const candidate of COMMON_DOMAINS) {
      const distance = editDistance(name, candidate);
      const allowed = candidate.length <= 5 ? 1 : 2;
      if (distance <= allowed && distance < bestDistance) {
        best = candidate;
        bestDistance = distance;
      }
    }
  }
  if (!best || (best === name && endingOk)) return null;
  return `${email.slice(0, at)}@${best}.com`;
}

// ── Styles (the v1 form's) ───────────────────────────────────────────────────

const FIELD: React.CSSProperties = {
  padding: "14px 20px",
  borderRadius: "999px",
  backgroundColor: "rgba(255,255,255,0.12)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.28)",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  outline: "none",
  width: "100%",
};

const NOTE: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "13px",
  textAlign: "center",
  marginTop: "10px",
};

const PANEL: React.CSSProperties = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "28px 32px",
  borderRadius: "16px",
  backgroundColor: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.20)",
  textAlign: "center",
};

const PANEL_TITLE: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "22px",
  fontWeight: 700,
  color: "white",
  marginBottom: "8px",
};

type Result = { kind: "pending" } | { kind: "confirmed"; referralLink: string };

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [website, setWebsite] = useState(""); // honeypot
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  // Keep ?r=CODE from the landing URL for the rest of the visit, so it still
  // goes with the form if the visitor reads another page first.
  useEffect(() => {
    try {
      const r = new URLSearchParams(window.location.search).get("r");
      if (r) sessionStorage.setItem(REF_KEY, r);
    } catch {
      // sessionStorage unavailable: the code is read from the URL on submit.
    }
  }, []);

  function referralCode(): string {
    const fromUrl = new URLSearchParams(window.location.search).get("r");
    if (fromUrl) return fromUrl;
    try {
      return sessionStorage.getItem(REF_KEY) ?? "";
    } catch {
      return "";
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!gender) {
      setError("Please choose Woman or Man.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, gender, city, country, website, ref: referralCode() }),
      });
      const data = (await res.json()) as WaitlistResponse;
      if ("error" in data) {
        setError(data.error);
      } else if (data.status === "confirmed") {
        setResult({ kind: "confirmed", referralLink: data.referralLink });
      } else {
        setResult({ kind: "pending" });
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (result?.kind === "pending") {
    return (
      <div style={PANEL} role="status">
        <p style={PANEL_TITLE}>Check your inbox to confirm your spot.</p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(255,255,255,0.72)" }}>
          Didn&apos;t get it? Check spam.
        </p>
      </div>
    );
  }

  if (result?.kind === "confirmed") {
    return (
      <div style={PANEL} role="status">
        <p style={PANEL_TITLE}>You&apos;re on the list.</p>
        <ReferralShare link={result.referralLink} tone="onGreen" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto" }}>
      {/* Trust badge strip */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "24px",
          marginBottom: "28px",
        }}
      >
        {TRUST_ITEMS.map(({ icon, text }) => (
          <span
            key={text}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.60)",
            }}
          >
            <span>{icon}</span>
            {text}
          </span>
        ))}
      </div>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "15px",
          lineHeight: 1.6,
          color: "white",
          marginBottom: "24px",
        }}
      >
        <strong style={{ color: "var(--gold-light)", fontWeight: 500 }}>Founding Members:</strong>{" "}
        the first 500 people get premium free during our founding period.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <input
            type="email"
            name="email"
            required
            aria-label="Email address"
            autoComplete="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSuggestion(null);
            }}
            onBlur={() => setSuggestion(suggestEmail(email))}
            style={FIELD}
          />
          {suggestion && (
            <p style={{ ...NOTE, color: "white", marginTop: "8px" }}>
              Did you mean{" "}
              <button
                type="button"
                onClick={() => {
                  setEmail(suggestion);
                  setSuggestion(null);
                }}
                style={{
                  color: "var(--gold-light)",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  cursor: "pointer",
                  padding: "6px 2px",
                  font: "inherit",
                  overflowWrap: "anywhere",
                }}
              >
                {suggestion}
              </button>
              ?
            </p>
          )}
        </div>

        <div role="radiogroup" aria-labelledby="waitlist-gender" className="flex items-center gap-3">
          <span
            id="waitlist-gender"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              color: "white",
              padding: "0 4px 0 20px",
              whiteSpace: "nowrap",
            }}
          >
            I am a
          </span>
          {GENDER_OPTIONS.map((option) => {
            const selected = gender === option.value;
            return (
              <label
                key={option.value}
                className="flex-1 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-white has-[:focus-visible]:outline-offset-2"
                style={{
                  ...FIELD,
                  width: "auto",
                  textAlign: "center",
                  cursor: "pointer",
                  fontWeight: selected ? 600 : 400,
                  backgroundColor: selected ? "white" : FIELD.backgroundColor,
                  color: selected ? "var(--green)" : "white",
                  borderColor: selected ? "white" : "rgba(255,255,255,0.28)",
                }}
              >
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  required
                  checked={selected}
                  onChange={() => setGender(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="city"
            required
            maxLength={MAX_PLACE_LENGTH}
            aria-label="City"
            autoComplete="address-level2"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={FIELD}
          />
          <input
            type="text"
            name="country"
            required
            maxLength={MAX_PLACE_LENGTH}
            aria-label="Country"
            autoComplete="country-name"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={FIELD}
          />
        </div>

        {/* Honeypot — hidden from people and screen readers; bots fill it in. */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "14px 28px",
            borderRadius: "999px",
            backgroundColor: "var(--gold)",
            color: "var(--dark)",
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            opacity: loading ? 0.6 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          {loading ? "Joining…" : "Join Waitlist"}
        </button>

        <p style={{ ...NOTE, marginTop: "2px", fontSize: "12px", color: "rgba(255,255,255,0.72)" }}>
          {CONSENT_TEXT}
        </p>

        {error && (
          <p
            role="alert"
            style={{
              ...NOTE,
              marginTop: 0,
              color: "#fca5a5", // 5.08:1 on green; #f87171 was 3.49
            }}
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
