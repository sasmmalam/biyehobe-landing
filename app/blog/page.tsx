import type { Metadata } from "next";
import { BlogIndex } from "../components/Blog";
import { getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/site";

export function generateMetadata(): Metadata {
  return pageMetadata({
    title: "Blog — BiyeHobe",
    description:
      "Articles on marriage, family, values and diaspora life for Bangladeshis worldwide, from the team behind BiyeHobe.",
    path: "/blog",
    rss: true,
    // An empty list is not worth indexing; this lifts itself with the first post.
    noindex: getPosts().length === 0,
  });
}

export default function Blog() {
  return <BlogIndex posts={getPosts()} />;
}
