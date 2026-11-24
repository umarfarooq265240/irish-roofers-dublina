import Link from "next/link";
import { phoneHref, serviceBySlug, services, site } from "@/config/site";
import type { Service } from "@/config/types";
import { serviceSchema } from "@/lib/schema";
import { JsonLd } from "../JsonLd";
import { AnswerFirst, AreaListBand, CtaPanel, FaqSection, PageHero, Picture, ShortCapture, TrustStrip } from "../blocks";
import { Guarantee30 } from "../blocks4";

export function ServicePage({ service }: { service: Service }) {
  const related = service.related.map((s) => serviceBySlug(s)).filter((s): s is Service => Boolean(s));
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <JsonLd data={serviceSchema(service)} />
      <PageHero
        eyebrow="Roofing service"
        title={`${service.title} in Dublin`}
        sub={service.heroSub}
        image={service.image}
        crumbs={[{ label: "Services", href: "/services/" }, { label: service.title }]}
      />
      <TrustStrip />
      <section className="section">
        <div className="shell split split-wide">
          <div className="split-copy prose">
            <AnswerFirst>{service.answer}</AnswerFirst>
            <h2>What the job includes</h2>
            <ul className="ticks">
              {service.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <div className="side-media">
              <Picture image={site.images.roofersAtWork} className="framed" alt={`${service.title} by Irish Roofers Dublin: roofers at work`} />
            </div>
            <h2>{service.whyHeading}</h2>
            <p>{service.why}</p>
            <p>
              Call <a href={phoneHref}>{site.business.phone.display}</a> or <Link href="/contact/">request a free quote</Link> and we will come and look at the roof.
            </p>
          </div>
          <aside className="split-side">
            <div className="side-media">
              <Picture image={service.image} className="framed" />
            </div>
            <div className="side-card">
              <h2 className="side-h">Get this quoted</h2>
              <p>Free inspection and a fair written quote. No hard sell, no obligation.</p>
              <Link className="btn btn-accent btn-block" href="/contact/#enquiry">
                Get a free quote
              </Link>
              <a className="btn btn-outline btn-block" href={phoneHref}>
                Call {site.business.phone.display}
              </a>
              <ul className="side-facts">
                <li>{site.business.guaranteeYears}-year guarantee</li>
                <li>{site.business.hours.text}</li>
                <li>
                  {site.business.rating.value} on Google ({site.business.rating.count} reviews)
                </li>
                <li>Guide price {service.priceFrom}</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <section className="nx-section nx-tint nx-detail" aria-labelledby="detail-h">
        <div className="nx-wrap">
          <header className="nx-head">
            <div className="nx-head-main">
              <p className="nx-eyebrow">How we do it</p>
              <h2 className="nx-title" id="detail-h">
                How we approach {service.label.toLowerCase()}
              </h2>
            </div>
          </header>
          <div className="nx-detail-grid">
            {service.approach.map((a, i) => (
              <article className="nx-detail-card" key={a.title}>
                <span className="nx-detail-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <AreaListBand
        title={`${service.label} in your area`}
        sub="We deliver this service across Dublin. Choose your area for local detail."
        slugs={site.topAreaSlugs}
      />
      <ShortCapture id="svc" topic={service.title} />
      <FaqSection heading={`Questions about ${service.label.toLowerCase()}`} faqs={service.faqs} />
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow">Related</p>
            <h2 className="section-title">Other roofing services</h2>
          </div>
          <div className="cards">
            {related.map((r) => (
              <article className="card" key={r.slug}>
                <div className="card-media">
                  <Picture image={r.image} className="card-img" alt={r.image.alt} />
                </div>
                <div className="card-body">
                  <h3 className="card-title">
                    <Link href={`/services/${r.slug}/`}>{r.title}</Link>
                  </h3>
                  <p>{r.summary}</p>
                  <span className="card-link">Read more</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Guarantee30 />
      <CtaPanel noStore />
    </main>
  );
}

export const allServiceSlugs = services.map((s) => s.slug);
