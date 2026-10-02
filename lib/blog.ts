import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

// Blog posts are Markdown files in content/blog/<slug>.md. Everything is read
// at build time; a post with a mistake in its frontmatter fails the build with
// a message naming the file, rather than publishing something broken.

export const CATEGORIES = [
  "Family & Parents",
  "Diaspora Life",
  "Cross-Cultural Marriage",
  "Faith & Values",
  "Preparing for Marriage",
  "Safety & Privacy",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const DEFAULT_AUTHOR = "BiyeHobe Team";
const MAX_DESCRIPTION = 160;
const WORDS_PER_MINUTE = 200;

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const IS_PROD = process.env.NODE_ENV === "production";

export interface Post {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** ISO date, YYYY-MM-DD. Only set when later than `date`. */
  updated?: string;
  author: string;
  category: Category;
  tags: string[];
  /** Path under /public, e.g. "/blog/my-cover.jpg". */
  cover?: string;
  coverAlt?: string;
  draft: boolean;
  readingMinutes: number;
  /** Raw Markdown body. */
  body: string;
}

export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function categoryFromSlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => categorySlug(c) === slug);
}

/** "1 October 2026" — the same format the legal pages use. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function fail(file: string, message: string): never {
  throw new Error(`content/blog/${file}: ${message}`);
}

function toIsoDate(value: unknown, field: string, file: string): string {
  // YAML turns an unquoted 2026-10-01 into a Date; a quoted one stays a string.
  const d = value instanceof Date ? value : new Date(String(value));
  if (value == null || Number.isNaN(d.getTime())) {
    fail(file, `"${field}" must be a date like 2026-10-01`);
  }
  return d.toISOString().slice(0, 10);
}

function parsePost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    fail(file, "the file name becomes the URL — use lowercase letters, numbers and hyphens only");
  }

  const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));

  const title = typeof data.title === "string" ? data.title.trim() : "";
  if (!title) fail(file, `"title" is required`);

  const description = typeof data.description === "string" ? data.description.trim() : "";
  if (!description) fail(file, `"description" is required`);
  if (description.length > MAX_DESCRIPTION) {
    fail(file, `"description" is ${description.length} characters — the limit is ${MAX_DESCRIPTION}`);
  }

  const date = toIsoDate(data.date, "date", file);
  const updatedRaw = data.updated == null ? undefined : toIsoDate(data.updated, "updated", file);
  const updated = updatedRaw && updatedRaw > date ? updatedRaw : undefined;

  if (!CATEGORIES.includes(data.category)) {
    fail(file, `"category" must be exactly one of: ${CATEGORIES.join(", ")}`);
  }

  const tags = data.tags == null ? [] : data.tags;
  if (!Array.isArray(tags) || tags.some((t) => typeof t !== "string")) {
    fail(file, `"tags" must be a list of words, e.g. [family, parents]`);
  }

  if (data.draft != null && typeof data.draft !== "boolean") {
    fail(file, `"draft" must be true or false`);
  }

  let cover: string | undefined;
  let coverAlt: string | undefined;
  if (data.cover != null) {
    cover = String(data.cover);
    if (!cover.startsWith("/blog/")) {
      fail(file, `"cover" must be a path under /public/blog, e.g. /blog/my-photo.jpg`);
    }
    if (!fs.existsSync(path.join(PUBLIC_DIR, cover))) {
      fail(file, `cover image public${cover} does not exist`);
    }
    coverAlt = typeof data.coverAlt === "string" ? data.coverAlt.trim() : "";
    if (!coverAlt) {
      fail(file, `"coverAlt" (a short description of the cover image) is required when "cover" is set`);
    }
  }

  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title,
    description,
    date,
    updated,
    author: typeof data.author === "string" && data.author.trim() ? data.author.trim() : DEFAULT_AUTHOR,
    category: data.category,
    tags: tags.map((t: string) => t.trim()).filter(Boolean),
    cover,
    coverAlt,
    draft: data.draft === true,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    body: content,
  };
}

let cache: Post[] | undefined;

/**
 * Posts that may be shown, newest first. Drafts are included only outside
 * production (`next dev`), so they can be previewed locally but never reach
 * the built site, the sitemap or the RSS feed.
 */
export function getPosts(): Post[] {
  if (cache && IS_PROD) return cache;
  const files = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))
    : [];
  cache = files
    .map(parsePost)
    .filter((p) => !(IS_PROD && p.draft))
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : a.date < b.date ? 1 : -1));
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

/** Categories that have at least one visible post, in the canonical order. */
export function getActiveCategories(): Category[] {
  const used = new Set(getPosts().map((p) => p.category));
  return CATEGORIES.filter((c) => used.has(c));
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getPosts()
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, limit);
}

// ── Markdown → HTML ──────────────────────────────────────────────────────────

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

/**
 * Runs after sanitising. Keeps the page to one <h1> (the post title) by
 * demoting any `#` heading in the body, requires alt text on images, and
 * makes off-site links open safely in a new tab.
 */
function rehypePostRules(file: string) {
  return () => (tree: HastNode) => {
    const visit = (node: HastNode) => {
      if (node.type === "element") {
        const props = (node.properties ??= {});
        if (node.tagName === "h1") node.tagName = "h2";
        if (node.tagName === "img") {
          if (typeof props.alt !== "string" || !props.alt.trim()) {
            fail(file, `image ${String(props.src)} has no alt text — write ![describe the image](${String(props.src)})`);
          }
          props.loading = "lazy";
          props.decoding = "async";
        }
        if (node.tagName === "a" && typeof props.href === "string" && /^https?:\/\//.test(props.href)) {
          if (!props.href.startsWith("https://biyehobe.com")) {
            props.target = "_blank";
            props.rel = ["noopener", "noreferrer"];
          }
        }
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}

/**
 * Raw HTML in a post is dropped (remark-rehype's default), and what is left
 * goes through rehype-sanitize's GitHub-style allowlist.
 */
export async function renderPostHtml(post: Post): Promise<string> {
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypePostRules(`${post.slug}.md`))
    .use(rehypeStringify)
    .process(post.body);
  return String(html);
}
