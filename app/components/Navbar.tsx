"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar({ alwaysWhite = false }: { alwaysWhite?: boolean }) {
  const [scrolled, setScrolled] = useState(alwaysWhite);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (alwaysWhite) return;
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysWhite]);

  const linkColor = scrolled ? "var(--dark)" : "rgba(255,255,255,0.88)";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "white" : "transparent",
        boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.07)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: scrolled ? "var(--green)" : "white",
          }}
        >
          BiyeHobe
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: linkColor, fontFamily: "var(--font-sans)" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/#waitlist"
            className="px-5 py-2 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: "var(--gold)", fontFamily: "var(--font-sans)" }}
          >
            Join Waitlist
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden transition-colors"
          style={{ color: scrolled ? "var(--dark)" : "white" }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden px-5 py-5 flex flex-col gap-5"
          style={{ backgroundColor: "white", borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium"
              style={{ color: "var(--dark)", fontFamily: "var(--font-sans)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/#waitlist"
            className="text-sm font-medium text-white text-center py-3 rounded-full"
            style={{ backgroundColor: "var(--gold)" }}
            onClick={() => setMenuOpen(false)}
          >
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
}
