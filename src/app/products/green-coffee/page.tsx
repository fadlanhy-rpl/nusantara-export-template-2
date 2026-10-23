import React from 'react';
import Link from 'next/link';
import { Coffee, ShieldCheck, ArrowRight, Award, Droplets, MapPin, Download } from 'lucide-react';

export const metadata = {
  title: 'Sumatra Mandheling & Gayo Green Coffee Beans — NusantaraOrigin',
  description: 'Specialty Grade 1 Arabica green coffee beans from Aceh Gayo and North Sumatra. SCA Score 85+, moisture 11.5%, defect < 3%.',
};

export default function GreenCoffeePage() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-0 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 flex flex-col gap-6">
        <nav className="font-mono text-[11px] text-outline uppercase tracking-wider">
          <Link href="/products" className="hover:text-primary">KOMODITAS EKSPOR</Link> / BIJI KOPI HIJAU
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <h1 className="font-headline text-[32px] sm:text-[40px] font-extrabold text-on-surface">
              Sumatra Mandheling & Gayo Green Coffee Beans
            </h1>
            <p className="font-body text-[15px] text-outline max-w-2xl leading-relaxed">
              Biji kopi mentah Specialty Grade 1 (Triple Picked) dari dataran tinggi vulkanik Aceh Gayo dan Lintong, Sumatra Utara. Diproses wet-hulled (*giling basah*) tradisional untuk citarasa rempah, cokelat hitam, dan kekentalan body penuh.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded bg-surface-container font-mono text-[11px]">
                HS CODE: <strong className="text-primary">0901.11.00</strong>
              </span>
              <span className="px-3 py-1 rounded bg-tertiary-container/30 text-tertiary font-mono text-[11px] font-bold">
                SCA CUPPING SCORE: 85.5+
              </span>
              <span className="px-3 py-1 rounded bg-surface-container font-mono text-[11px]">
                GRADE: SPECIALTY TRIPLE PICKED (TP)
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="relative w-full h-52 sm:h-60 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center p-4 overflow-hidden shadow-2xl group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-tertiary/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <img
                src="/img/green-coffee-cutout.png"
                alt="Sumatra Mandheling Green Coffee Beans"
                className="max-h-full max-w-[90%] object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500 z-10"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between font-mono text-[10px] text-white/90 z-20">
                <span className="text-tertiary font-bold">SCREEN 16 - 18</span>
                <span className="text-[#A1A1AA]">60KG JUTE BAG</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Chips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">Kadar Air</span>
            <div className="font-mono text-[22px] font-bold text-on-surface">11.5%</div>
            <span className="font-mono text-[11px] text-tertiary">Optimal &lt; 12.0%</span>
          </div>
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">Defect Rate</span>
            <div className="font-mono text-[22px] font-bold text-primary">&lt; 3%</div>
            <span className="font-mono text-[11px] text-outline">Secondary Defect Max 5</span>
          </div>
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">Ukuran Screen</span>
            <div className="font-mono text-[22px] font-bold text-on-surface">16 – 18</div>
            <span className="font-mono text-[11px] text-tertiary">Large Screen Size</span>
          </div>
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">Kemasan Karung</span>
            <div className="font-mono text-[22px] font-bold text-on-surface">60 KG</div>
            <span className="font-mono text-[11px] text-outline">Jute Bag + GrainPro Liner</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 pt-2">
          <a
            href="https://wa.me/628113000000?text=Halo%20NusantaraOrigin,%20saya%20tertarik%20dengan%20Sumatra%20Mandheling%20Specialty%20Green%20Coffee%20Beans."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-headline text-[12px] font-bold uppercase tracking-wider hover:bg-[#D94E13] transition-colors"
          >
            <span>Minta Penawaran Kopi FCL / LCL via WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
