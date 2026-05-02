"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import BuiltDifferently from "./components/BuiltDifferently";
import WaitlistForm from "./components/WaitlistForm";

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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center text-center"
        style={{ minHeight: "100vh" }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Hero.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        <div
          className="relative z-10 px-5 max-w-4xl mx-auto"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {/* Logo mark */}
          <div style={{ marginBottom: "16px", lineHeight: 0 }}>
            <Logo size={88} color="#C9952A" />
          </div>

          {/* Brand wordmark */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "88px",
              lineHeight: 1,
              color: "white",
              letterSpacing: "0.04em",
              textShadow: "0 2px 12px rgba(0,0,0,0.45)",
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
              fontSize: "24px",
              color: "rgba(255,255,255,0.90)",
              marginTop: "20px",
              letterSpacing: "0.02em",
              textShadow: "0 2px 12px rgba(0,0,0,0.45)",
            }}
          >
            Where Tradition Meets Intention.
          </p>

          {/* Sub-tagline */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "16px",
              color: "rgba(255,255,255,0.75)",
              marginTop: "16px",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
              textShadow: "0 2px 12px rgba(0,0,0,0.45)",
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
            "Coming Summer 2026",
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

      {/* ── Built Differently ── */}
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
            <BuiltDifferently />
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
