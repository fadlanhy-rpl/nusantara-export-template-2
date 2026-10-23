'use client';

import React from 'react';
import { Anchor, ShieldCheck } from 'lucide-react';

export default function TopMarquee() {
  const items = [
    'EKSPORTIR RESMI TERVERIFIKASI RI',
    'NIB: 9120301928371',
    'IMO NON-DG SPECIAL PROVISION 925 (UN 3313 PASSED)',
    'PORT OF LOADING: TANJUNG PERAK (SUB) & TANJUNG PRIOK (JKT)',
    'HS CODE: 4402.90.10',
    'SGS LAB CERTIFIED #SH-2026',
    'INCOTERMS: EXW / FOB / CFR / CIF',
    'MONTHLY CAPACITY: 350+ METRIC TONS',
  ];

  return (
    <div className="w-full bg-surface-container-lowest border-b border-outline-variant/30 text-[11px] font-mono tracking-wider overflow-hidden py-2 text-on-surface-variant flex items-center select-none">
      <div className="flex shrink-0 items-center gap-6 animate-marquee whitespace-nowrap">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span className="text-on-surface-variant/90">{item}</span>
            <span className="text-outline-variant/60">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
