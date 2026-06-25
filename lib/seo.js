// Centrální SEO konstanty a pomocníci. Jediný zdroj pravdy pro produkční doménu.

export const SITE_URL = "https://www.mandik.com";
export const SITE_NAME = "MANDÍK a.s.";

// Absolutní URL z relativní cesty (pro JSON-LD, OG apod.).
export const absUrl = (path = "/") => new URL(path, SITE_URL).toString();

// JSON-LD vizitka firmy (Organization), vkládá se do root layoutu.
// Fakta drž v souladu s patičkou a stránkou /kontakt.
export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MANDÍK, a.s.",
  url: SITE_URL,
  logo: absUrl("/assets/mandik-logo-white.webp"),
  description:
    "Český výrobce vzduchotechnických komponentů, požární techniky, vzduchotechnických jednotek a průmyslového vytápění. Rodinná firma od roku 1990.",
  foundingDate: "1990",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dobříšská 550",
    addressLocality: "Hostomice",
    postalCode: "267 24",
    addressCountry: "CZ",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+420 311 706 706",
      email: "mandik@mandik.cz",
      availableLanguage: ["cs", "en", "de"],
    },
  ],
  sameAs: ["https://www.linkedin.com/company/mandik-as"],
};

// Bezpečná serializace JSON-LD do <script> (escapuje < kvůli XSS přes </script>).
export const jsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");
