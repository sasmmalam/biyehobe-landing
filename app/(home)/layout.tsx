import {
  ORGANIZATION_JSON_LD,
  SITE_DESCRIPTION,
  jsonLdString,
  pageMetadata,
} from "@/lib/site";

// The home page is a client component, so it can't export metadata itself.
// This route group exists only to give "/" its own canonical, OpenGraph tags
// and Organization JSON-LD without those leaking onto every other page.
export const metadata = pageMetadata({
  title: "BiyeHobe — Matrimonial for the Bangladeshi Diaspora",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(ORGANIZATION_JSON_LD) }}
      />
      {children}
    </>
  );
}
