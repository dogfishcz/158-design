"use client";

import React from "react";

// Sbalovací webový formulář pro oznámení (inspirováno mandik-prod /cz/whistleblowing).
// Pole: Jméno (nepovinné), E-mail (nepovinné), Zpráva (povinné), Příloha (nepovinné, max 5 MB).
// Pozn.: stejně jako servisní formulář je zatím klientský (bez napojení na backend).

export function WhistleblowingForm() {
  const [open, setOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [fileName, setFileName] = React.useState("");

  const inputCls =
    "w-full mt-1 px-3 py-2.5 hairline bg-white text-[14px] outline-none focus:ring-1 focus:ring-accent transition-shadow";
  const labelText = "h-label text-[10px] text-mandik-steel-70";

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return setFileName("");
    if (f.size > 5 * 1024 * 1024) {
      e.target.value = "";
      setFileName("Soubor je větší než 5 MB");
      return;
    }
    setFileName(f.name);
  }

  return (
    <div className="hairline bg-white not-prose">
      {/* Toggle bar */}
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
          <span className="h-label text-[12px]">{open ? "Skrýt formulář" : "Podat oznámení online"}</span>
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

      {/* Rozbalovací obsah */}
      <div className={`overflow-hidden transition-[max-height] duration-500 ease-out ${open ? "max-h-[1200px]" : "max-h-0"}`}>
        <div className="p-5 sm:p-7">
          {sent ? (
            <div className="flex items-start gap-3 p-5 bg-accent/10 hairline">
              <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <div className="h-display text-[18px] text-mandik-ink">Oznámení odesláno</div>
                <p className="text-[13px] text-mandik-steel-80 mt-1 leading-relaxed">
                  Děkujeme. Pověřená osoba vás vyrozumí ve lhůtě vhodné pro vyhodnocení obsahu oznámení.
                  S vaším oznámením je nakládáno důvěrně.
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
              <p className="text-[13px] text-mandik-steel-80 leading-relaxed mb-5">
                Jméno i e-mail jsou nepovinné – oznámení můžete podat i anonymně. Pokud chcete být vyrozuměni
                o výsledku, uveďte prosím kontakt.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className={labelText}>Jméno a příjmení</span>
                  <input className={inputCls} placeholder="nepovinné" />
                </label>
                <label className="block">
                  <span className={labelText}>E-mail</span>
                  <input type="email" className={inputCls} placeholder="nepovinné" />
                </label>
                <label className="block sm:col-span-2">
                  <span className={labelText}>Zpráva / popis oznámení *</span>
                  <textarea
                    required
                    rows={5}
                    className={inputCls}
                    placeholder="Popište prosím co nejpodrobněji, čeho se oznámení týká…"
                  />
                </label>
                <div className="block sm:col-span-2">
                  <span className={labelText}>Příloha (nepovinné, max 5 MB)</span>
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
                  <span>Odeslat oznámení</span>
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
}
