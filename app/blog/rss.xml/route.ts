import { getPosts } from "@/lib/blog";
import { RSS_PATH, SITE_URL, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const rfc822 = (isoDate: string) => new Date(`${isoDate}T00:00:00Z`).toUTCString();

export function GET() {
  const posts = getPosts().filter((p) => !p.draft);

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${rfc822(post.date)}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`;
    })
    .join("\n");

  const lastBuild = posts.length
    ? `\n    <lastBuildDate>${rfc822(posts.map((p) => p.updated ?? p.date).sort().at(-1)!)}</lastBuildDate>`
    : "";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BiyeHobe Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Articles on marriage, family, values and diaspora life for Bangladeshis worldwide.</description>
    <language>en</language>
    <atom:link href="${absoluteUrl(RSS_PATH)}" rel="self" type="application/rss+xml" />${lastBuild}
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
