import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use — BiyeHobe",
  description:
    "The terms for using the BiyeHobe waitlist site — what we promise, what we don't, and what's ours. Last updated 27 August 2026.",
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl sm:text-4xl mb-6 mt-12"
      style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-base leading-relaxed mb-6"
      style={{ color: "rgba(13,31,26,0.72)" }}
    >
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-3 mb-6">{children}</ul>;
}

function LI({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="flex items-start gap-3 text-base leading-relaxed"
      style={{ color: "rgba(13,31,26,0.72)" }}
    >
      <span
        className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: "var(--gold)" }}
      />
      <span>{children}</span>
    </li>
  );
}

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
          Terms of Use
        </h1>
        <p
          className="mt-6 text-sm"
          style={{ color: "rgba(13,31,26,0.5)", fontFamily: "var(--font-sans)" }}
        >
          Last updated: 27 August 2026
        </p>
      </section>

      {/* Content */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">
          <div style={{ fontFamily: "var(--font-sans)", color: "var(--dark)" }}>
            <P>
              These terms cover the BiyeHobe website at biyehobe.com.
              They&apos;re short, because right now the site does very
              little: it tells you what we&apos;re building and lets you
              join a waitlist.
            </P>
            <P>
              When the app launches, there will be a separate, fuller set of
              terms covering how people treat each other on the platform.
              These aren&apos;t those.
            </P>
            <P>By using this site, you&apos;re agreeing to what&apos;s below.</P>

            <hr
              className="my-10"
              style={{ border: "none", borderTop: "1px solid rgba(13,31,26,0.1)" }}
            />

            <H2>What this site is</H2>
            <P>
              BiyeHobe is a matrimonial app for Bangladeshis, under
              construction in Toronto. <strong>It does not exist yet.</strong>
            </P>
            <P>
              This website describes what we intend to build and invites you
              to be told when it&apos;s ready. Nothing here is a product you
              can use, a service you&apos;re buying, or a promise that any
              particular feature will ship.
            </P>
            <P>
              We describe features honestly — anything not yet built is
              marked as such. But plans change during development. If
              something described here doesn&apos;t make it into the app,
              that&apos;s not a broken promise; it&apos;s a plan that
              changed.
            </P>

            <H2>Who can use it</H2>
            <P>
              You must be <strong>18 or older</strong> to join the waitlist.
              BiyeHobe is for adults seeking marriage.
            </P>

            <H2>What we&apos;re not promising</H2>
            <P>Plainly, so there&apos;s no confusion later:</P>
            <UL>
              <LI>We don&apos;t promise the app will launch, or launch by any particular date</LI>
              <LI>We don&apos;t promise you a place in it, or priority, or free access</LI>
              <LI>We don&apos;t promise a match, an introduction, or any outcome</LI>
              <LI>We don&apos;t promise the site will always be available or error-free</LI>
            </UL>
            <P>
              BiyeHobe is a personal project being built by one person
              outside of his day job. We intend to finish it. We&apos;re not
              able to guarantee it.
            </P>

            <H2>Using this site fairly</H2>
            <P>Please don&apos;t:</P>
            <UL>
              <LI>Submit someone else&apos;s email address without their permission</LI>
              <LI>Use automated tools to submit the form repeatedly</LI>
              <LI>Attempt to access parts of the site or database you haven&apos;t been given access to</LI>
              <LI>
                Probe, scan, or test the security of the site —{" "}
                <strong>
                  though if you find a genuine vulnerability, please tell us
                  at hello@biyehobe.com. We&apos;ll thank you properly and we
                  won&apos;t come after you for reporting it in good faith.
                </strong>
              </LI>
              <LI>Copy the site&apos;s design, text, or the BiyeHobe knot mark for your own product</LI>
              <LI>Misrepresent yourself as connected to BiyeHobe</LI>
            </UL>

            <H2>What belongs to us</H2>
            <P>
              The BiyeHobe name, the knot mark, the design of this site, and
              the words on it are ours. You&apos;re welcome to link to us,
              quote us with attribution, and share anything we publish.
              You&apos;re not welcome to pass it off as your own or use the
              mark on your own product.
            </P>

            <H2>Links to other sites</H2>
            <P>
              Where we link somewhere else — a government page, an article,
              a resource — we don&apos;t control that site and aren&apos;t
              responsible for what&apos;s on it.
            </P>

            <H2>Where you stand legally</H2>
            <P>
              The site is provided <strong>as is</strong>. We&apos;ve built
              it carefully and we mean well, but we can&apos;t warrant that
              it&apos;s free of errors or always available.
            </P>
            <P>
              To the fullest extent the law allows, we&apos;re not liable
              for indirect or consequential loss arising from your use of
              this website. Nothing here limits any liability that
              can&apos;t be limited under Canadian law — including for
              fraud, or for anything relating to a person&apos;s
              fundamental rights.
            </P>

            <H2>Privacy</H2>
            <P>
              How we handle your email is set out in our{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 transition-opacity hover:opacity-75"
                style={{ color: "var(--gold)" }}
              >
                Privacy Policy
              </Link>
              . Short version: one email address, stored securely, never
              sold, delete it whenever you like.
            </P>

            <H2>Changes</H2>
            <P>
              We may update these terms as the product develops. Meaningful
              changes will be dated at the top, and if you&apos;re on the
              waitlist we&apos;ll email you.
            </P>

            <H2>Governing law</H2>
            <P>
              These terms are governed by the laws of the Province of
              Ontario and the federal laws of Canada applicable there. Any
              dispute goes to the courts of Ontario.
            </P>

            <H2>Contact</H2>
            <P>
              BiyeHobe is operated by <strong>Shah Alam</strong>, Toronto,
              Ontario, Canada.
            </P>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(13,31,26,0.72)" }}
            >
              <strong>hello@biyehobe.com</strong> — a real person reads it.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
