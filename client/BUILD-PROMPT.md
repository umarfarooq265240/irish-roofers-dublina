# Full build brief: Irish Roofers Dublin website

Goal: a full **static** website for the client **Irish Roofers Dublin**. No database and no CMS. The design is an exact copy of https://www.amroofingservices.co.uk/ (layout, animations, interactions, every page type), filled with the client's own information. The site must also be a reusable template, so later roofers only need a new `site.ts` and new images. Generate realistic images while building, and make everything strongly optimised for local SEO, GEO (AI search engines) and AEO (answer engines and featured snippets).

---

## 0. Already done: DO NOT redo
- The homepage is already cloned 1:1 and verified (section heights match at 1440 and 390).
  - Code: `src/app/page.tsx`, `src/components/sites/amroofing/` (19 sections, `amroofing.css`, `SiteBehaviors.tsx` holding all animations and JS).
  - Assets: `public/sites/amroofing/`
  - Notes: `docs/research/amroofing/README.md`
- The list of all 72 AM pages is in `docs/research/amroofing/all-pages.txt`.
- The helper scripts are in `scripts/clone-tools/`: inspect, probe, html2jsx, prune-css, compare, offsets, flows. Reuse them. Their hardcoded REGIONS and ROOT values need adapting for each page.
- The client data is in `client/profile.md`.
- Client images go in `client/photos/`. `hero-slate-roofers.webp` already exists.
- The client's old site is https://irishroofers.ie/. Use it for extra facts (email, logo, areas, years trading, photos).

## 1. Clone every AM page TYPE exactly (use the /clone-website workflow)
Follow `.agents/skills/clone-website/` for each **unique page design**. Clone each template once, then generate the repeats from data. Do not hand-clone 72 near-identical pages.

| AM page type | Example URL | Local route |
|---|---|---|
| About | /about/ | /about/ |
| Contact | /contact/ | /contact/ |
| Reviews | /reviews/ | /reviews/ |
| Services index | /services/ | /services/ |
| Service detail | /services/<slug>/ | /services/[slug]/ (generateStaticParams) |
| Areas index | /areas-we-cover/ | /areas-we-cover/ |
| Area detail | /areas-we-cover/<town>/ | /areas-we-cover/[slug]/ (generateStaticParams) |
| Roofing advice index and article | /roofing-advice/ and articles | /roofing-advice/ and /roofing-advice/[slug]/ |
| Roofing costs | /roofing-costs/ | /roofing-costs/ (€ prices, marked "guide prices, from") |
| Policies | cookie-policy, terms, accessibility | one policy template plus privacy-policy |

Requirements:
- Copy each page's layout, spacing, fonts, responsive behaviour, animations (reveals, line-split titles, count-ups, parallax, magnetic and spotlight hover, sticky header, progress bar, to-top), FAQ accordions, the cookie bar and the 4-step quote funnel exactly. Reuse `amroofing.css` and `SiteBehaviors.tsx`. Prune CSS per page with `prune-css.js`, including the runtime classes `is-active` and `is-done`.
- Verify each template with `scripts/clone-tools/offsets.js` (a section-height diff at 1440 and 390) instead of many screenshots, to keep token use low.
- Every internal link must point to local routes. Leave no links to amroofingservices.co.uk.
- Skip `sample-page`, `trade-enquiries` and `capability-pack` unless the client wants them.

## 2. One config file = reusable template
Create `src/config/site.ts` with all business data. Every page and section reads from it: name, phone, address, Eircode, geo coordinates, hours, rating and review count, services (slug, title, short and long copy, FAQs, image, keywords), areas (slug, name, local notes), reviews, social links, colours, logo, image paths and SEO defaults. Missing facts become `TODO` values that are clearly marked. A future roofer then means a new `site.ts` plus new images and nothing else.

## 3. Client content (from client/profile.md)
- **Business:** Irish Roofers Dublin. Phone 086 050 8558 (+353 86 050 8558). Nutgrove Office Park, E2, Meadow Park Ave, Dublin 14, D14 W2Y4. Open 24 hours. Rated 4.8 from 440 Google reviews.
- **Services:** flat roof repair, leaking roof repair and leak detection, slate roof repair, tiled roofing (new roofs, repairs, maintenance), ridge tile repair and repointing, chimney repair, skylight installation, emergency roof repair (temporary waterproofing), roof inspections and free quotes.
- **Selling points:** 5-year guarantee, fair quotes with no hard sell, fast response, cherry picker access, friendly team (Alan, Pat).
- **Areas (Dublin only):** Dublin 14, Rathfarnham, Churchtown, Dundrum, Ballinteer, Terenure, Rathgar, Ranelagh, Milltown, Clonskeagh, Stillorgan, Sandyford, Foxrock, Blackrock, Booterstown, Templeogue, Knocklyon, Firhouse, Tallaght, Ballyboden, Kimmage, Harold's Cross, Rathmines, Donnybrook, Ballsbridge, Dun Laoghaire, Dalkey, Killiney, Cabinteely, Leopardstown, Lucan, Clondalkin, Swords, Malahide, Howth, Clontarf, Drumcondra, Glasnevin, Castleknock, Blanchardstown. Each area page needs unique copy (local landmarks, typical housing such as Victorian slate terraces or 1970s concrete-tile semis, nearby areas). No copy-pasted text with only the town name swapped.
- **Reviews:** use ONLY the real reviews in profile.md. Never feature the negative one. Never invent reviews, ratings, years trading, job counts, accreditations, awards or insurance claims. Remove all AM accreditation and award badges. Leave a TODO if the client has real ones.
- **Ireland formats:** € prices, Eircode instead of postcode (validate the Eircode pattern), Irish phone validation, en-IE spelling, `lang="en-IE"`.
- **Quote form:** keep the 4-step funnel UI. With no backend, the final step opens `mailto:` with the summary and also offers `tel:`. The email is a TODO until the client provides it.
- Remove ALL AM Roofing text, logos, photos, reviews and brand colours. Change the accent colour away from AM's yellow `#f2ff3d`, using the client logo colours if available, so the site is not AM's brand.

## 4. Generate images at the same time
Use `node scripts/gen-image.js <seo-file-name> "<scene>" <provider> [16:9|4:3|1:1]`. It saves to `client/photos/raw/`. Keys are in `cloudef.env` and `.env.local`. Never print or commit them.
- `cloudflare` (default choice): Workers AI FLUX, tested and working. It outputs 1024×1024 and sometimes adds black bars at the top and bottom, so crop them off with sharp. It sometimes writes gibberish text on hi-vis vests, so regenerate those.
- `hf`: free FLUX Space. Use it as a backup when Cloudflare's daily limit runs out.
- `gemini`: Nano Banana. The key works, but the free tier gives 0 image requests, so only use it if billing has been enabled.

The raw Hugging Face method, for reference:
```bash
B=https://black-forest-labs-flux-1-schnell.hf.space/gradio_api
ID=$(curl -s -X POST "$B/call/infer" -H "Content-Type: application/json" \
  -d '{"data":["<PROMPT>",0,true,1344,768,4]}' | sed 's/.*"event_id":"\([^"]*\)".*/\1/')
URL=$(curl -s -N --max-time 180 "$B/call/infer/$ID" | grep -o '"url": "[^"]*"' | head -1 | sed 's/"url": "//;s/"$//')
curl -s -o client/photos/<name>.webp "$URL"
```
- Prompt style: `Photorealistic DSLR photograph, <scene>, Dublin suburb house, overcast Irish sky, soft natural light, 35mm lens, sharp realistic detail, no text`.
- Make one image per service, plus about/team, areas, contact, roofing costs and advice banners (about 15 images).
- Look at each one and regenerate any with AI mistakes (hands, tools, warped roof lines, text).
- **Rule:** AI images are only for banners and service illustrations. NEVER use them in "Recent work", "Our projects" or before/after sections. Use only real photos there (client/photos/ or irishroofers.ie). If there are no real ones, hide the section and leave a TODO.

## 5. Image SEO (every image)
- **File names:** descriptive keywords with hyphens, e.g. `slate-roof-repair-dublin-14.webp` or `flat-roof-repair-rathfarnham.webp`. Never `image1.webp`.
- **Formats and sizes:** convert with sharp to WebP (plus AVIF where useful). Make responsive widths 480/768/1200/1600 and use `<picture>`/`srcset` and `sizes` like the AM clone. Target under 150 KB for card images and under 250 KB for the hero. Set width and height on every img (no layout shift).
- **Loading:** the hero image uses `fetchpriority="high"`, is not lazy, and is preloaded. Everything else uses `loading="lazy" decoding="async"`.
- **Alt text:** describe the image naturally, with service and location, e.g. "Roofer repairing slate roof on a semi-detached house in Dublin 14". No keyword stuffing.
- Strip EXIF metadata from AI images. Add an image sitemap (an `images` entry per page in sitemap.ts).
- Add an OG/social image (1200×630) for the home page and each service.

## 6. Local SEO (aim: rank for "roofer Dublin 14", "<service> <area>", the brand name, and the map pack)
- **NAP consistency:** name, address and phone must be identical everywhere (header, footer, contact, schema) and exactly match the Google Business Profile.
- **Unique `<title>` and meta description per page**, using the `generateMetadata`/`metadata` API (read the Next 16 docs in `node_modules/next/dist/docs/` first).
  - Service page title: `<Service> in Dublin | Irish Roofers Dublin`.
  - Area page title: `Roofers in <Area> | Roof Repairs <Area> | Irish Roofers Dublin`.
  - Titles under 60 characters, descriptions under 155, with phone or a call to action in the description.
- **Headings:** exactly one H1 per page containing the main keyword plus the location, and a logical H2/H3 structure.
- **Canonical URLs**, trailing slash consistent, `metadataBase` set from site.ts (domain TODO, e.g. https://irishroofers.ie).
- **Internal links:** each service page links to related services and the top areas. Each area page links to all services ("Flat roof repair in <Area>"). Add breadcrumbs on every inner page. The footer lists areas and services.
- **Embed a Google Map** of the business location on the contact and area pages (lazy iframe), plus a "Get directions" link and a "Read our 440 Google reviews" link to the GBP.
- `src/app/sitemap.ts` (all pages and images), `src/app/robots.ts`, a 404 page, and favicon and app icons.
- **Performance (Core Web Vitals):** static export, self-hosted fonts with `font-display: swap`, no unused JS, Lighthouse 95+ on mobile for Performance, SEO, Accessibility and Best Practices.

## 7. Structured data (JSON-LD on every page, from site.ts)
- `RoofingContractor` (a LocalBusiness subtype): name, url, logo, image, telephone, address (PostalAddress with Eircode, addressCountry IE), geo (53.2914577, -6.2603759), openingHoursSpecification (24/7), areaServed (list of Dublin areas), hasMap (GBP link), sameAs (GBP and socials), priceRange, and aggregateRating (4.8 / 440, only because it is real and shown on the page).
- `Review` items only for the real reviews shown on the page.
- `Service` schema on each service page (provider, areaServed, serviceType).
- `FAQPage` on every page with FAQs. `BreadcrumbList` on inner pages. `WebSite` and `Organization` on home. `Article` on advice posts.
- Validate the JSON shape (no errors). No fake data in the schema.

## 8. GEO and AEO (AI search engines and answer boxes)
- Each service and area page starts with a 40–60 word **direct answer paragraph** (who, what, where, cost range, phone), so ChatGPT, Gemini, Perplexity and Google AI Overviews can quote it.
- **FAQ section on every service and area page:** 5–8 real customer questions such as "How much does a roof repair cost in Dublin?", "Do you offer emergency roof repairs in Dublin 14?", "How long does a flat roof last in Ireland?" and "Is there a guarantee?". Give short, factual answers (5-year guarantee, 24-hour availability).
- Use question-style H2s, lists, tables (e.g. € guide prices on roofing-costs) and clear facts: the business name, "Dublin 14" and the service in plain sentences.
- Add `public/llms.txt`: a plain-text summary of the business, services, areas, contact and key page URLs for AI crawlers. Allow AI crawlers in robots (GPTBot, Google-Extended, PerplexityBot, ClaudeBot).
- Show "Last updated" dates on advice articles. Add an author/business "About" block (E-E-A-T). Show the team names Alan and Pat only as mentioned in reviews.
- Write 6 roofing advice articles answering common Dublin roofing questions, such as the cost of a new roof in Dublin, slate vs tile, signs you need a roof repair, flat roof lifespan in the Irish climate, chimney leak causes, and storm damage steps.

## 9. Finish
- In `next.config`, set `output: "export"` and `images: { unoptimized: true }` (images are pre-optimised by sharp). Then run `npm run check` and fix everything.
- Run `scripts/clone-tools/flows.js`-style checks: cookie bar, funnel, FAQ, mobile menu, no console errors, no 404 assets, no horizontal overflow at 390.
- Report: pages built (count), images generated (file names), Lighthouse scores, and a **client TODO list** (email, logo, domain, social links, years trading, accreditations and insurance, real project photos, full review texts).
- Note for the owner: rankings also depend on the GBP itself (categories, photos, posts, review replies), consistent citations (Golden Pages, Yelp IE, Bing Places, Apple Maps) and backlinks. List these as next steps. A website alone cannot guarantee the #1 position.

## 10. Make it ready for GitHub
- Delete all AM Roofing assets from the final site: `public/sites/amroofing/` images and logos, plus AM text. Keep the design code. Rename the folders to `sites/irishroofers/` (or a generic `sites/main/`).
- Keep `docs/research/amroofing/` and `docs/design-references/amroofing/` out of the repo: add them to `.gitignore`. They contain AM's copyrighted pages.
- Write a short `README.md` that covers how to run (`npm install`, `npm run dev`), how to build the static site (`npm run build`, output in `out/`), how to deploy (Vercel, Netlify or GitHub Pages), and how to reuse it for another roofer (edit `src/config/site.ts` and replace the images).
- Run `git init`, make the first commit, and tell me the commands to create and push to a new GitHub repo. Don't push without asking me.

## Rules
- Do not rebuild the homepage design. Only switch its content to site.ts and client data.
- Keep token use low: no full-page screenshots unless a height diff fails, and short reports.
- Work one step at a time (steps 1–9). **Stop after each step** so I can check it before you continue.
