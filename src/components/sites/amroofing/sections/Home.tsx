import Link from "next/link";
import { credentialStats } from "@/config/content/sections";
import { areas, articles, phoneHref, reviews, serviceBySlug, site } from "@/config/site";
import { Picture } from "../blocks";
import { JsonLd } from "../JsonLd";
import { Pic } from "../Pic";
import { FamilyBadge } from "../blocks4";
import { faqSchema } from "@/lib/schema";
import { CountiesBlock, LineIcon, QuoteFunnel } from "../blocks2";

export function Hero() {
  const r = reviews[0];
  const img = site.images.hero;
  return (
    <section className="nx-hero" aria-labelledby="hero-h">
      <div className="nx-hero-media">
        <Pic image={img} sizes="100vw" eager />
      </div>
      <div className="nx-wrap nx-hero-inner">
        <div className="nx-hero-copy">
          <h1 id="hero-h" className="nx-hero-title">
            {site.home.heroTitle}
          </h1>
          <p className="nx-hero-sub">{site.home.heroSub}</p>
          <div className="nx-hero-actions">
            <Link className="nx-btn nx-btn-volt nx-btn-lg" href="/contact/#enquiry">
              Get a free quote
              <span className="nx-btn-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a className="nx-btn nx-btn-glass nx-btn-lg" href={phoneHref}>
              Call {site.business.phone.display}
            </a>
          </div>
          <figure className="nx-hero-review ir-hero-review">
            <span className="nx-hero-review-stars" aria-hidden="true">
              ★★★★★
            </span>
            <blockquote>
              <p>{r.text}</p>
            </blockquote>
            <figcaption>
              <span className="nx-card-initial" aria-hidden="true">
                {r.author[0]}
              </span>
              {r.author}
              <small>Google review</small>
            </figcaption>
          </figure>
        </div>
        <aside className="nx-hero-side">
          <FamilyBadge />
        </aside>
      </div>
    </section>
  );
}

export function WhatWeFix() {
  return (
    <section className="nx-section nx-clients" aria-labelledby="clients-h">
      <div className="nx-wrap nx-clients-grid">
        <div className="nx-clients-copy">
          <p className="nx-eyebrow">What we fix</p>
          <h2 className="nx-title" id="clients-h">
            Roofs of every kind, <em className="accent-serif">repaired properly</em>.
          </h2>
          <p className="nx-sub">Slate, tile or flat, a leak or a full replacement: we inspect first, explain it plainly and quote fairly.</p>
          <Link className="nx-textlink" href="/services/">
            View our services <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="nx-client-cards">
          {site.home.whatWeFix.map((c, i) => (
            <li className="nx-client-card" key={c.title}>
              <Link href={c.href}>
                <span className="nx-client-media" aria-hidden="true">
                  <Picture image={serviceBySlug(c.href.split("/")[2])?.image ?? site.images.hero} className="nx-client-img" alt="" />
                </span>
                <span className="nx-client-body">
                  <span className="nx-client-icon" aria-hidden="true">
                    <LineIcon n={i} />
                  </span>
                  <strong>{c.title}</strong>
                  <span>{c.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="nx-rail-hint">Swipe for more</p>
      </div>
    </section>
  );
}

export function Standard() {
  return (
    <section className="nx-section nx-standard" aria-labelledby="std-h">
      <div className="nx-wrap">
        <div className="nx-standard-top">
          <div>
            <p className="nx-eyebrow">The {site.business.shortName} standard</p>
            <h2 className="nx-title" id="std-h">
              A roofer should make your problem <em className="accent-serif">go away</em>
            </h2>
          </div>
          <div className="nx-standard-media">
            <Picture image={site.images.standard} className="nx-standard-img" />
          </div>
        </div>
        <ul className="nx-standard-list">
          {site.home.standard.map((s, i) => (
            <li key={s.title}>
              <span className="nx-standard-icon" aria-hidden="true">
                <LineIcon n={i} />
              </span>
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type StatItem = { n: number; count: string; label: string; aria: string };

function StatsCard({ stats, label }: { stats: StatItem[]; label: string }) {
  return (
    <div className="nx-stats-wrap">
      <div className="nx-wrap">
        <div className="nx-stats-card" data-spot="">
          <span className="nx-stats-glow" aria-hidden="true" />
          <ul className="nx-stats" aria-label={label}>
            {stats.map((s) => (
              <li className="nx-stat" key={s.label}>
                <span className="nx-stat-icon" aria-hidden="true">
                  <LineIcon n={s.n} />
                </span>
                <span className="nx-stat-num" role="img" aria-label={s.aria}>
                  <span data-count={s.count} aria-hidden="true">
                    {s.count}
                  </span>
                </span>
                <span className="nx-stat-label" aria-hidden="true">
                  {s.label}
                </span>
                <span className="nx-stat-bar" aria-hidden="true">
                  <span />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Rating numbers, shown under the reviews. */
export function Stats() {
  const b = site.business;
  const stats: StatItem[] = [
    { n: 3, count: String(b.rating.value), label: "average Google rating", aria: `${b.rating.value} out of 5 average Google rating` },
    { n: 0, count: String(b.rating.count), label: "Google reviews", aria: `${b.rating.count} Google reviews` },
    { n: 8, count: "24", label: "hours a day, open for emergencies", aria: "Open 24 hours" },
    { n: 3, count: `${b.guaranteeYears}+`, label: "year guarantee on our work", aria: `${b.guaranteeYears} plus year guarantee` },
  ];
  return <StatsCard stats={stats} label={`${b.name} reviews in numbers`} />;
}

/** DUMMY credential numbers (years in the trade, team size, ...). Replace in src/config/content/sections.ts. */
export function CredentialStats() {
  const stats: StatItem[] = credentialStats.map((c, i) => ({ n: [2, 5, 6, 7][i] ?? i, count: c.count, label: c.label, aria: `${c.count} ${c.label}` }));
  return <StatsCard stats={stats} label={`${site.business.name} in numbers`} />;
}

export function Areas() {
  return (
    <section className="nx-section nx-areas" aria-labelledby="nxa-h">
      <div className="nx-wrap">
        <header className="nx-head">
          <div className="nx-head-main">
            <p className="nx-eyebrow">Where we work</p>
            <h2 className="nx-title" id="nxa-h">
              Areas we cover
            </h2>
          </div>
          <p className="nx-sub">Based in Dublin 14 and covering {areas.length} areas across south, west, north and coastal Dublin.</p>
        </header>
        <CountiesBlock />
      </div>
    </section>
  );
}

export function QuoteSection() {
  return (
    <section className="nx-section nx-dark nx-quote" id="quote" aria-labelledby="quote-h">
      <div className="nx-wrap nx-split nx-split-top">
        <div className="nx-quote-copy">
          <p className="nx-eyebrow">Free, no obligation</p>
          <h2 className="nx-title" id="quote-h">
            Tell us about the roof and we will come and <em className="accent-serif">look</em> at it
          </h2>
          <p className="nx-lead">Send the details and we will arrange an inspection at a time that suits you. Every enquiry reaches a person, not an automated system.</p>
          <ul className="nx-checks is-dark">
            <li>A roofer inspects and photographs the roof</li>
            <li>A clear written quote with no hard sell</li>
            <li>No pressure, no obligation and no cost for the inspection</li>
            <li>All work carries a {site.business.guaranteeYears}-year guarantee</li>
          </ul>
        </div>
        <div className="nx-quote-form">
          <QuoteFunnel title="Get your free roof quote" />
        </div>
      </div>
    </section>
  );
}

export function HomeFaq() {
  return (
    <section className="section faq-section nx-faq" aria-labelledby="faq-h">
      <JsonLd data={faqSchema(site.home.faqs)} />
      <div className="nx-wrap nx-faq-grid">
        <div className="nx-faq-head">
          <p className="nx-eyebrow">Questions</p>
          <h2 id="faq-h" className="nx-title">
            Questions we are asked most
          </h2>
          <p className="nx-sub">
            Something not covered here? Call <a href={phoneHref}>{site.business.phone.display}</a> and you will speak to a roofer, not a call centre.
          </p>
        </div>
        <div className="faq-list">
          {site.home.faqs.map((f, i) => (
            <details className="faq-item" key={f.q} open={i === 0}>
              <summary id={`faq-${i}`}>
                <span className="faq-q">{f.q}</span>
                <span className="faq-mark" aria-hidden="true" />
              </summary>
              <div className="faq-answer" role="region" aria-labelledby={`faq-${i}`}>
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeAdvice() {
  return (
    <section className="section advice-section" aria-labelledby="advice-h">
      <div className="shell">
        <div className="section-head" data-index="08">
          <p className="eyebrow">Roofing advice</p>
          <h2 id="advice-h" className="section-title">
            Straight answers to the questions we get asked
          </h2>
          <p className="section-sub">No sales copy. What a roof costs, how long one lasts, and how to tell a repair from a replacement.</p>
        </div>
        <ul className="advice-list">
          {articles.slice(0, 3).map((a) => (
            <li className="advice-item" key={a.slug}>
              <Link href={`/roofing-advice/${a.slug}/`}>
                <span className="advice-title">{a.title}</span>
                <span className="advice-excerpt">{a.excerpt}</span>
                <span className="advice-go" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
