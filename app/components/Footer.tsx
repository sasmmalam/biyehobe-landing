import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/site";

const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  // Set at build time in next.config.ts: only once a post is published.
  ...(process.env.NEXT_PUBLIC_HAS_BLOG_POSTS === "true"
    ? [{ label: "Blog", href: "/blog" }]
    : []),
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Delete Account", href: "/delete-account" },
];

// Outline icons, drawn with currentColor. Keyed by SOCIAL_LINKS[].name.
const SOCIAL_ICONS: Record<(typeof SOCIAL_LINKS)[number]["name"], React.ReactNode> = {
  Instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  Facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  TikTok: <path d="M9 12a4 4 0 1 0 4 4V3a5 5 0 0 0 5 5" />,
  YouTube: (
    <>
      <path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </>
  ),
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--dark)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 600,
              color: "white",
            }}
          >
            BiyeHobe
          </span>
          <p
            className="mt-1 text-xs"
            style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-sans)" }}
          >
            Where tradition meets intention — wherever home is.
          </p>
          <ul
            className="mt-4 -ml-2.5 flex items-center justify-center sm:justify-start gap-1"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {SOCIAL_LINKS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={`BiyeHobe on ${social.name}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:text-white"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {SOCIAL_ICONS[social.name]}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs"
          style={{ color: "rgba(255,255,255,0.48)", fontFamily: "var(--font-sans)" }}
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto px-5 sm:px-8 py-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p
          className="text-xs text-center"
          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)" }}
        >
          © 2026 BiyeHobe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
