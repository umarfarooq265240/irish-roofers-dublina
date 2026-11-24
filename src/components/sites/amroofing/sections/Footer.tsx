import Link from "next/link";
import type React from "react";
import { areaBySlug, fullAddress, hasEmail, mailHref, phoneHref, services, site } from "@/config/site";
import { Wordmark } from "../blocks";

const ICONS: Record<string, React.ReactNode> = {
  facebook: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M14.5 8.5V6.9c0-.8.3-1.4 1.4-1.4h1.4V2.6c-.6-.1-1.5-.2-2.5-.2-2.5 0-4.1 1.5-4.1 4.3v1.8H8.2v3h2.5v8h3.8v-8h2.6l.4-3z" stroke="none" fill="currentColor" />
                </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.6" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17" cy="7" r="1.1" stroke="none" fill="currentColor" />
                </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="2.2" />
                  <path d="M7.6 10.5v6.2M7.6 7.6v.1" />
                  <path d="M11.6 16.7v-6.2M11.6 13.2c0-1.6 1-2.7 2.4-2.7s2.4 1 2.4 2.7v3.5" />
                </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="6" width="18" height="12" rx="3.5" />
      <path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M14 3.5v10.9a3.4 3.4 0 11-3.4-3.4c.4 0 .7 0 1 .1" />
                  <path d="M14 3.5c.4 2.4 2 4 4.4 4.2" />
                </svg>
  ),
  google: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M20.5 12.2c0-.7-.1-1.3-.2-1.9H12v3.7h4.8a4.1 4.1 0 01-1.8 2.7v2.2h2.9c1.7-1.6 2.6-4 2.6-6.7z" />
                  <path d="M12 21c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H3.9v2.3A9 9 0 0012 21z" />
                  <path d="M6.9 13.7a5.4 5.4 0 010-3.4V8H3.9a9 9 0 000 8z" />
                  <path d="M12 6.6c1.3 0 2.5.5 3.5 1.4l2.6-2.6A9 9 0 003.9 8l3 2.3C7.6 8.2 9.6 6.6 12 6.6z" />
                </svg>
  ),
};

const SOCIAL_LABEL: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  twitter: "X (Twitter)",
  youtube: "YouTube",
};

export function Footer() {
  const b = site.business;
  const social = Object.entries(b.social).filter(([, url]) => url);
  return (
    <footer className="site-footer nx-footer">
      <div className="nx-wrap footer-top">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <Wordmark />
          </Link>
          <p className="footer-about">
            {b.name} is a roofing contractor based in Dublin 14 and covering Dublin. Roof repairs, leaks, slate and tiled roofs, flat roofs, chimneys and skylights, open 24 hours, with a {b.guaranteeYears}-year guarantee.
          </p>
          <ul className="footer-social">
            {social.map(([k, url]) => (
              <li key={k}>
                <a href={url} rel="noopener" target="_blank">
                  <span className="sr-only">{SOCIAL_LABEL[k]}, opens in a new window</span>
                  {ICONS[k]}
                </a>
              </li>
            ))}
            <li>
              <a href={b.gbpUrl} rel="noopener" target="_blank">
                <span className="sr-only">Google Business Profile, opens in a new window</span>
                {ICONS.google}
              </a>
            </li>
          </ul>
          {/* TODO(client): add accreditation badges here once the client supplies real ones. */}
        </div>
        <div className="footer-col">
          <h2 className="footer-h">Roofing services</h2>
          <ul className="footer-list">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <details className="footer-disclosure" open>
            <summary>
              <h2 className="footer-h">Areas we cover</h2>
            </summary>
            <ul className="footer-list footer-areas">
              {site.topAreaSlugs.map((s) => {
                const a = areaBySlug(s);
                return a ? (
                  <li key={s}>
                    <Link href={`/areas-we-cover/${a.slug}/`}>{a.name}</Link>
                  </li>
                ) : null;
              })}
              <li>
                <Link href="/areas-we-cover/">All areas</Link>
              </li>
            </ul>
          </details>
        </div>
        <div className="footer-col footer-contact">
          <h2 className="footer-h">Contact</h2>
          <p>
            <a className="footer-phone" href={phoneHref}>
              {b.phone.display}
            </a>
          </p>
          {hasEmail ? (
            <p>
              <a href={mailHref}>{b.email}</a>
            </p>
          ) : null}
          <p className="footer-address">{fullAddress}</p>
          <h3 className="footer-h-sm">Opening hours</h3>
          <ul className="footer-hours">
            <li>{b.hours.text}, every day</li>
          </ul>
          <p className="footer-ins">{b.guaranteeYears}-year guarantee on our work</p>
          <p>
            <a className="footer-gbp" href={b.gbpUrl} rel="noopener" target="_blank">
              Read our {b.rating.count} Google reviews
            </a>
          </p>
        </div>
      </div>
      <div className="nx-wrap footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} {b.legalName}. All rights reserved.
        </p>
        <nav className="legal-nav" aria-label="Legal">
          <ul className="legal-list" id="menu-legal">
            {site.legalNav.map((l) => (
              <li className="menu-item" key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <button type="button" className="cookie-reopen" data-cookie="reopen">
            Cookie Settings
          </button>
        </nav>
      </div>
      <div className="nx-footer-mark" aria-hidden="true" style={{ "--foot-logo": "url('/sites/irishroofers/images/logo-irish-roofers-dublin.svg')" } as React.CSSProperties} />
    </footer>
  );
}
