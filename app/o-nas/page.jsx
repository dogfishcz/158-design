"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutScreen } from "@/components/About";

// /o-nas používá původní AboutScreen komponent (parallax storytelling, timeline,
// rodinná firma, čísla). AboutScreen má vlastní `pt-[108px]` pro fixed-header offset,
// proto ho montujeme bez Shell wrapperu (který by padding zdvojil).
export default function Page() {
  const [lang, setLang] = React.useState("cs");
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/portfolio?locale=cs")
      .then((r) => (r.ok ? r.json() : []))
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLang={setLang} categories={categories} />
      <main className="flex-1">
        <AboutScreen />
      </main>
      <Footer categories={categories} />
    </div>
  );
}
