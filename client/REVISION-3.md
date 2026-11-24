# Revision round 3 (owner feedback, 21 Nov 2026)

Resume rule: one step at a time, short report, wait for "go". Images are a separate later job (APIPass Nano Banana Pro, needs credit).

## Audit of the old site (client/*.html is one page; the HAR holds only its images)
Missed or wrong on the new site:
1. **Guarantee:** old site says "full written 30 year guarantee on all new roofs" plus 5 years on repairs. New site only says 5 years.
2. **Family business:** "built our family business around our reputation". Owner now says third-generation family owned, established 1971, 55+ years (main office), 45+ (the other two).
3. **Offices:** old page lists four office locations: Rathfarnham, Stoneybatter, Clontarf, Drumcondra (new site has two). Google has three profiles:
   - Main: Nutgrove Office Park, E2, Meadow Park Ave, Dublin 14, D14 W2Y4. 4.8 (440). 55+ years.
   - Clontarf: 57 Clontarf Rd, Clontarf West, Dublin 3, D03 A7P0 (Sky Business Centres). 4.7 (101). +353 1 291 0944. Plus code 9Q7J+3P. 45+ years.
   - Stoneybatter: 1A Mount Temple Rd, Stoneybatter, Dublin, D07 F898. Rating and count not given. 45+ years. (Old site said D07 R7YC and 1 Mount Temple Rd; Google is newer, use D07 F898.)
4. **Fax:** old site lists Fax 01 291 0944 (north) and 01-2910195 (south). Not on new site. Probably leave out; confirm.
5. **Manager name:** "Pat, the manager" (matches Patrick).
6. **Old-site sections not on new site:** video ("Watch our video"), Testimonials page, Blog (new site has advice), "Galleries" (now built), FAQ prices (EUR 300-1000 repair, from EUR 150 small repair), asphalt = cheapest roof, 3-step process (done).
7. **Social links:** none in the old site. Need from the client.
8. **Real Google reviews** pasted (Bryan Murphy, Julian Ashe, Marcus Dunbar, E Klein, Sheila Scott, Roisin Hughes, Niamh Cooney, plus an unnamed Stoneybatter review). Can replace the review set.
9. Owner post on Google: full new roof with Tegral slates (candidate for a service/blog item).

## New requests
- A. Homepage badge: replace Google-review badge with "Third generation family owned" (headline) and "Established 1971" (line). Show "55+ years" prominently in a few places.
- B. Contact page: section with all 3 locations, Google rating, address, phones, hours, directions.
- C. Language toggle EN / GA (Irish) in navbar next to the call button; translate the whole site.
- D. "Our Roofing Supplies Store" section (The Roofing Shop, theroofingshop.ie, UNIT 4 Glasnevin Business Centre, Ballyboggan Road, Dublin 11, D11 X863; logo: client/assets, to be saved) above the quote section on Home, About, Contact and the other main pages, NOT on Services pages.
- E. Fonts: Archivo (wide/expanded) for headings, Archivo Light for paragraphs.

## Open questions for the owner
- Social profile URLs (Facebook, Instagram, LinkedIn, YouTube, TikTok).
- Stoneybatter rating and review count, and opening hours for Clontarf/Stoneybatter (Clontarf shows "Opens 9 AM Mon").
- Is the 30-year guarantee still offered?
- Irish translation: machine-quality draft, needs a native speaker review before launch.

## Owner answers (21 Nov, later) and progress
Answers: 30-year guarantee only on Services pages; location phone numbers only in the Contact locations section; add badge + store section; DO NOT change fonts; yes to EN/GA toggle; reviews: only the Dublin 3 (Clontarf) reviews shown, in the Clontarf card, none for other locations, main keeps its real Dublin reviews; social URLs from the old site are correct (Facebook irish.roofers, X IrishRoofers, YouTube user/irishroofers).

DONE (steps 1 and 2): hero badge "Third generation family owned / Established in 1971"; 55 years stat; foundingDate 1971 in schema; Contact LocationsSection (3 cards, ratings, numbers, 55+/45+ years); Guarantee30 band on Services index and service pages; RoofingStore section (logo public/sites/irishroofers/images/roofing-shop-logo.png) above the Let's talk panel on every page except Services, and on Contact; footer social icons (Facebook, X, YouTube); office numbers removed from footer and contact side card. Code: src/components/sites/amroofing/blocks4.tsx.
NEXT: step 4, EN/GA language toggle and Irish translation. Font change cancelled. Images later (APIPass credit).

## Step 4 DONE: EN / GA language switch (22 Nov 2026)
How it works (no component rewrite): public/sites/irishroofers/i18n/translate.js swaps visible English text for Irish from i18n/ga.json (1,922 entries, covers every string on all 68 pages), after hydration. Choice saved in localStorage "ir-lang". EN/GA pill in the header (src/components/sites/amroofing/LangToggle.tsx), nav shows shorter Irish labels via data-ga (SiteHeaderMarkup.tsx). Burger menu now starts at 1279px so Irish labels fit.
Limits: Google indexes the English text only (swap happens in the browser). Text is matched exactly, so NEW or EDITED English copy shows in English until added to ga.json. Irish is a careful draft, needs a native speaker review (legal pages especially).
Rebuild the dictionary after copy changes: crawl pages with irI18n.collect(), translate the new strings, merge into ga.json (scratchpad scripts texts2.js, order.js, merge.js are not in the repo).
Also done: marquee under the numbers section (black, green text, ✦).

## Round 4 DONE (22 Nov 2026): layout changes from the owner's walkthrough
Home: Google review card moved under the hero buttons (left); right side is now a tall "Third generation family owned / Established in 1971" panel with two short paragraphs (test layout, owner may change); trust strip now 24 hours / CIF and RCCA members / 5-year / 20+ years; Services and Process swapped; Process rebuilt as a connected 5-step timeline (animated line, hover); reviews heading "Trusted by developers, main contractors and homeowners across Dublin"; rating numbers under reviews removed; credential numbers 20+ and 500+; roofing store: copy top-left, logo top-right.
Services: numbers section removed; gallery grid + before/after moved here under Process. Gallery page deleted (nav, sitemap, llms.txt too). Areas page: Our services replaced by Process. Reviews page: button "See our Google reviews". Advice: Read more expands in place (src/config/content/adviceMore.ts), no new pages.
Contact: privacy note beside Continue; map removed from the side column; office cards redesigned with photos (PLACEHOLDER photos from the site set: replace with real office photos), Google logo + stars, icons, Open 24 hours pill, directions button (UI/UX Pro Max rules: 44px targets, focus rings, reduced motion); new "Locate our offices" section with 3 buttons that move the map (src/components/sites/amroofing/OfficeMap.tsx). Nav hover: underline only.
Irish dictionary extended (ga.json 1,973 entries). New or edited English copy needs new ga.json entries.
Owner said Process had four steps but listed five: built five.
