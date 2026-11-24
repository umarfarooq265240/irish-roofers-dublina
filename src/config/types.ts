/** Shapes for everything in site.ts. A new roofer = new values, nothing else. */

export type Faq = { q: string; a: string };

export type ImageRef = {
  /** Public path, e.g. /sites/irishroofers/images/slate-roof-repair-dublin-14.webp */
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Service = {
  slug: string;
  title: string;
  /** Short label for nav, tiles and footer. */
  label: string;
  /** One-sentence card summary. */
  summary: string;
  heroSub: string;
  /** 40-60 word direct answer that AI engines and answer boxes can quote. */
  answer: string;
  /** "What the job includes". */
  includes: string[];
  whyHeading: string;
  why: string;
  /** Three "How we do it" cards. */
  approach: { title: string; body: string }[];
  faqs: Faq[];
  /** Guide price shown on the page and in the costs table, e.g. "from €250". */
  priceFrom: string;
  image: ImageRef;
  keywords: string[];
  related: string[];
};

export type Area = {
  slug: string;
  name: string;
  /** Postal district or town label, e.g. "Dublin 14". */
  district: string;
  /** Eircode routing key, e.g. "D14". */
  routingKey: string;
  /** Unique local paragraph: housing stock and what it means for roofs. */
  housing: string;
  /** Unique local paragraph: landmarks, exposure, typical problems. */
  local: string;
  landmarks: string[];
  /** Slugs of nearby areas. */
  nearby: string[];
  /** One locally specific FAQ. */
  localFaq: Faq;
};

export type Review = {
  author: string;
  text: string;
  /** Google's relative date when captured, e.g. "a month ago". */
  when: string;
  rating: 5;
  topic: string;
};

export type ProseBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ticks"; items: { lead?: string; text: string }[] }
  | { type: "table"; head: string[]; rows: string[][]; note?: string }
  | { type: "note"; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date. */
  published: string;
  updated: string;
  body: ProseBlock[];
  faqs: Faq[];
};

export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  body: ProseBlock[];
};

export type NavItem = { label: string; href: string };
