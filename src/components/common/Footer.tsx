import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Anchor, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#120D0A] border-t border-outline-variant/30 text-on-surface-variant pt-16 pb-12">
      <div className="max-w-[1160px] mx-auto px-4 lg:px-0 flex flex-col gap-12">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Credentials */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="font-headline font-extrabold text-[18px] text-on-surface uppercase tracking-tight">
                Nusantara<span className="text-primary">Origin</span>
              </span>
            </div>
            <p className="font-body text-[13px] text-outline leading-relaxed">
              Eksportir berlisensi komoditas briket arang batok kelapa 100%, kopi specialty, dan rempah nusantara. Menjamin kepatuhan standar maritim IMO Non-DG Special Provision 925 dan audit laboratorium SGS.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-tertiary">
              <ShieldCheck className="w-4 h-4 text-tertiary" />
              <span>NIB: 9120301928371 • KAN ACCREDITED</span>
            </div>
          </div>

          {/* Col 2: Hub & Fasilitas Pabrik */}
          <div className="flex flex-col gap-3 font-body text-[13px]">
            <span className="font-headline font-bold text-[14px] text-on-surface uppercase tracking-wider">
              Pabrik & Terminal Muat
            </span>
            <div className="flex items-start gap-2 text-outline">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Kawasan Industri Gresik, Jawa Timur (25 KM dari Terminal Tanjung Perak SUB)</span>
            </div>
            <div className="flex items-start gap-2 text-outline">
              <Anchor className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>Gateway Ekspor: Tanjung Perak (Surabaya) & Tanjung Priok (Jakarta)</span>
            </div>
            <span className="font-mono text-[11px] text-outline/80 mt-1">
              GEO-COORDINATES: 7°09&apos;42.1&quot;S 112°38&apos;15.4&quot;E
            </span>
          </div>

          {/* Col 3: Navigasi Cepat & Standar */}
          <div className="flex flex-col gap-2 font-body text-[13px]">
            <span className="font-headline font-bold text-[14px] text-on-surface uppercase tracking-wider mb-1">
              Standar & Dokumen
            </span>
            <Link href="/products/100-briket-arang-batok-kelapa" className="hover:text-primary transition-colors">
              Briket Batok Kelapa Platinum (HS 4402.90)
            </Link>
            <Link href="/oem-studio" className="hover:text-primary transition-colors">
              2.5D OEM Box Dieline Studio
            </Link>
            <Link href="/container-planner" className="hover:text-primary transition-colors">
              Container Cargo & Freight Calculator
            </Link>
            <Link href="/factory-audit" className="hover:text-primary transition-colors">
              Metodologi Manufaktur 5 Tahap & COA
            </Link>
            <Link href="/admin/rfq" className="hover:text-primary transition-colors font-mono text-[11px] text-outline">
              Internal Deal Desk (Admin)
            </Link>
          </div>

          {/* Col 4: Kontak Direct Trade Desk */}
          <div className="flex flex-col gap-3 font-body text-[13px]">
            <span className="font-headline font-bold text-[14px] text-on-surface uppercase tracking-wider">
              Direct Export Desk
            </span>
            <div className="flex items-center gap-2 text-outline">
              <Mail className="w-4 h-4 text-primary" />
              <span>trade@nusantaraorigin.com</span>
            </div>
            <div className="flex items-center gap-2 text-outline">
              <Phone className="w-4 h-4 text-primary" />
              <span>+62 811-3000-0000 (WhatsApp Live)</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/30 text-[11px] font-mono mt-1">
              <div className="text-on-surface font-semibold">JAM OPERASIONAL PABRIK:</div>
              <div className="text-outline">Senin – Sabtu (24 Jam Continuous Kiln)</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-outline-variant/20 pt-6 flex flex-col sm:flex-row items-center justify-between text-[12px] font-mono text-outline gap-4">
          <div>
            © {new Date().getFullYear()} PT Nusantara Origin Industri. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <div className="flex items-center gap-4">
            <span>IMO NON-DG SP925 COMPLIANT</span>
            <span>•</span>
            <span>AFAS FUMIGATION STANDARD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
