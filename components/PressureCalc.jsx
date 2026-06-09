"use client";

import React from "react";
import { SectionLabel, Button } from "./Primitives";

export const PressureCalc = () => {
  const [flow, setFlow] = React.useState(1800);
  const [diameter, setDiameter] = React.useState(315);
  const [length, setLength] = React.useState(28);
  const [bends, setBends] = React.useState(4);

  const rho = 1.2;
  const A = Math.PI * Math.pow(diameter / 2000, 2);
  const Q = flow / 3600;
  const v = Q / A;
  const D = diameter / 1000;
  const k = 0.00015;
  const Re = (v * D) / 1.5e-5;
  const lambda = 0.25 / Math.pow(Math.log10(k / (3.7 * D) + 5.74 / Math.pow(Re, 0.9)), 2);
  const dpStraight = lambda * (length / D) * (rho * v * v) / 2;
  const dpBend = bends * 0.3 * (rho * v * v) / 2;
  const dpTotal = dpStraight + dpBend;

  const Row = ({ label, unit, value, min, max, step = 1, set }) => (
    <div className="grid grid-cols-[140px_1fr_90px] items-center gap-5 py-3 hairline">
      <div className="h-label text-[11px] text-mandik-steel">{label}</div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => set(+e.target.value)}
        className="w-full accent-[#26d07c] h-1 appearance-none bg-mandik-rule"
      />
      <div className="text-right mono text-[13px] text-mandik-ink tabular-nums">
        {value}<span className="text-mandik-steel-70 ml-1">{unit}</span>
      </div>
    </div>
  );

  const warn = v > 8 ? "Rychlost překračuje 8 m/s, zvažte větší průměr." : v > 6 ? "Pozn.: rychlost nad 6 m/s zvyšuje hluk." : null;

  return (
    <div className="grid grid-cols-12 gap-px bg-mandik-rule hairline">
      <div className="col-span-7 bg-white p-8">
        <SectionLabel color="#506077">Online nástroj</SectionLabel>
        <div className="h-display text-[32px] leading-tight">Kalkulátor tlakové ztráty</div>
        <p className="text-sm text-mandik-steel-80 mt-3 max-w-md">
          Spočítá tlakovou ztrátu rovného úseku kruhového potrubí (pozinkovaný plech, k = 0,15 mm) s lokálními ztrátami v kolenech 90°.
        </p>

        <div className="mt-6">
          <Row label="Průtok" unit="m³/h" value={flow} min={200} max={12000} step={50} set={setFlow} />
          <Row label="Průměr potrubí" unit="mm" value={diameter} min={100} max={1000} step={5} set={setDiameter} />
          <Row label="Délka úseku" unit="m" value={length} min={1} max={150} set={setLength} />
          <Row label="Počet kolen 90°" unit="ks" value={bends} min={0} max={20} set={setBends} />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button variant="primary" href="#">Exportovat protokol PDF</Button>
          <Button variant="ghost" href="#">Sdílet odkaz</Button>
        </div>
      </div>

      <div className="col-span-5 bg-mandik-steel text-white p-8 relative">
        <div className="h-label text-[11px] text-white/60">Výsledek</div>
        <div className="mt-4 h-display text-[88px] leading-none tabular-nums">
          {Math.round(dpTotal)}<span className="text-accent text-[36px] align-top ml-2">Pa</span>
        </div>
        <div className="mt-2 mono text-[11px] text-white/60">CELKOVÁ TLAKOVÁ ZTRÁTA</div>

        <div className="mt-8 space-y-3 mono text-[12px]">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/60">Rychlost proudění</span>
            <span className="tabular-nums">{v.toFixed(2)} m/s</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/60">Reynoldsovo č.</span>
            <span className="tabular-nums">{Math.round(Re).toLocaleString("cs-CZ")}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/60">Součinitel tření λ</span>
            <span className="tabular-nums">{lambda.toFixed(4)}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/60">Δp rovný úsek</span>
            <span className="tabular-nums">{dpStraight.toFixed(1)} Pa</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Δp místní ({bends} kolen)</span>
            <span className="tabular-nums">{dpBend.toFixed(1)} Pa</span>
          </div>
        </div>

        {warn && (
          <div className="mt-6 border-l-2 border-cat-heat pl-3 text-[12px] text-white/85">
            <span className="h-label text-[10px] text-cat-heat block mb-1">UPOZORNĚNÍ</span>
            {warn}
          </div>
        )}

        <div className="absolute bottom-4 right-4 mono text-[10px] text-white/40">
          výpočet: Swamee-Jain · ρ 1,2 kg/m³ · k 0,15 mm
        </div>
      </div>
    </div>
  );
};
