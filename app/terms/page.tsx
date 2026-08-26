import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — BiyeHobe",
  description: "The terms for using BiyeHobe.",
};

export default function Terms() {
  return (
    <>
      <Navbar alwaysWhite />

      {/* Page header */}
      <section className="pt-28 pb-16 text-center" style={{ backgroundColor: "var(--cream)" }}>
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
        >
          Legal
        </p>
        <h1
          className="text-6xl sm:text-7xl leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            color: "var(--dark)",
          }}
        >
          Terms of Service
        </h1>
      </section>

      {/* Draft notice + content */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">
          <div
            className="mb-10 px-5 py-4 rounded-lg text-sm"
            style={{
              backgroundColor: "rgba(201,149,42,0.10)",
              border: "1px solid var(--gold)",
              color: "var(--dark)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <strong>Draft.</strong> This page is a placeholder while we finalize
            our full Terms of Service. We&apos;ll publish the complete version
            before the app opens to real users.
          </div>

          <div
            className="prose"
            style={{ fontFamily: "var(--font-sans)", color: "var(--dark)" }}
          >
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(13,31,26,0.72)" }}>
              By joining the BiyeHobe waitlist, you&apos;re agreeing to be
              contacted about the product&apos;s launch. You can ask to be
              removed at any time.
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(13,31,26,0.72)" }}>
              Once the app launches, using it will mean agreeing to a full set
              of terms covering conduct, content, and account rules — those
              will replace this placeholder before anyone can create an
              account.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(13,31,26,0.72)" }}>
              We take reports seriously and will act on every one submitted.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
