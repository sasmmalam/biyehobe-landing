"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Phone,
  MapPin,
  Lock,
  Zap,
  ChevronDown,
} from "lucide-react";
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
      <section className="relative flex items-center justify-center text-center" style={{ minHeight: "100svh" }}>
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1800&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(4,57,39,0.65)" }}
        />

        <div className="relative z-10 px-5 max-w-4xl mx-auto">
          <h1
            className="text-6xl sm:text-7xl lg:text-[88px] leading-none text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              letterSpacing: "0.035em",
            }}
          >
            Where Tradition Meets Intention.
          </h1>
          <p
            className="mt-7 text-lg sm:text-xl max-w-xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.80)",
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              letterSpacing: "0.01em",
            }}
          >
            A private, verified space for the Bangladeshi diaspora — wherever
            home is.
          </p>
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
                color: "rgba(255,255,255,0.70)",
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
            "Guardian Mode Included",
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
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <FadeUp className="text-center mb-16">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
            >
              Simple & Intentional
            </p>
            <h2
              className="text-5xl sm:text-6xl"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
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
                      fontWeight: 600,
                    }}
                  >
                    {step.n}
                  </div>
                  <h3
                    className="text-2xl mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      color: "var(--dark)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#4A5568",
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

      {/* ── Features ── */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <FadeUp className="text-center mb-16">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
            >
              What Sets Us Apart
            </p>
            <h2
              className="text-5xl sm:text-6xl"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--dark)",
              }}
            >
              Built Differently.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                Icon: Users,
                title: "Guardian Mode",
                desc: "Involve family from day one, the halal way.",
              },
              {
                Icon: ShieldCheck,
                title: "Verified Profiles",
                desc: "Every account manually reviewed by our team.",
              },
              {
                Icon: Phone,
                title: "Audio Calls",
                desc: "Connect through voice before meeting in person.",
              },
              {
                Icon: MapPin,
                title: "Location Matching",
                desc: "Find matches near you or worldwide.",
              },
              {
                Icon: Lock,
                title: "Privacy First",
                desc: "Control exactly who sees your profile.",
              },
              {
                Icon: Zap,
                title: "Smart Matching",
                desc: "Preference-based compatibility scoring.",
              },
            ].map((feat, i) => (
              <FadeUp key={feat.title} delay={i * 70}>
                <div
                  className="p-8 rounded-2xl h-full"
                  style={{
                    backgroundColor: "var(--cream)",
                    border: "1px solid #E8E2D8",
                    boxShadow: "0 2px 12px rgba(4,57,39,0.06)",
                  }}
                >
                  <feat.Icon
                    size={22}
                    style={{ color: "var(--gold)", marginBottom: "16px" }}
                  />
                  <h3
                    className="text-xl mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      color: "var(--dark)",
                    }}
                  >
                    {feat.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#4A5568",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {feat.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
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
                className="text-xs uppercase tracking-widest mb-5"
                style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
              >
                Our Mission
              </p>
              <h2
                className="text-4xl sm:text-5xl text-white mb-6 leading-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
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
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-16 pb-8">
          <FadeUp className="text-center mb-14">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
            >
              Common Questions
            </p>
            <h2
              className="text-5xl sm:text-6xl"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--dark)",
              }}
            >
              Common Questions
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
              className="text-5xl sm:text-6xl text-white mb-5 leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
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
