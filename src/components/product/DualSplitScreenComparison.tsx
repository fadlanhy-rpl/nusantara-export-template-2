'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { CheckCircle2, AlertTriangle, MoveHorizontal, Sparkles, Flame, ShieldAlert, Check } from 'lucide-react';

export default function DualSplitScreenComparison() {
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  return (
    <section className="flex flex-col gap-6 bg-surface-container-low p-6 lg:p-8 rounded-2xl border border-outline-variant/30 shadow-xl font-poppins">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-1">
            KOMPARASI RESIDU KALORIFIK
          </span>
          <h2 className="font-headline text-[24px] sm:text-[30px] font-bold text-on-surface">
            Pembuktian Visual Kualitas Abu & Pembakaran
          </h2>
          <p className="font-body text-[14px] text-outline mt-1 max-w-2xl leading-relaxed">
            Bandingkan langsung residu pembakaran briket batok murni kami dengan arang oplosan pasaran. Abu putih bersih menjamin cita rasa shisha murni tanpa kontaminasi sulfur atau batu bara.
          </p>
        </div>
        <div className="font-mono text-[12px] text-on-surface-variant bg-surface-container px-3.5 py-1.5 rounded-lg border border-outline-variant/30 flex items-center gap-2 self-start md:self-auto shrink-0">
          <MoveHorizontal className="w-4 h-4 text-primary animate-pulse" />
          <span>Tarik slider ke kiri / kanan</span>
        </div>
      </div>

      {/* Interactive Drag Stage (Full width 0% - 100%) */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onMouseDown}
        onTouchMove={onTouchMove}
        onTouchEnd={onMouseUp}
        className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize bg-surface-container-lowest border border-outline-variant/30"
      >
        {/* RIGHT LAYER (Underneath): 100% Batok Murni */}
        <div className="absolute inset-0 w-full h-full bg-[#1A130F]">
          <div className="relative w-full h-full">
            <Image
              src="/img/pure-white-ash-macro.jpg"
              alt="100% Coconut Shell Charcoal Pure White Ash"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1160px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A]/80 via-transparent to-[#120D0A]/30"></div>

            {/* Pinned Tag: Pure Side (Right aligned) */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-tertiary-container/95 backdrop-blur-md text-on-tertiary-container text-[12px] font-bold tracking-wide shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-tertiary" />
              <span>100% BATOK KELAPA MURNI</span>
            </div>
          </div>
        </div>

        {/* LEFT LAYER (Clipped): Arang Oplosan Pasaran */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden select-none"
          style={{ width: `${sliderPos}%` }}
        >
          <div
            className="relative h-full"
            style={{ width: containerRef.current?.clientWidth || '1000px', minWidth: '100%' }}
          >
            <Image
              src="/img/dirty-coal-ash-macro.jpg"
              alt="Low Grade Adulterated Coal Charcoal with dirty ash and sparks"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1160px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A]/80 via-transparent to-[#120D0A]/30"></div>

            {/* Pinned Tag: Dirty Side (Left aligned) */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-error-container/95 backdrop-blur-md text-on-error-container text-[12px] font-bold tracking-wide shadow-lg">
              <AlertTriangle className="w-4 h-4 text-error" />
              <span>ARANG OPLOSAN (WOOD / COAL)</span>
            </div>
          </div>
        </div>

        {/* Center Draggable Divider Line & Knob */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-20 flex items-center justify-center -translate-x-1/2 shadow-[0_0_16px_rgba(255,138,82,0.9)]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-2xl border-2 border-primary hover:scale-105 transition-transform">
            <MoveHorizontal className="w-5 h-5 text-on-primary-container" />
          </div>
        </div>
      </div>

      {/* DUAL COMPARISON CARDS BELOW (NO TEXT IS EVER CLIPPED) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Card A: Arang Oplosan */}
        <div className="p-5 rounded-xl bg-surface-container border border-error/30 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-error font-bold text-[14px]">
            <AlertTriangle className="w-4 h-4" />
            <span>Risiko Arang Oplosan (Batu Bara / Serbuk Kayu)</span>
          </div>
          <ul className="flex flex-col gap-2 text-[13px] text-outline">
            <li className="flex items-start gap-2">
              <span className="text-error font-bold">•</span>
              <span><strong>Kadar Abu Tinggi (&gt; 4.0%):</strong> Residu abu berwarna cokelat tua kotor dan berat, cepat menumpuk di atas tungku shisha.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-error font-bold">•</span>
              <span><strong>Aroma Menyengat:</strong> Mengandung jelaga kayu atau sulfur batu bara yang merusak cita rasa tembakau premium.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-error font-bold">•</span>
              <span><strong>Percikan Api (*Sparks*):</strong> Rawan meletup dan retak saat ditiup, berisiko merusak karpet lounge atau melukai tamu.</span>
            </li>
          </ul>
        </div>

        {/* Card B: 100% Batok Murni */}
        <div className="p-5 rounded-xl bg-surface-container border border-tertiary/40 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-tertiary font-bold text-[14px]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Standar Mutu NusantaraOrigin (100% Batok Murni)</span>
          </div>
          <ul className="flex flex-col gap-2 text-[13px] text-on-surface-variant">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
              <span><strong>Abu Putih Alami (&lt; 2.2%):</strong> Residu abu sangat tipis (*snow white*), padat dan tidak mudah rontok menembus alumunium foil.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
              <span><strong>100% Bebas Bau & Asap:</strong> Pirolisis drum tertutup menghasilkan karbon murni tanpa asap pedih di mata atau bau sangit.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
              <span><strong>Bara Utuh & Tahan Banting:</strong> Uji jatuh beton 1.5 meter 3x tetap utuh tanpa retak (*Drop Test Passed*), panas stabil 2.5 jam.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
