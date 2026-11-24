import { absoluteUrl, areas, fullAddress, reviews, site } from "@/config/site";
import type { Article, Faq, Review, Service } from "@/config/types";

/**
 * JSON-LD builders. Everything is derived from site.ts; nothing is hard-coded per client.
 * Only facts that are real and visible on the pages are emitted (rating, reviews, FAQs).
 */

type Json = Record<string, unknown>;

const b = site.business;
export const BUSINESS_ID = absoluteUrl("/#business");
export const WEBSITE_ID = absoluteUrl("/#website");

const sameAs = () => [b.gbpUrl, ...Object.values(b.social)].filter(Boolean);

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** RoofingContractor (LocalBusiness subtype). Emitted on every page. */
export function businessSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": BUSINESS_ID,
    name: b.name,
    legalName: b.legalName,
    description: b.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.png"),
    image: [absoluteUrl(site.images.hero.src), absoluteUrl(site.images.about.src)],
    telephone: b.phone.tel,
    ...(b.email ? { email: b.email } : {}),
    priceRange: b.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.line1,
      addressLocality: b.address.locality,
      addressRegion: b.address.region,
      postalCode: b.address.eircode,
      addressCountry: b.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng },
    hasMap: b.gbpUrl,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: DAYS, opens: b.hours.opens, closes: b.hours.closes },
    ],
    areaServed: areas.map((a) => ({ "@type": "City", name: a.name, containedInPlace: { "@type": "AdministrativeArea", name: "Dublin" } })),
    aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating.value, reviewCount: b.rating.count, bestRating: 5, worstRating: 1 },
    sameAs: sameAs(),
    foundingDate: String(b.established),
  };
}

/** WebSite + Organization. Home page only. */
export function websiteSchema(): Json[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: absoluteUrl("/"),
      name: b.name,
      inLanguage: site.seo.locale,
      publisher: { "@id": BUSINESS_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: b.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/icon.png"),
      telephone: b.phone.tel,
      address: { "@type": "PostalAddress", streetAddress: b.address.line1, addressLocality: b.address.locality, postalCode: b.address.eircode, addressCountry: b.address.country },
      sameAs: sameAs(),
    },
  ];
}

export function faqSchema(faqs: readonly Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(crumbs: { label: string; href?: string }[]): Json {
  const items = [{ label: "Home", href: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };
}

export function serviceSchema(s: Service): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${s.slug}/#service`),
    name: `${s.title} in Dublin`,
    serviceType: s.title,
    description: s.answer,
    url: absoluteUrl(`/services/${s.slug}/`),
    image: absoluteUrl(s.image.src),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Dublin, Ireland" },
  };
}

export function articleSchema(a: Article): Json {
  const url = absoluteUrl(`/roofing-advice/${a.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(site.images.advice.src),
    datePublished: a.published,
    dateModified: a.updated,
    inLanguage: site.seo.locale,
    author: { "@type": "Organization", name: b.name, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: b.name, logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") } },
  };
}

/** Review items, only for the reviews actually shown on the page. */
export function reviewsSchema(list: readonly Review[] = reviews): Json[] {
  return list.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@id": BUSINESS_ID },
    author: { "@type": "Person", name: r.author },
    reviewBody: r.text,
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
    publisher: { "@type": "Organization", name: "Google" },
  }));
}

/** Unused helper kept for NAP checks in tests/audits. */
export const napString = `${b.name}, ${fullAddress}, ${b.phone.display}`;
