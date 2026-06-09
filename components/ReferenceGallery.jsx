"use client";

import React from "react";

// Galerie fotek vybrané reference: náhled s možností zvětšení (lightbox)
// a listování (až 5 fotek). Pole `photos` může mít 1..N položek.
export const ReferenceGallery = ({ photos = [], alt = "", accent = "#26d07c" }) => {
  const list = photos && photos.length ? photos : ["/assets/reference/reference.jpg"];
  const n = list.length;
  const [idx, setIdx] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  // při změně reference (nové pole fotek) zpět na první
  React.useEffect(() => { setIdx(0); }, [photos]);

  const go = React.useCallback((d) => setIdx((i) => (i + d + n) % n), [n]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const Arrow = ({ dir, light }) => (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); go(dir); }}
      aria-label={dir === 1 ? "Další fotka" : "Předchozí fotka"}
      className={`inline-flex items-center justify-center w-9 h-9 transition-colors ${light ? "bg-white/15 text-white hover:bg-white/30" : "bg-mandik-ink/60 text-white hover:bg-mandik-ink"}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={dir === 1 ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
      </svg>
    </button>
  );

  return (
    <>
      {/* Náhled */}
      <div className="relative aspect-[4/3] bg-mandik-paper-soft overflow-hidden hairline">
        <img src={list[idx]} alt={alt} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { e.currentTarget.style.opacity = 0; }} />

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Zvětšit fotku"
          className="absolute top-3 right-3 w-9 h-9 inline-flex items-center justify-center bg-mandik-ink/60 text-white hover:bg-mandik-ink transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 8v6M8 11h6M19 11a8 8 0 11-16 0 8 8 0 0116 0z" />
          </svg>
        </button>

        {n > 1 && (
          <>
            <div className="absolute left-2 top-1/2 -translate-y-1/2"><Arrow dir={-1} /></div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2"><Arrow dir={1} /></div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {list.map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 transition-colors" style={{ background: i === idx ? accent : "rgba(255,255,255,0.65)" }} />
              ))}
            </div>
            <div className="absolute bottom-3 right-3 mono text-[10px] text-white bg-mandik-ink/60 px-1.5 py-0.5">{idx + 1}/{n}</div>
          </>
        )}
      </div>

      {/* Lightbox přes celou obrazovku */}
      {open && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Zavřít"
            className="absolute top-4 right-4 w-10 h-10 inline-flex items-center justify-center text-white/80 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <img src={list[idx]} alt={alt} className="max-w-[92vw] max-h-[88vh] object-contain" onClick={(e) => e.stopPropagation()} />

          {n > 1 && (
            <>
              <div className="absolute left-4 top-1/2 -translate-y-1/2"><Arrow dir={-1} light /></div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2"><Arrow dir={1} light /></div>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 mono text-[12px] text-white/80">{idx + 1} / {n}</div>
            </>
          )}
        </div>
      )}
    </>
  );
};
