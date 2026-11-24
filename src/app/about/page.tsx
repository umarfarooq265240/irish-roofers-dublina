import type { Metadata } from "next";
import { site } from "@/config/site";
import { withOg } from "@/lib/seo";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { AboutPage } from "@/components/sites/amroofing/pages/ContentPages";

export const metadata: Metadata = withOg({
  title: "About Irish Roofers Dublin | Roofers in Dublin 14",
  description: "Meet Irish Roofers Dublin: friendly, fair roofers in Dublin 14, open 24 hours with a 10-year guarantee. Call 086 050 8558.",
  alternates: { canonical: "/about/" },
}, site.images.about);

export default function Page() {
  return (
    <PageShell>
      <AboutPage />
    </PageShell>
  );
}
