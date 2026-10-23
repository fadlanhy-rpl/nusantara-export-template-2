import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, ArrowRight, Award, Droplets, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Maluku Lalpari Cloves & Cassia Vera AA Quills — NusantaraOrigin',
  description: 'Whole spices from Maluku and Sumatra. Export grade Lalpari cloves with eugenol > 18% and Cassia Vera AA cinnamon quills.',
};

export default function WholeSpicesPage() {
  return (
    <div className="w-full max-w-[1160px] mx-auto px-4 lg:px-0 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 flex flex-col gap-6">
        <nav className="font-mono text-[11px] text-outline uppercase tracking-wider">
          <Link href="/products" className="hover:text-primary">KOMODITAS EKSPOR</Link> / REMPAH UTUH
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <h1 className="font-headline text-[32px] sm:text-[40px] font-extrabold text-on-surface">
              Maluku Lalpari Cloves & Cassia Vera AA Quills
            </h1>
            <p className="font-body text-[15px] text-outline max-w-2xl leading-relaxed">
              Cengkeh utuh Lalpari dari kepulauan Maluku dengan kadar minyak atsiri eugenol &gt; 18% dan kepala utuh &gt; 95%, bersanding dengan kayu manis Cassia Vera AA dari lereng Gunung Kerinci, Sumatra.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded bg-surface-container font-mono text-[11px]">
                HS CODE CENGKEH: <strong className="text-primary">0907.10.00</strong>
              </span>
              <span className="px-3 py-1 rounded bg-surface-container font-mono text-[11px]">
                HS CODE KAYU MANIS: <strong className="text-primary">0906.11.00</strong>
              </span>
              <span className="px-3 py-1 rounded bg-tertiary-container/30 text-tertiary font-mono text-[11px] font-bold">
                EUGENOL CONTENT: &gt; 18% GC-MS PASSED
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="relative w-full h-52 sm:h-60 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center p-4 overflow-hidden shadow-2xl group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-secondary/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <img
                src="/img/cloves-spices-cutout.png"
                alt="Maluku Lalpari Cloves and Cassia Vera Cinnamon"
                className="max-h-full max-w-[90%] object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500 z-10"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between font-mono text-[10px] text-white/90 z-20">
                <span className="text-secondary font-bold">LALPARI CLOVES</span>
                <span className="text-[#A1A1AA]">STEAM CLEANED</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Chips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">Minyak Atsiri (Eugenol)</span>
            <div className="font-mono text-[22px] font-bold text-primary">&gt; 18.2%</div>
            <span className="font-mono text-[11px] text-tertiary">Aroma Kuat Alami</span>
          </div>
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">Kepala Cengkeh Utuh</span>
            <div className="font-mono text-[22px] font-bold text-on-surface">&gt; 95%</div>
            <span className="font-mono text-[11px] text-outline">Minimal Headless</span>
          </div>
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">Kadar Air Maksimal</span>
            <div className="font-mono text-[22px] font-bold text-on-surface">&lt; 12.0%</div>
            <span className="font-mono text-[11px] text-tertiary">Bebas Jamur & Mould</span>
          </div>
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">Kemasan Master</span>
            <div className="font-mono text-[22px] font-bold text-on-surface">25 KG / 50 KG</div>
            <span className="font-mono text-[11px] text-outline">PP Woven + Poly Liner</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 pt-2">
          <a
            href="https://wa.me/628113000000?text=Halo%20NusantaraOrigin,%20saya%20tertarik%20dengan%20Cengkeh%20Maluku%20Lalpari%20dan%20Cassia%20Vera%20AA."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-headline text-[12px] font-bold uppercase tracking-wider hover:bg-[#D94E13] transition-colors"
          >
            <span>Minta Penawaran Rempah Ekspor via WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
