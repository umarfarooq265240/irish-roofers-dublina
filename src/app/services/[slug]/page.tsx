import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { ServicePage } from "@/components/sites/amroofing/pages/ServicePage";
import { ogImageFor } from "@/components/sites/amroofing/Pic";
import { fitTitle, serviceBySlug, services, site } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((x) => ({ slug: x.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = serviceBySlug(slug);
  if (!item) return {};
  const title = fitTitle([`${item.title} in Dublin | Irish Roofers Dublin`, `${item.label} in Dublin | Irish Roofers Dublin`, `${item.label} in Dublin | Irish Roofers`, `${item.label} in Dublin`]);
  const description = `${item.answer.split(". ").slice(0, 2).join(". ").slice(0, 150)}.`;
  const og = ogImageFor(item.image.src);
  return {
    title,
    description,
    alternates: { canonical: `/services/${slug}/` },
    openGraph: {
      title,
      description,
      url: `/services/${slug}/`,
      siteName: site.business.name,
      locale: "en_IE",
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: item.image.alt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = serviceBySlug(slug);
  if (!item) notFound();
  return (
    <PageShell>
      <ServicePage service={item} />
    </PageShell>
  );
}
