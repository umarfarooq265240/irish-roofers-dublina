import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { AreaPage } from "@/components/sites/amroofing/pages/AreaPage";
import { areaBySlug, areas, fitTitle, site } from "@/config/site";
import { withOg } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return areas.map((x) => ({ slug: x.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = areaBySlug(slug);
  if (!item) return {};
  return withOg({
    title: fitTitle([`Roofers in ${item.name} | Roof Repairs ${item.name} | Irish Roofers Dublin`, `Roofers in ${item.name} | Roof Repairs | Irish Roofers Dublin`, `Roofers in ${item.name} | Irish Roofers Dublin`, `Roofers in ${item.name} | Roof Repairs`]),
    description: `Roof repairs, leaks, slate and tile work in ${item.name}. 10-year guarantee, open 24 hours. Call 086 050 8558.`,
    alternates: { canonical: `/areas-we-cover/${slug}/` },
  }, site.images.areas);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = areaBySlug(slug);
  if (!item) notFound();
  return (
    <PageShell>
      <AreaPage area={item} />
    </PageShell>
  );
}
