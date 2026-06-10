"use client";

import React from "react";

// Kariéra, rozklikávací (accordion) seznam otevřených pozic.
// Detail pozic přebrán z inzerátů na jobs.cz (MANDÍK, a.s.).
const POSITIONS = [
  {
    title: "Vývojový konstruktér AHC",
    subtitle: "Vývoj vzduchotechnických komponent",
    location: "Hostomice (okr. Beroun)",
    type: "Plný úvazek · HPP",
    note: "Vhodné i pro absolventy",
    url: "https://www.jobs.cz/rpd/2001259134/",
    sections: [
      {
        title: "Náplň práce",
        items: [
          "Vývoj a konstrukční návrh nových vzduchotechnických komponent",
          "Tvorba technických řešení a konstrukčních konceptů",
          "Spolupráce s výrobou při přípravě prototypů",
          "Spolupráce se zkušebnami a laboratořemi při měření technických parametrů",
          "Vyhodnocování a implementace výsledků zkoušek a měření",
          "Technická podpora výrobního a obchodního oddělení",
        ],
      },
      {
        title: "Požadujeme",
        items: [
          "VŠ vzdělání technického směru (strojírenství, TZB nebo příbuzný obor)",
          "Angličtinu na komunikativní úrovni",
          "Zkušenost s 3D CAD softwarem (SolidWorks výhodou)",
          "Modelování proudění (např. Fluent), výhodou",
          "Orientaci v technické dokumentaci a normách",
          "Analytické a systematické myšlení",
          "Samostatnost, zodpovědnost a ochotu učit se",
        ],
      },
      {
        title: "Nabízíme",
        items: [
          "Nadstandardní finanční ohodnocení",
          "Stabilní zázemí české firmy s dlouhodobou perspektivou",
          "Práci na zajímavých vývojových projektech",
          "Moderní prostředí a kvalitní technické vybavení",
          "Podporu zaučení a možnost odborného růstu",
          "Pružnou pracovní dobu a příspěvek na MultiSport kartu",
          "Nástup ihned nebo dle dohody",
        ],
      },
    ],
  },
  {
    title: "R&D Engineer, Heat Transfer & Fluid Dynamics",
    subtitle: "Výpočty a návrh vzduchotechnických jednotek (AHU)",
    location: "Hostomice (okr. Beroun)",
    type: "Plný úvazek · HPP",
    note: "",
    url: "https://www.jobs.cz/rpd/2001145784/",
    sections: [
      {
        title: "Co budete dělat",
        items: [
          "Provádět výpočty a navrhovat vzduchotechnické jednotky (AHU)",
          "Řešit přenos tepla, vlhký vzduch, hydrauliku a tlakové ztráty",
          "Spolupracovat s konstruktéry a podporovat softwarový vývoj",
          "Ověřovat funkčnost řešení na prototypech",
          "Připravovat technickou dokumentaci",
        ],
      },
      {
        title: "Co od vás očekáváme",
        items: [
          "VŠ vzdělání technického směru (strojní inženýrství, TZB, energetika)",
          "MS Excel na dobré úrovni",
          "Orientaci ve fyzice (mechanika tekutin, přenos tepla)",
          "Angličtinu pro čtení technické dokumentace",
          "Samostatnost, zodpovědnost a chuť se učit",
          "Výhodou: programování (VBA, Python) a modelování proudění (Fluent)",
        ],
      },
      {
        title: "Co nabízíme",
        items: [
          "Nadstandardní finanční ohodnocení",
          "Stabilní zázemí české firmy a dlouhodobou perspektivu",
          "Moderní prostředí a kvalitní technické vybavení",
          "Podporu při zaučení a možnost odborného růstu",
          "Pružnou pracovní dobu a příspěvek na MultiSport kartu",
          "Mobilní telefon, notebook, vzdělávací kurzy a prémie",
          "Nástup ihned nebo dle dohody",
        ],
      },
    ],
  },
  {
    title: "Technik elektro se základy PLC",
    subtitle: "Řídicí systémy PLC / Climatix",
    location: "Hostomice (okr. Beroun)",
    type: "Plný úvazek · HPP",
    note: "Vhodné i pro absolventy",
    url: "https://www.jobs.cz/rpd/2001140590/",
    sections: [
      {
        title: "Co budete dělat",
        items: [
          "Testovat funkčnost řídicích systémů (PLC / Climatix) u zařízení",
          "Parametrizovat a nastavovat řídicí logiku",
          "Spolupracovat s vývojem na ladění atypických řešení",
          "Podporovat servis u složitějších technických případů",
          "Pracovat s technickou dokumentací a podklady k zakázkám",
        ],
      },
      {
        title: "Koho hledáme",
        items: [
          "SŠ/VŠ vzdělání technického směru (elektro / automatizace výhodou)",
          "Technické myšlení a zájem o řízení zařízení",
          "Základní orientaci v PLC / automatizaci (praxe výhodou, ne podmínkou)",
          "Schopnost číst elektrotechnickou dokumentaci",
          "Samostatnost, pečlivost a systematičnost",
        ],
      },
      {
        title: "Co nabízíme",
        items: [
          "Nadstandardní finanční ohodnocení",
          "Školení v platformě Climatix a růst do expertní role",
          "Stabilní firmu s vlastním vývojem",
          "Smysluplnou technickou práci s viditelným dopadem",
          "Nástup ihned nebo dle dohody",
        ],
      },
    ],
  },
];

function PositionItem({ pos }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="hairline bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left hover:bg-mandik-paper-soft transition-colors"
      >
        <div>
          <div className="h-display text-[20px] sm:text-[24px] leading-tight text-mandik-ink">{pos.title}</div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 mono text-[11px] text-mandik-steel-70">
            <span>{pos.location}</span>
            <span className="text-mandik-rule">·</span>
            <span>{pos.type}</span>
            {pos.note && (
              <>
                <span className="text-mandik-rule">·</span>
                <span className="text-accent">{pos.note}</span>
              </>
            )}
          </div>
        </div>
        <span className="flex-shrink-0 w-9 h-9 hairline flex items-center justify-center text-accent">
          <svg className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div className={`overflow-hidden transition-[max-height] duration-500 ease-out ${open ? "max-h-[2000px]" : "max-h-0"}`}>
        <div className="px-5 sm:px-7 pb-8 pt-1 border-t border-mandik-rule">
          {pos.subtitle && (
            <p className="text-mandik-steel-80 text-[15px] leading-relaxed mt-5 mb-7">{pos.subtitle}</p>
          )}
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
            {pos.sections.map((sec) => (
              <div key={sec.title}>
                <h3 className="h-label text-[12px] text-mandik-ink mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent" />
                  {sec.title}
                </h3>
                <ul className="space-y-2">
                  {sec.items.map((it, i) => (
                    <li key={i} className="flex gap-2.5 text-[14px] text-mandik-steel-80 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 bg-accent shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-9">
            <a
              href={pos.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 h-11 px-6 bg-accent text-mandik-ink h-label text-[11px] hover:bg-[#1ec170] transition-colors"
            >
              Reagovat na pozici
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
            <span className="ml-4 mono text-[11px] text-mandik-steel-70">přesměruje na jobs.cz</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const HR_CONTACTS = [
  { name: "Křeček Václav", role: "personální manažer", tel: "+420 311 706 901", mob: "+420 777 789 241", email: "vaclav.krecek@mandik.cz" },
  { name: "Vojnová Lenka", role: "personální asistentka", tel: "+420 311 706 901", mob: "+420 777 789 229", email: "lenka.vojnova@mandik.cz" },
];

// Formulář pro zájemce (v8 design). Klientský stub, stejně jako ostatní formuláře zatím neodesílá na backend.
function KarieraForm() {
  const [sent, setSent] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const inputCls =
    "w-full px-4 py-3 hairline bg-white text-[14px] text-mandik-ink placeholder:text-mandik-steel-70 outline-none focus:ring-1 focus:ring-accent transition-shadow";

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return setFileName("");
    if (f.size > 5 * 1024 * 1024) { e.target.value = ""; setFileName("Soubor je větší než 5 MB"); return; }
    setFileName(f.name);
  }

  if (sent) {
    return (
      <div className="hairline bg-accent/10 p-6 flex items-start gap-3">
        <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <div>
          <div className="h-display text-[18px] text-mandik-ink">Odesláno</div>
          <p className="text-[13px] text-mandik-steel-80 mt-1 leading-relaxed">Děkujeme za váš zájem. Personální oddělení se vám ozve co nejdříve.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="hairline bg-white p-5 sm:p-7 space-y-3">
      <input required placeholder="Jméno" className={inputCls} />
      <input required type="email" placeholder="E-mail" className={inputCls} />
      <input placeholder="Pozice" className={inputCls} />
      <input placeholder="Telefon" className={inputCls} />
      <textarea rows={5} placeholder="Vaše zpráva" className={inputCls} />
      <div>
        <span className="h-label text-[10px] text-mandik-steel-70">Vložit přílohu (CV, max 5 MB)</span>
        <div className="mt-1 flex items-center gap-3">
          <label className="inline-flex items-center gap-2 px-4 py-2.5 hairline bg-white text-[13px] text-mandik-steel cursor-pointer hover:bg-mandik-paper-soft transition-colors">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            Vybrat soubor
            <input type="file" className="hidden" onChange={onFile} />
          </label>
          {fileName && <span className="mono text-[11px] text-mandik-steel-70 truncate">{fileName}</span>}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <label className="flex items-center gap-2 mono text-[11px] text-mandik-steel-80">
          <input type="checkbox" required className="accent-[#26d07c]" />
          Souhlasím se zpracováním osobních údajů
        </label>
        <button type="submit" className="inline-flex items-center gap-3 h-11 px-6 bg-accent text-mandik-ink h-label text-[11px] hover:bg-[#1ec170] transition-colors">
          Odeslat
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>
    </form>
  );
}

export function KarieraScreen() {
  return (
    <div className="bg-white">
      <div className="max-w-site mx-auto px-6 lg:px-10 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mono text-[11px] text-mandik-steel-70 mb-10">
          <a href="/" className="hover:text-mandik-ink transition-colors">Domů</a>
          <span>/</span>
          <span className="text-mandik-ink">Kariéra</span>
        </nav>

        {/* Hlavička */}
        <header className="mb-10">
          <h1 className="h-display text-[40px] sm:text-[48px] leading-[1.05] text-mandik-ink">Kariéra</h1>
          <div className="mt-4 h-1 w-16 bg-accent" />
          <p className="mt-6 max-w-2xl text-[15px] text-mandik-steel-80 leading-relaxed">
            Jsme česká rodinná manufaktura s vlastním vývojem a výrobou vzduchotechniky v Hostomicích.
            Hledáme kolegy, kteří chtějí stavět věci, na kterých záleží. Rozklikněte si pozici a podívejte se na detail.
          </p>
        </header>

        {/* Otevřené pozice */}
        <div className="space-y-4">
          {POSITIONS.map((p) => (
            <PositionItem key={p.url} pos={p} />
          ))}
        </div>

        {/* Personální oddělení + formulář */}
        <section className="mt-16 pt-12 border-t border-mandik-rule">
          <h2 className="h-display text-[26px] text-mandik-ink">Pro více informací kontaktujte personální oddělení</h2>
          <div className="mt-2 h-1 w-12 bg-accent" />

          <div className="mt-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Kontakty */}
            <div className="space-y-8">
              {HR_CONTACTS.map((p) => (
                <div key={p.email}>
                  <div className="h-display text-[18px] text-mandik-ink">
                    {p.name} <span className="text-mandik-steel-70 font-normal">- {p.role}</span>
                  </div>
                  <div className="mt-2 space-y-1 text-[14px] text-mandik-steel-80">
                    <div>tel.: <a href={`tel:${p.tel.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">{p.tel}</a></div>
                    <div>mob.: <a href={`tel:${p.mob.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">{p.mob}</a></div>
                    <div>e-mail: <a href={`mailto:${p.email}`} className="text-accent hover:underline">{p.email}</a></div>
                  </div>
                </div>
              ))}
              <p className="text-[13px] text-mandik-steel-70 leading-relaxed pt-2">
                Nenašli jste vhodnou pozici? Ozvěte se i&nbsp;tak, rádi se na vás podíváme i&nbsp;mimo aktuálně vypsané pozice.
              </p>
            </div>

            {/* Formulář */}
            <KarieraForm />
          </div>
        </section>
      </div>
    </div>
  );
}
