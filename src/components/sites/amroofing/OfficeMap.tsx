"use client";

import { useState } from "react";

const OFFICES = [
  { key: "dublin-14", name: "Main office, Dublin 14", q: "53.2914577,-6.2603759", address: "Nutgrove Office Park, E2, Meadow Park Ave, Dublin 14, D14 W2Y4" },
  { key: "clontarf", name: "Clontarf, Dublin 3", q: "57 Clontarf Rd, Clontarf West, Dublin 3, D03 A7P0, Ireland", address: "57 Clontarf Rd, Clontarf West, Dublin 3, D03 A7P0" },
  { key: "stoneybatter", name: "Stoneybatter, Dublin 7", q: "1A Mount Temple Rd, Stoneybatter, Dublin, D07 F898, Ireland", address: "1A Mount Temple Rd, Stoneybatter, Dublin, D07 F898" },
] as const;

/** Contact page: pick an office and the map moves to it. */
export function OfficeMap() {
  const [i, setI] = useState(0);
  const o = OFFICES[i];
  const src = `https://www.google.com/maps?q=${encodeURIComponent(o.q)}&z=15&output=embed`;
  const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.q)}`;
  return (
    <section className="nx-section ir-officemap" aria-labelledby="om-h">
      <div className="nx-wrap ir-officemap-grid">
        <div className="ir-officemap-copy">
          <p className="nx-eyebrow">Find us</p>
          <h2 className="nx-title" id="om-h">
            Locate our <em className="accent-serif">offices</em>
          </h2>
          <p className="nx-lead">Choose an office to see where it is on the map. We come to you for inspections and quotes, so you never need to visit an office to get started.</p>
          <div className="ir-officemap-tabs" role="group" aria-label="Choose an office">
            {OFFICES.map((x, n) => (
              <button key={x.key} type="button" className={n === i ? "is-active" : ""} aria-pressed={n === i} onClick={() => setI(n)}>
                {x.name}
              </button>
            ))}
          </div>
          <p className="ir-officemap-address">{o.address}</p>
          <a className="nx-textlink" href={link} target="_blank" rel="noopener noreferrer">
            Open in Google Maps <span aria-hidden="true">→</span>
            <span className="sr-only"> (opens in a new window)</span>
          </a>
        </div>
        <div className="ir-officemap-frame">
          <iframe key={o.key} title={`Map showing the ${o.name} office`} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}
