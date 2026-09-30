"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FAQ_ITEMS = [
  {
    q: "Who is BiyeHobe for?",
    a: "BiyeHobe is built for the Bangladeshi diaspora — NRBs living abroad, Bangladeshis open to relocating, and anyone seeking a meaningful, intentional match within the community.",
  },
  {
    q: "How does verification work?",
    a: "Verification is two checks. First, a live selfie check, run by our partner Didit, confirms a real person is holding the phone. Then we match your main photo against that selfie. The ✓ shows on your profile only when both pass. If your main photo doesn't match, the ✓ comes off and the photo is flagged for review. There's no ID check, and verifying is optional.",
  },
  {
    q: "Who can see my photos?",
    a: "Other signed-in BiyeHobe members can see the photos on your profile. You choose which photos to add — up to six — and you can remove any of them at any time.",
  },
  {
    q: "Who can see my profile?",
    a: "Other signed-in members can see your profile — that's how the right person finds you. They never see your email, phone number or exact location. You can block anyone, which hides you from each other, report anyone, and delete your account at any time from the app.",
  },
  {
    q: "When does the app launch?",
    a: "We're testing the app with a small group of people right now. Join the waitlist and we'll let you know when it opens to everyone.",
  },
  {
    q: "Can I use BiyeHobe if I live outside Bangladesh?",
    a: "Yes — BiyeHobe is built with the global Bangladeshi community in mind. Whether you are in the UK, USA, Canada, Australia, or the Middle East, BiyeHobe is for you.",
  },
  {
    q: "How are matches suggested?",
    a: "The people you see are filtered by the preferences you set — age, height, religion, practising level, marital status, education, country and distance. Verified profiles are shown first, and you won't see the same person again once you've liked or passed on them.",
  },
  {
    q: "What happens if I report a bad actor?",
    a: "You can report anyone from their profile or from your chat. The report comes to us with the reason you chose, your note, and a copy of your recent messages with that person, and we decide what to do — from a warning to closing the account. You can also block them, which hides you from each other straight away.",
  },
  {
    q: "How do I contact BiyeHobe?",
    a: "Email hello@biyehobe.com — a real person reads it.",
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
                color: "var(--gold-ink)",
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

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FAQ() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <Navbar alwaysWhite />

      {/* Header */}
      <section
        className="pt-28 pb-16 text-center"
        style={{ backgroundColor: "var(--cream)" }}
      >
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "var(--gold-ink)", fontFamily: "var(--font-sans)" }}
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
            className="inline-block mt-6 px-9 py-4 rounded-full text-dark text-sm font-medium transition-opacity hover:opacity-85"
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
