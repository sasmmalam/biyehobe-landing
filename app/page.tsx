"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ── Fade-up animation wrapper ─────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Tab SVG icons ─────────────────────────────────────────────────────────────

function IconGuardian() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// ── Built Differently tab UI ──────────────────────────────────────────────────

const TABS = [
  {
    id: "guardian",
    label: "Guardian Mode",
    Icon: IconGuardian,
    heading: "Family, Involved.",
    desc: "A trusted family member — parent, sibling, or wali — can join your search and review your conversations. Everything stays halal, transparent, and pressure-free.",
    badge: "100% optional · always in your control",
  },
  {
    id: "verified",
    label: "Verified Profiles",
    Icon: IconShield,
    heading: "Real People Only.",
    desc: "Every profile is reviewed against a government ID and a live selfie match by our admin team. No bots, no catfishing, no exceptions.",
    badge: "Gov ID + selfie-verified by our team",
  },
  {
    id: "diaspora",
    label: "Diaspora-First",
    Icon: IconGlobe,
    heading: "Built for NRBs Worldwide.",
    desc: "Whether you're in London, Toronto, or Dhaka — BiyeHobe surfaces matches who share your cultural background and understand wherever life has taken you.",
    badge: "Matches across 20+ cities worldwide",
  },
];

function BuiltDifferentlyTabs() {
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
                color: active === i ? "var(--dark)" : "rgba(13,31,26,0.45)",
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
          {/* Icon + badge side */}
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
                width: "72px",
                height: "72px",
                borderRadius: "20px",
                backgroundColor: "rgba(201,149,42,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold)",
              }}
            >
              <tab.Icon />
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(4,57,39,0.06)",
                borderRadius: "999px",
                padding: "6px 16px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--green)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--green)",
                  letterSpacing: "0.02em",
                }}
              >
                {tab.badge}
              </span>
            </div>
          </div>

          {/* Heading + desc */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 700,
                color: "var(--dark)",
                lineHeight: 1.1,
                marginBottom: "16px",
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

// ── FAQ accordion ─────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Who is BiyeHobe for?",
    a: "BiyeHobe is built for the Bangladeshi diaspora — NRBs and locals alike — who are ready for a serious, intentional relationship and want a dignified, private platform to find their match.",
  },
  {
    q: "How does verification work?",
    a: "Every profile is manually reviewed by our team. We verify identity documents and profile photos to ensure every person you meet on BiyeHobe is real and serious.",
  },
  {
    q: "What is Guardian Mode?",
    a: "Guardian Mode lets a trusted family member — a parent, sibling, or wali — actively participate in your search and communications, keeping everything halal and transparent from day one.",
  },
  {
    q: "Is my profile private?",
    a: "Absolutely. Your photos are blurred by default and only revealed when you choose. You control exactly who sees your profile and when.",
  },
  {
    q: "When does the app launch?",
    a: "We are currently building and collecting waitlist sign-ups. Early members will receive priority access. Join the waitlist to be first in line.",
  },
];

function FAQAccordion({ items = FAQ_ITEMS }: { items?: typeof FAQ_ITEMS }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ borderTop: "1px solid rgba(13,31,26,0.1)" }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: "1px solid rgba(13,31,26,0.1)" }}>
          <button
            className="w-full text-left py-5 flex items-center justify-between gap-4"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span
              className="text-base font-medium"
              style={{ color: "var(--dark)", fontFamily: "var(--font-sans)" }}
            >
              {item.q}
            </span>
            <ChevronDown
              size={18}
              style={{
                color: "var(--gold)",
                flexShrink: 0,
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.22s ease",
              }}
            />
          </button>
          {open === i && (
            <p
              className="pb-5 text-sm leading-relaxed"
              style={{ color: "rgba(13,31,26,0.6)", fontFamily: "var(--font-sans)" }}
            >
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Waitlist form ─────────────────────────────────────────────────────────────

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const { error } = await getSupabase()
      .from("waitlist")
      .insert({ email, created_at: new Date().toISOString() });

    if (!error) {
      setStatus("success");
      setEmail("");
    } else if (error.code === "23505") {
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="inline-block px-7 py-4 rounded-full text-sm font-medium"
        style={{
          backgroundColor: "rgba(255,255,255,0.15)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.35)",
          fontFamily: "var(--font-sans)",
        }}
      >
        You&apos;re on the list — we&apos;ll be in touch.
      </div>
    );
  }

  return (
    <div>
      {/* Trust strip */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        {[
          { icon: "🔒", text: "No data sold. Ever." },
          { icon: "✓", text: "Verified profiles only" },
          { icon: "🌍", text: "Built for the diaspora" },
        ].map(({ icon, text }) => (
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
            <span style={{ fontSize: "13px" }}>{icon}</span>
            {text}
          </span>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-5 py-3 rounded-full text-sm"
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.28)",
            fontFamily: "var(--font-sans)",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-7 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-60"
          style={{
            backgroundColor: "var(--gold)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {status === "loading" ? "Joining…" : "Join Waitlist"}
        </button>
      </form>

      {status === "duplicate" && (
        <p
          className="mt-3 text-sm text-center"
          style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
        >
          This email is already on the waitlist.
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-center text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center text-center"
        style={{ minHeight: "100svh" }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Hero.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay — transparent top, subtle dark center, deeper at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <div className="relative z-10 px-5 max-w-4xl mx-auto">
          {/* Brand wordmark */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(72px, 10vw, 96px)",
              lineHeight: 1,
              color: "white",
              letterSpacing: "0.04em",
            }}
          >
            BiyeHobe
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(20px, 3vw, 26px)",
              color: "white",
              marginTop: "20px",
              letterSpacing: "0.02em",
            }}
          >
            Where Tradition Meets Intention.
          </p>

          {/* Sub-tagline */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "16px",
              color: "rgba(255,255,255,0.80)",
              marginTop: "16px",
              letterSpacing: "0.01em",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            A private, verified space for the Bangladeshi diaspora — wherever
            home is.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#waitlist"
              className="px-9 py-4 rounded-full text-base font-medium text-white transition-opacity hover:opacity-85"
              style={{
                backgroundColor: "var(--gold)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Join the Waitlist
            </a>
            <a
              href="#how"
              className="text-sm transition-opacity hover:opacity-70"
              style={{
                color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Learn how it works ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section style={{ backgroundColor: "var(--green)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
          {[
            "Launching 2026",
            "Built for the Diaspora",
            "Optional Guardian Mode",
          ].map((stat) => (
            <p
              key={stat}
              className="text-center py-3 sm:py-0 text-sm font-medium tracking-widest uppercase text-white"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {stat}
            </p>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <FadeUp className="text-center mb-16">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{
                color: "var(--gold)",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
              }}
            >
              Simple &amp; Intentional
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 60px)",
                color: "var(--dark)",
              }}
            >
              How It Works
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                n: "1",
                title: "Create Your Profile",
                desc: "Answer a few meaningful questions about yourself — your values, lifestyle, and what you are looking for in a partner.",
              },
              {
                n: "2",
                title: "Get Verified",
                desc: "Your identity and photos are manually reviewed by our team. No bots. No fake profiles. Only real, serious people.",
              },
              {
                n: "3",
                title: "Start Connecting",
                desc: "Match, chat, and connect with serious intent — on your terms, with your family involved if you wish.",
              },
            ].map((step, i) => (
              <FadeUp key={step.n} delay={i * 130}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg mb-7"
                    style={{
                      backgroundColor: "var(--gold)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                    }}
                  >
                    {step.n}
                  </div>
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "24px",
                      color: "var(--dark)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#1a1a1a",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built Differently — Tab UI ── */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <FadeUp className="mb-12">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--gold)",
                marginBottom: "12px",
              }}
            >
              What Sets Us Apart
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 60px)",
                color: "var(--dark)",
              }}
            >
              Built Differently.
            </h2>
          </FadeUp>

          <FadeUp delay={100}>
            <BuiltDifferentlyTabs />
          </FadeUp>
        </div>
      </section>

      {/* ── About / Mission split ── */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
          <div
            className="py-20 px-8 lg:px-16 flex flex-col justify-center"
            style={{ backgroundColor: "var(--green)" }}
          >
            <FadeUp>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--gold)",
                  marginBottom: "20px",
                }}
              >
                Our Mission
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 5vw, 48px)",
                  color: "white",
                  marginBottom: "24px",
                  lineHeight: 1.15,
                }}
              >
                Built with intention.
              </h2>
              <p
                className="text-sm leading-relaxed mb-8 max-w-sm"
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                BiyeHobe was built for the Bangladeshi diaspora — NRBs and
                residents alike — who believe finding a life partner should be
                private, dignified, and purposeful.
              </p>
              <Link
                href="/about"
                className="text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-75"
                style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
              >
                Read Our Story →
              </Link>
            </FadeUp>
          </div>

          <div
            className="py-20 px-8 lg:px-16 flex flex-col justify-center"
            style={{ backgroundColor: "var(--cream)" }}
          >
            <FadeUp delay={120}>
              <blockquote
                className="text-3xl sm:text-4xl leading-snug"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  color: "var(--dark)",
                  fontStyle: "italic",
                }}
              >
                &ldquo;Where tradition meets intention.&rdquo;
              </blockquote>
              <p
                className="mt-6 text-xs uppercase tracking-widest"
                style={{
                  color: "rgba(13,31,26,0.38)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                — The BiyeHobe Founding Team
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-20 pb-8">
          <FadeUp className="text-center mb-14">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--gold)",
                marginBottom: "12px",
              }}
            >
              Common Questions
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 60px)",
                color: "var(--dark)",
              }}
            >
              FAQ
            </h2>
          </FadeUp>

          <FAQAccordion />

          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
            >
              See all questions →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Waitlist CTA ── */}
      <section id="waitlist" style={{ backgroundColor: "var(--green)" }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-24 lg:py-32 text-center">
          <FadeUp>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 60px)",
                color: "white",
                marginBottom: "20px",
                lineHeight: 1.1,
                letterSpacing: "0.02em",
              }}
            >
              Be Among the First.
            </h2>
            <p
              className="text-base mb-10"
              style={{
                color: "rgba(255,255,255,0.72)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Built for NRBs and Bangladeshis worldwide, with intention.
            </p>
            <WaitlistForm />
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  );
}
