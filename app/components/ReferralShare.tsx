"use client";

import { useState } from "react";
import Link from "next/link";
import { GOLD_TERMS_HREF } from "./GoldOffer";
import { whatsappShareUrl } from "@/lib/waitlist-shared";

// A member's referral link with Copy and WhatsApp buttons. Used in the
// waitlist form (on green) and on /waitlist/confirm (on white).

const TONES = {
  onGreen: {
    linkBg: "rgba(255,255,255,0.12)",
    linkBorder: "1px solid rgba(255,255,255,0.28)",
    linkColor: "white",
    hint: "rgba(255,255,255,0.72)",
    link: "var(--gold-light)",
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
    link: "var(--gold-ink)",
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
  introduceGold = false,
}: {
  link: string;
  tone: keyof typeof TONES;
  /** First mention of BiyeHobe Gold on the page: adds "our premium membership". */
  introduceGold?: boolean;
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
      {/* Copy only: referral months are worked out at launch. No tier or
          spots wording here (S68) — the full offer is on /terms. */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          color: t.hint,
          marginBottom: "16px",
        }}
      >
        You&apos;ll get at least 3 months of BiyeHobe Gold{introduceGold ? ", our premium membership," : ""}{" "}
        <Link
          href={GOLD_TERMS_HREF}
          className="underline underline-offset-4"
          style={{ color: t.link }}
        >
          free
        </Link>{" "}
        when we launch. Each friend who joins adds a free month, up to 6.
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
