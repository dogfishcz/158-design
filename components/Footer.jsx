"use client";

import React from "react";
import { Logo } from "./Primitives";

export const Footer = ({ onNav, categories = [] }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mandik-steel text-white mt-auto">
      {/* Pomyslné světlé rozdělení sekcí — výška odpovídá spodnímu stripu níže (border-t + py-4 + text-xs ≈ 49 px) */}
      <div className="bg-mandik-paper-soft h-[49px]" aria-hidden="true" />

      {/* Hlavní tělo */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 lg:pt-16 pb-10 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1.6fr_1px_1fr] gap-0">
          {/* Sloupec 1 — logo + adresa + kontakt */}
          <div className="pb-10 lg:pb-0 lg:pr-12">
            {/* -ml-3 (= -12px): zarovnání s levou hranou rozbalovacího menu v hlavičce.
                Hodnotu lze měnit (-ml-2 = -8px, -ml-4 = -16px, …). */}
            <Logo invert size={64} onNav={onNav} className="-ml-5 -mt-4" />

            <div className="mt-4 space-y-4">
              <div>
                <p className="h-label text-[10px] text-white/45 mb-2">Adresa společnosti</p>
                <p className="text-sm text-white/80 leading-relaxed">
                  MANDÍK, a.s.<br />
                  Dobříšská 550<br />
                  267 24 Hostomice<br />
                  Česká republika
                </p>
              </div>

              <div>
                <p className="h-label text-[10px] text-white/45 mb-2">Kontaktujte nás</p>
                <ul className="space-y-1.5 text-sm text-white/80">
                  <li>
                    <a href="tel:+420311706706" className="flex items-center gap-2 hover:text-white transition-colors">
                      <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +420 311 706 706
                    </a>
                  </li>
                  <li>
                    <a href="mailto:mandik@mandik.cz" className="flex items-center gap-2 hover:text-white transition-colors">
                      <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      mandik@mandik.cz
                    </a>
                  </li>
                </ul>

                {/* LinkedIn ikona pod kontakty, zarovnaná vlevo (na úrovni ikon telefonu / e-mailu) */}
                <a
                  href="https://www.linkedin.com/company/mandik-as"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="mt-3 w-9 h-9 border border-white/20 inline-flex items-center justify-center text-white/60 hover:border-accent hover:text-accent transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Svislý oddělovač */}
          <div className="hidden lg:block bg-white/15" />

          {/* Sloupec 2 — Společnost + Výrobky */}
          <div className="pb-10 lg:pb-0 lg:px-12">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="h-label text-[10px] text-white/45 mb-4">Naše společnost</p>
                <ul className="space-y-2.5 text-sm text-white/75">
                  {[
                    { label: "O nás",                   href: "/" },
                    { label: "Reference",                href: "/" },
                    { label: "Novinky",                  href: "/" },
                    { label: "Kariéra",                  href: "/" },
                    { label: "Certifikace a dokumenty",  href: "/certifikace-a-dokumenty" },
                  ].map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className="hover:text-white transition-colors">{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="h-label text-[10px] text-white/45 mb-4">Výrobky</p>
                <ul className="space-y-2.5 text-sm text-white/75">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <li key={cat.slug}>
                        <a href={`/vyroba/${cat.slug}`} className="hover:text-white transition-colors">
                          {cat.name}
                        </a>
                      </li>
                    ))
                  ) : (
                    <>
                      <li><a href="/vyroba/divize/vzduchotechnicke-komponenty" className="hover:text-white transition-colors">AHC komponenty</a></li>
                      <li><a href="/vyroba/divize/vzduchotechnicke-jednotky" className="hover:text-white transition-colors">AHU jednotky</a></li>
                      <li><a href="/vyroba/divize/prumyslove-vytapeni" className="hover:text-white transition-colors">Průmyslové topné systémy</a></li>
                      <li><a href="/vyroba/divize/specialni-aplikace" className="hover:text-white transition-colors">Speciální aplikace</a></li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Svislý oddělovač */}
          <div className="hidden lg:block bg-white/15" />

          {/* Sloupec 3 — Podpora (Kontakt, Servis, Ke stažení) */}
          <div className="lg:pl-12">
            <p className="h-label text-[10px] text-white/45 mb-4">Podpora</p>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li><a href="/kontakt" className="hover:text-white transition-colors">Kontakt</a></li>
              <li><a href="/servis" className="hover:text-white transition-colors">Servis</a></li>
              <li><a href="/ke-stazeni" className="hover:text-white transition-colors">Ke stažení</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Spodní strip — copyright + právní */}
      <div className="bg-mandik-steel-90 border-t border-white/10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-white/45">
          <p>© 1990–{year} MANDÍK, a.s. Všechna práva vyhrazena.</p>
          <div className="flex items-center gap-4">
            <a href="/ochrana-osobnich-udaju" className="hover:text-white/70 transition-colors">Zásady zpracování osobních údajů</a>
            <span className="text-white/25">|</span>
            <a href="/cookies" className="hover:text-white/70 transition-colors">Cookies</a>
            <span className="text-white/25">|</span>
            <a href="/whistleblowing" className="hover:text-white/70 transition-colors">Whistleblowing</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
