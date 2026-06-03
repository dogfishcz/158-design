"use client";

import React from "react";
import { SectionLabel } from "./Primitives";

function formatSize(bytes) {
  if (!bytes) return "";
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} kB`;
}

function fileLabel(count) {
  if (count === 1) return "soubor";
  if (count < 5) return "soubory";
  return "souborů";
}

const TYPE_BADGE_COLORS = {
  PDF: "bg-red-100 text-red-700",
  ZIP: "bg-blue-100 text-blue-700",
  EXE: "bg-amber-100 text-amber-700",
  WEB: "bg-cat-vzt/20 text-cat-vzt",
};

const DownloadCard = ({ item }) => {
  const isZip = item.mime_type?.includes("zip");
  const isPdf = item.mime_type?.includes("pdf");
  const isExe = item.mime_type?.includes("exe") || item.mime_type?.includes("msdownload");
  const badge = isZip ? "ZIP" : isPdf ? "PDF" : isExe ? "EXE" : null;

  return (
    <div className="tile relative bg-white hairline overflow-hidden flex flex-col transition-shadow hover:shadow-lg">
      <span className="tile-bar" style={{ background: "#26d07c" }} />
      {item.image_link && (
        <div className="relative aspect-[4/3] bg-mandik-paper-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image_link}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-contain p-3"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-2 mb-2">
          {badge && (
            <span className={`shrink-0 mt-0.5 mono text-[10px] font-bold px-1.5 py-0.5 ${TYPE_BADGE_COLORS[badge]}`}>
              {badge}
            </span>
          )}
          <h3 className="h-display text-[14px] leading-tight text-mandik-ink">
            {item.title}
          </h3>
        </div>
        {item.subtitle && (
          <p className="text-[11px] text-accent font-medium mb-2">{item.subtitle}</p>
        )}
        {item.description && (
          <p className="text-[12px] text-mandik-steel-80 leading-relaxed flex-1 line-clamp-3">
            {item.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          {item.size && (
            <span className="mono text-[11px] text-mandik-steel-70">{formatSize(item.size)}</span>
          )}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-mandik-ink h-label text-[10px] hover:bg-[#1ec170] transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Stáhnout
          </a>
        </div>
      </div>
    </div>
  );
};

const ManselCard = () => (
  <div className="tile relative bg-white hairline overflow-hidden flex flex-col transition-shadow hover:shadow-lg">
    <span className="tile-bar" style={{ background: "#74d1ea" }} />
    <div className="relative aspect-[4/3] bg-mandik-paper-soft">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://mandik.info/api/v1/downloads/gallery/460aac85-a56e-4d96-b221-0c9c897c0466"
        alt="MANSEL"
        className="absolute inset-0 w-full h-full object-contain p-3"
      />
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-start gap-2 mb-2">
        <span className="shrink-0 mt-0.5 mono text-[10px] font-bold px-1.5 py-0.5 bg-cat-vzt/20 text-cat-vzt">WEB</span>
        <h3 className="h-display text-[14px] leading-tight text-mandik-ink">MANSEL</h3>
      </div>
      <p className="text-[11px] text-accent font-medium mb-2">
        Online nástroj pro výběr a výpočty vzduchotechnických komponent MANDÍK
      </p>
      <ul className="text-[12px] text-mandik-steel-80 leading-relaxed flex-1 space-y-1">
        <li>✔️ Rychlý přístup z jakéhokoliv zařízení (PC, tablet, mobil)</li>
        <li>✔️ Bez starostí s aktualizacemi — vše je vždy aktuální</li>
        <li>✔️ Jednoduché sdílení výsledků a projektů</li>
        <li>✔️ Stabilní a intuitivní prostředí</li>
      </ul>
      <div className="mt-4 flex items-center justify-end">
        <a
          href="https://mansel.online/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-cat-vzt text-mandik-ink h-label text-[10px] hover:bg-[#5fc0d8] transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Přejít na MANSEL.ONLINE
        </a>
      </div>
    </div>
  </div>
);

export const DownloadsPage = ({ downloads = [] }) => {
  // Seskupit podle type_name (Aplikace, Manuály, atd.)
  const byType = downloads.reduce((acc, d) => {
    if (!acc[d.type_name]) acc[d.type_name] = [];
    acc[d.type_name].push(d);
    return acc;
  }, {});

  return (
    <div className="bg-white">
      <div className="max-w-[1320px] mx-auto px-10 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mono text-[11px] text-mandik-steel-70 mb-10">
          <a href="/" className="hover:text-mandik-ink transition-colors">Domů</a>
          <span>/</span>
          <span className="text-mandik-ink">Ke stažení</span>
        </nav>

        {/* Hlavička */}
        <div className="mb-14">
          <SectionLabel>Centrum dokumentace</SectionLabel>
          <h1 className="h-display text-[48px] leading-[1.05] text-mandik-ink mb-5">
            Ke stažení
          </h1>
          <div className="w-16 h-1 bg-accent mb-6" />
          <p className="text-mandik-steel-80 leading-relaxed max-w-3xl text-[15px]">
            Programy, manuály, BIM rodiny a další podklady pro projekty MANDÍK.
            Bez registrace, vždy aktuální verze.
          </p>
        </div>

        {downloads.length === 0 ? (
          <p className="mono text-[12px] text-mandik-steel-70">
            Momentálně nejsou k dispozici žádné soubory ke stažení.
          </p>
        ) : (
          <div className="space-y-14">
            {Object.entries(byType).map(([typeName, items]) => (
              <section key={typeName}>
                <h2 className="h-display text-[26px] text-mandik-ink mb-2 flex items-center gap-3">
                  <span className="w-1 h-7 bg-accent inline-block" />
                  {typeName}
                </h2>
                <p className="mono text-[12px] text-mandik-steel-70 mb-6 ml-4">
                  {items.length} {fileLabel(items.length)}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ml-4">
                  {typeName === "Aplikace" && <ManselCard />}
                  {items.map((item, i) => (
                    <DownloadCard key={i} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
