import type { Metadata } from "next";
import { ogImageFor } from "@/components/sites/amroofing/Pic";
import { site } from "@/config/site";
import type { ImageRef } from "@/config/types";

/** Adds canonical-matched Open Graph and Twitter tags to a page's title, description and canonical. */
export function withOg(meta: Metadata, image: ImageRef = site.images.hero, type: "website" | "article" = "website"): Metadata {
  const title = typeof meta.title === "string" ? meta.title : site.seo.defaultTitle;
  const description = meta.description ?? site.seo.defaultDescription;
  const canonical = typeof meta.alternates?.canonical === "string" ? meta.alternates.canonical : "/";
  const og = ogImageFor(image.src);
  return {
    ...meta,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.business.name,
      locale: "en_IE",
      type,
      images: [{ url: og, width: 1200, height: 630, alt: image.alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}
