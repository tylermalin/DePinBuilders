# DePin.Builders

Independent research hub for Decentralized Physical Infrastructure Networks. Verified projects, hardware reviews, rankings, a coverage map, earnings tools, and an academy for operators. Built to rank.

This repository is the production build of a design prototype. If you are an AI coding agent, start with `CLAUDE.md`.

## Handoff contents

| Path | What it is |
|---|---|
| `CLAUDE.md` | Operating manual. Read first. Stack, rules, guardrails, definition of done. |
| `docs/PRD.md` | Product requirements. Audience, sitemap, every page, the business model. |
| `docs/SEO.md` | The SEO architecture. Routes, metadata, JSON-LD, sitemap, programmatic pages, keyword map. This is the priority. |
| `docs/DATA-MODEL.md` | Prisma schema, entities, seed strategy, live-data plan. |
| `docs/BRAND.md` | Design tokens, fonts, color usage, motion, and the voice rules for all copy. |
| `docs/BUILD-PLAN.md` | Phased milestones with acceptance criteria. Build in this order. |
| `prompts/claude-code-prompts.md` | Copy-paste prompts for Claude Code, one per phase. |
| `data/projects.seed.ts` | Typed source-of-truth project data, extracted from the prototype. |
| `reference/prototype.html` | The working visual and interaction spec. Open it in a browser. |

## Quickstart (once scaffolded)

```bash
pnpm install
cp .env.example .env.local      # fill in values, never commit this
pnpm db:migrate
pnpm db:seed
pnpm dev
```

## Environment

```
DATABASE_URL=                   # Postgres (Vercel Postgres, Supabase, or Neon)
NEXT_PUBLIC_SITE_URL=https://depin.builders
CLERK_SECRET_KEY=               # or Auth.js equivalents
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
COINGECKO_API_KEY=              # live token prices, phase 8
RESEND_API_KEY=                 # newsletter, phase 7
```

## The one thing to get right

A single-page app cannot rank in search. This build exists to fix that. Every project, category, chain, comparison, tool, and article gets its own server-rendered URL with proper metadata and structured data. Read `docs/SEO.md` before building routes.

## Brand in one line

Measured, not estimated. Verified, not vibes.
