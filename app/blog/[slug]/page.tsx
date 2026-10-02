import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PostCard, WaitlistCta } from "../../components/Blog";
import {
  DEFAULT_AUTHOR,
  type Post,
  categorySlug,
  formatDate,
  getPost,
  getPosts,
  getRelatedPosts,
  renderPostHtml,
} from "@/lib/blog";
import {
  DEFAULT_OG_IMAGE,
  LOGO_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  jsonLdString,
  pageMetadata,
} from "@/lib/site";

// Only posts that exist at build time get a page; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: `${post.title} — BiyeHobe`,
      description: post.description,
      path: `/blog/${post.slug}`,
      image: post.cover ? { url: post.cover, alt: post.coverAlt ?? post.title } : undefined,
      article: {
        publishedTime: `${post.date}T00:00:00.000Z`,
        modifiedTime: `${post.updated ?? post.date}T00:00:00.000Z`,
        authors: [post.author],
        section: post.category,
        tags: post.tags,
      },
      rss: true,
      noindex: post.draft,
    }),
    authors: [{ name: post.author }],
    keywords: post.tags,
  };
}

function postJsonLd(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const publisher = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: absoluteUrl(LOGO_IMAGE), width: 512, height: 512 },
  };
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      headline: post.title,
      description: post.description,
      datePublished: `${post.date}T00:00:00.000Z`,
      dateModified: `${post.updated ?? post.date}T00:00:00.000Z`,
      author:
        post.author === DEFAULT_AUTHOR
          ? { "@type": "Organization", name: post.author, url: SITE_URL }
          : { "@type": "Person", name: post.author },
      image: [absoluteUrl(post.cover ?? DEFAULT_OG_IMAGE)],
      publisher,
      articleSection: post.category,
      ...(post.tags.length ? { keywords: post.tags.join(", ") } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
        {
          "@type": "ListItem",
          position: 3,
          name: post.category,
          item: absoluteUrl(`/blog/category/${categorySlug(post.category)}`),
        },
        { "@type": "ListItem", position: 4, name: post.title, item: url },
      ],
    },
  ];
}

const MUTED = "rgba(13,31,26,0.65)";

export default async function BlogPost({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const html = await renderPostHtml(post);
  const related = getRelatedPosts(post);
  const categoryHref = `/blog/category/${categorySlug(post.category)}`;

  return (
    <>
      {postJsonLd(post).map((data) => (
        <script
          key={data["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(data) }}
        />
      ))}

      <Navbar alwaysWhite />

      <main>
        <article>
          <header className="pt-28 pb-14 px-5" style={{ backgroundColor: "var(--cream)" }}>
            <div className="max-w-3xl mx-auto sm:px-3">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol
                  className="flex flex-wrap items-center gap-2 text-sm"
                  style={{ color: MUTED, fontFamily: "var(--font-sans)" }}
                >
                  <li>
                    <Link href="/blog" className="underline underline-offset-4 hover:opacity-75">
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href={categoryHref} className="underline underline-offset-4 hover:opacity-75">
                      {post.category}
                    </Link>
                  </li>
                </ol>
              </nav>

              {post.draft && (
                <p
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: "var(--gold-ink)", fontFamily: "var(--font-sans)", fontWeight: 500 }}
                >
                  Draft — visible only on your computer, not published
                </p>
              )}

              <h1
                className="text-4xl sm:text-6xl mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  color: "var(--dark)",
                  lineHeight: 1.08,
                }}
              >
                {post.title}
              </h1>
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: "rgba(13,31,26,0.72)", fontFamily: "var(--font-sans)" }}
              >
                {post.description}
              </p>
              <p className="text-sm" style={{ color: MUTED, fontFamily: "var(--font-sans)" }}>
                By {post.author}
                <span aria-hidden="true"> · </span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.updated && (
                  <>
                    <span aria-hidden="true"> · </span>
                    Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                  </>
                )}
                <span aria-hidden="true"> · </span>
                {post.readingMinutes} min read
              </p>
            </div>
          </header>

          <div style={{ backgroundColor: "white" }}>
            <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14">
              {post.cover && (
                <div
                  className="relative w-full mb-12 overflow-hidden rounded-lg"
                  style={{ aspectRatio: "16 / 9", backgroundColor: "var(--cream)" }}
                >
                  <Image
                    src={post.cover}
                    alt={post.coverAlt ?? ""}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 704px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}

              <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />

              {post.tags.length > 0 && (
                <ul
                  aria-label="Tags"
                  className="flex flex-wrap gap-2 mt-12 pt-8"
                  style={{ borderTop: "1px solid rgba(13,31,26,0.1)" }}
                >
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: "var(--cream)",
                        color: "rgba(13,31,26,0.72)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section aria-labelledby="related-posts" style={{ backgroundColor: "white" }}>
            <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
              <h2
                id="related-posts"
                className="text-3xl sm:text-4xl mb-8"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--dark)" }}
              >
                More on {post.category}
              </h2>
              <div className="flex flex-col gap-6">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} headingLevel="h3" />
                ))}
              </div>
            </div>
          </section>
        )}

        <WaitlistCta />
      </main>

      <Footer />
    </>
  );
}
