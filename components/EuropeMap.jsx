"use client";

import React from "react";
import { geoMercator, geoPath } from "d3-geo";
import * as topojson from "topojson-client";

export const PINS = [
  { id: 1,  city: "Praha",      country: "CZ", lon: 14.43, lat: 50.08, project: "Národní muzeum, rekonstrukce", year: 2024, units: 412, area: "AHC komponenty", sector: "Kultura", featured: true },
  { id: 2,  city: "Brno",       country: "CZ", lon: 16.61, lat: 49.20, project: "Spielberk Office Centre",       year: 2023, units: 188, area: "AHC komponenty", sector: "Administrativa" },
  { id: 3,  city: "Bratislava", country: "SK", lon: 17.11, lat: 48.15, project: "Eurovea II, Tower",            year: 2024, units: 261, area: "AHC komponenty", sector: "Výškové budovy" },
  { id: 4,  city: "Vídeň",      country: "AT", lon: 16.37, lat: 48.21, project: "DC Tower 2",                    year: 2025, units: 540, area: "AHU jednotky",   sector: "Výškové budovy", featured: true },
  { id: 5,  city: "Berlín",     country: "DE", lon: 13.40, lat: 52.52, project: "Sony Center, retrofit",        year: 2023, units: 320, area: "AHC komponenty", sector: "Administrativa" },
  { id: 6,  city: "Mnichov",    country: "DE", lon: 11.58, lat: 48.14, project: "BMW Welt, AHC",                year: 2024, units: 174, area: "AHC komponenty", sector: "Průmysl", featured: true },
  { id: 7,  city: "Hamburk",    country: "DE", lon:  9.99, lat: 53.55, project: "Elbtower, AHU 9.6",            year: 2025, units: 980, area: "AHU jednotky",   sector: "Výškové budovy", featured: true },
  { id: 8,  city: "Varšava",    country: "PL", lon: 21.01, lat: 52.23, project: "Varso Tower",                   year: 2022, units: 615, area: "AHC komponenty", sector: "Výškové budovy", featured: true },
  { id: 9,  city: "Paříž",      country: "FR", lon:  2.35, lat: 48.86, project: "La Défense, Tour Hekla",       year: 2024, units: 442, area: "AHU jednotky",   sector: "Administrativa", featured: true },
  { id: 10, city: "Londýn",     country: "GB", lon: -0.13, lat: 51.51, project: "22 Bishopsgate (PKI-EI)",       year: 2023, units: 1340, area: "AHC komponenty", sector: "Výškové budovy", featured: true },
  { id: 11, city: "Amsterdam",  country: "NL", lon:  4.90, lat: 52.37, project: "Zuidas, Atrium Tower",         year: 2024, units: 280, area: "AHU jednotky",   sector: "Administrativa" },
  { id: 12, city: "Loviisa",    country: "FI", lon: 26.22, lat: 60.46, project: "Loviisa NPP, KTA 1401",        year: 2023, units: 96,  area: "Speciální aplikace", sector: "Jaderná technika", special: true, featured: true },
  { id: 13, city: "Stockholm",  country: "SE", lon: 18.07, lat: 59.33, project: "Karolinska, nemocnice",        year: 2025, units: 530, area: "AHU jednotky",   sector: "Zdravotnictví", featured: true },
  { id: 14, city: "Madrid",     country: "ES", lon: -3.70, lat: 40.42, project: "IFEMA Pavilón 14",              year: 2024, units: 220, area: "AHU jednotky",   sector: "Veř. budovy" },
  { id: 15, city: "Vatikán",    country: "VA", lon: 12.45, lat: 41.90, project: "Vatikán, Archivum Secretum",   year: 2022, units: 64,  area: "AHU jednotky",   sector: "Kultura", featured: true },
  { id: 16, city: "Záhřeb",     country: "HR", lon: 15.98, lat: 45.81, project: "Hotel Esplanade, retrofit",    year: 2025, units: 80,  area: "Topné systémy",  sector: "Hospitality" },
  { id: 17, city: "Atény",      country: "GR", lon: 23.73, lat: 37.98, project: "Letiště Eleftherios Venizelos", year: 2023, units: 360, area: "AHC komponenty", sector: "Infrastruktura" },
  { id: 18, city: "Paks",       country: "HU", lon: 18.86, lat: 46.63, project: "Paks II, speciální aplikace",  year: 2025, units: 240, area: "Speciální aplikace", sector: "Jaderná technika", special: true, featured: true },
  { id: 19, city: "Bukurešť",   country: "RO", lon: 26.10, lat: 44.43, project: "One Cotroceni Park",            year: 2024, units: 305, area: "AHC komponenty", sector: "Administrativa" },
  { id: 20, city: "Sofia",      country: "BG", lon: 23.32, lat: 42.70, project: "Sofia Tech Park",               year: 2024, units: 132, area: "AHC komponenty", sector: "Technol. kampusy" },
  { id: 21, city: "Curych",     country: "CH", lon:  8.55, lat: 47.38, project: "ETH Hönggerberg HIB",           year: 2025, units: 410, area: "AHU jednotky",   sector: "Vzdělávání", featured: true },
  { id: 22, city: "Lyon",       country: "FR", lon:  4.84, lat: 45.76, project: "Confluences, Tower",           year: 2023, units: 152, area: "AHC komponenty", sector: "Výškové budovy" },
  { id: 23, city: "Kodaň",      country: "DK", lon: 12.57, lat: 55.68, project: "Niels Bohr Building",           year: 2024, units: 600, area: "AHU jednotky",   sector: "Vzdělávání", featured: true },
  { id: 24, city: "Oslo",       country: "NO", lon: 10.75, lat: 59.91, project: "Munch Museet",                  year: 2022, units: 75,  area: "AHU jednotky",   sector: "Kultura" },
  { id: 25, city: "Lisabon",    country: "PT", lon: -9.14, lat: 38.72, project: "Champalimaud Foundation",       year: 2023, units: 190, area: "AHU jednotky",   sector: "Zdravotnictví" },
  { id: 26, city: "Tallin",     country: "EE", lon: 24.75, lat: 59.44, project: "Maakri kvartál",                year: 2025, units: 88,  area: "AHC komponenty", sector: "Administrativa" },
  { id: 27, city: "Kyjev",      country: "UA", lon: 30.52, lat: 50.45, project: "Rekonstrukce nemocnic",         year: 2024, units: 410, area: "AHU jednotky",   sector: "Zdravotnictví" },
  { id: 28, city: "Záporoží",   country: "UA", lon: 35.13, lat: 47.85, project: "ZNPP, speciální aplikace",     year: 2022, units: 144, area: "Speciální aplikace", sector: "Jaderná technika", special: true, featured: true },
  { id: 29, city: "Helsinki",   country: "FI", lon: 24.94, lat: 60.17, project: "Oodi knihovna, AHU retrofit",  year: 2024, units: 140, area: "AHU jednotky",   sector: "Veř. budovy" },
  { id: 30, city: "Manchester", country: "GB", lon: -2.24, lat: 53.48, project: "Co-op Live Arena",              year: 2024, units: 410, area: "AHC komponenty", sector: "Infrastruktura" },
  { id: 31, city: "Dublin",     country: "IE", lon: -6.27, lat: 53.35, project: "Capital Dock, kanceláře",      year: 2023, units: 180, area: "AHC komponenty", sector: "Administrativa" },
  { id: 32, city: "Barcelona",  country: "ES", lon:  2.17, lat: 41.39, project: "Hospital Clínic, rekonstrukce", year: 2025, units: 290, area: "AHU jednotky",  sector: "Zdravotnictví" },
  { id: 33, city: "Černobyl",   country: "UA", lon: 30.10, lat: 51.39, project: "ČJE, sarkofág, větrání NSC",   year: 2019, units: 230, area: "Speciální aplikace", sector: "Jaderná technika", photos: ["/assets/reference/reference-chernobyl.jpg"], special: true, featured: true },
  { id: 34, city: "Frankfurt",  country: "DE", lon:  8.68, lat: 50.11, project: "Equinix FR8, datacentrum",     year: 2024, units: 720, area: "AHU jednotky",   sector: "Datacentrum", featured: true },
  { id: 35, city: "Temelín",    country: "CZ", lon: 14.38, lat: 49.18, project: "JE Temelín, bloky 1+2",        year: 1995, units: 1080, area: "Speciální aplikace", sector: "Jaderná technika", special: true, featured: true },
  { id: 36, city: "Lucembursko", country: "LU", lon: 6.13, lat: 49.61, project: "Cloud region GCP, DC",         year: 2025, units: 410, area: "AHU jednotky",   sector: "Datacentrum" },
];

export const AREA_COLOR = {
  "AHC komponenty": "#74d1ea",
  "AHU jednotky": "#26d07c",
  "Topné systémy": "#f2a900",
  "Speciální aplikace": "#ffd700",
};

// Fotky referencí. Dočasně podle sektoru; ke konkrétní referenci lze v PINS doplnit
// pole `photos: ["/assets/reference/...", ...]` (max 5) a galerie je použije přednostně.
const SECTOR_PHOTO = {
  "Administrativa": "reference-administrativni.jpg",
  "Datacentrum": "reference-datacenter.jpg",
  "Zdravotnictví": "reference-nemocnice.jpg",
  "Infrastruktura": "reference-logistika.jpg",
  "Průmysl": "reference-logistika.jpg",
  "Technol. kampusy": "reference-datacenter.jpg",
};
export const referencePhotos = (pin) => {
  if (pin && Array.isArray(pin.photos) && pin.photos.length) return pin.photos.slice(0, 5);
  const f = (pin && SECTOR_PHOTO[pin.sector]) || "reference.jpg";
  return [`/assets/reference/${f}`];
};

// Slug pro URL detailu reference (např. /reference/22-bishopsgate).
const slugify = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
(() => { const seen = {}; PINS.forEach((p) => { let s = slugify(p.project); if (seen[s]) s = `${s}-${p.id}`; seen[s] = true; p.slug = s; }); })();
export const getReferenceBySlug = (slug) => PINS.find((p) => p.slug === slug) || null;

let __atlasCache = null;
let __atlasPromise = null;
const useWorldAtlas = () => {
  const [atlas, setAtlas] = React.useState(__atlasCache);
  React.useEffect(() => {
    if (__atlasCache) { setAtlas(__atlasCache); return; }
    if (!__atlasPromise) {
      __atlasPromise = fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json")
        .then((r) => r.json())
        .then((topo) => {
          const all = topojson.feature(topo, topo.objects.countries).features;
          const countries = all.filter((f) => String(f.id).padStart(3, "0") !== "010"); // bez Antarktidy
          __atlasCache = { countries };
          return __atlasCache;
        });
    }
    __atlasPromise.then(setAtlas);
  }, []);
  return atlas;
};

const clampK = (k) => Math.min(8, Math.max(1, k));

export const EuropeMap = ({
  revealed = true,
  onSelect,
  selectedId,
  height = 540,
  pins = PINS,
  variant = "light",
  fill = false,
}) => {
  const atlas = useWorldAtlas();
  const W = 900, H = 600;
  const svgRef = React.useRef(null);

  // Světová projekce (Mercator), přizpůsobená šířce viewBoxu.
  const projection = React.useMemo(
    () => geoMercator().center([10, 32]).scale(142).translate([W / 2, H / 2]),
    []
  );
  const pathGen = React.useMemo(() => geoPath(projection), [projection]);

  // Výchozí pohled: nazoomováno na Evropu (uživatel může kdykoli odzoomovat na celý svět).
  const EUROPE_VIEW = React.useMemo(() => {
    const p = projection([15, 54]) || [W / 2, H / 2];
    const k = 5;
    const minX = W * (1 - k), minY = H * (1 - k);
    return {
      k,
      x: Math.min(0, Math.max(minX, W / 2 - p[0] * k)),
      y: Math.min(0, Math.max(minY, H / 2 - p[1] * k)),
    };
  }, [projection]);

  const [view, setView] = React.useState(EUROPE_VIEW);
  const drag = React.useRef({ active: false, bx: 0, by: 0, vx: 0, vy: 0, moved: false });

  const bg = variant === "dark" ? "#0e1217" : "#f4f5f7";
  const grid = variant === "dark" ? "#1d2530" : "#e1e3e8";
  const water = variant === "dark" ? "#0e1217" : "#e9ecf1";
  const land = variant === "dark" ? "#26303f" : "#ffffff";
  const landStroke = variant === "dark" ? "#4d5b71" : "#506077";
  const inkText = variant === "dark" ? "#ffffff" : "#1a1a1a";
  const subText = variant === "dark" ? "rgba(255,255,255,0.65)" : "#506077";

  const basePins = React.useMemo(() => {
    return pins.map((p) => {
      const xy = projection([p.lon, p.lat]);
      return xy ? { ...p, bx: xy[0], by: xy[1] } : null;
    }).filter(Boolean);
  }, [projection, pins]);

  const clampView = (k, x, y) => {
    const kk = clampK(k);
    const minX = W * (1 - kk), minY = H * (1 - kk);
    return { k: kk, x: Math.min(0, Math.max(minX, x)), y: Math.min(0, Math.max(minY, y)) };
  };

  const toView = (clientX, clientY) => {
    const svg = svgRef.current;
    const ctm = svg && svg.getScreenCTM && svg.getScreenCTM();
    if (!ctm) return [W / 2, H / 2];
    const p = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
    return [p.x, p.y];
  };

  // Zoom kolečkem jen s Ctrl/Cmd, ať se neblokuje scroll stránky.
  React.useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      const [vx, vy] = toView(e.clientX, e.clientY);
      setView((cur) => {
        const k = clampK(cur.k * (e.deltaY < 0 ? 1.2 : 1 / 1.2));
        const x = vx - ((vx - cur.x) / cur.k) * k;
        const y = vy - ((vy - cur.y) / cur.k) * k;
        return clampView(k, x, y);
      });
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e) => {
    const [bx, by] = toView(e.clientX, e.clientY);
    drag.current = { active: true, bx, by, vx: view.x, vy: view.y, moved: false };
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const [cx, cy] = toView(e.clientX, e.clientY);
    const dx = cx - drag.current.bx, dy = cy - drag.current.by;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true;
    setView((cur) => clampView(cur.k, drag.current.vx + dx, drag.current.vy + dy));
  };
  const endDrag = () => { drag.current.active = false; };
  const selectPin = (p) => { if (!drag.current.moved) onSelect?.(p); };

  const zoomBy = (factor) => setView((cur) => {
    const k = clampK(cur.k * factor);
    const cx = W / 2, cy = H / 2;
    const x = cx - ((cx - cur.x) / cur.k) * k;
    const y = cy - ((cy - cur.y) / cur.k) * k;
    return clampView(k, x, y);
  });
  const resetView = () => setView(EUROPE_VIEW);

  const zb = variant === "dark" ? "bg-mandik-ink text-white" : "bg-white text-mandik-ink";

  return (
    <div className={`relative hairline overflow-hidden ${fill ? "h-full" : ""}`} style={{ height: fill ? undefined : height, minHeight: fill ? height : undefined, background: bg }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        preserveAspectRatio="xMidYMid slice"
        style={{ touchAction: "none" }}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={(e) => onPointerDown(e.touches[0])}
        onTouchMove={(e) => onPointerMove(e.touches[0])}
        onTouchEnd={endDrag}
      >
        <rect width={W} height={H} fill={water} />

        {/* dekorativní mřížka (fixní pozadí) */}
        <g stroke={grid} strokeWidth="0.5" opacity={variant === "dark" ? 0.6 : 1}>
          {Array.from({ length: 16 }).map((_, i) => (<line key={"v" + i} x1={i * (W / 15)} y1={0} x2={i * (W / 15)} y2={H} />))}
          {Array.from({ length: 11 }).map((_, i) => (<line key={"h" + i} x1={0} y1={i * (H / 10)} x2={W} y2={i * (H / 10)} />))}
        </g>

        {/* země (posun + zoom) */}
        <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
          {atlas && pathGen && atlas.countries.map((f, i) => (
            <path key={"co" + i} d={pathGen(f)} fill={land} stroke={landStroke} strokeWidth="0.7" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          ))}
        </g>

        {/* body referencí (konstantní velikost, pozice dle transformace) */}
        <g style={{ opacity: revealed ? 1 : 0, transition: "opacity 600ms ease-out" }}>
          {basePins.map((p) => {
            const sx = p.bx * view.k + view.x;
            const sy = p.by * view.k + view.y;
            if (sx < -24 || sx > W + 24 || sy < -24 || sy > H + 24) return null;
            const isSel = selectedId === p.id;
            const c = "#26d07c";
            const showLabel = isSel || (p.featured && view.k >= 1.6);
            const labelOnLeft = sx > W - 130;
            return (
              <g key={p.id} transform={`translate(${sx} ${sy})`} style={{ cursor: "pointer" }} onClick={() => selectPin(p)} className="group">
                <rect x="-14" y="-14" width="28" height="28" fill="transparent" />
                {p.featured && <circle cx="0" cy="0" r="6" fill={c} className="pin-pulse" />}
                <rect
                  x={isSel ? -11 : -7} y={isSel ? -11 : -7}
                  width={isSel ? 22 : 14} height={isSel ? 22 : 14}
                  fill="none" stroke={c} strokeWidth={isSel ? 1.2 : 0.8}
                  className={isSel ? "" : "opacity-0 group-hover:opacity-100"}
                  style={{ transition: "opacity 120ms" }}
                />
                <rect
                  x={p.featured ? -4 : -2.5} y={p.featured ? -4 : -2.5}
                  width={p.featured ? 8 : 5} height={p.featured ? 8 : 5}
                  fill={c} stroke={variant === "dark" ? "#0e1217" : "#1a1a1a"} strokeWidth="0.9"
                />
                {showLabel && (
                  <text
                    x={labelOnLeft ? -10 : 10} y={-9} textAnchor={labelOnLeft ? "end" : "start"}
                    fontFamily="Saira Semi Condensed" fontWeight="700" fontSize={isSel ? 13 : 11} fill={inkText}
                    style={{ pointerEvents: "none", paintOrder: "stroke", stroke: variant === "dark" ? "#0e1217" : "#ffffff", strokeWidth: 3.5, strokeLinejoin: "round" }}
                  >
                    {p.city.toUpperCase()}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* fixní overlay: popisky + rohové značky */}
        <g fontFamily="JetBrains Mono" fontSize="9" fill={subText}>
          <text x={14} y={H - 12}>49°51′N · 14°02′E · HOSTOMICE</text>
          <text x={W - 14} y={H - 12} textAnchor="end">PROJ · MERCATOR · SVĚT</text>
        </g>
        <g stroke={landStroke} strokeWidth="0.7" fill="none">
          <path d={`M0 14 L0 0 L14 0`} />
          <path d={`M${W - 14} 0 L${W} 0 L${W} 14`} />
          <path d={`M0 ${H - 14} L0 ${H} L14 ${H}`} />
          <path d={`M${W - 14} ${H} L${W} ${H} L${W} ${H - 14}`} />
        </g>
      </svg>

      {/* legenda */}
      <div className={`absolute right-5 top-5 hairline px-4 py-3 mono text-[11px] ${variant === "dark" ? "bg-mandik-ink text-white/85" : "bg-white text-mandik-steel"}`}>
        <div className="h-label text-[11px] mb-1" style={{ color: variant === "dark" ? "#ffffff" : "#1a1a1a" }}>vlajkové reference</div>
        <div>{pins.filter((p) => p.featured).length} z {pins.length} bodů · 1 280 celkem</div>
      </div>

      {/* ovládání zoomu + nápověda */}
      <div className="absolute left-5 bottom-5 flex flex-col gap-1">
        <button type="button" onClick={() => zoomBy(1.4)} aria-label="Přiblížit" className={`w-8 h-8 hairline mono text-[16px] leading-none flex items-center justify-center ${zb} hover:bg-mandik-paper-soft transition-colors`}>+</button>
        <button type="button" onClick={() => zoomBy(1 / 1.4)} aria-label="Oddálit" className={`w-8 h-8 hairline mono text-[18px] leading-none flex items-center justify-center ${zb} hover:bg-mandik-paper-soft transition-colors`}>−</button>
        <button type="button" onClick={resetView} aria-label="Resetovat pohled" className={`w-8 h-8 hairline mono text-[12px] leading-none flex items-center justify-center ${zb} hover:bg-mandik-paper-soft transition-colors`}>⟲</button>
      </div>
      <div className={`absolute right-5 bottom-5 mono text-[10px] ${variant === "dark" ? "text-white/45" : "text-mandik-steel-70"}`}>tažením posun · Ctrl + kolečko zoom</div>

      {!atlas && (
        <div className="absolute inset-0 flex items-center justify-center mono text-[11px]" style={{ color: subText }}>načítání mapových dat…</div>
      )}
    </div>
  );
};
