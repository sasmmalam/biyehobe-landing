import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WaitlistCta } from "../components/Blog";
import { getLocations } from "@/lib/locations";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Bangladeshi Matrimony Abroad — BiyeHobe",
  description:
    "A serious, private way for Bangladeshis abroad to meet for marriage. See BiyeHobe in Canada, the USA, the UK and Australia.",
  path: "/bangladeshi-matrimony",
});

const BODY = "rgba(13,31,26,0.72)";

export default function BangladeshiMatrimony() {
  const locations = getLocations();

  return (
    <>
      <Navbar alwaysWhite />

      <main>
        <section className="pt-28 pb-16 px-5 text-center" style={{ backgroundColor: "var(--cream)" }}>
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--gold-ink)", fontFamily: "var(--font-sans)" }}
          >
            Connecting souls, wherever home is
          </p>
          <h1
            className="text-5xl sm:text-7xl leading-none mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--dark)" }}
          >
            Bangladeshi matrimony around the world
          </h1>
          <p
            className="max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ color: BODY, fontFamily: "var(--font-sans)" }}
          >
            BiyeHobe is a serious, private way for Bangladeshis abroad to meet for marriage. Choose
            your country to see what that looks like where you live.
          </p>
        </section>

        <section style={{ backgroundColor: "white" }}>
          <ul className="max-w-4xl mx-auto px-5 sm:px-8 py-16 grid gap-6 sm:grid-cols-2">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/bangladeshi-matrimony/${l.slug}`}
                  className="group block h-full rounded-lg px-6 py-7 sm:px-8 transition-colors"
                  style={{
                    backgroundColor: "var(--cream)",
                    border: "1px solid rgba(13,31,26,0.1)",
                    borderTop: "3px solid var(--gold)",
                  }}
                >
                  <h2
                    className="text-3xl sm:text-4xl leading-tight mb-3 group-hover:opacity-75 transition-opacity"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--dark)" }}
                  >
                    {l.heading}
                  </h2>
                  <p
                    className="text-base leading-relaxed mb-4"
                    style={{ color: BODY, fontFamily: "var(--font-sans)" }}
                  >
                    {l.intro}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--gold-ink)", fontFamily: "var(--font-sans)", fontWeight: 500 }}
                  >
                    {l.cities.join(" · ")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <WaitlistCta />
      </main>

      <Footer />
    </>
  );
}
