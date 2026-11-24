import Link from "next/link";
import { audiences, credentialChips, director, membership, partners, recentWork } from "@/config/content/sections";
import { phoneHref, site } from "@/config/site";
import { LineIcon } from "./blocks2";
import { Pic } from "./Pic";

/** Home: "Who we work with" (the reference's four audiences). */
export function WhoWeWorkWith() {
  return (
    <section className="nx-section nx-clients" aria-labelledby="clients-h">
      <div className="nx-wrap nx-clients-grid">
        <div className="nx-clients-copy">
          <p className="nx-eyebrow">Who we work with</p>
          <h2 className="nx-title" id="clients-h">
            Roofing for jobs that need <em className="accent-serif">doing right</em>.
          </h2>
          <p className="nx-sub">The standard never changes, but the paperwork, programme and point of contact do. We work the way each customer needs us to.</p>
          <Link className="nx-textlink" href="/services/">
            View our services <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="nx-client-cards">
          {audiences.map((a, i) => (
            <li className="nx-client-card" key={a.title}>
              <span className="nx-client-media" aria-hidden="true">
                <Pic image={a.image} className="nx-client-img" alt="" />
              </span>
              <span className="nx-client-body">
                <span className="nx-client-icon" aria-hidden="true">
                  <LineIcon n={i} />
                </span>
                <strong>{a.title}</strong>
                <span>{a.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="nx-rail-hint">Swipe for more</p>
      </div>
    </section>
  );
}

/** "Recent work" cards. DUMMY data in src/config/content/sections.ts until real jobs are supplied. */
export function RecentWork() {
  return (
    <section className="nx-section nx-work2" id="projects" aria-labelledby="work2-h">
      <div className="nx-wrap">
        <div className="nx-work2-head">
          <div>
            <p className="nx-eyebrow">Recent work</p>
            <h2 className="nx-title" id="work2-h">
              Quality roofing. <em className="accent-serif">Real results.</em>
            </h2>
          </div>
          <Link className="nx-textlink" href="/services/">
            Explore our services <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="nx-work2-grid ir-work4">
          {recentWork.map((w) => (
            <li className="nx-work2-card" key={w.title}>
              <Link href="/services/">
                <span className="nx-work2-media">
                  <Pic image={w.image} className="nx-work2-img" alt={w.image.alt} sizes="(max-width: 700px) 85vw, 25vw" />
                </span>
                <span className="nx-work2-body">
                  <strong>{w.title}</strong>
                  <span className="nx-work2-tags">
                    {w.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
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

/** Accreditations and partner logos (the client's own logos), with the CIF / RCCA membership statement. */
export function AccreditationsRow() {
  return (
    <section className="nx-section nx-accred-row" aria-label="Our accreditations and partners">
      <div className="nx-wrap">
        <p className="nx-eyebrow">Our accreditations and partners</p>
        <div className="accred-foot is-light">
          <ul className="accred-foot-logos ir-partner-logos">
            {partners.map((p) => (
              <li key={p.name}>
                <span className="accred-foot-tile">
                  <span className="accred-foot-plate">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="accred-foot-logo" src={p.src} alt={p.name} width={p.width} height={p.height} loading="lazy" decoding="async" />
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="ir-membership">{membership}</p>
          <ul className="accred-foot-chips">
            {credentialChips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** About: "Meet the director". DUMMY bio and image until the client supplies them. */
export function MeetTheDirector() {
  return (
    <section className="section director" aria-labelledby="director-h">
      <div className="shell director-grid">
        <div className="director-media">
          <Pic image={director.image} alt={director.image.alt} sizes="(max-width: 900px) 90vw, 40vw" />
          <span className="director-badge" aria-hidden="true" />
        </div>
        <div className="director-copy">
          <p className="eyebrow">Meet the director</p>
          <h2 id="director-h" className="section-title">
            {director.name}
          </h2>
          <p className="director-role">{director.role}</p>
          {director.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <blockquote className="director-quote">
            <p>{director.quote}</p>
          </blockquote>
          <div className="director-actions">
            <Link className="btn btn-accent" href="/contact/#enquiry">
              Discuss your roof
            </Link>
            <a className="hero-call director-call" href={phoneHref}>
              Call {site.business.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
