import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PhoneScreen, { ScreensCaption } from "../components/PhoneScreen";
import { CONTACT_EMAIL, pageMetadata } from "@/lib/site";

// S67. Every claim here is live in the app today (see CLAUDE.md → Positioning).
// The report policy in POLICY is published word-for-word as agreed; change it
// only when the policy itself changes.

export const metadata: Metadata = pageMetadata({
  title: "Safety & trust | BiyeHobe",
  description:
    "How BiyeHobe keeps people safe: a verified ✓ from a live selfie and a photo match, photo blur until you match, no messages from strangers, and what happens when someone is reported.",
  path: "/safety",
});

const img = (name: string) => `/images/app/${name}.webp`;

type Screen = { src: string; alt: string; small?: boolean };

// ── Layout pieces ─────────────────────────────────────────────────────────────

const ink = "rgba(13,31,26,0.72)";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-widest mb-3"
      style={{ color: "var(--gold-ink)", fontFamily: "var(--font-sans)", fontWeight: 500 }}
    >
      {children}
    </p>
  );
}

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "clamp(32px, 4.5vw, 44px)",
        lineHeight: 1.1,
        color: "var(--dark)",
      }}
    >
      {children}
    </h2>
  );
}

function Lines({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-5 flex flex-col gap-3 text-base leading-relaxed max-w-lg"
      style={{ color: ink, fontFamily: "var(--font-sans)" }}
    >
      {children}
    </div>
  );
}

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="underline underline-offset-4 transition-opacity hover:opacity-70"
      style={{ color: "var(--gold-ink)" }}
    >
      {children}
    </Link>
  );
}

// Two screens sit side by side at every width; three scroll sideways on
// phones (inside their own box, no page overflow) and sit in a row from md.
function Screens({ screens }: { screens: Screen[] }) {
  const few = screens.length < 3;
  const tilts = screens.length === 1 ? [0] : screens.length === 2 ? [-2, 2] : [-2, 0, 2];
  return (
    <div>
      <ul className={`strip -mx-5 sm:mx-0 px-5 sm:px-0 py-4 flex items-start ${few ? "justify-center" : "justify-start sm:justify-center"} gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible`}>
        {screens.map((s, i) => (
          <li key={s.src} className={`snap-center shrink-0 ${s.small ? "self-end" : ""}`}>
            <PhoneScreen
              src={s.src}
              alt={s.alt}
              tilt={tilts[i]}
              className={
                s.small
                  ? "w-[130px] md:w-[150px]"
                  : few
                    ? "w-[min(40vw,200px)] md:w-[210px]"
                    : "w-[170px] md:w-[180px]"
              }
              sizes={
                s.small
                  ? "150px"
                  : few
                    ? "(min-width: 768px) 210px, min(40vw, 200px)"
                    : "180px"
              }
            />
          </li>
        ))}
      </ul>
      <ScreensCaption className="mt-4 text-center" />
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
  screens,
  bg,
  flip = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  screens?: Screen[];
  bg: "white" | "cream";
  flip?: boolean;
}) {
  // Text beside the screens from lg. Three screens need the full width, so
  // those sections always stack: text, then the row of screens.
  const sideBySide = !!screens && screens.length < 3;
  return (
    <section
      aria-labelledby={id}
      style={{ backgroundColor: bg === "white" ? "white" : "var(--cream)" }}
    >
      <div
        className={`max-w-6xl mx-auto px-5 sm:px-8 py-16 md:py-20 grid grid-cols-1 gap-10 items-center ${
          sideBySide ? "lg:grid-cols-2 lg:gap-14" : ""
        }`}
      >
        <div className={sideBySide && flip ? "lg:order-2" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <H2 id={id}>{title}</H2>
          {children}
        </div>
        {screens && (
          <div className={sideBySide && flip ? "lg:order-1" : ""}>
            <Screens screens={screens} />
          </div>
        )}
      </div>
    </section>
  );
}

// ── Report policy (publish exactly this) ──────────────────────────────────────

const POLICY = [
  {
    tier: "Zero tolerance",
    outcome: "Removed straight away.",
    items: [
      "Fake profiles, or someone else's photos",
      "Scams, or asking for money",
      "Anyone under 18",
      "Sexual harassment or explicit content",
      "Threats or violence",
    ],
    tone: "green" as const,
  },
  {
    tier: "Serious",
    outcome: "First time, a 7-day suspension. Second time, removed.",
    items: ["Abuse", "Harassment", "Hate"],
    tone: "gold" as const,
  },
  {
    tier: "Minor",
    outcome: "A warning, then a 7-day suspension, then removed.",
    items: [
      "Rudeness",
      "Misleading details",
      "Pushing to move off the app too early",
    ],
    tone: "plain" as const,
  },
];

const TIER_STYLE = {
  // Green card: white text (title 9.64:1, body at 0.85 → 7.48:1).
  green: { bg: "var(--green)", border: "var(--green)", title: "white", body: "rgba(255,255,255,0.85)" },
  // Gold card: bold green title (3.59:1 — passes only as large bold text, 26px/700) and dark body (6.36:1).
  gold: { bg: "var(--gold)", border: "var(--gold)", title: "var(--green)", body: "var(--dark)" },
  plain: { bg: "white", border: "var(--gold)", title: "var(--dark)", body: ink },
};

const TIPS = [
  { title: "Keep the chat here at first", text: "Take your time before sharing a phone number, social media or where you work." },
  { title: "Never send money", text: "No one with honest intentions asks for money, gift cards or crypto. Report it." },
  { title: "Involve your family", text: "Let a parent or sibling know who you're talking to, and include them when you're ready to meet." },
  { title: "Meet in public", text: "First meetings belong somewhere busy, with your own way there and back." },
  { title: "Control your photos", text: "Turn on “Blur my photos until we match” if you'd rather wait." },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SafetyPage() {
  return (
    <>
      <Navbar alwaysWhite />

      {/* Header */}
      <section className="pt-28 pb-16 text-center" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <Eyebrow>Safety &amp; trust</Eyebrow>
          <h1
            className="text-5xl sm:text-7xl leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--dark)" }}
          >
            Keeping BiyeHobe safe
          </h1>
          <p
            className="mt-6 text-base leading-relaxed"
            style={{ color: ink, fontFamily: "var(--font-sans)" }}
          >
            Looking for a spouse means trusting strangers with a lot. Here is
            what the app does to protect you, and what we do when someone
            breaks the rules.
          </p>
        </div>
      </section>

      <Section
        id="verified"
        eyebrow="Verification"
        title="Verified people"
        bg="white"
        screens={[
          {
            src: img("01-discover-woman-verified"),
            alt: "A woman's profile card in Discover with a gold verified tick next to her name, Farhana Akter, 32",
          },
          {
            src: img("02-discover-man-verified"),
            alt: "A man's profile card in Discover with a gold verified tick next to his name, Sabbir Rahman, 34",
          },
          {
            src: img("14-verify-gate"),
            alt: "The One last stretch screen listing three steps: add a photo, say who you're looking for, and verify your selfie to earn the ✓",
            small: true,
          },
        ]}
      >
        <Lines>
          <p>
            The ✓ means two things passed: a live selfie check, run by our
            partner Didit, and a match between your main photo and that
            selfie.
          </p>
          <p>
            Someone using another person&apos;s photos can&apos;t pass the
            match, so they can&apos;t get the ✓. It shows only when both
            checks pass.
          </p>
          <p>
            Verifying is optional, and there&apos;s no ID check. Details we
            can&apos;t check, like education and job, are shown as
            self-reported.
          </p>
        </Lines>
      </Section>

      <Section
        id="photos"
        eyebrow="Photo blur"
        title="Your photos, your choice"
        bg="cream"
        flip
        screens={[
          {
            src: img("04-likes-blur"),
            alt: "The Likes screen: one person's photo is clear, another is blurred with a lock until you both like each other",
          },
          {
            src: img("12-blur-toggle"),
            alt: "The Profile screen with the switch Blur my photos until we match turned on",
          },
        ]}
      >
        <Lines>
          <p>
            Turn on &ldquo;Blur my photos until we match&rdquo; in Profile, and
            other members see your photos blurred until you both like each
            other.
          </p>
          <p>It&apos;s off unless you turn it on, and you can change it any time.</p>
          <p>
            The blur works inside the app. It doesn&apos;t stop someone you
            match with from taking a screenshot.
          </p>
        </Lines>
      </Section>

      <Section
        id="messages"
        eyebrow="Messages"
        title="No unwanted messages"
        bg="white"
        screens={[
          {
            src: img("03-profile-note-like-back"),
            alt: "A profile with a short note sent with a like, and a Like back to chat button",
          },
          {
            src: img("15-say-salam"),
            alt: "A new chat after a match, suggesting a first message: Say salam to Farhana",
          },
        ]}
      >
        <Lines>
          <p>Nobody can message you unless you both like each other.</p>
          <p>
            A like can carry one short note, so someone can say why
            they&apos;re interested without opening a chat.
          </p>
          <p>Discover shows only the opposite gender.</p>
        </Lines>
      </Section>

      <Section
        id="report"
        eyebrow="If something is wrong"
        title="Report, block, unmatch"
        bg="cream"
        flip
        screens={[
          {
            src: img("07-safety-sheet"),
            alt: "The menu in a chat with Unmatch, Report this profile and Block, and the line: Reporting is private, Lamiya is not told",
          },
          {
            src: img("08-report-reasons"),
            alt: "The Why are you reporting screen with six reasons: fake profile, inappropriate photos, harassment or abuse, scam or spam, underage user, something else",
          },
          {
            src: img("09-recently-unmatched"),
            alt: "The Recently unmatched screen: you can report someone for 30 days after an unmatch",
          },
        ]}
      >
        <Lines>
          <p>
            From any profile or chat you can report, block, unmatch or
            withdraw a like.
          </p>
          <p>
            A report has six reasons to choose from: fake profile,
            inappropriate photos, harassment or abuse, scam or spam, underage
            user, or something else. The person is never told who reported
            them.
          </p>
          <p>
            Unmatched someone and then realised something was off? You can
            still report them for 30 days, from &ldquo;Recently
            unmatched&rdquo;.
          </p>
        </Lines>
      </Section>

      {/* What happens when someone is reported — no screenshot */}
      <section aria-labelledby="policy" style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 md:py-20">
          <Eyebrow>Our policy</Eyebrow>
          <H2 id="policy">What happens when someone is reported</H2>
          <Lines>
            <p>
              Every report is reviewed by a person. A report alone never
              removes anyone.
            </p>
            <p>The reporter&apos;s identity is never shared.</p>
            <p>
              BiyeHobe is for adults only. How we prevent and report child
              sexual abuse and exploitation is set out in our{" "}
              <InlineLink href="/child-safety">child safety standards</InlineLink>.
            </p>
          </Lines>

          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {POLICY.map((p) => {
              const t = TIER_STYLE[p.tone];
              return (
                <li
                  key={p.tier}
                  className="rounded-2xl p-6 sm:p-7"
                  style={{ backgroundColor: t.bg, border: `1px solid ${t.border}` }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "26px",
                      lineHeight: 1.15,
                      color: t.title,
                    }}
                  >
                    {p.tier}
                  </h3>
                  <p
                    className="mt-2 text-base font-medium"
                    style={{ color: t.body, fontFamily: "var(--font-sans)" }}
                  >
                    {p.outcome}
                  </p>
                  <ul
                    className="mt-4 list-disc pl-5 flex flex-col gap-1.5 text-sm leading-relaxed"
                    style={{ color: t.body, fontFamily: "var(--font-sans)" }}
                  >
                    {p.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Section id="location" eyebrow="Location" title="Your location" bg="cream">
        <Lines>
          <p>Other members see your city, never your exact location.</p>
          <p>
            BiyeHobe is open to Bangladeshis worldwide, so you can find someone
            close to home or across the world.
          </p>
        </Lines>
      </Section>

      <Section
        id="data"
        eyebrow="Your data"
        title="Your data, your control"
        bg="white"
        screens={[
          {
            src: img("11-delete-account"),
            alt: "The Delete your account screen listing what gets deleted and the few safety records that are kept",
          },
        ]}
      >
        <Lines>
          <p>You can delete your account any time, from Settings in the app.</p>
          <p>
            What&apos;s deleted and the few safety records we keep are set out
            in our <InlineLink href="/privacy">Privacy Policy</InlineLink> and
            on <InlineLink href="/delete-account">Delete your account</InlineLink>.
          </p>
        </Lines>
      </Section>

      <Section
        id="tips"
        eyebrow="In the app"
        title="Safety tips"
        bg="cream"
        flip
        screens={[
          {
            src: img("10-safety-tips"),
            alt: "The Safety tips screen in the app: keep the conversation here at first, never send money, involve your family, meet in public",
          },
        ]}
      >
        <ol className="mt-6 flex flex-col gap-4 max-w-lg">
          {TIPS.map((tip, i) => (
            <li key={tip.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm"
                style={{
                  backgroundColor: "var(--gold)",
                  color: "var(--dark)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </span>
              <div style={{ fontFamily: "var(--font-sans)" }}>
                <h3 className="text-base font-medium" style={{ color: "var(--dark)" }}>
                  {tip.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: ink }}>
                  {tip.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Close */}
      <section style={{ backgroundColor: "var(--green)" }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 text-center">
          <h2
            className="text-4xl sm:text-5xl text-white"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, lineHeight: 1.1 }}
          >
            Something wrong?
          </h2>
          <p
            className="mt-5 text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-sans)" }}
          >
            Report it in the app, or email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline underline-offset-4"
              style={{ color: "var(--gold-light)" }}
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
