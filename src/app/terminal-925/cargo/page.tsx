'use client';

import React, { useState } from 'react';
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
  X
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
  const [editingRoute, setEditingRoute] = useState<RouteItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleSaveRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoute) return;

    setRoutes((prev) =>
      prev.map((r) => (r.id === editingRoute.id ? editingRoute : r))
    );
    setEditingRoute(null);
    showToast(`Tarif dan slot rute "${editingRoute.destination}" berhasil diperbarui!`);
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-6 sm:gap-8">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 p-3.5 px-5 rounded-xl bg-secondary text-on-secondary font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Ship className="w-5 h-5 text-secondary" />
            <h1 className="font-headline font-bold text-[22px] text-on-surface uppercase tracking-tight">
              Kargo, Kontainer & Ocean Freight Rates
            </h1>
          </div>
          <span className="font-mono text-[11px] text-outline">
            Port of Loading Utama: Tanjung Perak, Surabaya (SUB) & Tanjung Priok, Jakarta (JKT)
          </span>
        </div>

        <button
          type="button"
          onClick={() => showToast('Penambahan rute baru dibuka (Simulasi)')}
          className="px-4 py-2 rounded-xl bg-secondary-container text-on-secondary-container font-headline text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#8F3600]/80 transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Rute Maritim</span>
        </button>
      </div>

      {/* Section 1: Standard Container Specs Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

      {/* Section 2: Global Shipping Routes Table */}
      <div className="flex flex-col gap-3">
        <h3 className="font-headline font-bold text-[16px] text-on-surface flex items-center gap-2">
          <Anchor className="w-4 h-4 text-secondary" />
          <span>Rute Freight Maritim Internasional & Kuota Booking</span>
        </h3>

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
                {routes.map((r) => (
                  <tr key={r.id} className="hover:bg-surface-container-high/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-headline font-bold text-on-surface text-[13px]">{r.destination}</div>
                      <div className="text-outline text-[11px]">{r.port}</div>
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant">{r.country}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-on-surface">
                        <Clock className="w-3.5 h-3.5 text-outline" />
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
                      <button
                        type="button"
                        onClick={() => setEditingRoute(r)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high hover:bg-secondary-container hover:text-on-secondary-container text-on-surface font-headline text-[11px] font-bold transition-all cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit Tarif</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Route Modal */}
      {editingRoute && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[500px] bg-[#1C1815] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <h3 className="font-headline font-bold text-[16px] text-on-surface">
                Ubah Tarif: {editingRoute.destination}
              </h3>
              <button
                onClick={() => setEditingRoute(null)}
                className="text-outline hover:text-on-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoute} className="flex flex-col gap-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase">Tarif 20ft FCL (USD)</label>
                  <input
                    type="number"
                    value={editingRoute.rate20ft}
                    onChange={(e) => setEditingRoute({ ...editingRoute, rate20ft: Number(e.target.value) })}
                    className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase">Tarif 40ft HC (USD)</label>
                  <input
                    type="number"
                    value={editingRoute.rate40hc}
                    onChange={(e) => setEditingRoute({ ...editingRoute, rate40hc: Number(e.target.value) })}
                    className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-secondary font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase">Estimasi Transit (Hari)</label>
                  <input
                    type="number"
                    value={editingRoute.transitDays}
                    onChange={(e) => setEditingRoute({ ...editingRoute, transitDays: Number(e.target.value) })}
                    className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase">Slot Ready (Kontainer)</label>
                  <input
                    type="number"
                    value={editingRoute.availableSlots}
                    onChange={(e) => setEditingRoute({ ...editingRoute, availableSlots: Number(e.target.value) })}
                    className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setEditingRoute(null)}
                  className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-headline text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-secondary-container text-on-secondary-container font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#8F3600]/80 transition-all"
                >
                  Simpan Tarif Rute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
