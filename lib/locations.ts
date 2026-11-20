import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdownHtml } from "./blog";

// Country landing pages are Markdown files in content/locations/<slug>.md and
// become /bangladeshi-matrimony/<slug>. Read at build time; a file with a
// mistake in its frontmatter fails the build with a message naming it.

const MAX_DESCRIPTION = 160;
const MAX_SEO_TITLE = 60;
/** Date the country pages' content last changed — bump it when you edit them. */
export const LOCATIONS_LAST_MODIFIED = "2026-11-20";

const LOCATIONS_DIR = path.join(process.cwd(), "content", "locations");

export interface LocationFaq {
  q: string;
  a: string;
}

export interface Location {
  slug: string;
  /** Display name, e.g. "Canada", "UK". */
  country: string;
  /** The full <title>, used as written. */
  seoTitle: string;
  description: string;
  /** The page's <h1>. */
  heading: string;
  intro: string;
  cities: string[];
  faq: LocationFaq[];
  /** Raw Markdown body. */
  body: string;
}

function fail(file: string, message: string): never {
  throw new Error(`content/locations/${file}: ${message}`);
}

function requiredText(data: Record<string, unknown>, field: string, file: string): string {
  const value = typeof data[field] === "string" ? (data[field] as string).trim() : "";
  if (!value) fail(file, `"${field}" is required`);
  return value;
}

function parseLocation(file: string): Location {
  const slug = file.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    fail(file, "the file name becomes the URL — use lowercase letters, numbers and hyphens only");
  }

  const { data, content } = matter(fs.readFileSync(path.join(LOCATIONS_DIR, file), "utf8"));

  const country = requiredText(data, "country", file);

  const seoTitle = requiredText(data, "seoTitle", file);
  if (seoTitle.length > MAX_SEO_TITLE) {
    fail(file, `"seoTitle" is ${seoTitle.length} characters — the limit is ${MAX_SEO_TITLE}`);
  }

  const description = requiredText(data, "description", file);
  if (description.length > MAX_DESCRIPTION) {
    fail(file, `"description" is ${description.length} characters — the limit is ${MAX_DESCRIPTION}`);
  }

  const heading = requiredText(data, "heading", file);
  const intro = requiredText(data, "intro", file);

  const cities = data.cities;
  if (
    !Array.isArray(cities) ||
    cities.length === 0 ||
    cities.some((c) => typeof c !== "string" || !c.trim())
  ) {
    fail(file, `"cities" must be a list of city names, e.g. [Toronto, Montreal]`);
  }

  const faq = data.faq;
  if (!Array.isArray(faq) || faq.length === 0) {
    fail(file, `"faq" must be a list with at least one { q, a } entry`);
  }
  faq.forEach((item: unknown, i: number) => {
    const entry = item as Record<string, unknown> | null;
    if (
      !entry ||
      typeof entry.q !== "string" ||
      !entry.q.trim() ||
      typeof entry.a !== "string" ||
      !entry.a.trim()
    ) {
      fail(file, `"faq" entry ${i + 1} needs both "q" and "a" as text`);
    }
  });

  if (!content.trim()) fail(file, "the page body (Markdown after the frontmatter) is empty");

  return {
    slug,
    country,
    seoTitle,
    description,
    heading,
    intro,
    cities: (cities as string[]).map((c) => c.trim()),
    faq: (faq as LocationFaq[]).map(({ q, a }) => ({ q: q.trim(), a: a.trim() })),
    body: content,
  };
}

let cache: Location[] | undefined;

/** Listed first, in this order (as in the footer); any other file follows alphabetically. */
const ORDER = ["canada", "usa", "uk", "australia"];
const rank = (slug: string) => {
  const i = ORDER.indexOf(slug);
  return i === -1 ? ORDER.length : i;
};

/** All country pages. */
export function getLocations(): Location[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(LOCATIONS_DIR)
    ? fs.readdirSync(LOCATIONS_DIR).filter((f) => f.endsWith(".md"))
    : [];
  cache = files
    .map(parseLocation)
    .sort((a, b) => rank(a.slug) - rank(b.slug) || a.slug.localeCompare(b.slug));
  return cache;
}

export function getLocation(slug: string): Location | undefined {
  return getLocations().find((l) => l.slug === slug);
}

export function renderLocationHtml(location: Location): Promise<string> {
  return renderMarkdownHtml(location.body, `content/locations/${location.slug}.md`);
}
