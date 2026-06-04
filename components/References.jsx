"use client";

import React from "react";
import { SectionLabel, SectionTitle, Button, CategoryBand, useInView } from "./Primitives";
import { EuropeMap, PINS, AREA_COLOR } from "./EuropeMap";

const ALL_REFS = PINS.map((p, i) => ({
  ...p,
  size: ["S","M","L","XL"][i % 4],
}));

export const ReferencesScreen = ({ onNav }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { threshold: 0.05 });
  const [selected, setSelected] = React.useState(PINS[6]);
  const [filterArea, setFilterArea] = React.useState("Vše");
  const [filterSector, setFilterSector] = React.useState("Vše");

  const filtered = ALL_REFS.filter((r) =>
    (filterArea === "Vše" || r.area === filterArea) &&
    (filterSector === "Vše" || r.sector === filterSector)
  );

  return (
    <div data-screen-label="References" className="page-enter pt-[100px] lg:pt-[116px]">
      <section className="bg-mandik-ink text-white">
        <div className="max-w-[1320px] mx-auto px-10 py-16">
          <div className="grid grid-cols-12 gap-10 items-end">
            <div className="col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-accent" />
                <span className="h-label text-xs text-accent">Reference</span>
              </div>
              <h1 className="h-display text-[72px] leading-[0.95]">1 280 referencí.<br/>32 zemí. 33 let.</h1>
              <p className="mt-6 text-white/75 text-[16px] max-w-lg leading-relaxed">
                Mapa dodávek MANDÍK po Evropě. Klikněte na špendlík — zobrazíte případovou studii a&nbsp;stáhnete podrobný protokol.
              </p>
            </div>
            <div className="col-span-5 grid grid-cols-2 gap-px bg-white/10">
              <div className="bg-mandik-ink p-5">
                <div className="mono text-[10px] text-white/55 uppercase tracking-wider">Největší zakázka</div>
                <div className="h-display text-[36px] mt-2">1 340</div>
                <div className="text-[12px] text-white/70">PKI-EI · 22 Bishopsgate</div>
              </div>
              <div className="bg-mandik-ink p-5">
                <div className="mono text-[10px] text-white/55 uppercase tracking-wider">Nejstarší aktivní</div>
                <div className="h-display text-[36px] mt-2">1995</div>
                <div className="text-[12px] text-white/70">Temelín — bloky 1+2</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={ref} className="bg-white">
        <div className="max-w-[1320px] mx-auto px-10 py-10">
          <EuropeMap revealed={inView} selectedId={selected?.id} onSelect={setSelected} height={640} />
        </div>
      </section>

      <section className="bg-mandik-paper-soft border-t border-mandik-rule">
        <div className="max-w-[1320px] mx-auto px-10 py-16">
          <div className="grid grid-cols-12 gap-10 items-end mb-8">
            <div className="col-span-7">
              <SectionLabel>Případové studie</SectionLabel>
              <SectionTitle>Filtrovat podle výrobní oblasti a sektoru<span className="text-mandik-steel">.</span></SectionTitle>
            </div>
            <div className="col-span-5 mono text-[12px] text-mandik-steel-70 text-right">
              Zobrazeno {filtered.length} z {ALL_REFS.length}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-8">
            <div className="flex items-center gap-2">
              <span className="h-label text-[10px] text-mandik-steel-70">Oblast:</span>
              {["Vše", "AHC komponenty", "AHU jednotky", "Topné systémy", "Speciální aplikace"].map((a) => (
                <button key={a} onClick={() => setFilterArea(a)} className={`px-2.5 py-1 mono text-[11px] transition-colors ${filterArea === a ? "bg-mandik-steel text-white" : "bg-white hairline text-mandik-steel hover:bg-mandik-rule"}`}>{a}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="h-label text-[10px] text-mandik-steel-70">Sektor:</span>
              {["Vše", "Výškové budovy", "Administrativa", "Zdravotnictví", "Infrastruktura", "Speciální"].map((s) => (
                <button key={s} onClick={() => setFilterSector(s)} className={`px-2.5 py-1 mono text-[11px] transition-colors ${filterSector === s ? "bg-mandik-steel text-white" : "bg-white hairline text-mandik-steel hover:bg-mandik-rule"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-px bg-mandik-rule hairline">
            {filtered.slice(0, 16).map((r) => (
              <a key={r.id} href="#" onClick={(e) => { e.preventDefault(); setSelected(r); }} className="tile relative bg-white">
                <span className="tile-bar" style={{ background: AREA_COLOR[r.area] }} />
                <div className="aspect-square img-placeholder relative">
                  <span>{r.city.toUpperCase()}</span>
                  <span className="absolute top-3 left-3 mono text-[10px] bg-white px-2 py-0.5 text-mandik-ink">{r.year}</span>
                  <span className="absolute top-3 right-3 mono text-[10px] bg-mandik-ink/80 text-white px-2 py-0.5">{r.country}</span>
                </div>
                <div className="p-5">
                  <CategoryBand color={AREA_COLOR[r.area]} label={r.area} kicker={r.size} />
                  <div className="mt-3 h-display text-[18px] leading-tight">{r.project}</div>
                  <div className="mt-1 text-[12px] text-mandik-steel-70">{r.city} · {r.country}</div>
                  <div className="mt-4 pt-3 border-t border-mandik-rule flex items-center justify-between mono text-[11px] text-mandik-steel">
                    <span>{r.units} ks</span>
                    <span className="text-mandik-steel-70">{r.sector}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center">
            <Button variant="ghost" href="#">Načíst další reference</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
