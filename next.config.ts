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
    .some((f) => matter(fs.readFileSync(path.join(dir, f), "utf8")).data.draft !== true);
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_HAS_BLOG_POSTS: String(hasPublishedPosts()),
  },
};

export default nextConfig;
