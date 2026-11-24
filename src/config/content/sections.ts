import type { ImageRef } from "../types";

/**
 * Content for the sections added in revision round 2.
 * Everything marked DUMMY is placeholder data for the demo: replace it before launch (see client/REVISION-2.md).
 */
const IMG = "/sites/irishroofers/images";
const img = (file: string, alt: string, width = 1024, height = 576): ImageRef => ({ src: `${IMG}/${file}.webp`, alt, width, height });

/** "Who we work with": the four audiences from the reference site, written for Irish Roofers. */
export const audiences = [
  {
    title: "Homeowners",
    text: "Repairs and re-roofs on your own home, inspected and quoted properly, with one person to speak to from first call to the last tile.",
    image: img("audience-homeowners-detached-house", "Detached red-brick house in Dublin with a clay tiled roof"),
  },
  {
    title: "Developers and new build",
    text: "Roofing packages for new homes and small schemes, priced from the drawings and delivered to your programme, plot after plot.",
    image: img("audience-developers-new-build-site", "New build housing site with fresh tiled roofs and scaffolding"),
  },
  {
    title: "Main contractors",
    text: "Roofing subcontract work with the paperwork, safe access and site discipline a principal contractor expects.",
    image: img("audience-main-contractors-flat-roof", "Large flat roof with a new membrane and skylights"),
  },
  {
    title: "Commercial and managed property",
    text: "Planned and emergency roof work for landlords, managing agents and businesses, from flat roofs to lead and slate.",
    image: img("audience-commercial-building-roof", "Commercial building with scaffold and a new tiled roof section"),
  },
];

/** DUMMY "Recent work" cases. Swap the image, title and tags for real jobs later. */
export const recentWork = [
  { title: "Clay tile re-roof with gable window", tags: ["Clay tiles", "Re-roof"], image: img("recent-work-1-gable-window-clay-tile", "Chalet-style house with a clay tiled roof and gable window") },
  { title: "New build roof with bi-fold doors", tags: ["New build", "Tiled roofing"], image: img("recent-work-2-new-build-rear-bifold", "New brick house with a tiled roof and bi-fold doors") },
  { title: "Apartment block slate roof and rooflights", tags: ["Slate roofing", "Rooflights"], image: img("recent-work-3-apartment-slate-rooflights", "Apartment building with a slate roof and rooflights") },
  { title: "Victorian terrace re-roofed in slate", tags: ["Slate roofing", "Terraced houses"], image: img("recent-work-4-victorian-terrace-reroofed", "Victorian terrace in Dublin with newly re-roofed slate roofs") },
];

/** Partner and supplier logos supplied by the client (third-party marks: client confirmed they may be shown). */
const P = `${IMG}/partners`;
export const partners = [
  { name: "IKO", src: `${P}/iko.png`, width: 215, height: 80 },
  { name: "Campion Insurance", src: `${P}/campion-insurance.png`, width: 236, height: 66 },
  { name: "Cedral", src: `${P}/cedral.png`, width: 245, height: 43 },
  { name: "Trustedpeople.ie", src: `${P}/trustedpeople.png`, width: 231, height: 39 },
  { name: "Blue Bangor Slate Company", src: `${P}/blue-bangor-slate.png`, width: 245, height: 77 },
  { name: "RCCA", src: `${P}/rcca.png`, width: 219, height: 97 },
  { name: "Construction Industry Federation", src: `${P}/cif.png`, width: 104, height: 106 },
  { name: "MOY", src: `${P}/moy.png`, width: 110, height: 100 },
  { name: "Proseo", src: `${P}/proseo.png`, width: 166, height: 70 },
];

/** Real statement from the client's previous site. */
export const membership = "Irish Roofers are long term members of the Construction Industry Federation (CIF) and the RCCA.";

/** DUMMY credentials chips shown under the logos. */
export const credentialChips = ["Fully insured", "Qualified roofers", "Safe access equipment"];

/** DUMMY "in numbers" card (the reference shows 20 / 12 / 40 / 500). Replace with the client's real figures. */
export const credentialStats = [
  { count: "20+", label: "years in the trade, family owned since 1971" },
  { count: "12", label: "roofers and apprentices on the books" },
  { count: "40", label: "roofs delivered on a single development" },
  { count: "500+", label: "roofs completed across Dublin" },
];

/** DUMMY director bio. The first name is real (Patrick); surname, role wording and bio are placeholders. */
export const director = {
  name: "Patrick",
  role: "Director, Irish Roofers Dublin",
  paragraphs: [
    "Patrick has spent his career on Dublin roofs, starting on the tools and building Irish Roofers into the contractor that homeowners, landlords and builders call when a roof has to be done right.",
    "He still looks at most jobs himself, which is why quotes come with a clear explanation rather than just a number, and why the person who priced your roof is the one you speak to while it is being repaired.",
  ],
  quote: "We would rather tell you the truth about your roof than sell you a bigger job than it needs.",
  image: img("director-patrick-portrait", "Patrick, director of Irish Roofers Dublin", 576, 1024),
};

/** About page: four-up numbers row (reference has four). */
export const aboutStatsExtra = { count: "40", label: "areas covered across south, west, north and coastal Dublin" };
