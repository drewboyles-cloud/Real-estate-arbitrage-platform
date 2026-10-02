# Project Status

*As of 2026-10-01. Describes branch `chore/import-v0-live-site`, which is the source of the live site.*

## Summary

The app is a v0-generated prototype with 28 pages. One flow works end to end:
the user fills in an investor profile, and 16 hand-entered South Bay (Los Angeles)
properties are scored and ranked against it. The rest is static mockups with
sample data, or static content.

There is no database, no user accounts, no persistence, and no external data
source. All data is hard-coded in source files.

The app builds locally. Vercel builds currently fail because the project is set to
Node.js 20, which Vercel has retired.

## Working: profile → ranked properties

**Flow:** Home → `/assessment` → `/insights` → `/opportunity/[id]`

1. **Assessment**: owner-occupy or not, current rent, down payment range, time
   horizon, risk tolerance, credit tier, renovation comfort, strategy preferences
   (ADU, House Hack, Small Multifamily, Teardown).
2. **Insights**: all properties ranked by profile-fit score, with the top drivers
   behind each score.
3. **Detail**: property facts, rent estimates, short-term-rental (STR) estimate.

**Data:** 16 properties in `lib/scoring.ts` across El Segundo, Torrance, Redondo
Beach, Manhattan Beach and Hawthorne/Hollyglen. Price, lot size, zoning, units,
rent estimates, enforcement levels, neighborhood tier. Figures are unverified.

**Scoring (all in `lib/`):**

| Engine | What it does | Scale |
|---|---|---|
| Property score (`computeOpportunityArbitrageScore`) | 7 weighted factors: regulation, zoning, density upside, underbuild gap, price per unit, rent yield, owner-occupant fit; then neighborhood/density multipliers | Effectively 0–10 (comments and API say 0–100) |
| Profile-fit score (`scoreOpportunity`) | Points for underbuilt lots, ADU income, owner-occupied cost vs. current rent, strategy match; credit-tier penalty; multipliers | Points, clamped 0–100 |
| STR calculator (`lib/str.ts`) | Nightly rate × occupancy − fees − costs, compared with long-term rent; optional debt and cash-on-cash | 0–10 |

STR assumptions per city/submarket are in `lib/strConfig.ts`, labelled in the code
as placeholders.

**Profile storage:** in memory only. Lost on page refresh.

## Partial: API

Three JSON endpoints under `app/api/opportunities/`: list (filter by city and
minimum score), get one, and a "diligence packet". No page calls them. In the
diligence packet, incentives are always "none" and comps are single placeholder
rows.

## Mockups (static sample data, no logic)

These use Arizona/Texas sample data unrelated to the 16 South Bay properties.
Most are not linked from any other page.

| Page | Actual state |
|---|---|
| `/saved` | Fixed list of sample Arizona parcels; nothing can be saved |
| `/parcel/[id]` | Same Buckeye, AZ parcel for any id |
| `/diligence` | Fixed report for that parcel; download button inactive |
| `/compare` | Two fixed parcels side by side |
| `/map` | Not a map: random rectangles, regenerated on each load |
| `/markets` | Fixed city ranking (Austin, etc.) |
| `/onboarding` + 5 steps | Selections are not saved and Continue does not navigate; summary shows fixed text |
| `/capital`, `/risk-appetite` | Further variants of the onboarding steps |

**Two competing profile designs:** the Assessment form is connected to scoring;
the onboarding wizard asks different questions (capital, asset classes, goals) and
is connected to nothing. One needs to be chosen, or the two merged.

## Static content

`/opportunities` plus 7 strategy write-ups (affordable housing, coastal small
multifamily, data center conversion, entitled land banking, last-mile
distribution, senior living, Sunbelt infill). Text only; not linked to properties.

## Internal tools

- `/validation`: runs scoring sanity checks against the 16 properties (works).
- `scripts/validate-scoring.ts`: same idea, but references property ids that no
  longer exist. Out of date.

## Code health

- **Type errors are hidden.** `next.config.mjs` sets `ignoreBuildErrors: true`.
  21 errors: 14 in the bundled `components/ui` kit, 7 in project code. Two cause
  wrong behaviour:
  - An "SB9" strategy bonus in scoring can never apply; the form offers no SB9 option.
  - In the diligence packet, `lotSplitAllowed` is always false for SB-9-eligible parcels.
- **~30 dependencies pinned to `"latest"`.** Builds are not repeatable.
- **No automated tests** beyond the validation page.
- `@vercel/analytics` is active.

## Not built yet

Database; user accounts and auth; saving profiles or properties; real property
data (MLS, county parcels, zoning maps); a real map; real rent, sale and STR
comps; PDF export; any connection between the mockup screens and the scoring engine.

## Structural issues at scale

Problems that would block growth to thousands–millions of properties and
hundreds of users. Ordered by severity.

1. **Data lives in code.** Properties are a list in `lib/scoring.ts`; adding one
   needs a code change and redeploy. Client pages import that list directly, so
   every visitor downloads the full dataset. Needs a database and an import pipeline.
2. **Scoring runs in the browser over every property on every visit.** It won't work
   at large volumes. Store property scores when data changes, filter in the
   database first, and run profile-fit scoring server-side on the shortlist.
3. **Jurisdiction rules are hard-coded.** SB-9 posture, STR rules and rates,
   neighborhood tiers and enforcement levels are lookup tables in code. These
   must become data, with source and last-verified date, editable without a deploy.
4. **Property model is South-Bay-specific.**
   - Zoning is limited to `R1 | R2 | R3 | Other`. Store each city's raw code plus
     normalised attributes (max units, height, coverage), and score on those.
   - The 21 asset types (e.g. `Triplex_R2_Underbuilt_ADU`) combine building type,
     zoning and strategy in one label. Split them into separate fields.
   - Parcel (permanent land record) and listing (for sale at a price) are one
     record today. At scale there are millions of parcels and far fewer listings,
     so these need to be separate tables.
5. **Three scoring systems, unversioned.** Different scales, duplicated logic (the
   regulatory penalty is applied twice in the property score), hand-tuned weights,
   validation by expected rank order rather than outcomes. Needs one engine, a
   version stored with every score, and outcome-based tests.
6. **No users, persistence or permissions.** Accounts, saved profiles and
   properties, and team sharing touch every table; design them in from the start.
7. **No data provenance.** No source or as-of date on any figure. Required once data
   is imported and refreshed. Data licensing (MLS, AirDNA, parcel vendors) also
   constrains what can be stored and shown; price it early.
8. **Mapping at scale** needs a geospatial database (e.g. Postgres + PostGIS) and
   viewport-based tile loading. This affects the database choice.
9. **Code practices.** Type checking off, `"latest"` dependencies, no tests, seven
   copy-pasted strategy pages (should be one template), an unused API with no
   pagination.

**Suggested order:** re-enable type checking and pin dependencies (about an hour);
then decide database and schema (items 1, 4, 6), since those are the costliest to
change later; then move the 16 properties into it.
