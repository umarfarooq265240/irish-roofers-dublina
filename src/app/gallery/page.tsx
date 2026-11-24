import type { Metadata } from "next";
import { site } from "@/config/site";
import { withOg } from "@/lib/seo";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { GalleryPage } from "@/components/sites/amroofing/pages/IndexPages";

export const metadata: Metadata = withOg({
  title: "Roofing Gallery Dublin | Irish Roofers Dublin",
  description: "Photos and video of flat roofs, natural slate, tiled roofs, skylights and emergency repairs by Irish Roofers Dublin. Call 086 050 8558.",
  alternates: { canonical: "/gallery/" },
}, site.images.services);

export default function Page() {
  return (
    <PageShell>
      <GalleryPage />
    </PageShell>
  );
}
