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
| Green  | `#043927` | Primary — nav, trust strip, CTA sections |
| Gold   | `#C9952A` | Accent — buttons, icons, dividers |
| Cream  | `#FAF8F5` | Background — section fills, card backgrounds |
| Dark   | `#0D1F1A` | Footer background |

Colors are defined as CSS variables in `app/globals.css` under `:root` and registered via `@theme inline`.

## Typography
- **Display**: `Cormorant` (Google Fonts — 400, 600, 700) — headings, logo, blockquotes
- **Body**: `DM Sans` (Google Fonts — 300, 400, 500) — all body text, nav links, labels
- Loaded via `next/font/google` in `app/layout.tsx`, injected as `--font-cormorant` and `--font-dm-sans` CSS variables
- No Bangla/Bengali font imports

## Key Files
| File | Purpose |
|------|---------|
| `app/page.tsx` | Full home page — navbar, hero, trust strip, how it works, features, mission, FAQ, waitlist, footer |
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
- **Audience**: Bangladeshi diaspora — NRBs and residents alike
- **Tone**: Premium, editorial, intentional — NOT generic or religion-first
- **Primary USP**: Guardian Mode (optional family transparency), Verified Profiles (Gov ID + selfie-match)
- Muslim-specific language removed; positioning is cultural/diaspora-focused

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
