"use client";

import React from "react";
import { SectionLabel, SectionTitle, useInView, Reveal } from "./Primitives";

// Milníky převzaté z webu mandik-web (…run.app/#/o-nas), seřazené sestupně.
const TIMELINE = [
  { year: "2025", title: "Nová výrobní hala", body: "Společnost dokončila výstavbu nové moderní výrobní haly, která rozšířila naše kapacity a umožnila další rozvoj." },
  { year: "2024", title: "Dynamický růst", body: "Firma úspěšně navýšila obrat a pokračovala v dynamickém růstu napříč všemi oblastmi svého působení." },
  { year: "2023", title: "Miliardový obrat", body: "Firma poprvé v historii překračuje obrat 1mld CZK." },
  { year: "2022", title: "Nové vedení", body: "Řízení firmy přebírá Mgr. Jan Mičan." },
  { year: "2016", title: "Rekordní podíl vývozu", body: "Poměr vývozu na obratu dosahuje neuvěřitelných 70%." },
  { year: "2015", title: "Černobyl a růst zaměstnanců", body: "Firma MANDÍK dodává chladící jednotky pro „sarkofág“ havarované jaderné elektrárny Černobyl, společnost MANDÍK zaměstnává už více než 200 kmenových pracovníků." },
  { year: "2012", title: "Projekt ITER", body: "Společnost MANDÍK je dodavatelem pro mezinárodní vědecký projekt ITER (první fúzní reaktor, který vyrobí více energie, než spotřebuje)." },
  { year: "2010", title: "Švýcarské tunely", body: "Požární klapky MANDÍK osazovány do švýcarských tunelů." },
  { year: "2009", title: "Evropská expanze", body: "Obrat firmy cca 239mio CZK a firma začíná expandovat vývozem do Evropy." },
  { year: "2008", title: "Generační změna", body: "Řízení firmy se ujímá Mgr. Marcel Mandík." },
  { year: "2006", title: "Nové prostory", body: "Stěhování do nových výrobně-administrativních prostor." },
  { year: "2005", title: "Dodávka do Finska", body: "Firma MANDÍK je dodavatelem požárních klapek pro finskou jadernou elektrárnu Olkiluoto." },
  { year: "2004", title: "Dodávka do pražského metra", body: "Požární klapky MANDÍK dodávány jako bezpečnostní prvek do pražského metra." },
  { year: "2002", title: "Transformace na akciovou společnost", body: "Transformace z OSVČ na akciovou společnost, je zapsána právní forma akciové společnosti a oficiálně vzniká MANDÍK, a.s." },
  { year: "1996", title: "Dodávka na Temelín", body: "Pan Mandík je jedinou fyzickou osobou, která dodává na stavbu jaderné elektrárny Temelín (protipožární klapky)." },
  { year: "1993", title: "Začátek výroby protipožárních klapek", body: "Obrat cca 79mio CZK, pan Vlastimil Mandík již vyrábí protipožární klapky." },
  { year: "1991", title: "Růst firmy", body: "Obrat cca 5mio CZK tvořený převážně z drobných zámečnických zakázek, touto dobou ve firmě pracuje už 10 zaměstnanců." },
  { year: "1990", title: "Založení firmy", body: "Zakladatel Vlastimil Mandík začíná podnikat jako OSVČ v garáži rodného domku. Na první materiál si půjčil od rodičů 20 tis. Kč, neměl zavedený telefon, ani žádné kontakty." },
];

// Statická scéna (bez parallaxu) - fotka + gradient + volitelný velký popisek.
const Scene = ({ label, img, h = 540, big, tint = 0.5 }) => {
  const [failed, setFailed] = React.useState(false);
  const showImg = img && !failed;
  return (
    <div className="relative overflow-hidden bg-mandik-steel hairline" style={{ height: h }}>
      <div className="absolute inset-0">
        {showImg ? (
          <img src={img} alt={label || ""} loading="lazy" className="w-full h-full object-cover" onError={() => setFailed(true)} />
        ) : (
          <div className="w-full h-full img-placeholder"><span style={{ fontSize: 13 }}>{label}</span></div>
        )}
      </div>
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(26,26,26,${tint}), rgba(26,26,26,${tint * 0.2}) 55%, transparent)` }} />
      {big && (
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="mono text-[10px] uppercase tracking-wider text-white/80 mb-2">{big.k}</div>
          <div className="h-display text-[28px] sm:text-[44px] leading-[1.05] max-w-2xl">{big.t}</div>
        </div>
      )}
    </div>
  );
};

const Timeline = () => (
  <section className="bg-white border-t border-mandik-rule">
    <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
      <SectionLabel>Časová osa</SectionLabel>
      <SectionTitle className="mb-14">Tři dekády české výroby<span className="text-mandik-steel">.</span></SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-mandik-rule hairline">
        {TIMELINE.map((t) => (
          <div key={t.year} className="bg-white p-7">
            <div className="h-display text-[36px] text-mandik-steel">{t.year}</div>
            <div className="mt-2 h-1 w-8 bg-accent" />
            <div className="mt-5 h-display text-[18px] leading-tight">{t.title}</div>
            <div className="mt-2 text-[13px] text-mandik-steel-80 leading-relaxed">{t.body}</div>
          </div>
        ))}
        {Array.from({ length: (4 - (TIMELINE.length % 4)) % 4 }).map((_, i) => (
          <div key={`fill-${i}`} className="hidden lg:block bg-white" />
        ))}
      </div>
    </div>
  </section>
);

const ABOUT_STATS = [
  { value: 62000, suffix: " m²", label: "Výrobních ploch", sub: "Hala A · B · C" },
  { value: 350, suffix: "+", label: "Zaměstnanců", sub: "" },
  { value: 48700, suffix: "+", label: "Dokončených projektů", sub: "1990-2026" },
];

// Stat box ve stylu homepage: bílé číslo + zelený suffix na tmavém steel pruhu,
// hover = zelená linka zespodu + zvětšení čísla, počítání od nuly.
const AboutStatBox = ({ value, suffix, label, sub, inView, isFirst, isLast }) => {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <div className={`group relative bg-mandik-steel flex flex-col items-center justify-center text-center px-6 py-6 overflow-hidden transition-colors duration-300 hover:bg-mandik-steel-90 border-y border-transparent hover:border-white/10 ${isFirst ? "border-l" : ""} ${isLast ? "border-r" : ""}`}>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-1/2" />
      <div className="h-display text-[40px] lg:text-[52px] leading-none text-white tabular-nums transition-transform duration-300 group-hover:scale-110">
        {n.toLocaleString("cs-CZ")}<span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-3 h-label text-[11px] text-white/55 transition-colors duration-300 group-hover:text-white/85">
        {label}
      </div>
      {sub && <div className="mt-1 text-[11px] text-white/40">{sub}</div>}
    </div>
  );
};

const Numbers = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  return (
    <section ref={ref} className="bg-mandik-steel border-y-4 border-accent">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
        <SectionLabel color="#26d07c">Výroba v číslech</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 mt-4">
          {ABOUT_STATS.map((s, i) => (
            <AboutStatBox key={s.label} {...s} inView={inView} isFirst={i === 0} isLast={i === ABOUT_STATS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Family = () => (
  <section className="bg-mandik-paper-soft">
    <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-24 grid grid-cols-12 gap-10 items-center">
      <div className="col-span-12 lg:col-span-5 relative">
        <div className="relative overflow-hidden hairline" style={{ aspectRatio: "4 / 3" }}>
          <img src="/assets/about/interier.jpg" alt="Vstupní hala a recepce MANDÍK a.s." loading="lazy" className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }} />
        </div>
        <div className="absolute bottom-4 left-4 mono text-[10px] text-white/90 bg-mandik-ink/70 px-2 py-1">INTERIÉR · ADMINISTRATIVNÍ BUDOVA</div>
      </div>
      <div className="col-span-12 lg:col-span-7">
        <SectionLabel>Rodinná firma</SectionLabel>
        <h2 className="h-display text-[36px] sm:text-[44px] leading-[1.05] text-mandik-ink">Druhá generace.<br/>Stejná značka.</h2>
        <p className="mt-6 text-mandik-steel-80 text-[16px] leading-relaxed max-w-xl">
          MANDÍK je rodinná společnost, od roku 1990 ve vlastnictví zakladatelské rodiny. Druhá generace převzala vedení v roce 2008. Vývoj, výroba i&nbsp;servis zůstávají v&nbsp;Hostomicích.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-mandik-rule hairline">
          {[
            { name: "Vlastimil Mandík", role: "Zakladatel · 1990" },
            { name: "Marcel Mandík", role: "Předseda představenstva" },
            { name: "Jan Mičan", role: "CEO - Generální ředitel" },
          ].map((p, i, arr) => (
            <div key={p.name} className={`group relative bg-white p-5 overflow-hidden transition-colors duration-300 hover:bg-mandik-paper-soft border-y border-transparent hover:border-mandik-rule ${i === 0 ? "border-l" : ""} ${i === arr.length - 1 ? "border-r" : ""}`}>
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-1/2" />
              <div className="h-display text-[18px] text-mandik-ink transition-transform duration-300 origin-left group-hover:scale-105">{p.name}</div>
              <div className="mono text-[11px] text-mandik-steel-70 mt-1 transition-colors duration-300 group-hover:text-mandik-steel">{p.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const History = () => (
  <section className="bg-white border-t border-mandik-rule">
    <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-24 grid grid-cols-12 gap-10 lg:gap-14 items-start">
      <div className="col-span-12 lg:col-span-5">
        <SectionTitle className="mb-8">Naše historie<span className="text-mandik-steel">.</span></SectionTitle>
        <div className="space-y-5 text-[15px] lg:text-[16px] text-mandik-steel-80 leading-relaxed max-w-2xl">
          <p>Rodina MANDÍKů je po staletí spojena s&nbsp;kovářským řemeslem v&nbsp;Neumětelích. Právě tam byly v&nbsp;roce 1990 položeny základy nynější firmy MANDÍK, a.s., a&nbsp;to jejím zakladatelem Vlastimilem Mandíkem. Bez počátečního kapitálu a&nbsp;kontaktů se začala z&nbsp;původní malé vesnické kovárny rodit firma, která si svými precizními výrobky a&nbsp;přístupem k&nbsp;zákazníkům vydobyla významné postavení na českém trhu.</p>
          <p>Když Vlastimil Mandík předal řízení firmy svému synovi Marcelovi Mandíkovi, našel v&nbsp;něm více než důstojného nástupce. Ten čtyřnásobně zvýšil obrat díky expanzi do Evropy a&nbsp;posunul tak společnost do mezinárodního prostředí evropské konkurence, kde firmu MANDÍK, a.s. pevně ukotvil.</p>
          <p>Bez nezbytných atributů, technologicky vyspělých produktů, poctivosti, spolehlivosti a&nbsp;vstřícnosti k&nbsp;zákazníkům, by se mu to nepodařilo. A&nbsp;právě díky těmto hodnotám se společnost již desítky let neustále posouvá a&nbsp;rozvíjí.</p>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7">
        <div className="relative overflow-hidden hairline" style={{ aspectRatio: "4 / 3" }}>
          <img src="/assets/about/exterier-firma.jpg" alt="Sídlo a výrobní areál MANDÍK a.s. v Hostomicích" loading="lazy" className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }} />
        </div>
      </div>
    </div>
  </section>
);

export const AboutScreen = () => {
  return (
    <div data-screen-label="About" className="page-enter pt-[108px]">
      <section className="bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-12 pb-10">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="col-span-12 lg:col-span-8">
              <SectionLabel>O společnosti</SectionLabel>
              <h1 className="h-display text-[34px] sm:text-[48px] lg:text-[60px] leading-[1.04]">
                Jsme největší český výrobce komponent pro <span className="text-mandik-steel">větrání a&nbsp;požární bezpečnost budov</span>
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-4 text-mandik-steel-80 text-[15px] leading-relaxed">
              MANDÍK a.s. je česká rodinná společnost specializovaná na protipožární a vzduchotechnické komponenty, vzduchotechnické jednotky a průmyslové topné systémy. Vyrábíme pro výškové budovy, jaderné elektrárny a technologické kampusy napříč Evropou.
            </div>
          </div>
        </div>

        {/* Full-bleed headquarters hero */}
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pb-14">
          <div className="relative">
            <Scene
              h={620}
              img="/assets/about/hlavni-vchod.jpg"
              label="SÍDLO MANDÍK A.S. · HOSTOMICE"
              tint={0.42}
              big={{ k: "Dobříšská 550 · 267 24 Hostomice · 49°51′N 14°02′E", t: "Jedno místo. Obchod, výroba i vývoj pod jednou střechou." }}
            />
            <div className="absolute top-5 left-5 bg-accent text-mandik-ink h-label text-[10px] px-2 py-1">SÍDLO & VÝROBA</div>
          </div>
        </div>
      </section>

      <Reveal><Numbers /></Reveal>
      <Reveal><Family /></Reveal>

      {/* Production storytelling - real machines */}
      <Reveal>
      <section className="bg-white border-t border-mandik-rule">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-14 lg:pt-20">
          <SectionLabel>Strojový park</SectionLabel>
          <SectionTitle className="mb-3">Malá ukázka<br/>našeho vybavení<span className="text-mandik-steel">.</span></SectionTitle>
          <p className="mb-10 text-[15px] text-mandik-steel-80 leading-relaxed max-w-2xl">
            Pár strojů z&nbsp;našeho strojového parku, na kterých ve&nbsp;výrobě vznikají naše komponenty.
          </p>
        </div>

        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pb-6 lg:pb-10 grid grid-cols-12 gap-px bg-mandik-rule hairline">
          {/* 01 - punching */}
          <div className="col-span-12 lg:col-span-7 bg-white">
            <Scene h={560} img="/assets/about/vysekavac.jpg" label="VYSEKÁVACÍ LIS TRUMPF · LINKA Č. 4"
              big={{ k: "CNC vysekávání · TRUMPF TruPunch", t: "Děrování, prostřihy a tvarové výřezy z jedné tabule." }} tint={0.45} />
          </div>
          <div className="col-span-12 lg:col-span-5 bg-white p-8 lg:p-10 flex flex-col justify-center">
            <div className="mono text-[10px] uppercase tracking-wider text-mandik-steel-70">01 / 03 · Vysekávání</div>
            <div className="mt-3 h-display text-[28px] leading-tight">Plech, díra, prostřih.</div>
            <p className="mt-5 text-[14px] text-mandik-steel-80 leading-relaxed">
              Začínáme tabulí pozinkovaného plechu 0,5 až 5&nbsp;mm. CNC vysekávací lisy TRUMPF děrují montážní otvory, větrací prostřihy a tvarové výřezy s opakovatelností pod 0,1&nbsp;mm.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4 mono text-[12px]">
              <div><div className="text-mandik-steel-70">Tloušťka plechu</div><div className="text-mandik-ink text-[14px] mt-1">0,5 až 5 mm</div></div>
              <div><div className="text-mandik-steel-70">Opakovatelnost</div><div className="text-mandik-ink text-[14px] mt-1">± 0,1 mm</div></div>
            </div>
          </div>

          {/* 02 - bending */}
          <div className="col-span-12 lg:col-span-5 bg-white p-8 lg:p-10 flex flex-col justify-center order-last lg:order-none">
            <div className="mono text-[10px] uppercase tracking-wider text-mandik-steel-70">02 / 03 · Ohraňování</div>
            <div className="mt-3 h-display text-[28px] leading-tight">Hrana, příruba, skříň.</div>
            <p className="mt-5 text-[14px] text-mandik-steel-80 leading-relaxed">
              Ohraňovací centrum Schröder PowerBend Professional ohýbá stěny skříní a příruby na přesný úhel. Automatické polohování plechu zajišťuje, že každá klapka stejného typu vyjde identická.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4 mono text-[12px]">
              <div><div className="text-mandik-steel-70">Stroj</div><div className="text-mandik-ink text-[14px] mt-1">Schröder PowerBend</div></div>
              <div><div className="text-mandik-steel-70">Přesnost úhlu</div><div className="text-mandik-ink text-[14px] mt-1">± 0,5°</div></div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 bg-white">
            <Scene h={560} img="/assets/about/cnc-ohybacka.jpg" label="OHRAŇOVACÍ CENTRUM SCHRÖDER POWERBEND PROFESSIONAL"
              big={{ k: "CNC ohraňování · Schröder Group", t: "Ohyb stěn a přírub na přesný úhel, plně automaticky." }} tint={0.45} />
          </div>

          {/* 03 - Promat milling */}
          <div className="col-span-12 lg:col-span-7 bg-white">
            <Scene h={560} img="/assets/about/freza.jpg" label="FRÉZA NA PROMAT · CNC"
              big={{ k: "CNC frézování · kalcium-silikát", t: "Vyfrézování listu klapky z desky Promat." }} tint={0.45} />
          </div>
          <div className="col-span-12 lg:col-span-5 bg-white p-8 lg:p-10 flex flex-col justify-center">
            <div className="mono text-[10px] uppercase tracking-wider text-mandik-steel-70">03 / 03 · Frézování</div>
            <div className="mt-3 h-display text-[28px] leading-tight">List z kalcium-silikátu.</div>
            <p className="mt-5 text-[14px] text-mandik-steel-80 leading-relaxed">
              Srdcem každé protipožární klapky je list z&nbsp;kalcium-silikátové desky Promat. CNC fréza ho vyřízne a profrézuje na přesný tvar, hrany sedí na desetiny milimetru. Po obvodu doplníme intumescentní těsnění, které se při požáru roztáhne a&nbsp;těsně uzavře průřez.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4 mono text-[12px]">
              <div><div className="text-mandik-steel-70">Materiál</div><div className="text-mandik-ink text-[14px] mt-1">Promat (kalcium-silikát)</div></div>
              <div><div className="text-mandik-steel-70">Tolerance</div><div className="text-mandik-ink text-[14px] mt-1">± 0,1 mm</div></div>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal><History /></Reveal>
      <Reveal><Timeline /></Reveal>
    </div>
  );
};
