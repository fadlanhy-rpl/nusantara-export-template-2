'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, CheckCircle2, Box, Store, Sparkles } from 'lucide-react';

interface ShapeItem {
  id: string;
  name: string;
  cadCode: string;
  category: string;
  dimW: string;
  dimH: string;
  dimD: string;
  dimText: string;
  pcsPerKg: number;
  burnHours: number;
  temp: string;
  app: string;
  pack: string;
  badge: string;
}

const SHAPES: Record<string, ShapeItem> = {
  'cube-25': {
    id: 'cube-25',
    name: 'Cube C25',
    cadCode: 'ISO-C25-REV3',
    category: 'CUBE',
    dimW: '25.0 mm',
    dimH: '25.0 mm',
    dimD: '25.0 mm',
    dimText: '25 × 25 × 25 mm',
    pcsPerKg: 72,
    burnHours: 2.5,
    temp: '650°C – 700°C konsisten',
    app: 'Shisha lounge standar internasional (Dubai, UEA, GCC)',
    pack: 'Inner Box 1kg (vacuum sealed) + Master Carton 10kg/20kg (5-Ply)',
    badge: 'GLOBAL BEST SELLER',
  },
  'cube-26': {
    id: 'cube-26',
    name: 'Cube C26',
    cadCode: 'ISO-C26-EU',
    category: 'CUBE',
    dimW: '26.0 mm',
    dimH: '26.0 mm',
    dimD: '26.0 mm',
    dimText: '26 × 26 × 26 mm',
    pcsPerKg: 64,
    burnHours: 2.75,
    temp: '670°C – 710°C konsisten',
    app: 'Pasar premium Eropa (Jerman, Prancis, Polandia, Spanyol)',
    pack: 'Inner Box 1kg (glossy/doff) + Master Box 10kg Corrugated',
    badge: 'EUROPEAN STANDARD',
  },
  'cube-27': {
    id: 'cube-27',
    name: 'Cube C27 / C28',
    cadCode: 'ISO-C27-HEAVY',
    category: 'CUBE',
    dimW: '27.0 mm',
    dimH: '27.0 mm',
    dimD: '27.0 mm',
    dimText: '27 × 27 × 27 mm',
    pcsPerKg: 56,
    burnHours: 3.25,
    temp: '680°C – 720°C konsisten',
    app: 'Sesi shisha intensif & mangkuk phunnel besar (Lounge VIP)',
    pack: 'Inner Box 1kg + Master Box 10kg Heavy Duty',
    badge: 'LONG LASTING 3H+',
  },
  'hex-bbq': {
    id: 'hex-bbq',
    name: 'Hexagonal BBQ',
    cadCode: 'ISO-HEX2050',
    category: 'HEXAGONAL',
    dimW: '20.0 mm',
    dimH: '50.0 mm',
    dimD: '20.0 mm',
    dimText: '20 × 50 mm / 20 × 35 mm',
    pcsPerKg: 64,
    burnHours: 4.75,
    temp: '700°C – 750°C konsisten',
    app: 'Restoran yakiniku, steakhouse, dan commercial grill BBQ',
    pack: 'Bulk Master Box 10kg atau 20kg (Heavy Kraft 5-Ply)',
    badge: 'RESTAURANT GRILL',
  },
  'finger': {
    id: 'finger',
    name: 'Finger / Cylinder',
    cadCode: 'ISO-CYL2050',
    category: 'FINGER',
    dimW: '20.0 mm',
    dimH: '50.0 mm',
    dimD: '20.0 mm',
    dimText: '20 × 50 mm',
    pcsPerKg: 72,
    burnHours: 2.5,
    temp: '650°C – 690°C',
    app: 'Mangkuk rokok tradisional & pasar Yunani, Turki, dan Levant',
    pack: 'Inner Box 1kg + Master Carton 10kg',
    badge: 'MEDITERRANEAN HIT',
  },
  'flat-kaloud': {
    id: 'flat-kaloud',
    name: 'Flat / Kaloud',
    cadCode: 'ISO-FLAT2518',
    category: 'FLAT_KALOUD',
    dimW: '25.0 mm',
    dimH: '18.0 mm',
    dimD: '25.0 mm',
    dimText: '25 × 25 × 18 mm',
    pcsPerKg: 96,
    burnHours: 2.0,
    temp: '640°C – 680°C',
    app: 'Heat Management Device (HMD) / Lotus Kaloud Bowl',
    pack: 'Inner Box 1kg (3 tiers) + Master Carton 10kg',
    badge: 'HMD SPECIALIST',
  },
};

export default function ShapeCadMatrix() {
  const [selectedId, setSelectedId] = useState<string>('cube-25');
  const current = SHAPES[selectedId] || SHAPES['cube-25'];

  return (
    <section className="flex flex-col gap-6 bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 shadow-xl">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
          PRESISI EKSTRUSI & CETAK HIDROLIK
        </span>
        <h2 className="font-headline text-[22px] sm:text-[28px] font-bold text-on-surface">
          Katalog Standar Bentuk, Dimensi & Aplikasi Kargo
        </h2>
        <p className="font-body text-[14px] text-outline">
          Kami memproduksi cetakan briket presisi tinggi menggunakan mesin press hidrolik 120-ton dengan batas toleransi pemotongan sangat presisi (&lt; ±0.5 mm) untuk kerapatan packing sempurna.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-surface-container p-1.5 rounded-xl border border-outline-variant/30">
        {Object.values(SHAPES).map((s) => {
          const isSelected = s.id === selectedId;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`px-3 py-2 rounded-lg font-headline text-[13px] font-semibold transition-all ${
                isSelected
                  ? 'bg-primary-container text-on-primary-container shadow-md'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      {/* Detail Area: Left CAD Blueprint + Right Spec Attributes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: CAD Blueprint */}
        <div className="lg:col-span-5 bg-surface-container rounded-xl p-5 flex flex-col justify-between border border-outline-variant/30 shadow-inner relative overflow-hidden">
          <div className="flex items-center justify-between font-mono text-[11px] text-outline uppercase tracking-wider mb-2">
            <span>
              CAD BLUEPRINT: <strong className="text-primary">{current.cadCode}</strong>
            </span>
            <span className="flex items-center gap-1 text-tertiary">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              TOLERANSI ±0.5mm
            </span>
          </div>

          {/* SVG Vector Blueprint */}
          <div className="w-full flex-1 min-h-[260px] flex items-center justify-center p-4 relative">
            {/* Blueprint Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cadGrid2" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ECE0DB" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cadGrid2)" />
            </svg>

            {/* Isometric Briquette SVG */}
            <svg className="w-full max-w-[280px] h-auto text-primary z-10 transition-all duration-300" viewBox="0 0 320 240">
              {/* Isometric Top */}
              <polygon points="160,50 240,95 160,140 80,95" fill="#2F2925" stroke="#C4440F" strokeWidth="2" />
              {/* Isometric Left */}
              <polygon points="80,95 160,140 160,205 80,160" fill="#1A1512" stroke="#C4440F" strokeWidth="2" />
              {/* Isometric Right */}
              <polygon points="160,140 240,95 240,160 160,205" fill="#241E1B" stroke="#C4440F" strokeWidth="2" />

              {/* Chamfer lines */}
              <line x1="82" y1="96" x2="158" y2="139" stroke="#FFB59C" strokeDasharray="2 2" strokeWidth="1" />
              <line x1="160" y1="142" x2="160" y2="203" stroke="#FFB59C" strokeDasharray="2 2" strokeWidth="1" />

              {/* Dimension Callouts */}
              <line x1="60" y1="90" x2="140" y2="45" stroke="#96D4B2" strokeWidth="1.5" />
              <text x="85" y="60" fill="#96D4B2" fontFamily="Geist" fontSize="11" fontWeight="600">
                {current.dimW}
              </text>

              <line x1="255" y1="95" x2="255" y2="160" stroke="#96D4B2" strokeWidth="1.5" />
              <text x="260" y="132" fill="#96D4B2" fontFamily="Geist" fontSize="11" fontWeight="600">
                {current.dimH}
              </text>

              <line x1="70" y1="170" x2="150" y2="215" stroke="#96D4B2" strokeWidth="1.5" />
              <text x="100" y="202" fill="#96D4B2" fontFamily="Geist" fontSize="11" fontWeight="600">
                {current.dimD}
              </text>
            </svg>
          </div>

          {/* Bottom CAD Legend */}
          <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant pt-2 bg-surface-container-high/40 p-2.5 rounded border border-outline-variant/20">
            <span>KEPADATAN: <strong className="text-on-surface">&gt; 1.35 g/cm³</strong></span>
            <span>BEVEL EDGES: <strong className="text-on-surface">R 1.2 mm</strong></span>
            <span>CRUSH FORCE: <strong className="text-on-surface">&gt; 250 kgf</strong></span>
          </div>
        </div>

        {/* Right Column: Technical Attributes Card */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-surface-container rounded-xl p-6 border border-outline-variant/30 shadow-md">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <div>
                <h3 className="font-headline text-[18px] text-on-surface font-bold">
                  {current.name} ({current.dimText})
                </h3>
                <span className="font-mono text-[12px] text-outline">
                  Kategori Geometri: {current.category}
                </span>
              </div>
              <span className="px-3 py-1 rounded bg-primary-container/20 border border-primary-container/40 text-primary font-mono text-[11px] font-bold">
                {current.badge}
              </span>
            </div>

            {/* Attributes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-surface-container-high rounded-lg border border-outline-variant/20 flex flex-col">
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                  Dimensi Presisi (CAD)
                </span>
                <span className="font-mono text-[14px] text-on-surface font-bold mt-1">
                  {current.dimText} (±0.5 mm)
                </span>
              </div>

              <div className="p-3 bg-surface-container-high rounded-lg border border-outline-variant/20 flex flex-col">
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                  Rasio Butir per Kilogram
                </span>
                <span className="font-mono text-[14px] text-on-surface font-bold mt-1">
                  {current.pcsPerKg} butir / kg
                </span>
              </div>

              <div className="p-3 bg-surface-container-high rounded-lg border border-outline-variant/20 flex flex-col">
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                  Durasi Pembakaran Efektif
                </span>
                <span className="font-mono text-[14px] text-tertiary font-bold mt-1">
                  {current.burnHours} Jam (Stabil)
                </span>
              </div>

              <div className="p-3 bg-surface-container-high rounded-lg border border-outline-variant/20 flex flex-col">
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                  Suhu Inti Pembakaran
                </span>
                <span className="font-mono text-[14px] text-primary font-bold mt-1">
                  {current.temp}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1 font-body text-[13px] text-on-surface-variant">
              <div className="flex items-start gap-2">
                <Store className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Aplikasi Utama:</strong> {current.app}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Box className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Rekomendasi Packing:</strong> {current.pack}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Kustomisasi Mold:</strong> Tersedia ukiran logo timbul (*embossed buyer logo*) di permukaan briket.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-3">
            <div className="font-mono text-[12px] text-outline">
              MOQ SHAPE INI: <strong className="text-on-surface">1x 20ft FCL (~18 MT)</strong>
            </div>
            <Link
              href="/oem-studio"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-high text-primary hover:bg-primary-container hover:text-on-primary-container font-headline text-[12px] uppercase font-bold tracking-wider transition-colors"
            >
              <span>Kustomisasi Kemasan Inner/Master Box</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
