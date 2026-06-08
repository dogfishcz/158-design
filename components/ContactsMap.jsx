"use client";

import React from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  NUTS_TO_LAND,
  REGION_TO_ISO,
  regionKeyForCountry,
  LAND_KEYS,
  DE_LAND,
  deIdsForSelection,
} from "@/lib/contacts";

const ACCENT = "#26d07c";
const NEUTRAL = "#8aa0bd";
const NONE = "__NONE__";
const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;

const STYLE = MAPTILER_KEY
  ? `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${MAPTILER_KEY}`
  : { version: 8, sources: {}, layers: [{ id: "bg", type: "background", paint: { "background-color": "#222b36" } }] };

// match: nuts kód kraje → historická země
const LAND_EXPR = ["match", ["get", "nuts"], ...Object.entries(NUTS_TO_LAND).flatMap(([n, l]) => [n, l]), ""];

// Zvýraznění je řešené POUZE výplní (fill) nad hranicemi základní mapy —
// nekreslíme vlastní obrysové čáry, aby nevznikaly zdvojené hranice.
const worldColor = (hoverIso, selIso) => ["case",
  ["==", ["get", "iso"], hoverIso || NONE], ACCENT,
  ["in", ["get", "iso"], ["literal", selIso]], ACCENT,
  NEUTRAL];
const worldOpacity = (hoverIso, selIso) => ["case",
  ["==", ["get", "iso"], hoverIso || NONE], 0.45,
  ["in", ["get", "iso"], ["literal", selIso]], 0.72,
  0.04];

const czColor = (hoverLand, selLand) => ["case",
  ["==", LAND_EXPR, hoverLand || NONE], ACCENT,
  ["==", LAND_EXPR, selLand || NONE], ACCENT,
  NEUTRAL];
const czOpacity = (hoverLand, selLand) => ["case",
  ["==", LAND_EXPR, hoverLand || NONE], 0.45,
  ["==", LAND_EXPR, selLand || NONE], 0.72,
  0.06];

const deColor = (hoverId, selIds) => ["case",
  ["==", ["get", "id"], hoverId || NONE], ACCENT,
  ["in", ["get", "id"], ["literal", selIds]], ACCENT,
  NEUTRAL];
const deOpacity = (hoverId, selIds) => ["case",
  ["==", ["get", "id"], hoverId || NONE], 0.45,
  ["in", ["get", "id"], ["literal", selIds]], 0.72,
  0.06];

const selIsoOf = (key) => REGION_TO_ISO[key] || [];
const selLandOf = (key) => (LAND_KEYS.includes(key) ? key : "");

export function ContactsMap({ selected, onSelect, className = "" }) {
  const containerRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const loadedRef = React.useRef(false);
  const onSelectRef = React.useRef(onSelect);
  const selectedRef = React.useRef(selected);
  const hoverIso = React.useRef("");
  const hoverLand = React.useRef("");
  const hoverDe = React.useRef("");

  React.useEffect(() => { onSelectRef.current = onSelect; }, [onSelect]);
  React.useEffect(() => { selectedRef.current = selected; }, [selected]);

  const repaint = React.useCallback(() => {
    const map = mapRef.current;
    if (!map || !loadedRef.current || !map.getLayer("world-fill")) return;
    const selIso = selIsoOf(selectedRef.current);
    const selLand = selLandOf(selectedRef.current);
    const selDe = deIdsForSelection(selectedRef.current);
    map.setPaintProperty("world-fill", "fill-color", worldColor(hoverIso.current, selIso));
    map.setPaintProperty("world-fill", "fill-opacity", worldOpacity(hoverIso.current, selIso));
    map.setPaintProperty("cz-fill", "fill-color", czColor(hoverLand.current, selLand));
    map.setPaintProperty("cz-fill", "fill-opacity", czOpacity(hoverLand.current, selLand));
    map.setPaintProperty("de-fill", "fill-color", deColor(hoverDe.current, selDe));
    map.setPaintProperty("de-fill", "fill-opacity", deOpacity(hoverDe.current, selDe));
  }, []);

  React.useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE,
      center: [13, 49],
      zoom: 3.3,
      attributionControl: true,
      cooperativeGestures: false, // scroll-zoom přímo kolečkem nad mapou (bez Ctrl)
      preserveDrawingBuffer: true,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", async () => {
      let world, cz, de;
      try {
        [world, cz, de] = await Promise.all([
          fetch("/geo/world-countries.geojson").then((r) => r.json()),
          fetch("/geo/cz-kraje.geojson").then((r) => r.json()),
          fetch("/geo/de-bundeslander.geojson").then((r) => r.json()),
        ]);
      } catch { return; }

      map.addSource("world", { type: "geojson", data: world });
      map.addSource("cz", { type: "geojson", data: cz });
      map.addSource("de", { type: "geojson", data: de });

      const selIso = selIsoOf(selectedRef.current);
      const selLand = selLandOf(selectedRef.current);
      const selDe = deIdsForSelection(selectedRef.current);

      // Výplň vkládáme POD hranice a popisky základní mapy → ostré hranice i popisky
      // se vykreslí nad zeleným zvýrazněním (jediný zdroj hranic = základní mapa).
      const layers = map.getStyle().layers || [];
      const beforeId = (
        layers.find((l) => l["source-layer"] === "boundary") ||
        layers.find((l) => l.type === "symbol") ||
        {}
      ).id;

      map.addLayer({ id: "world-fill", type: "fill", source: "world",
        paint: { "fill-color": worldColor("", selIso), "fill-opacity": worldOpacity("", selIso) } }, beforeId);
      map.addLayer({ id: "cz-fill", type: "fill", source: "cz",
        paint: { "fill-color": czColor("", selLand), "fill-opacity": czOpacity("", selLand) } }, beforeId);
      map.addLayer({ id: "de-fill", type: "fill", source: "de",
        paint: { "fill-color": deColor("", selDe), "fill-opacity": deOpacity("", selDe) } }, beforeId);

      // hover svět
      map.on("mousemove", "world-fill", (e) => {
        const iso = e.features?.[0]?.properties?.iso;
        if (!iso || iso === "CZ" || iso === "DE") return; // ČR/DE řeší vlastní vrstvy
        map.getCanvas().style.cursor = "pointer";
        if (hoverIso.current !== iso) { hoverIso.current = iso; repaint(); }
      });
      map.on("mouseleave", "world-fill", () => {
        map.getCanvas().style.cursor = "";
        if (hoverIso.current) { hoverIso.current = ""; repaint(); }
      });
      // hover ČR
      map.on("mousemove", "cz-fill", (e) => {
        const land = NUTS_TO_LAND[e.features?.[0]?.properties?.nuts] || "";
        map.getCanvas().style.cursor = "pointer";
        if (hoverLand.current !== land) { hoverLand.current = land; repaint(); }
      });
      map.on("mouseleave", "cz-fill", () => {
        map.getCanvas().style.cursor = "";
        if (hoverLand.current) { hoverLand.current = ""; repaint(); }
      });
      // hover Německo
      map.on("mousemove", "de-fill", (e) => {
        const id = e.features?.[0]?.properties?.id || "";
        map.getCanvas().style.cursor = "pointer";
        if (hoverDe.current !== id) { hoverDe.current = id; repaint(); }
      });
      map.on("mouseleave", "de-fill", () => {
        map.getCanvas().style.cursor = "";
        if (hoverDe.current) { hoverDe.current = ""; repaint(); }
      });

      // klik
      map.on("click", "cz-fill", (e) => {
        const land = NUTS_TO_LAND[e.features?.[0]?.properties?.nuts];
        if (land) onSelectRef.current?.(land);
      });
      map.on("click", "de-fill", (e) => {
        const id = e.features?.[0]?.properties?.id;
        if (id && DE_LAND[id]) onSelectRef.current?.(id);
      });
      map.on("click", "world-fill", (e) => {
        const iso = e.features?.[0]?.properties?.iso;
        if (!iso || iso === "CZ" || iso === "DE") return; // řeší vrstvy krajů / spolkových zemí
        const key = regionKeyForCountry(iso);
        if (key) onSelectRef.current?.(key);
      });

      loadedRef.current = true;
      repaint();
    });

    return () => { map.remove(); mapRef.current = null; loadedRef.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => { repaint(); }, [selected, repaint]);

  return <div ref={containerRef} className={className} />;
}
