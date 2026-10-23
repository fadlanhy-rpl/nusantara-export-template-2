'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, Maximize2, ShieldCheck, CheckCircle2, Factory, Flame, Clock, Award } from 'lucide-react';

interface MediaReel {
  id: string;
  title: string;
  tag: string;
  duration: string;
  poster: string;
  badge: string;
  telemetry: {
    temp: string;
    flow: string;
    qc: string;
  };
  description: string;
}

const REELS: MediaReel[] = [
  {
    id: 'pyrolysis',
    title: 'Fasilitas Pirolisis Anaerobik & Retort Drum Tertutup',
    tag: 'STAGE 02 • CARBONIZATION',
    duration: '02:45 / 4K UHD 60FPS',
    poster: '/img/factory-pyrolysis-retort.jpg',
    badge: '100% ANAEROBIC DRUM KILN',
    telemetry: {
      temp: '482°C STABIL',
      flow: 'ZERO SYNTHETIC TAR',
      qc: 'FIXED CARBON > 80%',
    },
    description: 'Proses karbonisasi tempurung kelapa tua kering dalam drum pirolisis tertutup tanpa kontak oksigen langsung untuk mencegah pembentukan senyawa tar beracun dan abu kotor.',
  },
  {
    id: 'drying',
    title: 'Ruang Oven Kiln 72 Jam Terkontrol pada Suhu Stabil 70°C',
    tag: 'STAGE 05 • KILN CURING',
    duration: '03:10 / 4K UHD 60FPS',
    poster: '/img/assets/drying-rack.webp',
    badge: 'INDOOR KILN 72 HOURS',
    telemetry: {
      temp: '70.2°C UNIFORM',
      flow: '4.2% CORE MOISTURE',
      qc: 'ZERO WEATHER RISK',
    },
    description: 'Pengeringan briket tidak mengandalkan sinar matahari terbuka yang berisiko jamur atau kelembapan fluktuatif, melainkan oven pengering industri dengan sirkulasi udara panas 72 jam.',
  },
  {
    id: 'lab-test',
    title: 'Uji Spektrometri ASTM D3174 & Verifikasi Abu Putih Alami',
    tag: 'QUALITY AUDIT • LAB PROOF',
    duration: '01:50 / 4K UHD 60FPS',
    poster: '/img/pure-white-ash-macro.jpg',
    badge: 'SGS LAB AUDITED',
    telemetry: {
      temp: '815°C INCINERATION',
      flow: 'ASH < 2.2% WHITE',
      qc: 'SP 925 IMO NON-DG',
    },
    description: 'Sampel acak diambil per 500 master box untuk diinspeksi kadar abu, zat terbang, dan sifat pemanasan mandiri (Self-Heating Test UN 3313 Passed).',
  },
  {
    id: 'finished-goods',
    title: 'Inspeksi Geometri Presisi & Stuffing Kontainer Ekspor',
    tag: 'LOGISTICS • TANJUNG PERAK',
    duration: '02:15 / 4K UHD 60FPS',
    poster: '/img/shisha-charcoal-cutout.png',
    badge: 'CONTAINER STUFFING BAY',
    telemetry: {
      temp: 'AMBIENT 28°C',
      flow: '26.0 MT / 40FT HC',
      qc: 'ISO 17712 SEALED',
    },
    description: 'Proses pemuatan 2.600 master box 10kg ke dalam kontainer 40ft High Cube di pabrik Gresik berjarak 25 menit dari Terminal Petikemas Tanjung Perak Surabaya.',
  },
];

export default function FactoryMediaReel() {
  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const activeReel = REELS[activeReelIdx];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-0 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-1">
            DOKUMENTASI OPERASIONAL & BUKTI FISIK PABRIK
          </span>
          <h2 className="font-headline text-[24px] sm:text-[32px] font-bold text-on-surface">
            Tur Fasilitas Manufaktur & Video Rekaman Mutu
          </h2>
          <p className="font-body text-[14px] text-outline max-w-2xl mt-1">
            Pembeli internasional dapat memverifikasi langsung teknologi kiln, uji jatuh briket, pengayakan debu mesh 60, dan pemuatan kontainer berstempel resmi surveyor.
          </p>
        </div>

        {/* Global Compliance Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 font-mono text-[11px] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-tertiary" />
            <span className="text-on-surface">IMO SP925 PASSED</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 font-mono text-[11px] flex items-center gap-1.5">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-on-surface">SGS ACCREDITED</span>
          </div>
        </div>
      </div>

      {/* Main Reel Cinema & Gallery Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Video Player Mockup Stage (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/40 shadow-2xl group">
            {/* Background Image / Poster */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={activeReel.poster}
                alt={activeReel.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-105 filter brightness-105' : 'group-hover:scale-102 filter brightness-90'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 pointer-events-none" />
            </div>

            {/* Top Video HUD Info */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/20 font-mono text-[11px] text-white font-bold">
                  {activeReel.tag}
                </span>
                <span className="px-2 py-1 rounded bg-primary-container text-on-primary-container font-mono text-[10px] font-bold">
                  {activeReel.badge}
                </span>
              </div>
              <div className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/20 font-mono text-[11px] text-white/90">
                {activeReel.duration}
              </div>
            </div>

            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/30 shadow-[0_0_30px_rgba(255,138,82,0.4)] ${
                  isPlaying
                    ? 'bg-black/60 text-white hover:bg-black/80'
                    : 'bg-primary-container text-on-primary-container hover:scale-110 hover:bg-[#D94E13]'
                }`}
                aria-label={isPlaying ? 'Pause video' : 'Play video reel'}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                )}
              </button>
            </div>

            {/* Bottom Telemetry HUD Bar */}
            <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 z-10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-bold text-white text-[15px] sm:text-[17px] line-clamp-1">
                  {activeReel.title}
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-label="Toggle audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3 Telemetry Data Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 font-mono text-[11px]">
                <div className="flex flex-col">
                  <span className="text-[#A1A1AA] text-[9px] uppercase">TEMPERATUR</span>
                  <span className="text-primary font-bold">{activeReel.telemetry.temp}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#A1A1AA] text-[9px] uppercase">KUALITAS BINDER</span>
                  <span className="text-white font-medium">{activeReel.telemetry.flow}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#A1A1AA] text-[9px] uppercase">STATUS MARITIM</span>
                  <span className="text-tertiary font-bold">{activeReel.telemetry.qc}</span>
                </div>
              </div>

              {/* Live Timeline Bar */}
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: isPlaying ? '65%' : '18%' }}
                />
              </div>
            </div>
          </div>

          <p className="font-body text-[13px] text-outline px-1 leading-relaxed">
            {activeReel.description}
          </p>
        </div>

        {/* Right: Reel Playlist & Photo Verification Thumbnails (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="font-mono text-[11px] text-outline uppercase tracking-wider px-1">
            PILIH REKAMAN FASILITAS PABRIK:
          </div>

          <div className="flex flex-col gap-2.5">
            {REELS.map((r, idx) => {
              const isSelected = activeReelIdx === idx;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setActiveReelIdx(idx);
                    setIsPlaying(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-surface-container border-primary/60 shadow-lg'
                      : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/60 hover:bg-surface-container'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-black border border-white/10">
                    <img
                      src={r.poster}
                      alt={r.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-mono text-[9px] text-primary font-bold uppercase truncate">
                      {r.tag}
                    </span>
                    <span className="font-headline font-bold text-[13px] text-on-surface line-clamp-1">
                      {r.title}
                    </span>
                    <span className="font-mono text-[10px] text-outline mt-0.5">
                      {r.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Verification Callout Box */}
          <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/30 mt-2 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-mono text-[11px] font-bold">
              <Factory className="w-4 h-4" />
              <span>KUNJUNGAN PABRIK & AUDIT FISIK</span>
            </div>
            <p className="font-body text-[12px] text-outline leading-relaxed">
              Kami menyambut inspektur buyer independen (SGS, Cotecna, BV, atau tim Anda) untuk audit kiln, penimbangan kardus, dan pengambilan sampel acak sebelum stuffing kontainer di Gresik, Jawa Timur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
