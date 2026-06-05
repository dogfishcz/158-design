"use client";

import React from "react";

// Cookie souhlas (přeneseno z v5, přizpůsobeno designu v8).
// - banner při prvním načtení, plovoucí pill, modal s nastavením
// - souhlas v localStorage
// - otevření nastavení odjinud: window.dispatchEvent(new Event("mandik:cookie-settings"))

const STORAGE_KEY = "mandik_cookie_consent";

function loadConsent() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

function CookieIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.598 11.064a1.006 1.006 0 0 0-.854-.172A2.938 2.938 0 0 1 20 11c-1.654 0-3-1.346-3.003-2.937.005-.034.016-.136.017-.17a.999.999 0 0 0-1.254-1.006A2.963 2.963 0 0 1 15 7c-1.654 0-3-1.346-3-3 0-.217.031-.432.081-.64a1 1 0 0 0-1.169-1.227 10 10 0 1 0 10.686 10.931zM12 20a8 8 0 1 1-.676-17.001A5.006 5.006 0 0 0 16 7a4.944 4.944 0 0 0 .567-.032A5.01 5.01 0 0 0 21 11.001a5.042 5.042 0 0 0 .348-.02A8.012 8.012 0 0 1 12 20z" />
      <circle cx="9" cy="10" r="1.5" />
      <circle cx="13.5" cy="14.5" r="1.5" />
      <circle cx="8.5" cy="15.5" r="1" />
      <circle cx="14" cy="10" r="1" />
    </svg>
  );
}

function CookieToggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between p-4 bg-mandik-paper-soft hairline">
      <div className="flex-1 pr-4">
        <p className="font-semibold text-mandik-steel text-sm">{label}</p>
        <p className="text-xs text-mandik-steel-70 mt-1">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`shrink-0 w-11 h-6 rounded-full transition-colors flex items-center px-1 ${
          checked ? "bg-accent justify-end" : "bg-mandik-rule justify-start"
        }`}
        aria-checked={checked}
        role="switch"
      >
        <div className="w-4 h-4 rounded-full bg-white shadow transition-all" />
      </button>
    </div>
  );
}

export function CookieBanner() {
  const [bannerVisible, setBannerVisible] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [consent, setConsent] = React.useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  React.useEffect(() => {
    const saved = loadConsent();
    if (!saved) setBannerVisible(true);
    else setConsent(saved);
  }, []);

  // Otevření nastavení odjinud (např. tlačítko na stránce /cookies)
  React.useEffect(() => {
    const open = () => {
      const saved = loadConsent();
      if (saved) setConsent(saved);
      setSettingsOpen(true);
    };
    window.addEventListener("mandik:cookie-settings", open);
    return () => window.removeEventListener("mandik:cookie-settings", open);
  }, []);

  function acceptAll() {
    const full = { necessary: true, analytics: true, marketing: true, preferences: true };
    saveConsent(full);
    setConsent(full);
    setBannerVisible(false);
    setSettingsOpen(false);
  }

  function rejectAll() {
    const minimal = { necessary: true, analytics: false, marketing: false, preferences: false };
    saveConsent(minimal);
    setConsent(minimal);
    setBannerVisible(false);
    setSettingsOpen(false);
  }

  function saveSettings() {
    saveConsent(consent);
    setBannerVisible(false);
    setSettingsOpen(false);
  }

  return (
    <>
      {/* Modal nastavení cookies */}
      {settingsOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="h-display text-xl text-mandik-steel">Nastavení cookies</h2>
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="text-mandik-steel-70 hover:text-mandik-ink transition-colors"
                  aria-label="Zavřít"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-mandik-steel-80 mb-6">
                Vyberte, které kategorie cookies chcete povolit. Technické cookies jsou nezbytné pro fungování webu a nelze je vypnout.
              </p>

              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 bg-mandik-paper-soft hairline">
                  <div className="flex-1 pr-4">
                    <p className="font-semibold text-mandik-steel text-sm">Technické (nutné)</p>
                    <p className="text-xs text-mandik-steel-70 mt-1">
                      Zajišťují základní funkčnost webu – přihlášení, bezpečnost, jazykové nastavení. Nelze je vypnout.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <div className="w-11 h-6 rounded-full bg-accent flex items-center justify-end px-1 cursor-not-allowed">
                      <div className="w-4 h-4 rounded-full bg-white shadow" />
                    </div>
                  </div>
                </div>

                <CookieToggle
                  label="Preferenční"
                  description="Pamatují si vaše nastavení a preference (jazyk, region, zobrazení)."
                  checked={consent.preferences}
                  onChange={(v) => setConsent((c) => ({ ...c, preferences: v }))}
                />
                <CookieToggle
                  label="Analytické"
                  description="Pomáhají nám porozumět, jak návštěvníci web používají. Všechna data jsou anonymizovaná."
                  checked={consent.analytics}
                  onChange={(v) => setConsent((c) => ({ ...c, analytics: v }))}
                />
                <CookieToggle
                  label="Marketingové"
                  description="Slouží k zobrazení relevantní reklamy na základě vašich zájmů."
                  checked={consent.marketing}
                  onChange={(v) => setConsent((c) => ({ ...c, marketing: v }))}
                />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={saveSettings}
                  className="flex-1 px-4 py-2.5 border-2 border-mandik-steel text-mandik-steel text-sm font-semibold hover:bg-mandik-steel hover:text-white transition-colors"
                >
                  Uložit nastavení
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="flex-1 px-4 py-2.5 border-2 border-mandik-rule text-mandik-steel-80 text-sm font-semibold hover:border-mandik-steel-70 transition-colors"
                >
                  Odmítnout vše
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="flex-1 px-5 py-2.5 bg-accent text-mandik-ink text-sm font-semibold hover:bg-[#1ec170] transition-colors"
                >
                  Přijmout vše
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plovoucí pill tlačítko – rozjíždí se doprava */}
      <button
        type="button"
        onClick={() => setSettingsOpen(true)}
        className="fixed bottom-5 left-4 z-[9997] group flex items-center h-12 rounded-full bg-mandik-ink shadow-xl overflow-hidden max-w-[3rem] hover:max-w-[16rem] transition-[max-width] duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        aria-label="Nastavení cookies"
      >
        <span className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-[#6b7f92]">
          <CookieIcon className="w-5 h-5 text-white" />
        </span>
        <span className="pl-3 pr-5 h-label text-[11px] text-white whitespace-nowrap">Nastavení cookies</span>
      </button>

      {/* Banner při prvním načtení */}
      {bannerVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t-2 border-accent shadow-2xl">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-mandik-steel-80 leading-relaxed">
                  <span className="font-semibold text-mandik-steel">Používáme cookies.</span>{" "}
                  Pomáhají nám zlepšovat web a zobrazovat relevantní obsah. Více informací v{" "}
                  <a href="/cookies" className="text-accent font-semibold hover:underline">zásadách cookies</a>.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSettingsOpen(true)}
                  className="px-4 py-2 hairline text-mandik-steel-80 text-sm font-medium hover:text-mandik-steel transition-colors"
                >
                  Nastavení
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="px-4 py-2 hairline text-mandik-steel-80 text-sm font-medium hover:text-mandik-steel transition-colors"
                >
                  Odmítnout
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="px-5 py-2 bg-accent text-mandik-ink text-sm font-semibold hover:bg-[#1ec170] transition-colors"
                >
                  Přijmout vše
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
