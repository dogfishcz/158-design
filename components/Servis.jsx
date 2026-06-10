"use client";

import React from "react";
import { SectionTitle, Button } from "./Primitives";

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
        desc: "Opravy a údržba komponentů po uplynutí záruční doby, výměny dílů i profylaktická údržba.",
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
      "Kompletní péče o sestavné vzduchotechnické jednotky, od uvedení do provozu až po retrofit.",
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
        desc: "Montáž průmyslových topných systémů: tepelné clony, ohřívače a sálavé panely.",
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

// --- Karta jedné služby (s tlačítkem Přidat do poptávky) ---
const ServiceCard = ({ index, title, desc, color, added, onToggle }) => (
  <div
    style={{ "--tile-color": color }}
    className={`tile group relative flex flex-col bg-white p-6 pl-7 shadow-sm border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
      added ? "border-[color:var(--tile-color)]" : "border-transparent hover:border-[color:var(--tile-color)]"
    }`}
  >
    <span className="tile-bar" style={{ background: color }} />
    <div className="flex items-start gap-3.5">
      <span className="mono text-[11px] leading-none mt-1 tabular-nums" style={{ color }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1">
        <h4 className="h-display text-[17px] leading-tight text-mandik-ink">{title}</h4>
        <p className="text-[13px] text-mandik-steel-80 leading-relaxed mt-1.5">{desc}</p>
      </div>
    </div>

    {/* Tlačítko vpravo dole: šedé, hover/aktivní = výplň barvou divize zdola nahoru */}
    <div className="mt-auto pt-6 flex justify-end">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={added}
        className="relative overflow-hidden group/btn inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-mandik-rule h-label text-[10px] text-mandik-ink"
      >
        <span
          aria-hidden
          className={`absolute inset-x-0 bottom-0 transition-[height] duration-300 ease-out ${added ? "h-full" : "h-0 group-hover/btn:h-full"}`}
          style={{ background: color }}
        />
        <span className="relative inline-flex items-center gap-1.5">
          {added ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              V poptávce
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" /></svg>
              Přidat do poptávky
            </>
          )}
        </span>
      </button>
    </div>
  </div>
);

// --- Blok jedné divize (hlavička + mřížka služeb) ---
const DivisionBlock = ({ division, selectedKeys, onToggle }) => {
  const { code, name, color, intro, services } = division;
  return (
    <div className="relative">
      {/* Hlavička divize: název + barevná čárka pod ním */}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="h-display text-[26px] leading-none text-mandik-ink">{name}</h3>
        <span className="mono text-[11px] text-mandik-steel-70 whitespace-nowrap flex-shrink-0">
          {services.length} {sluzbaWord(services.length)}
        </span>
      </div>
      <div className="mt-3 h-1 w-12" style={{ background: color }} />
      <p className="text-mandik-steel-80 text-[14px] leading-relaxed max-w-2xl mt-4 mb-6">{intro}</p>

      {/* Mřížka služeb */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, i) => {
          const key = `${code}:${s.title}`;
          return (
            <ServiceCard
              key={key}
              index={i}
              title={s.title}
              desc={s.desc}
              color={color}
              added={selectedKeys.has(key)}
              onToggle={() => onToggle({ key, code, color, title: s.title })}
            />
          );
        })}
      </div>
    </div>
  );
};

// --- Formulář servisního požadavku (vždy otevřený) ---
const ServiceRequestForm = ({ selected, onRemove }) => {
  const [sent, setSent] = React.useState(false);

  const inputCls =
    "w-full mt-1 px-3 py-2.5 hairline bg-white text-[14px] outline-none focus:ring-1 focus:ring-accent transition-shadow";
  const labelCls = "block";
  const labelText = "h-label text-[10px] text-mandik-steel-70";

  if (sent) {
    return (
      <div className="hairline bg-white p-5 sm:p-7">
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
      </div>
    );
  }

  return (
    <div className="hairline bg-white p-5 sm:p-7">
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        {/* Služby přidané z dlaždic */}
        <div className="mb-5">
          <span className={labelText}>Vybrané služby{selected.length ? ` (${selected.length})` : ""}</span>
          {selected.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {selected.map((s) => (
                <span key={s.key} className="inline-flex items-center gap-2 px-3 py-1.5 hairline bg-white text-[12px] text-mandik-ink">
                  <span className="w-2 h-2 flex-shrink-0" style={{ background: s.color }} />
                  {s.title}
                  <button type="button" onClick={() => onRemove(s.key)} className="text-mandik-steel-70 hover:text-mandik-ink leading-none text-[13px]" aria-label={`Odebrat ${s.title}`}>✕</button>
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-[12px] text-mandik-steel-70">
              Vyberte služby tlačítkem „Přidat do poptávky" u dlaždic výše, nebo popište požadavek níže.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className={labelCls}>
            <span className={labelText}>Datum</span>
            <input type="date" className={inputCls} />
          </label>
          <div className={labelCls}>
            <span className={labelText}>Jedná se o záruční požadavek?</span>
            <label className="mt-1 flex items-center gap-2 h-[42px] text-[14px] text-mandik-steel cursor-pointer">
              <input type="checkbox" className="accent-[#26d07c]" /> Ano
            </label>
          </div>

          <label className="block sm:col-span-2">
            <span className={labelText}>Číslo objednávky (nezbytné v případě záruční opravy)</span>
            <input className={inputCls} />
          </label>

          <label className={labelCls}>
            <span className={labelText}>Typ zařízení</span>
            <input className={inputCls} />
          </label>
          <label className={labelCls}>
            <span className={labelText}>Sériové číslo</span>
            <input className={inputCls} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelText}>Název zařízení</span>
            <input className={inputCls} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelText}>Název provozovatele</span>
            <input className={inputCls} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelText}>Adresa, kde se zařízení nachází (kam má technik přijet)</span>
            <input className={inputCls} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelText}>Kontaktní osoba (jméno + telefon)</span>
            <input className={inputCls} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelText}>S čím potřebujete pomoci? *</span>
            <textarea required rows={4} className={inputCls} placeholder="Popište prosím typ zařízení, závadu a okolnosti…" />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelText}>Doplňující informace</span>
            <textarea rows={3} className={inputCls} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelText}>Odeslal(a)</span>
            <input className={inputCls} />
          </label>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="flex items-center gap-2 mono text-[11px] text-mandik-steel-80">
            <input type="checkbox" required className="accent-[#26d07c]" />
            Souhlasím se zpracováním osobních údajů
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-3 h-11 px-5 bg-accent text-mandik-ink h-label text-[11px] hover:bg-[#1ec170] transition-colors flex-shrink-0"
          >
            <span>Odeslat požadavek</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export const ServisScreen = () => {
  const [selected, setSelected] = React.useState([]);
  const selectedKeys = React.useMemo(() => new Set(selected.map((s) => s.key)), [selected]);
  const toggleService = (svc) =>
    setSelected((prev) => (prev.some((s) => s.key === svc.key) ? prev.filter((s) => s.key !== svc.key) : [...prev, svc]));
  const removeService = (key) => setSelected((prev) => prev.filter((s) => s.key !== key));

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
              <h1 className="h-display text-[40px] sm:text-[56px] lg:text-[72px] leading-[0.95] text-mandik-ink">
                Profesionální servis
                <br />
                <span className="text-mandik-steel">a technická podpora.</span>
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-4 text-mandik-steel-80 text-[15px] leading-relaxed">
              Odborné poradenství, rychlá pomoc a dlouhodobá péče po celou dobu životnosti vašich
              zařízení, v České republice i v zahraničí. Naším cílem je, aby vaše vzduchotechnické
              a topné zařízení fungovalo správně, spolehlivě a dlouhodobě.
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Button variant="primary" href="#kontakt" onClick={goTo("kontakt")}>Kontakt a požadavek</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLUŽBY */}
      <section id="sluzby" className="bg-mandik-paper-soft scroll-mt-[132px] border-t border-mandik-rule">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="mb-12">
            <SectionTitle>Naše služby</SectionTitle>
            <div className="mt-4 h-1 w-16 bg-accent" />
          </div>

          <div className="space-y-14">
            {SERVICE_DIVISIONS.map((division) => (
              <DivisionBlock
                key={division.code}
                division={division}
                selectedKeys={selectedKeys}
                onToggle={toggleService}
              />
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="bg-white scroll-mt-[132px] border-t border-mandik-rule">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="mb-10">
            <SectionTitle>Kontakt na servis</SectionTitle>
            <div className="mt-4 h-1 w-16 bg-accent" />
          </div>

          <div className="grid grid-cols-12 gap-px bg-mandik-rule hairline">
            {/* Kontaktní osoba */}
            <div className="col-span-12 lg:col-span-5 bg-mandik-steel text-white p-8 lg:p-10">
              <div className="h-label text-[10px] text-white/55">Kontaktní osoba</div>
              <div className="mt-3 h-display text-[26px] leading-tight">Petr Drahoš</div>
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
                Servisní linka · Po-Pá 8:00-16:00
              </div>
            </div>

            {/* Servisní požadavek (vždy otevřený) */}
            <div className="col-span-12 lg:col-span-7 bg-mandik-paper-soft p-8 lg:p-10">
              <div className="h-label text-[10px] text-mandik-steel-70">Servisní požadavek</div>
              <p className="mt-3 text-mandik-steel-80 text-[14px] leading-relaxed max-w-md">
                Nedovoláte se nebo voláte mimo pracovní dobu? Vyplňte formulář a my se vám ozveme.
              </p>
              <div className="mt-6">
                <ServiceRequestForm selected={selected} onRemove={removeService} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
