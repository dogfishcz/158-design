"use client";

import React from "react";
import dynamic from "next/dynamic";
import { getRegionContacts } from "@/lib/contacts";

// maplibre-gl sahá na window → načítat jen na klientu
const ContactsMap = dynamic(() => import("./ContactsMap").then((m) => m.ContactsMap), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#222b36]">
      <span className="mono text-[11px] text-white/40">Načítání mapy…</span>
    </div>
  ),
});

const MailIcon = () => (
  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const PersonCard = ({ person }) => {
  const name = person.firstName ? `${person.firstName} ${person.lastName}` : person.lastName;
  const telHref = (n) => `tel:${n.replace(/[^\d+]/g, "")}`;
  const hasContact = person.email || person.phone || person.mobile;
  return (
    <div className="border border-mandik-rule bg-mandik-paper-soft p-4">
      {name && <div className="h-display text-[16px] leading-tight text-mandik-ink">{name}</div>}
      {person.position && <div className="mono text-[11px] text-mandik-steel-70 mt-0.5">{person.position}</div>}
      <div className="mt-3 space-y-1.5">
        {person.email && (
          <a href={`mailto:${person.email}`} className="flex items-center gap-2.5 text-[13px] text-mandik-steel hover:text-mandik-ink transition-colors break-all">
            <MailIcon /> {person.email}
          </a>
        )}
        {person.phone && (
          <a href={telHref(person.phone)} className="flex items-center gap-2.5 text-[13px] text-mandik-steel hover:text-mandik-ink transition-colors">
            <PhoneIcon /> {person.phone}
          </a>
        )}
        {person.mobile && (
          <a href={telHref(person.mobile)} className="flex items-center gap-2.5 text-[13px] text-mandik-steel hover:text-mandik-ink transition-colors">
            <PhoneIcon /> {person.mobile}
          </a>
        )}
        {!hasContact && (
          <div className="text-[12px] italic text-mandik-steel-70">Kontaktní údaje budou doplněny.</div>
        )}
      </div>
    </div>
  );
};

// Centrální / obecné kontakty – zobrazují se kompaktně vedle sebe na konci.
const CENTRAL_DIVISIONS = ["Asistentka ředitele", "Školení", "Ústředna | nákup | doprava"];

const DivisionHeading = ({ name }) => (
  <>
    <h3 className="flex items-center gap-2 h-display text-[18px] text-mandik-ink">
      <span className="w-1.5 h-1.5 bg-accent" /> {name}
    </h3>
    <div className="mt-3 mb-6 h-px bg-mandik-rule" />
  </>
);

export function ContactsScreen() {
  const [selected, setSelected] = React.useState("cechy");
  const region = getRegionContacts(selected);
  const mainDivs = region.divisions.filter((d) => !CENTRAL_DIVISIONS.includes(d.name));
  const centralDivs = region.divisions.filter((d) => CENTRAL_DIVISIONS.includes(d.name));

  return (
    <div data-screen-label="Kontakt" className="page-enter">
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-12 pb-12">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="h-display text-[40px] sm:text-[56px] lg:text-[72px] leading-[0.95] text-mandik-ink">
                Kontakt
              </h1>
              <div className="mt-4 h-1 w-16 bg-accent" />
            </div>
            <div className="col-span-12 lg:col-span-4 text-mandik-steel-80 text-[15px] leading-relaxed">
              Vyberte oblast nebo zemi na mapě — zobrazíme kontakty rozdělené po divizích.
              ČR je rozdělená na Čechy, Moravu a&nbsp;Slezsko, Německo po spolkových zemích.
            </div>
          </div>
        </div>
      </section>

      {/* MAPA + KONTAKTY — světlá sekce */}
      <section className="bg-white border-t border-mandik-rule">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-14 lg:py-20">
          {/* Mapa — přes celou šířku */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 bg-accent" />
            <span className="h-label text-[11px] text-mandik-steel-70">Mapa kontaktů — svět</span>
          </div>
          <div className="h-[440px] sm:h-[560px] overflow-hidden border border-mandik-rule">
            <ContactsMap selected={selected} onSelect={setSelected} className="h-full w-full" />
          </div>
          <p className="mono text-[11px] text-mandik-steel-70 mt-3">
            Klikněte na zemi nebo oblast (ČR = Čechy / Morava / Slezsko, Německo po spolkových zemích).
            Přiblížení kolečkem myši nad mapou.
          </p>

          {/* Kontakty pod mapou — mřížka, bez scrollu */}
          <div className="mt-12 lg:mt-16">
            <div className="flex items-center justify-between gap-3 mb-6">
              <h2 className="h-display text-[30px] sm:text-[38px] leading-tight text-mandik-ink">
                {region.label ? `Kontakty — ${region.label}` : "Vyberte oblast"}
              </h2>
              {selected && (
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mono text-[11px] text-mandik-steel-70 hover:text-mandik-ink transition-colors shrink-0"
                >
                  ✕ zrušit výběr
                </button>
              )}
            </div>

            {region.note && (
              <div className="mb-8 border-l-2 border-accent bg-accent/10 px-4 py-3 text-[13px] leading-relaxed text-mandik-steel-90">
                {region.note}
              </div>
            )}

            {region.divisions.length ? (
              <>
                {/* Hlavní divize (obchodní zástupci atd.) — přes celou šířku */}
                {mainDivs.length > 0 && (
                  <div className="space-y-12">
                    {mainDivs.map((div) => (
                      <div key={div.name}>
                        <DivisionHeading name={div.name} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {div.people.map((p, i) => (
                            <PersonCard key={(p.email || p.lastName) + i} person={p} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Centrální kontakty — kompaktně vedle sebe, na konci */}
                {centralDivs.length > 0 && (
                  <div className={`${mainDivs.length > 0 ? "mt-16 pt-12 border-t border-mandik-rule" : ""} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8`}>
                    {centralDivs.map((div) => (
                      <div key={div.name}>
                        <DivisionHeading name={div.name} />
                        <div className="space-y-4">
                          {div.people.map((p, i) => (
                            <PersonCard key={(p.email || p.lastName) + i} person={p} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="border border-dashed border-mandik-rule p-8 text-center">
                <p className="text-mandik-steel-80 text-[14px] leading-relaxed">
                  Vyberte zemi nebo oblast v&nbsp;mapě a zobrazíme kontakty rozdělené po divizích.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
