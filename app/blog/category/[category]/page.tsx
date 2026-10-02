import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "../../../components/Blog";
import { categoryFromSlug, categorySlug, getActiveCategories, getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/site";

// Only categories that have a published post get a page; the rest 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getActiveCategories().map((c) => ({ category: categorySlug(c) }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoryFromSlug((await params).category);
  if (!category) return {};
  return pageMetadata({
    title: `${category} — BiyeHobe Blog`,
    description: `Articles on ${category.toLowerCase()} for Bangladeshis worldwide, from the team behind BiyeHobe.`,
    path: `/blog/category/${categorySlug(category)}`,
    rss: true,
  });
}

export default async function BlogCategory({ params }: Props) {
  const category = categoryFromSlug((await params).category);
  if (!category) notFound();
  const posts = getPosts().filter((p) => p.category === category);
  if (posts.length === 0) notFound();
  return <BlogIndex posts={posts} category={category} />;
}
