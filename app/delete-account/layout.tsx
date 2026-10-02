import { pageMetadata } from "@/lib/site";

// SEO tags (canonical, OpenGraph, Twitter) for /delete-account, kept here so the legal
// page itself stays untouched. Title and description repeat page.tsx — if
// they change there, change them here too.
export const metadata = pageMetadata({
  title: "Delete Your Account — BiyeHobe",
  description:
    "How to delete your BiyeHobe account — in the app, or by email if you no longer have it — and exactly what is deleted and what is kept.",
  path: "/delete-account",
});

export default function DeleteAccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
