@AGENTS.md

# BiyeHobe Landing Page

## Project Overview
Landing page for **BiyeHobe** — a private, verified matrimonial platform for the Bangladeshi diaspora worldwide (NRB-focused).

## Stack
- **Framework**: Next.js 16.2.4 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first config via `@theme` in `globals.css`)
- **Icons**: lucide-react
- **Backend**: Supabase (waitlist email capture)
- **Deployment**: Vercel

## Brand Colors
| Name   | Hex       | Usage |
|--------|-----------|-------|
| Green  | `#1B4D3E` | Primary — nav, trust strip, CTA sections. Matches the app (`constants/theme.ts` PRIMARY, S38 colour audit); was `#043927` until L1b |
| Gold   | `#C9952A` | Accent — button fills, borders, decorative icons, dividers. **Never text** (2.5–2.7:1 on white/cream, 3.6:1 on green) |
| Gold ink | `#8C6418` | `--gold-ink` — gold **text** on white/cream (5.31 / 5.01) |
| Gold light | `#E3BC68` | `--gold-light` — gold **text** on green (5.35) |
| Cream  | `#FAF8F5` | Background — section fills, card backgrounds |
| Dark   | `#0D1F1A` | Footer background |

Colors are defined as CSS variables in `app/globals.css` under `:root` and registered via `@theme inline`.

**Contrast rule (L1e, WCAG AA):** text on a gold button is `--dark` (6.36:1), never white (2.69).
Muted text is at least `rgba(13,31,26,0.62)` on white/cream, `rgba(255,255,255,0.6)` on green, and
`rgba(255,255,255,0.55)` on `--dark`. Check any new pair before shipping it.

## Typography
- **Display**: `Cormorant` (Google Fonts — 400, 600, 700) — headings, logo, blockquotes
- **Body**: `DM Sans` (Google Fonts — 300, 400, 500) — all body text, nav links, labels
- Loaded via `next/font/google` in `app/layout.tsx`, injected as `--font-cormorant` and `--font-dm-sans` CSS variables
- No Bangla/Bengali font imports

## Key Files
| File | Purpose |
|------|---------|
| `app/(home)/page.tsx` | Full home page — navbar, hero, trust strip, how it works, features, mission, FAQ, waitlist, footer. The `(home)` route group exists so `layout.tsx` beside it can give `/` its metadata + Organization JSON-LD (the page is a client component) |
| `lib/site.ts` | S62 SEO: `SITE_URL`, `pageMetadata()` (title/description/canonical/OG/Twitter — every page uses it), `STATIC_PAGES` for the sitemap (bump `lastModified` when a page's content changes) |
| `lib/blog.ts` | S62 blog: reads `content/blog/*.md`, validates frontmatter (bad frontmatter fails the build), renders sanitized Markdown. Drafts show only in `next dev` |
| `content/blog/<slug>.md` | Blog posts. `welcome.md` is a draft template |
| `app/blog/` | `/blog`, `/blog/[slug]`, `/blog/category/[category]`, `/blog/rss.xml` |
| `app/sitemap.ts`, `app/robots.ts` | Generated `sitemap.xml` / `robots.txt` |
| `app/og-default.png/`, `app/logo.png/` | Build-time brand images (`lib/brand-image.tsx`, font in `assets/fonts`) |
| `app/{privacy,terms,delete-account,faq}/layout.tsx` | SEO tags only — legal pages untouched; titles/descriptions there duplicate the page's |
| `app/layout.tsx` | Root layout, font loading, metadata |
| `app/globals.css` | CSS variables, Tailwind v4 theme tokens, base styles |
| `app/components/Navbar.tsx` | Sticky nav (transparent → white on scroll), mobile hamburger, `alwaysWhite` prop for inner pages |
| `app/components/Footer.tsx` | Dark footer with logo, tagline, nav links |
| `app/about/page.tsx` | About + Mission full page |
| `app/how-it-works/page.tsx` | Step-by-step breakdown |
| `app/faq/page.tsx` | Expanded FAQ (10 questions, accordion) |
| `lib/supabase.ts` | Typed Supabase client (lazy init) |
| `public/Hero.png` | Hero background image (South Asian couple, culturally aligned) — must be present for hero to render |
| `vercel.json` | Vercel deployment config |

## Positioning
_Updated Session 43 (truth pass, parts 1–3) — replaces the prior version of
this section, which described Guardian Mode and Gov ID verification as the
primary USP even though neither was ever built._

_L1b (2026-09-30): "photo privacy — blurred by default" removed. The app has
no photo blur, and never did. Photo files sit at public, unguessable URLs
(see `/privacy`)._

- **Audience**: ALL Bangladeshis, worldwide — not faith-specific. Modesty-framed,
  not religion-first. Religion is never assumed, but it **is** a required
  onboarding question (with "Prefer not to say"); sect is asked only if
  religion is Islam. Don't call religion "optional".
- **Tone**: Premium, editorial, intentional. Vocabulary: modesty, decency,
  seriousness, family, intention. Never halal, deen, Islamic, or wali.
- **Primary USP** (all live in the app):
  - **A verified tick that means something specific** — a liveness check
    (via Didit) **and** the main photo matched to that selfie. Nothing more:
    no ID check, and the tick doesn't vouch for name, age or marital status.
  - **You stay in control** — edit your profile or remove photos any time,
    block or report anyone, delete your account from the app. Other members
    never see your email, phone number or exact location.
- **Not offered** — do not write copy implying these exist: Guardian Mode,
  audio/video calls, any pricing/premium tier, government-ID verification,
  photo blur / reveal / unlock, pausing or hiding your profile (the
  `incognito_mode` column exists but nothing in the app sets it), unmatch
  (blocking is what ends a match), a "Trust Profile" confirming phone /
  location / references, manual review of every profile before it goes live.
- **Verification copy (L1c)** must say exactly: optional; a live selfie
  check (Didit) plus a match of the main photo against that selfie; the ✓
  shows only when both pass; a main photo that doesn't match is flagged for
  review and the ✓ comes off; no ID check. Never "reviewed before it goes
  live" and never "coming" — it's live.
- **Launch state (L1d)**: the app is being tested with a small group; the
  waitlist hears when it opens to everyone. Never promise waitlist
  "priority access" — the Terms say joining guarantees no place or priority.
- **Also not offered** (L1d): a family-involvement feature, a "matching
  engine" beyond preference filters + verified-first ordering, a support
  team or response-time promise (one person reads hello@biyehobe.com).
- **Tagline**: "Where tradition meets intention — wherever home is."
- **Rule**: nothing in copy describes a feature that isn't merged to `main`.
  Aspirational features get a visibly distinct "coming" treatment instead
  of being stated as current.

## Supabase Setup
Run this SQL once in the Supabase dashboard SQL editor:

```sql
CREATE TABLE waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can join waitlist" ON waitlist FOR INSERT WITH CHECK (true);
```

## Environment Variables
Set in Vercel dashboard and locally in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Tailwind v4 Note
This project uses Tailwind CSS v4 which has **no `tailwind.config.ts`**. Custom tokens live in `app/globals.css` using the `@theme inline` directive. Brand colors and fonts are referenced in components via inline `style` props using CSS variables (e.g. `var(--green)`, `var(--font-display)`).

## Session Log
| Session | Date | Summary | Status |
|---------|------|---------|--------|
| 31 | 2026-04-28 | Landing page scaffolded and deployed to Vercel. Waitlist form connected to Supabase. Live at https://biyehobe-landing.vercel.app | ✅ Complete |
| 32 | 2026-04-30 | Full premium redesign — dark editorial luxury. New color system (#043927 + #C9952A), Cormorant + DM Sans typography, 4 pages built (home, /about, /how-it-works, /faq), diaspora repositioning, Guardian Mode elevated as primary USP, Hero.png local asset wired up | ✅ Complete |
| 62 | 2026-10-01 | Blog (Markdown in `content/blog`, static) + site-wide SEO: metadataBase, canonicals, OG/Twitter, sitemap, robots, RSS, JSON-LD. "Blog" nav/footer link appears only when ≥1 post is published (`NEXT_PUBLIC_HAS_BLOG_POSTS`, set in `next.config.ts`). No analytics added | ✅ Complete |

## Session 33 Priorities
- **Landing page polish round 2**
  - Interactive Built Differently section (horizontal scroll or tabs)
  - Typography weight contrast improvements
  - Trust badge graphic near waitlist CTA
  - Sticky nav verification (confirm Join Waitlist always visible)
  - Add logo image asset (infinity knot PNG) to navbar
- **Admin panel**: add waitlist viewer page
- **Mobile app**: fix `call/[conversationId]` route warning
- **Mobile app**: run location migration SQL (`20260410000001`)
- **Release**: tag `v0.4-phase2-complete` once confirmed stable

## Project Info
- **GitHub**: sasmmalam/biyehobe-landing
- **Live**: https://biyehobe-landing.vercel.app
- **Developer**: sasmm.alam@gmail.com
