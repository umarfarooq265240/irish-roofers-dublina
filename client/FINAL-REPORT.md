# Irish Roofers Dublin: build report (steps 0-9)

## What was built
- **67 static pages** (plus a 404): home, about, contact, reviews, services index + 9 service pages, areas index + 40 area pages, roofing costs, advice index + 6 articles, privacy, cookies, terms, accessibility.
- Static export (`npm run build` writes `out/`), no database, no CMS. Everything comes from `src/config/site.ts` and `src/config/content/*`.
- 18 AI-generated images (banners and service illustrations only; none in "Recent work", which is hidden until real photos exist):
  hero-dublin-houses-new-slate-roofs-dusk, flat-roof-repair-dublin, leaking-roof-repair-dublin, slate-roof-repair-dublin-14, tiled-roofing-dublin, ridge-tile-repair-dublin, chimney-repair-dublin, skylight-installation-dublin, emergency-roof-repair-dublin, roof-inspection-dublin, about-irish-roofers-team-dublin, areas-dublin-rooftops, contact-roofers-dublin-14, roofing-costs-dublin-quote, roofing-advice-dublin, reviews-roofers-dublin, process-roof-scaffold-dublin, cta-slate-roof-dublin-dusk.
  Each has AVIF and WebP at 480/768/1024 and a 1200x630 social image.

## SEO, GEO and AEO in place
- Unique title and description per page, canonical URLs, Open Graph and Twitter tags with a matching image, one H1 per page, breadcrumbs.
- `sitemap.xml` (67 URLs with images), `robots.txt` (all AI crawlers allowed), `llms.txt`, icons, 404 page.
- JSON-LD: RoofingContractor on every page (address, Eircode, geo, 24/7 hours, areas, 4.8 from 440 reviews), WebSite and Organization (home), BreadcrumbList, FAQPage, Review (real reviews only), Service, Article. All 67 pages validated.
- 40-60 word direct answer at the top of every service and area page, and 5 FAQs on each.

## Checks run (static build served locally)
- `npm run check` (lint, typecheck, build): passes.
- All 67 pages at 1440 and 390 px: no console errors, no failed requests, no horizontal overflow, one H1, no broken images, no links to the source site.
- Flows: cookie bar, 4-step quote funnel (Eircode and Irish phone validation, mailto/tel hand-off), FAQ accordion, sticky header, back-to-top, mobile menu.
- Lighthouse mobile (local, gzip, simulated slow 4G): Accessibility, Best Practices and SEO 100 on every page tested. Performance: home 96, contact 95, area 94, service 93. Real scores will depend on the host (use one with gzip/brotli and long cache headers, e.g. Vercel or Netlify).

## Client TODO list
1. **Email address** for quote requests (left empty on purpose; the funnel's mailto needs it).
2. **Logo** (a placeholder wordmark and house icon are used) and the matching **brand accent colour** (currently orange `#ff8a1f`).
3. **Live domain**: `https://irishroofers.ie` is assumed in `site.seo.url`; confirm it.
4. **Social profile links**, **years trading**, **accreditations, insurance and awards**: nothing is claimed until supplied.
5. **Real project photos** for "Recent work" (hidden until then) and ideally real team photos to replace the AI images over time.
6. **Full text of the 4 truncated Google reviews** (Google cut them off).
7. **Confirm guide prices** (the euro figures are estimates) and the "free inspection" offer.
8. **Solicitor review** of the privacy, cookie and terms texts.

## Next steps for the owner (a website alone cannot guarantee a #1 ranking)
- Keep the Google Business Profile active: correct categories, photos, regular posts, reply to every review. Name, address and phone must match the website exactly.
- Build citations: Golden Pages, Yelp Ireland, Bing Places, Apple Maps.
- Earn backlinks (local suppliers, trade bodies, local press).
