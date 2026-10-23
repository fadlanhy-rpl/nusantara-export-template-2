'use client';

import React, { useState } from 'react';
import { calculateContainerCargo, ContainerType, MASTER_BOX_10KG } from '@/lib/containerCargoCalculator';
import { formatUsd } from '@/lib/utils';
import { Ship, Scale, Box, Lock, Unlock, ArrowRight, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function ContainerPlannerSection() {
  const [containerType, setContainerType] = useState<ContainerType>('40HC');
  const [quantity, setQuantity] = useState<number>(2);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // Form states
  const [buyerName, setBuyerName] = useState('');
  const [buyerCompany, setBuyerCompany] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerWhatsapp, setBuyerWhatsapp] = useState('');

  const singleResult = calculateContainerCargo(containerType, MASTER_BOX_10KG);

  const totalBoxes = singleResult.effectiveBoxes * quantity;
  const totalNetMt = singleResult.totalNetWeightMt * quantity;
  const totalGrossMt = singleResult.totalGrossWeightMt * quantity;

  // Price estimate (Benchmark $1,280 - $1,340 per MT)
  const minPricePerMt = 1280;
  const maxPricePerMt = 1340;
  const totalMinUsd = totalNetMt * minPricePerMt;
  const totalMaxUsd = totalNetMt * maxPricePerMt;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !buyerWhatsapp) return;
    setIsUnlocked(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Halo Direktur Ekspor NusantaraOrigin, saya ${buyerName} dari ${buyerCompany}. Saya telah melakukan simulasi kargo kontainer ${quantity}x ${containerType} (${totalNetMt.toFixed(1)} MT) dan ingin mendapatkan Official Proforma Invoice resmi.`
  );

  return (
    <section id="container-planner" className="w-full bg-[#F5F1EA] text-[#16110E] p-6 lg:p-8 rounded-xl border border-[#B9AFA4] shadow-2xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col border-b border-[#B9AFA4]/50 pb-4">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#59413A] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span>SIMULASI LOGISTIK MARITIM & HARGA FOB RESMI</span>
            <span>/</span>
            <span>PRD-NO2 SECTION 7 ENGINE</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
            <div>
              <h2 className="font-headline text-[22px] sm:text-[28px] font-bold text-[#16110E] uppercase tracking-tight">
                Container Load Planner & Soft-Gated RFQ Desk
              </h2>
              <p className="font-body text-[14px] text-[#59413A] mt-1 max-w-2xl">
                Simulasi presisi matematis muatan kardus briket 10kg, deteksi batas tonase jalan raya pelabuhan Tanjung Perak, dan pembukaan draf harga FOB berstempel resmi.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#16110E] bg-[#EAE4D9] px-3 py-1.5 rounded-lg border border-[#B9AFA4]">
              <span>PELABUHAN: <strong>TANJUNG PERAK (SUB)</strong></span>
            </div>
          </div>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Controls (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 bg-[#EFE9E0] rounded-xl border border-[#B9AFA4] p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#B9AFA4]/40 pb-2">
              <span className="font-headline text-[13px] font-bold uppercase tracking-wider text-[#16110E]">
                1. Parameter Kontainer Ekspor
              </span>
              <span className="font-mono text-[11px] text-[#59413A]">ISO 668 COMPLIANT</span>
            </div>

            {/* Container Type Selector */}
            <div className="flex flex-col gap-2">
              <label className="font-headline text-[11px] uppercase font-bold text-[#16110E]">
                Pilih Ukuran Kontainer Maritim
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setContainerType('40HC')}
                  className={`p-3 rounded-lg text-left transition-all border ${
                    containerType === '40HC'
                      ? 'border-primary-container bg-white shadow-md'
                      : 'border-[#B9AFA4] bg-[#F8F5F0] hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline text-[13px] font-bold text-[#16110E]">40ft High Cube</span>
                    <span className="font-mono text-[9px] bg-primary-container text-white px-1.5 py-0.5 rounded font-bold">
                      REKOMENDASI
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-primary-container font-semibold">
                    76.4 m³ (26.0 MT Max)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setContainerType('20FT')}
                  className={`p-3 rounded-lg text-left transition-all border ${
                    containerType === '20FT'
                      ? 'border-primary-container bg-white shadow-md'
                      : 'border-[#B9AFA4] bg-[#F8F5F0] hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline text-[13px] font-bold text-[#16110E]">20ft Standard</span>
                    <span className="font-mono text-[9px] bg-[#16110E]/10 text-[#16110E] px-1.5 py-0.5 rounded">
                      REGULAR
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-[#59413A] font-semibold">
                    33.2 m³ (18.0 MT Max)
                  </div>
                </button>
              </div>
            </div>

            {/* Stepper Kuantitas Kontainer */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-headline text-[11px] uppercase font-bold text-[#16110E]">
                  Jumlah Alokasi Kontainer (FCL)
                </label>
                <span className="font-mono text-[11px] text-[#2A6844] font-bold">
                  SLOT PABRIK: TERSEDIA
                </span>
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg border border-[#B9AFA4] p-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded bg-[#EFE9E0] hover:bg-[#DFD7C9] text-lg font-bold flex items-center justify-center transition-colors"
                >
                  −
                </button>
                <div className="flex flex-col items-center">
                  <span className="font-headline text-[18px] font-extrabold text-[#16110E]">
                    {quantity} Kontainer FCL
                  </span>
                  <span className="font-mono text-[11px] text-[#59413A]">
                    Total Muatan Bersih: {totalNetMt.toFixed(1)} Metrik Ton
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded bg-[#EFE9E0] hover:bg-[#DFD7C9] text-lg font-bold flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Port & Incoterm Specs */}
            <div className="bg-white p-3.5 rounded-lg border border-[#B9AFA4]/50 flex flex-col gap-2 font-mono text-[11px]">
              <div className="flex justify-between items-center pb-1.5 border-b border-[#B9AFA4]/30">
                <span className="text-[#59413A]">Incoterm Standard:</span>
                <span className="font-bold text-[#16110E]">FOB Surabaya (Tanjung Perak)</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-[#B9AFA4]/30">
                <span className="text-[#59413A]">Floor Stacked Packing:</span>
                <span className="font-bold text-[#16110E]">Optimal ({singleResult.effectiveBoxes.toLocaleString()} box/kontainer)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#59413A]">Desiccant Standard:</span>
                <span className="font-bold text-[#16110E]">8x 1kg Calcium Chloride Poles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Simulation & Soft-Gated Block (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5 bg-white rounded-xl border border-[#B9AFA4] p-6 shadow-md">
            {/* 2D Schematic Simulation */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[#B9AFA4]/30 pb-2">
                <div>
                  <h3 className="font-headline text-[14px] font-bold uppercase text-[#16110E]">
                    Simulasi Ruang Muat Kontainer 2D Top-Down
                  </h3>
                  <span className="font-mono text-[10px] text-[#59413A] uppercase">
                    Cross-Section View • {singleResult.container.name}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#EFE9E0] font-mono text-[10px] text-[#16110E] font-bold">
                  SCALE 1:50
                </span>
              </div>

              {/* Schematic Box */}
              <div className="w-full bg-[#16110E] rounded-lg p-3 text-[#ECE0DB] shadow-inner">
                <div className="flex justify-between items-center text-[10px] font-mono text-primary/80 mb-2 border-b border-[#ECE0DB]/10 pb-1">
                  <span>INTERIOR DIMENSIONS: {singleResult.container.internalLengthM}m × {singleResult.container.internalWidthM}m × {singleResult.container.internalHeightM}m</span>
                  <span className="text-tertiary">STOWAGE FACTOR: 0.95</span>
                </div>

                {/* Carton Matrix Graphic */}
                <div className="w-full h-24 bg-[#201A17] rounded border border-dashed border-[#ECE0DB]/20 p-2 flex flex-col justify-between">
                  <div className="grid grid-cols-12 gap-1 w-full h-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="bg-primary-container/80 rounded-sm"></div>
                    ))}
                  </div>
                  <div className="w-full h-8 bg-primary-container/20 border border-primary-container/40 rounded flex items-center justify-between px-3 text-[11px] font-mono">
                    <span className="text-[#ECE0DB] font-semibold">
                      {totalBoxes.toLocaleString()} MASTER BOXES (10kg EXPORT PACK)
                    </span>
                    <span className="text-tertiary font-bold">FLOOR STACK: 10 TIERS</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 w-full h-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="bg-primary-container/80 rounded-sm"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dual Progress Bars */}
              <div className="flex flex-col gap-3 pt-1">
                {/* Weight Bar */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-mono text-[11px]">
                    <span className="font-bold text-[#16110E]">PAYLOAD WEIGHT UTILIZATION:</span>
                    <span className="font-bold text-primary-container">{singleResult.weightUtilizationPercent}% (ROAD SAFE)</span>
                  </div>
                  <div className="w-full h-3 bg-[#EFE9E0] rounded-full overflow-hidden border border-[#B9AFA4]">
                    <div
                      className="h-full bg-primary-container rounded-full transition-all duration-500"
                      style={{ width: `${singleResult.weightUtilizationPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center font-mono text-[10px] text-[#59413A]">
                    <span>Total Berat Kotor: {totalGrossMt.toFixed(2)} MT</span>
                    <span>Batas Tonase Maksimal: {(singleResult.container.maxPayloadKg * quantity / 1000).toFixed(1)} MT</span>
                  </div>
                </div>

                {/* Volume CBM Bar */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-mono text-[11px]">
                    <span className="font-bold text-[#16110E]">VOLUME CBM UTILIZATION:</span>
                    <span className="font-bold text-[#2A6844]">{singleResult.cbmUtilizationPercent}% (OPTIMAL DENSITY)</span>
                  </div>
                  <div className="w-full h-3 bg-[#EFE9E0] rounded-full overflow-hidden border border-[#B9AFA4]">
                    <div
                      className="h-full bg-[#2A6844] rounded-full transition-all duration-500"
                      style={{ width: `${singleResult.cbmUtilizationPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center font-mono text-[10px] text-[#59413A]">
                    <span>Kubikasi Terpakai: {(singleResult.utilizedCbm * quantity).toFixed(1)} CBM</span>
                    <span>Kapasitas Efektif: {(singleResult.container.effectiveCbm * quantity).toFixed(1)} CBM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* COMMERCIAL VALUATION (SOFT-GATED) */}
            <div className="border-t-2 border-[#B9AFA4]/40 pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-headline text-[13px] font-bold uppercase tracking-wider text-[#16110E]">
                  Estimasi Nilai Valuasi Resmi FOB Surabaya
                </span>
                <span className="font-mono text-[10px] text-[#59413A]">
                  STATUS: {isUnlocked ? 'VERIFIED ACCESS' : 'LOCKED'}
                </span>
              </div>

              {!isUnlocked ? (
                /* Gated Teaser + Lead Form */
                <div className="rounded-xl border border-[#B9AFA4] bg-gradient-to-b from-[#FAF7F2] to-[#EFE9E0] p-4 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-headline text-[14px] font-bold text-[#16110E]">
                        Buka Rincian Harga & Draf Quotation Resmi (PDF)
                      </h4>
                      <p className="font-body text-[12px] text-[#59413A] mt-0.5">
                        Masukkan data bisnis Anda untuk membuka breakdown harga per MT, jadwal stuffing pabrik, dan lembar penawaran berstempel resmi PT Nusantara Origin.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleUnlock} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase font-bold text-[#59413A]">Nama Lengkap PIC</label>
                      <input
                        required
                        type="text"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="Contoh: Tariq Al-Mansoor"
                        className="h-9 px-3 bg-white border border-[#B9AFA4] rounded-md text-[12px] focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase font-bold text-[#59413A]">Perusahaan & Negara</label>
                      <input
                        required
                        type="text"
                        value={buyerCompany}
                        onChange={(e) => setBuyerCompany(e.target.value)}
                        placeholder="Al-Noor Trading LLC (UAE)"
                        className="h-9 px-3 bg-white border border-[#B9AFA4] rounded-md text-[12px] focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase font-bold text-[#59413A]">Email Bisnis</label>
                      <input
                        required
                        type="email"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="procurement@buyer.ae"
                        className="h-9 px-3 bg-white border border-[#B9AFA4] rounded-md text-[12px] focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase font-bold text-[#59413A]">WhatsApp / Direct Tel</label>
                      <input
                        required
                        type="tel"
                        value={buyerWhatsapp}
                        onChange={(e) => setBuyerWhatsapp(e.target.value)}
                        placeholder="+971 50 123 4567"
                        className="h-9 px-3 bg-white border border-[#B9AFA4] rounded-md text-[12px] focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="sm:col-span-2 pt-1">
                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-md bg-[#16110E] hover:bg-[#2B231E] text-white font-headline text-[12px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow"
                      >
                        <Unlock className="w-4 h-4 text-primary" />
                        <span>Buka Rincian Harga & Kirim Draf Penawaran Resmi</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Unlocked State */
                <div className="rounded-xl border-2 border-primary-container/40 bg-white p-5 flex flex-col gap-4 shadow-md">
                  <div className="flex items-center justify-between pb-2 border-b border-[#B9AFA4]/30">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2A6844]/15 text-[#2A6844] font-mono text-[11px] font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>STATUS VALUASI: TERBUKA (VERIFIED BUYER ACCESS)</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#59413A]">VALIDITAS: 14 HARI</span>
                  </div>

                  <div>
                    <div className="font-headline text-[24px] font-extrabold text-[#16110E]">
                      USD {formatUsd(totalMinUsd)} – {formatUsd(totalMaxUsd)}
                    </div>
                    <div className="font-mono text-[12px] text-primary-container font-semibold mt-0.5">
                      ($1,280 – $1,340 / MT • {totalNetMt.toFixed(1)} MT @ {quantity}x {containerType})
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#FAF7F2] border border-[#B9AFA4]/50 p-3 font-mono text-[11px] flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[#16110E]">
                      <span>Briket Batok Murni 100% (Kalori &gt; 7,500 kcal):</span>
                      <span className="font-bold">$1,280 / MT</span>
                    </div>
                    <div className="flex justify-between items-center text-[#59413A]">
                      <span>Custom OEM 1kg Box + 5-Ply Master Carton:</span>
                      <span className="text-[#2A6844] font-semibold">Sudah Termasuk ($0)</span>
                    </div>
                    <div className="flex justify-between items-center text-[#59413A]">
                      <span>THC Port Tanjung Perak & Legalitas Ekspor:</span>
                      <span className="text-[#2A6844] font-semibold">Included in FOB</span>
                    </div>
                    <div className="flex justify-between items-center text-[#59413A]">
                      <span>Phytosanitary & IMO Non-DG Certificate SP925:</span>
                      <span className="text-[#2A6844] font-semibold">Complimentary</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/628113000000?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-lg bg-primary-container hover:bg-[#D94E13] text-white font-headline text-[13px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>Kirim RFQ Langsung ke WhatsApp Direktur Ekspor →</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
