import type { ReactNode } from "react";
import { SiteBehaviors } from "@/components/sites/amroofing/SiteBehaviors";
import { CookieBarMarkup } from "@/components/sites/amroofing/sections/CookieBarMarkup";
import { Footer } from "@/components/sites/amroofing/sections/Footer";
import { SiteHeaderMarkup } from "@/components/sites/amroofing/sections/SiteHeaderMarkup";
import { StickyCta } from "@/components/sites/amroofing/sections/StickyCta";

type PageShellProps = {
  children: ReactNode;
  /** Where the sticky "Request a survey" button points (the contact page uses its own form). */
  surveyHref?: string;
};

/** Header, footer, sticky CTA, cookie bar and behaviours shared by every inner page. */
export function PageShell({ children, surveyHref }: PageShellProps) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeaderMarkup />
      {children}
      <Footer />
      <StickyCta surveyHref={surveyHref} />
      <CookieBarMarkup />
      <SiteBehaviors />
    </>
  );
}
