import type { Metadata } from "next";
import { site } from "@/config/site";
import { withOg } from "@/lib/seo";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { ReviewsPage } from "@/components/sites/amroofing/pages/IndexPages";

export const metadata: Metadata = withOg({
  title: "Reviews | Irish Roofers Dublin 4.8 on Google",
  description: "Rated 4.8 from 440 Google reviews. Read what Dublin homeowners say about Irish Roofers Dublin. Call 086 050 8558.",
  alternates: { canonical: "/reviews/" },
}, site.images.reviews);

export default function Page() {
  return (
    <PageShell>
      <ReviewsPage />
    </PageShell>
  );
}
