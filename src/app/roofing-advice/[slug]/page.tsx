import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { ArticlePage } from "@/components/sites/amroofing/pages/ContentPages";
import { articleBySlug, articles, site } from "@/config/site";
import { withOg } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((x) => ({ slug: x.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = articleBySlug(slug);
  if (!item) return {};
  return withOg({
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/roofing-advice/${slug}/` },
  }, site.images.advice, "article");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = articleBySlug(slug);
  if (!item) notFound();
  return (
    <PageShell>
      <ArticlePage article={item} />
    </PageShell>
  );
}
