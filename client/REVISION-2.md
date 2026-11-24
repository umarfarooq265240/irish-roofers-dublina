# Revision round 2 (owner feedback), split into parts

Source: owner's long feedback message (2026-11-20). This round comes BEFORE step 10 (GitHub-ready).
Rule: one part at a time, short report, wait for "go". Never push to GitHub without asking.

## Global rules from the feedback
- Colours: primary `#3ef43e` (replaces orange `#ff8a1f`), secondary `#10161d` (replaces the blue). Neon green is light: use dark text (`#10161d`) on green buttons, never white on green. Check contrast (Lighthouse) afterwards.
- Images: for EVERY slot, look at the reference image first (subject, camera angle, framing, lighting) and make ours match that context. No look-alike recycling of one image across sections. No AI mistakes (distorted cars, house next to sky glitches, odd vans). Check each image on a contact sheet.
- Generation order: Hugging Face FLUX first; if its credits run out, Cloudflare (script now uses Phoenix 1.0 / Lucid Origin: `scripts/gen-all.js`, output `images/`).
- Keep the 3 images the owner likes: areas-we-cover hero (`areas-dublin-rooftops`), reviews hero (about 40% ok), contact hero (ok-ish). Everything else is replaced.
- Map only on the Contact page; other pages use pictures where the reference has pictures.
- Everything must work: no dead buttons. If the reference lacks an action, build it in the same typography/layout/spacing.
- Owner is happy to be asked for client data (email, accreditations, licences, etc.).

## Part A: tokens and global bugs
1. New colours everywhere (CSS variables in `amroofing.css`, `site.brand`, icons/OG if they use orange).
2. Burger menu must open correctly from any scroll position (reference bug: needs a double tap; do not copy it).
3. Pages must open at the top (first section), not scrolled to section 5-6 (scroll restoration / reveal / anchor issue).
4. Menu "Get a free quote" button does nothing: make it open the quote funnel (or go to the contact/quote section) and close the menu.
5. Email missing everywhere: ask owner / read client's old site; show it in "Let's talk", footer, contact. Currently empty by design.
6. Funnel progress line: one tone (a slightly darker shade fading to lighter), not two colours.

## Part B: new / changed sections
Home:
- Section 3 "Who we work with": replace our 4 services (slate, tile, flat, chimney, leaks) with the reference's audiences: Homeowners, Developers / new build, Main contractors, Commercial / managed property. Own short copy and matching images.
- Section 5 "Recent work": build it (dummy raw data, 4 cases, images in the reference style). Easy to replace later.
- Section 6 "Our services": was skipped; build it as in the reference.
- Section 7 "Irish Roofers standard": image should be one big house, zoomed out (not three men and a van).
- New separate "Accreditations" section (dummy data): the reference has 4 stats (20 years in trade, 12 roofers and apprentices, 40 plots on one development, 500 roofs completed). Owner knows we lack real data: use placeholders marked in HANDOFF to replace later. Keep the 4.8 / 440 reviews band where it is (in the reviews section).
About:
- Section 2 ("professional systems behind every roof"): merge the black note block and the "Talk to us" panel into one rectangle (the reference has them colliding; ours should be a single shape).
- Stat row under it: 4 items, not 3 (add a 4th).
- New "Meet the director" section (dummy data, image in the reference's context).
- Process section: pictures must match the context, not one picture in every step.
- Add "Recent work" and "Accreditations" (3 licence-style badges, dummy) sections.
Services page: hero and cards need matching images; add Accreditations.
Areas page: hero = the liked image (already areas-dublin-rooftops); other pictures replaced.
Reviews page: add "Recent work" after "What our customers say".
Contact page: keep hero picture context; map only here; the other pages show pictures not maps.
Roofing advice: fine (no picture in the reference, keep none).
"Let's talk" band on all pages: include the email.

## Part C: images (the biggest part)
1. Read every reference image (`public/sites/amroofing/`, `docs/design-references/amroofing/`) and write an image brief per slot: subject, angle, lighting, crop, where used.
2. Client Google photos (`Irish_Roofers_Dublin,_Roofing_Repairs_-_Google_Maps/`, 123 jpegs) were checked: all are tiny thumbnails (195-224 px wide, 139-358 px tall, 7-36 KB). Too small for any banner or card (need >= 1024 px). Use them only as REFERENCE for the look of real jobs, and recreate with the model in high quality. Content found: real Irish Roofers vans (white, black and green livery), scaffolding with the company banner on Dublin red-brick terraces, slate and tile roofs, torch-on flat roofs (many commercial), skylights, workers in hi-vis, gutter and parapet detail, one aerial of a flat roof with sea view. Best real-job references: 10003, 10006, 10013, 10018, 10024, 10037, 10061, 10068, 10101, 10079, 10092, 10114, 10115, 10119, 10123 (roof work); vans: 10007, 10015, 10025, 10112, 10116; scaffold terraces: 10031, 10033, 10044, 10062, 10082.
3. Real vans carry the logo; AI cannot draw lettering reliably, so AI images use no van or a plain blank one far in the background.
4. Generate with Hugging Face FLUX first, Cloudflare Phoenix as fallback; contact-sheet every image; drop anything with distortion.

## Open questions for the owner
- Email address of the client (and any second phone)?
- Accreditations, licences, insurance, years trading, number of roofers? (Dummy placeholders are used until answered.)
- Is the logo a file you can drop in, or should the wordmark stay?
- Director's name and short bio (dummy until supplied)?

## Owner answers (2026-11-20)
- Email: info@irishroofers.ie (use everywhere, mailto + funnel hand-off). Remove "left empty on purpose" in site.ts / llms / schema.
- Offices (old site): Northside Tel 01 291 0944, Mob 087 405 5235, Fax 01 291 0944. Southside Tel 01 291 0944, Mob 086 0508558 (our main number), Fax 01-2910195. Our listed address stays Dublin 14 (southside). Confirm whether to show the Northside office.
- Director: Patrick (surname and bio still dummy).
- Logo: `client/assets/logo-irish-roofers-source.png` (black text, white outline, green glow, transparent). Needs a version for dark and light backgrounds.
- Partners strip (client assets/partners-logos.png): IKO, Campion Insurance, Cedral, Trustedpeople.ie, Blue Bangor Slate Company, RCCA, CIF (Construction Industry Federation), MOY, Proseo. Use for Accreditations. These are third-party marks: confirm with the client they may display them.
- Real claim supplied: "Irish Roofers are long term members of the CIF and RCCA." (cif-rcca-text.png). Years trading / team size / roofs completed still unknown (dummy stats).

## Progress
- **Part A DONE (2026-11-20):** colours (#3ef43e / #10161d, `site.brand.accentText` #0b7a1b for text on white), icons regenerated; burger menu fixed (backdrop-filter on the header made it the containing block of the fixed menu; blur now on `.nx-header::before`; panel full width under 1000px); pages open at the top (removed `scroll-behavior: smooth` from html; hash/to-top still smooth in JS); menu closes on link click; all "Get a free quote" buttons go to `/contact/#enquiry` and scroll to the funnel when it is on the page; email info@irishroofers.ie live (contact, footer, Let's talk, schema); both offices in `site.business.offices` shown on contact and footer (Northside street address unknown); funnel progress line is one green tone. Checks: lint, tsc, build, 67 pages x2 viewports 0 problems, flows pass, Lighthouse accessibility 100 (home, contact, service).
- NEXT: Part B (sections), then Part C (images), then step 10.
- **Part B DONE (2026-11-20):** home order now: hero, trust, Who we work with (4 audiences), process, Recent work (4 dummy cases), services, standard, reviews + rating stats, Accreditations (9 partner logos + CIF/RCCA line + chips), credential stats (20/12/40/500 dummy), areas, quote, FAQ, advice, CTA. About: merged quote + Talk-to-us card, 4th stat (40 areas), Meet the director (Patrick, dummy bio), Recent work, Accreditations. Services page: accreditations + credential stats. Reviews page: Recent work. Client logo in header/footer. Data in `src/config/content/sections.ts` (DUMMY items marked); components in `blocks3.tsx`; logos prepared by `scripts/prepare-client-assets.js`. Temporary images reuse the old AI files until Part C. Checks: lint, tsc, build, 67 pages x2 viewports 0 problems.
- NEXT: Part C (images), then step 10.
- **Part C IN PROGRESS (2026-11-20), BLOCKED on image quota:** reference images reviewed, brief in `client/IMAGE-BRIEF.md` (25 new images + 3 kept). `scripts/gen-all.js` now holds the 25 prompts (Phoenix 1.0, `--seed`, portrait director, resumable). First full run stopped immediately: Cloudflare "daily free allocation of 10,000 neurons" used up (resets daily at 00:00 UTC). Hugging Face MCP `invoke` is disabled in this setup (gradio=none header), so HF FLUX could not be used from here. 0 of 25 generated; the site still shows the old images.
- To finish Part C: (1) run `node scripts/gen-all.js` after the reset (repeat after each limit); (2) contact-sheet `images/*.png`, delete bad ones, re-run with `--seed N` for each; (3) `node scripts/optimize-images.js`; (4) wire names in `src/config/site.ts` (`images`: hero, services=services-hero-aerial-dusk, about=about-fleet-yard-golden-hour, process, new keys standard, servicesGrid, ctaHome), `src/config/content/sections.ts` (audiences, recentWork, director), `Home.tsx` Standard uses `site.images.standard`, `blocks2.tsx` ServicesGrid uses `servicesGrid`, home CtaPanel uses `ctaHome`; (5) `npm run check`, 67-page crawl, then step 10.
- **Part C plan changed (2026-11-20):** owner wants Manus (Nano Banana) to make the images. Full prompt: `client/MANUS-IMAGE-PROMPT.md` (49 images: 3 banners, 12 home, 5 about/contact/service-detail, 9 service pages, 12 gallery, 4 before/after pairs). Reference photos picked from the client's Google photos: `client/manus-references/` (+ `.zip`, built by `scripts/pack-manus-references.js`). Reference site inventory showed the reference reuses ~22 images; our slots: hero, services hero, about hero, 4 audiences, home process, about process, about section, services grid, 4 recent work, standard (also inner CTA), home CTA, director, contact side, service-detail "roofers at work", 9 services. Keep: areas, reviews, contact heroes.
- TODO after the zip arrives: check sizes/quality, copy to `images/`, `node scripts/optimize-images.js` (webp/avif, each under 200 KB), wire names, build a new **Gallery page** (`/gallery/`, grid + lightbox) and a **before/after slider** (4 pairs), add Gallery to nav/sitemap/llms, then check + step 10. Background FLUX run (`gen-all.js --wait`) is only a backup.
