import { site, telLink } from "@/config/site";
import type { ImageRef } from "@/config/types";
import { Pic } from "./Pic";

const SHOP = {
  name: "The Roofing Shop",
  url: "https://theroofingshop.ie/",
  logo: `/sites/${site.assetDir}/images/roofing-shop-logo.png`,
  address: ["Unit 4, Glasnevin Business Centre", "Ballyboggan Road", "Dublin 11, D11 X863"],
};

/** Home and main pages (not Services): the client's own roofing supplies store. Placed above the "Let's talk" panel. */
export function RoofingStore() {
  return (
    <section className="nx-section ir-store" aria-labelledby="store-h">
      <div className="nx-wrap ir-store-grid">
        <div className="ir-store-copy">
          <p className="nx-eyebrow">Roofing supplies</p>
          <h2 className="nx-title" id="store-h">
            Our Roofing <em className="accent-serif">Supplies Store</em>
          </h2>
          <p className="nx-lead">Get top quality roofing supplies delivered nationwide, with support 24/7. Slates, tiles, membranes, flashings and everything your roof needs, from our own store in Dublin.</p>
        </div>
        <div className="ir-store-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SHOP.logo} alt={SHOP.name} width="172" height="37" loading="lazy" decoding="async" />
        </div>
        <div className="ir-store-side">
          <address className="ir-store-address">
            <strong>{SHOP.name}</strong>
            {SHOP.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <a className="nx-btn nx-btn-volt nx-btn-lg" href={SHOP.url} target="_blank" rel="noopener noreferrer">
            Visit the store
            <span className="nx-btn-arrow" aria-hidden="true">
              →
            </span>
            <span className="sr-only"> (theroofingshop.ie, opens in a new window)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/** Home hero badge: replaces the Google rating medal. */
export function FamilyBadge() {
  return (
    <div className="ir-family">
      <div className="nx-award" role="img" aria-label={`Third generation family owned. Established in ${site.business.established}.`}>
        <span className="nx-award-medal" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8z" />
          </svg>
        </span>
        <span className="nx-award-copy" aria-hidden="true">
          <span className="nx-award-label">Since {site.business.established}</span>
          <span className="nx-award-name">Third generation family owned</span>
          <span className="nx-award-body">Established in {site.business.established}</span>
        </span>
      </div>
      <h2 className="ir-family-title">Roofing is the family trade</h2>
      <p>Irish Roofers Dublin was established in {site.business.established} and is now run by the third generation of the same family. Three generations on Dublin roofs have taught us that a good roof comes down to care, not shortcuts.</p>
      <p>Today our three Dublin offices look after homeowners, developers and main contractors with honest inspections, fair quotes and work we guarantee. When you call, you speak to a roofer, not a call centre.</p>
    </div>
  );
}

/** Services pages only. */
export function Guarantee30() {
  return (
    <section className="nx-section ir-guarantee30" aria-labelledby="g30-h">
      <div className="nx-wrap">
        <p className="nx-eyebrow">Guarantee</p>
        <h2 className="nx-title" id="g30-h">
          A full written <em className="accent-serif">30 year guarantee</em> on all new roofs
        </h2>
        <p className="nx-lead">Every repair carries a {site.business.guaranteeYears} year guarantee, and every new roof comes with a full written 30 year guarantee.</p>
      </div>
    </section>
  );
}

const ICON = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const GoogleG = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.3v3.1A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8z" />
    <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.7 1.8l3.5-3.5A12 12 0 0 0 1.3 6.6l4 3.1C6.2 6.9 8.9 4.8 12 4.8z" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" {...ICON}>
    <path d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 10-13 0C5.5 15 12 21 12 21z" />
    <circle cx="12" cy="10.5" r="2.5" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" {...ICON}>
    <path d="M6.5 3.5h3l1.5 4-2 1.4a11.5 11.5 0 006.1 6.1l1.4-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.5 5.7a2 2 0 012-2.2z" />
  </svg>
);
const MobileIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" {...ICON}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
    <path d="M11 18.5h2" />
  </svg>
);

const OFFICE_PHOTOS: Record<string, ImageRef> = {
  "dublin-14": site.images.aboutSection,
  clontarf: site.images.contactSide,
  stoneybatter: site.images.processAbout,
};

const CLONTARF_REVIEWS = [
  { author: "Marcus Dunbar", text: "We had a great experience with Irish Roofers Dublin 3. The team was professional punctual and explained the roofing work clearly. They worked efficiently and paid excellent attention to detail throughout the job." },
  { author: "Julian Ashe", text: "Would highly recommend Alan and the Team. They removed an old asbestos garden shed roof and replaced it with a new roof. They were quick, tidy and friendly (and finished earlier than expected)." },
  { author: "Bryan Murphy", text: "I called Irish Roofers to assess my roof after noticing major leaks from the storms. Dealt with Alan who is a complete gentleman." },
];

/** Contact page: the three Google Business Profile locations. Location phone numbers appear only here. */
export function LocationsSection() {
  return (
    <section className="nx-section ir-locations" aria-labelledby="loc-h">
      <div className="nx-wrap">
        <header className="nx-head">
          <div className="nx-head-main">
            <p className="nx-eyebrow">Our locations</p>
            <h2 className="nx-title" id="loc-h">
              Three Dublin offices, <em className="accent-serif">one family firm</em>
            </h2>
          </div>
          <p className="nx-sub">Third generation family owned and established in {site.business.established}. Call or visit the office nearest you.</p>
        </header>
        <ul className="ir-loc-grid">
          {site.business.locations.map((l) => (
            <li className="ir-loc-card" key={l.key}>
              <div className="ir-loc-photo">
                <Pic image={OFFICE_PHOTOS[l.key]} sizes="(max-width: 1000px) 100vw, 380px" className="ir-loc-img" alt="" />
              </div>
              <div className="ir-loc-body">
                <h3 className="ir-loc-name">{l.name}</h3>
                <div className="ir-loc-meta">
                  <p className="ir-loc-years">{l.years} years of experience</p>
                  {l.rating ? (
                    <p className="ir-loc-rating">
                      <GoogleG />
                      <span className="ir-loc-stars" aria-hidden="true">
                        ★★★★★
                      </span>
                      <strong>{l.rating.value}</strong>
                      <span>{l.rating.count} reviews</span>
                    </p>
                  ) : null}
                </div>
                <address className="ir-loc-address">
                  <PinIcon />
                  <span>
                    {l.address.map((a) => (
                      <span key={a}>{a}</span>
                    ))}
                  </span>
                </address>
                <ul className="ir-loc-contact">
                  <li>
                    <PhoneIcon />
                    <span className="ir-loc-label">Telephone</span>
                    <a href={telLink(l.tel)}>{l.tel}</a>
                  </li>
                  {l.mob ? (
                    <li>
                      <MobileIcon />
                      <span className="ir-loc-label">Mobile</span>
                      <a href={telLink(l.mob)}>{l.mob}</a>
                    </li>
                  ) : null}
                </ul>
                {l.hours ? (
                  <p className="ir-loc-open">
                    <span className="ir-loc-dot" aria-hidden="true" />
                    {l.hours}
                  </p>
                ) : null}
                {l.key === "clontarf" ? (
                  <details className="ir-loc-reviews">
                    <summary>Recent Google reviews</summary>
                    <ul aria-label="Google reviews for the Clontarf office">
                      {CLONTARF_REVIEWS.map((r) => (
                        <li key={r.author}>
                          <p>“{r.text}”</p>
                          <strong>{r.author}</strong>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
                <a className="ir-loc-btn" href={l.mapUrl} target="_blank" rel="noopener noreferrer">
                  <PinIcon />
                  Directions on Google Maps
                  <span className="sr-only"> (opens in a new window)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const MARQUEE_ITEMS = ["Roof repair", "Roof replacement", "Leak repair", "Slate roofs", "Tiled roofs", "Flat roofs", "Chimney repairs", "Skylights", "Emergency repairs", "Free roof inspection", "Third generation family owned"];

/** Straight scrolling services band under the hero. Decorative: hidden from assistive tech, paused for reduced motion. */
export function Marquee() {
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="ir-marquee" aria-hidden="true">
      <div className="ir-marquee-track">
        {loop.map((t, i) => (
          <span key={`${t}-${i}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}
