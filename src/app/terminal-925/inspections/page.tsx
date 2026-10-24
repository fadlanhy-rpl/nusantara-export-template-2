'use client';

import React, { useState } from 'react';
import {
  FileCheck2,
  ShieldCheck,
  Download,
  CheckCircle2,
  Clock,
  Flame,
  Activity,
  Edit2,
  FileText,
  AlertTriangle,
  Award,
  X
} from 'lucide-react';

interface CertDoc {
  id: string;
  code: string;
  title: string;
  issuer: string;
  testDate: string;
  scope: string;
  status: 'ACTIVE' | 'AUDIT_PENDING';
  downloadUrl: string;
}

interface LabMetric {
  parameter: string;
  testedValue: string;
  contractSpec: string;
  status: 'PASSED' | 'EXCEEDED';
  standard: string;
}

const INITIAL_CERTS: CertDoc[] = [
  {
    id: 'cert-sgs',
    code: 'SGS-ID-SH2026-081',
    title: 'SGS Official Lab Test Report (Proximate & Calorific)',
    issuer: 'PT SGS Indonesia (Minerals & Chemical Testing)',
    testDate: '18 Oktober 2026',
    scope: '100% Pure Coconut Shell Charcoal Proximate & Ash Analysis',
    status: 'ACTIVE',
    downloadUrl: '/products/100-briket-arang-batok-kelapa#lab-specs',
  },
  {
    id: 'cert-sp925',
    code: 'IMO-SP925-UN3313',
    title: 'IMO Non-Dangerous Goods Self-Heating Test (SP 925 Passed)',
    issuer: 'Sucofindo & Karantina Maritim Pelabuhan',
    testDate: '12 September 2026',
    scope: 'Non-DG Classification for Ocean Freight (UN 3313 passed without container restriction)',
    status: 'ACTIVE',
    downloadUrl: '/factory-audit',
  },
  {
    id: 'cert-afas',
    code: 'AFAS-FUM-2026-99',
    title: 'AFAS Methyl Bromide Fumigation & Quarantine Certificate',
    issuer: 'Badan Karantina Pertanian RI (Barantan)',
    testDate: '20 Oktober 2026',
    scope: 'Phytosanitary & Pest Free Container Clearance for EU / GCC Ports',
    status: 'ACTIVE',
    downloadUrl: '/factory-audit',
  },
  {
    id: 'cert-kan',
    code: 'KAN-NIB-9120301928371',
    title: 'KAN Accredited Exporter License & Verification Document',
    issuer: 'Komite Akreditasi Nasional & Kemendag RI',
    testDate: 'Berlaku s/d 2028',
    scope: 'Legalitas Eksportir Resmi Produk Komoditas Arang & Pertanian',
    status: 'ACTIVE',
    downloadUrl: '/factory-audit',
  },
];

const INITIAL_LAB_METRICS: LabMetric[] = [
  { parameter: 'Kadar Abu (Ash Content)', testedValue: '2.12%', contractSpec: '< 2.2% (Snow White Ash)', status: 'PASSED', standard: 'ASTM D3174' },
  { parameter: 'Nilai Kalori (Calorific Value)', testedValue: '7,540 kcal/kg', contractSpec: '> 7,500 kcal/kg', status: 'EXCEEDED', standard: 'ASTM D5865' },
  { parameter: 'Kadar Air (Moisture Content)', testedValue: '4.85%', contractSpec: '< 5.0%', status: 'PASSED', standard: 'ASTM D3173' },
  { parameter: 'Zat Terbang (Volatile Matter)', testedValue: '13.2%', contractSpec: '13.0% - 15.0%', status: 'PASSED', standard: 'ASTM D3175' },
  { parameter: 'Karbon Terikat (Fixed Carbon)', testedValue: '81.9%', contractSpec: '> 80.0%', status: 'EXCEEDED', standard: 'ASTM D3172' },
  { parameter: 'Durasi Bakar Efektif (Burning)', testedValue: '2 Jam 38 Menit', contractSpec: 'Min. 2.5 Jam', status: 'PASSED', standard: 'Internal QC Lab' },
];

export default function FactoryInspectionsManagerPage() {
  const [certs, setCerts] = useState<CertDoc[]>(INITIAL_CERTS);
  const [metrics, setMetrics] = useState<LabMetric[]>(INITIAL_LAB_METRICS);
  const [editingCert, setEditingCert] = useState<CertDoc | null>(null);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    setCerts((prev) =>
      prev.map((c) => (c.id === editingCert.id ? editingCert : c))
    );
    setEditingCert(null);
    showToast(`Dokumen sertifikat "${editingCert.title}" berhasil diperbarui!`);
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-6 sm:gap-8">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 p-3.5 px-5 rounded-xl bg-tertiary text-on-tertiary font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-tertiary" />
            <h1 className="font-headline font-bold text-[22px] text-on-surface uppercase tracking-tight">
              Audit Pabrik & Sertifikasi Resmi SGS
            </h1>
          </div>
          <span className="font-mono text-[11px] text-outline">
            Kelola data uji laboratorium, dokumen COA yang tampil di portal publik, dan status kiln Gresik Hub.
          </span>
        </div>

        <button
          type="button"
          onClick={() => showToast('Form unggah sertifikasi SGS baru dibuka (Simulasi)')}
          className="px-4 py-2 rounded-xl bg-tertiary-container text-on-tertiary-container font-headline text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#3F7B5E]/80 transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>Unggah Sertifikat Baru</span>
        </button>
      </div>

      {/* Section 1: Active Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {certs.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between gap-4 shadow-md hover:border-tertiary/40 transition-all"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start justify-between">
                <span className="px-2 py-0.5 rounded font-mono text-[9px] bg-tertiary-container text-on-tertiary-container font-bold">
                  {c.code}
                </span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-tertiary">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>TERVERIFIKASI</span>
                </span>
              </div>

              <div>
                <h3 className="font-headline font-bold text-[15px] text-on-surface line-clamp-1">
                  {c.title}
                </h3>
                <span className="font-mono text-[11px] text-outline block">
                  Penerbit: {c.issuer}
                </span>
              </div>

              <p className="font-body text-[12px] text-on-surface-variant leading-relaxed">
                {c.scope}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-[11px] font-mono">
              <span className="text-outline">Tgl Uji: {c.testDate}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCert(c)}
                  className="p-1.5 rounded-lg bg-surface-container-high hover:bg-tertiary-container hover:text-on-tertiary-container text-on-surface transition-all cursor-pointer"
                  title="Edit Dokumen"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section 2: Lab Test Parameters Table */}
      <div className="flex flex-col gap-3">
        <h3 className="font-headline font-bold text-[16px] text-on-surface flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-tertiary" />
          <span>Hasil Uji Laboratorium SGS Aktif (Batch Ekspor Terkini #2026-B88)</span>
        </h3>

        <div className="w-full bg-surface-container rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xl">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left font-body text-[13px] text-on-surface">
              <thead>
                <tr className="bg-surface-container-high font-headline text-[11px] text-outline uppercase tracking-wider border-b border-outline-variant/30">
                  <th className="py-3 px-4 font-bold">Parameter Uji</th>
                  <th className="py-3 px-4 font-bold">Hasil Laboratorium</th>
                  <th className="py-3 px-4 font-bold">Standar Kontrak Pembeli</th>
                  <th className="py-3 px-4 font-bold">Metode Standar</th>
                  <th className="py-3 px-4 font-bold text-right">Status Kualifikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-mono text-[12px]">
                {metrics.map((m, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-high/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-on-surface">{m.parameter}</td>
                    <td className="py-3.5 px-4 font-bold text-primary text-[13px]">{m.testedValue}</td>
                    <td className="py-3.5 px-4 text-on-surface-variant">{m.contractSpec}</td>
                    <td className="py-3.5 px-4 text-outline">{m.standard}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.status === 'EXCEEDED'
                            ? 'bg-tertiary-container text-on-tertiary-container'
                            : 'bg-surface-container-high text-tertiary'
                        }`}
                      >
                        {m.status === 'EXCEEDED' ? 'MEMENUHI (UNGGUL)' : 'LOLOS SPESIFIKASI'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingCert && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[500px] bg-[#1C1815] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <h3 className="font-headline font-bold text-[16px] text-on-surface">
                Ubah Dokumen: {editingCert.code}
              </h3>
              <button
                onClick={() => setEditingCert(null)}
                className="text-outline hover:text-on-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="flex flex-col gap-3 font-mono text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase">Judul Sertifikat</label>
                <input
                  type="text"
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase">Lembaga Penguji</label>
                <input
                  type="text"
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase">Lingkup Pengujian</label>
                <textarea
                  rows={2}
                  value={editingCert.scope}
                  onChange={(e) => setEditingCert({ ...editingCert, scope: e.target.value })}
                  className="p-2 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-headline text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-tertiary-container text-on-tertiary-container font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#3F7B5E]/80 transition-all"
                >
                  Simpan Sertifikat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
