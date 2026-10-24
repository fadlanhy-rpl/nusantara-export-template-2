'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Check,
  Video,
  Image as ImageIcon,
  Flame,
  CheckCircle2,
  Eye,
  FileText,
  DollarSign,
  Package,
  X,
  Sparkles
} from 'lucide-react';

interface CommodityItem {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  hsCode: string;
  fobPrice: string;
  moq: string;
  image: string;
  videoUrl: string;
  status: 'ACTIVE' | 'DRAFT';
  specs: {
    label: string;
    value: string;
  }[];
}

const INITIAL_COMMODITIES: CommodityItem[] = [
  {
    id: 'briket-kelapa',
    name: 'Briket Arang Batok Kelapa 100% Murni',
    nameEn: '100% Pure Coconut Shell Charcoal Briquettes',
    category: 'Coconut Charcoal',
    hsCode: '4402.90.10',
    fobPrice: '$1,320 / MT',
    moq: '1x 20ft FCL (18 MT)',
    image: '/img/shisha-charcoal-cutout.png',
    videoUrl: 'https://youtube.com/watch?v=kiln-retort-demo',
    status: 'ACTIVE',
    specs: [
      { label: 'Kadar Abu (Ash)', value: '< 2.2% Snow White' },
      { label: 'Nilai Kalori', value: '7,500 kcal/kg' },
      { label: 'Kadar Air (Moisture)', value: '< 5.0%' },
      { label: 'Durasi Bakar', value: '2.5 Jam Konsisten' },
    ],
  },
  {
    id: 'green-coffee',
    name: 'Biji Kopi Mentah Hijau (Green Coffee Beans)',
    nameEn: 'Indonesian Specialty Green Coffee Beans',
    category: 'Specialty Coffee',
    hsCode: '0901.11.00',
    fobPrice: '$4,850 / MT',
    moq: '1x 20ft FCL (19.2 MT)',
    image: '/img/green-coffee-cutout.png',
    videoUrl: 'https://youtube.com/watch?v=coffee-cupping-demo',
    status: 'ACTIVE',
    specs: [
      { label: 'Grade & Sortasi', value: 'Grade 1 Double-Picked' },
      { label: 'Kadar Air', value: '11.5% - 12.0%' },
      { label: 'Defect Rate', value: '< 2.5%' },
      { label: 'Varietas', value: 'Arabica Gayo & Mandheling' },
    ],
  },
  {
    id: 'whole-spices-cloves',
    name: 'Cengkeh Kering Pilihan (Whole Cloves Maluku)',
    nameEn: 'Premium Grade Whole Cloves (Lal Pari)',
    category: 'Agriculture Spices',
    hsCode: '0907.10.00',
    fobPrice: '$9,200 / MT',
    moq: '1x 20ft FCL (11 MT)',
    image: '/img/assets/cloves.webp',
    videoUrl: 'https://youtube.com/watch?v=cloves-sorting-demo',
    status: 'ACTIVE',
    specs: [
      { label: 'Kadar Minyak Atsiri', value: '19.0% - 21.0%' },
      { label: 'Kadar Air', value: '10.5% - 11.0%' },
      { label: 'Headless Cloves', value: '< 1.0%' },
      { label: 'Warna', value: 'Cokelat Kemerahan Alami' },
    ],
  },
];

export default function CatalogMediaManagerPage() {
  const [commodities, setCommodities] = useState<CommodityItem[]>(INITIAL_COMMODITIES);
  const [editingItem, setEditingItem] = useState<CommodityItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleToggleStatus = (id: string) => {
    setCommodities((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'ACTIVE' ? 'DRAFT' : 'ACTIVE' }
          : item
      )
    );
    showToast('Status publikasi komoditas berhasil diperbarui!');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setCommodities((prev) =>
      prev.map((c) => (c.id === editingItem.id ? editingItem : c))
    );
    setEditingItem(null);
    showToast(`Komoditas "${editingItem.name}" berhasil diperbarui!`);
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-6 sm:gap-8">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 p-3.5 px-5 rounded-xl bg-primary text-on-primary font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h1 className="font-headline font-bold text-[22px] text-on-surface uppercase tracking-tight">
              Manajemen Katalog Komoditas & Media Showcase
            </h1>
          </div>
          <span className="font-mono text-[11px] text-outline">
            Kelola spesifikasi lab ekspor, foto produk, video kiln showcase, dan tarif acuan FOB.
          </span>
        </div>

        <button
          type="button"
          onClick={() => showToast('Form penambahan komoditas baru dibuka (Simulasi)')}
          className="px-4 py-2 rounded-xl bg-primary-container text-on-primary-container font-headline text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#D94E13] transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Komoditas</span>
        </button>
      </div>

      {/* Commodity Items Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {commodities.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between gap-5 shadow-xl transition-all hover:border-primary/40 relative overflow-hidden"
          >
            {/* Top Media Showcase Box */}
            <div className="flex flex-col gap-3">
              <div className="w-full h-44 rounded-xl bg-[#120D0A] border border-outline-variant/20 relative flex items-center justify-center overflow-hidden p-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={180}
                  height={150}
                  className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform"
                />
                <span
                  className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                    item.status === 'ACTIVE'
                      ? 'bg-tertiary-container text-on-tertiary-container'
                      : 'bg-outline-variant/40 text-outline'
                  }`}
                >
                  {item.status === 'ACTIVE' ? 'PUBLISHED' : 'DRAFT'}
                </span>
                <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded font-mono text-[9px] bg-surface-container-high/80 text-outline">
                  HS {item.hsCode}
                </span>
              </div>

              {/* Title & Category */}
              <div>
                <span className="font-mono text-[10px] text-secondary font-bold uppercase">
                  {item.category}
                </span>
                <h3 className="font-headline font-bold text-[15px] text-on-surface line-clamp-1">
                  {item.name}
                </h3>
                <span className="font-body text-[11px] text-outline line-clamp-1 italic">
                  {item.nameEn}
                </span>
              </div>

              {/* Pricing & MOQ Badges */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 font-mono text-[11px]">
                <div>
                  <span className="text-[9px] text-outline block">ACUAN FOB:</span>
                  <strong className="text-primary font-bold">{item.fobPrice}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-outline block">MIN. ORDER:</span>
                  <strong className="text-on-surface font-bold">{item.moq}</strong>
                </div>
              </div>

              {/* Lab Specs Preview */}
              <div className="flex flex-col gap-1 text-[11px] font-mono border-t border-outline-variant/20 pt-2.5">
                <span className="text-[9px] text-outline uppercase font-bold">Spesifikasi Lab Utama:</span>
                {item.specs.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between text-on-surface-variant">
                    <span>{s.label}:</span>
                    <strong className="text-on-surface">{s.value}</strong>
                  </div>
                ))}
              </div>

              {/* Video Link Indicator */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-high/50 text-[10px] font-mono text-outline">
                <Video className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">Media Reel: {item.videoUrl}</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => handleToggleStatus(item.id)}
                className={`px-2.5 py-1.5 rounded-lg font-mono text-[10px] font-bold transition-all cursor-pointer ${
                  item.status === 'ACTIVE'
                    ? 'bg-outline-variant/30 text-outline hover:text-on-surface'
                    : 'bg-tertiary-container text-on-tertiary-container'
                }`}
              >
                {item.status === 'ACTIVE' ? 'Nonaktifkan' : 'Aktifkan'}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setEditingItem(item)}
                  className="p-1.5 rounded-lg bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface transition-all cursor-pointer"
                  title="Edit Data & Media"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => showToast(`Komoditas "${item.name}" dihapus (Simulasi)`)}
                  className="p-1.5 rounded-lg bg-surface-container-high hover:bg-error/20 text-outline hover:text-error transition-all cursor-pointer"
                  title="Hapus Komoditas"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[560px] bg-[#1C1815] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <h3 className="font-headline font-bold text-[16px] text-on-surface">
                Edit Komoditas & Media: {editingItem.name}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-outline hover:text-on-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="flex flex-col gap-3 font-mono text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase">Nama Komoditas (ID)</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase">Harga FOB / MT</label>
                  <input
                    type="text"
                    value={editingItem.fobPrice}
                    onChange={(e) => setEditingItem({ ...editingItem, fobPrice: e.target.value })}
                    className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-primary font-bold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-outline uppercase">Minimum Order (MOQ)</label>
                  <input
                    type="text"
                    value={editingItem.moq}
                    onChange={(e) => setEditingItem({ ...editingItem, moq: e.target.value })}
                    className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase">Path Gambar Produk (Asset URL)</label>
                <input
                  type="text"
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-outline uppercase">Video Showcase URL (Kiln Reel)</label>
                <input
                  type="text"
                  value={editingItem.videoUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, videoUrl: e.target.value })}
                  className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-headline text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#D94E13] transition-all"
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
