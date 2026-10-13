import type { Metadata, Viewport } from "next";

import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/geist/wght.css";
import "./globals.css";

import { Providers } from "@/components/providers";
import { seo } from "@/lib/seo";
import { practice } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(practice.url),
  title: {
    default: seo.title,
    template: "%s | Laudina Pongrácz, Psychotherapie Wien",
  },
  description: seo.description,
  applicationName: seo.siteName,
  authors: [{ name: practice.name, url: practice.url }],
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    locale: "de_AT",
    siteName: seo.siteName,
    title: seo.title,
    description: seo.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = {
  themeColor: "#f2f3ee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-AT" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {/* Ohne JavaScript bleiben die Einblend-Animationen aus; der Inhalt ist trotzdem sichtbar. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-moos focus:px-5 focus:py-3 focus:text-papier"
        >
          Zum Inhalt springen
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
