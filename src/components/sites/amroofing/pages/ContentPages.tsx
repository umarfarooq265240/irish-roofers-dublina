import Link from "next/link";
import { articleSchema } from "@/lib/schema";
import { JsonLd } from "../JsonLd";
import { fullAddress, hasEmail, mailHref, phoneHref, formatDate, site } from "@/config/site";
import type { Article, LegalPage } from "@/config/types";
import { AnswerFirst, AreaListBand, CtaPanel, FaqSection, PageHero, Picture, Prose, ReviewsBand, TrustStrip } from "../blocks";
import { ProcessSplit, QuoteFunnel } from "../blocks2";
import { AccreditationsRow, MeetTheDirector, RecentWork } from "../blocks3";
import { aboutStatsExtra } from "@/config/content/sections";
import { LocationsSection, RoofingStore } from "../blocks4";
import { OfficeMap } from "../OfficeMap";

export function AboutPage() {
  const b = site.business;
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <PageHero
        eyebrow="Who we are"
        title={`About ${b.name}`}
        sub="A friendly, fair roofing contractor in Dublin 14, open 24 hours."
        image={site.images.about}
        crumbs={[{ label: "About us" }]}
      />
      <TrustStrip />
      <section className="section">
        <div className="shell split split-wide">
          <div className="split-copy prose">
            <AnswerFirst>{site.about.answer}</AnswerFirst>
            <Prose blocks={site.about.blocks} />
          </div>
          <aside className="split-side">
            <div className="side-media">
              <Picture image={site.images.aboutSection} className="framed" />
            </div>
            <div className="side-card side-card-merged">
              <figure className="pull-quote">
                <blockquote>
                  <p>Very responsive, came out and priced the job quickly, organised temporary waterproofing and then did a permanent fix a few days later.</p>
                </blockquote>
                <figcaption>Carin Bryans, Google review</figcaption>
              </figure>
              <h2 className="side-h">Talk to us</h2>
              <Link className="btn btn-accent btn-block" href="/contact/#enquiry">
                Get a free quote
              </Link>
              <a className="btn btn-outline btn-block" href={phoneHref}>
                Call {b.phone.display}
              </a>
            </div>
          </aside>
        </div>
      </section>
      <section className="section band about-stats">
        <div className="shell">
          <ul className="hero-stats">
            <li className="hero-stat">
              <span className="hero-stat-num">{b.rating.value}</span>
              <span className="hero-stat-label">average Google rating from {b.rating.count} reviews</span>
            </li>
            <li className="hero-stat">
              <span className="hero-stat-num">{b.guaranteeYears}</span>
              <span className="hero-stat-label">year guarantee on our work</span>
            </li>
            <li className="hero-stat">
              <span className="hero-stat-num">24</span>
              <span className="hero-stat-label">hours a day, open for urgent roof problems</span>
            </li>
            <li className="hero-stat">
              <span className="hero-stat-num">{aboutStatsExtra.count}</span>
              <span className="hero-stat-label">{aboutStatsExtra.label}</span>
            </li>
          </ul>
        </div>
      </section>
      <MeetTheDirector />
      <ProcessSplit image={site.images.processAbout} />
      <RecentWork />
      <AccreditationsRow />
      <ReviewsBand limit={3} />
      <CtaPanel />
    </main>
  );
}

export function CostsPage() {
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <PageHero
        eyebrow="Guide prices"
        title="Roofing costs in Dublin"
        sub="What roof repairs and new roofs usually cost in Dublin, in euro."
        image={site.images.costs}
        crumbs={[{ label: "Roofing costs" }]}
      />
      <TrustStrip />
      <section className="section">
        <div className="shell split split-wide">
          <div className="split-copy prose">
            <AnswerFirst>{site.costs.answer}</AnswerFirst>
            <Prose blocks={site.costs.blocks} />
            <p>
              Our inspection is free, takes about thirty minutes and comes with no obligation. <Link href="/contact/">Request a free quote</Link> or call <a href={phoneHref}>{site.business.phone.display}</a>.
            </p>
          </div>
          <aside className="split-side">
            <div className="side-card">
              <h2 className="side-h">Get a firm price</h2>
              <p>Guide prices are a starting point. A free inspection gives you a written quote.</p>
              <Link className="btn btn-accent btn-block" href="/contact/#enquiry">
                Get a free quote
              </Link>
              <a className="btn btn-outline btn-block" href={phoneHref}>
                Call {site.business.phone.display}
              </a>
            </div>
          </aside>
        </div>
      </section>
      <FaqSection heading="Roofing cost questions" faqs={site.costs.faqs} />
      <CtaPanel />
    </main>
  );
}

export function ArticlePage({ article }: { article: Article }) {
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <JsonLd data={articleSchema(article)} />
      <PageHero
        eyebrow={`Last updated ${formatDate(article.updated)}`}
        title={article.title}
        crumbs={[{ label: "Roofing advice", href: "/roofing-advice/" }, { label: article.title }]}
      />
      <TrustStrip />
      <article className="section">
        <div className="shell narrow prose">
          <p className="article-meta">
            Published {formatDate(article.published)} · Last updated {formatDate(article.updated)}
          </p>
          <Prose blocks={article.body} />
          <div className="author-box">
            <h2>About the author</h2>
            <p>
              Written by the team at {site.business.name}, a roofing contractor at {fullAddress}. Rated {site.business.rating.value} from {site.business.rating.count} Google reviews. Call <a href={phoneHref}>{site.business.phone.display}</a>.
            </p>
          </div>
        </div>
      </article>
      <FaqSection heading="Quick answers" faqs={article.faqs} />
      <CtaPanel />
    </main>
  );
}

export function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <PageHero eyebrow={`Last updated ${formatDate(page.updated)}`} title={page.title} crumbs={[{ label: page.title }]} />
      <TrustStrip />
      <section className="section">
        <div className="shell narrow prose legal-prose">
          <Prose blocks={page.body} />
        </div>
      </section>
    </main>
  );
}

export function ContactPage() {
  const b = site.business;
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <PageHero
        eyebrow="Get in touch"
        title="Contact Irish Roofers Dublin"
        sub="Call, or send the details and we will come and look at your roof."
        image={site.images.contact}
        crumbs={[{ label: "Contact" }]}
      />
      <TrustStrip />
      <section className="section">
        <div className="shell split split-wide">
          <div className="split-copy">
            <AnswerFirst label="Fastest route.">
              Call <a href={phoneHref}>{b.phone.display}</a>, we are open 24 hours. Or send the form and we will come back to you. For an active leak please call straight away.
            </AnswerFirst>
            <QuoteFunnel title="Send us the details" sub="Four quick steps. Your email app opens with everything filled in, or you can call us." />
          </div>
          <aside className="split-side">
            <div className="side-card">
              <h2 className="side-h">Contact details</h2>
              <ul className="contact-list">
                <li>
                  <span className="contact-label">Telephone</span>
                  <a href={phoneHref}>{b.phone.display}</a>
                </li>
                {hasEmail ? (
                  <li>
                    <span className="contact-label">Email</span>
                    <a href={mailHref}>{b.email}</a>
                  </li>
                ) : null}
                <li>
                  <span className="contact-label">Address</span>
                  {fullAddress}
                </li>
              </ul>
              <h3 className="side-h-sm">Opening hours</h3>
              <ul className="contact-hours">
                <li>{b.hours.text}, every day</li>
              </ul>
              <ul className="side-facts">
                <li>{b.guaranteeYears}-year guarantee</li>
                <li>
                  {b.rating.value} on Google ({b.rating.count} reviews)
                </li>
              </ul>
            </div>
            <div className="side-media">
              <Picture image={site.images.contactSide} className="framed" />
            </div>
            <p className="map-links">
              <a href={b.gbpUrl} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
              <a href={b.gbpUrl} target="_blank" rel="noopener noreferrer">
                Read our {b.rating.count} Google reviews
              </a>
            </p>
          </aside>
        </div>
      </section>
      <LocationsSection />
      <OfficeMap />
      <AreaListBand eyebrow="Service area" title="Areas we cover" slugs={site.topAreaSlugs} />
      <RoofingStore />
    </main>
  );
}
