import { absoluteUrl, areas, articles, fullAddress, legalPages, services, site } from "@/config/site";

export const dynamic = "force-static";

/** llms.txt: a plain-text summary for AI crawlers. Generated from site.ts so it never drifts from the pages. */
export function GET() {
  const b = site.business;
  const lines: string[] = [
    `# ${b.name}`,
    "",
    `> ${b.description} Based in ${b.address.locality}, serving Dublin. ${b.hours.text}. ${b.guaranteeYears}-year guarantee on our work. Rated ${b.rating.value} out of 5 from ${b.rating.count} Google reviews.`,
    "",
    "## Business facts",
    `- Name: ${b.name}`,
    `- Address: ${fullAddress}`,
    `- Phone: ${b.phone.display} (${b.phone.tel})`,
    ...(b.email ? [`- Email: ${b.email}`] : []),
    `- Opening hours: ${b.hours.text}`,
    `- Service area: Dublin, Ireland (${areas.length} areas listed below)`,
    `- Guarantee: ${b.guaranteeYears} years on workmanship`,
    `- Google rating: ${b.rating.value} from ${b.rating.count} reviews (${b.gbpUrl})`,
    `- Prices are guide prices in euro and are confirmed after a roof inspection. See ${absoluteUrl("/roofing-costs/")}`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.title} in Dublin](${absoluteUrl(`/services/${s.slug}/`)}): ${s.summary} ${/^from/i.test(s.priceFrom) ? `Guide price ${s.priceFrom}` : `Price: ${s.priceFrom}`}.`),
    "",
    "## Areas we cover",
    ...areas.map((a) => `- [Roofers in ${a.name}](${absoluteUrl(`/areas-we-cover/${a.slug}/`)}) (${a.district})`),
    "",
    "## Roofing advice",
    ...articles.map((a) => `- [${a.title}](${absoluteUrl(`/roofing-advice/${a.slug}/`)}): ${a.excerpt}`),
    "",
    "## Key pages",
    `- [Home](${absoluteUrl("/")})`,
    `- [About us](${absoluteUrl("/about/")})`,
    `- [Roofing costs in Dublin](${absoluteUrl("/roofing-costs/")})`,
    `- [Customer reviews](${absoluteUrl("/reviews/")})`,
    `- [Photo and video gallery](${absoluteUrl("/gallery/")})`,
    `- [Contact and free quote](${absoluteUrl("/contact/")})`,
    "",
    "## Optional",
    ...legalPages.map((p) => `- [${p.title}](${absoluteUrl(`/${p.slug}/`)})`),
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
