/**
 * One config file = one roofing website.
 * To reuse this template for another roofer, edit this file (and the content files it imports),
 * then replace the images in public/sites/<site>/. Nothing else needs to change.
 * Anything marked TODO is a fact the client has not supplied yet.
 */
import { areas } from "./content/areas";
import { articles } from "./content/advice";
import { legalPages } from "./content/legal";
import { reviews } from "./content/reviews";
import { services } from "./content/services";
import type { NavItem, ProseBlock } from "./types";

export { areas, articles, legalPages, reviews, services };

const phoneLocal = "086 050 8558";

export const site = {
  /** Folder name under public/sites/ that holds this client's images. */
  assetDir: "irishroofers",

  business: {
    name: "Irish Roofers Dublin",
    shortName: "Irish Roofers",
    legalName: "Irish Roofers Dublin", // TODO(client): registered company name and number, if any
    description: "Roofing contractor in Dublin 14: roof repairs, leaks, slate, tiles, flat roofs, chimneys and skylights.",
    phone: { display: phoneLocal, tel: "+353860508558", local: phoneLocal },
    email: "info@irishroofers.ie",
    /** Family firm facts shown in the badge and the locations section. */
    established: 1971,
    /** The three Google Business Profiles. Location phone numbers are shown ONLY in the Contact page locations section. */
    locations: [
      {
        key: "dublin-14",
        name: "Dublin 14 (main office)",
        address: ["Nutgrove Office Park, E2, Meadow Park Ave", "Dublin 14, D14 W2Y4"],
        tel: "01 291 0944",
        mob: "086 050 8558" as string | undefined,
        rating: { value: 4.8, count: 440 } as { value: number; count: number } | undefined,
        years: "55+",
        hours: "Open 24 hours",
        mapUrl: "https://www.google.com/maps/place/Irish+Roofers+Dublin,+Roofing+Repairs/@53.2914577,-6.2603759,17z",
      },
      {
        key: "clontarf",
        name: "Clontarf, Dublin 3",
        address: ["57 Clontarf Rd, Clontarf West", "Dublin 3, D03 A7P0"],
        tel: "01 291 0944",
        mob: undefined as string | undefined,
        rating: { value: 4.7, count: 101 } as { value: number; count: number } | undefined,
        years: "45+",
        hours: "",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Irish+Roofers+57+Clontarf+Rd+Dublin+3+D03+A7P0",
      },
      {
        key: "stoneybatter",
        name: "Stoneybatter, Dublin 7",
        address: ["1A Mount Temple Rd, Stoneybatter", "Dublin, D07 F898"],
        tel: "01 291 0944",
        mob: "087 405 5235" as string | undefined,
        rating: undefined as { value: number; count: number } | undefined,
        years: "45+",
        hours: "",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Irish+Roofers+1A+Mount+Temple+Rd+Stoneybatter+Dublin+D07+F898",
      },
    ],
    address: {
      line1: "Nutgrove Office Park, E2, Meadow Park Ave",
      locality: "Dublin 14",
      region: "Dublin",
      eircode: "D14 W2Y4",
      country: "IE",
      countryName: "Ireland",
    },
    geo: { lat: 53.2914577, lng: -6.2603759 },
    plusCode: "7PRQ+HR Dublin 14",
    hours: { text: "Open 24 hours", opens: "00:00", closes: "23:59" },
    rating: { value: 4.8, count: 440 },
    priceRange: "€€",
    guaranteeYears: 10,
    gbpUrl: "https://www.google.com/maps/place/Irish+Roofers+Dublin,+Roofing+Repairs/@53.2914577,-6.2603759,17z",
    /** Profiles taken from the client's previous site (confirmed working by the owner). Empty entries are not shown. */
    social: { facebook: "https://www.facebook.com/irish.roofers", twitter: "https://twitter.com/IrishRoofers", youtube: "https://www.youtube.com/user/irishroofers", instagram: "", linkedin: "", tiktok: "" },
    /** TODO(client): real accreditations, insurance, awards and years trading. Nothing is claimed until supplied. */
    accreditations: [] as { name: string; ref?: string; url?: string }[],
    yearsTrading: null as number | null,
    team: [] as string[],
  },

  seo: {
    /** TODO(client): confirm the live domain. Used for canonical URLs, sitemap and schema. */
    url: "https://irishroofers.ie",
    locale: "en-IE",
    titleSuffix: "Irish Roofers Dublin",
    defaultTitle: "Roofers Dublin 14 | Roof Repairs | Irish Roofers Dublin",
    defaultDescription:
      "Roofers in Dublin 14: leaking roofs, slate, tiles, flat roofs, chimneys and skylights. 10-year guarantee, open 24 hours. Call 086 050 8558.",
    ogImage: "/sites/irishroofers/og/hero-dublin-new-build-aerial-dusk.jpg",
  },

  /** Brand colours. The accent is injected as CSS variables in the root layout. TODO(client): match the client logo. */
  brand: {
    accent: "#3ef43e",
    accentRgb: "62,244,62",
    accentInk: "#10161d",
    /** Darker green for text on white backgrounds (the neon accent fails contrast there). */
    accentText: "#0b7a1b",
  },

  images: {
    hero: { src: "/sites/irishroofers/images/hero-dublin-new-build-aerial-dusk.webp", alt: "Aerial view of new red-brick houses with slate roofs at sunset on the edge of Dublin", width: 1024, height: 576 },
    services: { src: "/sites/irishroofers/images/services-hero-aerial-dusk.webp", alt: "Row of new houses with tiled roofs along a lane at dusk near Dublin", width: 1024, height: 576 },
    about: { src: "/sites/irishroofers/images/about-fleet-yard-golden-hour.webp", alt: "Irish Roofers Dublin work vans parked in a yard in golden evening light", width: 1024, height: 576 },
    contact: { src: "/sites/irishroofers/images/contact-roofers-dublin-14.webp", alt: "Aerial view of a slate roof with chimney and rooflights in Dublin 14", width: 1024, height: 576 },
    areas: { src: "/sites/irishroofers/images/areas-dublin-rooftops.webp", alt: "Rooftops of semi-detached houses across south Dublin", width: 1024, height: 576 },
    costs: { src: "/sites/irishroofers/images/roofing-costs-dublin-quote.webp", alt: "Red-brick house with a new tiled roof as scaffold comes down, Dublin", width: 1024, height: 576 },
    advice: { src: "/sites/irishroofers/images/roofing-advice-dublin.webp", alt: "Weathered concrete roof tiles with moss beside a gutter", width: 1024, height: 576 },
    reviews: { src: "/sites/irishroofers/images/reviews-roofers-dublin.webp", alt: "Neat semi-detached house with a freshly re-tiled roof in Dublin", width: 1024, height: 576 },
    process: { src: "/sites/irishroofers/images/process-terrace-slate-roofs-aerial.webp", alt: "Aerial view of a terrace of new houses with slate roofs and block paving", width: 1024, height: 576 },
    standard: { src: "/sites/irishroofers/images/standard-large-house-dusk-wide.webp", alt: "Large detached house with a slate roof and outbuilding at dusk", width: 1024, height: 576 },
    servicesGrid: { src: "/sites/irishroofers/images/services-aerial-roof-rooflight.webp", alt: "Aerial view of a clay tiled roof with a rooflight and chimney", width: 1024, height: 576 },
    ctaHome: { src: "/sites/irishroofers/images/cta-house-block-paving-driveway.webp", alt: "Finished red-brick house with a tiled roof and block-paved driveway", width: 1024, height: 576 },
    aboutSection: { src: "/sites/irishroofers/images/about-section-aerial-new-slate-roof.webp", alt: "Aerial view of a house with a freshly laid slate roof", width: 1024, height: 576 },
    processAbout: { src: "/sites/irishroofers/images/process-about-scaffold-terrace-aerial.webp", alt: "Aerial view of a terrace roof being replaced under scaffold", width: 1024, height: 576 },
    contactSide: { src: "/sites/irishroofers/images/contact-side-aerial-terrace.webp", alt: "Aerial view of a new terrace with slate roofs and rooflights", width: 1024, height: 576 },
    roofersAtWork: { src: "/sites/irishroofers/images/service-detail-roofers-at-work.webp", alt: "Roofers working on a slate roof with ladder access", width: 1024, height: 576 },
    cta: { src: "/sites/irishroofers/images/standard-large-house-dusk-wide.webp", alt: "Large house with a slate roof and warm lit windows at dusk", width: 1024, height: 576 },
  },

  nav: [
    { label: "About us", href: "/about/" },
    { label: "Services", href: "/services/" },
    { label: "Areas we cover", href: "/areas-we-cover/" },
    { label: "Reviews", href: "/reviews/" },
    { label: "Gallery", href: "/gallery/" },
    { label: "Roofing advice", href: "/roofing-advice/" },
    { label: "Contact", href: "/contact/" },
  ] satisfies NavItem[],

  legalNav: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Cookie Policy", href: "/cookie-policy/" },
    { label: "Terms and Conditions", href: "/terms-and-conditions/" },
    { label: "Accessibility Statement", href: "/accessibility-statement/" },
  ] satisfies NavItem[],

  /** Four trust points shown under every page hero. Only real, supplied facts. */
  trust: [
    { icon: "clock", strong: "24 hours", text: "Open day and night" },
    { icon: "star", strong: "CIF and RCCA", text: "Construction Industry Federation members" },
    { icon: "shield", strong: "10+ years", text: "Workmanship guarantee" },
    { icon: "quote", strong: "20+ years", text: "Industry experience" },
  ],

  /** Home page copy. */
  home: {
    heroTitle: "Roofers in Dublin 14 and across Dublin",
    heroSub:
      "Roof repairs, leak detection, slate and tiled roofs, flat roofs, chimneys and skylights. Open 24 hours, with a 10-year guarantee and fair quotes with no hard sell.",
    whatWeFix: [
      { title: "Slate roofs", text: "Slipped, cracked and missing slates replaced and flashings renewed on period and modern slate roofs.", href: "/services/slate-roof-repair/" },
      { title: "Tiled roofs", text: "New concrete and clay tile roofs, replacements, tile repairs and ridge repointing.", href: "/services/tiled-roofing/" },
      { title: "Flat roofs", text: "Leaking extensions, garages and porches repaired or re-covered, with skylights fitted watertight.", href: "/services/flat-roof-repair/" },
      { title: "Chimneys and leaks", text: "Leak detection, chimney flashing and flaunching, with temporary waterproofing when it cannot wait.", href: "/services/leaking-roof-repair/" },
    ],
    standard: [
      { title: "10-year guarantee", text: "Our work is guaranteed for 10 years." },
      { title: "Fair quotes", text: "Competitive, clear and with no hard sell." },
      { title: "Fast response", text: "Quick to inspect, quick to quote, quick to finish." },
      { title: "Safe access", text: "Cherry picker access for safer repairs." },
      { title: "Friendly team", text: "On time, courteous and tidy, as customers say." },
    ],
    faqs: [
      { q: "How much does a roof repair cost in Dublin?", a: "Small repairs usually start from around €180 to €350 depending on the job, such as a leak, ridge tiles or a chimney. We give a fair written quote after a free inspection, with no hard sell." },
      { q: "Do you offer emergency roof repairs in Dublin 14?", a: "Yes. We are open 24 hours on 086 050 8558 and can arrange temporary waterproofing for an active leak, followed by a permanent repair a few days later." },
      { q: "Is there a guarantee on your work?", a: "Yes. Our work carries a 10-year guarantee." },
      { q: "Which areas of Dublin do you cover?", a: "We are based in Dublin 14 and cover south, west, north and coastal Dublin, including Rathfarnham, Dundrum, Terenure, Blackrock, Tallaght, Swords and Howth." },
      { q: "How long does a flat roof last in Ireland?", a: "A well-fitted flat roof typically lasts 15 to 25 years depending on the material. Regular checks and clear outlets help it last." },
      { q: "Do you give free quotes?", a: "Yes. Our inspection and quote are free for homeowners in the Dublin area." },
    ],
  },

  process: [
    { title: "Call or message", text: "Tell us what is happening. We are open 24 hours and prioritise active leaks." },
    { title: "Inspection", text: "We inspect the roof, take photographs and explain what we find in plain language." },
    { title: "Fair quote", text: "You get a competitive quote with no hard sell. There is no obligation." },
    { title: "The repair", text: "If water is coming in we can waterproof temporarily first, then repair properly a few days later." },
    { title: "Guarantee", text: "We leave the site clean and tidy, and our work carries a 10-year guarantee." },
  ],

  /** How areas are grouped on the areas pages and the footer. */
  areaGroups: [
    { name: "South Dublin", slugs: ["dublin-14", "rathfarnham", "churchtown", "dundrum", "ballinteer", "terenure", "templeogue", "knocklyon", "firhouse", "tallaght", "ballyboden", "kimmage"] },
    { name: "Dublin city south", slugs: ["rathgar", "ranelagh", "milltown", "clonskeagh", "harolds-cross", "rathmines", "donnybrook", "ballsbridge"] },
    { name: "South-east and coast", slugs: ["stillorgan", "sandyford", "foxrock", "blackrock", "booterstown", "dun-laoghaire", "dalkey", "killiney", "cabinteely", "leopardstown"] },
    { name: "North Dublin", slugs: ["swords", "malahide", "howth", "clontarf", "drumcondra", "glasnevin"] },
    { name: "West Dublin", slugs: ["lucan", "clondalkin", "castleknock", "blanchardstown"] },
  ],
  /** Areas featured in the footer and as top links on service pages. */
  topAreaSlugs: ["dublin-14", "rathfarnham", "dundrum", "terenure", "blackrock", "tallaght", "stillorgan", "swords"],

  /** Quote funnel: step 3 options. */
  funnel: {
    enquiryTypes: ["A leak or damage", "Repair or maintenance", "New roof or replacement", "Not sure, need advice"],
  },

  about: {
    answer:
      "Irish Roofers Dublin is a roofing contractor based at Nutgrove Office Park in Dublin 14, open 24 hours. We repair and replace slate, tiled and flat roofs, fix leaks and chimneys, fit skylights, and give a 10-year guarantee. We are rated 4.8 from 440 Google reviews.",
    blocks: [
      { type: "h2", text: "A roofing contractor customers describe as friendly and fair" },
      { type: "p", text: "Reviewers mention the same things again and again: we arrive on time, we price fairly with no hard sell, we explain the problem in plain language, and we leave the house clean and tidy." },
      { type: "p", text: "Alan and Pat are named in customer reviews for explaining the work clearly and organising urgent repairs." },
      { type: "h2", text: "What we do" },
      { type: "ticks", items: [
        { lead: "Repairs.", text: "Slate, tile, flat roof, ridge, chimney and leak repairs." },
        { lead: "Replacements.", text: "New tiled roofs in concrete and clay tile." },
        { lead: "Skylights.", text: "Skylight and roof window installation, fitted watertight." },
        { lead: "Emergencies.", text: "Open 24 hours with temporary waterproofing available." },
      ] },
      { type: "h2", text: "How we work" },
      { type: "p", text: "We inspect first, tell you what is urgent and what can wait, and quote fairly. Where we can use a cherry picker for safer access, we do. Our work carries a 10-year guarantee." },
      { type: "h2", text: "Qualification and safety" },
      { type: "p", text: "We are fully registered C2 roofing contractors with Employer and Public Liability Insurance of 12 million, for the safety of our clients. Our policy is with Keystone Insurance, who can confirm the policy number on request. Our crews are fully qualified and uniformed, and we are members of the Guild of Master Craftsmen." },
      { type: "h2", text: "Our promise" },
      { type: "p", text: "Every repair carries a 10-year guarantee. We give written fixed-price quotes, leave the site clean, and listen to customer feedback to keep improving." },
    ] satisfies ProseBlock[],
  },

  costs: {
    answer:
      "Roof repairs in Dublin usually start from around €180 to €350, a flat roof repair from around €250, and ridge repointing from around €350. A full re-roof on a typical semi-detached house is often €8,000 to €14,000. These are guide prices only. Call 086 050 8558 for a free quote.",
    // TODO(client): confirm these guide prices reflect the client's real pricing before launch.
    blocks: [
      { type: "h2", text: "Guide prices for common roof repairs in Dublin" },
      { type: "p", text: "Every roof is different, so these prices are guides, shown as the price a job usually starts from. We give a firm written quote after a free inspection." },
      { type: "table", head: ["Job", "Guide price", "What affects it"], rows: [
        ["Leak repair", "from €180", "Access and number of defects"],
        ["Slate or tile repair", "from €250", "Roof height and how many are damaged"],
        ["Flat roof repair", "from €250", "Area and condition of the deck"],
        ["Chimney repair", "from €300", "Flashing, flaunching or repointing"],
        ["Ridge tile repointing", "from €350", "Length of ridge and access"],
        ["Emergency waterproofing", "from €150", "Time of call-out and roof size"],
        ["Skylight installation", "from €900", "Size, roof type and access"],
      ], note: "Guide prices, from. Not a quote. VAT and scaffold may apply to larger jobs." },
      { type: "h2", text: "How much does a new roof cost in Dublin?" },
      { type: "table", head: ["Property", "Concrete tile", "Clay tile or natural slate"], rows: [
        ["Terraced, two bedroom", "from about €6,000", "from about €9,000"],
        ["Semi-detached, three bedroom", "from about €8,000", "from about €11,000"],
        ["Detached, four bedroom", "from about €11,000", "from about €15,000"],
      ], note: "Guide prices, from, including scaffold, felt and battens. Complex roofs cost more." },
      { type: "h2", text: "What changes the price of a roof job?" },
      { type: "ticks", items: [
        { lead: "Access.", text: "A cherry picker or scaffold adds cost but keeps the work safe." },
        { lead: "Size and pitch.", text: "More area and steeper slopes take longer." },
        { lead: "Condition.", text: "Rotten battens or decking found during the work must be fixed." },
        { lead: "Materials.", text: "Concrete tile, clay tile and slate are priced differently." },
      ] },
      { type: "h2", text: "Why we give free quotes" },
      { type: "p", text: "A price range is not a price. The point of publishing these guides is so you can tell whether a quote is fair. Our inspection and quote are free, with no hard sell and no obligation." },
    ] satisfies ProseBlock[],
    faqs: [
      { q: "How much does a roof repair cost in Dublin?", a: "Most repairs start from around €180 to €350 depending on the type of job. We give a firm quote after a free inspection." },
      { q: "How much does a new roof cost in Dublin?", a: "A concrete-tile re-roof on a typical three-bedroom semi usually starts from about €8,000. Clay tile and slate cost more." },
      { q: "Do you charge for quotes?", a: "No. Our inspection and quote are free." },
      { q: "Do your prices include VAT?", a: "Guide prices are indicative. Your written quote will state clearly what is included." },
      { q: "Is there a guarantee?", a: "Yes. Our work carries a 10-year guarantee." },
    ],
  },
};

export type Site = typeof site;

/* ---------- helpers ---------- */

export const phoneHref = `tel:${site.business.phone.tel}`;
export const fullAddress = `${site.business.address.line1}, ${site.business.address.locality}, ${site.business.address.eircode}, ${site.business.address.countryName}`;
/** tel: link for an Irish number written like 01 291 0944 or 087 405 5235. */
export const telLink = (n: string) => `tel:+353${n.replace(/\D/g, "").replace(/^0/, "")}`;
export const hasEmail = site.business.email.length > 0;
export const mailHref = hasEmail ? `mailto:${site.business.email}` : "";

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const legalBySlug = (slug: string) => legalPages.find((p) => p.slug === slug);
export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);

export const absoluteUrl = (path: string) => `${site.seo.url}${path}`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Reviews that are real and shown on the page (used for schema too). */
export const featuredReviews = reviews;

/** Returns the first candidate title that fits in 60 characters, so titles never get cut off in search results. */
export const fitTitle = (candidates: string[]) => candidates.find((t) => t.length <= 60) ?? candidates[candidates.length - 1];
