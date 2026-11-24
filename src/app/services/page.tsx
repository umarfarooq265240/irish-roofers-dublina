import type { Metadata } from "next";
import { site } from "@/config/site";
import { withOg } from "@/lib/seo";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { ServicesIndexPage } from "@/components/sites/amroofing/pages/IndexPages";

export const metadata: Metadata = withOg({
  title: "Roofing Services in Dublin | Irish Roofers Dublin",
  description: "Roof repairs, leaks, slate, tiles, flat roofs, chimneys and skylights in Dublin. 10-year guarantee. Call 086 050 8558.",
  alternates: { canonical: "/services/" },
}, site.images.services);

export default function Page() {
  return (
    <PageShell>
      <ServicesIndexPage />
    </PageShell>
  );
}
