import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — BiyeHobe",
  description:
    "What BiyeHobe collects on the waitlist site today, why, and who we share it with. Last updated 27 August 2026.",
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
              BiyeHobe is being built in Toronto by <strong>Shah Alam</strong>.
              This page explains, in plain language, what we collect right
              now, why, and what we do with it. We&apos;ll update it as the
              product grows — and we&apos;ll date every change.
            </P>
            <P>
              Today BiyeHobe is a waitlist page. There is no app yet, no
              accounts, no profiles, and no photos. So there is very little
              to tell you — which is exactly how it should be at this stage.
            </P>

            <hr
              className="my-10"
              style={{ border: "none", borderTop: "1px solid rgba(13,31,26,0.1)" }}
            />

            <H2>What we collect</H2>
            <P>
              <strong>Your email address</strong>, if you choose to join the
              waitlist. That&apos;s the only thing you give us.
            </P>
            <P>Alongside it we store:</P>
            <UL>
              <LI>
                <strong>The date and time you signed up</strong>
              </LI>
              <LI>
                <strong>Whether you confirmed your email</strong>, and when
              </LI>
              <LI>
                <strong>Your IP address at the moment of signup</strong>, kept
                for a short period and used only to stop automated abuse of
                the form
              </LI>
            </UL>
            <P>
              We do not ask for your name, your phone number, your age, your
              religion, your location, or anything about your marital
              intentions. Not yet, and not on this page.
            </P>

            <H2>Why we collect it</H2>
            <P>
              One reason: <strong>to tell you when BiyeHobe opens.</strong>
            </P>
            <P>
              We will also, occasionally, send you something we think is
              genuinely useful while you wait — an article, a tool, an update
              on what we&apos;re building. Never more than a few times a
              year. Every email has a one-click unsubscribe, and it works
              immediately.
            </P>
            <P>
              We will not use your email for anything else without asking you
              first.
            </P>

            <H2>Your consent</H2>
            <P>
              Joining the waitlist is your consent to be emailed about
              BiyeHobe.
            </P>
            <P>
              When you sign up, we send a confirmation email.{" "}
              <strong>
                Until you click the link in it, we treat you as unconfirmed
              </strong>{" "}
              and won&apos;t send you anything else. This protects you if
              someone types your address by mistake, and it gives us an
              honest record that you actually asked to hear from us.
            </P>
            <P>
              You can withdraw consent at any time — see{" "}
              <strong>Your rights</strong>, below.
            </P>

            <H2>Who we share it with</H2>
            <P>
              <strong>We do not sell your data. We never will.</strong>
            </P>
            <P>
              If ownership of BiyeHobe ever changes, we will tell you{" "}
              <strong>before</strong>{" "}
              it happens, not after. This matters to
              us because it has gone badly elsewhere in our industry, and we
              don&apos;t intend to repeat it.
            </P>
            <P>
              We use a small number of service providers to run the site.
              They process data on our instructions and cannot use it for
              their own purposes:
            </P>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--dark)" }}>
                    <th
                      className="py-3 pr-4"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "16px" }}
                    >
                      Provider
                    </th>
                    <th
                      className="py-3 pr-4"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "16px" }}
                    >
                      What they do
                    </th>
                    <th
                      className="py-3"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "16px" }}
                    >
                      Where
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Supabase", "Stores the waitlist database", "United States (us-east-1)"],
                    ["Vercel", "Hosts the website", "United States and global edge network"],
                    ["Resend", "Sends the confirmation and update emails", "United States"],
                  ].map(([provider, does, where]) => (
                    <tr key={provider} style={{ borderBottom: "1px solid rgba(13,31,26,0.1)" }}>
                      <td className="py-3 pr-4" style={{ color: "var(--dark)" }}>
                        <strong>{provider}</strong>
                      </td>
                      <td className="py-3 pr-4" style={{ color: "rgba(13,31,26,0.72)" }}>
                        {does}
                      </td>
                      <td className="py-3" style={{ color: "rgba(13,31,26,0.72)" }}>
                        {where}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <P>
              That&apos;s the complete list. No advertising networks. No data
              brokers. No tracking pixels from anyone else.
            </P>

            <H2>Your data is stored outside Canada</H2>
            <P>
              <strong>We want to be clear about this.</strong> Our database
              is hosted in the United States. That means your email address
              is stored on servers outside Canada, and while it is there it
              may be accessible to United States law enforcement or
              government authorities under the laws of that country,
              including through legal processes that do not require your
              knowledge or consent.
            </P>
            <P>
              This is true of most services you use, but you&apos;re
              entitled to know it rather than find out later. If this
              concerns you, please don&apos;t join the waitlist — and
              you&apos;re welcome to write to us and say so.
            </P>

            <H2>Cookies and tracking</H2>
            <P>
              This site sets{" "}
              <strong>
                no advertising cookies and no third-party tracking cookies.
              </strong>
            </P>
            <P>
              We may add basic, privacy-respecting analytics — how many
              people visited, which pages they read — so we can tell whether
              anything we write is useful. If and when we do, we will name
              the provider here first, and it will not track you across
              other websites.
            </P>

            <H2>How long we keep it</H2>
            <P>
              Until you ask us to delete it, or until BiyeHobe launches and
              you decide not to join — whichever comes first.
            </P>
            <P>
              If BiyeHobe is ever abandoned before launch,{" "}
              <strong>we will delete the entire waitlist</strong>{" "}
              and tell you we&apos;ve done it.
            </P>
            <P>Unconfirmed signups are deleted automatically after 90 days.</P>

            <H2>How we protect it</H2>
            <P>
              The database is access-controlled and encrypted in transit and
              at rest. The waitlist is not publicly readable — there is no
              way for a visitor to the site to see who else has signed up.
              Access is limited to the founder.
            </P>
            <P>
              We&apos;re a small operation and we won&apos;t pretend to have
              a security team. What we will do is tell you promptly and
              honestly if anything ever goes wrong, and report it to the
              Office of the Privacy Commissioner of Canada as the law
              requires.
            </P>

            <H2>Your rights</H2>
            <P>You can, at any time:</P>
            <UL>
              <LI>
                <strong>See</strong> what we hold about you
              </LI>
              <LI>
                <strong>Correct</strong> it
              </LI>
              <LI>
                <strong>Delete</strong> it — completely, not just unsubscribed
              </LI>
              <LI>
                <strong>Withdraw consent</strong> to be emailed
              </LI>
              <LI>
                <strong>Ask us a question</strong> about any of this and get
                a real answer
              </LI>
            </UL>
            <P>
              Email <strong>hello@biyehobe.com</strong>. We&apos;ll respond
              within 30 days, and usually much sooner. There&apos;s no form
              and no process — just write to us.
            </P>
            <P>
              If you&apos;re unhappy with how we&apos;ve handled your
              information, you have the right to complain to the{" "}
              <strong>Office of the Privacy Commissioner of Canada</strong>{" "}
              at{" "}
              <a
                href="https://www.priv.gc.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-opacity hover:opacity-75"
                style={{ color: "var(--gold)" }}
              >
                priv.gc.ca
              </a>
              , or to your local privacy regulator.
            </P>

            <H2>Children</H2>
            <P>
              BiyeHobe is for adults. The waitlist is not intended for anyone
              under 18, and the app will be 18+ when it launches. If you
              believe a minor has given us their email, write to us and
              we&apos;ll delete it immediately.
            </P>

            <H2>Changes to this policy</H2>
            <P>
              If we change anything meaningful, we&apos;ll update the date at
              the top and email everyone on the waitlist to say what
              changed. We won&apos;t quietly rewrite it.
            </P>

            <H2>Who&apos;s responsible</H2>
            <P>
              BiyeHobe is operated by <strong>Shah Alam</strong>, Toronto,
              Ontario, Canada.
            </P>
            <P>
              Privacy questions, requests, and complaints:{" "}
              <strong>hello@biyehobe.com</strong>
            </P>
            <p
              className="text-sm italic mt-10"
              style={{ color: "rgba(13,31,26,0.5)" }}
            >
              This policy is governed by the laws of the Province of Ontario
              and the federal laws of Canada applicable there.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
