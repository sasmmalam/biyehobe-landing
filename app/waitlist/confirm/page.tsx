import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ReferralShare from "../../components/ReferralShare";
import { confirmByToken } from "@/lib/waitlist";

// /waitlist/confirm?t=TOKEN — the link in the confirmation email. Opening it
// confirms the signup. Not in the sitemap and not indexed.

export const metadata = {
  title: "Confirm your waitlist spot — BiyeHobe",
  robots: { index: false, follow: false },
  referrer: "no-referrer" as const,
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

const BODY = "rgba(13,31,26,0.72)";

export default async function ConfirmWaitlist({ searchParams }: Props) {
  const { t } = await searchParams;
  const confirmed = typeof t === "string" ? await confirmByToken(t) : null;

  return (
    <>
      <Navbar alwaysWhite />
      <main className="flex-1" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-xl mx-auto px-5 sm:px-8 pt-36 pb-24 text-center">
          <h1
            className="text-5xl sm:text-6xl mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--dark)", lineHeight: 1.08 }}
          >
            {confirmed ? "You're on the list." : "This link didn't work."}
          </h1>

          {confirmed ? (
            <>
              <p className="text-lg mb-10" style={{ color: BODY, fontFamily: "var(--font-sans)" }}>
                Your email is confirmed. We&apos;ll let you know when BiyeHobe opens to everyone.
              </p>
              <div
                className="p-6 sm:p-8 rounded-2xl"
                style={{ backgroundColor: "white", border: "1px solid rgba(13,31,26,0.1)" }}
              >
                <ReferralShare link={confirmed.referralLink} tone="onLight" />
              </div>
            </>
          ) : (
            <>
              <p className="text-lg mb-10" style={{ color: BODY, fontFamily: "var(--font-sans)" }}>
                It may have expired or already been used. If you already confirmed, you&apos;re on
                the list and there&apos;s nothing more to do. Otherwise, enter your email again and
                we&apos;ll send a new link.
              </p>
              <Link
                href="/#waitlist"
                className="inline-block px-8 py-4 rounded-full text-sm transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--green)",
                  color: "white",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                }}
              >
                Back to the waitlist
              </Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
