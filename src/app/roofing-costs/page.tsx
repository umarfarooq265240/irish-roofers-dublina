import type { Metadata } from "next";
import { site } from "@/config/site";
import { withOg } from "@/lib/seo";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { CostsPage } from "@/components/sites/amroofing/pages/ContentPages";

export const metadata: Metadata = withOg({
  title: "Roofing Costs in Dublin | Guide Prices in Euro",
  description: "Guide prices for roof repairs and new roofs in Dublin, in euro. Free quotes, 10-year guarantee. Call 086 050 8558.",
  alternates: { canonical: "/roofing-costs/" },
}, site.images.costs);

export default function Page() {
  return (
    <PageShell>
      <CostsPage />
    </PageShell>
  );
}
