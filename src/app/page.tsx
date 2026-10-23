import React from 'react';
import Link from 'next/link';
import Hero3DScene from '@/components/home/Hero3DScene';
import FactoryMediaReel from '@/components/home/FactoryMediaReel';
import CommodityShowcase3D from '@/components/home/CommodityShowcase3D';
import { ShieldCheck, ArrowRight, Flame, Scale, Package, Factory, Award, ExternalLink, Calculator } from 'lucide-react';
import { ALL_COMMODITIES } from '@/lib/commodityData';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col gap-16 py-8">
      {/* 1. HERO SECTION WITH 3D WEBGL BRIQUETTE */}
      <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            {/* Telemetry Badge Pill */}
            <div className="bg-surface-container border border-primary-container/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-mono text-[11px] text-primary font-medium tracking-wide">
                HS CODE: 4402.90.10 • 100% BATOK KELAPA • ZERO WOOD COAL
              </span>
            </div>

            <h1 className="font-headline text-[36px] sm:text-[46px] lg:text-[50px] leading-tight font-extrabold text-on-surface tracking-tight">
              Briket Arang Batok Kelapa Indonesia,{' '}
              <span className="font-editorial italic font-normal text-secondary block sm:inline">
                Teruji Mutu
              </span>{' '}
              Laboratorium Dunia.
            </h1>

            <p className="font-body text-[15px] sm:text-[16px] text-on-surface-variant max-w-2xl leading-relaxed">
              Memasok 350+ Metrik Ton per bulan untuk shisha lounge internasional di Dubai, Berlin, dan Los Angeles. Garansi kadar abu &lt; 2.2% putih alami, tanpa asap, tanpa bau kimia, dan durasi bara 2.5 jam konsisten.
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap gap-3 items-center pt-2 w-full sm:w-auto">
              <Link
                href="/products/100-briket-arang-batok-kelapa"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-primary-container text-on-primary-container font-headline text-[13px] font-bold uppercase tracking-wider hover:bg-[#D94E13] transition-all shadow-[0_4px_20px_rgba(196,68,15,0.4)] flex items-center justify-center gap-2"
              >
                <span>Verifikasi Mutu & Hasil Lab SGS →</span>
              </Link>
              <Link
                href="/container-planner"
                className="w-full sm:w-auto px-5 py-3.5 rounded-lg border border-outline-variant/40 bg-surface-container-high/60 hover:bg-surface-container text-on-surface font-headline text-[13px] transition-all flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-primary" />
                <span>Kalkulasi Kontainer & Harga FOB</span>
              </Link>
            </div>

            {/* Key Metric Strip */}
            <div className="w-full bg-surface-container/90 border border-outline-variant/30 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-md mt-4">
              <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-outline-variant/20 pb-3 sm:pb-0 sm:pr-4">
                <span className="font-mono text-[24px] font-bold text-on-surface">350 MT</span>
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider mt-0.5">
                  Output Kiln / Bulan
                </span>
              </div>
              <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-outline-variant/20 pb-3 sm:pb-0 sm:px-2">
                <span className="font-mono text-[24px] font-bold text-primary">&lt; 2.2%</span>
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider mt-0.5">
                  Kadar Abu Putih Alami
                </span>
              </div>
              <div className="flex flex-col sm:pl-2">
                <span className="font-mono text-[24px] font-bold text-tertiary">1.5m 3x Intact</span>
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider mt-0.5">
                  Uji Jatuh Bebas Beton
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero 3D Stage (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 p-3 shadow-2xl overflow-hidden">
              <div className="w-full h-[440px] rounded-xl overflow-hidden relative bg-surface-container-lowest flex items-center justify-center">
                <Hero3DScene />
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/30 flex items-center justify-between font-mono text-[11px] pointer-events-none">
                  <span className="text-on-surface">INTERACTIVE 3D BRIQUETTE</span>
                  <span className="text-primary font-bold">120-TON HYDRAULIC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE CORE CAPABILITIES (BENTO GRID) */}
      <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-0 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
            TIGA PILAR REKAYASA TEMPLATE 2 V2.0
          </span>
          <h2 className="font-headline text-[24px] sm:text-[32px] font-bold text-on-surface">
            Instrumen Verifikasi Mutu Transparan untuk Buyer Global
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 100% Batok Kelapa Murni */}
          <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-lg group">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-[18px] text-on-surface group-hover:text-primary transition-colors">
                Anatomi Mutu 100% Batok Kelapa
              </h3>
              <p className="font-body text-[13px] text-outline leading-relaxed">
                Uji komparasi abu putih salju vs abu oplosan pasaran, diagram CAD 6 geometri briket, dan matriks parameter uji ASTM D3174 per batch SGS pengapalan.
              </p>
            </div>
            <Link
              href="/products/100-briket-arang-batok-kelapa"
              className="mt-6 pt-3 border-t border-outline-variant/20 font-headline text-[12px] uppercase font-bold text-primary flex items-center gap-1 group-hover:underline"
            >
              <span>Buka Verifikasi Mutu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: 2.5D OEM Packaging Studio */}
          <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-lg group">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-[18px] text-on-surface group-hover:text-primary transition-colors">
                2.5D OEM Box Dieline Studio
              </h3>
              <p className="font-body text-[13px] text-outline leading-relaxed">
                Kustomisasi kardus inner 1kg/2kg dan master box 10kg/20kg (Kraft, Matte Black, Duplex White) dengan simulasi teks regulasi Arab GCC 2530 dan barcode EAN-13.
              </p>
            </div>
            <Link
              href="/oem-studio"
              className="mt-6 pt-3 border-t border-outline-variant/20 font-headline text-[12px] uppercase font-bold text-primary flex items-center gap-1 group-hover:underline"
            >
              <span>Konfigurasi Kemasan Brand</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Container Load Planner */}
          <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-lg group">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-[18px] text-on-surface group-hover:text-primary transition-colors">
                Kalkulator Kargo & Soft-Gated RFQ
              </h3>
              <p className="font-body text-[13px] text-outline leading-relaxed">
                Perhitungan matematis kubikasi CBM vs batas tonase jalan raya 20ft & 40ft HC (26.0 MT max), dengan formulir pembuka rincian harga FOB berstempel resmi.
              </p>
            </div>
            <Link
              href="/container-planner"
              className="mt-6 pt-3 border-t border-outline-variant/20 font-headline text-[12px] uppercase font-bold text-primary flex items-center gap-1 group-hover:underline"
            >
              <span>Hitung Muatan Kontainer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FACTORY VIDEO & OPERATIONAL MEDIA REEL */}
      <FactoryMediaReel />

      {/* 4. INTERACTIVE 3D COMMODITY SHOWCASE STAGE */}
      <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-0 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
            INSPEKSI 3D FISIK PRODUK REALISTIS
          </span>
          <h2 className="font-headline text-[24px] sm:text-[32px] font-bold text-on-surface">
            Etalase Visual 3D Komoditas Ekspor
          </h2>
          <p className="font-body text-[14px] text-outline max-w-2xl">
            Inspeksi visual interaktif 3D tilt untuk briket batok shisha & BBQ, biji kopi hijau Mandheling, serta rempah cengkeh & kayu manis Maluku.
          </p>
        </div>

        <CommodityShowcase3D />
      </section>

      {/* 5. MULTI-COMMODITY CATALOG OVERVIEW WITH REAL CUTOUTS */}
      <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-0 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div>
            <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
              PORTOFOLIO EKSPOR
            </span>
            <h2 className="font-headline text-[22px] sm:text-[28px] font-bold text-on-surface">
              Katalog Lengkap Komoditas Ekspor Indonesia
            </h2>
          </div>
          <Link
            href="/products"
            className="font-headline text-[12px] uppercase font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>Semua Produk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALL_COMMODITIES.map((c) => (
            <div
              key={c.slug}
              className="p-5 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 transition-all shadow-lg group overflow-hidden"
            >
              <div className="flex flex-col gap-3">
                {/* Product Thumbnail Header */}
                <div className="relative w-full h-44 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-center overflow-hidden p-3">
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[10px] text-primary font-bold">
                    HS: {c.hs_code}
                  </div>
                  <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-mono text-[10px] font-bold">
                    {c.badge}
                  </div>

                  <img
                    src={c.image}
                    alt={c.name}
                    className="max-h-full max-w-[85%] object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col gap-1 mt-1">
                  <span className="font-mono text-[11px] text-tertiary">{c.grade}</span>
                  <h4 className="font-headline font-bold text-[16px] text-on-surface group-hover:text-primary transition-colors">
                    {c.name}
                  </h4>
                  <p className="font-body text-[13px] text-outline line-clamp-2">
                    {c.desc}
                  </p>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 pt-1">
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

              <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-outline block">FOB PRICE</span>
                  <span className="font-mono text-[13px] font-bold text-on-surface">{c.fob}</span>
                </div>
                <Link
                  href={c.link}
                  className="font-headline text-[12px] uppercase font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Detail Mutu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
