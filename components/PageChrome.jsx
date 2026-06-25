"use client";

import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

// Klientský obal Header + Footer pro serverové stránky (kvůli SEO metadatům),
// jejichž obsah si řeší vlastní odsazení pod fixed hlavičkou. Na rozdíl od Shell
// nepřidává <main> padding-top.
export const PageChrome = ({ categories = [], children }) => {
  const [lang, setLang] = React.useState("cs");
  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLang={setLang} categories={categories} />
      <main className="flex-1">{children}</main>
      <Footer categories={categories} />
    </div>
  );
};
