import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About — BiyeHobe",
  description:
    "Learn about our story, our mission, and why we built BiyeHobe for Bangladeshi Muslim professionals worldwide.",
};

export default function About() {
  return (
    <>
      <Navbar alwaysWhite />

      {/* Page header */}
      <section className="pt-28 pb-16 text-center" style={{ backgroundColor: "var(--cream)" }}>
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
        >
          Our Story
        </p>
        <h1
          className="text-6xl sm:text-7xl leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            color: "var(--dark)",
          }}
        >
          About BiyeHobe
        </h1>
      </section>

      {/* Mission statement */}
      <section style={{ backgroundColor: "var(--green)" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 text-center">
          <blockquote
            className="text-3xl sm:text-4xl lg:text-5xl text-white leading-snug"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontStyle: "italic",
            }}
          >
            &ldquo;Finding a life partner should be private, dignified, and
            purposeful.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Main content */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">
          <div
            className="prose"
            style={{ fontFamily: "var(--font-sans)", color: "var(--dark)" }}
          >
            <h2
              className="text-3xl sm:text-4xl mb-6"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Why We Built BiyeHobe
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(13,31,26,0.72)" }}
            >
              For too long, the Bangladeshi community has had to choose between
              matrimonial platforms that feel outdated and impersonal, or
              general-purpose apps that don&apos;t understand the cultural and
              religious nuances of our community. BiyeHobe was born from the
              belief that this gap shouldn&apos;t exist.
            </p>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(13,31,26,0.72)" }}
            >
              We built BiyeHobe for the Bangladeshi Muslim professional —
              the doctor in London, the engineer in Toronto, the finance
              professional in New York, the academic in Dhaka — who wants to
              find a life partner the right way. Someone who shares their
              values, understands their family expectations, and approaches
              marriage with the same seriousness and sincerity they bring to
              every other part of their life.
            </p>

            <h2
              className="text-3xl sm:text-4xl mb-6 mt-12"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Our Values
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(13,31,26,0.72)" }}
            >
              Everything we build at BiyeHobe is guided by three core
              principles: intention, dignity, and family. We believe that
              marriage is one of the most important decisions a person will ever
              make, and the process of finding a spouse should reflect that
              gravity. That means no swiping, no casual browsing, no anonymous
              connections.
            </p>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(13,31,26,0.72)" }}
            >
              Every feature we ship is designed to encourage serious intent.
              Profiles are detailed and thoughtful. Verification is thorough.
              Guardian Mode lets family participate meaningfully. Audio calls
              allow voices to be heard before faces are seen. Privacy controls
              ensure you share only what you&apos;re comfortable sharing.
            </p>

            <h2
              className="text-3xl sm:text-4xl mb-6 mt-12"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              The Community We Serve
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(13,31,26,0.72)" }}
            >
              BiyeHobe is built specifically for Bangladeshi Muslim
              professionals, whether they live in Dhaka or Dubai, Birmingham or
              Brisbane. The Non-Resident Bangladeshi (NRB) community is one of
              the most accomplished and globally dispersed diaspora communities
              in the world — and it deserves a matrimonial platform that
              understands its specific needs, challenges, and hopes.
            </p>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(13,31,26,0.72)" }}
            >
              We understand the unique challenges of long-distance matches, of
              navigating family expectations across continents, of finding
              someone who shares both your professional ambitions and your
              cultural roots. BiyeHobe is designed to make all of this easier,
              more dignified, and more hopeful.
            </p>

            <h2
              className="text-3xl sm:text-4xl mb-6 mt-12"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              What&apos;s Coming
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(13,31,26,0.72)" }}
            >
              We are currently in private beta, carefully building and refining
              the platform with feedback from our waitlist community. When we
              launch, it will be to a curated group of early members who helped
              shape what BiyeHobe has become.
            </p>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "rgba(13,31,26,0.72)" }}
            >
              If you believe in what we&apos;re building — a matrimonial
              experience that is modern without losing its values, digital
              without losing its humanity — we&apos;d love to have you with us
              from the start.
            </p>

            <a
              href="/#waitlist"
              className="inline-block px-8 py-4 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-85"
              style={{
                backgroundColor: "var(--gold)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* Team note */}
      <section style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 text-center">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
          >
            Questions?
          </p>
          <p
            className="text-base mb-4"
            style={{ color: "rgba(13,31,26,0.65)", fontFamily: "var(--font-sans)" }}
          >
            We&apos;d love to hear from you.
          </p>
          <Link
            href="/faq"
            className="text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: "var(--green)", fontFamily: "var(--font-sans)" }}
          >
            Visit our FAQ →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
