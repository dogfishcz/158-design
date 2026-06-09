"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsDetail } from "@/components/NewsDetail";
import { getNewsBySlug } from "@/lib/news";

// Detail jedné novinky: /novinky/<slug>.
export default function Page() {
  const params = useParams();
  const slug = decodeURIComponent(String(params?.slug || ""));
  const [lang, setLang] = React.useState("cs");
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/portfolio?locale=cs")
      .then((r) => (r.ok ? r.json() : []))
      .then(setCategories)
      .catch(() => {});
  }, []);

  const item = getNewsBySlug(slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLang={setLang} categories={categories} />
      <main className="flex-1">
        <NewsDetail item={item} />
      </main>
      <Footer categories={categories} />
    </div>
  );
}
