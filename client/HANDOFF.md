# Handoff: Irish Roofers Dublin build (read this first in a fresh chat)

The user will usually type only **"go"**. When they do: read this file, `client/BUILD-PROMPT.md` (the full brief) and `client/profile.md`, then continue at **NEXT STEP** below. Work one step at a time and **stop after each step** with a short report (brief rule). Keep token use low.

## Status
| Step | State |
|---|---|
| 0 Homepage clone (AM design) | done earlier, verified 1:1 |
| 1 Clone every AM page type | **done** (11 page types, heights match source at 1440 and 390) |
| 2 `site.ts` + content, all pages data-driven | **done** |
| 3 Content audit (no AM text/claims, NAP, links, titles) | **done**, 66 pages crawled, all clean |
| 4 Generate images | **done**: 18 images via Cloudflare FLUX (Gemini free tier = 0 quota), wired into site.ts, services.ts, Home, ServicePage, process/services blocks |
| 5 Image SEO | **done**: `scripts/optimize-images.js` (480/768/1024 avif+webp, 1200x630 OG jpg in `public/sites/irishroofers/og/`), `Pic.tsx` (`<picture>` avif/webp srcset, hero preload via react-dom `preload`), service OG metadata. Image sitemap moves to step 6 (`sitemap.ts`, use `site.images` + `service.image`) |
| 5-old (sharp, webp/avif, srcset, preload, alt, OG, image sitemap) | todo |
| 6 Local SEO | **done**: `src/lib/seo.ts` `withOg()` on every page (canonical + OG + Twitter), `sitemap.ts` (67 URLs with images), `robots.ts` (AI crawlers allowed), `not-found.tsx`, icons (`icon.svg/png`, `apple-icon.png`, `favicon.ico`), `npm run build` passes. Fonts still preload-less and live in `public/sites/amroofing/fonts` (move in step 10; optional preload then). Lighthouse is checked in step 9. (old text:sitemap.ts, robots.ts, 404, icons, metadata polish, performance) | todo |
| 7 JSON-LD schema | **done**: `src/lib/schema.ts` + `JsonLd.tsx`; RoofingContractor in layout, WebSite+Organization on home, BreadcrumbList in PageHero, FAQPage in FaqSection/HomeFaq, Review in ReviewsBand, Service, Article. 67 built pages validated (script idea: parse ld+json from `.next/server/app/**/*.html`) |
| 8 GEO/AEO | **done**: `src/app/llms.txt/route.ts` (generated from site.ts, force-static), AI crawlers in robots.ts. Audit: service answers 46-56 words, area answers 50-52, 5 FAQs on every service and area page, articles show Last updated + business About block |
| 9 Finish | **done**: output export + `images.unoptimized`, `experimental.inlineCss`, `scripts/postbuild-export.js` (flat prefetch files, runs via npm postbuild), a11y fixes, hero zoom filter removed. `npm run check` passes, 67 pages x2 viewports crawl clean, Lighthouse mobile 93-96 perf, 100 a11y/bp/seo. Report: `client/FINAL-REPORT.md` |
| **10 NEXT** GitHub-ready | todo (see 10-detail) |
| 9-detail Finish: `output: "export"`, `images.unoptimized`, `npm run check`, flows checks, Lighthouse, report + client TODO list | todo |
| 10-detail GitHub-ready: delete AM assets, rename folders, gitignore research, README, `git init`, first commit, give push commands, **do not push without asking** | todo |

## NEXT STEP: step 10 (GitHub-ready: delete AM assets, move fonts to sites/irishroofers, gitignore research, README, git init + first commit, give push commands, DO NOT push without asking). Steps 4-9 are done; their notes are history below
Step 5 notes: area, advice and static pages inherit the home OG image/title (add per-page `openGraph` with title/description/url/image in step 6; helper `ogImageFor()` in `Pic.tsx`; `site.images.advice` has an OG file too). Re-run `node scripts/optimize-images.js` whenever raw images change.
Step 4 result: generator is `scripts/gen-all.js` (Cloudflare, skips existing, raw PNG 1024x1024 in `client/photos/raw/`). Web copies are 1024x576 webp (centre crop) in `public/sites/irishroofers/images/` and `client/photos/`. Old `hero-slate-roofers.webp` removed from public. Sources are only 1024 wide, so use widths 480/768/1024 in step 5 (1200/1600 would upscale). Advice index/article pages use no banner (`site.images.advice` unused).

### Step 4 history (old plan)
**Why it is not done:** the free HF FLUX Space (`black-forest-labs-flux-1-schnell.hf.space`) and other free Spaces return `event: error` (free GPU quota used up). The HF connector's `invoke` is disabled (`gradio=none`). Pollinations works but gives a low-quality image with a watermark: do not use it.

**New route: the user added a Gemini key to `.env.local`** (`GEMINI_API_KEY`, optional `GEMINI_IMAGE_MODEL`). The file is git-ignored. Never print or commit the key. Use Gemini image generation ("Nano Banana") through the REST API from a Node script, reading the key from `.env.local`.
- Check the current image-capable model id before coding (Google docs via the Context7 connector, or `GET https://generativelanguage.googleapis.com/v1beta/models?key=...` and pick an image model, e.g. a `gemini-*-flash-image` one). Use `GEMINI_IMAGE_MODEL` if set.
- Write `scripts/gen-gemini.js` (sequential, skip existing, retries, 16:9 / about 1344x768 output, save PNG to `client/photos/raw/<name>.png`). The old `scripts/gen-image.js` and `scripts/gen-all.sh` hold the 18 ready prompts (reuse the prompt text; ask Gemini for no text/logos in the image).

**Rules from the user (important):**
1. **Generate ALL images; use NO photo from the client's old website (irishroofers.ie).** The current `client/photos/hero-slate-roofers.webp` has unknown origin: replace it with a generated hero and stop using it.
2. **Each image must match the concept of the matching slot on the reference site** (https://www.amroofingservices.co.uk/), but **be a different, new scene, not a copy**. Reference concepts: finished house exteriors, drone/aerial views of roofs, flat roof membrane with rooflights, close-up of slate, team beside work vans, houses at dusk with warm windows. Irish setting: Dublin suburb, red-brick semis, slate/concrete tile, overcast light (dusk where the reference is dusk). Do not copy compositions exactly.
3. Brief rule: AI images only for banners and service illustrations. **Never** in "Recent work", "Our projects" or before/after sections (Recent work is currently hidden on purpose).
4. Look at every image (contact sheet) and regenerate ones with AI mistakes: text/logos on clothes or vans, hands, tools, warped roof lines, odd cherry pickers. Strip EXIF.

**The 18 images and where they go** (descriptive file names, brief section 5):
`hero-dublin-houses-new-slate-roofs-dusk` (home hero + `site.images.hero`), `flat-roof-repair-dublin`, `leaking-roof-repair-dublin`, `slate-roof-repair-dublin-14`, `tiled-roofing-dublin`, `ridge-tile-repair-dublin`, `chimney-repair-dublin`, `skylight-installation-dublin`, `emergency-roof-repair-dublin`, `roof-inspection-dublin` (the 9 service images in `src/config/content/services.ts`, currently all pointing at the hero file), `about-irish-roofers-team-dublin` (`site.images.about`, also process split + standard section), `areas-dublin-rooftops` (`site.images.areas`), `contact-roofers-dublin-14` (`site.images.contact`), `roofing-costs-dublin-quote` (`site.images.costs`), `roofing-advice-dublin` (`site.images.advice`), `reviews-roofers-dublin` (`site.images.reviews`), `process-roof-scaffold-dublin` (process split), `cta-slate-roof-dublin-dusk` (`site.images.cta`).
Slot concepts in the reference: hero = dusk new-build houses; "what we fix" cards = house / aerial / flat roof / commercial; process = aerial of a roof with scaffold and skylights; services hero = slate close-up; about hero = team with vans; CTA = finished house with driveway.

**After generating:** copy finals to `client/photos/`, put web copies in `public/sites/irishroofers/images/` (sharp may need installing: `npm i -D sharp`), update the image paths/alts in `src/config/site.ts` (`images`) and `src/config/content/services.ts` (`img()` helper), give home sections their own images (`Home.tsx` `WhatWeFix` uses `site.images.hero` for all 4 cards: use the 4 matching service/area images), then a quick visual check and **stop**. Step 5 does the responsive widths 480/768/1200/1600, AVIF, `<picture>`/`srcset`, hero preload, OG images.

## What exists (file map)
- `src/config/site.ts`: all business data (name, phone 086 050 8558 / +353860508558, address Nutgrove Office Park, E2, Meadow Park Ave, Dublin 14, D14 W2Y4, geo 53.2914577,-6.2603759, 24 hours, 4.8 from 440, 5-year guarantee, GBP link, nav, trust, home copy, process, area groups, about, costs, brand accent `#ff8a1f`), helpers (`phoneHref`, `fullAddress`, `hasEmail`, `fitTitle`, `formatDate`).
- `src/config/content/`: `services.ts` (9), `areas.ts` (40, unique copy), `reviews.ts` (7 real, negative one excluded), `advice.ts` (6 articles), `legal.ts` (privacy, cookie, terms, accessibility). `src/config/types.ts`.
- Components: `src/components/sites/amroofing/` : `blocks.tsx`, `blocks2.tsx` (shared sections, funnel), `pages/*Page*.tsx`, `sections/` (Header, Footer, Cookie bar, StickyCta, Home), `SiteBehaviors.tsx` (all JS: reveal, split titles, funnel with Eircode + Irish phone validation and mailto/tel hand-off, short forms, cookie consent), `PageShell.tsx`, `amroofing.css`.
- Routes in `src/app/`: `/`, about, contact, reviews, services (+`[slug]`), areas-we-cover (+`[slug]`), roofing-advice (+`[slug]`), roofing-costs, cookie-policy, privacy-policy, terms-and-conditions, accessibility-statement. `trailingSlash: true`; `output: "standalone"` for now (step 9 switches to `"export"`).
- Tools: `scripts/clone-tools/` (`offsets.js`, `checkpages.js`, `skeleton.js`, `pages2jsx.js`, etc.). Audit script idea: crawl built site from `/`, check status, one H1, title <=60, description <=155, canonical, forbidden AM terms, phone numbers.
- Research (to be git-ignored in step 10): `docs/research/amroofing/`, `docs/design-references/amroofing/`. AM assets still in `public/sites/amroofing/` (delete in step 10; fonts there are used by the CSS, move to `sites/irishroofers/fonts` first).

## Client TODOs (collect for the final report)
email (empty on purpose), logo (HTML wordmark placeholder + `public/sites/irishroofers/images/logo-irish-roofers-dublin.svg`), live domain (`site.seo.url` is `https://irishroofers.ie`, to confirm), social links, years trading, accreditations/insurance/awards (none claimed), real project photos for "Recent work", full texts of 4 truncated reviews, confirm guide prices (my estimates), confirm "free inspection", solicitor review of policy texts, accent colour from the logo. Next steps list for the owner: Google Business Profile upkeep (categories, photos, posts, review replies), citations (Golden Pages, Yelp IE, Bing Places, Apple Maps), backlinks. A website alone cannot guarantee #1.

## Working notes / gotchas (Windows + Git Bash)
- Bash `/tmp` is not Node's `/tmp`; for Node scripts use the Windows temp path (`C:/Users/Usman/AppData/Local/Temp`). Prefix `MSYS_NO_PATHCONV=1` when passing `/paths/` as script args.
- Very long heredocs fail (ENAMETOOLONG): use the Write tool for big files.
- Never `taskkill` all node. Stop the dev/start server by port with PowerShell: `Get-NetTCPConnection -LocalPort 3100 -State Listen` then `Stop-Process`. Dev server: `npx next dev -p 3100`; production check: `npm run check`.
- Next.js here is v16 with breaking changes: read `node_modules/next/dist/docs/` before using new APIs (params are Promises, etc.).
- `git status`: nothing committed yet for this work (branch `master`; commits happen in step 10).

## REVISION ROUND 2 (supersedes "NEXT = step 10")
The owner sent a long feedback list on 2026-11-20 plus new colours (primary #3ef43e, secondary #10161d) and 123 client Google photos. Plan and findings: `client/REVISION-2.md`. Do Parts A, B, C there one at a time (stop and report after each), then step 10 (GitHub-ready). Photos review (done): all 123 are ~200 px thumbnails, so reference only.
Owner answers received (email info@irishroofers.ie, offices, director Patrick, logo, partner logos, CIF and RCCA membership): see the end of `client/REVISION-2.md`; assets in `client/assets/`. Parts A and B done. Part C blocked on image quota (see end of client/REVISION-2.md for the resume steps).

## 2026-11-24: preview sent to the client (deadline day)
- Committed everything as `346b220` ("first preview") on `master`. No GitHub remote yet: the user creates the repo and pushes, then imports it in Vercel (framework: Next.js, default settings; `npm run build` passes, static export).
- Kept out of git (`.gitignore`): `*.env`/`.env*` keys (`cloudef.env`, `.env.local`), `docs/research/`, `docs/design-references/` (AM copyright), `client/photos/`, `client/assets/`, `client/*.har` (may hold cookies), `client/*.html`, `client/*.zip`, `client/*.pdf`, `client/screenshots-mobile/`, `images/`, the saved Google Maps folder.
- Git identity set for this repo only (user.name "Usman").
- Mobile preview for the client: `client/Irish-Roofers-Dublin-mobile-preview.pdf` (home + 7 navbar pages at 390px, full page, cookie bar/sticky CTA hidden) and PNGs in `client/screenshots-mobile/`. Script: scratchpad `shots-pdf.js` (serves `out/` on port 3199).

### Still to do after the client sees the preview
1. Client feedback on the Vercel link: collect it into a new `client/REVISION-5.md`.
2. Part C of `client/REVISION-2.md` (blocked on image quota) and anything open in `REVISION-3.md` / `REVISION-4-OLD-SITE-AUDIT.md`.
3. Step 10 cleanup: delete unused AM assets in `public/sites/amroofing/` (move fonts to `sites/irishroofers/fonts` first), rename `components/sites/amroofing` to a neutral name, write the README.
4. Desktop check (only mobile was reviewed for this preview).
5. Connect the real domain in Vercel and set `site.seo.url` to the final domain (sitemap, canonicals, schema use it).
6. Client TODOs listed above (social links, years trading, real project photos, full review texts, price confirmation, policy review).
