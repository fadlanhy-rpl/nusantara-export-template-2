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
      <div className="bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 flex flex-col gap-4">
        <nav className="font-mono text-[11px] text-outline uppercase tracking-wider">
          <Link href="/products" className="hover:text-primary">KOMODITAS EKSPOR</Link> / REMPAH UTUH
        </nav>
        <div className="flex flex-col gap-2">
          <h1 className="font-headline text-[32px] sm:text-[40px] font-extrabold text-on-surface">
            Maluku Lalpari Cloves & Cassia Vera AA Quills
          </h1>
          <p className="font-body text-[15px] text-outline max-w-2xl">
            Cengkeh utuh Lalpari dari kepulauan Maluku dengan kadar minyak atsiri eugenol &gt; 18% dan kepala utuh &gt; 95%, bersanding dengan kayu manis Cassia Vera AA dari lereng Gunung Kerinci, Sumatra.
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-3 py-1 rounded bg-surface-container font-mono text-[11px]">
            HS CODE CENGKEH: <strong className="text-primary">0907.10.00</strong>
          </span>
          <span className="px-3 py-1 rounded bg-surface-container font-mono text-[11px]">
            HS CODE KAYU MANIS: <strong className="text-primary">0906.11.00</strong>
          </span>
          <span className="px-3 py-1 rounded bg-tertiary-container/30 text-tertiary font-mono text-[11px]">
            EUGENOL CONTENT: &gt; 18% GC-MS PASSED
          </span>
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
