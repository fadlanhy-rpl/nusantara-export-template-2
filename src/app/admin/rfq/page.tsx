'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Inbox, CheckCircle2, Clock, Truck, FileText, Search, ArrowUpRight, Filter, ShieldCheck } from 'lucide-react';

interface RfqItem {
  ref: string;
  buyer: string;
  company: string;
  country: string;
  container: string;
  tonnage: number;
  incoterm: string;
  targetPrice: string;
  status: 'NEW' | 'CONTACTED' | 'SAMPLE_SENT' | 'OFFICIAL_QUOTE' | 'DEAL_WON';
  date: string;
}

const INITIAL_RFQS: RfqItem[] = [
  {
    ref: 'RFQ-20261023-8819',
    buyer: 'Tareq Al-Mansoor',
    company: 'Al-Noor Horizon Tobacco LLC',
    country: 'United Arab Emirates',
    container: '2x 40ft HC',
    tonnage: 52.0,
    incoterm: 'FOB Surabaya',
    targetPrice: '$1,300/MT',
    status: 'NEW',
    date: 'Hari ini, 14:22',
  },
  {
    ref: 'RFQ-20261022-7721',
    buyer: 'Klaus Reinhardt',
    company: 'Nordic Charcoal & Grill GmbH',
    country: 'Germany',
    container: '1x 40ft HC',
    tonnage: 26.0,
    incoterm: 'CIF Hamburg',
    targetPrice: '$1,420/MT',
    status: 'SAMPLE_SENT',
    date: 'Kemarin, 09:15',
  },
  {
    ref: 'RFQ-20261021-6540',
    buyer: 'Dimitrios Papadopoulos',
    company: 'Hellenic Hookah Distributors',
    country: 'Greece',
    container: '1x 20ft FCL',
    tonnage: 18.0,
    incoterm: 'FOB Surabaya',
    targetPrice: '$1,290/MT',
    status: 'OFFICIAL_QUOTE',
    date: '21 Okt 2026',
  },
  {
    ref: 'RFQ-20261020-5412',
    buyer: 'Fahad Al-Otaibi',
    company: 'Riyadh Shisha Palace Trading',
    country: 'Saudi Arabia',
    container: '4x 40ft HC',
    tonnage: 104.0,
    incoterm: 'CFR Jeddah Port',
    targetPrice: '$1,320/MT',
    status: 'DEAL_WON',
    date: '20 Okt 2026',
  },
  {
    ref: 'RFQ-20261019-4390',
    buyer: 'Jean-Luc Moreau',
    company: 'Le Grill Gourmet S.A.R.L.',
    country: 'France',
    container: '1x 40ft HC',
    tonnage: 26.0,
    incoterm: 'FOB Tanjung Perak',
    targetPrice: '$1,310/MT',
    status: 'CONTACTED',
    date: '19 Okt 2026',
  },
];

export default function AdminRfqPage() {
  const [filter, setFilter] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const filteredRfqs = INITIAL_RFQS.filter((item) => {
    if (filter !== 'ALL' && item.status !== filter) return false;
    if (search && !item.buyer.toLowerCase().includes(search.toLowerCase()) && !item.company.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getStatusBadge = (status: RfqItem['status']) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-mono text-[10px] font-bold">BARU MASUK</span>;
      case 'SAMPLE_SENT':
        return <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-mono text-[10px] font-bold">SAMPEL TERKIRIM</span>;
      case 'OFFICIAL_QUOTE':
        return <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-mono text-[10px] font-bold">DRAF PENAWARAN</span>;
      case 'DEAL_WON':
        return <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-mono text-[10px] font-bold">DEAL CLOSED</span>;
      case 'CONTACTED':
      default:
        return <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono text-[10px] font-bold">DIHUBUNGI</span>;
    }
  };

  return (
    <div className="w-full max-w-[1160px] mx-auto px-4 lg:px-0 py-8 flex flex-col gap-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
            <span className="font-headline font-bold text-[20px] text-on-surface uppercase">
              Internal Deal Desk & RFQ Pipeline
            </span>
          </div>
          <span className="font-mono text-[11px] text-outline">
            Terminal Gresik Processing Hub (IDMES) • Live Cluster Sync
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[12px] bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/30">
          <span className="text-secondary">FOB Tanjung Perak Benchmark:</span>
          <strong className="text-on-surface">$1,320/MT</strong>
        </div>
      </div>

      {/* 4 Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-outline uppercase">Inquiries Baru</span>
          <div className="font-mono text-[28px] font-bold text-on-surface my-1">14 Leads</div>
          <span className="font-mono text-[11px] text-tertiary">+3 masuk hari ini dari GCC & EU</span>
        </div>

        <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-outline uppercase">Akumulasi Volume</span>
          <div className="font-mono text-[28px] font-bold text-on-surface my-1">420 MT</div>
          <span className="font-mono text-[11px] text-outline">Setara 16x Kontainer 40ft HC</span>
        </div>

        <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-outline uppercase">Valuasi Pipeline</span>
          <div className="font-mono text-[28px] font-bold text-primary my-1">$538,000 USD</div>
          <span className="font-mono text-[11px] text-tertiary">Rata-rata $1,280/MT FOB</span>
        </div>

        <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-outline uppercase">Antrean Sampel DHL</span>
          <div className="font-mono text-[28px] font-bold text-on-surface my-1">4 Paket</div>
          <span className="font-mono text-[11px] text-secondary">Siap dispatch di Lab Gresik</span>
        </div>
      </div>

      {/* Pipeline Table Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-surface-container p-3 rounded-xl border border-outline-variant/30">
        {/* Filters */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {['ALL', 'NEW', 'CONTACTED', 'SAMPLE_SENT', 'OFFICIAL_QUOTE', 'DEAL_WON'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg font-headline text-[11px] uppercase font-bold whitespace-nowrap transition-colors ${
                filter === f
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-outline absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari PIC atau Perusahaan..."
            className="h-9 pl-9 pr-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface font-body text-[12px] focus:outline-none focus:border-primary-container w-full sm:w-64"
          />
        </div>
      </div>

      {/* RFQ Pipeline Data Table */}
      <div className="w-full bg-surface-container rounded-xl border border-outline-variant/30 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-[13px] text-on-surface">
            <thead>
              <tr className="bg-surface-container-high font-headline text-[11px] text-outline uppercase tracking-wider border-b border-outline-variant/30">
                <th className="py-3 px-4 font-bold">No. Referensi</th>
                <th className="py-3 px-4 font-bold">Buyer & Perusahaan</th>
                <th className="py-3 px-4 font-bold">Negara</th>
                <th className="py-3 px-4 font-bold">Kontainer / MT</th>
                <th className="py-3 px-4 font-bold">Incoterm</th>
                <th className="py-3 px-4 font-bold">Target Harga</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-mono text-[12px]">
              {filteredRfqs.map((r) => (
                <tr key={r.ref} className="hover:bg-surface-container-high/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-primary">{r.ref}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-headline font-bold text-on-surface text-[13px]">{r.buyer}</div>
                    <div className="text-outline text-[11px]">{r.company}</div>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{r.country}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-on-surface">{r.container}</span>
                    <span className="text-outline block text-[10px]">({r.tonnage} MT)</span>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{r.incoterm}</td>
                  <td className="py-3.5 px-4 font-bold text-secondary">{r.targetPrice}</td>
                  <td className="py-3.5 px-4">{getStatusBadge(r.status)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={`https://wa.me/628113000000?text=${encodeURIComponent(`Follow-up RFQ ${r.ref} untuk ${r.company}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-headline text-[11px] font-bold transition-colors"
                    >
                      <span>Hubungi</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
