import { areas, articles, formatDate, phoneHref, site } from "@/config/site";
import { AnswerFirst, CtaPanel, PageHero, ReviewsBand, TrustStrip } from "../blocks";
import { Guarantee30 } from "../blocks4";
import { CountiesBlock, ProcessSplit, ServicesGrid } from "../blocks2";
import { AccreditationsRow, RecentWork } from "../blocks3";
import { GallerySections } from "../GallerySections";
import { ServiceGroups } from "../ServiceGroups";
import { PhotoGallery } from "../PhotoGallery";
import { VideoEmbed } from "../VideoEmbed";
import { adviceMore } from "@/config/content/adviceMore";

export function ServicesIndexPage() {
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <PageHero
        eyebrow="What we do"
        title="Roofing services in Dublin"
        sub="Roof repairs, leak detection, slate and tiled roofs, flat roofs, chimneys and skylights, with a 10-year guarantee."
        image={site.images.services}
        crumbs={[{ label: "Services" }]}
      />
      <TrustStrip />
      <ServicesGrid />
      <ServiceGroups />
      <ProcessSplit />
      <GallerySections />
      <AccreditationsRow />
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
      <Guarantee30 />
      <CtaPanel noStore />
    </main>
  );
}

export function AreasIndexPage() {
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <PageHero
        eyebrow="Where we work"
        title="Roofers across Dublin: areas we cover"
        sub={`Based in Dublin 14 and covering ${areas.length} areas across Dublin.`}
        image={site.images.areas}
        crumbs={[{ label: "Areas we cover" }]}
      />
      <TrustStrip />
      <section className="nx-section" aria-labelledby="areas-intro-h">
        <div className="nx-wrap">
          <header className="nx-head">
            <div className="nx-head-main">
              <p className="nx-eyebrow">{areas.length} areas, one local roofer</p>
              <h2 className="nx-title" id="areas-intro-h">
                <em className="accent-serif">Roofing</em> across south, west, north and coastal Dublin
              </h2>
            </div>
          </header>
          <AnswerFirst>
            Irish Roofers Dublin is based at Nutgrove Office Park in Dublin 14 and covers the areas below, from Rathfarnham and Dundrum to Howth and Swords. Not sure if we cover you? Call <a href={phoneHref}>{site.business.phone.display}</a> and we will tell you straight away.
          </AnswerFirst>
          <CountiesBlock page />
        </div>
      </section>
      <ProcessSplit />
      <CtaPanel />
    </main>
  );
}

export function AdviceIndexPage() {
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <PageHero
        eyebrow="Guides and answers"
        title="Roofing advice for Dublin homeowners"
        sub="Straight answers on roof costs, slate and tile, leaks, chimneys and storm damage."
        crumbs={[{ label: "Roofing advice" }]}
      />
      <TrustStrip />
      <section className="section">
        <div className="shell">
          <div className="cards">
            {articles.map((a) => (
              <article className="card" key={a.slug}>
                <div className="card-body">
                  <p className="card-meta">Updated {formatDate(a.updated)}</p>
                  <h2 className="card-title">{a.title}</h2>
                  <p>{a.excerpt}</p>
                  <details className="ir-more">
                    <summary>
                      <span className="ir-more-open">Read more</span>
                      <span className="ir-more-close">Read less</span>
                    </summary>
                    <div className="ir-more-body">
                      {(adviceMore[a.slug] ?? []).map((t) => (
                        <p key={t.slice(0, 40)}>{t}</p>
                      ))}
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaPanel />
    </main>
  );
}

export function ReviewsPage() {
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <PageHero
        eyebrow="Customer reviews"
        title="Irish Roofers Dublin reviews"
        sub={`Rated ${site.business.rating.value} from ${site.business.rating.count} Google reviews.`}
        image={site.images.reviews}
        crumbs={[{ label: "Reviews" }]}
      />
      <TrustStrip />
      <section className="section">
        <div className="shell">
          <AnswerFirst>
            Irish Roofers Dublin is rated {site.business.rating.value} out of 5 from {site.business.rating.count} Google reviews. Customers mention quick responses, fair prices with no hard sell, friendly crews, tidy work and a {site.business.guaranteeYears}-year guarantee. The reviews below are real Google reviews.
          </AnswerFirst>
          <p className="section-more">
            <a className="btn btn-outline" href={site.business.gbpUrl} target="_blank" rel="noopener noreferrer">
              See our Google reviews
            </a>
          </p>
        </div>
      </section>
      <ReviewsBand />
      <RecentWork />
      <CtaPanel />
    </main>
  );
}

export function GalleryPage() {
  return (
    <main id="main" className="site-main" tabIndex={-1}>
      <PageHero
        eyebrow="Our work"
        title="Roofing gallery"
        sub="Photos and video of roofs we have repaired and replaced across Dublin."
        crumbs={[{ label: "Gallery" }]}
      />
      <TrustStrip />
      <section className="section" aria-labelledby="gv-h">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            Watch
          </p>
          <h2 className="section-title" id="gv-h">
            See our crew at work
          </h2>
          <AnswerFirst>A short video of Irish Roofers Dublin on site. Press play to watch it here.</AnswerFirst>
          <VideoEmbed channelUrl={site.business.social.youtube} />
        </div>
      </section>
      <section className="section band" aria-labelledby="gp-h">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            Photo gallery
          </p>
          <h2 className="section-title" id="gp-h">
            Real roofs on Dublin homes and businesses
          </h2>
          <AnswerFirst>
            Flat roofs, natural slate, tiled roofs, skylights and emergency repairs. Choose a type of work to filter the photos, and tap any photo to see it larger.
          </AnswerFirst>
          <PhotoGallery />
        </div>
      </section>
      <CtaPanel />
    </main>
  );
}
