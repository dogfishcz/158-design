"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactStub } from "@/components/Contact";

// Poptávkový formulář: cíl tlačítka "Poptávka" v hlavičce
// a "Poptat podobné řešení" na detailu reference.
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
        <ContactStub />
      </main>
      <Footer categories={categories} />
    </div>
  );
}
