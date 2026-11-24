import Link from "next/link";
import { phoneHref, services, site } from "@/config/site";
import type { Area, Faq } from "@/config/types";
import { AnswerFirst, AreaListBand, CtaPanel, FaqSection, PageHero, Picture, ReviewsBand, ShortCapture, TrustStrip } from "../blocks";

export function areaFaqs(area: Area): Faq[] {
  const n = area.name;
  return [
    { q: `Do you cover ${n}?`, a: `Yes. Irish Roofers Dublin covers ${n} (${area.district}) from our base in Dublin 14. Call ${site.business.phone.display} to check your address.` },
    { q: `How much does a roof repair cost in ${n}?`, a: `Most repairs in ${n} start from around €180 to €350 depending on the job, such as a leak, ridge tiles or a chimney. We give a fair written quote after a free inspection, with no hard sell.` },
    { q: `Do you offer emergency roof repairs in ${n}?`, a: `Yes. We are open 24 hours on ${site.business.phone.display} and can arrange temporary waterproofing in ${n} for an active leak, with a permanent repair a few days later.` },
    { q: `Is there a guarantee on roof work in ${n}?`, a: `Yes. All our work carries a ${site.business.guaranteeYears}-year guarantee.` },
    area.localFaq,
  ];
}

export function AreaPage({ area }: { area: Area }) {
  const n = area.name;
  const answer = `Irish Roofers Dublin covers ${n} (${area.district}) for roof repairs, leaks, slate and tile work, flat roofs, chimneys and skylights. Repairs usually start from around €180, and we are open 24 hours on ${site.business.phone.display}. Every job carries a ${site.business.guaranteeYears}-year guarantee, and quotes are free with no hard sell.`;
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <PageHero
        eyebrow={`Roofers in ${area.district}`}
        title={`Roofers in ${n}: roof repairs and leaks`}
        sub={`Slate, tile and flat roof repairs, chimneys and skylights for homes in ${n}, with a ${site.business.guaranteeYears}-year guarantee.`}
        image={site.images.areas}
        crumbs={[{ label: "Areas we cover", href: "/areas-we-cover/" }, { label: n }]}
      />
      <TrustStrip />
      <section className="section">
        <div className="shell split split-wide">
          <div className="split-copy prose">
            <AnswerFirst>
              {answer}
            </AnswerFirst>
            <h2>Roofing in {n}</h2>
            <p>{area.housing}</p>
            <p>{area.local}</p>
            <p>
              Landmarks we work around include {area.landmarks.slice(0, -1).join(", ")} and {area.landmarks[area.landmarks.length - 1]}.
            </p>
            <h2>Roofing services available in {n}</h2>
            <ul className="ticks two-col">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`}>{s.label}</Link> in {n}
                </li>
              ))}
            </ul>
            <h2>Why {n} customers choose {site.business.name}</h2>
            <p>
              Customers tell us we arrive on time, quote fairly with no hard sell and explain the problem plainly. We are open 24 hours, carry cherry picker access for safer repairs and guarantee our work for {site.business.guaranteeYears} years. Call{" "}
              <a href={phoneHref}>{site.business.phone.display}</a>.
            </p>
            <div className="side-media">
              <Picture image={site.images.about} className="framed" alt={`Irish Roofers Dublin vans ready to cover ${n}`} />
            </div>
            <p className="map-links">
              <a href={site.business.gbpUrl} target="_blank" rel="noopener noreferrer">
                Read our {site.business.rating.count} Google reviews
              </a>
            </p>
          </div>
          <aside className="split-side">
            <div className="side-card">
              <h2 className="side-h">Book an inspection in {n}</h2>
              <p>Free inspection and a fair written quote. No hard sell.</p>
              <Link className="btn btn-accent btn-block" href="/contact/#enquiry">
                Get a free quote
              </Link>
              <a className="btn btn-outline btn-block" href={phoneHref}>
                Call {site.business.phone.display}
              </a>
              <ul className="side-facts">
                <li>Covering {area.routingKey}</li>
                <li>{site.business.hours.text}</li>
                <li>{site.business.guaranteeYears}-year guarantee</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <AreaListBand eyebrow="Nearby" title="Other areas we cover" slugs={area.nearby} />
      <ShortCapture id="area" topic={`Roofing in ${n}`} />
      <FaqSection heading={`Roofing questions from ${n}`} faqs={areaFaqs(area)} />
      <ReviewsBand limit={3} />
      <CtaPanel />
    </main>
  );
}
