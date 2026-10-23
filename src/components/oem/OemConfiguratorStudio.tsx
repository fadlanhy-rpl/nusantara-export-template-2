'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Palette, Upload, ShieldCheck, Check, Eye, Download, MessageCircle, ArrowRight } from 'lucide-react';

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

  // Material background shades for 3D box projection
  const getMaterialColor = () => {
    switch (material) {
      case 'kraft':
        return '#8A5A36';
      case 'white_duplex':
        return '#EDEDEC';
      case 'matte_black':
      default:
        return '#1C1D21';
    }
  };

  const getTextColor = () => {
    return material === 'white_duplex' ? '#16110E' : '#ECE0DB';
  };

  const getFoilAccent = () => {
    return goldFoil ? '#D4AF37' : '#C4440F';
  };

  return (
    <div className="w-full max-w-[1160px] mx-auto px-4 lg:px-0 py-8 flex flex-col gap-8">
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
            <p className="font-body text-[14px] text-on-surface-variant max-w-2xl mt-1">
              Simulasi interaktif kemasan brand Anda sendiri dengan presisi dieline pabrik berstandar ekspor ke Timur Tengah (GCC), Eropa, dan AS.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/30 text-tertiary font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span>DIELINE ENGINE v4.2 LIVE</span>
          </div>
        </div>
      </div>

      {/* 12-Column Split Configurator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-surface-container-low rounded-xl border border-outline-variant/30 p-6 flex flex-col gap-6 shadow-xl">
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
                className={`p-3 rounded-lg text-left transition-all flex items-start gap-3 border ${
                  packFormat === '1kg'
                    ? 'border-primary-container bg-surface-container'
                    : 'border-outline-variant/30 bg-surface-container-lowest/50 hover:bg-surface-container'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  packFormat === '1kg' ? 'border-primary-container' : 'border-outline-variant'
                }`}>
                  {packFormat === '1kg' && <div className="w-2 h-2 rounded-full bg-primary-container"></div>}
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-[13px] font-bold text-on-surface">
                    Kotak Dalam 1kg (10x1kg per Master Box 10kg)
                  </span>
                  <span className="font-mono text-[11px] text-outline">
                    Dimensi 100×100×100 mm • Duplex 250gsm
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPackFormat('2kg')}
                className={`p-3 rounded-lg text-left transition-all flex items-start gap-3 border ${
                  packFormat === '2kg'
                    ? 'border-primary-container bg-surface-container'
                    : 'border-outline-variant/30 bg-surface-container-lowest/50 hover:bg-surface-container'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  packFormat === '2kg' ? 'border-primary-container' : 'border-outline-variant'
                }`}>
                  {packFormat === '2kg' && <div className="w-2 h-2 rounded-full bg-primary-container"></div>}
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-[13px] font-bold text-on-surface">
                    Kotak Dalam 2kg (5x2kg per Master Box 10kg)
                  </span>
                  <span className="font-mono text-[11px] text-outline">
                    Dimensi 200×100×100 mm • Duplex 300gsm
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPackFormat('10kg_bulk')}
                className={`p-3 rounded-lg text-left transition-all flex items-start gap-3 border ${
                  packFormat === '10kg_bulk'
                    ? 'border-primary-container bg-surface-container'
                    : 'border-outline-variant/30 bg-surface-container-lowest/50 hover:bg-surface-container'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  packFormat === '10kg_bulk' ? 'border-primary-container' : 'border-outline-variant'
                }`}>
                  {packFormat === '10kg_bulk' && <div className="w-2 h-2 rounded-full bg-primary-container"></div>}
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-[13px] font-bold text-on-surface">
                    Master Box Polos 10kg (Bulk Packing BBQ)
                  </span>
                  <span className="font-mono text-[11px] text-outline">
                    Tanpa inner box • Plastik tebal kedap udara 0.08mm
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
                Substrat Kertas / Karton
              </span>
              <span className="font-mono text-[11px] text-tertiary">ISO-12647-2</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMaterial('kraft')}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                  material === 'kraft'
                    ? 'border-2 border-primary-container bg-surface-container'
                    : 'border-outline-variant/30 bg-surface-container hover:border-outline'
                }`}
              >
                <span className="w-full h-7 rounded shadow-inner" style={{ backgroundColor: '#8A5A36' }}></span>
                <span className="font-mono text-[11px] text-on-surface text-center leading-tight">
                  Kraft 275g<br />
                  <span className="text-outline text-[9px]">Eco Rustic</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMaterial('matte_black')}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                  material === 'matte_black'
                    ? 'border-2 border-primary-container bg-surface-container'
                    : 'border-outline-variant/30 bg-surface-container hover:border-outline'
                }`}
              >
                <span className="w-full h-7 rounded shadow-inner" style={{ backgroundColor: '#1C1D21' }}></span>
                <span className="font-mono text-[11px] text-primary text-center leading-tight font-semibold">
                  Matte Black<br />
                  <span className="text-secondary text-[9px]">Luxury Shisha</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMaterial('white_duplex')}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                  material === 'white_duplex'
                    ? 'border-2 border-primary-container bg-surface-container'
                    : 'border-outline-variant/30 bg-surface-container hover:border-outline'
                }`}
              >
                <span className="w-full h-7 rounded shadow-inner" style={{ backgroundColor: '#EDEDEC' }}></span>
                <span className="font-mono text-[11px] text-on-surface text-center leading-tight">
                  Bright White<br />
                  <span className="text-outline text-[9px]">Duplex 300g</span>
                </span>
              </button>
            </div>

            {/* Special Finishing Options */}
            <div className="flex flex-col gap-2 pt-2">
              <label className="flex items-center justify-between p-2 rounded hover:bg-surface-container transition-colors cursor-pointer">
                <span className="flex items-center gap-2 font-body text-[13px] text-on-surface">
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

              <label className="flex items-center justify-between p-2 rounded hover:bg-surface-container transition-colors cursor-pointer">
                <span className="flex items-center gap-2 font-body text-[13px] text-on-surface">
                  <input
                    type="checkbox"
                    checked={goldFoil}
                    onChange={(e) => setGoldFoil(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary-container"
                  />
                  <span>Hot-Stamping Foil Emas (Logo & Nama Merk)</span>
                </span>
                <span className="font-mono text-[11px] text-secondary">+$0.03/pc</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded hover:bg-surface-container transition-colors cursor-pointer">
                <span className="flex items-center gap-2 font-body text-[13px] text-on-surface">
                  <input
                    type="checkbox"
                    checked={spotUv}
                    onChange={(e) => setSpotUv(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary-container"
                  />
                  <span>Spot UV Glossy pada Ornamen Geometris</span>
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
                Identitas Merek & Teks Regulasi
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
                Sub-Headline / Descriptor
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container font-mono"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-2 pt-1">
              <label className="flex items-center gap-2 font-body text-[12px] text-on-surface cursor-pointer">
                <input
                  type="checkbox"
                  checked={arabicTextEnabled}
                  onChange={(e) => setArabicTextEnabled(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary-container"
                />
                <span>Peringatan Regulasi Arab (Standar GCC / ESMA GSO 2530)</span>
              </label>

              <label className="flex items-center gap-2 font-body text-[12px] text-on-surface cursor-pointer">
                <input
                  type="checkbox"
                  checked={barcodeEnabled}
                  onChange={(e) => setBarcodeEnabled(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary-container"
                />
                <span>Cetak Barcode EAN-13 & QR Code Batch Lab</span>
              </label>

              <label className="flex items-center gap-2 font-body text-[12px] text-on-surface cursor-pointer">
                <input
                  type="checkbox"
                  checked={certLogosEnabled}
                  onChange={(e) => setCertLogosEnabled(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary-container"
                />
                <span>Logo Sertifikasi Resmi (Halal & IMO Non-DG SP925)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: 2.5D Studio Canvas Viewport (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden flex flex-col shadow-2xl relative">
            {/* Viewport Toolbar */}
            <div className="h-12 bg-surface-container-low border-b border-outline-variant/30 px-4 flex items-center justify-between">
              <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1 rounded font-headline text-[12px] font-semibold transition-all ${
                    viewMode === '3d'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Perspektif 3D
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('flat')}
                  className={`px-3 py-1 rounded font-headline text-[12px] font-semibold transition-all ${
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
                  className={`px-3 py-1 rounded font-headline text-[12px] font-semibold transition-all ${
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
                <span>REAL-TIME VECTOR SYNC</span>
              </div>
            </div>

            {/* Canvas Stage */}
            <div className="w-full min-h-[460px] sm:min-h-[500px] cad-grid relative p-6 flex items-center justify-center overflow-hidden">
              {viewMode === '3d' && (
                <div className="relative w-full max-w-md h-80 flex items-center justify-center transition-all">
                  {/* Isometric Box 3D Projection */}
                  <svg className="w-full h-auto drop-shadow-2xl" viewBox="0 0 400 340">
                    <defs>
                      <linearGradient id="topShade" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={getMaterialColor()} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={getMaterialColor()} stopOpacity="0.75" />
                      </linearGradient>
                      <linearGradient id="leftShade" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={getMaterialColor()} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={getMaterialColor()} stopOpacity="0.4" />
                      </linearGradient>
                      <linearGradient id="rightShade" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={getMaterialColor()} stopOpacity="0.85" />
                        <stop offset="100%" stopColor={getMaterialColor()} stopOpacity="0.65" />
                      </linearGradient>
                    </defs>

                    {/* Top Face */}
                    <polygon points="200,40 320,105 200,170 80,105" fill="url(#topShade)" stroke={getFoilAccent()} strokeWidth="1.5" />
                    {/* Left Face */}
                    <polygon points="80,105 200,170 200,300 80,235" fill="url(#leftShade)" stroke={getFoilAccent()} strokeWidth="1.5" />
                    {/* Right Face (Main Branding Front Face) */}
                    <polygon points="200,170 320,105 320,235 200,300" fill="url(#rightShade)" stroke={getFoilAccent()} strokeWidth="1.5" />

                    {/* Branding Text on Front Right Face (Skewed in Isometric Space) */}
                    <g transform="translate(205, 160) skewY(28)">
                      <text x="15" y="25" fill={getFoilAccent()} fontFamily="Montserrat" fontSize="12" fontWeight="800">
                        {brandName.substring(0, 22)}
                      </text>
                      <text x="15" y="40" fill={getTextColor()} fontFamily="Inter" fontSize="8" fontWeight="500">
                        {tagline.substring(0, 32)}
                      </text>
                      <text x="15" y="60" fill={getFoilAccent()} fontFamily="Geist" fontSize="10" fontWeight="700">
                        NET WT: {packFormat.includes('1kg') ? '1.0 KG' : packFormat.includes('2kg') ? '2.0 KG' : '10.0 KG'}
                      </text>

                      {arabicTextEnabled && (
                        <text x="15" y="80" fill={getTextColor()} fontFamily="Arial" fontSize="8">
                          فحم جوز الهند الطبيعي للشيشة
                        </text>
                      )}

                      {barcodeEnabled && (
                        <g transform="translate(15, 95)">
                          <rect width="60" height="15" fill="#FFFFFF" />
                          <text x="5" y="11" fill="#000000" fontFamily="Geist" fontSize="7">|||||||||||||||||</text>
                        </g>
                      )}
                    </g>
                  </svg>
                </div>
              )}

              {viewMode === 'flat' && (
                <div className="w-full max-w-md bg-surface-container p-4 rounded-lg border border-outline-variant/40 flex flex-col items-center gap-3">
                  <span className="font-mono text-[11px] text-tertiary">2D FLAT CAD DIELINE TEMPLATE (100×100×100 mm)</span>
                  <div className="w-full h-64 border-2 border-dashed border-primary/40 rounded flex items-center justify-center text-center p-4">
                    <div className="flex flex-col gap-2">
                      <span className="font-headline font-bold text-on-surface text-[14px]">{brandName}</span>
                      <span className="font-mono text-[11px] text-outline">Toleransi Die-cut: ±0.5 mm • Duplex 250gsm</span>
                      <span className="font-mono text-[10px] text-primary">Bleed Line: +3mm • Crease Lines: Cyan 0.25pt</span>
                    </div>
                  </div>
                </div>
              )}

              {viewMode === 'pallet' && (
                <div className="w-full max-w-md bg-surface-container p-4 rounded-lg border border-outline-variant/40 flex flex-col items-center gap-3">
                  <span className="font-mono text-[11px] text-tertiary">PALLET STUFFING CONFIGURATION</span>
                  <div className="w-full h-64 border border-outline-variant/40 rounded flex flex-col justify-end p-4 bg-surface-container-high/40">
                    <div className="grid grid-cols-5 gap-1 w-full h-40">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div key={i} className="bg-primary-container/80 rounded-sm border border-black/30"></div>
                      ))}
                    </div>
                    <div className="w-full h-6 bg-[#8A5A36] rounded mt-1 flex items-center justify-center font-mono text-[10px] text-white">
                      EURO PALLET 1200 × 1000 mm (WRAP PLASTIC SEALED)
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Viewport Footer Bar */}
            <div className="px-6 py-3 bg-surface-container-low border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-outline">
                FORMAT: {packFormat.toUpperCase()} • MATERIAL: {material.toUpperCase()}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/628113000000?text=${encodeURIComponent(`Halo NusantaraOrigin, saya ingin meminta konfirmasi mock-up kemasan OEM brand: ${brandName} (${packFormat})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-headline text-[12px] uppercase font-bold tracking-wider hover:bg-[#D94E13] transition-colors"
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
