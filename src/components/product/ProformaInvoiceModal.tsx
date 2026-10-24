'use client';

import React, { useRef } from 'react';
import {
  FileText,
  Printer,
  Download,
  X,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Calendar,
  Anchor,
  Sparkles,
  Flame,
} from 'lucide-react';

import { ContainerType } from '@/lib/containerCargoCalculator';

interface ProformaInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyerName: string;
  buyerCompany: string;
  buyerEmail: string;
  buyerWhatsapp: string;
  containerType: ContainerType;
  quantity: number;
  totalNetMt: number;
  totalBoxes: number;
  totalMinUsd: number;
  totalMaxUsd: number;
  referenceNo?: string;
}

export default function ProformaInvoiceModal({
  isOpen,
  onClose,
  buyerName,
  buyerCompany,
  buyerEmail,
  buyerWhatsapp,
  containerType,
  quantity,
  totalNetMt,
  totalBoxes,
  totalMinUsd,
  totalMaxUsd,
  referenceNo = 'PI-20261024-8819',
}: ProformaInvoiceModalProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const validityDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="w-full max-w-4xl bg-white text-[#16110E] rounded-2xl shadow-2xl border border-[#B9AFA4] overflow-hidden my-auto flex flex-col print:border-none print:shadow-none print:rounded-none">
        {/* Modal Action Bar (Hidden on print) */}
        <div className="bg-[#1C1815] text-[#ECE0DB] px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-white/10 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-headline font-bold text-sm tracking-tight">
              Official Commercial Proforma Invoice & Quotation
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#D94E13] flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-outline hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Tutup Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Substrate (Standard Commercial Invoice A4) */}
        <div
          ref={invoiceRef}
          className="p-6 sm:p-10 bg-[#FAF7F2] font-body text-[12px] text-[#16110E] flex flex-col gap-6 print:p-8 print:bg-white"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b-2 border-[#16110E] pb-5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#832700] text-white flex items-center justify-center font-bold">
                  <Flame className="w-4 h-4 fill-current" />
                </div>
                <span className="font-headline font-extrabold text-xl tracking-tight uppercase text-[#16110E]">
                  PT NUSANTARA ORIGIN INDONESIA
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#59413A] leading-relaxed max-w-md">
                Gresik Industrial Processing Hub (IDMES), East Java, Indonesia
                <br />
                Port of Loading: Tanjung Perak Port, Surabaya (SUB) • Export License: NIB-9120301928371
                <br />
                Official Trade Desk: export@nusantaraorigin.com • Tel: +62 811-3000-0000
              </p>
            </div>

            <div className="flex flex-col sm:items-end font-mono text-[11px] bg-white p-3 rounded-xl border border-[#B9AFA4]/60 shadow-sm">
              <span className="font-headline font-extrabold text-sm text-[#832700] tracking-wider">
                PROFORMA INVOICE
              </span>
              <span className="font-bold text-[#16110E] mt-1">Ref: {referenceNo}</span>
              <span className="text-[#59413A]">Date: {todayStr}</span>
              <span className="text-[#2A6844] font-bold">Valid Until: {validityDate}</span>
            </div>
          </div>

          {/* Consignee & Shipment Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[11px]">
            <div className="bg-white p-4 rounded-xl border border-[#B9AFA4]/50 flex flex-col gap-1 shadow-sm">
              <span className="font-headline font-bold text-[10px] uppercase text-[#832700] tracking-wider border-b border-[#B9AFA4]/30 pb-1">
                CONSIGNEE / BUYER INFORMATION
              </span>
              <div className="mt-1">
                <strong className="text-[13px] text-[#16110E] block font-headline">{buyerName || 'Authorized Buyer'}</strong>
                <span className="text-[#59413A] font-semibold">{buyerCompany || 'International Trading Co.'}</span>
              </div>
              <span className="text-[#59413A]">Email: {buyerEmail || 'procurement@buyer.ae'}</span>
              <span className="text-[#59413A]">WhatsApp: {buyerWhatsapp || '+971 50 123 4567'}</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#B9AFA4]/50 flex flex-col gap-1 shadow-sm">
              <span className="font-headline font-bold text-[10px] uppercase text-[#832700] tracking-wider border-b border-[#B9AFA4]/30 pb-1">
                SHIPPING & INCOTERM TERMS
              </span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <span className="text-[#59413A] text-[10px] block">INCOTERM:</span>
                  <strong className="text-[#16110E]">FOB Tanjung Perak</strong>
                </div>
                <div>
                  <span className="text-[#59413A] text-[10px] block">PAYMENT TERMS:</span>
                  <strong className="text-[#16110E]">30% T/T, 70% vs B/L</strong>
                </div>
                <div>
                  <span className="text-[#59413A] text-[10px] block">ALLOCATION:</span>
                  <strong className="text-[#832700]">{quantity}x {containerType} FCL</strong>
                </div>
                <div>
                  <span className="text-[#59413A] text-[10px] block">STUFFING SCHEDULE:</span>
                  <strong className="text-[#16110E]">Ready 14 Days</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Commodity Details Table */}
          <div className="w-full bg-white rounded-xl border border-[#B9AFA4] overflow-hidden shadow-sm">
            <table className="w-full text-left font-body text-[12px]">
              <thead>
                <tr className="bg-[#EAE4D9] font-headline text-[10px] uppercase tracking-wider text-[#3A3330] border-b border-[#B9AFA4]">
                  <th className="py-2.5 px-3">Item Description & Spec</th>
                  <th className="py-2.5 px-3">HS Code</th>
                  <th className="py-2.5 px-3 text-center">Quantity</th>
                  <th className="py-2.5 px-3 text-right">Unit Price (FOB)</th>
                  <th className="py-2.5 px-3 text-right">Total Est. (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B9AFA4]/40 font-mono text-[11px]">
                <tr>
                  <td className="py-3 px-3">
                    <strong className="font-headline text-[12px] text-[#16110E] block">
                      100% Pure Coconut Shell Charcoal Briquettes
                    </strong>
                    <span className="text-[#59413A] text-[10px] block mt-0.5">
                      Premium Shisha Grade • Moisture &lt; 5.0% • Ash &lt; 2.2% Snow White • Calorie &gt; 7,500 kcal/kg
                    </span>
                    <span className="text-[#2A6844] text-[10px] font-bold block mt-0.5">
                      ✓ IMO Special Provision 925 Non-DG Certified (UN 3313 Passed)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#59413A]">4402.90.10</td>
                  <td className="py-3 px-3 text-center">
                    <strong className="text-[#16110E]">{totalNetMt.toFixed(1)} MT</strong>
                    <span className="text-[#59413A] block text-[10px]">({totalBoxes} Master Boxes)</span>
                  </td>
                  <td className="py-3 px-3 text-right text-[#16110E] font-semibold">
                    $1,280 – $1,340 / MT
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-[#832700] text-[12px]">
                    ${Math.round(totalMinUsd).toLocaleString()} – ${Math.round(totalMaxUsd).toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-[#FAF7F2]/60 text-[10px] text-[#59413A]">
                  <td className="py-2 px-3" colSpan={4}>
                    • Custom OEM 1kg Inner Brand Box + 10kg Double-Wall Corrugated Master Carton (Included)
                  </td>
                  <td className="py-2 px-3 text-right text-[#2A6844] font-semibold">$0.00 (FOB Incl.)</td>
                </tr>
                <tr className="bg-[#FAF7F2]/60 text-[10px] text-[#59413A]">
                  <td className="py-2 px-3" colSpan={4}>
                    • Terminal Handling Charges (THC) Tanjung Perak & Phytosanitary Quarantine Clearance
                  </td>
                  <td className="py-2 px-3 text-right text-[#2A6844] font-semibold">$0.00 (FOB Incl.)</td>
                </tr>
                <tr className="bg-[#FAF7F2]/60 text-[10px] text-[#59413A]">
                  <td className="py-2 px-3" colSpan={4}>
                    • SGS Official Proximate & IMO Self-Heating Lab Test Certificate with Stamped BL
                  </td>
                  <td className="py-2 px-3 text-right text-[#2A6844] font-semibold">Complimentary</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-[#EAE4D9] font-headline text-[12px] font-bold text-[#16110E] border-t-2 border-[#16110E]">
                  <td colSpan={3} className="py-3 px-3 uppercase tracking-wide">
                    TOTAL ESTIMATED VALUATION (FOB SURABAYA)
                  </td>
                  <td colSpan={2} className="py-3 px-3 text-right font-mono text-[14px] text-[#832700]">
                    USD {Math.round(totalMinUsd).toLocaleString()} – {Math.round(totalMaxUsd).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Banking / Escrow & Signature Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 items-end">
            <div className="p-3.5 rounded-xl bg-white border border-[#B9AFA4]/50 font-mono text-[10px] flex flex-col gap-1">
              <span className="font-headline font-bold text-[#16110E] uppercase text-[11px]">
                BANK WIRE SETTLEMENT DETAILS (T/T ESCROW)
              </span>
              <span className="text-[#59413A]">Beneficiary: PT NUSANTARA ORIGIN INDONESIA</span>
              <span className="text-[#59413A]">Bank Name: Bank Mandiri (Persero) Tbk, Surabaya Branch</span>
              <span className="text-[#59413A]">SWIFT Code: BMRIIDJA</span>
              <span className="text-[#59413A]">Account Currency: United States Dollar (USD)</span>
            </div>

            <div className="flex flex-col items-center sm:items-end text-center sm:text-right font-mono text-[10px]">
              <span className="text-[#59413A] mb-1">For and on behalf of Exporter:</span>
              <div className="w-48 h-20 border-2 border-dashed border-[#B9AFA4] rounded-xl flex flex-col items-center justify-center p-2 bg-white relative">
                <span className="text-[9px] font-bold text-[#832700] uppercase tracking-wider">
                  PT NUSANTARA ORIGIN
                </span>
                <span className="text-[8px] text-[#59413A]">LOGISTICS EXPORT DIVISION</span>
                <span className="text-[8px] text-[#2A6844] font-bold mt-1">EMBEDDED DIGITAL STAMP</span>
              </div>
              <strong className="font-headline text-[11px] text-[#16110E] mt-1">
                Authorized Commercial Director
              </strong>
              <span className="text-[#59413A]">IDMES Gresik Hub • East Java, Indonesia</span>
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden on print) */}
        <div className="bg-[#FAF7F2] border-t border-[#B9AFA4]/40 px-6 py-3 flex items-center justify-between text-xs font-mono text-[#59413A] print:hidden">
          <span>Official Proforma Draft issued under ICC Uniform Rules for Collections.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#16110E] text-white font-headline text-xs font-bold hover:bg-[#2B231E] transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
