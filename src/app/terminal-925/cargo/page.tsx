'use client';

import React, { useState, useEffect } from 'react';
import {
  Ship,
  Container,
  DollarSign,
  Clock,
  CheckCircle2,
  Edit2,
  Plus,
  Compass,
  AlertCircle,
  Anchor,
  TrendingDown,
  TrendingUp,
  X,
  Search,
  Trash2,
  Filter,
  Check,
  RefreshCw,
} from 'lucide-react';

interface RouteItem {
  id: string;
  destination: string;
  port: string;
  country: string;
  transitDays: number;
  rate20ft: number;
  rate40hc: number;
  availableSlots: number;
  status: 'OPEN' | 'LIMITED' | 'FULL';
}

const CARGO_ROUTES_STORAGE_KEY = 'nusantara_cargo_routes_v1';

const INITIAL_ROUTES: RouteItem[] = [
  {
    id: 'rute-jebel-ali',
    destination: 'Jebel Ali, Dubai',
    port: 'Port of Jebel Ali (AEJEA)',
    country: 'United Arab Emirates',
    transitDays: 14,
    rate20ft: 950,
    rate40hc: 1450,
    availableSlots: 6,
    status: 'OPEN',
  },
  {
    id: 'rute-hamburg',
    destination: 'Hamburg, Jerman',
    port: 'Port of Hamburg (DEHAM)',
    country: 'Germany',
    transitDays: 28,
    rate20ft: 1800,
    rate40hc: 2850,
    availableSlots: 4,
    status: 'OPEN',
  },
  {
    id: 'rute-qingdao',
    destination: 'Qingdao, Tiongkok',
    port: 'Qingdao Port (CNQDG)',
    country: 'China',
    transitDays: 12,
    rate20ft: 650,
    rate40hc: 980,
    availableSlots: 8,
    status: 'OPEN',
  },
  {
    id: 'rute-jeddah',
    destination: 'Jeddah Islamic Port',
    port: 'Jeddah Port (SAJED)',
    country: 'Saudi Arabia',
    transitDays: 18,
    rate20ft: 1100,
    rate40hc: 1650,
    availableSlots: 2,
    status: 'LIMITED',
  },
  {
    id: 'rute-rotterdam',
    destination: 'Rotterdam, Belanda',
    port: 'Port of Rotterdam (NLRTM)',
    country: 'Netherlands',
    transitDays: 26,
    rate20ft: 1850,
    rate40hc: 2920,
    availableSlots: 5,
    status: 'OPEN',
  },
];

export default function CargoFreightManagerPage() {
  const [routes, setRoutes] = useState<RouteItem[]>(INITIAL_ROUTES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'LIMITED' | 'FULL'>('ALL');

  const [editingRoute, setEditingRoute] = useState<RouteItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');

  // Form state for creating a new route
  const [newRoute, setNewRoute] = useState<Omit<RouteItem, 'id'>>({
    destination: '',
    port: '',
    country: '',
    transitDays: 14,
    rate20ft: 950,
    rate40hc: 1450,
    availableSlots: 5,
    status: 'OPEN',
  });

  // Load persisted routes on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CARGO_ROUTES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRoutes(parsed);
          return;
        }
      }
      localStorage.setItem(CARGO_ROUTES_STORAGE_KEY, JSON.stringify(INITIAL_ROUTES));
    } catch (err) {
      console.warn('Failed to read routes from storage:', err);
    }
  }, []);

  const saveToStorage = (updatedRoutes: RouteItem[]) => {
    try {
      localStorage.setItem(CARGO_ROUTES_STORAGE_KEY, JSON.stringify(updatedRoutes));
    } catch (err) {
      console.warn('Failed to save routes to storage:', err);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  // Add Route Handler
  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoute.destination.trim() || !newRoute.country.trim()) {
      alert('Nama destinasi dan negara wajib diisi.');
      return;
    }

    const createdItem: RouteItem = {
      id: `rute-${Date.now()}`,
      destination: newRoute.destination.trim(),
      port: newRoute.port.trim() || `Port of ${newRoute.destination.trim()}`,
      country: newRoute.country.trim(),
      transitDays: Number(newRoute.transitDays) || 14,
      rate20ft: Number(newRoute.rate20ft) || 900,
      rate40hc: Number(newRoute.rate40hc) || 1400,
      availableSlots: Number(newRoute.availableSlots) || 4,
      status: newRoute.status,
    };

    const updated = [createdItem, ...routes];
    setRoutes(updated);
    saveToStorage(updated);
    setIsAddModalOpen(false);

    // Reset Form
    setNewRoute({
      destination: '',
      port: '',
      country: '',
      transitDays: 14,
      rate20ft: 950,
      rate40hc: 1450,
      availableSlots: 5,
      status: 'OPEN',
    });

    showToast(`Rute maritim "${createdItem.destination}" berhasil ditambahkan & tersimpan!`);
  };

  // Save Edited Route Handler
  const handleSaveRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoute) return;

    const updated = routes.map((r) => (r.id === editingRoute.id ? editingRoute : r));
    setRoutes(updated);
    saveToStorage(updated);
    setEditingRoute(null);
    showToast(`Tarif dan slot rute "${editingRoute.destination}" berhasil diperbarui!`);
  };

  // Delete Route Handler
  const handleDeleteRoute = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus rute tujuan "${name}" dari daftar pengiriman maritim?`)) {
      const updated = routes.filter((r) => r.id !== id);
      setRoutes(updated);
      saveToStorage(updated);
      showToast(`Rute "${name}" berhasil dihapus.`);
    }
  };

  // Active Live Filtering
  const filteredRoutes = routes.filter((r) => {
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchDest = r.destination.toLowerCase().includes(q);
      const matchPort = r.port.toLowerCase().includes(q);
      const matchCountry = r.country.toLowerCase().includes(q);
      if (!matchDest && !matchPort && !matchCountry) return false;
    }
    return true;
  });

  return (
    <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-6 sm:gap-8 pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 p-3.5 px-5 rounded-xl bg-secondary text-on-secondary font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Ship className="w-5 h-5 text-secondary" />
            <h1 className="font-headline font-bold text-[20px] sm:text-[22px] text-on-surface uppercase tracking-tight">
              Kargo, Kontainer & Ocean Freight Rates
            </h1>
          </div>
          <span className="font-mono text-[11px] text-outline">
            Port of Loading Utama: Tanjung Perak, Surabaya (SUB) & Tanjung Priok, Jakarta (JKT)
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-secondary-container text-on-secondary-container font-headline text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#8F3600]/90 transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Rute Maritim</span>
        </button>
      </div>

      {/* Section 1: Standard Container Specs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Container className="w-5 h-5 text-secondary" />
              <h3 className="font-headline font-bold text-[16px] text-on-surface">
                Kontainer 20ft Standard FCL
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded font-mono text-[9px] bg-tertiary-container text-on-tertiary-container font-bold">
              AKTIF
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
            <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
              <span className="text-[9px] text-outline block">VOLUME</span>
              <strong className="text-on-surface text-[13px]">33.2 CBM</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
              <span className="text-[9px] text-outline block">NET PAYLOAD</span>
              <strong className="text-secondary text-[13px]">18.0 MT</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
              <span className="text-[9px] text-outline block">KARTON (25KG)</span>
              <strong className="text-on-surface text-[13px]">720 Box</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
              <span className="text-[9px] text-outline block">PALLET STD</span>
              <strong className="text-on-surface text-[13px]">10 Pallet</strong>
            </div>
          </div>
          <p className="font-body text-[12px] text-outline">
            Rekomendasi untuk pesanan trial buyer GCC atau komoditas dengan densitas tinggi seperti Biji Kopi dan Cengkeh.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Container className="w-5 h-5 text-primary" />
              <h3 className="font-headline font-bold text-[16px] text-on-surface">
                Kontainer 40ft High Cube (HC)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded font-mono text-[9px] bg-tertiary-container text-on-tertiary-container font-bold">
              PREMIUM FCL
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
            <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
              <span className="text-[9px] text-outline block">VOLUME</span>
              <strong className="text-on-surface text-[13px]">76.4 CBM</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
              <span className="text-[9px] text-outline block">NET PAYLOAD</span>
              <strong className="text-primary text-[13px]">26.0 MT</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
              <span className="text-[9px] text-outline block">KARTON (25KG)</span>
              <strong className="text-on-surface text-[13px]">1,040 Box</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
              <span className="text-[9px] text-outline block">PALLET EURO</span>
              <strong className="text-on-surface text-[13px]">20 Pallet</strong>
            </div>
          </div>
          <p className="font-body text-[12px] text-outline">
            Armada utama pengiriman volume besar ke Eropa & Timur Tengah dengan efisiensi biaya freight per kilogram paling optimal.
          </p>
        </div>
      </div>

      {/* Section 2: Global Shipping Routes Table & Active Search Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-headline font-bold text-[16px] sm:text-[18px] text-on-surface flex items-center gap-2">
            <Anchor className="w-4 h-4 text-secondary shrink-0" />
            <span>Rute Freight Maritim Internasional & Kuota Booking</span>
          </h3>
          <span className="font-mono text-[11px] text-outline">
            Menampilkan <strong className="text-on-surface">{filteredRoutes.length}</strong> dari {routes.length} rute pelabuhan
          </span>
        </div>

        {/* Active Search & Status Filter Control Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-surface-container p-3 sm:p-3.5 rounded-2xl border border-outline-variant/30 shadow-md">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(['ALL', 'OPEN', 'LIMITED', 'FULL'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-xl font-headline text-[11px] uppercase font-bold tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-secondary-container text-on-secondary-container shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {tab === 'ALL' ? 'Semua Status' : tab}
              </button>
            ))}
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-outline absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari rute, pelabuhan, atau negara..."
              className="w-full h-9 pl-9 pr-8 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface font-body text-[12px] placeholder:text-outline focus:outline-none focus:border-secondary transition-colors"
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

        {/* Routes Table */}
        <div className="w-full bg-surface-container rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xl">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left font-body text-[13px] text-on-surface">
              <thead>
                <tr className="bg-surface-container-high font-headline text-[11px] text-outline uppercase tracking-wider border-b border-outline-variant/30">
                  <th className="py-3 px-4 font-bold">Destinasi & Pelabuhan</th>
                  <th className="py-3 px-4 font-bold">Negara</th>
                  <th className="py-3 px-4 font-bold">Transit Time</th>
                  <th className="py-3 px-4 font-bold">Tarif 20ft FCL</th>
                  <th className="py-3 px-4 font-bold">Tarif 40ft HC</th>
                  <th className="py-3 px-4 font-bold">Slot Ready</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-mono text-[12px]">
                {filteredRoutes.length > 0 ? (
                  filteredRoutes.map((r) => (
                    <tr key={r.id} className="hover:bg-surface-container-high/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-headline font-bold text-on-surface text-[13px]">{r.destination}</div>
                        <div className="text-outline text-[11px]">{r.port}</div>
                      </td>
                      <td className="py-3.5 px-4 text-on-surface-variant">{r.country}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-on-surface">
                          <Clock className="w-3.5 h-3.5 text-outline shrink-0" />
                          <span>{r.transitDays} Hari</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-on-surface">${r.rate20ft}</td>
                      <td className="py-3.5 px-4 font-bold text-secondary">${r.rate40hc}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-on-surface">{r.availableSlots} Kontainer</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            r.status === 'OPEN'
                              ? 'bg-tertiary-container text-on-tertiary-container'
                              : r.status === 'LIMITED'
                              ? 'bg-secondary-container text-on-secondary-container'
                              : 'bg-error/20 text-error'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingRoute(r)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-secondary-container hover:text-on-secondary-container text-on-surface font-headline text-[11px] font-bold transition-all cursor-pointer"
                            title="Edit Tarif & Slot Rute"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteRoute(r.id, r.destination)}
                            className="p-1 rounded-lg bg-surface-container-high hover:bg-error/20 text-outline hover:text-error transition-all cursor-pointer"
                            title="Hapus Rute"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-outline">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertCircle className="w-6 h-6 text-outline" />
                        <span className="font-headline text-[13px] text-on-surface">Tidak ada rute yang cocok</span>
                        <p className="text-[11px] text-outline">Coba ubah kata kunci pencarian atau filter status Anda.</p>
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="mt-2 px-3 py-1 bg-surface-container-high text-secondary rounded-lg font-headline text-[11px] font-bold"
                          >
                            Reset Pencarian
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Tambah Rute Maritim Baru */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[540px] bg-[#1C1815] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <Ship className="w-5 h-5 text-secondary" />
                <h3 className="font-headline font-bold text-[17px] text-on-surface">
                  Tambah Rute Maritim Ekspor Baru
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

            <form onSubmit={handleAddRoute} className="flex flex-col gap-3.5 font-mono text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase font-semibold">Nama Destinasi & Kota Tujuan *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Port Klang, Kuala Lumpur"
                  value={newRoute.destination}
                  onChange={(e) => setNewRoute({ ...newRoute, destination: e.target.value })}
                  className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase font-semibold">Nama / Kode Pelabuhan</label>
                  <input
                    type="text"
                    placeholder="e.g. Northport (MYPKG)"
                    value={newRoute.port}
                    onChange={(e) => setNewRoute({ ...newRoute, port: e.target.value })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase font-semibold">Negara Tujuan *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Malaysia"
                    value={newRoute.country}
                    onChange={(e) => setNewRoute({ ...newRoute, country: e.target.value })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase font-semibold">Tarif 20ft FCL (USD)</label>
                  <input
                    required
                    type="number"
                    min="100"
                    placeholder="e.g. 850"
                    value={newRoute.rate20ft}
                    onChange={(e) => setNewRoute({ ...newRoute, rate20ft: Number(e.target.value) })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase font-semibold">Tarif 40ft HC (USD)</label>
                  <input
                    required
                    type="number"
                    min="100"
                    placeholder="e.g. 1350"
                    value={newRoute.rate40hc}
                    onChange={(e) => setNewRoute({ ...newRoute, rate40hc: Number(e.target.value) })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-secondary font-bold focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase font-semibold">Estimasi Waktu Transit (Hari)</label>
                  <input
                    required
                    type="number"
                    min="1"
                    placeholder="e.g. 12"
                    value={newRoute.transitDays}
                    onChange={(e) => setNewRoute({ ...newRoute, transitDays: Number(e.target.value) })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase font-semibold">Slot Tersedia (Kontainer)</label>
                  <input
                    required
                    type="number"
                    min="0"
                    placeholder="e.g. 6"
                    value={newRoute.availableSlots}
                    onChange={(e) => setNewRoute({ ...newRoute, availableSlots: Number(e.target.value) })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase font-semibold">Status Slot Booking</label>
                <select
                  value={newRoute.status}
                  onChange={(e) => setNewRoute({ ...newRoute, status: e.target.value as RouteItem['status'] })}
                  className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-secondary"
                >
                  <option value="OPEN">OPEN (Slot Siap Booking)</option>
                  <option value="LIMITED">LIMITED (Slot Terbatas)</option>
                  <option value="FULL">FULL (Alokasi Penuh)</option>
                </select>
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
                  className="px-5 py-2.5 rounded-xl bg-secondary-container text-on-secondary-container font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#8F3600]/90 transition-all shadow-md"
                >
                  Simpan Rute Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Rute & Tarif */}
      {editingRoute && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[520px] bg-[#1C1815] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <h3 className="font-headline font-bold text-[16px] text-on-surface">
                Ubah Tarif & Kuota: {editingRoute.destination}
              </h3>
              <button
                type="button"
                onClick={() => setEditingRoute(null)}
                className="text-outline hover:text-on-surface p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoute} className="flex flex-col gap-3 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase">Destinasi</label>
                  <input
                    type="text"
                    value={editingRoute.destination}
                    onChange={(e) => setEditingRoute({ ...editingRoute, destination: e.target.value })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase">Negara</label>
                  <input
                    type="text"
                    value={editingRoute.country}
                    onChange={(e) => setEditingRoute({ ...editingRoute, country: e.target.value })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase">Tarif 20ft FCL (USD)</label>
                  <input
                    type="number"
                    value={editingRoute.rate20ft}
                    onChange={(e) => setEditingRoute({ ...editingRoute, rate20ft: Number(e.target.value) })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase">Tarif 40ft HC (USD)</label>
                  <input
                    type="number"
                    value={editingRoute.rate40hc}
                    onChange={(e) => setEditingRoute({ ...editingRoute, rate40hc: Number(e.target.value) })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-secondary font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase">Estimasi Transit (Hari)</label>
                  <input
                    type="number"
                    value={editingRoute.transitDays}
                    onChange={(e) => setEditingRoute({ ...editingRoute, transitDays: Number(e.target.value) })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase">Slot Ready (Kontainer)</label>
                  <input
                    type="number"
                    value={editingRoute.availableSlots}
                    onChange={(e) => setEditingRoute({ ...editingRoute, availableSlots: Number(e.target.value) })}
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase">Status Alokasi Slot</label>
                <select
                  value={editingRoute.status}
                  onChange={(e) => setEditingRoute({ ...editingRoute, status: e.target.value as RouteItem['status'] })}
                  className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface"
                >
                  <option value="OPEN">OPEN (Slot Siap Booking)</option>
                  <option value="LIMITED">LIMITED (Slot Terbatas)</option>
                  <option value="FULL">FULL (Alokasi Penuh)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingRoute(null)}
                  className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-headline text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-secondary-container text-on-secondary-container font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#8F3600]/90 transition-all"
                >
                  Simpan Perubahan Tarif
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
