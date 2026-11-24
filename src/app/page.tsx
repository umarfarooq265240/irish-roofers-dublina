import { site } from "@/config/site";
import { JsonLd } from "@/components/sites/amroofing/JsonLd";
import { websiteSchema } from "@/lib/schema";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { CtaPanel, ReviewsBand, TrustStrip } from "@/components/sites/amroofing/blocks";
import { Marquee } from "@/components/sites/amroofing/blocks4";
import { ProcessSplit, ServicesGrid } from "@/components/sites/amroofing/blocks2";
import { AccreditationsRow, RecentWork, WhoWeWorkWith } from "@/components/sites/amroofing/blocks3";
import { Areas, CredentialStats, Hero, HomeAdvice, HomeFaq, QuoteSection, Standard } from "@/components/sites/amroofing/sections/Home";

export default function Home() {
  return (
    <PageShell>
      <JsonLd data={websiteSchema()} />
      <main id="main" className="site-main">
        <Hero />
        <TrustStrip />
        <WhoWeWorkWith />
        <ServicesGrid />
        <RecentWork />
        <ProcessSplit />
        <Standard />
        <ReviewsBand />
        <Marquee />
        <AccreditationsRow />
        <CredentialStats />
        <Areas />
        <QuoteSection />
        <HomeFaq />
        <HomeAdvice />
        <CtaPanel image={site.images.ctaHome} />
      </main>
    </PageShell>
  );
}
