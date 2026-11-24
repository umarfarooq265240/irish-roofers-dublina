import type React from "react";
import Link from "next/link";
import { areas, areaBySlug, hasEmail, mailHref, phoneHref, reviews, site, fullAddress } from "@/config/site";
import type { Faq, ImageRef, ProseBlock } from "@/config/types";
import { JsonLd } from "./JsonLd";
import { Pic } from "./Pic";
import { RoofingStore } from "./blocks4";
import { breadcrumbSchema, faqSchema, reviewsSchema } from "@/lib/schema";

/* ---------- small primitives ---------- */

export function Wordmark({ light = true }: { light?: boolean }) {
  return (
    <span className={`ir-wordmark${light ? " is-light" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ir-logo" src={`/sites/${site.assetDir}/images/logo-irish-roofers-dublin.png`} alt={site.business.name} width="174" height="38" decoding="async" />
    </span>
  );
}

export function Picture({ image, className, eager = false, sizes, alt }: { image: ImageRef; className?: string; eager?: boolean; sizes?: string; alt?: string }) {
  return <Pic image={image} className={className} eager={eager} sizes={sizes} alt={alt} />;
}

const ICONS: Record<string, React.ReactNode> = {
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.3l3.4 2" />
    </>
  ),
  star: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M9 13.5L7.5 21l4.5-2.2L16.5 21 15 13.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.3-2.9 7.6-7 9.5-4.1-1.9-7-5.2-7-9.5V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  quote: (
    <>
      <path d="M3 9.5l3-2.5 4 1 4-1 3 2.5" />
      <path d="M6.5 12.5l3 3 2-2 2 2 3-3" />
      <path d="M2.5 9.5v5.5M21.5 9.5v5.5" />
    </>
  ),
};

export function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {ICONS[name] ?? ICONS.shield}
    </svg>
  );
}

export function TrustStrip() {
  return (
    <div className="nx-trust">
      <div className="nx-wrap">
        <ul className="nx-trust-list">
          {site.trust.map((t) => (
            <li key={t.strong}>
              <span className="nx-trust-icon" aria-hidden="true">
                <Icon name={t.icon} />
              </span>
              <span className="nx-trust-copy">
                <strong>{t.strong}</strong>
                <span>{t.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  sub,
  image,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  image?: ImageRef;
  crumbs: Crumb[];
}) {
  return (
    <header className={`page-hero${image ? " has-media" : ""}`}>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {image ? (
        <div className="page-hero-media">
          <Pic image={image} sizes="100vw" className="hero-img" eager style={{ "--hero-focus": "center" } as React.CSSProperties} />
        </div>
      ) : null}
      <div className="shell page-hero-inner">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.label}>
                {c.href && i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow">
          <span className="eyebrow-mark" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        {sub ? <p className="page-hero-sub">{sub}</p> : null}
        <div className="page-hero-actions">
          <Link className="btn btn-accent" href="/contact/#enquiry">
            Get a free quote
          </Link>
          <a className="btn btn-ghost-light" href={phoneHref}>
            Call {site.business.phone.display}
          </a>
        </div>
      </div>
    </header>
  );
}

export function AnswerFirst({ children, label = "In short." }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="answer-first">
      <p>
        <strong>{label}</strong> {children}
      </p>
    </div>
  );
}

/* ---------- prose renderer for articles, costs, legal ---------- */

export function Prose({ blocks }: { blocks: readonly ProseBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="wp-block-heading">
                {b.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="wp-block-paragraph">
                {b.text}
              </p>
            );
          case "ticks":
            return (
              <ul key={i} className="ticks">
                {b.items.map((it) => (
                  <li key={it.text}>
                    {it.lead ? <strong>{it.lead}</strong> : null}
                    {it.lead ? " " : ""}
                    {it.text}
                  </li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={i}>
                <div className="cost-table" style={{ "--tpl": `1.4fr ${"1fr ".repeat(b.head.length - 1).trim()}` } as React.CSSProperties}>
                  <div className="cost-row cost-head">
                    {b.head.map((h) => (
                      <span key={h}>{h}</span>
                    ))}
                  </div>
                  {b.rows.map((r) => (
                    <div key={r[0]} className="cost-row">
                      {r.map((c, j) => (
                        <span key={j} data-label={b.head[j]}>{c}</span>
                      ))}
                    </div>
                  ))}
                </div>
                {b.note ? <p className="cost-note">{b.note}</p> : null}
              </div>
            );
          default:
            return (
              <p key={i} className="cost-note">
                {b.text}
              </p>
            );
        }
      })}
    </>
  );
}

/* ---------- FAQ ---------- */

export function FaqSection({ heading, faqs, eyebrow = "Questions" }: { heading: string; faqs: readonly Faq[]; eyebrow?: string }) {
  return (
    <section className="section faq-section nx-faq" aria-labelledby="faq-h">
      <JsonLd data={faqSchema(faqs)} />
      <div className="nx-wrap nx-faq-grid">
        <div className="nx-faq-head">
          <p className="nx-eyebrow">{eyebrow}</p>
          <h2 id="faq-h" className="nx-title">
            {heading}
          </h2>
          <p className="nx-sub">
            Something not covered here? Call <a href={phoneHref}>{site.business.phone.display}</a> and you will speak to a roofer, not a call centre.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
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

/* ---------- short callback capture ---------- */

export function ShortCapture({ id, topic, title = "Tell us your Eircode and we will call you back" }: { id: string; topic: string; title?: string }) {
  return (
    <section className="short-capture" aria-labelledby={`${id}_h`}>
      <div className="shell short-inner">
        <div className="short-copy">
          <h2 id={`${id}_h`}>{title}</h2>
          <p>Two fields, no long form. A roofer will call to talk it through and arrange an inspection if you want one.</p>
          <a className="short-call" href={phoneHref}>
            Or call {site.business.phone.display}
          </a>
        </div>
        <form className="lead-form short-form" method="post" action="#" noValidate data-topic={topic}>
          <div className="form-live" role="alert" aria-live="assertive" aria-atomic="true" />
          <div className="field">
            <label htmlFor={`${id}_eircode`}>
              Eircode{" "}
              <span className="req" aria-hidden="true">
                *
              </span>
            </label>
            <input type="text" id={`${id}_eircode`} name="eircode" autoComplete="postal-code" inputMode="text" required defaultValue="" placeholder="D14 W2Y4" />
          </div>
          <div className="field">
            <label htmlFor={`${id}_phone`}>
              Telephone{" "}
              <span className="req" aria-hidden="true">
                *
              </span>
            </label>
            <input type="tel" id={`${id}_phone`} name="phone" autoComplete="tel" inputMode="tel" required defaultValue="" placeholder="086 123 4567" />
          </div>
          <div className="field consent">
            <label className="check">
              <input type="checkbox" name="consent" value="1" required />
              <span>
                I agree to {site.business.name} using the details above to respond to my enquiry, as described in the Privacy Policy. <Link href="/privacy-policy/">Read the Privacy Policy</Link>.
              </span>
            </label>
          </div>
          <p className="form-promise">
            <span className="form-promise-dot" aria-hidden="true" />
            We reply quickly, and straight away on active leaks.
          </p>
          <button type="submit" className="btn btn-accent btn-block">
            Request a callback
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------- reviews band ---------- */

export function ReviewsBand({ limit, heading }: { limit?: number; heading?: React.ReactNode }) {
  const list = limit ? reviews.slice(0, limit) : reviews;
  return (
    <section className="nx-section nx-dark nx-rtabs" aria-labelledby="rtabs-h">
      <JsonLd data={reviewsSchema(list)} />
      <div className="nx-wrap">
        <div className="nx-rtabs-top">
          <div>
            <p className="nx-eyebrow">What our customers say</p>
            <h2 className="nx-title" id="rtabs-h">
              {heading ?? (
                <>
                  Trusted by <em className="accent-serif">developers, main contractors</em> and homeowners across Dublin
                </>
              )}
            </h2>
          </div>
        </div>
        <ul className="nx-rtabs-list">
          {list.map((r) => (
            <li key={r.author}>
              <span className="nx-rquote" aria-hidden="true">
                “
              </span>
              <p>{r.text}</p>
              <span className="nx-rwho">
                <strong>{r.author}</strong>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- call to action panel ---------- */

export function CtaPanel({ image = site.images.cta, noStore = false }: { image?: ImageRef; noStore?: boolean } = {}) {
  return (
    <>
    {noStore ? null : <RoofingStore />}
    <section className="nx-section nx-ctapanel" aria-labelledby="cta-h">
      <div className="nx-ctapanel-media" aria-hidden="true">
        <picture>
          <Pic image={image} sizes="(max-width: 1080px) 100vw, 50vw" className="nx-ctapanel-img" />
        </picture>
      </div>
      <div className="nx-wrap nx-ctapanel-grid">
        <div className="nx-ctapanel-copy">
          <p className="nx-eyebrow">Let&apos;s talk</p>
          <h2 className="nx-title" id="cta-h">
            Leaking or damaged roof? <em className="accent-serif">Call us now.</em>
          </h2>
          <p className="nx-lead">
            Open 24 hours. Get a free inspection and a fair quote with no hard sell, and a {site.business.guaranteeYears}-year guarantee on our work.
          </p>
          <Link className="nx-btn nx-btn-volt nx-btn-lg" href="/contact/#enquiry">
            Get a free quote
            <span className="nx-btn-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
        <ul className="nx-ctapanel-details">
          <li>
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M6.5 3.5h3l1.5 4-2 1.4a11.5 11.5 0 006.1 6.1l1.4-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.5 5.7a2 2 0 012-2.2z" />
              </svg>
            </span>
            <a href={phoneHref}>{site.business.phone.display}</a>
          </li>
          {hasEmail ? (
            <li>
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M3.5 5.5h17v13h-17z" />
                  <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
                </svg>
              </span>
              <a href={mailHref}>{site.business.email}</a>
            </li>
          ) : null}
          <li>
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 10-13 0C5.5 15 12 21 12 21z" />
                <circle cx="12" cy="10.5" r="2.5" />
              </svg>
            </span>
            {fullAddress}
          </li>
        </ul>
      </div>
    </section>
    </>
  );
}

/* ---------- area list band ---------- */

export function AreaListBand({ title, sub, slugs, eyebrow = "Local coverage" }: { title: string; sub?: string; slugs: readonly string[]; eyebrow?: string }) {
  return (
    <section className="section band">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title">{title}</h2>
          {sub ? <p className="section-sub">{sub}</p> : null}
        </div>
        <ul className="area-list">
          {slugs.map((s) => {
            const a = areaBySlug(s);
            if (!a) return null;
            return (
              <li key={s}>
                <Link href={`/areas-we-cover/${a.slug}/`}>
                  <span className="area-name">{a.name}</span>
                  <span className="area-pc">{a.routingKey}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export const allAreaSlugs = areas.map((a) => a.slug);
