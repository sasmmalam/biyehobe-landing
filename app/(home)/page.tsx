"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import BuiltDifferently from "../components/BuiltDifferently";
import WaitlistForm from "../components/WaitlistForm";

// ── Fade-up animation wrapper ─────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-up ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── FAQ accordion ─────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Who is BiyeHobe for?",
    a: "BiyeHobe is built for the Bangladeshi diaspora — NRBs and locals alike — who are ready for a serious, intentional relationship and want a dignified, private platform to find their match.",
  },
  {
    q: "How does verification work?",
    a: "Verification is two checks. First, a live selfie check, run by our partner Didit, confirms a real person is holding the phone. Then we match your main photo against that selfie. The ✓ shows on your profile only when both pass. If your main photo doesn't match, the ✓ comes off and the photo is flagged for review. There's no ID check, and verifying is optional.",
  },
  {
    q: "Is BiyeHobe only for Muslims?",
    a: "No. BiyeHobe is for all Bangladeshis who are serious about marriage, whatever their religion. We ask everyone their religion and how practising they are, and \"Prefer not to say\" is always an answer. If it matters to you, you can filter your matches by either.",
  },
  {
    q: "Who can see my profile?",
    a: "Other signed-in members can see your profile — that's how the right person finds you. They never see your email, phone number or exact location. You can block or report anyone, and delete your account at any time from the app.",
  },
  {
    q: "When does the app launch?",
    a: "We're testing the app with a small group of people right now. Join the waitlist and we'll let you know when it opens to everyone.",
  },
];

function FAQAccordion({ items = FAQ_ITEMS }: { items?: typeof FAQ_ITEMS }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ borderTop: "1px solid rgba(13,31,26,0.1)" }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: "1px solid rgba(13,31,26,0.1)" }}>
          <button
            className="w-full text-left py-5 flex items-center justify-between gap-4"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span
              className="text-base font-medium"
              style={{ color: "var(--dark)", fontFamily: "var(--font-sans)" }}
            >
              {item.q}
            </span>
            <ChevronDown
              size={18}
              style={{
                color: "var(--gold-ink)",
                flexShrink: 0,
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.22s ease",
              }}
            />
          </button>
          {open === i && (
            <p
              className="pb-5 text-sm leading-relaxed"
              style={{ color: "rgba(13,31,26,0.65)", fontFamily: "var(--font-sans)" }}
            >
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ── People imagery ────────────────────────────────────────────────────────────
// AI-generated lifestyle photos in public/images/people. They are not members:
// every section that shows them carries <IllustrativeNote />.

function peopleImg(name: string, widths: number[]) {
  return {
    src: `/images/people/${name}-${widths[0]}.webp`,
    srcSet: widths
      .map((w) => `/images/people/${name}-${w}.webp ${w}w`)
      .join(", "),
  };
}

const CITIES = [
  { name: "Toronto", img: "city-toronto", alt: "A woman with a coffee at a café window in Toronto" },
  { name: "New York", img: "city-newyork", alt: "A woman in a hijab holding a coffee on a New York pier, the Brooklyn Bridge behind her" },
  { name: "London", img: "city-london", alt: "A man by the Thames with the Houses of Parliament behind him" },
  { name: "Sydney", img: "city-sydney", alt: "A woman sitting by Sydney Harbour with the Opera House behind her" },
  { name: "Montreal", img: "city-montreal", alt: "A man in a knitted hat holding a hot coffee on a Montreal street" },
  { name: "Calgary", img: "city-calgary", alt: "A man sitting on a car with the Calgary skyline and the Rockies behind him" },
  { name: "Dubai", img: "city-dubai", alt: "A woman in a salwar kameez on a Dubai promenade at night" },
];

const PROFESSIONALS = [
  { role: "Doctor", img: "pro-doctor", alt: "A doctor in a hijab and white coat, smiling in a hospital corridor" },
  { role: "Dentist", img: "pro-dentist", alt: "A dentist in navy scrubs, arms folded, in a dental clinic" },
  { role: "Engineer", img: "pro-engineer", alt: "An engineer with a coffee at a desk of monitors" },
  { role: "Teacher", img: "pro-teacher", alt: "A teacher holding a tablet beside a whiteboard of equations" },
  { role: "Analyst", img: "pro-office", alt: "An analyst in a blazer at an office desk overlooking the city" },
];

const JOURNEY = [
  {
    img: "journey-1-coffee",
    alt: "A couple talking over coffee in a café",
    title: "The first coffee",
    text: "Chat only when you both like each other.",
  },
  {
    img: "journey-2-nikah",
    alt: "A bride and groom signing their marriage papers at their wedding",
    title: "The nikah",
    text: "Families involved at your pace.",
  },
  {
    img: "journey-3-family",
    alt: "A mother photographing her husband and toddler under cherry blossoms",
    title: "A family of your own",
    text: "Wherever home is.",
  },
];

function IllustrativeNote({
  onDark = false,
  className = "",
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={className}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "13px",
        color: onDark ? "rgba(255,255,255,0.8)" : "rgba(13,31,26,0.65)",
      }}
    >
      Illustrative images.
    </p>
  );
}

function SectionHeading({ title, line }: { title: string; line: string }) {
  return (
    <>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(40px, 6vw, 60px)",
          color: "var(--dark)",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      <p
        className="mt-4 text-base leading-relaxed max-w-xl"
        style={{ color: "rgba(13,31,26,0.65)", fontFamily: "var(--font-sans)" }}
      >
        {line}
      </p>
    </>
  );
}

// Pure HTML/CSS phone, no device brand. The profile is fictional.
function PhoneProfile() {
  return (
    <figure className="mx-auto" style={{ width: "280px", maxWidth: "100%" }}>
      <div
        style={{
          backgroundColor: "var(--dark)",
          borderRadius: "44px",
          padding: "10px",
          boxShadow: "0 30px 60px -24px rgba(13,31,26,0.45)",
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{ backgroundColor: "white", borderRadius: "34px" }}
        >
          <div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              top: "10px",
              width: "88px",
              height: "24px",
              backgroundColor: "var(--dark)",
            }}
          />
          <div style={{ height: "44px" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/people/phone-profile-f-600.webp"
            alt="Example profile photo: a woman resting her chin on her hand at a café table"
            width={600}
            height={750}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto"
            style={{ aspectRatio: "4 / 5", objectFit: "cover" }}
          />
          <div className="px-5 pt-4 pb-3">
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "26px",
                  lineHeight: 1.1,
                  color: "var(--dark)",
                }}
              >
                Nadia, 29
              </span>
              <BadgeCheck
                size={22}
                fill="var(--gold)"
                color="white"
                aria-hidden="true"
              />
              <span
                className="uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "11px",
                  color: "var(--gold-ink)",
                }}
              >
                Verified
              </span>
            </div>
            <p
              className="mt-1.5 flex items-center gap-1.5 text-sm"
              style={{ color: "rgba(13,31,26,0.65)", fontFamily: "var(--font-sans)" }}
            >
              <MapPin size={15} color="var(--gold-ink)" aria-hidden="true" />
              Toronto
            </p>
            <div
              aria-hidden="true"
              className="mx-auto mt-5 rounded-full"
              style={{
                width: "112px",
                height: "4px",
                backgroundColor: "rgba(13,31,26,0.2)",
              }}
            />
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center">
        <IllustrativeNote />
      </figcaption>
    </figure>
  );
}

function CityStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const arrow = (dir: 1 | -1, disabled: boolean) => (
    <button
      type="button"
      onClick={() => scroll(dir)}
      disabled={disabled}
      aria-label={dir === 1 ? "Scroll to more cities" : "Scroll back to earlier cities"}
      className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-75 disabled:opacity-30 disabled:cursor-default"
      style={{ border: "1px solid var(--gold)", color: "var(--dark)" }}
    >
      {dir === 1 ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
    </button>
  );

  return (
    <>
      <div className="hidden sm:flex justify-end gap-3 mb-5">
        {arrow(-1, atStart)}
        {arrow(1, atEnd)}
      </div>
      <div
        ref={ref}
        onScroll={update}
        role="region"
        aria-label="Cities"
        tabIndex={0}
        className="strip overflow-x-auto snap-x snap-mandatory"
      >
        <ul className="flex gap-4">
          {CITIES.map((city) => (
            <li
              key={city.name}
              className="snap-start shrink-0"
              style={{ width: "min(62vw, 220px)" }}
            >
              <figure
                className="relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: "4 / 5" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/people/${city.img}-600.webp`}
                  alt={city.alt}
                  width={600}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,31,26,0.8) 0%, rgba(13,31,26,0) 45%)",
                  }}
                />
                <figcaption
                  className="absolute left-4 bottom-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "24px",
                    color: "white",
                  }}
                >
                  {city.name}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center text-center"
        style={{ minHeight: "94vh" }}
      >
        {/* Background image. Phones get the 1200 file whatever their pixel
            density — it sits under a dark overlay, and the 1920 one would
            slow the first paint. The hero stops short of 100vh on purpose:
            Chrome treats a viewport-filling image as a background and
            won't count it as the LCP element. */}
        <picture className="absolute inset-0 overflow-hidden">
          <source
            media="(max-width: 767px)"
            srcSet="/images/people/hero-niagara-1200.webp"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...peopleImg("hero-niagara", [800, 1200, 1920])}
            sizes="100vw"
            alt="A laughing couple at Niagara Falls; she wipes the mist from his glasses"
            width={1920}
            height={1080}
            fetchPriority="high"
            loading="eager"
            className="hero-img hero-kenburns absolute inset-0 w-full h-full object-cover"
          />
        </picture>

        {/* Gradient overlay — dark enough behind the text for 4.5:1 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        <IllustrativeNote
          onDark
          className="absolute z-10 right-4 bottom-3 sm:right-6 sm:bottom-4"
        />

        <div
          className="relative z-10 px-5 max-w-4xl mx-auto"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "0px",
          }}
        >
          {/* Logo mark */}
          <div style={{ marginBottom: "16px" }}>
            <Logo size={88} color="white" />
          </div>

          {/* Brand wordmark */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(40px, 7vw + 16px, 88px)",
              lineHeight: 1,
              color: "white",
              letterSpacing: "0.04em",
              textShadow: "0 2px 12px rgba(0,0,0,0.45)",
            }}
          >
            Biye Hobe.
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "24px",
              color: "rgba(255,255,255,0.90)",
              marginTop: "20px",
              letterSpacing: "0.02em",
              textShadow: "0 2px 12px rgba(0,0,0,0.45)",
            }}
          >
            Connecting souls, wherever home is.
          </p>

          {/* Sub-tagline */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "16px",
              color: "rgba(255,255,255,0.75)",
              marginTop: "16px",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
              textShadow: "0 2px 12px rgba(0,0,0,0.45)",
            }}
          >
            Verified means a live selfie and a photo that matches it. Built
            by one of us, in Toronto.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#waitlist"
              className="px-9 py-4 rounded-full text-base font-medium text-dark transition-opacity hover:opacity-85"
              style={{
                backgroundColor: "var(--gold)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Join the Waitlist
            </a>
            <a
              href="#how"
              className="text-sm transition-opacity hover:opacity-70"
              style={{
                color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Learn how it works ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section style={{ backgroundColor: "var(--green)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
          {[
            "Live Selfie Verification",
            "No ID Documents",
            "We Never Sell Your Data",
          ].map((stat) => (
            <p
              key={stat}
              className="text-center py-3 sm:py-0 text-sm font-medium tracking-widest uppercase text-white"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {stat}
            </p>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <FadeUp className="text-center mb-16">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{
                color: "var(--gold-ink)",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
              }}
            >
              Simple &amp; Intentional
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 60px)",
                color: "var(--dark)",
              }}
            >
              How It Works
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-16 lg:gap-20 items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-12 lg:gap-10">
              {[
                {
                  n: "1",
                  title: "Create Your Profile",
                  desc: "Answer a few meaningful questions about yourself — your values, lifestyle, and what you are looking for in a partner.",
                },
                {
                  n: "2",
                  title: "Get Verified",
                  desc: "Take a quick live selfie check. We match your main photo against it, and the ✓ shows only when both pass.",
                },
                {
                  n: "3",
                  title: "Start Connecting",
                  desc: "When someone you like likes you back, it's a match — and you can start talking, with serious intent, on your terms.",
                },
              ].map((step, i) => (
                <FadeUp key={step.n} delay={i * 130}>
                  <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:gap-6">
                    <div
                      className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-dark text-lg mb-7 lg:mb-0"
                      style={{
                        backgroundColor: "var(--gold)",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                      }}
                    >
                      {step.n}
                    </div>
                    <div>
                      <h3
                        className="mb-3"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "24px",
                          color: "var(--dark)",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: "#1a1a1a",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={200}>
              <PhoneProfile />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Built Differently ── */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <FadeUp className="mb-12">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--gold-ink)",
                marginBottom: "12px",
              }}
            >
              What Sets Us Apart
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 60px)",
                color: "var(--dark)",
              }}
            >
              Built Differently.
            </h2>
          </FadeUp>

          <FadeUp delay={100}>
            <BuiltDifferently />
          </FadeUp>
        </div>
      </section>

      {/* ── Bangladeshis everywhere ── */}
      <section style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <FadeUp className="mb-10">
            <SectionHeading
              title="Bangladeshis everywhere"
              line="From Toronto to Sydney, find someone who shares your roots — close to where you live."
            />
          </FadeUp>
          <FadeUp delay={100}>
            <CityStrip />
            <IllustrativeNote className="mt-4" />
          </FadeUp>
        </div>
      </section>

      {/* ── Built for busy professionals ── */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <FadeUp className="mb-10">
            <SectionHeading
              title="Built for busy professionals"
              line="Doctors, engineers, teachers — when work takes your time, we make the introduction."
            />
          </FadeUp>
          <FadeUp delay={100}>
            <ul className="strip flex gap-4 overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible">
              {PROFESSIONALS.map((pro) => (
                <li
                  key={pro.role}
                  className="snap-start shrink-0 w-[min(46vw,200px)] lg:w-auto"
                >
                  <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/people/${pro.img}-600.webp`}
                      alt={pro.alt}
                      width={600}
                      height={750}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-auto rounded-2xl object-cover"
                      style={{ aspectRatio: "4 / 5" }}
                    />
                    <figcaption
                      className="mt-3 text-sm font-medium"
                      style={{ color: "var(--dark)", fontFamily: "var(--font-sans)" }}
                    >
                      {pro.role}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            <IllustrativeNote className="mt-6" />
          </FadeUp>
        </div>
      </section>

      {/* ── About / Mission split ── */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
          <div
            className="py-20 px-8 lg:px-16 flex flex-col justify-center"
            style={{ backgroundColor: "var(--green)" }}
          >
            <FadeUp>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--gold-light)",
                  marginBottom: "20px",
                }}
              >
                Our Mission
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 5vw, 48px)",
                  color: "white",
                  marginBottom: "24px",
                  lineHeight: 1.15,
                }}
              >
                Built with intention.
              </h2>
              <p
                className="text-sm leading-relaxed mb-8 max-w-sm"
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                BiyeHobe was built for the Bangladeshi diaspora — NRBs and
                residents alike — who believe finding a life partner should be
                private, dignified, and purposeful.
              </p>
              <Link
                href="/about"
                className="text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-75"
                style={{ color: "var(--gold-light)", fontFamily: "var(--font-sans)" }}
              >
                Read Our Story →
              </Link>
            </FadeUp>
          </div>

          <div
            className="py-20 px-8 lg:px-16 flex flex-col justify-center"
            style={{ backgroundColor: "var(--cream)" }}
          >
            <FadeUp delay={120}>
              <blockquote
                className="text-3xl sm:text-4xl leading-snug"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  color: "var(--dark)",
                  fontStyle: "italic",
                }}
              >
                &ldquo;Connecting souls, wherever home
                is.&rdquo;
              </blockquote>
              <p
                className="mt-6 text-xs uppercase tracking-widest"
                style={{
                  color: "rgba(13,31,26,0.65)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                — The BiyeHobe Founding Team
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-20 pb-8">
          <FadeUp className="text-center mb-14">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--gold-ink)",
                marginBottom: "12px",
              }}
            >
              Common Questions
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 60px)",
                color: "var(--dark)",
              }}
            >
              FAQ
            </h2>
          </FadeUp>

          <FAQAccordion />

          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: "var(--gold-ink)", fontFamily: "var(--font-sans)" }}
            >
              See all questions →
            </Link>
          </div>
        </div>
      </section>

      {/* ── From hello to nikah ── */}
      <section style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <FadeUp className="mb-12">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 60px)",
                color: "var(--dark)",
                lineHeight: 1.1,
              }}
            >
              From hello to nikah
            </h2>
          </FadeUp>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {JOURNEY.map((step, i) => (
              <li key={step.img}>
                <FadeUp delay={i * 130}>
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      {...peopleImg(step.img, [800, 1200])}
                      sizes="(min-width: 1152px) 350px, (min-width: 768px) 30vw, 100vw"
                      alt={step.alt}
                      width={1200}
                      height={675}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-auto rounded-2xl object-cover"
                      style={{ aspectRatio: "16 / 9" }}
                    />
                    {i < JOURNEY.length - 1 && (
                      <ArrowRight
                        size={20}
                        color="var(--gold)"
                        aria-hidden="true"
                        className="hidden md:block absolute top-1/2 -translate-y-1/2"
                        style={{ right: "-34px" }}
                      />
                    )}
                  </div>
                  <h3
                    className="mt-5 mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "24px",
                      color: "var(--dark)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(13,31,26,0.65)", fontFamily: "var(--font-sans)" }}
                  >
                    {step.text}
                  </p>
                </FadeUp>
              </li>
            ))}
          </ol>
          <IllustrativeNote className="mt-8" />
        </div>
      </section>

      {/* ── Waitlist CTA ── */}
      <section id="waitlist" style={{ backgroundColor: "var(--green)" }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-24 lg:py-32 text-center">
          <FadeUp>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 60px)",
                color: "white",
                marginBottom: "20px",
                lineHeight: 1.1,
                letterSpacing: "0.02em",
              }}
            >
              Be Among the First.
            </h2>
            <p
              className="text-base mb-10"
              style={{
                color: "rgba(255,255,255,0.72)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Built for NRBs and Bangladeshis worldwide, with intention.
            </p>
            <WaitlistForm />
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  );
}
