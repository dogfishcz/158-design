"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReferencesScreen } from "@/components/References";

// /reference používá ReferencesScreen (mapa dodávek, případové studie).
// ReferencesScreen má vlastní `pt-[108px]` pro fixed-header offset, proto ho
// montujeme bez Shell wrapperu (který by padding zdvojil) — stejně jako /o-nas.
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
        <ReferencesScreen />
      </main>
      <Footer categories={categories} />
    </div>
  );
}
