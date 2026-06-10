"use client";

import React from "react";
import { Button } from "./Primitives";

// Výrobní oblasti s barvami divizí (AHC / AHU / HEAT / Speciální).
const AREAS = [
  { label: "Vzduchotechnické komponenty", color: "#74d1ea" },
  { label: "Vzduchotechnické jednotky",   color: "#26d07c" },
  { label: "Průmyslové vytápění",         color: "#f2a900" },
  { label: "Speciální aplikace",          color: "#ffd700" },
];

export const ContactStub = ({ onNav }) => {
  // Vybrané výrobní oblasti (toggle kliknutím)
  const [areas, setAreas] = React.useState([]);
  const toggleArea = (label) =>
    setAreas((prev) => (prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]));

  return (
  <div data-screen-label="Contact" className="page-enter pt-[140px] pb-32 min-h-screen bg-mandik-paper-soft">
    <div className="max-w-site mx-auto px-6 lg:px-10">
      <h1 className="h-display text-[40px] sm:text-[56px] lg:text-[72px] leading-[0.95] text-mandik-ink">Poptávka</h1>
      <div className="mt-4 h-1 w-16 bg-accent" />
      <div className="mt-10 grid grid-cols-12 gap-px bg-mandik-rule hairline">
        <div className="col-span-12 lg:col-span-7 bg-white p-6 lg:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="h-label text-[10px] text-mandik-steel-70">Jméno *</span>
              <input className="w-full mt-1 px-3 py-2.5 hairline bg-white outline-none focus:ring-1 focus:ring-accent" placeholder="Jan Novák" />
            </label>
            <label className="block">
              <span className="h-label text-[10px] text-mandik-steel-70">Firma *</span>
              <input className="w-full mt-1 px-3 py-2.5 hairline bg-white outline-none" placeholder="" />
            </label>
            <label className="block">
              <span className="h-label text-[10px] text-mandik-steel-70">E-mail *</span>
              <input className="w-full mt-1 px-3 py-2.5 hairline bg-white outline-none" type="email" />
            </label>
            <label className="block">
              <span className="h-label text-[10px] text-mandik-steel-70">Telefon</span>
              <input className="w-full mt-1 px-3 py-2.5 hairline bg-white outline-none" />
            </label>
            <div className="sm:col-span-2">
              <span className="h-label text-[10px] text-mandik-steel-70">Výrobní oblast</span>
              {/* 2 sloupce: 1. řádek komponenty + jednotky, 2. řádek vytápění + speciální */}
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {AREAS.map(({ label, color }) => {
                  const active = areas.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => toggleArea(label)}
                      aria-pressed={active}
                      style={{ "--c": color, ...(active ? { background: color, borderColor: color } : {}) }}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 mono text-[11px] border text-left transition-colors duration-150 ${
                        active
                          ? "text-mandik-ink"
                          : "bg-white text-mandik-steel border-mandik-rule hover:border-[color:var(--c)]"
                      }`}
                    >
                      {active ? (
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="w-2 h-2 shrink-0" style={{ background: color }} />
                      )}
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
            <label className="block sm:col-span-2">
              <span className="h-label text-[10px] text-mandik-steel-70">Poptávka</span>
              <textarea rows="6" className="w-full mt-1 px-3 py-2.5 hairline bg-white outline-none" placeholder="Popište prosím zakázku, požadované rozměry, normy …"></textarea>
            </label>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-2 mono text-[11px] text-mandik-steel-80">
              <input type="checkbox" className="accent-[#26d07c]" /> Souhlasím se zpracováním osobních údajů
            </label>
            <Button variant="primary" href="#">Odeslat poptávku</Button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 bg-mandik-steel text-white p-6 lg:p-10">
          <div className="h-label text-[11px] text-white/55">Sídlo</div>
          <div className="mt-3 h-display text-[20px]">MANDÍK, a.s.</div>
          <div className="mono text-[12px] text-white/75 mt-2 leading-relaxed">
            Dobříšská 550<br/>
            267 24 Hostomice<br/>
            Česká republika
          </div>
          <div className="mt-8 h-label text-[11px] text-white/55">Spojení</div>
          <div className="mt-3 mono text-[13px] space-y-1">
            <div>+420 311 706 706</div>
            <div>mandik@mandik.cz</div>
          </div>
          <div className="mt-8 h-label text-[11px] text-white/55">Servis 24/7</div>
          <div className="mt-3 mono text-[13px]">+420 777 789 224</div>

        </div>
      </div>
    </div>
  </div>
  );
};
