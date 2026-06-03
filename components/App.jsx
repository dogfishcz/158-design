"use client";

import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Homepage } from "./Homepage";
import { ReferencesScreen } from "./References";
import { ContactStub } from "./Contact";

const DEFAULT_TWEAKS = {
  heroMedia: "video",
  parallax: true,
  accent: "#26d07c",
};

// SPA-style routing pro homepage. Reálné Next.js stránky (např. /vyroba/[category],
// /ke-stazeni, /certifikace-a-dokumenty, /o-nas) běží mimo tento App komponent —
// navigace se vždy provádí přes <a href> a browser provede full-page navigaci.
//
// Tady zůstávají jen SPA stuby pro routy, které ještě nemají vlastní Next.js stránku:
//   - references (otevřeno z homepage RefMap "Otevřít všechny reference")
//   - contact    (otevřeno z Header "Kontakt" a tlačítka "Poptávka")
export const App = ({ categories = [] }) => {
  const [route, setRoute] = React.useState("home");
  const [lang, setLang] = React.useState("cs");
  const tweaks = DEFAULT_TWEAKS;

  const onNav = (next) => {
    setRoute(next);
    if (typeof window !== "undefined" && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header route={route} onNav={onNav} lang={lang} onLang={setLang} categories={categories} />

      <main key={route} className="flex-1">
        {route === "home" && <Homepage onNav={onNav} tweaks={tweaks} />}
        {route === "references" && <ReferencesScreen onNav={onNav} />}
        {route === "contact" && <ContactStub onNav={onNav} />}
      </main>

      <Footer onNav={onNav} categories={categories} />
    </div>
  );
};
