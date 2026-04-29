@AGENTS.md

# BiyeHobe Landing Page

## Project Overview
Landing page for **BiyeHobe** — a private, verified matrimonial platform for Bangladeshi Muslim professionals worldwide (NRB-focused).

## Stack
- **Framework**: Next.js 16.2.4 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first config via `@theme` in `globals.css`)
- **Icons**: lucide-react
- **Backend**: Supabase (waitlist email capture)
- **Deployment**: Vercel

## Brand Colors
| Name    | Hex       |
|---------|-----------|
| Primary | `#1B4D3E` |
| Gold    | `#C9952A` |
| Cream   | `#FAF8F5` |

Colors are defined in `app/globals.css` under `@theme inline`.

## Key Files
| File | Purpose |
|------|---------|
| `app/page.tsx` | Full landing page (navbar, hero, features, waitlist, footer) |
| `app/layout.tsx` | Root layout and metadata |
| `app/globals.css` | Global styles and Tailwind v4 theme tokens |
| `lib/supabase.ts` | Typed Supabase client (lazy init) |
| `vercel.json` | Vercel deployment config |

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
This project uses Tailwind CSS v4 which has **no `tailwind.config.ts`**. Custom tokens live in `app/globals.css` using the `@theme inline` directive. Brand colors are referenced in components via inline `style` props.

## Session Info
- **Session**: 31
- **Date**: 2026-04-28
- **GitHub**: sasmmalam/biyehobe-landing
- **Developer**: sasmm.alam@gmail.com
