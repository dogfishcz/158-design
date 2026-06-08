"use client";

import React from "react";
import { SectionLabel, SectionTitle } from "./Primitives";

// --- Data služeb dle divizí (barvy z lib/divisions.js) ---
// AHC #74d1ea · AHU #26d07c · HEAT #f2a900
const SERVICE_DIVISIONS = [
  {
    code: "AHC",
    name: "Vzduchotechnické komponenty",
    color: "#74d1ea",
    intro:
      "Servis a originální náhradní díly pro protipožární klapky, regulační a distribuční prvky.",
    services: [
      {
        title: "Pozáruční servis",
        desc: "Opravy a údržba komponentů po uplynutí záruční doby — výměny dílů i profylaktická údržba.",
      },
      {
        title: "Prodej náhradních dílů",
        desc: "Originální náhradní díly s garantovanou dostupností pro celý sortiment AHC.",
      },
    ],
  },
  {
    code: "AHU",
    name: "Vzduchotechnické jednotky",
    color: "#26d07c",
    intro:
      "Kompletní péče o sestavné vzduchotechnické jednotky — od uvedení do provozu až po retrofit.",
    services: [
      {
        title: "Uvedení do provozu",
        desc: "Spuštění a seřízení jednotky na správné provozní parametry přímo na stavbě.",
      },
      {
        title: "Pozáruční servis",
        desc: "Opravy po záruce včetně výměny ventilátorů a aktualizace řídicího softwaru.",
      },
      {
        title: "Propojení kabeláže",
        desc: "Propojení elektrických komponentů jednotky až po rozvaděč, včetně oživení.",
      },
      {
        title: "Montáž jednotek",
        desc: "Sestavení jednotky u zákazníka tam, kde dodávka v jednom celku není možná.",
      },
      {
        title: "Supervize",
        desc: "Odborný dohled nad montáží a uvedením do provozu prováděným třetí stranou.",
      },
      {
        title: "Retrofit",
        desc: "Modernizace starších jednotek novými komponenty a aktualizovaným řídicím softwarem.",
      },
      {
        title: "CLOUD Climatix IC",
        desc: "Vzdálené řízení teploty a sledování spotřeby energie přes chytrý telefon.",
      },
    ],
  },
  {
    code: "HEAT",
    name: "Průmyslové vytápění",
    color: "#f2a900",
    intro:
      "Montáže, dálkové ovládání a pravidelná údržba průmyslových topných systémů.",
    services: [
      {
        title: "Montáže topení",
        desc: "Montáž průmyslových topných systémů — tepelné clony, ohřívače a sálavé panely.",
      },
      {
        title: "Montáže dálkového ovládání",
        desc: "Instalace a zapojení systémů dálkového ovládání topných zařízení.",
      },
      {
        title: "Pravidelné roční kontroly",
        desc: "Pravidelné servisní prohlídky pro spolehlivý a bezpečný provoz topných zařízení.",
      },
      {
        title: "Pozáruční servis",
        desc: "Opravy a údržba topných zařízení po uplynutí záruční doby.",
      },
    ],
  },
];

// České skloňování "služba"
const sluzbaWord = (n) => (n === 1 ? "služba" : n >= 2 && n <= 4 ? "služby" : "služeb");

// --- Karta jedné služby ---
const ServiceCard = ({ index, title, desc, color }) => (
  <div style={{ "--tile-color": color }} className="tile group relative bg-white p-6 pl-7 shadow-sm border border-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[color:var(--tile-color)]">
    <span className="tile-bar" style={{ background: color }} />
    <div className="flex items-start gap-3.5">
      <span className="mono text-[11px] leading-none mt-1 tabular-nums" style={{ color }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h4 className="h-display text-[17px] leading-tight text-mandik-ink">{title}</h4>
        <p className="text-[13px] text-mandik-steel-80 leading-relaxed mt-1.5">{desc}</p>
      </div>
    </div>
  </div>
);

// --- Blok jedné divize (hlavička + mřížka služeb) ---
const DivisionBlock = ({ division }) => {
  const { code, name, color, intro, services } = division;
  return (
    <div className="relative">
      {/* Hlavička divize */}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-2">
        <span className="self-center block h-2.5 w-10 flex-shrink-0" style={{ background: color }} />
        <span className="h-display text-[22px] tracking-wider leading-none" style={{ color }}>
          {code}
        </span>
        <h3 className="h-display text-[26px] leading-none text-mandik-ink">{name}</h3>
        <span className="mono text-[11px] text-mandik-steel-70 ml-auto whitespace-nowrap">
          {services.length} {sluzbaWord(services.length)}
        </span>
      </div>
      <p className="text-mandik-steel-80 text-[14px] leading-relaxed max-w-2xl mb-6">{intro}</p>

      {/* Mřížka služeb */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <ServiceCard key={s.title} index={i} title={s.title} desc={s.desc} color={color} />
        ))}
      </div>
    </div>
  );
};

// --- Rozbalovací formulář servisního požadavku ---
const DIVISION_CHIPS = [
  { code: "AHC", color: "#74d1ea" },
  { code: "AHU", color: "#26d07c" },
  { code: "HEAT", color: "#f2a900" },
];

const ServiceRequestForm = () => {
  const [open, setOpen] = React.useState(false);
  const [division, setDivision] = React.useState(null);
  const [sent, setSent] = React.useState(false);

  const inputCls =
    "w-full mt-1 px-3 py-2.5 hairline bg-white text-[14px] outline-none focus:ring-1 focus:ring-accent transition-shadow";
  const labelCls = "block";
  const labelText = "h-label text-[10px] text-mandik-steel-70";

  return (
    <div className="hairline bg-white">
      {/* Toggle bar — formulář je sbalený, dokud na něj uživatel neklikne */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-mandik-steel text-white text-left hover:bg-[#3e4d61] transition-colors"
      >
        <span className="flex items-center gap-3">
          <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="h-label text-[12px]">
            {open ? "Skrýt formulář" : "Vyplnit servisní požadavek"}
          </span>
        </span>
        <svg
          className={`w-4 h-4 text-accent flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Rozbalovací obsah — plynulý max-height přechod, ať formulář nezakryje obrazovku */}
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-out ${
          open ? "max-h-[1400px]" : "max-h-0"
        }`}
      >
        <div className="p-5 sm:p-7">
          {sent ? (
            <div className="flex items-start gap-3 p-5 bg-accent/10 hairline">
              <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <div className="h-display text-[18px] text-mandik-ink">Požadavek odeslán</div>
                <p className="text-[13px] text-mandik-steel-80 mt-1 leading-relaxed">
                  Děkujeme. Náš servis se vám ozve co nejdříve, zpravidla do jednoho pracovního dne.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={labelCls}>
                  <span className={labelText}>Jméno a příjmení *</span>
                  <input required className={inputCls} placeholder="Jan Novák" />
                </label>
                <label className={labelCls}>
                  <span className={labelText}>Firma</span>
                  <input className={inputCls} />
                </label>
                <label className={labelCls}>
                  <span className={labelText}>E-mail *</span>
                  <input required type="email" className={inputCls} placeholder="jan.novak@firma.cz" />
                </label>
                <label className={labelCls}>
                  <span className={labelText}>Telefon</span>
                  <input className={inputCls} placeholder="+420" />
                </label>

                {/* Výběr divize — barevné chipy */}
                <div className="sm:col-span-2">
                  <span className={labelText}>Čeho se požadavek týká</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {DIVISION_CHIPS.map((d) => {
                      const active = division === d.code;
                      return (
                        <button
                          type="button"
                          key={d.code}
                          onClick={() => setDivision(active ? null : d.code)}
                          className={`px-4 py-2 hairline h-label text-[11px] transition-colors ${
                            active ? "text-mandik-ink" : "text-mandik-steel hover:bg-mandik-paper-soft"
                          }`}
                          style={active ? { background: d.color } : undefined}
                        >
                          {d.code}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="block sm:col-span-2">
                  <span className={labelText}>Popis požadavku *</span>
                  <textarea
                    required
                    rows={4}
                    className={inputCls}
                    placeholder="Popište prosím typ zařízení, výrobní číslo, závadu a místo instalace…"
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <label className="flex items-center gap-2 mono text-[11px] text-mandik-steel-80">
                  <input type="checkbox" required className="accent-[#26d07c]" />
                  Souhlasím se zpracováním osobních údajů
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 h-11 px-5 bg-accent text-mandik-ink h-label text-[11px] hover:bg-[#1ec170] transition-colors"
                >
                  <span>Odeslat požadavek</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const ServisScreen = () => {
  const goTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div data-screen-label="Servis" className="page-enter">
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-12 pb-12">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="col-span-12 lg:col-span-8">
              <SectionLabel>Servis</SectionLabel>
              <h1 className="h-display text-[40px] sm:text-[56px] lg:text-[72px] leading-[0.95] text-mandik-ink">
                Profesionální servis
                <br />
                <span className="text-mandik-steel">a technická podpora.</span>
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-4 text-mandik-steel-80 text-[15px] leading-relaxed">
              Odborné poradenství, rychlá pomoc a dlouhodobá péče po celou dobu životnosti vašich
              zařízení — v České republice i v zahraničí. Naším cílem je, aby vaše vzduchotechnické
              a topné zařízení fungovalo správně, spolehlivě a dlouhodobě.
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href="#kontakt"
                  onClick={goTo("kontakt")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-mandik-steel text-white h-label text-[11px] hover:bg-[#3e4d61] transition-colors"
                >
                  Kontakt a požadavek
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLUŽBY */}
      <section id="sluzby" className="bg-mandik-paper-soft scroll-mt-[132px] border-t border-mandik-rule">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <SectionLabel>Naše služby</SectionLabel>
          <SectionTitle className="mb-12">
            Servis napříč třemi divizemi<span className="text-mandik-steel">.</span>
          </SectionTitle>

          <div className="space-y-14">
            {SERVICE_DIVISIONS.map((division) => (
              <DivisionBlock key={division.code} division={division} />
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="bg-white scroll-mt-[132px] border-t border-mandik-rule">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <SectionLabel>Kontakt</SectionLabel>
          <SectionTitle className="mb-10">
            Spojte se s naším servisem<span className="text-mandik-steel">.</span>
          </SectionTitle>

          <div className="grid grid-cols-12 gap-px bg-mandik-rule hairline">
            {/* Kontaktní osoba */}
            <div className="col-span-12 lg:col-span-5 bg-mandik-steel text-white p-8 lg:p-10">
              <div className="h-label text-[10px] text-white/55">Kontaktní osoba</div>
              <div className="mt-3 h-display text-[26px] leading-tight">Patrik Vrsecký</div>
              <div className="mono text-[12px] text-white/65 mt-1">Vedoucí servisního oddělení</div>

              <div className="mt-8 space-y-5">
                <a href="tel:+420777789224" className="flex items-center gap-3 group">
                  <span className="w-9 h-9 border border-white/20 inline-flex items-center justify-center text-accent group-hover:border-accent transition-colors flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block h-label text-[9px] text-white/45">Telefon</span>
                    <span className="block mono text-[14px] text-white/90 group-hover:text-white transition-colors">+420 777 789 224</span>
                  </span>
                </a>
                <a href="mailto:service@mandik.com" className="flex items-center gap-3 group">
                  <span className="w-9 h-9 border border-white/20 inline-flex items-center justify-center text-accent group-hover:border-accent transition-colors flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block h-label text-[9px] text-white/45">E-mail</span>
                    <span className="block mono text-[14px] text-white/90 group-hover:text-white transition-colors">service@mandik.com</span>
                  </span>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-2 mono text-[12px] text-white/65">
                <span className="w-1.5 h-1.5 bg-accent" />
                Servisní linka · Po–Pá 8:00–16:00
              </div>
            </div>

            {/* Servisní požadavek (rozbalovací) */}
            <div className="col-span-12 lg:col-span-7 bg-mandik-paper-soft p-8 lg:p-10">
              <div className="h-label text-[10px] text-mandik-steel-70">Servisní požadavek</div>
              <p className="mt-3 text-mandik-steel-80 text-[14px] leading-relaxed max-w-md">
                Nedovoláte se nebo voláte mimo pracovní dobu? Vyplňte formulář a my se vám ozveme.
              </p>
              <div className="mt-6">
                <ServiceRequestForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
