import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";

export const metadata = {
  title: "MANDÍK a.s. — výroba AHC komponentů, AHU jednotek a průmyslových topných systémů",
  description:
    "Česká rodinná manufaktura od roku 1990. Protipožární klapky, AHU jednotky, průmyslové topné systémy. Dodávky do 32 zemí Evropy.",
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
      </head>
      <body className="bg-white text-mandik-ink">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
