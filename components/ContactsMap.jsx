"use client";

import React from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const ACCENT = "#26d07c";
const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;

// Styl mapy: MapTiler dataviz-dark (ladí s tmavou steel sekcí). Když chybí klíč,
// spadne na prázdné tmavé pozadí — polygony krajů se vykreslí i tak.
const STYLE = MAPTILER_KEY
  ? `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${MAPTILER_KEY}`
  : {
      version: 8,
      sources: {},
      layers: [{ id: "bg", type: "background", paint: { "background-color": "#222b36" } }],
    };

// bbox [w,s,e,n] z GeoJSON geometrie (Polygon | MultiPolygon)
function bboxOf(geometry) {
  let w = 180, s = 90, e = -180, n = -90;
  const scan = (ring) => ring.forEach(([x, y]) => {
    if (x < w) w = x; if (x > e) e = x;
    if (y < s) s = y; if (y > n) n = y;
  });
  const polys = geometry.type === "MultiPolygon" ? geometry.coordinates : [geometry.coordinates];
  polys.forEach((poly) => poly.forEach(scan));
  return [w, s, e, n];
}

export function ContactsMap({ country, selected, onSelect, className = "" }) {
  const containerRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const loadedRef = React.useRef(false);
  const hoveredRef = React.useRef(null);
  const bboxRef = React.useRef({}); // id -> bbox
  const onSelectRef = React.useRef(onSelect);
  const prevSelectedRef = React.useRef(null);

  // držíme aktuální onSelect bez re-inicializace mapy
  React.useEffect(() => { onSelectRef.current = onSelect; }, [onSelect]);

  // inicializace mapy (jednou)
  React.useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE,
      center: country.center ?? [15.34, 49.8],
      zoom: country.zoom ?? 6.4,
      attributionControl: true,
      cooperativeGestures: true, // scroll-zoom až s Ctrl/dvěma prsty — neukradne scroll stránky
      preserveDrawingBuffer: true, // umožní zachytit WebGL plátno do screenshotu/exportu
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    const setHover = (id, on) => {
      if (id == null) return;
      map.setFeatureState({ source: "regions", id }, { hover: on });
    };

    map.on("load", async () => {
      let data;
      try {
        data = await fetch(country.geojson).then((r) => r.json());
      } catch {
        return;
      }
      // bbox index pro fitBounds při výběru
      data.features.forEach((f) => {
        const id = f.properties[country.regionKey];
        if (id) bboxRef.current[id] = bboxOf(f.geometry);
      });

      map.addSource("regions", { type: "geojson", data, promoteId: country.regionKey });

      map.addLayer({
        id: "regions-fill",
        type: "fill",
        source: "regions",
        paint: {
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "selected"], false], ACCENT,
            ["boolean", ["feature-state", "hover"], false], ACCENT,
            "#8aa0bd",
          ],
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "selected"], false], 0.78,
            ["boolean", ["feature-state", "hover"], false], 0.42,
            0.16,
          ],
        },
      });

      map.addLayer({
        id: "regions-line",
        type: "line",
        source: "regions",
        paint: {
          "line-color": [
            "case",
            ["boolean", ["feature-state", "selected"], false], ACCENT,
            "rgba(255,255,255,0.5)",
          ],
          "line-width": [
            "case",
            ["boolean", ["feature-state", "selected"], false], 2.4,
            0.8,
          ],
        },
      });

      // popisky krajů (jen s MapTiler stylem, který má glyphs)
      if (MAPTILER_KEY) {
        map.addLayer({
          id: "regions-label",
          type: "symbol",
          source: "regions",
          layout: {
            "text-field": ["get", "name"],
            "text-font": ["Open Sans Semibold", "Noto Sans Bold"],
            "text-size": 11,
            "text-letter-spacing": 0.02,
          },
          paint: {
            "text-color": "rgba(255,255,255,0.82)",
            "text-halo-color": "rgba(0,0,0,0.65)",
            "text-halo-width": 1.2,
          },
        });
      }

      // kurzor + hover
      map.on("mousemove", "regions-fill", (e) => {
        if (!e.features?.length) return;
        map.getCanvas().style.cursor = "pointer";
        const id = e.features[0].id;
        if (hoveredRef.current !== id) {
          setHover(hoveredRef.current, false);
          hoveredRef.current = id;
          setHover(id, true);
        }
      });
      map.on("mouseleave", "regions-fill", () => {
        map.getCanvas().style.cursor = "";
        setHover(hoveredRef.current, false);
        hoveredRef.current = null;
      });

      // klik → výběr
      map.on("click", "regions-fill", (e) => {
        if (!e.features?.length) return;
        onSelectRef.current?.(e.features[0].id);
      });

      loadedRef.current = true;
      // aplikuj případný počáteční výběr
      if (selected) applySelection(selected);
    });

    return () => {
      map.remove();
      mapRef.current = null;
      loadedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // promítnutí externího `selected` do feature-state + fitBounds
  const applySelection = React.useCallback((id) => {
    const map = mapRef.current;
    if (!map || !loadedRef.current) return;
    const prev = prevSelectedRef.current;
    if (prev && prev !== id) map.setFeatureState({ source: "regions", id: prev }, { selected: false });
    if (id) {
      map.setFeatureState({ source: "regions", id }, { selected: true });
      const bb = bboxRef.current[id];
      if (bb) map.fitBounds(bb, { padding: 64, duration: 700, maxZoom: 9 });
    }
    prevSelectedRef.current = id ?? null;
  }, []);

  React.useEffect(() => {
    applySelection(selected);
  }, [selected, applySelection]);

  return <div ref={containerRef} className={className} />;
}
