import type { Metadata } from "next";

// Site-wide SEO constants and the one helper every page uses for its
// metadata, so canonical / OpenGraph / Twitter tags cannot drift apart.

export const SITE_URL = "https://biyehobe.com";
export const SITE_NAME = "BiyeHobe";
export const SITE_DESCRIPTION =
  "A serious matrimonial app for Bangladeshis worldwide, with live selfie verification. Join the waitlist.";
export const CONTACT_EMAIL = "hello@biyehobe.com";

/** Generated at build time by app/og-default.png/route.tsx (1200×630). */
export const DEFAULT_OG_IMAGE = "/og-default.png";
/** Generated at build time by app/logo.png/route.tsx (512×512). */
export const LOGO_IMAGE = "/logo.png";
export const RSS_PATH = "/blog/rss.xml";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

interface PageMetadataInput {
  /** Full <title>, e.g. "About — BiyeHobe". */
  title: string;
  description: string;
  /** Path from the site root, e.g. "/about". Becomes the canonical URL. */
  path: string;
  /** Path under /public or absolute URL. Defaults to the brand OG image. */
  image?: { url: string; alt: string };
  /** Set for blog posts; everything else is a "website". */
  article?: {
    publishedTime: string;
    modifiedTime: string;
    authors: string[];
    section: string;
    tags: string[];
  };
  /** Advertise the blog's RSS feed on this page. */
  rss?: boolean;
  noindex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  article,
  rss = false,
  noindex = false,
}: PageMetadataInput): Metadata {
  const ogImage = image
    ? { url: image.url, alt: image.alt }
    : {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "BiyeHobe — Where tradition meets intention, wherever home is.",
      };

  return {
    title,
    description,
    alternates: {
      canonical: path,
      ...(rss
        ? { types: { "application/rss+xml": [{ url: RSS_PATH, title: "BiyeHobe Blog" }] } }
        : {}),
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [ogImage],
      ...(article
        ? {
            type: "article",
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.authors,
            section: article.section,
            tags: article.tags,
          }
        : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Serialise JSON-LD for a <script> tag; `<` is escaped so content can't close it. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl(LOGO_IMAGE),
  email: CONTACT_EMAIL,
  description: SITE_DESCRIPTION,
};

/**
 * Public pages for the sitemap. `lastModified` is the date the page's
 * content last changed — bump it when you edit the page.
 */
export const STATIC_PAGES: { path: string; lastModified: string }[] = [
  { path: "/", lastModified: "2026-09-30" },
  { path: "/about", lastModified: "2026-09-30" },
  { path: "/how-it-works", lastModified: "2026-09-30" },
  { path: "/faq", lastModified: "2026-09-30" },
  { path: "/privacy", lastModified: "2026-10-01" },
  { path: "/terms", lastModified: "2026-09-29" },
  { path: "/delete-account", lastModified: "2026-09-29" },
];
