import type { MetadataRoute } from "next";
import { categorySlug, getActiveCategories, getPosts } from "@/lib/blog";
import { STATIC_PAGES, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const lastTouched = (p: { date: string; updated?: string }) => p.updated ?? p.date;

export default function sitemap(): MetadataRoute.Sitemap {
  // getPosts() leaves drafts out of a production build, so they never land here.
  const posts = getPosts().filter((p) => !p.draft);
  const newest = (list: typeof posts) => list.map(lastTouched).sort().at(-1)!;

  const entries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.lastModified,
  }));

  // /blog and its category pages are listed only once there is something on them.
  if (posts.length > 0) {
    entries.push({ url: absoluteUrl("/blog"), lastModified: newest(posts) });
    for (const category of getActiveCategories()) {
      const inCategory = posts.filter((p) => p.category === category);
      if (inCategory.length === 0) continue;
      entries.push({
        url: absoluteUrl(`/blog/category/${categorySlug(category)}`),
        lastModified: newest(inCategory),
      });
    }
    for (const post of posts) {
      entries.push({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: lastTouched(post) });
    }
  }

  return entries;
}
