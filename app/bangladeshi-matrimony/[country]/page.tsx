import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { WaitlistCta } from "../../components/Blog";
import { type Location, getLocation, getLocations, renderLocationHtml } from "@/lib/locations";
import { SITE_URL, absoluteUrl, jsonLdString, pageMetadata } from "@/lib/site";

// Only countries with a file in content/locations get a page; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return getLocations().map((l) => ({ country: l.slug }));
}

type Props = { params: Promise<{ country: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = getLocation((await params).country);
  if (!location) return {};
  return pageMetadata({
    title: location.seoTitle,
    description: location.description,
    path: `/bangladeshi-matrimony/${location.slug}`,
  });
}

function locationJsonLd(location: Location) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: location.faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Bangladeshi Matrimony",
          item: absoluteUrl("/bangladeshi-matrimony"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: location.country,
          item: absoluteUrl(`/bangladeshi-matrimony/${location.slug}`),
        },
      ],
    },
  ];
}

const MUTED = "rgba(13,31,26,0.65)";
const BODY = "rgba(13,31,26,0.72)";
const RULE = "1px solid rgba(13,31,26,0.1)";

export default async function CountryPage({ params }: Props) {
  const location = getLocation((await params).country);
  if (!location) notFound();

  const html = await renderLocationHtml(location);

  return (
    <>
      {locationJsonLd(location).map((data) => (
        <script
          key={data["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(data) }}
        />
      ))}

      <Navbar alwaysWhite />

      <main>
        <header className="pt-28 pb-14 px-5" style={{ backgroundColor: "var(--cream)" }}>
          <div className="max-w-3xl mx-auto sm:px-3">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol
                className="flex flex-wrap items-center gap-2 text-sm"
                style={{ color: MUTED, fontFamily: "var(--font-sans)" }}
              >
                <li>
                  <Link href="/" className="underline underline-offset-4 hover:opacity-75">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/bangladeshi-matrimony"
                    className="underline underline-offset-4 hover:opacity-75"
                  >
                    Bangladeshi Matrimony
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{location.country}</li>
              </ol>
            </nav>

            <h1
              className="text-4xl sm:text-6xl mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--dark)",
                lineHeight: 1.08,
              }}
            >
              {location.heading}
            </h1>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: BODY, fontFamily: "var(--font-sans)" }}
            >
              {location.intro}
            </p>
            <ul aria-label={`Cities in ${location.country}`} className="flex flex-wrap gap-2">
              {location.cities.map((city) => (
                <li
                  key={city}
                  className="px-4 py-1.5 rounded-full text-sm"
                  style={{
                    backgroundColor: "white",
                    color: "var(--dark)",
                    border: "1px solid var(--gold)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div style={{ backgroundColor: "white" }}>
          <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14">
            <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>

        <section aria-labelledby="country-faq" style={{ backgroundColor: "var(--cream)" }}>
          <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--gold-ink)", fontFamily: "var(--font-sans)", fontWeight: 500 }}
            >
              Questions
            </p>
            <h2
              id="country-faq"
              className="text-3xl sm:text-4xl mb-10"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--dark)" }}
            >
              BiyeHobe in {location.country}: common questions
            </h2>
            <dl className="flex flex-col">
              {location.faq.map(({ q, a }, i) => (
                <div
                  key={q}
                  className="py-6"
                  style={{ borderTop: i === 0 ? RULE : undefined, borderBottom: RULE }}
                >
                  <dt
                    className="text-2xl mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      color: "var(--dark)",
                      lineHeight: 1.25,
                    }}
                  >
                    {q}
                  </dt>
                  <dd
                    className="text-base leading-relaxed"
                    style={{ color: BODY, fontFamily: "var(--font-sans)" }}
                  >
                    {a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <WaitlistCta />
      </main>

      <Footer />
    </>
  );
}
