import type { Metadata } from "next";
import { site } from "@/config/site";
import { withOg } from "@/lib/seo";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { LegalPageView } from "@/components/sites/amroofing/pages/ContentPages";
import { legalBySlug } from "@/config/site";

const page = legalBySlug("accessibility-statement")!;

export const metadata: Metadata = withOg({
  title: `${page.title} | Irish Roofers Dublin`,
  description: page.description,
  alternates: { canonical: "/accessibility-statement/" },
}, site.images.hero);

export default function Page() {
  return (
    <PageShell>
      <LegalPageView page={page} />
    </PageShell>
  );
}
