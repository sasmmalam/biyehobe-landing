"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FAQ_ITEMS = [
  {
    q: "Who is BiyeHobe for?",
    a: "BiyeHobe is built for Bangladeshi Muslim professionals — NRBs and locals alike — who are ready for a serious, faith-aligned relationship. Whether you are based in Dhaka or Dubai, London or Toronto, BiyeHobe is your space.",
  },
  {
    q: "How does verification work?",
    a: "Every profile is manually reviewed by our team before it goes live. We verify identity documents and profile photos to ensure that every person you meet is real and serious. Verified profiles carry a badge visible to connections.",
  },
  {
    q: "What is Guardian Mode?",
    a: "Guardian Mode lets a trusted family member — a parent, sibling, or wali — actively participate in your search and communications. They can view your matches, read messages, and even send messages on your behalf, keeping everything halal and transparent from day one.",
  },
  {
    q: "Is my profile private?",
    a: "Absolutely. Your photos are blurred by default and only revealed when both parties choose to unlock them. You can also set your profile to only be visible to people you have approved. You are always in control.",
  },
  {
    q: "When does the app launch?",
    a: "We are currently in private beta, building and refining the platform with early users. Those on the waitlist will receive priority access when we open doors. Join now to be among the first.",
  },
  {
    q: "Is BiyeHobe free to use?",
    a: "We will offer a free tier with core features and a premium plan with additional capabilities such as advanced filters, priority matching, and audio calls. Pricing details will be shared closer to launch.",
  },
  {
    q: "Can I use BiyeHobe if I live outside Bangladesh?",
    a: "Yes — BiyeHobe is built with the global Bangladeshi Muslim community in mind. Whether you are in the UK, USA, Canada, Australia, or the Middle East, BiyeHobe is for you.",
  },
  {
    q: "How are matches suggested?",
    a: "Our matching engine considers your stated preferences — age range, location, education, religiosity, family background, and lifestyle — to surface profiles that are genuinely compatible. We prioritise quality over quantity.",
  },
  {
    q: "What happens if I report a bad actor?",
    a: "Reports are taken extremely seriously. Our team investigates every report and permanently removes users who violate our community standards. Your safety is non-negotiable.",
  },
  {
    q: "How do I contact the BiyeHobe team?",
    a: "You can reach us at the email provided when you sign up for the waitlist. We read every message and aim to respond within 48 hours.",
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ borderTop: "1px solid rgba(13,31,26,0.1)" }}>
      {FAQ_ITEMS.map((item, i) => (
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
              style={{
                color: "rgba(13,31,26,0.62)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <Navbar alwaysWhite />

      {/* Header */}
      <section
        className="pt-28 pb-16 text-center"
        style={{ backgroundColor: "var(--cream)" }}
      >
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
        >
          Help Center
        </p>
        <h1
          className="text-6xl sm:text-7xl leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            color: "var(--dark)",
          }}
        >
          Frequently Asked Questions
        </h1>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">
          <FAQAccordion />
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "var(--green)" }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 text-center">
          <h2
            className="text-4xl sm:text-5xl text-white mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Still have questions?
          </h2>
          <p
            className="text-sm mb-2"
            style={{
              color: "rgba(255,255,255,0.70)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Join the waitlist and we&apos;ll be in touch with everything you
            need to know.
          </p>
          <a
            href="/#waitlist"
            className="inline-block mt-6 px-9 py-4 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-85"
            style={{
              backgroundColor: "var(--gold)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
