'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Palette, Upload, ShieldCheck, Check, Eye, Download, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import OemBox3DViewer from './OemBox3DViewer';

type MaterialType = 'kraft' | 'matte_black' | 'white_duplex';
type ViewMode = '3d' | 'flat' | 'pallet';
type PackFormat = '1kg' | '2kg' | '10kg_bulk' | '20kg_bulk';

export default function OemConfiguratorStudio() {
  const [packFormat, setPackFormat] = useState<PackFormat>('1kg');
  const [material, setMaterial] = useState<MaterialType>('matte_black');
  const [viewMode, setViewMode] = useState<ViewMode>('3d');

  // Customizer inputs
  const [brandName, setBrandName] = useState('AL-FAKHER CROWN PLATINUM');
  const [tagline, setTagline] = useState('100% PURE INDONESIAN COCONUT CHARCOAL');
  const [arabicTextEnabled, setArabicTextEnabled] = useState(true);
  const [barcodeEnabled, setBarcodeEnabled] = useState(true);
  const [certLogosEnabled, setCertLogosEnabled] = useState(true);

  // Finishing toggles
  const [matteUv, setMatteUv] = useState(true);
  const [goldFoil, setGoldFoil] = useState(true);
  const [spotUv, setSpotUv] = useState(false);

  // Material textures & styles
  const getBoxStyle = () => {
    switch (material) {
      case 'kraft':
        return {
          bg: '#8B5A2B',
          bgLight: '#A66E38',
          bgDark: '#6E451E',
          text: '#F5EBE1',
          accent: goldFoil ? '#F0D38D' : '#FFB59C',
          border: '#4A2F13',
          label: 'Eco Rustic Kraft Paperboard (275 gsm)',
        };
      case 'white_duplex':
        return {
          bg: '#F2EFEB',
          bgLight: '#FAF8F5',
          bgDark: '#DDD9D2',
          text: '#1C1917',
          accent: goldFoil ? '#B8860B' : '#C4440F',
          border: '#C4BEB5',
          label: 'Bright White Duplex Coated (300 gsm)',
        };
      case 'matte_black':
      default:
        return {
          bg: '#1C1A18',
          bgLight: '#2A2724',
          bgDark: '#121110',
          text: '#F5F2EB',
          accent: goldFoil ? '#FFD700' : '#FF8A52',
          border: '#38332E',
          label: 'Matte Anthracite Black (Luxury Shisha)',
        };
    }
  };

  const style = getBoxStyle();

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-0 py-8 flex flex-col gap-8 font-poppins">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <nav className="flex items-center gap-2 font-mono text-[11px] text-outline uppercase tracking-wider">
          <Link href="/products" className="hover:text-primary">KOMODITAS EKSPOR</Link>
          <span>/</span>
          <span>LAYANAN OEM & PRIVATE LABEL</span>
          <span>/</span>
          <span className="text-primary font-bold">STUDIO KONFIGURATOR KEMASAN</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-headline text-[30px] sm:text-[36px] font-extrabold text-on-surface tracking-tight">
              2.5D OEM Private Label Studio{' '}
              <span className="font-editorial italic font-normal text-secondary">
                & Kemasan Ekspor Kustom
              </span>
            </h1>
            <p className="font-body text-[14px] text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
              Kustomisasi kemasan brand ekspor Anda dengan spesifikasi dieline pabrik presisi tinggi. Pilih material kardus, laminasi foil emas, dan teks regulasi Timur Tengah (GCC) maupun Eropa.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-surface-container px-3.5 py-1.5 rounded-lg border border-outline-variant/30 text-tertiary font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span>DIELINE ENGINE v4.2 LIVE</span>
          </div>
        </div>
      </div>

      {/* 12-Column Split Configurator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-surface-container-low rounded-2xl border border-outline-variant/30 p-6 flex flex-col gap-6 shadow-xl">
          {/* Section 1: Format Kemasan */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <span className="font-headline text-[13px] font-bold text-on-surface flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container text-[11px] font-mono flex items-center justify-center font-bold">
                  1
                </span>
                Format Kemasan Ekspor
              </span>
              <span className="font-mono text-[11px] text-outline">B2B Standard</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => setPackFormat('1kg')}
                className={`p-3 rounded-xl text-left transition-all flex items-start gap-3 border ${
                  packFormat === '1kg'
                    ? 'border-primary-container bg-surface-container shadow-md'
                    : 'border-outline-variant/30 bg-surface-container-lowest/50 hover:bg-surface-container'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  packFormat === '1kg' ? 'border-primary-container' : 'border-outline-variant'
                }`}>
                  {packFormat === '1kg' && <div className="w-2 h-2 rounded-full bg-primary-container"></div>}
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-[13px] font-bold text-on-surface">
                    Kotak Dalam 1kg (10x1kg per Master Box)
                  </span>
                  <span className="font-mono text-[11px] text-outline">
                    Dimensi 100×100×100 mm • Duplex 250gsm
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPackFormat('2kg')}
                className={`p-3 rounded-xl text-left transition-all flex items-start gap-3 border ${
                  packFormat === '2kg'
                    ? 'border-primary-container bg-surface-container shadow-md'
                    : 'border-outline-variant/30 bg-surface-container-lowest/50 hover:bg-surface-container'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  packFormat === '2kg' ? 'border-primary-container' : 'border-outline-variant'
                }`}>
                  {packFormat === '2kg' && <div className="w-2 h-2 rounded-full bg-primary-container"></div>}
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-[13px] font-bold text-on-surface">
                    Kotak Dalam 2kg (5x2kg per Master Box)
                  </span>
                  <span className="font-mono text-[11px] text-outline">
                    Dimensi 200×100×100 mm • Duplex 300gsm
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPackFormat('10kg_bulk')}
                className={`p-3 rounded-xl text-left transition-all flex items-start gap-3 border ${
                  packFormat === '10kg_bulk'
                    ? 'border-primary-container bg-surface-container shadow-md'
                    : 'border-outline-variant/30 bg-surface-container-lowest/50 hover:bg-surface-container'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  packFormat === '10kg_bulk' ? 'border-primary-container' : 'border-outline-variant'
                }`}>
                  {packFormat === '10kg_bulk' && <div className="w-2 h-2 rounded-full bg-primary-container"></div>}
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-[13px] font-bold text-on-surface">
                    Master Carton 10kg (Bulk BBQ Packing)
                  </span>
                  <span className="font-mono text-[11px] text-outline">
                    Kardus tebal 5-Ply Corrugated K150
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Material & Substrat */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <span className="font-headline text-[13px] font-bold text-on-surface flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container text-[11px] font-mono flex items-center justify-center font-bold">
                  2
                </span>
                Substrat Kertas & Finishing
              </span>
              <span className="font-mono text-[11px] text-tertiary">ISO-12647-2</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMaterial('kraft')}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                  material === 'kraft'
                    ? 'border-2 border-primary-container bg-surface-container shadow'
                    : 'border-outline-variant/30 bg-surface-container hover:border-outline'
                }`}
              >
                <span className="w-full h-8 rounded-lg shadow-inner" style={{ backgroundColor: '#8B5A2B' }}></span>
                <span className="font-mono text-[11px] text-on-surface text-center leading-tight">
                  Kraft 275g<br />
                  <span className="text-outline text-[9px]">Eco Rustic</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMaterial('matte_black')}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                  material === 'matte_black'
                    ? 'border-2 border-primary-container bg-surface-container shadow'
                    : 'border-outline-variant/30 bg-surface-container hover:border-outline'
                }`}
              >
                <span className="w-full h-8 rounded-lg shadow-inner" style={{ backgroundColor: '#1C1A18' }}></span>
                <span className="font-mono text-[11px] text-primary text-center leading-tight font-semibold">
                  Matte Black<br />
                  <span className="text-secondary text-[9px]">Luxury Shisha</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMaterial('white_duplex')}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                  material === 'white_duplex'
                    ? 'border-2 border-primary-container bg-surface-container shadow'
                    : 'border-outline-variant/30 bg-surface-container hover:border-outline'
                }`}
              >
                <span className="w-full h-8 rounded-lg shadow-inner" style={{ backgroundColor: '#F2EFEB' }}></span>
                <span className="font-mono text-[11px] text-on-surface text-center leading-tight">
                  Bright White<br />
                  <span className="text-outline text-[9px]">Duplex 300g</span>
                </span>
              </button>
            </div>

            {/* Special Finishing Options */}
            <div className="flex flex-col gap-2 pt-1 text-[13px]">
              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
                <span className="flex items-center gap-2 text-on-surface">
                  <input
                    type="checkbox"
                    checked={matteUv}
                    onChange={(e) => setMatteUv(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary-container"
                  />
                  <span>Laminasi Doff / Matte UV (Waterproof)</span>
                </span>
                <span className="font-mono text-[11px] text-tertiary">STANDAR</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
                <span className="flex items-center gap-2 text-on-surface">
                  <input
                    type="checkbox"
                    checked={goldFoil}
                    onChange={(e) => setGoldFoil(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary-container"
                  />
                  <span>Hot-Stamping Foil Emas (Logo & Nama)</span>
                </span>
                <span className="font-mono text-[11px] text-secondary">+$0.03/pc</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
                <span className="flex items-center gap-2 text-on-surface">
                  <input
                    type="checkbox"
                    checked={spotUv}
                    onChange={(e) => setSpotUv(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary-container"
                  />
                  <span>Spot UV Glossy Ornamen</span>
                </span>
                <span className="font-mono text-[11px] text-outline">+$0.015/pc</span>
              </label>
            </div>
          </div>

          {/* Section 3: Brand Text & Regulatory Labels */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <span className="font-headline text-[13px] font-bold text-on-surface flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container text-[11px] font-mono flex items-center justify-center font-bold">
                  3
                </span>
                Identitas Merek & Regulasi
              </span>
              <span className="font-mono text-[11px] text-outline">GCC / EU</span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] uppercase font-bold text-outline">
                Nama Merek Buyer (Headline)
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container font-mono"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] uppercase font-bold text-outline">
                Sub-Headline / Slogan
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container font-mono"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-2 pt-1 text-[12px]">
              <label className="flex items-center gap-2 text-on-surface cursor-pointer">
                <input
                  type="checkbox"
                  checked={arabicTextEnabled}
                  onChange={(e) => setArabicTextEnabled(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary-container"
                />
                <span>Peringatan Bahasa Arab (Standar ESMA & GCC GSO 2530)</span>
              </label>

              <label className="flex items-center gap-2 text-on-surface cursor-pointer">
                <input
                  type="checkbox"
                  checked={barcodeEnabled}
                  onChange={(e) => setBarcodeEnabled(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary-container"
                />
                <span>Barcode EAN-13 & QR Code Batch Lab</span>
              </label>

              <label className="flex items-center gap-2 text-on-surface cursor-pointer">
                <input
                  type="checkbox"
                  checked={certLogosEnabled}
                  onChange={(e) => setCertLogosEnabled(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary-container"
                />
                <span>Sertifikasi Resmi (Halal MUI & IMO Non-DG SP925)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Perspective Studio Canvas Viewport (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden flex flex-col shadow-2xl relative">
            {/* Viewport Toolbar */}
            <div className="h-12 bg-surface-container-low border-b border-outline-variant/30 px-4 flex items-center justify-between">
              <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1 rounded-md font-headline text-[12px] font-semibold transition-all ${
                    viewMode === '3d'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Perspektif 3D Box
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('flat')}
                  className={`px-3 py-1 rounded-md font-headline text-[12px] font-semibold transition-all ${
                    viewMode === 'flat'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Dieline Flat 2D CAD
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('pallet')}
                  className={`px-3 py-1 rounded-md font-headline text-[12px] font-semibold transition-all ${
                    viewMode === 'pallet'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Pallet Stuffing
                </button>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-outline">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span>VECTOR CAD ACCU-CUT</span>
              </div>
            </div>

            {/* Canvas Stage */}
            <div className="w-full min-h-[480px] cad-grid relative p-6 flex flex-col items-center justify-center overflow-hidden">
              {viewMode === '3d' && (
                <div className="w-full flex flex-col items-center gap-4 py-2">
                  {/* REALISTIC 3D ROTATABLE PACKAGING BOX (THREE.JS / WEBGL) */}
                  <OemBox3DViewer
                    material={material}
                    packFormat={packFormat}
                    brandName={brandName}
                    tagline={tagline}
                    goldFoil={goldFoil}
                    matteUv={matteUv}
                    spotUv={spotUv}
                    arabicTextEnabled={arabicTextEnabled}
                    barcodeEnabled={barcodeEnabled}
                    certLogosEnabled={certLogosEnabled}
                  />

                  {/* LEGIBILITY CARD: Clear Preview Below (Every detail 100% readable) */}
                  <div className="w-full bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                      <span className="font-headline font-bold text-[13px] text-on-surface">
                        Pratinjau Cetak Dieline Muka Depan (Front Panel Spec)
                      </span>
                      <span className="font-mono text-[11px] text-tertiary font-bold">
                        {style.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px] pt-1 font-mono">
                      <div className="flex flex-col">
                        <span className="text-outline text-[10px]">BRAND LOGO & MERK:</span>
                        <strong className="text-primary truncate">{brandName}</strong>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-outline text-[10px]">TAGLINE / MUTU:</span>
                        <span className="text-on-surface truncate">{tagline}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-outline text-[10px]">FINISHING:</span>
                        <span className="text-secondary font-semibold">
                          {goldFoil ? 'Gold Foil' : 'No Foil'} • {matteUv ? 'Matte UV' : 'Standard'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-outline text-[10px]">REGULASI EKSPOR:</span>
                        <span className="text-tertiary font-semibold">GCC GSO 2530 & SP925</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {viewMode === 'flat' && (
                <div className="w-full max-w-md bg-surface-container p-5 rounded-xl border border-outline-variant/30 flex flex-col items-center gap-3">
                  <span className="font-mono text-[11px] text-tertiary">2D FLAT CAD DIELINE (100×100×100 mm)</span>
                  <div className="w-full h-64 border-2 border-dashed border-primary/40 rounded-lg flex flex-col items-center justify-center p-4 text-center bg-surface-container-high/40">
                    <span className="font-headline font-bold text-[16px] text-on-surface">{brandName}</span>
                    <span className="font-body text-[12px] text-outline mt-1">{tagline}</span>
                    <span className="font-mono text-[11px] text-primary mt-2">
                      Die-cut Tolerance: ±0.5 mm • Inner Vacuum Sealed
                    </span>
                    <span className="font-mono text-[10px] text-tertiary mt-1">
                      Bleed +3mm • Crease Cyan 0.25pt • CMYK + Pant. 871C (Gold)
                    </span>
                  </div>
                </div>
              )}

              {viewMode === 'pallet' && (
                <div className="w-full max-w-md bg-surface-container p-5 rounded-xl border border-outline-variant/30 flex flex-col items-center gap-3">
                  <span className="font-mono text-[11px] text-tertiary">PENATAAN PALLET MARITIM (EURO PALLET)</span>
                  <div className="w-full h-64 border border-outline-variant/30 rounded-lg flex flex-col justify-end p-4 bg-surface-container-high/40">
                    <div className="grid grid-cols-5 gap-1.5 w-full h-44">
                      {Array.from({ length: 35 }).map((_, i) => (
                        <div key={i} className="bg-primary-container/85 rounded-sm border border-black/40"></div>
                      ))}
                    </div>
                    <div className="w-full h-7 bg-[#8B5A2B] rounded mt-2 flex items-center justify-center font-mono text-[11px] text-white font-bold">
                      EURO PALLET 1200 × 1000 mm • WRAP SHRINK FILM
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Viewport Footer Bar */}
            <div className="px-6 py-3.5 bg-surface-container-low border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-outline">
                FORMAT: {packFormat.toUpperCase()} • MATERIAL: {material.toUpperCase()}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/628113000000?text=${encodeURIComponent(`Halo NusantaraOrigin, saya ingin meminta konfirmasi mock-up kemasan OEM brand: ${brandName} (${packFormat})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-headline text-[12px] uppercase font-bold tracking-wider hover:bg-[#D94E13] transition-colors shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim Mock-Up ke WhatsApp Pabrik</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
