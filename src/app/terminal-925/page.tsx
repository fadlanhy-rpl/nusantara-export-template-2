'use client';

import React from 'react';
import Link from 'next/link';
import {
  Layers,
  Ship,
  FileCheck2,
  Inbox,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Flame,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  KeyRound
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function TerminalOverviewPage() {
  const { officerName } = useAdminAuth();
  const { locale } = useLanguage();

  return (
    <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-6 sm:gap-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-surface-container to-surface-container-high border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
            <span className="font-mono text-[11px] text-tertiary uppercase tracking-wider font-bold">
              TERMINAL-925 • RESMI TERHUBUNG
            </span>
          </div>
          <h1 className="font-headline text-[24px] sm:text-[30px] font-extrabold text-on-surface tracking-tight">
            Pusat Kendali Ekspor & Operasional Deal Desk
          </h1>
          <p className="font-body text-[13px] text-outline max-w-[680px]">
            Selamat datang, <strong className="text-on-surface">{officerName}</strong>. Seluruh sistem pemrosesan Gresik Hub, verifikasi sertifikat SGS, alokasi kontainer FCL, dan negosiasi RFQ aktif disinkronkan secara real-time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 relative z-10">
          <Link
            href="/terminal-925/rfq"
            className="px-4 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-headline text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#D94E13] transition-all shadow-[0_0_16px_rgba(255,138,82,0.3)]"
          >
            <span>Buka RFQ Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-surface-container-highest hover:bg-surface-container border border-outline-variant/30 text-on-surface font-headline text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <ExternalLink className="w-4 h-4 text-primary" />
            <span>Lihat Portal Publik</span>
          </Link>
        </div>
      </div>

      {/* 4 Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-surface-container rounded-2xl border border-outline-variant/30 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-outline uppercase">Katalog Komoditas</span>
            <div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-[28px] font-bold text-on-surface my-2">3 Aktif</div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-tertiary">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Semua spesifikasi lab valid</span>
          </div>
        </div>

        <div className="p-5 bg-surface-container rounded-2xl border border-outline-variant/30 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-outline uppercase">Alokasi Kontainer</span>
            <div className="w-8 h-8 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center">
              <Ship className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-[28px] font-bold text-on-surface my-2">16 Kontainer</div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-secondary">
            <Activity className="w-3.5 h-3.5" />
            <span>420 MT siap dispatch</span>
          </div>
        </div>

        <div className="p-5 bg-surface-container rounded-2xl border border-outline-variant/30 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-outline uppercase">Status Sertifikasi SGS</span>
            <div className="w-8 h-8 rounded-lg bg-tertiary-container/20 text-tertiary flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-[28px] font-bold text-tertiary my-2">#SH-2026</div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-outline">
            <span>Non-DG SP925 Terverifikasi</span>
          </div>
        </div>

        <div className="p-5 bg-surface-container rounded-2xl border border-outline-variant/30 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-outline uppercase">Pipeline RFQ Valuasi</span>
            <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-[28px] font-bold text-primary my-2">$538,000</div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-on-surface-variant">
            <span>Rata-rata $1,280/MT FOB</span>
          </div>
        </div>
      </div>

      {/* 4 Feature Module Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Module 1: Catalog & Media */}
        <Link
          href="/terminal-925/catalog"
          className="p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 transition-all flex flex-col justify-between gap-4 group shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(196,68,15,0.4)]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-[16px] text-on-surface group-hover:text-primary transition-colors">
                  Kelola Katalog Komoditas & Media
                </h3>
                <span className="font-mono text-[11px] text-outline">
                  Foto produk, video showcase kiln, spesifikasi lab, harga FOB/MT
                </span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
          <p className="font-body text-[12.5px] text-on-surface-variant">
            Atur komoditas yang tampil di halaman depan (Briket Arang Kelapa, Kopi Hijau Arabika, Cengkeh), ubah parameter kadar abu, kalori, dan media video kiln.
          </p>
        </Link>

        {/* Module 2: Cargo & Freight Rates */}
        <Link
          href="/terminal-925/cargo"
          className="p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 transition-all flex flex-col justify-between gap-4 group shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:scale-105 transition-transform">
                <Ship className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-[16px] text-on-surface group-hover:text-secondary transition-colors">
                  Kelola Kargo, Kontainer & Tarif Ekspor
                </h3>
                <span className="font-mono text-[11px] text-outline">
                  Konfigurasi 20ft & 40ft HC, batas tonase, tarif freight pelabuhan dunia
                </span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all" />
          </div>
          <p className="font-body text-[12.5px] text-on-surface-variant">
            Atur parameter kalkulator kargo yang digunakan buyer: bobot maksimal, susunan karton briket, dan tarif freight Surabaya ke Jebel Ali, Hamburg, dan Qingdao.
          </p>
        </Link>

        {/* Module 3: Factory Audit & SGS */}
        <Link
          href="/terminal-925/inspections"
          className="p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 transition-all flex flex-col justify-between gap-4 group shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-[16px] text-on-surface group-hover:text-tertiary transition-colors">
                  Audit Pabrik, Laporan SGS & Dokumen Mutu
                </h3>
                <span className="font-mono text-[11px] text-outline">
                  Sertifikat SGS, COA Sucofindo, IMO SP925 Non-DG, AFAS Fumigasi
                </span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-outline group-hover:text-tertiary group-hover:translate-x-1 transition-all" />
          </div>
          <p className="font-body text-[12.5px] text-on-surface-variant">
            Kelola dokumen sertifikasi resmi yang dapat diunduh buyer, publikasikan batch rilis lab terbaru, dan pantau output kiln retor pabrik Gresik.
          </p>
        </Link>

        {/* Module 4: RFQ Pipeline */}
        <Link
          href="/terminal-925/rfq"
          className="p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 transition-all flex flex-col justify-between gap-4 group shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                <Inbox className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-[16px] text-on-surface group-hover:text-primary transition-colors">
                  RFQ Deal Desk & Follow-up Buyer
                </h3>
                <span className="font-mono text-[11px] text-outline">
                  Tindak lanjuti inquiry masuk dari GCC, Eropa, Asia Timur
                </span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
          <p className="font-body text-[12.5px] text-on-surface-variant">
            Tabel komprehensif inquiry buyer: filter status deal, kontak WhatsApp langsung terformat, riwayat sampel DHL, dan negosiasi harga FOB Tanjung Perak.
          </p>
        </Link>

        {/* Module 5: Security & Account Credentials */}
        <Link
          href="/terminal-925/settings"
          className="p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 transition-all flex flex-col justify-between gap-4 group shadow-md sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center group-hover:scale-105 transition-transform">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-[16px] text-on-surface group-hover:text-primary transition-colors">
                  Keamanan Akun & Kredensial Login
                </h3>
                <span className="font-mono text-[11px] text-outline">
                  Sesuaikan username/email dan perbarui password akses terminal
                </span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
          <p className="font-body text-[12.5px] text-on-surface-variant">
            Ubah username login, email pemulihan, dan password operator ekspor. Dilengkapi checklist syarat password aman, strength meter, dan generator password acak 1-klik.
          </p>
        </Link>
      </div>
    </div>
  );
}
