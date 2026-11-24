import type React from "react";
import Link from "next/link";
import { areaBySlug, services, site } from "@/config/site";
import type { ImageRef } from "@/config/types";
import { Picture } from "./blocks";
import { Pic } from "./Pic";

/* Generic line icons reused for tiles, service rows and process steps. */
const PATHS = [
  <path key="a" d="M3 12 12 4l9 8M6 10.5V20h12v-9.5" />,
  <path key="b" d="M3.5 14.6L14.6 3.5 20.5 9.4 9.4 20.5zM8 10l1.8 1.8M11 7l1.8 1.8" />,
  <path key="c" d="M12 3c3 4 5.5 6.5 5.5 10a5.5 5.5 0 11-11 0C6.5 9.5 9 7 12 3z" />,
  <path key="d" d="M12 3l7 3v5.5c0 4.3-2.9 7.6-7 9.5-4.1-1.9-7-5.2-7-9.5V6zM9 12l2 2 4-4" />,
  <path key="e" d="M4 20V9l8-5 8 5v11M9 20v-6h6v6" />,
  <path key="f" d="M3.5 8.5h17M3.5 15.5h17M8 4v16M16 4v16" />,
  <path key="g" d="M6.5 3.5h3l1.5 4-2 1.4a11.5 11.5 0 006.1 6.1l1.4-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.5 5.7a2 2 0 012-2.2z" />,
  <path key="h" d="M4 18h16M6 18V8l6-4 6 4v10M10 18v-5h4v5" />,
  <path key="i" d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
];

export function LineIcon({ n }: { n: number }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {PATHS[n % PATHS.length]}
    </svg>
  );
}

/* ---------- services grid (home, services index, areas index) ---------- */

export function ServicesGrid() {
  return (
    <section className="nx-section nx-dark nx-sgrid" aria-labelledby="sgrid-h">
      <div className="nx-sgrid-media">
        <Pic image={site.images.servicesGrid} sizes="(max-width: 1080px) 100vw, 50vw" className="nx-sgrid-img" />
      </div>
      <div className="nx-sgrid-body">
        <p className="nx-eyebrow">Our services</p>
        <h2 className="nx-title" id="sgrid-h">
          One roofing contractor. <em className="accent-serif">Every roof problem.</em>
        </h2>
        <ul className="nx-sgrid-list">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}/`}>
                <span className="nx-sgrid-icon" aria-hidden="true">
                  <LineIcon n={i} />
                </span>
                <strong>{s.title}</strong>
                <span>{s.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link className="nx-btn nx-btn-volt" href="/services/">
          Explore all services
          <span className="nx-btn-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

/* ---------- process ---------- */

export function ProcessSplit({ image = site.images.process }: { image?: ImageRef } = {}) {
  return (
    <section className="nx-section nx-dark ir-process" aria-labelledby="psplit-h">
      <div className="ir-process-bg" aria-hidden="true">
        <Pic image={image} sizes="100vw" className="ir-process-img" />
      </div>
      <div className="nx-wrap ir-process-inner">
        <header className="ir-process-head">
          <p className="nx-eyebrow">Our process</p>
          <h2 className="nx-title" id="psplit-h">
            From first call to guarantee, five simple steps
          </h2>
        </header>
        <ol className="ir-steps">
          {site.process.map((p, i) => (
            <li key={p.title} style={{ "--i": i } as React.CSSProperties}>
              <span className="ir-step-node">
                <span className="ir-step-icon" aria-hidden="true">
                  <LineIcon n={i + 3} />
                </span>
                <span className="ir-step-num">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- areas by group ---------- */

export function CountiesBlock({ page = false }: { page?: boolean }) {
  return (
    <div className={`nx-counties${page ? " nx-counties-page" : ""}`}>
      {site.areaGroups.map((g) => (
        <div className="nx-county" key={g.name}>
          <h3>
            {g.name} <span>{g.slugs.length} areas</span>
          </h3>
          <ul>
            {g.slugs.map((s) => {
              const a = areaBySlug(s);
              return a ? (
                <li key={s}>
                  <Link href={`/areas-we-cover/${a.slug}/`}>{a.name}</Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ---------- quote funnel (4 steps, mailto/tel hand-off, see SiteBehaviors) ---------- */

export function QuoteFunnel({ title = "Get your free roof quote", sub = "Tell us about the roof and we will come and look at it. Fair quote, no hard sell." }: { title?: string; sub?: string }) {
  const tiles = [...services.map((s) => s.label), "Something else"];
  return (
    <div className="form-wrap qf" id="enquiry" data-funnel="">
      <div className="qf-top">
        <h2 className="qf-title">{title}</h2>
        <p className="qf-sub">{sub}</p>
        <div className="qf-progress" aria-hidden="true">
          <span className="qf-progress-bar">
            <span />
          </span>
          <span className="qf-progress-text">
            Step <b data-qf-current="">1</b> of 4
          </span>
        </div>
      </div>
      <div className="form-live" role="alert" aria-live="assertive" aria-atomic="true" />
      <form className="lead-form qf-form" noValidate>
        <fieldset className="qf-step" data-step="1">
          <legend className="qf-q">
            <span className="qf-q-num" aria-hidden="true">
              1
            </span>
            What do you need?
          </legend>
          <div className="qf-tiles">
            {tiles.map((t, i) => (
              <label className="qf-tile" key={t}>
                <input type="radio" name="service" value={t} />
                <span className="qf-tile-inner">
                  <span className="qf-tile-icon" aria-hidden="true">
                    <LineIcon n={i} />
                  </span>
                  <span className="qf-tile-label">{t}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="qf-step" data-step="2">
          <legend className="qf-q">
            <span className="qf-q-num" aria-hidden="true">
              2
            </span>
            What is happening?
          </legend>
          <div className="qf-tiles qf-tiles-wide">
            {site.funnel.enquiryTypes.map((t, i) => (
              <label className="qf-tile" key={t}>
                <input type="radio" name="enquiry" value={t} />
                <span className="qf-tile-inner">
                  <span className="qf-tile-icon" aria-hidden="true">
                    <LineIcon n={i + 2} />
                  </span>
                  <span className="qf-tile-label">{t}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="qf-step" data-step="3">
          <legend className="qf-q">
            <span className="qf-q-num" aria-hidden="true">
              3
            </span>
            Where is the property?
          </legend>
          <div className="field">
            <label htmlFor="c_eircode">Eircode</label>
            <input type="text" id="c_eircode" name="eircode" autoComplete="postal-code" defaultValue="" placeholder="D14 W2Y4" data-qf-required="Please enter your Eircode so we can check we cover it." />
            <span className="field-err" id="c_eircode_err" hidden />
          </div>
          <div className="field">
            <label htmlFor="c_message">
              Tell us about the roof <span className="opt">optional</span>
            </label>
            <textarea id="c_message" name="message" rows={4} />
            <p className="qf-hint">A leak, loose tiles, a flat roof, a skylight? A line or two is plenty.</p>
          </div>
        </fieldset>
        <fieldset className="qf-step" data-step="4">
          <legend className="qf-q">
            <span className="qf-q-num" aria-hidden="true">
              4
            </span>
            How should we reach you?
          </legend>
          <div className="qf-summary" data-qf-summary="" hidden />
          <div className="field">
            <label htmlFor="c_name">
              Your name{" "}
              <span className="req" aria-hidden="true">
                *
              </span>
            </label>
            <input type="text" id="c_name" name="name" autoComplete="name" required defaultValue="" />
            <span className="field-err" id="c_name_err" hidden />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="c_phone">
                Telephone{" "}
                <span className="req" aria-hidden="true">
                  *
                </span>
              </label>
              <input type="tel" id="c_phone" name="phone" autoComplete="tel" inputMode="tel" required defaultValue="" placeholder="086 123 4567" />
              <span className="field-err" id="c_phone_err" hidden />
            </div>
            <div className="field">
              <label htmlFor="c_email">
                Email <span className="opt">optional</span>
              </label>
              <input type="email" id="c_email" name="email" autoComplete="email" defaultValue="" />
              <span className="field-err" id="c_email_err" hidden />
            </div>
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
        </fieldset>
        <div className="qf-nav">
          <button type="button" className="qf-back" data-qf-back="" hidden>
            <span aria-hidden="true">←</span> Back
          </button>
          <button type="button" className="nx-btn nx-btn-volt qf-next" data-qf-next="">
            Continue <span aria-hidden="true">→</span>
          </button>
          <button type="submit" className="nx-btn nx-btn-volt qf-submit" data-qf-submit="">
            Send my quote request <span aria-hidden="true">→</span>
          </button>
          <p className="privacy-note">We use your name and contact details only to quote and respond. We never sell your data.</p>
        </div>
        <p className="qf-skip-note" data-qf-skipnote="" hidden>
          Not sure? You can skip this step.
        </p>
        <p className="qf-sent" data-qf-sent="" role="status" hidden>
          Your email app should open with the details filled in. Prefer to talk? Call{" "}
          <a href={`tel:${site.business.phone.tel}`}>{site.business.phone.display}</a>.
        </p>
      </form>
    </div>
  );
}

export { Picture };
