import type { MetadataRoute } from "next";
import { absoluteUrl, areas, articles, legalPages, services, site } from "@/config/site";

export const dynamic = "force-static";

const abs = (p: string) => absoluteUrl(p);

export default function sitemap(): MetadataRoute.Sitemap {
  const img = (src: string) => [abs(src)];
  const entry = (path: string, priority: number, image: string, lastModified?: string, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly"): MetadataRoute.Sitemap[number] => ({
    url: abs(path),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    changeFrequency,
    priority,
    images: img(image),
  });
  const i = site.images;
  return [
    entry("/", 1, i.hero.src, undefined, "weekly"),
    entry("/services/", 0.9, i.services.src),
    ...services.map((s) => entry(`/services/${s.slug}/`, 0.9, s.image.src)),
    entry("/areas-we-cover/", 0.8, i.areas.src),
    ...areas.map((a) => entry(`/areas-we-cover/${a.slug}/`, 0.7, i.areas.src)),
    entry("/roofing-costs/", 0.8, i.costs.src),
    entry("/reviews/", 0.7, i.reviews.src),
    entry("/gallery/", 0.6, i.services.src),
    entry("/about/", 0.6, i.about.src),
    entry("/contact/", 0.8, i.contact.src),
    entry("/roofing-advice/", 0.6, i.advice.src),
    ...articles.map((a) => entry(`/roofing-advice/${a.slug}/`, 0.5, i.advice.src, a.updated)),
    ...legalPages.map((p) => entry(`/${p.slug}/`, 0.2, i.hero.src, p.updated, "yearly")),
  ];
}
