'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Flame, Scale, Timer, Ship, Download, ArrowRight, Award } from 'lucide-react';

interface MetricProps {
  label: string;
  value: string;
  subtext: string;
  targetNumber?: number;
  suffix?: string;
  isHighlight?: boolean;
}

function AnimatedMetric({ label, value, subtext, targetNumber, suffix = '', isHighlight = false }: MetricProps) {
  const [displayNum, setDisplayNum] = useState(0);

  useEffect(() => {
    if (!targetNumber) return;
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = targetNumber / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setDisplayNum(targetNumber);
        clearInterval(timer);
      } else {
        setDisplayNum(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetNumber]);

  return (
    <div className="flex flex-col p-4 bg-surface-container rounded-xl border border-outline-variant/30 shadow-md">
      <div className="flex items-center justify-between text-outline mb-1">
        <span className="font-mono text-[11px] uppercase tracking-wider">{label}</span>
      </div>
      <div className={`font-mono text-[26px] font-bold ${isHighlight ? 'text-primary' : 'text-on-surface'}`}>
        {targetNumber ? `${displayNum.toLocaleString()}${suffix}` : value}
      </div>
      <span className="font-body text-[12px] text-tertiary font-medium mt-0.5">{subtext}</span>
    </div>
  );
}

export default function HeroTelemetryHud() {
  return (
    <section className="flex flex-col gap-6 bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 shadow-xl relative overflow-hidden">
      {/* Glow flare */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Monospace breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-outline flex-wrap">
        <Link href="/products" className="hover:text-primary transition-colors">
          KOMODITAS EKSPOR
        </Link>
        <span>/</span>
        <span className="hover:text-primary transition-colors">BRIKET BATOK KELAPA</span>
        <span>/</span>
        <span className="text-primary font-semibold">100% GRADE PLATINUM SHISHA</span>
      </nav>

      {/* Headline & Visual Stage Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <h1 className="font-headline text-[32px] sm:text-[40px] lg:text-[44px] leading-tight text-on-surface tracking-tight font-extrabold">
            100% Briket Arang Batok Kelapa Murni{' '}
            <span className="font-editorial italic font-normal text-secondary block sm:inline">
              (Export Grade Shisha Platinum)
            </span>
          </h1>
          <p className="font-body text-[15px] sm:text-[16px] text-on-surface-variant max-w-2xl leading-relaxed">
            Briket arang batok kelapa tua murni kualitas ekspor standar shisha lounge internasional di Dubai, Berlin, dan Los Angeles. Tanpa campuran serbuk kayu, tanpa zat kimia pengoksidasi, dan pembakaran konsisten hingga 2.5 jam.
          </p>

          {/* Compliance Badges Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant/30 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span>
                HS CODE: <strong className="text-primary font-bold">4402.90.10</strong>
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tertiary-container/30 border border-tertiary-container/50 text-tertiary-fixed font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4 text-tertiary" />
              <span>IMO NON-DG SPECIAL PROVISION 925 (SHTC PASSED)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant/30 font-mono text-[11px]">
              <Award className="w-4 h-4 text-secondary" />
              <span>SGS LAB CERTIFIED #SH-2026-COA</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container/20 border border-primary-container/40 text-primary-fixed font-mono text-[11px]">
              <Flame className="w-4 h-4 text-primary" />
              <span>ZERO WOOD COAL GUARANTEE</span>
            </div>
          </div>
        </div>

        {/* Right Product Photo Showcase (4 Cols) */}
        <div className="lg:col-span-4 relative">
          <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center p-4 overflow-hidden shadow-2xl group">
            {/* Glowing Ember Backlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/25 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            
            <img
              src="/img/shisha-charcoal-cutout.png"
              alt="100% Batok Kelapa Charcoal Briquettes Cutout"
              className="max-h-full max-w-[90%] object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500 z-10"
            />

            <div className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between font-mono text-[10px] text-white/90 z-20">
              <span className="text-primary font-bold">CUBE C25 (25MM)</span>
              <span className="text-[#A1A1AA]">72 PCS / KG</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quick Spec Metric Chips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <AnimatedMetric
          label="Kadar Abu Total"
          value="2.05%"
          subtext="Abu Putih Alami (Snow White)"
          isHighlight={false}
        />
        <AnimatedMetric
          label="Gross Calorific"
          value="7,580"
          targetNumber={7580}
          suffix=" kcal/kg"
          subtext="Panas Stabil & Tinggi"
          isHighlight={true}
        />
        <AnimatedMetric
          label="Durasi Pembakaran"
          value="2.5 Jam"
          subtext="150 Menit Non-Stop Panas"
          isHighlight={false}
        />
        <AnimatedMetric
          label="Minimum Order (MOQ)"
          value="1x 20ft FCL"
          subtext="18 Metric Tonnes (1,800 Box)"
          isHighlight={false}
        />
      </div>

      {/* Action Row */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-outline-variant/20">
        <Link
          href="#lab-specs"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface hover:text-primary transition-colors font-headline text-[13px] uppercase tracking-wider font-semibold"
        >
          <Download className="w-4 h-4 text-primary" />
          <span>Unduh TDS & COA Laboratorium (.PDF)</span>
        </Link>
        <Link
          href="/container-planner"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-[#D94E13] transition-colors font-headline text-[13px] uppercase tracking-wider font-bold shadow-[0_0_16px_rgba(255,138,82,0.35)]"
        >
          <span>Kalkulasi Kontainer & Buka Harga FOB</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <span className="font-mono text-[11px] text-outline ml-auto">
          PORT OF DISPATCH: FOB SURABAYA (TANJUNG PERAK)
        </span>
      </div>
    </section>
  );
}
