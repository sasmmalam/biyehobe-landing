import Link from "next/link";

const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

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
            style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-sans)" }}
          >
            Where tradition meets intention — wherever home is.
          </p>
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
          style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)" }}
        >
          © 2026 BiyeHobe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
