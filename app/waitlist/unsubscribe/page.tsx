import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { unsubscribeByToken } from "@/lib/waitlist";
import { CONTACT_EMAIL } from "@/lib/site";

// /waitlist/unsubscribe?t=TOKEN — the Unsubscribe link in every waitlist
// email. Opening it unsubscribes. The page reads the same whether or not the
// token belongs to anyone. ?resubscribed=1|0 is where the Re-subscribe button
// lands (no token, so a refresh doesn't unsubscribe again).

export const metadata = {
  title: "Unsubscribe — BiyeHobe",
  robots: { index: false, follow: false },
  referrer: "no-referrer" as const,
};

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

const BODY = "rgba(13,31,26,0.72)";
const BUTTON: React.CSSProperties = {
  backgroundColor: "var(--green)",
  color: "white",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  cursor: "pointer",
};

const CONTACT = (
  <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4" style={{ color: "var(--gold-ink)" }}>
    {CONTACT_EMAIL}
  </a>
);

export default async function UnsubscribeWaitlist({ searchParams }: Props) {
  const { t, resubscribed } = await searchParams;
  const token = typeof t === "string" ? t : "";

  let view: "unsubscribed" | "resubscribed" | "missing" | "error";
  if (resubscribed === "1") view = "resubscribed";
  else if (resubscribed === "0") view = "error";
  else if (!token) view = "missing";
  else view = (await unsubscribeByToken(token)) === "ok" ? "unsubscribed" : "error";

  const heading = {
    unsubscribed: "You're unsubscribed.",
    resubscribed: "You're back on the list.",
    missing: "This link is incomplete.",
    error: "Something went wrong.",
  }[view];

  return (
    <>
      <Navbar alwaysWhite />
      <main className="flex-1" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-xl mx-auto px-5 sm:px-8 pt-36 pb-24 text-center">
          <h1
            className="text-5xl sm:text-6xl mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--dark)", lineHeight: 1.08 }}
          >
            {heading}
          </h1>

          <div className="text-lg" style={{ color: BODY, fontFamily: "var(--font-sans)" }}>
            {view === "unsubscribed" && (
              <>
                <p className="mb-10">
                  We won&apos;t send you any more emails about the BiyeHobe waitlist. Changed your
                  mind, or got here by mistake?
                </p>
                <form method="post" action="/api/waitlist/unsubscribe">
                  <input type="hidden" name="action" value="resubscribe" />
                  <input type="hidden" name="t" value={token} />
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-full text-sm transition-opacity hover:opacity-90"
                    style={BUTTON}
                  >
                    Re-subscribe
                  </button>
                </form>
              </>
            )}

            {view === "resubscribed" && (
              <>
                <p className="mb-10">
                  You&apos;ll get our emails about the BiyeHobe launch again. You can unsubscribe
                  from any of them.
                </p>
                <Link
                  href="/"
                  className="inline-block px-8 py-4 rounded-full text-sm transition-opacity hover:opacity-90"
                  style={BUTTON}
                >
                  Back to BiyeHobe
                </Link>
              </>
            )}

            {view === "missing" && (
              <p>
                Use the Unsubscribe link at the bottom of any email from us, or write to {CONTACT}{" "}
                and we&apos;ll take you off the list.
              </p>
            )}

            {view === "error" && (
              <p>
                We couldn&apos;t save that just now. Please try the link again in a few minutes, or
                write to {CONTACT} and we&apos;ll do it for you.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
