'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { CheckCircle2, AlertTriangle, MoveHorizontal, Info } from 'lucide-react';

export default function DualSplitScreenComparison() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
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
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="flex flex-col gap-4 bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div>
          <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-1">
            KOMPARASI RESIDU KALORIFIK
          </span>
          <h2 className="font-headline text-[22px] sm:text-[28px] font-bold text-on-surface">
            Pembuktian Visual Kualitas Abu & Pembakaran
          </h2>
          <p className="font-body text-[14px] text-outline mt-1 max-w-2xl">
            Bandingkan residu abu batok kelapa murni kami dengan arang oplosan pasaran yang merusak rasa shisha lounge dan meninggalkan residu kotor bercampur batu bara.
          </p>
        </div>
        <div className="font-mono text-[12px] text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/30 flex items-center gap-2 self-start md:self-auto">
          <MoveHorizontal className="w-4 h-4 text-primary" />
          <span>Geser slider untuk melihat perbedaan</span>
        </div>
      </div>

      {/* Interactive Drag Stage */}
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
        className="relative w-full h-[440px] sm:h-[480px] rounded-xl overflow-hidden shadow-2xl select-none cursor-ew-resize bg-surface-container-lowest border border-outline-variant/30"
      >
        {/* Layer 1: Left Pane (NusantaraOrigin 100% Batok Murni) */}
        <div className="absolute inset-0 w-full h-full bg-[#1A130F]">
          <div className="relative w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=1200&auto=format&fit=crop"
              alt="100% Coconut Shell Charcoal Pure Ash"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1160px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A]/95 via-[#120D0A]/40 to-transparent"></div>

            {/* Top Left Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded bg-tertiary-container/90 backdrop-blur-md text-on-tertiary-container font-headline text-[11px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-tertiary" />
              <span>NUSANTARAORIGIN 100% BATOK MURNI</span>
            </div>

            {/* Bottom Info HUD */}
            <div className="absolute bottom-4 left-4 max-w-sm z-10 pointer-events-none p-3 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg border border-outline-variant/30">
              <div className="font-mono text-[11px] text-tertiary font-bold uppercase tracking-wider mb-1">
                KADAR ABU: 2.05% • ABU PUTIH ALAMI (SNOW WHITE)
              </div>
              <p className="font-mono text-[12px] text-on-surface leading-snug">
                TIDAK BERBAU • ZERO SPARK • SISA ABU PADAT TIDAK RONTOK MENEMBUS FOIL
              </p>
            </div>
          </div>
        </div>

        {/* Layer 2: Right Pane (Arang Oplosan Pasaran) clipped */}
        <div
          className="absolute inset-0 top-0 left-0 bottom-0 overflow-hidden select-none"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current?.clientWidth || '100%', minWidth: '100%' }}>
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
              alt="Low Grade Wood/Coal Adulterated Charcoal"
              fill
              className="object-cover filter grayscale contrast-125"
              sizes="(max-width: 1200px) 100vw, 1160px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A]/95 via-[#120D0A]/50 to-transparent"></div>

            {/* Top Overlay Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded bg-error-container/90 backdrop-blur-md text-on-error-container font-headline text-[11px] font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-error" />
              <span>ARANG OPLOSAN PASARAN (WOOD / COAL)</span>
            </div>

            {/* Bottom HUD */}
            <div className="absolute bottom-4 left-4 max-w-sm z-10 pointer-events-none p-3 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg border border-error/30">
              <div className="font-mono text-[11px] text-error font-bold uppercase tracking-wider mb-1">
                ARANG PASARAN: ABU &gt; 4.5% • ABU GELAP BERAT
              </div>
              <p className="font-mono text-[12px] text-on-surface leading-snug">
                BAU ASAP MENYENGAT • MERCIK API • MERUSAK RASA TEMBAKAU SHISHA
              </p>
            </div>
          </div>
        </div>

        {/* Center Draggable Handle Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-20 flex items-center justify-center -translate-x-1/2 shadow-[0_0_14px_rgba(255,138,82,0.8)]"
          style={{ left: `${sliderPos}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={onMouseDown}
        >
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-xl border-2 border-primary">
            <MoveHorizontal className="w-5 h-5 text-on-primary-container" />
          </div>
        </div>
      </div>

      {/* QC Callout */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container border border-outline-variant/30 font-body text-[13px] text-on-surface-variant">
        <Info className="w-5 h-5 text-primary shrink-0" />
        <span>
          <strong className="text-on-surface">Catatan QC Laboratorium:</strong> Abu putih tipis membuktikan kemurnian 100% tempurung kelapa tua tanpa tanah, pasir silika, atau pengisi limbah kayu gergajian yang beracun saat dihisap di ruang shisha tertutup.
        </span>
      </div>
    </section>
  );
}
