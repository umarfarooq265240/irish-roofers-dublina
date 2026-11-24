import Link from "next/link";
import { phoneHref, site } from "@/config/site";
import { Wordmark } from "../blocks";
import { LangToggle } from "../LangToggle";

/** Shorter Irish menu labels (the full phrases are used elsewhere on the page). */
const NAV_GA: Record<string, string> = { "Areas we cover": "Ceantair", "Roofing advice": "Comhairle" };

export function SiteHeaderMarkup() {
  return (
    <header className="nx-header" id="site-header">
      <div className="nx-wrap nx-header-inner">
        <Link className="nx-brand" href="/">
          <Wordmark />
        </Link>
        <nav className="nx-nav primary-nav" id="primary-nav" aria-label="Primary">
          <ul className="nav-list">
            {site.nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} data-ga={NAV_GA[n.label]}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          {" "}
          <div className="nx-nav-foot">
            <Link className="nx-btn nx-btn-volt" href="/contact/#enquiry">
              Get a free quote
            </Link>
            <a className="nx-nav-phone" href={phoneHref}>
              {site.business.phone.display}
            </a>
          </div>
        </nav>
        <div className="nx-header-actions">
          <a className="nx-header-phone" href={phoneHref} aria-label={`Call ${site.business.phone.display}`}>
            <span className="nx-header-phone-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M6.5 3.5h3l1.5 4-2 1.4a11.5 11.5 0 006.1 6.1l1.4-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.5 5.7a2 2 0 012-2.2z" />
              </svg>
            </span>
            <span>
              {site.business.phone.display}
            </span>
          </a>
          <LangToggle />
          <Link className="nx-btn nx-btn-volt nx-btn-sm" href="/contact/#enquiry">
            Free quote
          </Link>
          <button className="nav-toggle nx-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open the menu">
            <span className="nx-toggle-bars" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
