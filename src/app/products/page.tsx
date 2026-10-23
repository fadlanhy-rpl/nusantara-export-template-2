import React from 'react';
import Link from 'next/link';
import { ALL_COMMODITIES } from '@/lib/commodityData';
import { ShieldCheck, ArrowRight, Flame, Coffee, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Katalog Komoditas Ekspor Nusantara — NusantaraOrigin',
  description: 'Portofolio komoditas ekspor Indonesia: Briket Arang Batok Kelapa 100%, Specialty Green Coffee, dan Rempah Cengkeh Maluku.',
};

export default function CommoditiesCatalogPage() {
  const getIcon = (cat: string) => {
    switch (cat) {
      case 'CHARCOAL':
        return <Flame className="w-5 h-5 text-primary" />;
      case 'COFFEE':
        return <Coffee className="w-5 h-5 text-tertiary" />;
      case 'SPICES':
      default:
        return <Sparkles className="w-5 h-5 text-secondary" />;
    }
  };

  return (
    <div className="w-full max-w-[1160px] mx-auto px-4 lg:px-0 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <nav className="font-mono text-[11px] text-outline uppercase tracking-wider">
          PORTAL EKSPOR NUSANTARAORIGIN / KATALOG UTAMA
        </nav>
        <h1 className="font-headline text-[32px] sm:text-[38px] font-extrabold text-on-surface tracking-tight">
          Katalog Komoditas Ekspor Terverifikasi
        </h1>
        <p className="font-body text-[15px] text-outline max-w-2xl">
          Seluruh komoditas diproses melalui fasilitas berstandar ekspor, bersertifikat laboratorium independen, dan siap dimuat dalam kontainer FCL dari pelabuhan Tanjung Perak & Tanjung Priok.
        </p>
      </div>

      {/* 3-Column Commodities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ALL_COMMODITIES.map((c) => (
          <div
            key={c.slug}
            className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-primary/60 transition-all shadow-xl group"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center">
                  {getIcon(c.category)}
                </div>
                <span className="px-2.5 py-0.5 rounded bg-primary-container/20 border border-primary-container/40 text-primary font-mono text-[10px] font-bold">
                  {c.badge}
                </span>
              </div>

              <div>
                <span className="font-mono text-[11px] text-outline uppercase">
                  HS CODE: {c.hs_code}
                </span>
                <h3 className="font-headline text-[18px] font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">
                  {c.name}
                </h3>
                <span className="font-mono text-[12px] text-tertiary block mt-0.5">
                  {c.grade}
                </span>
              </div>

              <p className="font-body text-[13px] text-outline leading-relaxed">
                {c.desc}
              </p>

              {/* Highlights Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/20">
                {c.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono text-[10px]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-outline-variant/20 flex flex-col gap-3">
              <div className="flex justify-between items-baseline font-mono text-[12px]">
                <span className="text-outline">Harga Indikatif:</span>
                <span className="text-on-surface font-bold text-[14px]">{c.fob}</span>
              </div>
              <div className="flex justify-between items-baseline font-mono text-[11px]">
                <span className="text-outline">Min. Order (MOQ):</span>
                <span className="text-tertiary">{c.moq}</span>
              </div>

              <Link
                href={c.link}
                className="w-full mt-2 py-2.5 px-4 rounded-lg bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-headline text-[12px] uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>Lihat Spesifikasi Lab</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
