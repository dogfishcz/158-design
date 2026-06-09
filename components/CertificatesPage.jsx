"use client";

import React from "react";

// Opravy odkazů, přebijí špatné URL z API (převzato z v5).
const LINK_OVERRIDES = [
  { match: "INDESEN", url: "https://www.indesen.cz/" },
  { match: "RLT",     url: "https://rlt-geraete.de/" },
  { match: "CCPI",    url: "https://www.cpicode.org.uk/" },
  { match: "CCPi",    url: "https://www.cpicode.org.uk/" },
  { match: "DIvB",    url: "https://divb.org/" },
  { match: "DIVB",    url: "https://divb.org/" },
];

function applyOverrides(items) {
  return items.map((item) => {
    const override = LINK_OVERRIDES.find((o) =>
      item.title?.toUpperCase().includes(o.match.toUpperCase())
    );
    return override ? { ...item, link: override.url } : item;
  });
}

const ResourceCard = ({ item }) => (
  <a
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="tile group relative bg-white overflow-hidden flex flex-col shadow-sm border border-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent"
  >
    <span className="tile-bar" style={{ background: "#26d07c" }} />
    {item.image_link && (
      <div className="relative aspect-[4/3] bg-mandik-paper-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image_link}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    )}
    <div className="p-4 flex flex-col flex-1">
      <h3 className="h-display text-[16px] text-mandik-ink leading-tight">
        {item.title}
      </h3>
      {item.subtitle && (
        <p className="text-[11px] text-mandik-steel-70 mt-1">{item.subtitle}</p>
      )}
      {item.description && (
        <p className="text-[11px] text-mandik-steel-70 mt-1 line-clamp-2">{item.description}</p>
      )}
      <div className="mt-auto pt-3 flex items-center gap-1.5 h-label text-[10px] text-accent">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Zobrazit dokument
      </div>
    </div>
  </a>
);

export const CertificatesPage = ({ certificates: rawCertificates = [], documents = [], epd = [] }) => {
  const certificates = applyOverrides(rawCertificates);

  return (
    <div className="bg-white">
      <div className="max-w-[1320px] mx-auto px-10 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mono text-[11px] text-mandik-steel-70 mb-10">
          <a href="/" className="hover:text-mandik-ink transition-colors">Domů</a>
          <span>/</span>
          <span className="text-mandik-ink">Certifikace a dokumenty</span>
        </nav>

        {/* Hlavička */}
        <div className="mb-14">
          <h1 className="h-display text-[48px] leading-[1.05] text-mandik-ink mb-5">
            Certifikace a dokumenty
          </h1>
          <div className="w-16 h-1 bg-accent mb-6" />
          <p className="text-mandik-steel-80 leading-relaxed max-w-3xl text-[15px]">
            Aktuální platné certifikáty, environmentální prohlášení (EPD)
            a firemní dokumenty MANDÍK.
          </p>
        </div>

        {/* EPD Banner */}
        <div className="mb-16 bg-mandik-steel p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="h-display text-[22px] sm:text-[26px] text-white mb-2">
              Environmentální prohlášení o produktu (EPD)
            </h2>
            <p className="text-white/80 text-sm sm:text-[15px] max-w-xl leading-relaxed">
              Najděte více environmentálních prohlášení o produktu v národní databázi EPD.
            </p>
          </div>
          <a
            href="https://www.ekoznacka.cz/databaze-epd-v-cr/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-accent text-mandik-ink h-label text-[11px] hover:bg-[#1ec170] transition-colors"
          >
            EPD Databáze
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* EPD sekce */}
        {epd.length > 0 && (
          <section className="mb-16">
            <div className="mb-6">
              <h2 className="h-display text-[26px] text-mandik-ink">EPD</h2>
              <div className="mt-2 h-1 w-12 bg-accent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {epd.map((item, i) => <ResourceCard key={i} item={item} />)}
            </div>
          </section>
        )}

        {/* Certifikace sekce */}
        {certificates.length > 0 && (
          <section className="mb-16">
            <div className="mb-6">
              <h2 className="h-display text-[26px] text-mandik-ink">Certifikace</h2>
              <div className="mt-2 h-1 w-12 bg-accent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {certificates.map((item, i) => <ResourceCard key={i} item={item} />)}
            </div>
          </section>
        )}

        {/* Dokumenty sekce */}
        {documents.length > 0 && (
          <section className="mb-16">
            <div className="mb-6">
              <h2 className="h-display text-[26px] text-mandik-ink">Dokumenty</h2>
              <div className="mt-2 h-1 w-12 bg-accent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {documents.map((item, i) => <ResourceCard key={i} item={item} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
