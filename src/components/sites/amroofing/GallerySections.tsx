import { phoneHref, site } from "@/config/site";
import { AnswerFirst } from "./blocks";
import { BeforeAfterGrid, GalleryGrid } from "./gallery";

/** The photo gallery and the before/after sliders. They live on the Services page (the separate Gallery page was removed). */
export function GallerySections() {
  return (
    <>
      <section className="section" aria-labelledby="gal-h">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            Our work
          </p>
          <h2 className="section-title" id="gal-h">
            Roofing gallery
          </h2>
          <AnswerFirst>
            A selection of the roofs we repair and replace in Dublin: natural slate, concrete and clay tiles, flat roofs, chimneys with new lead flashing, and skylights. Tap a photo to see it larger, then use the sliders below to compare a roof before and after the work.
          </AnswerFirst>
          <GalleryGrid />
        </div>
      </section>
      <section className="section band" aria-labelledby="ba-h">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            Before and after
          </p>
          <h2 className="section-title" id="ba-h">
            See the difference a proper repair makes
          </h2>
          <p className="ir-ba-intro">
            Drag the handle left and right on each photo. Want the same result on your roof? <a href="/contact/#enquiry">Request a free quote</a> or call <a href={phoneHref}>{site.business.phone.display}</a>.
          </p>
          <BeforeAfterGrid />
        </div>
      </section>
    </>
  );
}
