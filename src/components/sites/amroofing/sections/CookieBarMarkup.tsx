 
// Ported from https://www.amroofingservices.co.uk/ (static markup).
import Link from "next/link";

export function CookieBarMarkup() {
  return (
    <div className="cookie-bar" id="cookie-bar" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-desc" hidden>
      <div className="cookie-inner">
        <div className="cookie-copy">
          <h2 id="cookie-title">
            We use cookies on this website
          </h2>
          <p id="cookie-desc">
            {"Strictly necessary cookies keep the site working and are always on. Analytics and marketing cookies only load if you allow them. You can change your choice at any time from the Cookie Settings link in the footer. "}
            <Link href="/cookie-policy/">
              Cookie Policy
            </Link>
            {" and "}
            <Link href="/privacy-policy/">
              Privacy Policy
            </Link>
            {". "}
          </p>
        </div>
        <div className="cookie-actions">
          <button type="button" className="btn btn-accent" data-cookie="accept">
            Accept all
          </button>
          <button type="button" className="btn btn-ghost" data-cookie="reject">
            Reject all
          </button>
          <button type="button" className="btn btn-link" data-cookie="manage" aria-expanded="false" aria-controls="cookie-prefs">
            Manage preferences
          </button>
        </div>
        <div className="cookie-prefs" id="cookie-prefs" hidden>
          <fieldset>
            <legend className="sr-only">
              Cookie categories
            </legend>
            <div className="cookie-cat">
              <label className="check">
                <input type="checkbox" defaultChecked disabled />
                <span>
                  <strong>
                    Strictly necessary
                  </strong>
                  , always on. Keeps the site working, remembers your cookie choice and protects the enquiry forms. These cannot be switched off.
                </span>
              </label>
            </div>
            <div className="cookie-cat">
              <label className="check">
                <input type="checkbox" id="cookie-analytics" />
                <span>
                  <strong>
                    Analytics
                  </strong>
                  . Helps us see which pages are useful so we can improve them. Nothing is loaded until you allow it.
                </span>
              </label>
            </div>
            <div className="cookie-cat">
              <label className="check">
                <input type="checkbox" id="cookie-marketing" />
                <span>
                  <strong>
                    Marketing
                  </strong>
                  . Supports advertising measurement and remarketing. Nothing is loaded until you allow it.
                </span>
              </label>
            </div>
          </fieldset>
          <button type="button" className="btn btn-accent" data-cookie="save">
            Save my choices
          </button>
        </div>
      </div>
    </div>
  );
}
