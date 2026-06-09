"use client";

import React from "react";
import { Button } from "./Primitives";
import { ReferenceGallery } from "./ReferenceGallery";
import { referencePhotos } from "./EuropeMap";

// Panel vybrané reference (foto + galerie + parametry + akce).
// Sdílený mezi homepage a /reference, ať jsou mapy stejné.
export const ReferencePanel = ({ reference, accent = "#26d07c" }) => {
  if (!reference) return null;
  const r = reference;
  return (
    <div className="bg-white p-6 lg:p-7 flex flex-col h-full">
      {/* Foto vybrané reference + galerie + lightbox */}
      <ReferenceGallery photos={referencePhotos(r)} alt={r.project} accent={accent} />

      {/* Text pod fotkou */}
      <div className="flex items-center justify-between mt-5 mb-3">
        <div className="h-label text-[11px] text-mandik-steel-70">Vybraná reference</div>
        <div className="mono text-[11px] text-mandik-steel-70">#{String(r.id).padStart(3, "0")} / 1 280</div>
      </div>

      <div className="h-display text-[24px] leading-tight text-mandik-ink">{r.project}</div>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 mono text-[12px] text-mandik-steel-80">
        <span>{r.city}, {r.country}</span>
        <span className="opacity-50">·</span>
        <span>{r.year}</span>
        <span className="opacity-50">·</span>
        <span className="tabular-nums">{r.lat.toFixed(2)}° {r.lat >= 0 ? "N" : "S"}, {r.lon.toFixed(2)}° {r.lon >= 0 ? "E" : "W"}</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-px bg-mandik-rule">
        <div className="bg-white p-4">
          <div className="mono text-[10px] text-mandik-steel-70 uppercase tracking-wider">Dodáno</div>
          <div className="h-display text-[28px] mt-1 tabular-nums text-mandik-ink">{r.units}</div>
          <div className="text-[11px] text-mandik-steel-80">jednotek</div>
        </div>
        <div className="bg-white p-4">
          <div className="mono text-[10px] text-mandik-steel-70 uppercase tracking-wider">Sektor</div>
          <div className="h-display text-[18px] mt-1 leading-tight text-mandik-ink">{r.sector}</div>
          <div className="h-1 w-6 mt-2" style={{ background: accent }} />
        </div>
      </div>

      <div className="mt-5 mono text-[11px] text-mandik-steel-80 leading-relaxed">
        {r.special
          ? "Speciální zakázka s certifikací KTA 1401 / 10CFR APP10. Detail dostupný na vyžádání."
          : "Standardní dodávka, kompletní balíček dokumentace v centru ke stažení."}
      </div>

      <div className="mt-auto pt-6 flex flex-col gap-3">
        <Button variant="primary" href={`/reference/${r.slug}`} className="w-full justify-between">Detail reference</Button>
        <Button variant="ghost" href="/reference" className="w-full justify-between">Všechny reference</Button>
      </div>
    </div>
  );
};
