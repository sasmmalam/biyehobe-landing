import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { NextConfig } from "next";

// The "Blog" link in the navbar and footer shows only when at least one post
// is published. Those components run in the browser and can't read the
// content folder, so the answer is worked out here, once per build.
function hasPublishedPosts(): boolean {
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) return false;
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .some((f) => {
      const data = matter(fs.readFileSync(path.join(dir, f), "utf8")).data;
      if (data.draft === true) return false;
      // Scheduled posts (date in the future, Toronto time) don't count yet.
      const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
      const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit",
      }).format(new Date());
      return date <= today;
    });
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_HAS_BLOG_POSTS: String(hasPublishedPosts()),
  },
  async redirects() {
    // Legacy URLs from the domain's previous site, still in search indexes.
    const legacy: [string, string][] = [
      ["/bangladeshi-matrimoni", "/"],
      ["/bangladeshi-singles", "/"],
      ["/bangladeshi-muslim", "/"],
      ["/australian-bangladeshi", "/"],
      ["/contact-us", "/about"],
      ["/blog-detail2", "/blog"],
    ];
    return [
      { source: "/matchmakers", destination: "/ghotok-partners", permanent: true },
      ...legacy.flatMap(([from, to]) => [
        { source: from, destination: to, permanent: true },
        { source: `${from}/`, destination: to, permanent: true },
      ]),
    ];
  },
};

export default nextConfig;
