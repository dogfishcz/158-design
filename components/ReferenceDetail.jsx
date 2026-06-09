"use client";

import React from "react";
import { Button } from "./Primitives";
import { ReferenceGallery } from "./ReferenceGallery";
import { PINS, referencePhotos } from "./EuropeMap";

export const ReferenceDetail = ({ reference }) => {
  if (!reference) {
    return (
      <div data-screen-label="ReferenceDetail" className="page-enter pt-[120px] lg:pt-[140px] pb-32">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 text-center">
          <h1 className="h-display text-[40px] text-mandik-ink">Reference nenalezena</h1>
          <p className="mt-4 text-mandik-steel-80">Tato reference neexistuje nebo byla přesunuta.</p>
          <div className="mt-8 flex justify-center">
            <Button variant="primary" href="/reference">Zpět na reference</Button>
          </div>
        </div>
      </div>
    );
  }

  const r = reference;
  const photos = referencePhotos(r);
  const coords = `${r.lat.toFixed(2)}° ${r.lat >= 0 ? "N" : "S"}, ${r.lon.toFixed(2)}° ${r.lon >= 0 ? "E" : "W"}`;
  const desc = r.description || (r.special
    ? "Speciální zakázka s vysokými nároky na požární bezpečnost a certifikaci. Detailní popis této reference připravujeme, pro bližší informace nás prosím kontaktujte."
    : "Dodávka komponentů a řešení MANDÍK pro tento projekt. Detailní popis této reference připravujeme, pro bližší informace nás prosím kontaktujte.");

  const bySector = PINS.filter((x) => x.id !== r.id && x.sector === r.sector);
  const related = (bySector.length ? bySector : PINS.filter((x) => x.id !== r.id && x.featured)).slice(0, 4);

  return (
    <div data-screen-label="ReferenceDetail" className="page-enter pt-[100px] lg:pt-[116px]">
      <section className="bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-10 lg:py-14">
          <a href="/reference" className="inline-flex items-center gap-2 mono text-[11px] text-mandik-steel-70 hover:text-mandik-ink transition-colors mb-8">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Zpět na reference
          </a>

          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Galerie */}
            <div className="col-span-12 lg:col-span-7">
              <ReferenceGallery photos={photos} alt={r.project} />
            </div>

            {/* Info */}
            <div className="col-span-12 lg:col-span-5">
              <div className="mono text-[11px] text-mandik-steel-70 uppercase tracking-wider">{r.city}, {r.country} · {r.year}</div>
              <h1 className="mt-2 h-display text-[32px] sm:text-[40px] leading-[1.03] text-mandik-ink">{r.project}</h1>
              <div className="mt-4 h-1 w-16 bg-accent" />

              <p className="mt-6 text-[15px] text-mandik-steel-80 leading-relaxed">{desc}</p>

              <div className="mt-8 grid grid-cols-2 gap-px bg-mandik-rule hairline">
                <div className="bg-white p-4">
                  <div className="mono text-[10px] text-mandik-steel-70 uppercase tracking-wider">Dodáno</div>
                  <div className="h-display text-[28px] mt-1 tabular-nums text-mandik-ink">{r.units}</div>
                  <div className="text-[11px] text-mandik-steel-80">jednotek</div>
                </div>
                <div className="bg-white p-4">
                  <div className="mono text-[10px] text-mandik-steel-70 uppercase tracking-wider">Sektor</div>
                  <div className="h-display text-[18px] mt-1 leading-tight text-mandik-ink">{r.sector}</div>
                  <div className="h-1 w-6 mt-2 bg-accent" />
                </div>
                <div className="bg-white p-4 col-span-2">
                  <div className="mono text-[10px] text-mandik-steel-70 uppercase tracking-wider">Lokalita</div>
                  <div className="mono text-[13px] mt-1 text-mandik-ink">{r.city}, {r.country} · {coords}</div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="primary" href="/kontakt">Poptat podobné řešení</Button>
                <Button variant="ghost" href="/reference">Všechny reference</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-mandik-paper-soft border-t border-mandik-rule">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-14">
            <div className="h-label text-[11px] text-mandik-steel-70 mb-6">Další reference</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((x) => (
                <a
                  key={x.id}
                  href={`/reference/${x.slug}`}
                  style={{ "--tile-color": "#26d07c" }}
                  className="tile group relative block bg-white overflow-hidden shadow-sm border border-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[color:var(--tile-color)]"
                >
                  <span className="tile-bar" style={{ background: "#26d07c" }} />
                  <div className="relative aspect-[4/3] bg-mandik-paper-soft overflow-hidden">
                    <img src={referencePhotos(x)[0]} alt={x.project} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    <span className="absolute top-3 left-3 mono text-[10px] bg-white px-2 py-0.5 text-mandik-ink">{x.year}</span>
                    <span className="absolute top-3 right-3 mono text-[10px] bg-mandik-ink/80 text-white px-2 py-0.5">{x.country}</span>
                  </div>
                  <div className="p-5">
                    <div className="mono text-[11px] text-mandik-steel-70 uppercase tracking-wider">{x.sector}</div>
                    <div className="mt-2 h-display text-[18px] leading-tight text-mandik-ink">{x.project}</div>
                    <div className="mt-1 text-[12px] text-mandik-steel-70">{x.city} · {x.country}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
