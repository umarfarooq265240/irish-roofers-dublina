import type { Metadata } from "next";
import { site } from "@/config/site";
import { withOg } from "@/lib/seo";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { AdviceIndexPage } from "@/components/sites/amroofing/pages/IndexPages";

export const metadata: Metadata = withOg({
  title: "Roofing Advice for Dublin Homes | Irish Roofers",
  description: "Straight answers on roof costs, slate vs tile, leaks, chimneys and storm damage in Dublin. Call 086 050 8558.",
  alternates: { canonical: "/roofing-advice/" },
}, site.images.advice);

export default function Page() {
  return (
    <PageShell>
      <AdviceIndexPage />
    </PageShell>
  );
}
