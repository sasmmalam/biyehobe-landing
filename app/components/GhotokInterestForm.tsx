"use client";

import { useState } from "react";
import {
  GHOTOK_CONSENT_TEXT,
  GHOTOK_LIMITS,
  type GhotokField,
  type GhotokResponse,
} from "@/lib/ghotok-shared";

// The Ghotok Partner interest form on /ghotok-partners (on white). Posts to
// /api/ghotok-interest; the browser never talks to Supabase.

const FIELD: React.CSSProperties = {
  padding: "14px 20px",
  borderRadius: "12px",
  backgroundColor: "var(--cream)",
  color: "var(--dark)",
  border: "1px solid rgba(13,31,26,0.2)",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  width: "100%",
};

const LABEL: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  fontWeight: 500,
  color: "var(--dark)",
  marginBottom: "6px",
};

const OPTIONAL = <span style={{ fontWeight: 400, color: "rgba(13,31,26,0.62)" }}> (optional)</span>;

type Values = Record<Exclude<GhotokField, "consent">, string>;

const EMPTY: Values = { fullName: "", email: "", phone: "", city: "", country: "", network: "", howHelp: "" };

export default function GhotokInterestForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; field?: GhotokField } | null>(null);
  const [done, setDone] = useState(false);

  function set(field: keyof Values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ghotok-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, consent, website }),
      });
      const data = (await res.json()) as GhotokResponse;
      if ("error" in data) setError({ message: data.error, field: data.field });
      else setDone(true);
    } catch {
      setError({ message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div role="status" className="text-center">
        <p
          className="text-3xl mb-3"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--dark)" }}
        >
          Thank you — we&apos;ve got your details.
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(13,31,26,0.72)" }}>
          We&apos;ll be in touch about the Partner program before launch.
        </p>
      </div>
    );
  }

  const invalid = (field: GhotokField) => error?.field === field || undefined;

  const input = (
    field: keyof Values,
    label: string,
    opts: { type?: string; required?: boolean; autoComplete?: string } = {},
  ) => (
    <div>
      <label htmlFor={`ghotok-${field}`} style={LABEL}>
        {label}
        {!opts.required && OPTIONAL}
      </label>
      <input
        id={`ghotok-${field}`}
        name={field}
        type={opts.type ?? "text"}
        required={opts.required}
        maxLength={GHOTOK_LIMITS[field]}
        autoComplete={opts.autoComplete}
        aria-invalid={invalid(field)}
        value={values[field]}
        onChange={set(field)}
        style={FIELD}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {input("fullName", "Full name", { required: true, autoComplete: "name" })}
      {input("email", "Email", { type: "email", required: true, autoComplete: "email" })}
      {input("phone", "Phone / WhatsApp", { type: "tel", autoComplete: "tel" })}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {input("city", "City", { required: true, autoComplete: "address-level2" })}
        {input("country", "Country", { required: true, autoComplete: "country-name" })}
      </div>
      {input("network", "Community or network")}
      <div>
        <label htmlFor="ghotok-howHelp" style={LABEL}>
          How you&apos;d help{OPTIONAL}
        </label>
        <textarea
          id="ghotok-howHelp"
          name="howHelp"
          rows={4}
          maxLength={GHOTOK_LIMITS.howHelp}
          aria-invalid={invalid("howHelp")}
          value={values.howHelp}
          onChange={set("howHelp")}
          style={{ ...FIELD, resize: "vertical" }}
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

      <label
        className="flex items-start gap-3"
        style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "var(--dark)", cursor: "pointer" }}
      >
        <input
          type="checkbox"
          name="consent"
          required
          aria-invalid={invalid("consent")}
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          style={{ marginTop: "3px", width: "16px", height: "16px", accentColor: "var(--green)", flexShrink: 0 }}
        />
        <span>{GHOTOK_CONSENT_TEXT}</span>
      </label>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "14px 28px",
          borderRadius: "999px",
          backgroundColor: "var(--green)",
          color: "white",
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
          opacity: loading ? 0.6 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {loading ? "Sending…" : "Register interest"}
      </button>

      {error && (
        <p
          role="alert"
          style={{ fontFamily: "var(--font-sans)", fontSize: "14px", textAlign: "center", color: "#b42318" }}
        >
          {error.message}
        </p>
      )}
    </form>
  );
}
