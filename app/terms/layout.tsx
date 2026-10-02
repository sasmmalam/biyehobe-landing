import { pageMetadata } from "@/lib/site";

// SEO tags (canonical, OpenGraph, Twitter) for /terms, kept here so the legal
// page itself stays untouched. Title and description repeat page.tsx — if
// they change there, change them here too.
export const metadata = pageMetadata({
  title: "Terms of Use — BiyeHobe",
  description:
    "The rules for using the BiyeHobe app and website: who can join, how to behave, what verification means, blocking and reporting, and ending your account.",
  path: "/terms",
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
