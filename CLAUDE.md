# Real Estate Arbitrage Platform

## What this is

A web app that scores real estate deals for "arbitrage" upside: properties where
zoning, ADU/SB-9 law, local enforcement, or short-term-rental rules create value
that normal underwriting misses. A user fills in an investor profile and gets
properties ranked by fit.

Current state is a v0-generated prototype. One flow works end to end on 16
hand-entered South Bay (LA) properties; most other pages are static mockups.
Full detail in `docs/STATUS.md`. Read it before starting work.

Naming is unsettled: the folder is `HiddenYield`, the Vercel project is
`v0-real-estate-arbitrage`, the site header says "Real Estate Arbitrage
Platform / Your Arbitrage Profile™". Ask before picking one.

## People

- **Josh** (GitHub `Empempo`, Vercel `joshgghill-2628`): works through Claude Code
  only. Push access to the repo, not admin. Vercel team role is **Developer**:
  cannot change project settings or the Git connection.
- **Drew** (`drewboyles-cloud` on GitHub, `drewboyles-2758` on Vercel): owns the
  repo and the Vercel team (Owner).
- Two other collaborators (professionals). Work and docs should read professionally.

## Where things live

- **GitHub** (source of truth): https://github.com/drewboyles-cloud/Real-estate-arbitrage-platform
- **Vercel** project `v0-real-estate-arbitrage`, team `drewboyles-2758s-projects`.
  Linked to the repo; production branch is `main`; every branch gets a preview build.

## Branch situation (as of 2026-10-01)

- The live site (production deployment from 2025-12-01) was deployed straight from
  v0 and was never in Git. Its source was downloaded from that deployment and lives
  on branch `chore/import-v0-live-site`. **This branch is the real app.**
- `main` still holds an unrelated small marketing homepage from 2026-02-16. Merging
  this branch into `main` (via pull request) is the planned way to make Git match
  the live site. Team has not approved that yet.
- **Vercel builds currently fail**: the project is set to Node.js 20, which Vercel
  no longer runs. Fix: Drew sets Node 24 in project settings, or add
  `"engines": { "node": "24.x" }` to `package.json`.

## How we work

- All changes go through Claude Code locally, then GitHub. Nobody edits in v0 or
  the Vercel dashboard.
- Never commit straight to `main`. Branch, push, open a pull request, review the
  Vercel preview, then merge.
- Branch names: `feature/...`, `fix/...`, `chore/...`.
- Commit messages: short, imperative, say what changed.
- Run `npm run build` and `npx tsc --noEmit` before pushing.

## Stack

- Next.js 16 (App Router, `app/`), React 19, TypeScript
- Tailwind CSS v4, shadcn/ui components in `components/ui/` (Radix-based, mostly unused)
- recharts, react-hook-form, zod, sonner, next-themes available
- `@vercel/analytics` in the root layout
- Path alias `@/` = project root
- No database, no auth, no external data sources

## Project map

- `lib/scoring.ts`: property data (`OPPORTUNITIES`), property score, profile-fit score
- `lib/str.ts`, `lib/strConfig.ts`, `lib/strEngine.ts`: short-term-rental calculator and per-city assumptions
- `context/ArbitrageProfileContext.tsx`: the user profile (in memory only)
- `app/assessment` → `app/insights` → `app/opportunity/[id]`: the working flow
- `app/api/opportunities/...`: JSON endpoints, not used by any page
- `app/validation`: scoring sanity-check page
- Everything else under `app/` is mockup or static content (see `docs/STATUS.md`)

## Commands

- `npm install`, `npm run dev` (http://localhost:3000), `npm run build`
- `npx tsc --noEmit`: type check (the build skips this, see below)
- `vercel ls v0-real-estate-arbitrage --scope drewboyles-2758s-projects`: deployments
- `vercel inspect <url> --logs --scope drewboyles-2758s-projects`: build logs

## Gotchas

- `next.config.mjs` sets `typescript.ignoreBuildErrors: true`. 21 type errors exist
  (14 in `components/ui`, 7 in `lib/` and the diligence route). The build passes anyway.
- ~30 dependencies are pinned to `"latest"`, so installs are not repeatable.
- Lock file is `bun.lock` (from v0). Package manager not formally chosen yet.
- `STRRegime` is imported between `lib/str.ts` and `lib/scoring.ts` but defined in
  neither. It works only because types are erased at runtime.
- The property score is effectively 0–10 although comments and API say 0–100.
