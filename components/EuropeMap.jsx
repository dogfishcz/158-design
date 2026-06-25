"use client";

import React from "react";
import { geoMercator, geoPath } from "d3-geo";
import * as topojson from "topojson-client";
import { PINS, AREA_COLOR, referencePhotos, getReferenceBySlug } from "@/lib/references";

// Data referencí jsou v lib/references.js (čistá data pro server i klient).
// Re-export kvůli stávajícím importům z této komponenty.
export { PINS, AREA_COLOR, referencePhotos, getReferenceBySlug };

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
