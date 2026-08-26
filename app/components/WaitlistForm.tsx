"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

// TODO Session 34: rebuild multi-step form (location + frustration)
// Requires Supabase SQL:
//   ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS location text;
//   ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS frustration text;
//   CREATE POLICY "Anyone can update waitlist" ON waitlist
//     FOR UPDATE USING (true) WITH CHECK (true);

const TRUST_ITEMS = [
  { icon: "🔒", text: "No data sold. Ever." },
  { icon: "✓", text: "Reviewed before live" },
  { icon: "🌍", text: "Built for the diaspora" },
];

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const normalizedEmail = email.trim().toLowerCase();
    const { error } = await getSupabase()
      .from("waitlist")
      .insert({ email: normalizedEmail, created_at: new Date().toISOString() });

    if (!error) {
      setStatus("success");
      setEmail("");
    } else if (error.code === "23505") {
      setStatus("duplicate");
    } else {
      console.error("[WaitlistForm] insert error:", error);
      setStatus("error");
    }
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

      <form onSubmit={handleSubmit}>
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
            {status === "loading" ? "Joining…" : "Join Waitlist"}
          </button>
        </div>

        {status === "duplicate" && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              color: "var(--gold)",
              textAlign: "center",
              marginTop: "10px",
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
              marginTop: "10px",
            }}
          >
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
