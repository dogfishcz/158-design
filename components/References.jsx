"use client";

import React from "react";
import { SectionLabel, SectionTitle, Button, useInView } from "./Primitives";
import { EuropeMap, PINS, referencePhotos } from "./EuropeMap";
import { ReferencePanel } from "./ReferencePanel";

const SECTOR_FILTERS = ["Vše", "Výškové budovy", "Administrativa", "Zdravotnictví", "Infrastruktura", "Datacentrum", "Jaderná technika"];

export const ReferencesScreen = ({ onNav }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { threshold: 0.05 });
  const [selected, setSelected] = React.useState(PINS[6]);
  const [filterSector, setFilterSector] = React.useState("Vše");

  const filtered = PINS.filter((r) => filterSector === "Vše" || r.sector === filterSector);

  return (
    <div data-screen-label="References" className="page-enter pt-[100px] lg:pt-[116px]">
      <section className="bg-mandik-paper-soft">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-12 gap-10 items-end">
            <div className="col-span-12 lg:col-span-7">
              <h1 className="h-display text-[48px] sm:text-[64px] lg:text-[72px] leading-[0.95] text-mandik-ink">Reference</h1>
              <div className="mt-4 h-1 w-16 bg-accent" />
              <p className="mt-6 text-mandik-steel-80 text-[16px] max-w-lg leading-relaxed">
                Mapa dodávek MANDÍK po Evropě. Klikněte na špendlík, zobrazíte případovou studii a&nbsp;stáhnete podrobný protokol.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-px bg-mandik-rule hairline">
              <div className="bg-white p-5">
                <div className="mono text-[10px] text-mandik-steel-70 uppercase tracking-wider">Největší zakázka</div>
                <div className="h-display text-[36px] mt-2 text-mandik-ink">1 340</div>
                <div className="text-[12px] text-mandik-steel-80">PKI-EI · 22 Bishopsgate</div>
              </div>
              <div className="bg-white p-5">
                <div className="mono text-[10px] text-mandik-steel-70 uppercase tracking-wider">Nejstarší aktivní</div>
                <div className="h-display text-[36px] mt-2 text-mandik-ink">1995</div>
                <div className="text-[12px] text-mandik-steel-80">Temelín, bloky 1+2</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={ref} className="bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-mandik-rule hairline">
            <div className="lg:col-span-8 bg-mandik-paper-soft">
              <EuropeMap revealed={inView} selectedId={selected?.id} onSelect={setSelected} fill />
            </div>
            <div className="lg:col-span-4">
              <ReferencePanel reference={selected} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mandik-paper-soft border-t border-mandik-rule">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end mb-8">
            <div className="col-span-12 lg:col-span-7">
              <SectionLabel>Případové studie</SectionLabel>
              <SectionTitle>Filtrovat podle sektoru<span className="text-mandik-steel">.</span></SectionTitle>
            </div>
            <div className="col-span-12 lg:col-span-5 mono text-[12px] text-mandik-steel-70 lg:text-right">
              Zobrazeno {filtered.length} z {PINS.length}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="h-label text-[10px] text-mandik-steel-70 mr-1">Sektor:</span>
            {SECTOR_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setFilterSector(s)}
                className={`px-2.5 py-1 mono text-[11px] transition-colors ${filterSector === s ? "bg-mandik-steel text-white" : "bg-white hairline text-mandik-steel hover:bg-mandik-rule"}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.slice(0, 16).map((r) => (
              <a
                key={r.id}
                href={`/reference/${r.slug}`}
                style={{ "--tile-color": "#26d07c" }}
                className="tile group relative block bg-white overflow-hidden shadow-sm border border-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[color:var(--tile-color)]"
              >
                <span className="tile-bar" style={{ background: "#26d07c" }} />
                <div className="relative aspect-[4/3] bg-mandik-paper-soft overflow-hidden">
                  <img
                    src={referencePhotos(r)[0]}
                    alt={r.project}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <span className="absolute top-3 left-3 mono text-[10px] bg-white px-2 py-0.5 text-mandik-ink">{r.year}</span>
                  <span className="absolute top-3 right-3 mono text-[10px] bg-mandik-ink/80 text-white px-2 py-0.5">{r.country}</span>
                </div>
                <div className="p-5">
                  <div className="mono text-[11px] text-mandik-steel-70 uppercase tracking-wider">{r.sector}</div>
                  <div className="mt-2 h-display text-[18px] leading-tight text-mandik-ink">{r.project}</div>
                  <div className="mt-1 text-[12px] text-mandik-steel-70">{r.city} · {r.country}</div>
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
