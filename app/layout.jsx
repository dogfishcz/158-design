import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL, SITE_NAME, ORGANIZATION_JSONLD, jsonLd } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MANDÍK a.s., český výrobce vzduchotechniky, požární techniky a průmyslového vytápění",
  description:
    "Největší český výrobce vzduchotechnických komponentů a požární techniky. Požární klapky, vzduchotechnické jednotky, průmyslové vytápění a speciální aplikace. Rodinná firma od roku 1990, dodávky do 32 zemí.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "cs_CZ",
    url: SITE_URL,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Saira+Semi+Condensed:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Strojově čitelná vizitka firmy pro Google i AI vyhledávače */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(ORGANIZATION_JSONLD) }}
        />
      </head>
      <body className="bg-white text-mandik-ink">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
