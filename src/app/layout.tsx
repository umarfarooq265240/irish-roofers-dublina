import type { Metadata } from "next";
import "./globals.css";
import "@/components/sites/amroofing/amroofing.css";
import { JsonLd } from "@/components/sites/amroofing/JsonLd";
import { site } from "@/config/site";
import { businessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: { default: site.seo.defaultTitle, template: `%s` },
  description: site.seo.defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
    siteName: site.business.name,
    locale: "en_IE",
    type: "website",
    images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: site.images.hero.alt }],
  },
  twitter: { card: "summary_large_image", title: site.seo.defaultTitle, images: [site.seo.ogImage] },
};

// The theme hides reveal targets only once JS is confirmed (`.has-js`).
const hasJs = "document.documentElement.classList.add('has-js')";
const brandVars = `:root{--accent:${site.brand.accent};--volt:${site.brand.accent};--accent-rgb:${site.brand.accentRgb};--accent-ink:${site.brand.accentInk};--accent-text:${site.brand.accentText}}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IE" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: hasJs }} />
        <script src={`/sites/${site.assetDir}/i18n/translate.js`} defer />
        <style dangerouslySetInnerHTML={{ __html: brandVars }} />
      </head>
      <body className="wp-theme-am-roofing-services">
        <JsonLd data={businessSchema()} />
        {children}
      </body>
    </html>
  );
}
