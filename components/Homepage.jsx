"use client";

import React from "react";
import { SectionTitle, Button, useInView, Reveal } from "./Primitives";
import { EuropeMap, PINS, AREA_COLOR } from "./EuropeMap";

const HERO_VIDEO = "/assets/hero.webm";

// Smart routing (jako ve v5):
//   - Vzduchotechnické komponenty obsahuje 5 kategorií → klik vede na divize stránku.
//   - Ostatní divize mají jen 1 kategorii → klik přeskočí mezistránku a vede rovnou
//     na danou kategorii (/vyroba/[category-slug]).
const HOMEPAGE_TILES = [
  {
    color: "#74d1ea",
    code: "AHC",
    title: "Vzduchotechnické komponenty",
    sub: "Protipožární a regulační klapky, mřížky, tlumiče, anemostaty.",
    spec: "EI 30 — EI 240 · do 1 600 × 1 000 mm",
    qty: "1 240+ položek",
    photo: "VZDUCHOTECHNICKÉ KOMPONENTY",
    img: "/assets/division-vzt.jpg",
    href: "/vyroba/divize/vzduchotechnicke-komponenty",
  },
  {
    color: "#26d07c",
    code: "AHU",
    title: "Vzduchotechnické jednotky",
    sub: "Sestavné a kompaktní vzduchotechnické\njednotky, měření a regulace.",
    spec: "do 100 000 m³/h · VDI 6022",
    qty: "9 řad · OEM",
    photo: "VZDUCHOTECHNICKÉ JEDNOTKY",
    img: "/assets/division-ahu.jpg",
    href: "/vyroba/vzduchotechnicke-jednotky",
  },
  {
    color: "#f2a900",
    code: "HEAT",
    title: "Průmyslové vytápění",
    sub: "Teplovzdušné agregáty, sálavé panely, plynová tepelná čerpadla.",
    spec: "5 — 1 200 kW",
    qty: "MONZUN · HEATWING",
    photo: "PRŮMYSLOVÉ VYTÁPĚNÍ",
    img: "/assets/division-heat.jpg",
    href: "/vyroba/prumyslove-vytapeni-a-chlazeni",
  },
  {
    color: "#ffd700",
    code: "SPEC",
    title: "Speciální aplikace",
    sub: "Jaderná technika, tunelové systémy, vývoj na zakázku.",
    spec: "KTA 1401 · 10CFR APP10 · EN 12101-3",
    qty: "OEM",
    photo: "SPECIÁLNÍ APLIKACE",
    img: "/assets/division-spec.jpg",
    href: "/vyroba/specialni-aplikace",
  },
];

const NEWS = [
  { date: "12. 5. 2026", cat: "Vývoj", title: "Nová generace PKTM IV+ s protokolem BACnet vstupuje do certifikace EI 240", img: "VÝVOJ" },
  { date: "30. 4. 2026", cat: "Reference", title: "Dodávka 1 340 kusů PKI-EI pro 22 Bishopsgate v Londýně dokončena", img: "REFERENCE" },
  { date: "14. 4. 2026", cat: "Výroba", title: "Otevíráme novou výrobní halu Hostomice III — +18 000 m² pro AHU", img: "VÝROBA" },
];

const Hero = ({ onNav, mediaStyle = "video", parallax = true }) => {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    if (!parallax) return;
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [parallax]);

  return (
    <section className="relative h-[100vh] min-h-[720px] bg-mandik-steel overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ transform: parallax ? `translateY(${y * 0.25}px) scale(1.05)` : "none", transition: "transform 0.05s linear" }}
      >
        {mediaStyle === "video" ? (
          <video
            src={HERO_VIDEO}
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full img-placeholder">
            <span style={{ fontSize: 14 }}>VIDEO HERO · VÝROBA HOSTOMICE</span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 hero-tint" />
      <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.55), transparent)" }} />

      <div className="relative h-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col justify-end pb-12 sm:pb-20 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <h1 className="h-display text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.05] lg:leading-[1.0] text-white">
              Jsme největší český výrobce komponent pro větrání a&nbsp;požární bezpečnost budov
            </h1>
            <p className="mt-5 lg:mt-7 text-white/80 text-[15px] sm:text-[17px] lg:text-[18px] max-w-xl leading-relaxed">
              Od vlastního vývoje a&nbsp;výroby až po globální obchod. Propojujeme špičkové technologie s&nbsp;náročnými požadavky kritické infrastruktury, high-tech budov a&nbsp;jaderné energetiky.
            </p>
            <div className="mt-6 lg:mt-9 flex items-center gap-3 flex-wrap">
              <Button variant="primary" href="#vyrobky" onClick={(e) => { const el = document.getElementById("vyrobky"); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); } }}>Prohlédnout výrobky</Button>
              <Button variant="invertGhost" href="/o-nas">Naše společnost</Button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

const HOMEPAGE_STATS = [
  { value: 33, suffix: "+", label: "Let na trhu" },
  { value: 30, suffix: "+", label: "Zemí dodávek" },
  { value: 350, suffix: "+", label: "Zaměstnanců" },
  { value: 60, suffix: " mil.", label: "EUR obrat" },
];

// Jedna statistika = obdélník v šedém pruhu. Hover: zesvětlení pozadí,
// zelená linka vyjede zespodu, číslo se zvětší, popisek se projasní.
const StatBox = ({ value, suffix, label, inView, isFirst, isLast }) => {
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
    <div className={`group relative bg-mandik-steel flex flex-col items-center justify-center text-center px-6 py-9 overflow-hidden transition-colors duration-300 hover:bg-mandik-steel-90 border-y border-transparent hover:border-white/10 ${isFirst ? "border-l" : ""} ${isLast ? "border-r" : ""}`}>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-1/2" />
      <div className="h-display text-[40px] lg:text-[52px] leading-none text-white tabular-nums transition-transform duration-300 group-hover:scale-110">
        {n.toLocaleString("cs-CZ")}<span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-3 h-label text-[11px] text-white/55 transition-colors duration-300 group-hover:text-white/85">
        {label}
      </div>
    </div>
  );
};

const StatsStrip = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  return (
    <section ref={ref} className="bg-mandik-steel border-b-4 border-accent">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-5 lg:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {HOMEPAGE_STATS.map((s, i) => (
            <StatBox key={s.label} {...s} inView={inView} isFirst={i === 0} isLast={i === HOMEPAGE_STATS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryGrid = ({ onNav }) => (
  <section id="vyrobky" className="bg-mandik-paper-soft scroll-mt-[120px]">
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-10 lg:mb-12">
        <div className="lg:col-span-8">
          <SectionTitle>Výrobky</SectionTitle>
          <div className="mt-4 h-1 w-16 bg-accent" />
        </div>
        <div className="lg:col-span-4 text-mandik-steel-80 text-sm">
          Komplexní portfolio výrobků pro větrání, klimatizaci, vytápění a požární bezpečnost
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {HOMEPAGE_TILES.map((t) => (
          <a
            key={t.code}
            href={t.href}
            style={{ "--tile-color": t.color }}
            className="tile group relative flex flex-col bg-white overflow-hidden shadow-sm border border-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[color:var(--tile-color)]"
          >
            <span className="tile-bar z-10" style={{ background: t.color }} />
            <div className="aspect-square relative overflow-hidden bg-mandik-paper-soft">
              <img
                src={t.img}
                alt={t.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="h-display text-[18px] leading-tight">{t.title}</div>
              <span className="block h-1 w-8 mt-3" style={{ background: t.color }} />
              <div className="text-sm text-mandik-steel-80 mt-3 whitespace-pre-line">{t.sub}</div>
              <div className="mt-6 pt-4 border-t border-mandik-rule flex items-center gap-2">
                <span className="h-label text-[11px] text-mandik-steel transition-colors group-hover:text-[var(--tile-color)]">Otevřít</span>
                <svg className="w-4 h-4 text-mandik-steel-70 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--tile-color)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const RefMapPreview = ({ onNav }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { threshold: 0.15 });
  const [selected, setSelected] = React.useState(PINS[3]);
  // dočasně vše zelené; návrat k barvám divizí: selected.special ? "#ffd700" : (AREA_COLOR[selected.area] || "#26d07c")
  const accentColor = "#26d07c";
  return (
    <section ref={ref} className="bg-mandik-paper-soft text-mandik-ink">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-8 lg:mb-10">
          <div className="lg:col-span-7">
            <h2 className="h-display text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.05] text-mandik-ink">Reference</h2>
            <div className="mt-4 h-1 w-16 bg-accent" />
          </div>
          <div className="lg:col-span-5 text-mandik-steel-80 text-sm">
            Naše výrobky a&nbsp;řešení jsou součástí tisíců projektů po celém světě. Od průmyslových hal přes nemocnice a&nbsp;datová centra až po administrativní budovy.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-mandik-rule hairline">
          <div className="lg:col-span-8 bg-mandik-paper-soft">
            <EuropeMap revealed={inView} selectedId={selected?.id} onSelect={setSelected} height={560} variant="light" />
          </div>
          <div className="lg:col-span-4 bg-white p-6 lg:p-7 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="h-label text-[11px] text-mandik-steel-70">Vybraná reference</div>
              <div className="mono text-[11px] text-mandik-steel-70">#{String(selected.id).padStart(3, "0")} / 1 280</div>
            </div>

            <div className="h-display text-[28px] leading-tight text-mandik-ink">{selected.project}</div>
            <div className="mt-2 flex items-center gap-2 mono text-[12px] text-mandik-steel-80">
              <span>{selected.city}, {selected.country}</span>
              <span className="opacity-50">·</span>
              <span>{selected.year}</span>
              <span className="opacity-50">·</span>
              <span className="tabular-nums">{selected.lat.toFixed(2)}° {selected.lat >= 0 ? "N" : "S"}, {selected.lon.toFixed(2)}° {selected.lon >= 0 ? "E" : "W"}</span>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-px bg-mandik-rule">
              <div className="bg-white p-4">
                <div className="mono text-[10px] text-mandik-steel-70 uppercase tracking-wider">Dodáno</div>
                <div className="h-display text-[28px] mt-1 tabular-nums text-mandik-ink">{selected.units}</div>
                <div className="text-[11px] text-mandik-steel-80">jednotek</div>
              </div>
              <div className="bg-white p-4">
                <div className="mono text-[10px] text-mandik-steel-70 uppercase tracking-wider">Sektor</div>
                <div className="h-display text-[18px] mt-1 leading-tight text-mandik-ink">{selected.sector}</div>
                <div className="h-1 w-6 mt-2" style={{ background: accentColor }} />
              </div>
              <div className="bg-white p-4 col-span-2">
                <div className="mono text-[10px] text-mandik-steel-70 uppercase tracking-wider">Výrobní oblast</div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="block h-2 w-8" style={{ background: accentColor }} />
                  <span className="h-display text-[18px] leading-tight text-mandik-ink">{selected.area}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 mono text-[11px] text-mandik-steel-80 leading-relaxed">
              {selected.special
                ? "Speciální zakázka s certifikací KTA 1401 / 10CFR APP10. Detail dostupný na vyžádání."
                : "Standardní dodávka — kompletní balíček dokumentace v centru ke stažení."}
            </div>

            <div className="mt-auto pt-7">
              <Button variant="primary" href="/reference">Otevřít všechny reference</Button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 flex-wrap">
          <span className="h-label text-[10px] text-mandik-steel-70 mr-2">Rychlý výběr:</span>
          {[10, 7, 33, 35, 18, 12, 34, 13, 9].map((id) => {
            const p = PINS.find((x) => x.id === id);
            if (!p) return null;
            const isSel = selected.id === id;
            const c = "#26d07c"; // dočasně vše zelené; návrat: p.special ? "#ffd700" : (AREA_COLOR[p.area] || "#26d07c")
            return (
              <button
                key={id}
                onClick={() => setSelected(p)}
                className={`px-3 py-1.5 hairline flex items-center gap-2 mono text-[11px] transition-colors ${isSel ? "bg-mandik-ink text-white" : "bg-white text-mandik-steel-80 hover:text-mandik-ink"}`}
              >
                <span className="block w-1.5 h-1.5" style={{ background: c }} />
                {p.city} — {p.project.split("—")[0].trim()}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CERT_LOGOS = [
  { src: "/assets/cert/EUROVENT.png", alt: "Eurovent Certified Performance", note: "AHU certifikace", url: "http://www.eurovent-certification.com/index.php?lg=en" },
  { src: "/assets/cert/RLT.jpg", alt: "RLT-Geräte Herstellerverband", note: "DE výrobci AHU", url: "https://rlt-geraete.de/" },
  { src: "/assets/cert/TUV.jpg", alt: "TÜV SÜD", note: "Inspekce a audit", url: "https://www.tuvsud.com/de-de" },
  { src: "/assets/cert/CCPI_FD.png", alt: "CCPI Fire Dampers", note: "UK požární certifikace", url: "https://www.cpicode.org.uk/" },
  { src: "/assets/cert/CCPI_SCD.png", alt: "CCPI Smoke Control Dampers", note: "UK kouř a teplo", url: "https://www.cpicode.org.uk/" },
  { src: "/assets/cert/Efectis.jpg", alt: "Efectis", note: "Požární zkoušky", url: "https://efectis.com/en/" },
  { src: "/assets/cert/PAVUS.png", alt: "PAVUS", note: "Akreditovaná zkušebna", url: "https://www.pavus.cz/" },
  { src: "/assets/cert/FTZU.jpg", alt: "FTZÚ — Ex", note: "ATEX zkušebna", url: "https://www.ftzu.cz/cs/" },
  { src: "/assets/cert/VUPS.png", alt: "VÚPS", note: "Stavební zkušebna", url: "https://www.vups.cz/" },
  { src: "/assets/cert/DIvB.png", alt: "DIvB — Ich bin dabei!", note: "Asociace D-A-CH", url: "https://divb.org/" },
  { src: "/assets/cert/EPD.png", alt: "EPD Verified", note: "Env. prohlášení", url: "https://www.ekoznacka.cz/databaze-epd-v-cr/" },
  { src: "/assets/cert/INDESEN.png", alt: "INDESEN", note: "Inženýring · průmysl", url: "https://www.indesen.cz/" },
  { src: "/assets/cert/MagiCAD.jpg", alt: "MagiCAD", note: "BIM rodiny pro Revit", url: "https://www.magicad.com/en/" },
  { src: "/assets/cert/MagiCloud.jpg", alt: "MagiCloud", note: "BIM cloud manufacturer", url: "https://www.magicloud.com/products/#/manufacturer/mandik" },
];

const Certifications = () => (
  <section className="bg-white border-t border-mandik-rule">
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-8 lg:mb-10">
        <div className="lg:col-span-7">
          <SectionTitle>Certifikace & partneři</SectionTitle>
          <div className="mt-4 h-1 w-16 bg-accent" />
        </div>
        <div className="lg:col-span-5 text-sm text-mandik-steel-80">
          Pravidelné audity, harmonizované evropské normy, oborové certifikace pro jadernou techniku a hygienické provedení. Klikem na logo otevřete domovskou stránku partnera.
        </div>
      </div>

      {/* Mřížka: bg-mandik-rule + gap-px tvoří separátory mezi buňkami.
          14 log se nedělí beze zbytku všemi breakpointy (3 / 4 / 5 / 7 col),
          proto přidáme dva white "fillery", které se zobrazí jen tam, kde je potřeba:
            - mobile (3 col): 14 + filler A    = 15 ✓ (5 × 3)
            - sm     (4 col): 14 + A + B       = 16 ✓ (4 × 4)
            - md     (5 col): 14 + A           = 15 ✓ (3 × 5)
            - lg     (7 col): 14 cells         = 14 ✓ (2 × 7)
          Tím nikde nevznikne šedé okno na konci posledního řádku. */}
      <div className="overflow-hidden">
       <div className="group/grid grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-px bg-mandik-rule">
        {CERT_LOGOS.map((c) => (
          <a
            key={c.alt}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            title={c.alt}
            className="group/cell bg-white h-[160px] flex flex-col items-center justify-center p-4"
          >
            <div className="flex-1 w-full flex items-center justify-center">
              <img
                src={c.src}
                alt={c.alt}
                loading="lazy"
                className="max-h-[56px] max-w-full object-contain transition-[filter,opacity] duration-150 group-hover/grid:grayscale group-hover/grid:opacity-60 group-hover/cell:!grayscale-0 group-hover/cell:!opacity-100"
              />
            </div>
            <div className="mt-3 mono text-[10px] uppercase tracking-wider text-mandik-steel-70 text-center leading-tight">
              {c.note}
            </div>
          </a>
        ))}
        {/* Filler A — mobile + sm + md (hidden lg) */}
        <div aria-hidden="true" className="bg-white h-[160px] block lg:hidden" />
        {/* Filler B — jen sm */}
        <div aria-hidden="true" className="bg-white h-[160px] hidden sm:block md:hidden" />
       </div>
      </div>
    </div>
  </section>
);

const News = () => (
  <section className="bg-white border-t border-mandik-rule">
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-8 lg:mb-10">
        <div className="lg:col-span-7">
          <SectionTitle>Novinky</SectionTitle>
          <div className="mt-4 h-1 w-16 bg-accent" />
        </div>
        <div className="lg:col-span-5 flex items-end lg:justify-end">
          <Button variant="ghost" href="#">Otevřít archiv (216 článků)</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-mandik-rule hairline">
        {NEWS.map((n) => (
          <a key={n.title} href="#" className="tile relative bg-white">
            <span className="tile-bar" style={{ background: "#26d07c" }} />
            <div className="aspect-[4/3] img-placeholder relative">
              <span>{n.img}</span>
              <span className="absolute top-3 left-3 mono text-[10px] bg-white px-2 py-0.5 text-mandik-ink">{n.cat}</span>
            </div>
            <div className="p-6">
              <div className="mono text-[11px] text-mandik-steel-70 mb-3">{n.date}</div>
              <div className="h-display text-[20px] leading-tight">{n.title}</div>
              <div className="mt-5 h-label text-[10px] text-mandik-steel">Číst dál →</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Showroom = ({ onNav }) => (
  <section id="showroom" className="bg-mandik-paper-soft text-mandik-ink relative overflow-hidden scroll-mt-[120px]">
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
      <div className="lg:col-span-6">
        <h2 className="h-display text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.05] text-mandik-ink">Virtuální showroom</h2>
        <div className="mt-4 h-1 w-16 bg-accent" />
        <p className="mt-5 text-mandik-steel-80 max-w-md text-[15px]">
          Projděte si náš showroom plný výrobků Mandík ve 360°, aniž byste museli cestovat do Hostomic. Prohlídka je dostupná kdykoliv a&nbsp;snadno ji sdílíte s&nbsp;kolegy.
        </p>
        <div className="mt-7 flex gap-3">
          <Button variant="primary" href="https://my.matterport.com/show/?m=MW8NFZmbZoo">Otevřít showroom</Button>
        </div>
      </div>
      <div className="lg:col-span-6 relative">
        <div className="relative bg-mandik-ink hairline" style={{ aspectRatio: "4 / 3" }}>
          <iframe
            src="https://my.matterport.com/show/?m=MW8NFZmbZoo"
            title="Virtuální showroom MANDÍK"
            allow="xr-spatial-tracking; fullscreen; gyroscope; accelerometer"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
          />
        </div>
        <div className="absolute top-4 left-4 bg-accent text-mandik-ink h-label text-[10px] px-2 py-1 pointer-events-none">360°</div>
        <div className="absolute bottom-4 right-4 mono text-[10px] text-white/80 bg-mandik-ink/70 px-2 py-1 pointer-events-none">14 STANOVIŠŤ · 8K</div>
      </div>
    </div>
  </section>
);

export const Homepage = ({ onNav, tweaks = { heroMedia: "video", parallax: true } }) => (
  <div data-screen-label="Homepage" className="page-enter">
    {/* Hero zůstává bez Reveal — uživatel ho vidí ihned po načtení. */}
    <Hero onNav={onNav} mediaStyle={tweaks.heroMedia} parallax={tweaks.parallax} />
    {/* Všechny ostatní sekce: scroll reveal (fade-in + slide-up při vstupu do viewportu) */}
    <Reveal><StatsStrip /></Reveal>
    <Reveal><CategoryGrid onNav={onNav} /></Reveal>
    <Reveal><Certifications /></Reveal>
    <Reveal><RefMapPreview onNav={onNav} /></Reveal>
    <Reveal><News /></Reveal>
    <Reveal><Showroom onNav={onNav} /></Reveal>
  </div>
);
