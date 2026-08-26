import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — BiyeHobe",
  description: "How BiyeHobe handles your data.",
};

export default function Privacy() {
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
          Privacy Policy
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
            our full Privacy Policy. We&apos;ll publish the complete version
            before the app opens to real users.
          </div>

          <div
            className="prose"
            style={{ fontFamily: "var(--font-sans)", color: "var(--dark)" }}
          >
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(13,31,26,0.72)" }}>
              We collect the information you give us directly — your email
              when you join the waitlist, and your profile details once the
              app launches. We use it to run BiyeHobe and to communicate with
              you about it. We don&apos;t sell your data, and we never will.
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(13,31,26,0.72)" }}>
              If ownership of BiyeHobe ever changes, we&apos;ll tell you —
              that&apos;s a commitment, not boilerplate.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(13,31,26,0.72)" }}>
              Questions about your data? Reach us at the contact address in
              our footer once it&apos;s live, or through the waitlist
              confirmation email in the meantime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
