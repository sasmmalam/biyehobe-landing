import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WaitlistForm from "./WaitlistForm";
import {
  type Category,
  type Post,
  categorySlug,
  formatDate,
  getActiveCategories,
} from "@/lib/blog";

// Shared building blocks for /blog, /blog/category/<slug> and /blog/<slug>.

const MUTED = "rgba(13,31,26,0.65)";
const BODY = "rgba(13,31,26,0.72)";
const RULE = "1px solid rgba(13,31,26,0.1)";

export function PostMeta({ post }: { post: Post }) {
  return (
    <p className="text-sm" style={{ color: MUTED, fontFamily: "var(--font-sans)" }}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true"> · </span>
      {post.readingMinutes} min read
    </p>
  );
}

export function PostCard({
  post,
  headingLevel: Heading = "h2",
}: {
  post: Post;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article
      className="rounded-lg px-6 py-7 sm:px-8"
      style={{ backgroundColor: "var(--cream)", border: RULE }}
    >
      <p
        className="text-xs uppercase tracking-widest mb-3"
        style={{ color: "var(--gold-ink)", fontFamily: "var(--font-sans)", fontWeight: 500 }}
      >
        {post.category}
        {post.draft && " · Draft (not published)"}
      </p>
      <Heading
        className="text-3xl sm:text-4xl leading-tight mb-3"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--dark)" }}
      >
        <Link href={`/blog/${post.slug}`} className="transition-opacity hover:opacity-75">
          {post.title}
        </Link>
      </Heading>
      <p
        className="text-base leading-relaxed mb-4"
        style={{ color: BODY, fontFamily: "var(--font-sans)" }}
      >
        {post.description}
      </p>
      <PostMeta post={post} />
    </article>
  );
}

function CategoryChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className="inline-block px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-75"
        style={{
          fontFamily: "var(--font-sans)",
          backgroundColor: active ? "var(--green)" : "white",
          color: active ? "white" : "var(--dark)",
          border: active ? "1px solid var(--green)" : "1px solid rgba(13,31,26,0.2)",
        }}
      >
        {label}
      </Link>
    </li>
  );
}

/** The /blog list, optionally narrowed to one category. */
export function BlogIndex({ posts, category }: { posts: Post[]; category?: Category }) {
  const categories = getActiveCategories();

  return (
    <>
      <Navbar alwaysWhite />

      <main>
        <section className="pt-28 pb-16 px-5 text-center" style={{ backgroundColor: "var(--cream)" }}>
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--gold-ink)", fontFamily: "var(--font-sans)" }}
          >
            {category ? "The BiyeHobe Blog" : "Marriage, family & life between homes"}
          </p>
          <h1
            className="text-5xl sm:text-7xl leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--dark)" }}
          >
            {category ?? "The BiyeHobe Blog"}
          </h1>
        </section>

        <section style={{ backgroundColor: "white" }}>
          <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
            {categories.length > 0 && (
              <nav aria-label="Blog categories" className="mb-10">
                <ul className="flex flex-wrap gap-2">
                  <CategoryChip href="/blog" label="All" active={!category} />
                  {categories.map((c) => (
                    <CategoryChip
                      key={c}
                      href={`/blog/category/${categorySlug(c)}`}
                      label={c}
                      active={c === category}
                    />
                  ))}
                </ul>
              </nav>
            )}

            {posts.length === 0 ? (
              <div className="text-center py-10">
                <h2
                  className="text-3xl sm:text-4xl mb-4"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--dark)" }}
                >
                  Nothing here yet.
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: BODY, fontFamily: "var(--font-sans)" }}
                >
                  Our first articles are on their way. Please check back soon.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/** Waitlist block that closes every post. */
export function WaitlistCta() {
  return (
    <section aria-labelledby="waitlist-cta" style={{ backgroundColor: "var(--green)" }}>
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 text-center">
        <h2
          id="waitlist-cta"
          className="text-4xl sm:text-5xl text-white mb-5"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1.15 }}
        >
          Be first to know when BiyeHobe opens in your city.
        </h2>
        <p
          className="text-base mb-10"
          style={{ color: "rgba(255,255,255,0.72)", fontFamily: "var(--font-sans)" }}
        >
          Join the waitlist and we&apos;ll let you know when it opens to everyone.
        </p>
        <WaitlistForm />
      </div>
    </section>
  );
}
