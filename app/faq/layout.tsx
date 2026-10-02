import { pageMetadata } from "@/lib/site";

// The FAQ page is a client component, so its metadata lives here.
export const metadata = pageMetadata({
  title: "FAQ — BiyeHobe",
  description:
    "Answers to common questions about BiyeHobe: who it's for, how verification works, who can see your profile, and when the app opens.",
  path: "/faq",
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
