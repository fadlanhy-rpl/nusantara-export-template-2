'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  X,
  Search,
  Trash2,
  ExternalLink,
  Upload,
  Plus,
  AlertCircle,
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

const INSPECTIONS_STORAGE_KEY = 'nusantara_inspection_certs_v1';

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

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'AUDIT_PENDING'>('ALL');

  const [editingCert, setEditingCert] = useState<CertDoc | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUploadingDoc, setIsUploadingDoc] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // New certificate form state
  const [newCert, setNewCert] = useState<Omit<CertDoc, 'id'>>({
    code: '',
    title: '',
    issuer: 'PT SGS Indonesia (Minerals & Chemical Testing)',
    testDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    scope: '',
    status: 'ACTIVE',
    downloadUrl: '',
  });

  // Load persisted certs on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(INSPECTIONS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCerts(parsed);
          return;
        }
      }
      localStorage.setItem(INSPECTIONS_STORAGE_KEY, JSON.stringify(INITIAL_CERTS));
    } catch (err) {
      console.warn('Failed to read inspection certs from storage:', err);
    }
  }, []);

  const saveToStorage = (updatedCerts: CertDoc[]) => {
    try {
      localStorage.setItem(INSPECTIONS_STORAGE_KEY, JSON.stringify(updatedCerts));
    } catch (err) {
      console.warn('Failed to save certs to storage:', err);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  // Upload Document Handler (directly uploads to Supabase Storage via /api/v1/upload)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert('Ukuran file dokumen melebihi 25 MB.');
      return;
    }

    setIsUploadingDoc(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'document');

      const res = await fetch('/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setNewCert((prev) => ({ ...prev, downloadUrl: data.url }));
        showToast(`Dokumen "${file.name}" berhasil diunggah ke cloud!`);
      } else {
        showToast('Gagal mengunggah file ke cloud, gunakan link dokumen.');
      }
    } catch (err) {
      console.error('File upload error:', err);
      showToast('Terjadi kesalahan jaringan saat mengunggah file.');
    } finally {
      setIsUploadingDoc(false);
      e.target.value = '';
    }
  };

  // Add Certificate Submit Handler
  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.code.trim() || !newCert.title.trim()) {
      alert('Nomor kode dan judul sertifikat wajib diisi.');
      return;
    }

    const createdCert: CertDoc = {
      id: `cert-${Date.now()}`,
      code: newCert.code.trim(),
      title: newCert.title.trim(),
      issuer: newCert.issuer.trim() || 'PT SGS Indonesia',
      testDate: newCert.testDate.trim() || 'Baru Saja',
      scope: newCert.scope.trim() || 'Verifikasi Spesifikasi Kualitas Ekspor',
      status: newCert.status,
      downloadUrl: newCert.downloadUrl.trim() || '/factory-audit',
    };

    const updated = [createdCert, ...certs];
    setCerts(updated);
    saveToStorage(updated);
    setIsAddModalOpen(false);

    // Reset Form
    setNewCert({
      code: '',
      title: '',
      issuer: 'PT SGS Indonesia (Minerals & Chemical Testing)',
      testDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      scope: '',
      status: 'ACTIVE',
      downloadUrl: '',
    });

    showToast(`Dokumen sertifikat "${createdCert.title}" berhasil ditambahkan & tersimpan!`);
  };

  // Save Edited Certificate
  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    const updated = certs.map((c) => (c.id === editingCert.id ? editingCert : c));
    setCerts(updated);
    saveToStorage(updated);
    setEditingCert(null);
    showToast(`Dokumen sertifikat "${editingCert.title}" berhasil diperbarui!`);
  };

  // Delete Certificate
  const handleDeleteCert = (id: string, title: string) => {
    if (confirm(`Yakin ingin menghapus sertifikat "${title}" dari daftar audit pabrik?`)) {
      const updated = certs.filter((c) => c.id !== id);
      setCerts(updated);
      saveToStorage(updated);
      showToast(`Sertifikat "${title}" berhasil dihapus.`);
    }
  };

  // Active Live Filtering
  const filteredCerts = certs.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchCode = c.code.toLowerCase().includes(q);
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchIssuer = c.issuer.toLowerCase().includes(q);
      const matchScope = c.scope.toLowerCase().includes(q);
      if (!matchCode && !matchTitle && !matchIssuer && !matchScope) return false;
    }
    return true;
  });

  return (
    <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-6 sm:gap-8 pb-12">
      {/* Hidden File Input for Document Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.png,.jpg,.jpeg,.webp"
        className="hidden"
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 p-3.5 px-5 rounded-xl bg-tertiary text-on-tertiary font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-tertiary" />
            <h1 className="font-headline font-bold text-[20px] sm:text-[22px] text-on-surface uppercase tracking-tight">
              Audit Pabrik & Sertifikasi Resmi SGS
            </h1>
          </div>
          <span className="font-mono text-[11px] text-outline">
            Kelola data uji laboratorium, dokumen COA yang tampil di portal publik, dan status kiln Gresik Hub.
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-tertiary-container text-on-tertiary-container font-headline text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#3F7B5E]/90 transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>Unggah Sertifikat Baru</span>
        </button>
      </div>

      {/* Active Search & Filter Control Bar */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-headline font-bold text-[16px] sm:text-[18px] text-on-surface flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-tertiary shrink-0" />
            <span>Dokumen Verifikasi Resmi & Akreditasi Ekspor</span>
          </h3>
          <span className="font-mono text-[11px] text-outline">
            Menampilkan <strong className="text-on-surface">{filteredCerts.length}</strong> dari {certs.length} sertifikat
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-surface-container p-3 sm:p-3.5 rounded-2xl border border-outline-variant/30 shadow-md">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(['ALL', 'ACTIVE', 'AUDIT_PENDING'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-xl font-headline text-[11px] uppercase font-bold tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-tertiary-container text-on-tertiary-container shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {tab === 'ALL' ? 'Semua Sertifikat' : tab === 'ACTIVE' ? 'Terverifikasi Aktif' : 'Audit Pending'}
              </button>
            ))}
          </div>

          {/* Active Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-outline absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kode, judul, atau lembaga penguji..."
              className="w-full h-9 pl-9 pr-8 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface font-body text-[12px] placeholder:text-outline focus:outline-none focus:border-tertiary transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-outline hover:text-on-surface"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Section 1: Active Certificates Grid */}
      {filteredCerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredCerts.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between gap-4 shadow-md hover:border-tertiary/50 transition-all group"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded font-mono text-[9px] bg-tertiary-container text-on-tertiary-container font-bold tracking-wide">
                    {c.code}
                  </span>
                  <span
                    className={`flex items-center gap-1 font-mono text-[10px] font-bold ${
                      c.status === 'ACTIVE' ? 'text-tertiary' : 'text-secondary'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{c.status === 'ACTIVE' ? 'TERVERIFIKASI' : 'AUDIT PENDING'}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-headline font-bold text-[15px] sm:text-[16px] text-on-surface line-clamp-1 group-hover:text-tertiary transition-colors">
                    {c.title}
                  </h3>
                  <span className="font-mono text-[11px] text-outline block mt-0.5">
                    Penerbit: <strong className="text-on-surface-variant font-normal">{c.issuer}</strong>
                  </span>
                </div>

                <p className="font-body text-[12px] text-on-surface-variant leading-relaxed line-clamp-2">
                  {c.scope}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-[11px] font-mono">
                <span className="text-outline">Tgl Uji: {c.testDate}</span>
                <div className="flex items-center gap-1.5">
                  {c.downloadUrl && (
                    <a
                      href={c.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-surface-container-high hover:bg-tertiary-container hover:text-on-tertiary-container text-outline hover:text-on-surface transition-all cursor-pointer"
                      title="Lihat Dokumen Asli"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setEditingCert(c)}
                    className="p-1.5 rounded-lg bg-surface-container-high hover:bg-tertiary-container hover:text-on-tertiary-container text-on-surface transition-all cursor-pointer"
                    title="Edit Dokumen"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCert(c.id, c.title)}
                    className="p-1.5 rounded-lg bg-surface-container-high hover:bg-error/20 text-outline hover:text-error transition-all cursor-pointer"
                    title="Hapus Sertifikat"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-surface-container rounded-2xl border border-outline-variant/30 flex flex-col items-center justify-center gap-2">
          <AlertCircle className="w-8 h-8 text-outline" />
          <span className="font-headline text-[14px] text-on-surface font-bold">Tidak ada sertifikat ditemukan</span>
          <p className="text-[12px] text-outline">Tidak ada sertifikat yang cocok dengan kata kunci &quot;{searchQuery}&quot;.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('ALL');
            }}
            className="mt-2 px-3.5 py-1.5 rounded-xl bg-surface-container-high text-tertiary font-headline text-xs font-bold"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Section 2: Lab Test Parameters Table */}
      <div className="flex flex-col gap-3 mt-2">
        <h3 className="font-headline font-bold text-[16px] text-on-surface flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-tertiary shrink-0" />
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

      {/* Modal: Unggah Sertifikat Baru */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[540px] bg-[#1C1815] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-tertiary" />
                <h3 className="font-headline font-bold text-[17px] text-on-surface">
                  Unggah Dokumen Sertifikasi Resmi Baru
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-outline hover:text-on-surface p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCert} className="flex flex-col gap-3.5 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase font-semibold">Nomor Kode Dokumen *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. SGS-ID-SH2026-092"
                    value={newCert.code}
                    onChange={(e) => setNewCert({ ...newCert, code: e.target.value })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-tertiary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase font-semibold">Status Validasi</label>
                  <select
                    value={newCert.status}
                    onChange={(e) => setNewCert({ ...newCert, status: e.target.value as CertDoc['status'] })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-tertiary"
                  >
                    <option value="ACTIVE">ACTIVE (Terverifikasi)</option>
                    <option value="AUDIT_PENDING">AUDIT PENDING (Menunggu Audit)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase font-semibold">Judul Sertifikat Lengkap *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sucofindo Moisture & Heavy Metal Analysis Report"
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-tertiary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase font-semibold">Lembaga Penguji / Penerbit</label>
                  <input
                    type="text"
                    placeholder="e.g. PT Sucofindo (Persero)"
                    value={newCert.issuer}
                    onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-tertiary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase font-semibold">Tanggal Uji / Berlaku</label>
                  <input
                    type="text"
                    placeholder="e.g. 24 Oktober 2026"
                    value={newCert.testDate}
                    onChange={(e) => setNewCert({ ...newCert, testDate: e.target.value })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-tertiary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase font-semibold">Lingkup & Ruang Pengujian (Scope)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Proximate analysis, gross calorific value, and zero-odor burning verification."
                  value={newCert.scope}
                  onChange={(e) => setNewCert({ ...newCert, scope: e.target.value })}
                  className="p-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface resize-none focus:outline-none focus:border-tertiary"
                />
              </div>

              {/* Document File Upload */}
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="text-[10px] text-outline uppercase font-semibold">Lampiran Dokumen (PDF / Scan)</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingDoc}
                    className="px-3 py-2 rounded-lg bg-surface-container-high hover:bg-tertiary hover:text-on-tertiary text-on-surface font-headline text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingDoc ? 'Mengunggah ke Cloud...' : 'Pilih File Dokumen'}</span>
                  </button>
                  <span className="text-[11px] text-outline truncate max-w-[240px]">
                    {newCert.downloadUrl ? 'Dokumen cloud terhubung' : 'Belum ada file dipilih'}
                  </span>
                </div>
                {newCert.downloadUrl && (
                  <input
                    type="text"
                    value={newCert.downloadUrl}
                    onChange={(e) => setNewCert({ ...newCert, downloadUrl: e.target.value })}
                    className="h-8 px-2.5 bg-surface-container border border-outline-variant/20 rounded-lg text-tertiary text-[11px]"
                  />
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-headline text-xs font-bold transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploadingDoc}
                  className="px-5 py-2.5 rounded-xl bg-tertiary-container text-on-tertiary-container font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#3F7B5E]/90 disabled:opacity-50 transition-all shadow-md"
                >
                  Simpan & Terbitkan Sertifikat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Sertifikat */}
      {editingCert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[520px] bg-[#1C1815] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <h3 className="font-headline font-bold text-[16px] text-on-surface">
                Ubah Dokumen: {editingCert.code}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="text-outline hover:text-on-surface p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="flex flex-col gap-3 font-mono text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase font-semibold">Judul Sertifikat</label>
                <input
                  type="text"
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-tertiary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase font-semibold">Lembaga Penguji</label>
                  <input
                    type="text"
                    value={editingCert.issuer}
                    onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-tertiary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase font-semibold">Status Validasi</label>
                  <select
                    value={editingCert.status}
                    onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value as CertDoc['status'] })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-tertiary"
                  >
                    <option value="ACTIVE">ACTIVE (Terverifikasi)</option>
                    <option value="AUDIT_PENDING">AUDIT PENDING</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase font-semibold">Lingkup Pengujian</label>
                <textarea
                  rows={2}
                  value={editingCert.scope}
                  onChange={(e) => setEditingCert({ ...editingCert, scope: e.target.value })}
                  className="p-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface resize-none focus:outline-none focus:border-tertiary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase font-semibold">URL Dokumen / File</label>
                <input
                  type="text"
                  value={editingCert.downloadUrl}
                  onChange={(e) => setEditingCert({ ...editingCert, downloadUrl: e.target.value })}
                  className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-tertiary"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-headline text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-tertiary-container text-on-tertiary-container font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#3F7B5E]/90 transition-all shadow-md"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
