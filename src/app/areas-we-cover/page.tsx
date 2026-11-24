import type { Metadata } from "next";
import { site } from "@/config/site";
import { withOg } from "@/lib/seo";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { AreasIndexPage } from "@/components/sites/amroofing/pages/IndexPages";

export const metadata: Metadata = withOg({
  title: "Roofers Across Dublin | Areas We Cover",
  description: "Irish Roofers Dublin covers 40 areas from Dublin 14 to Howth, Tallaght and Swords. Open 24 hours. Call 086 050 8558.",
  alternates: { canonical: "/areas-we-cover/" },
}, site.images.areas);

export default function Page() {
  return (
    <PageShell>
      <AreasIndexPage />
    </PageShell>
  );
}
