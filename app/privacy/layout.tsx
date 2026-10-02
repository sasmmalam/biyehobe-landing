import { pageMetadata } from "@/lib/site";

// SEO tags (canonical, OpenGraph, Twitter) for /privacy, kept here so the legal
// page itself stays untouched. Title and description repeat page.tsx — if
// they change there, change them here too.
export const metadata = pageMetadata({
  title: "Privacy Policy — BiyeHobe",
  description:
    "What the BiyeHobe app and website collect, why, who can see it, how long we keep it, and how to delete it — including the verification selfie.",
  path: "/privacy",
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
