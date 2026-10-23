import React from 'react';
import Link from 'next/link';
import { Package, Palette, ShieldCheck, ArrowRight, Stamp } from 'lucide-react';

export default function OemPreviewSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 shadow-xl">
      {/* Col 1: Inner Box OEM */}
      <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <h4 className="font-headline font-bold text-[16px] text-on-surface">
            OEM Custom Inner Box (1kg & 2kg)
          </h4>
          <p className="font-body text-[13px] text-outline leading-relaxed">
            Cetak inner box brand Anda sendiri dengan finishing Matte Doff, Glossy UV, Hot Stamping Gold Foil, dan plastik kedap udara (*vacuum barrier*).
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between font-mono text-[11px]">
          <span className="text-tertiary">STANDAR ESMA & GCC 2530</span>
          <Link href="/oem-studio" className="text-primary hover:underline flex items-center gap-1">
            <span>Buka Studio</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Col 2: Master Carton 10kg & 20kg */}
      <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <h4 className="font-headline font-bold text-[16px] text-on-surface">
            Master Carton 10kg & 20kg (5-Ply Kraft)
          </h4>
          <p className="font-body text-[13px] text-outline leading-relaxed">
            Kardus master 5-Ply tebal tahan tumpukan maritim hingga 10 tingkat tanpa deformasi sudut. Pilihan warna Kraft Natural, Matte Black, atau Bright White.
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between font-mono text-[11px]">
          <span className="text-primary">BURST TEST: &gt; 18 KGF/CM²</span>
          <Link href="/oem-studio" className="text-primary hover:underline flex items-center gap-1">
            <span>Simulasi CAD</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Col 3: Routine Supply Contract */}
      <div className="p-6 bg-gradient-to-br from-surface-container to-surface-container-high rounded-xl border border-primary-container/40 flex flex-col justify-between shadow-lg">
        <div className="flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0_0_12px_rgba(255,138,82,0.4)]">
            <Stamp className="w-5 h-5 text-on-primary-container" />
          </div>
          <h4 className="font-headline font-bold text-[16px] text-on-surface">
            Kontrak Pasokan Bulanan (FCL Routine)
          </h4>
          <p className="font-body text-[13px] text-outline leading-relaxed">
            Kunci kuota alokasi hingga 20–30 kontainer per bulan dengan proteksi harga stabil, hak inspeksi surveyor mandiri, dan prioritas muat di pelabuhan.
          </p>
        </div>
        <div className="mt-4 pt-3">
          <a
            href="https://wa.me/628113000000?text=Halo%20NusantaraOrigin,%20kami%20ingin%20berdiskusi%20tentang%20kontrak%20rutin%20FCL%20briket%20arang%20batok%20kelapa."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-2.5 px-4 rounded-lg bg-primary-container text-on-primary-container font-headline text-[12px] uppercase font-bold tracking-wider hover:bg-[#D94E13] transition-colors block shadow-md"
          >
            Hubungi Trade Desk (WhatsApp)
          </a>
        </div>
      </div>
    </section>
  );
}
