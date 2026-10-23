'use client';

import React, { useState } from 'react';
import { FileText, Download, Truck, CheckCircle2, ShieldCheck, ExternalLink, X } from 'lucide-react';

interface CoaRow {
  param: string;
  limit: string;
  batch: string;
  method: string;
  status: string;
}

const COA_DATA: CoaRow[] = [
  {
    param: 'Kadar Air (Total Moisture Content)',
    limit: 'Maksimal 4.5%',
    batch: '4.10%',
    method: 'ASTM D3173',
    status: 'PASS - EXCELLENT',
  },
  {
    param: 'Kadar Abu (Ash Content)',
    limit: 'Maksimal 2.2%',
    batch: '2.05% (Abu Putih Bersih)',
    method: 'ASTM D3174',
    status: 'PREMIUM GRADE',
  },
  {
    param: 'Zat Terbang (Volatile Matter)',
    limit: '12.0% – 14.0%',
    batch: '13.20%',
    method: 'ASTM D3175',
    status: 'OPTIMAL HEAT',
  },
  {
    param: 'Karbon Terikat (Fixed Carbon)',
    limit: 'Minimal 80.0%',
    batch: '81.50%',
    method: 'By Difference (ASTM D3172)',
    status: 'HIGH PURITY',
  },
  {
    param: 'Nilai Kalori Bruto (Gross Calorific Value)',
    limit: 'Minimal 7,500 kcal/kg',
    batch: '7,580 kcal/kg',
    method: 'ISO 1928 Oxygen Bomb',
    status: 'MAX THERMAL OUTPUT',
  },
  {
    param: 'Uji Jatuh Bebas Beton (Drop Test 1.5m × 3x)',
    limit: 'Min 98% Utuh',
    batch: '99.2% Utuh Tanpa Retak',
    method: 'Factory SOP Hydraulic Test',
    status: 'IMPACT RESISTANT',
  },
  {
    param: 'Uji Pemanasan Mandiri (SHTC UN 3313)',
    limit: 'Non-DG Special Provision 925 (< 200°C)',
    batch: 'Passed (Suhu Stabil < 140°C)',
    method: 'UN Tests Part III 33.3.1.3.3',
    status: 'MARITIME APPROVED',
  },
  {
    param: 'Kandungan Total Belerang (Total Sulfur)',
    limit: 'Maksimal 0.05%',
    batch: '0.02%',
    method: 'ASTM D4239',
    status: 'ZERO ODOR',
  },
];

export default function CoaWhitepaperMatrix() {
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [sampleSubmitted, setSampleSubmitted] = useState(false);

  return (
    <section id="lab-specs" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
          TRANSPARANSI KUALITAS EKSPORTIR
        </span>
        <h2 className="font-headline text-[22px] sm:text-[28px] font-bold text-on-surface">
          Sertifikasi Mutu Laboratorium ASTM / ISO & Standar Ekspor Global
        </h2>
        <p className="font-body text-[14px] text-outline max-w-3xl">
          Setiap batch pengapalan kontainer diuji secara independen oleh PT SGS Indonesia dan Sucofindo. Sertifikat resmi Certificate of Analysis (COA) dan lembar lolos uji maritim IMO Non-DG SP925 terlampir pada Bill of Lading (BL).
        </p>
      </div>

      {/* Physical Whitepaper Substrate (#F5F1EA) */}
      <div className="w-full bg-[#F5F1EA] text-[#16110E] rounded-xl overflow-hidden shadow-2xl border border-[#B9AFA4]">
        {/* Paper Header */}
        <div className="bg-[#EAE4D9] px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#B9AFA4]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#832700]" />
            <span className="font-headline text-[13px] font-bold tracking-tight text-[#16110E] uppercase">
              CERTIFICATE OF ANALYSIS (COA) SUMMARY — BATCH #SH-2026-COA
            </span>
          </div>
          <div className="font-mono text-[11px] text-[#59413A] flex items-center gap-3">
            <span>ACCREDITATION: <strong>KAN LP-024-IDN</strong></span>
            <span>•</span>
            <span>SURVEYOR: <strong>PT SGS INDONESIA</strong></span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left font-body text-[13px] text-[#16110E]">
            <thead>
              <tr className="bg-[#DFD7C9] font-headline text-[11px] text-[#3A3330] uppercase tracking-wider border-b border-[#B9AFA4]">
                <th className="py-3.5 px-6 font-bold">Parameter Uji Mutu</th>
                <th className="py-3.5 px-4 font-bold">Batas Garansi Ekspor</th>
                <th className="py-3.5 px-4 font-bold">Hasil Batch SGS #SH-2026</th>
                <th className="py-3.5 px-4 font-bold">Metode Pengujian</th>
                <th className="py-3.5 px-6 font-bold text-right">Status Ekspor</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[12px] divide-y divide-[#B9AFA4]/40">
              {COA_DATA.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-[#EBE5DA] transition-colors ${
                    idx % 2 === 1 ? 'bg-[#F0ECE4]' : 'bg-[#F5F1EA]'
                  }`}
                >
                  <td className="py-3.5 px-6 font-semibold text-[#16110E] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2F6B4F]"></span>
                    <span>{row.param}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#59413A]">{row.limit}</td>
                  <td className="py-3.5 px-4 font-bold text-[#832700]">{row.batch}</td>
                  <td className="py-3.5 px-4 text-[#59413A]">{row.method}</td>
                  <td className="py-3.5 px-6 text-right">
                    <span className="inline-flex px-2 py-0.5 rounded bg-[#2F6B4F]/15 text-[#105137] text-[10px] font-bold tracking-wide">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paper Footer Stamps */}
        <div className="px-6 py-3 bg-[#EAE4D9] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#59413A] border-t border-[#B9AFA4]">
          <span>INSPECTOR SIGNATURE: PT SGS INDONESIA LOGISTICS DIVISION</span>
          <span>OFFICIAL VERIFICATION STAMP: EMBEDDED DIGITAL COA #99281-2026</span>
        </div>
      </div>

      {/* Action Strip: Download TDS + Request Physical Sample DHL */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-low p-5 rounded-xl border border-outline-variant/30">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <a
            href="/database/seed.sql"
            download="TDS-NusantaraOrigin-Charcoal-2026.pdf"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface hover:text-primary transition-all font-headline text-[12px] uppercase font-semibold tracking-wider shadow-sm"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>Unduh COA & TDS Resmi (.PDF)</span>
          </a>

          <button
            onClick={() => setSampleModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-[#D94E13] transition-all font-headline text-[12px] uppercase tracking-wider font-bold shadow-[0_0_16px_rgba(255,138,82,0.35)]"
          >
            <Truck className="w-4 h-4 text-on-primary-container" />
            <span>Minta Sampel Fisik 2 Kg via DHL</span>
          </button>
        </div>

        <div className="flex items-center gap-2 font-body text-[12px] text-outline text-left">
          <ShieldCheck className="w-5 h-5 text-tertiary shrink-0" />
          <span>
            Sampel 2kg gratis dikirim via DHL Express. Biaya kurir dikreditkan 100% pada order kontainer pertama Anda.
          </span>
        </div>
      </div>

      {/* Modal Request Sample DHL */}
      {sampleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface-container-low border border-outline-variant/40 rounded-xl max-w-lg w-full p-6 relative shadow-2xl">
            <button
              onClick={() => {
                setSampleModalOpen(false);
                setSampleSubmitted(false);
              }}
              className="absolute top-4 right-4 text-outline hover:text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>

            {!sampleSubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSampleSubmitted(true);
                }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-bold text-[18px] text-on-surface">
                    Permintaan Sampel Fisik 2 Kg (DHL Express)
                  </h3>
                </div>
                <p className="font-body text-[13px] text-outline">
                  Silakan isi alamat penerimaan sampel lounge, restoran, atau kantor perdagangan Anda. Sampel dikirim dalam 2x24 jam lengkap dengan sertifikat uji SGS.
                </p>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] text-outline uppercase font-semibold">Nama PIC / Buyer</label>
                  <input
                    required
                    type="text"
                    placeholder="Contoh: Tariq Al-Mansoor"
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-outline uppercase font-semibold">Perusahaan & Kota</label>
                    <input
                      required
                      type="text"
                      placeholder="Al-Noor Trading, Dubai"
                      className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-outline uppercase font-semibold">Bentuk Briket</label>
                    <select className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container">
                      <option>Cube C25 (25mm)</option>
                      <option>Cube C26 (26mm)</option>
                      <option>Hexagonal BBQ (20x50mm)</option>
                      <option>Finger Stick (20x50mm)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-outline uppercase font-semibold">Email Bisnis</label>
                    <input
                      required
                      type="email"
                      placeholder="procurement@buyer.ae"
                      className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-outline uppercase font-semibold">Nomor WhatsApp</label>
                    <input
                      required
                      type="tel"
                      placeholder="+971 50 123 4567"
                      className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-lg bg-primary-container text-on-primary-container font-headline text-[13px] font-bold uppercase tracking-wider hover:bg-[#D94E13] transition-colors"
                >
                  Kirim Permintaan Sampel via Trade Desk →
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center gap-3 py-6">
                <CheckCircle2 className="w-12 h-12 text-tertiary" />
                <h4 className="font-headline font-bold text-[18px] text-on-surface">
                  Permintaan Sampel Berhasil Diterima!
                </h4>
                <p className="font-body text-[13px] text-outline max-w-sm">
                  Tim logistik ekspor kami akan segera menghubungi WhatsApp Anda dengan nomor Air Waybill (AWB) DHL dan estimasi tiba 3–5 hari kerja.
                </p>
                <button
                  onClick={() => setSampleModalOpen(false)}
                  className="mt-3 px-6 py-2 rounded-lg bg-surface-container text-primary font-headline text-[12px] uppercase font-bold"
                >
                  Tutup
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
