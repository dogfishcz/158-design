"use client";

import React from "react";
import { ImageGallery } from "./ImageGallery";
import { getDivisionByCategorySlug } from "@/lib/divisions";

// Helper: characteristic může být buď string, nebo objekt { characteristic: "..." }
const charText = (c) => {
  if (typeof c === "string") return c;
  return c?.characteristic ?? "";
};

const TYPE_COLORS = {
  PDF: "#dc2626",
  DWG: "#26d07c",
  RFA: "#74d1ea",
  IFC: "#506077",
  STEP: "#506077",
  BACnet: "#f2a900",
};

const DownloadLink = ({ file }) => (
  <li>
    <a
      href={file.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 hairline bg-white hover:bg-mandik-paper-soft transition-colors group"
    >
      <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
      </svg>
      <span className="text-sm text-mandik-ink group-hover:text-accent transition-colors flex-1 leading-snug">
        {file.name}
      </span>
      <svg className="w-4 h-4 text-mandik-steel-70 group-hover:text-accent transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    </a>
  </li>
);

export const GroupPage = ({ category, group, subcategoryName, accentColor = "#26d07c" }) => {
  const division = getDivisionByCategorySlug(category.slug);
  // Divizi ukazujeme jen u divize s více kategoriemi (AHC), jinak by vznikla duplicita.
  const showDivision = division && division.categorySlugs.length > 1;
  // Downloads grouped by type
  const downloadsByType = {};
  for (const d of group.downloads ?? []) {
    if (!downloadsByType[d.type]) downloadsByType[d.type] = [];
    downloadsByType[d.type].push(d);
  }

  return (
    <div className="bg-white">
      <div className="max-w-[1320px] mx-auto px-10 py-16">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 mono text-[11px] text-mandik-steel-70 mb-10">
          <a href="/" className="hover:text-mandik-ink transition-colors">Domů</a>
          <span>/</span>
          {showDivision && (
            <>
              <a href={`/vyroba/divize/${division.slug}`} className="hover:text-mandik-ink transition-colors">{division.name}</a>
              <span>/</span>
            </>
          )}
          <a href={`/vyroba/${category.slug}`} className="hover:text-mandik-ink transition-colors">{category.name}</a>
          {subcategoryName && (
            <>
              <span>/</span>
              <span>{subcategoryName}</span>
            </>
          )}
          <span>/</span>
          <span className="text-mandik-ink font-medium">{group.name}</span>
        </nav>

        {/* Galerie + info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
          <ImageGallery images={group.gallery ?? []} name={group.name} />

          <div>
            <h1 className="h-display text-[40px] sm:text-[52px] leading-[1.0] text-mandik-ink">
              {group.name}
            </h1>
            {group.subtitle && (
              <p className="h-label text-[12px] mt-3" style={{ color: accentColor }}>{group.subtitle}</p>
            )}
            <div className="mt-4 w-16 h-1 mb-7" style={{ background: accentColor }} />

            {group.description && (
              <p className="text-mandik-steel-80 leading-relaxed mb-7 text-[15px]">{group.description}</p>
            )}

            {/* Ikony */}
            {group.icons?.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-7">
                {group.icons.map((icon, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 text-center w-16" title={icon.description ?? icon.name}>
                    <div className="relative w-10 h-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={icon.url} alt={icon.description ?? icon.name} className="w-full h-full object-contain" />
                    </div>
                    {icon.description && (
                      <span className="text-[10px] text-mandik-steel-70 leading-tight">{icon.description}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Charakteristiky */}
            {group.characteristics?.length > 0 && (
              <div>
                <h2 className="h-display text-[18px] text-mandik-ink mb-3">Charakteristiky</h2>
                <ul className="space-y-2">
                  {group.characteristics.map((c, i) => {
                    const text = charText(c);
                    if (!text) return null;
                    return (
                      <li key={i} className="flex items-start gap-2 text-sm text-mandik-steel-80">
                        <span className="mt-2 w-1.5 h-1.5 shrink-0" style={{ background: accentColor }} />
                        {text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Technická specifikace */}
        {group.specification && (
          <section className="mb-16">
            <h2 className="h-display text-[28px] text-mandik-ink mb-3">Technická specifikace</h2>
            <div className="w-12 h-1 mb-6" style={{ background: accentColor }} />
            <div
              className="text-sm leading-relaxed text-mandik-steel-80 max-w-4xl"
              style={{ wordBreak: "normal" }}
              dangerouslySetInnerHTML={{ __html: group.specification }}
            />
          </section>
        )}

        {/* Soubory ke stažení */}
        {Object.keys(downloadsByType).length > 0 && (
          <section>
            <h2 className="h-display text-[28px] text-mandik-ink mb-3">Ke stažení</h2>
            <div className="w-12 h-1 mb-8" style={{ background: accentColor }} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {Object.entries(downloadsByType).map(([type, files]) => (
                <div key={type}>
                  <h3 className="h-label text-[12px] text-mandik-ink mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 shrink-0" style={{ background: accentColor }} />
                    {type}
                  </h3>
                  <ul className="space-y-2">
                    {files.map((file, i) => <DownloadLink key={i} file={file} />)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
