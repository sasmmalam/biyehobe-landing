"use client";

import { useState } from "react";
import Link from "next/link";

function IconSliders() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// S67: verification, photo control, blocking and reporting moved to the
// "Safety first" home section and /safety, so they aren't repeated here.
const TABS = [
  {
    id: "diaspora",
    label: "Diaspora-First",
    Icon: IconGlobe,
    heading: "Built for wherever home is.",
    desc: "Whether you're in Toronto, London, or Dhaka — BiyeHobe finds matches across the diaspora, not just locally.",
    badge: "Global + local",
  },
  {
    id: "depth",
    label: "Profiles With Depth",
    Icon: IconSliders,
    heading: "More than a photo.",
    desc: "Profiles cover faith, family plans, education and lifestyle, so you can decide with care. The most personal questions always offer \"Prefer not to say\".",
    badge: "Faith · Family · Lifestyle",
  },
  {
    id: "everyone",
    label: "Every Bangladeshi",
    Icon: IconPeople,
    heading: "For all of us.",
    desc: "BiyeHobe is for every Bangladeshi who is serious about marriage, whatever their religion. If faith matters to you, you can filter by it.",
    badge: "Open to all",
  },
];

export default function BuiltDifferently() {
  const [active, setActive] = useState(0);
  const [panelVisible, setPanelVisible] = useState(true);

  function handleSwitch(i: number) {
    if (i === active) return;
    setPanelVisible(false);
    setTimeout(() => {
      setActive(i);
      setPanelVisible(true);
    }, 160);
  }

  const tab = TABS[active];

  return (
    <div>
      {/* Tab bar */}
      <div
        style={{
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          borderBottom: "1px solid rgba(13,31,26,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            gap: 0,
            minWidth: "max-content",
          }}
        >
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => handleSwitch(i)}
              style={{
                padding: "14px 32px",
                fontFamily: active === i ? "var(--font-display)" : "var(--font-sans)",
                fontWeight: active === i ? 700 : 400,
                fontSize: active === i ? "18px" : "14px",
                color: active === i ? "var(--dark)" : "#6b7280",
                background: "none",
                border: "none",
                borderBottom: active === i ? "2px solid var(--gold)" : "2px solid transparent",
                cursor: "pointer",
                transition: "color 0.18s ease, border-color 0.18s ease",
                letterSpacing: active === i ? "0.01em" : "0.02em",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab panel */}
      <div
        style={{
          opacity: panelVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
          paddingTop: "48px",
          paddingBottom: "16px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "32px",
            alignItems: "center",
          }}
          className="md:grid-cols-[1fr_1.4fr]"
        >
          {/* Icon + badge */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "18px",
                backgroundColor: "rgba(201,149,42,0.09)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold)",
              }}
            >
              <tab.Icon />
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 14px",
                borderRadius: "999px",
                border: "1px solid var(--gold)",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--gold-ink)",
                letterSpacing: "0.02em",
              }}
            >
              {tab.badge}
            </span>
          </div>

          {/* Heading + description */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--dark)",
                lineHeight: 1.15,
                marginBottom: "14px",
              }}
            >
              {tab.heading}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#1a1a1a",
                maxWidth: "480px",
              }}
            >
              {tab.desc}
            </p>
          </div>
        </div>
      </div>

      <p
        className="mt-6 text-sm"
        style={{ fontFamily: "var(--font-sans)", color: "rgba(13,31,26,0.72)" }}
      >
        Verification, photo blur and reporting are explained on{" "}
        <Link
          href="/safety"
          className="underline underline-offset-4 transition-opacity hover:opacity-70"
          style={{ color: "var(--gold-ink)" }}
        >
          Safety &amp; trust
        </Link>
        .
      </p>
    </div>
  );
}
