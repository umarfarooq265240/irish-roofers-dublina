import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/sites/amroofing/PageShell";
import { phoneHref, services, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found | Irish Roofers Dublin",
  description: "That page does not exist. Browse our roofing services in Dublin or call us on 086 050 8558.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell>
      <main id="main" className="site-main" tabIndex={-1}>
        <section className="section">
          <div className="shell prose">
            <p className="eyebrow">Error 404</p>
            <h1>Sorry, we could not find that page</h1>
            <p>The link may be old or mistyped. Try one of these, or call {site.business.name} on {site.business.phone.display} and we will help straight away.</p>
            <ul className="ticks">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/services/">All roofing services</Link>
              </li>
              {services.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`}>{s.title} in Dublin</Link>
                </li>
              ))}
              <li>
                <Link href="/areas-we-cover/">Areas we cover</Link>
              </li>
              <li>
                <Link href="/contact/">Contact us</Link>
              </li>
            </ul>
            <p>
              <a className="nx-btn nx-btn-volt" href={phoneHref}>
                Call {site.business.phone.display}
              </a>
            </p>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
