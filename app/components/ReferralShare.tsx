"use client";

import { useState } from "react";
import { whatsappShareUrl } from "@/lib/waitlist-shared";

// A member's referral link with Copy and WhatsApp buttons. Used in the
// waitlist form (on green) and on /waitlist/confirm (on white).

const TONES = {
  onGreen: {
    linkBg: "rgba(255,255,255,0.12)",
    linkBorder: "1px solid rgba(255,255,255,0.28)",
    linkColor: "white",
    hint: "rgba(255,255,255,0.72)",
    // Gold fill takes --dark text (6.36:1), never white.
    primary: { backgroundColor: "var(--gold)", color: "var(--dark)", border: "none" },
    secondary: {
      backgroundColor: "transparent",
      color: "white",
      border: "1px solid rgba(255,255,255,0.45)",
    },
  },
  onLight: {
    linkBg: "var(--cream)",
    linkBorder: "1px solid rgba(13,31,26,0.15)",
    linkColor: "var(--dark)",
    hint: "rgba(13,31,26,0.72)",
    primary: { backgroundColor: "var(--green)", color: "white", border: "none" },
    secondary: {
      backgroundColor: "white",
      color: "var(--green)",
      border: "1px solid var(--green)",
    },
  },
} as const;

const BUTTON: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 24px",
  borderRadius: "999px",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

export default function ReferralShare({
  link,
  tone,
}: {
  link: string;
  tone: keyof typeof TONES;
}) {
  const [copied, setCopied] = useState(false);
  const t = TONES[tone];

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked: the link is on screen and can be selected by hand.
    }
  }

  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "15px",
          color: t.hint,
          marginBottom: "16px",
        }}
      >
        Share with friends and family who are serious about marriage.
      </p>
      <p
        style={{
          padding: "12px 18px",
          borderRadius: "12px",
          backgroundColor: t.linkBg,
          border: t.linkBorder,
          color: t.linkColor,
          fontFamily: "var(--font-sans)",
          fontSize: "15px",
          overflowWrap: "anywhere",
          userSelect: "all",
          marginBottom: "16px",
        }}
      >
        {link}
      </p>
      {/* Copy only: tiers and referral months are worked out at launch. */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          color: t.hint,
          marginBottom: "16px",
        }}
      >
        Each friend who joins = +1 free month (up to 6). 3 friends → you move into the First 100.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button type="button" onClick={copy} style={{ ...BUTTON, ...t.primary }}>
          {copied ? "Copied" : "Copy link"}
        </button>
        <a
          href={whatsappShareUrl(link)}
          target="_blank"
          rel="noopener"
          style={{ ...BUTTON, ...t.secondary }}
        >
          Share on WhatsApp
        </a>
      </div>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
