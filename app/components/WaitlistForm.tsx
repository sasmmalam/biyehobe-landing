"use client";

// Run in Supabase SQL editor before deploying:
// ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS location text;
// ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS frustration text;
//
// Also add UPDATE policy so step 2 can save:
// CREATE POLICY "Anyone can update waitlist" ON waitlist
//   FOR UPDATE USING (true) WITH CHECK (true);

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

const LOCATIONS = [
  "Canada",
  "United Kingdom",
  "USA",
  "Bangladesh",
  "UAE",
  "Australia",
  "Other",
];

const FRUSTRATIONS = [
  "Not enough verified profiles",
  "No family involvement option",
  "Too casual / not serious",
  "No Bangladeshi-specific app",
];

const TRUST_ITEMS = [
  { icon: "🔒", text: "No data sold. Ever." },
  { icon: "✓", text: "Verified profiles only" },
  { icon: "🌍", text: "Built for the diaspora" },
];

export default function WaitlistForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [insertedId, setInsertedId] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFrustration, setSelectedFrustration] = useState("");
  const [step2Error, setStep2Error] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");

  async function handleStep1(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (getSupabase() as any)
      .from("waitlist")
      .insert([{ email, created_at: new Date().toISOString() }])
      .select("id")
      .single();

    if (!error && data) {
      console.log("[WaitlistForm] step 1 inserted id:", data.id);
      setInsertedId(data.id as string);
      setStatus("idle");
      setStep(2);
    } else if (error?.code === "23505") {
      setStatus("duplicate");
    } else {
      console.error("[WaitlistForm] step 1 error:", error);
      setStatus("error");
    }
  }

  async function handleStep2(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("email at step 2 submit:", email, "| insertedId:", insertedId);
    setStatus("loading");
    setStep2Error(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = getSupabase() as any;
    const response = await supabase
      .from("waitlist")
      .update({ location: selectedLocation, frustration: selectedFrustration })
      .eq("id", insertedId);
    console.log("[WaitlistForm] step 2 full response:", response);
    if (response.error) {
      setStep2Error(response.error.message ?? JSON.stringify(response.error));
      setStatus("idle");
      return;
    }
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        style={{
          padding: "28px 32px",
          borderRadius: "16px",
          backgroundColor: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.20)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 700,
            color: "white",
            marginBottom: "8px",
          }}
        >
          You&apos;re on the list.
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            color: "rgba(255,255,255,0.70)",
          }}
        >
          We&apos;ll be in touch when BiyeHobe is ready for you.
        </p>
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

      {/* Step 1: Email */}
      {step === 1 && (
        <form
          onSubmit={handleStep1}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          className="sm:flex-row"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              style={{
                padding: "14px 20px",
                borderRadius: "999px",
                backgroundColor: "rgba(255,255,255,0.12)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.28)",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                outline: "none",
                width: "100%",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                padding: "14px 28px",
                borderRadius: "999px",
                backgroundColor: "var(--gold)",
                color: "white",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                opacity: status === "loading" ? 0.6 : 1,
                transition: "opacity 0.2s ease",
              }}
            >
              {status === "loading" ? "…" : "Continue →"}
            </button>
          </div>

          {status === "duplicate" && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                color: "var(--gold)",
                textAlign: "center",
                marginTop: "4px",
              }}
            >
              This email is already on the waitlist.
            </p>
          )}
          {status === "error" && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                color: "#f87171",
                textAlign: "center",
                marginTop: "4px",
              }}
            >
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}

      {/* Step 2: Location + Frustration */}
      {step === 2 && (
        <form
          onSubmit={handleStep2}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.55)",
              textAlign: "center",
              marginBottom: "4px",
            }}
          >
            Two quick questions to shape the app.
          </p>

          {/* Location dropdown */}
          <div>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Where are you based?
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 18px",
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.10)",
                color: selectedLocation ? "white" : "rgba(255,255,255,0.45)",
                border: "1px solid rgba(255,255,255,0.22)",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                appearance: "none",
                cursor: "pointer",
              }}
            >
              <option value="" style={{ backgroundColor: "#043927" }}>
                Select country…
              </option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l} style={{ backgroundColor: "#043927" }}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Frustration chips */}
          <div>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Biggest frustration with current apps?
            </label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {FRUSTRATIONS.map((f) => {
                const isActive = selectedFrustration === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setSelectedFrustration(isActive ? "" : f)}
                    style={{
                      padding: "9px 16px",
                      borderRadius: "999px",
                      border: isActive
                        ? "1.5px solid var(--gold)"
                        : "1.5px solid rgba(255,255,255,0.22)",
                      backgroundColor: isActive
                        ? "rgba(201,149,42,0.18)"
                        : "rgba(255,255,255,0.06)",
                      color: isActive ? "var(--gold)" : "rgba(255,255,255,0.70)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                      textAlign: "left",
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          {step2Error && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                color: "#f87171",
                textAlign: "center",
                padding: "10px 14px",
                borderRadius: "8px",
                backgroundColor: "rgba(248,113,113,0.10)",
                border: "1px solid rgba(248,113,113,0.25)",
              }}
            >
              {step2Error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              padding: "14px 28px",
              borderRadius: "999px",
              backgroundColor: "var(--gold)",
              color: "white",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              opacity: status === "loading" ? 0.6 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            {status === "loading" ? "Saving…" : "Submit →"}
          </button>
        </form>
      )}
    </div>
  );
}
