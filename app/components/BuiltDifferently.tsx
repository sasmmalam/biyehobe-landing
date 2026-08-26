"use client";

import { useState } from "react";

function IconEyeOff() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 7 10 7a12.9 12.9 0 0 1-2.9 3.94" />
      <path d="M6.3 6.3C3.4 8.1 2 11 2 11s3 7 10 7a9.5 9.5 0 0 0 4.2-.94" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
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

const TABS = [
  {
    id: "privacy",
    label: "Photo Privacy",
    Icon: IconEyeOff,
    heading: "You choose who sees you.",
    desc: "You choose who sees your photos. Blurred by default — you decide when to reveal, and to whom.",
    badge: "Blurred by default",
  },
  {
    id: "trust",
    label: "Trust Profile",
    Icon: IconShield,
    heading: "A Trust Profile, not a checkmark.",
    desc: "Every profile shows exactly what's been confirmed — phone, location, references — and what's self-reported. No badge that means nothing.",
    badge: "Manual review",
  },
  {
    id: "diaspora",
    label: "Diaspora-First",
    Icon: IconGlobe,
    heading: "Built for wherever home is.",
    desc: "Whether you're in Toronto, London, or Dhaka — BiyeHobe finds matches across the diaspora, not just locally.",
    badge: "Global + local",
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
                color: "var(--gold)",
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
    </div>
  );
}
