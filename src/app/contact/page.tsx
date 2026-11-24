import type { Metadata } from "next";
import { site } from "@/config/site";
import { withOg } from "@/lib/seo";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { ContactPage } from "@/components/sites/amroofing/pages/ContentPages";

export const metadata: Metadata = withOg({
  title: "Contact Irish Roofers Dublin | Free Roof Quote",
  description: "Contact Irish Roofers Dublin for a free roof quote. Open 24 hours, Dublin 14. Call 086 050 8558 or send your details.",
  alternates: { canonical: "/contact/" },
}, site.images.contact);

export default function Page() {
  return (
    <PageShell surveyHref="#enquiry">
      <ContactPage />
    </PageShell>
  );
}
