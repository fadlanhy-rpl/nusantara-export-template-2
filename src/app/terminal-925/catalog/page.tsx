'use client';

import React, { useState, useRef } from 'react';
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
  Sparkles,
  Upload,
  Crop,
  RotateCw,
  Box,
  Sliders,
  HelpCircle,
  Info,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from 'lucide-react';
import ImageCropperModal from '@/components/admin/ImageCropperModal';
import Commodity3DPreview from '@/components/admin/Commodity3DPreview';

export interface Commodity3DConfig {
  enabled: boolean;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  shapePreset: 'cube' | 'hexagonal' | 'cylinder' | 'pillow' | 'custom';
  autoRotate: boolean;
  rotationSpeed: number; // 0.2 to 3.0
  surfaceFinish: 'matte_charcoal' | 'porous_texture' | 'white_ash' | 'polished_agro';
  lightingIntensity: number; // 0.5 to 2.5
  cameraDistance: number; // 2.0 to 6.0
}

export interface CommodityItem {
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
  model3d?: Commodity3DConfig;
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
    model3d: {
      enabled: true,
      shapePreset: 'cube',
      autoRotate: true,
      rotationSpeed: 1.0,
      surfaceFinish: 'matte_charcoal',
      lightingIntensity: 1.2,
      cameraDistance: 3.8,
    },
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
    model3d: {
      enabled: true,
      shapePreset: 'pillow',
      autoRotate: true,
      rotationSpeed: 0.8,
      surfaceFinish: 'polished_agro',
      lightingIntensity: 1.1,
      cameraDistance: 4.2,
    },
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
    model3d: {
      enabled: false,
      shapePreset: 'cylinder',
      autoRotate: false,
      rotationSpeed: 1.0,
      surfaceFinish: 'porous_texture',
      lightingIntensity: 1.0,
      cameraDistance: 3.8,
    },
  },
];

export default function CatalogMediaManagerPage() {
  const [commodities, setCommodities] = useState<CommodityItem[]>(INITIAL_COMMODITIES);
  const [editingItem, setEditingItem] = useState<CommodityItem | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'image' | '3d' | 'specs'>('info');
  const [toastMsg, setToastMsg] = useState<string>('');

  // Image Cropper States
  const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
  const [tempImageForCrop, setTempImageForCrop] = useState<string>('');
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  // 3D Asset Upload States
  const [isUploading3D, setIsUploading3D] = useState<boolean>(false);
  const [show3DGuide, setShow3DGuide] = useState<boolean>(false);
  const model3dFileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
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

  const handleDeleteCommodity = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus komoditas "${name}" dari katalog?`)) {
      setCommodities((prev) => prev.filter((item) => item.id !== id));
      showToast(`Komoditas "${name}" berhasil dihapus dari katalog.`);
    }
  };

  const handleCreateNewCommodity = () => {
    const newItem: CommodityItem = {
      id: `commodity-${Date.now()}`,
      name: 'Komoditas Ekspor Baru',
      nameEn: 'New Export Commodity Item',
      category: 'Coconut Charcoal',
      hsCode: '4402.90.00',
      fobPrice: '$1,200 / MT',
      moq: '1x 20ft FCL',
      image: '/img/shisha-charcoal-cutout.png',
      videoUrl: '',
      status: 'DRAFT',
      specs: [
        { label: 'Kadar Abu (Ash)', value: '< 2.5%' },
        { label: 'Nilai Kalori', value: '7,200 kcal/kg' },
        { label: 'Kadar Air', value: '< 6.0%' },
        { label: 'Warna Abu', value: 'White / Light Grey' },
      ],
      model3d: {
        enabled: true,
        shapePreset: 'cube',
        autoRotate: true,
        rotationSpeed: 1.0,
        surfaceFinish: 'matte_charcoal',
        lightingIntensity: 1.2,
        cameraDistance: 3.8,
      },
    };
    setEditingItem(newItem);
    setActiveTab('info');
  };

  // ----------------------------------------------------
  // IMAGE UPLOAD & CROPPER HANDLERS
  // ----------------------------------------------------
  const handleTriggerImageSelect = () => {
    imageFileInputRef.current?.click();
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file gambar melebihi batas 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setTempImageForCrop(reader.result);
        setIsCropperOpen(true);
      }
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be picked again if desired
    e.target.value = '';
  };

  const handleCropComplete = async (croppedBlob: Blob, previewUrl: string) => {
    setIsCropperOpen(false);
    if (!editingItem) return;

    setIsUploadingImage(true);
    try {
      // Create FormData to upload cropped image to /api/v1/upload
      const formData = new FormData();
      formData.append('file', croppedBlob, `crop_${Date.now()}.webp`);
      formData.append('type', 'image');

      const res = await fetch('/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setEditingItem({
          ...editingItem,
          image: data.url,
        });
        showToast('Gambar produk berhasil dipotong & diunggah ke server!');
      } else {
        // Graceful fallback to data URL preview
        setEditingItem({
          ...editingItem,
          image: previewUrl,
        });
        showToast('Gambar dipotong (menggunakan data lokal cache).');
      }
    } catch (err) {
      console.error('Image upload failed, falling back to blob preview:', err);
      setEditingItem({
        ...editingItem,
        image: previewUrl,
      });
      showToast('Gambar berhasil disimpan secara lokal.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // ----------------------------------------------------
  // 3D MODEL ASSET UPLOAD HANDLERS
  // ----------------------------------------------------
  const handleTrigger3DSelect = () => {
    model3dFileInputRef.current?.click();
  };

  const process3DFile = async (file: File) => {
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    const allowed = ['.glb', '.gltf', '.obj'];

    if (!allowed.includes(ext)) {
      alert(`Format file 3D "${ext}" tidak didukung. Harap gunakan format .glb, .gltf, atau .obj.`);
      return;
    }

    if (file.size > 35 * 1024 * 1024) {
      alert(`Ukuran file 3D (${(file.size / 1024 / 1024).toFixed(1)} MB) melebihi batas maksimal 35 MB.`);
      return;
    }

    if (!editingItem) return;

    setIsUploading3D(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', '3d-model');

      const res = await fetch('/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        const prev3d = editingItem.model3d || {
          enabled: true,
          shapePreset: 'custom',
          autoRotate: true,
          rotationSpeed: 1.0,
          surfaceFinish: 'matte_charcoal',
          lightingIntensity: 1.2,
          cameraDistance: 3.8,
        };

        setEditingItem({
          ...editingItem,
          model3d: {
            ...prev3d,
            enabled: true,
            shapePreset: 'custom',
            fileUrl: data.url,
            fileName: file.name,
            fileSize: file.size,
          },
        });
        showToast(`Asset 3D "${file.name}" berhasil diunggah!`);
      } else {
        alert(data.error || 'Gagal mengunggah file 3D ke server.');
      }
    } catch (err) {
      console.error('3D model upload error:', err);
      alert('Terjadi kesalahan jaringan saat mengunggah file 3D.');
    } finally {
      setIsUploading3D(false);
    }
  };

  const handle3DFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      process3DFile(file);
    }
    e.target.value = '';
  };

  // Drag and Drop for 3D Upload
  const [isDragOver3D, setIsDragOver3D] = useState(false);

  const handle3DDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver3D(true);
  };

  const handle3DDragLeave = () => {
    setIsDragOver3D(false);
  };

  const handle3DDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver3D(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      process3DFile(file);
    }
  };

  const handleRemove3DAsset = () => {
    if (!editingItem || !editingItem.model3d) return;
    setEditingItem({
      ...editingItem,
      model3d: {
        ...editingItem.model3d,
        fileUrl: undefined,
        fileName: undefined,
        fileSize: undefined,
        shapePreset: 'cube', // fallback to procedural cube
      },
    });
    showToast('Asset file 3D dihapus. Menggunakan preset geometri standar.');
  };

  // ----------------------------------------------------
  // SAVE FORM
  // ----------------------------------------------------
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setCommodities((prev) => {
      const exists = prev.some((c) => c.id === editingItem.id);
      if (exists) {
        return prev.map((c) => (c.id === editingItem.id ? editingItem : c));
      } else {
        return [editingItem, ...prev];
      }
    });

    setEditingItem(null);
    showToast(`Komoditas "${editingItem.name}" berhasil disimpan ke sistem!`);
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-6 sm:gap-8 pb-12">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={imageFileInputRef}
        onChange={handleImageFileChange}
        accept="image/png,image/jpeg,image/webp,image/avif"
        className="hidden"
      />
      <input
        type="file"
        ref={model3dFileInputRef}
        onChange={handle3DFileChange}
        accept=".glb,.gltf,.obj"
        className="hidden"
      />

      {/* Interactive Crop Modal */}
      {isCropperOpen && (
        <ImageCropperModal
          isOpen={isCropperOpen}
          imageSrc={tempImageForCrop}
          onClose={() => setIsCropperOpen(false)}
          onCropComplete={handleCropComplete}
          initialAspectRatio={1}
        />
      )}

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 p-4 px-5 rounded-xl bg-primary text-on-primary font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-bounce border border-white/20">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
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
            Upload foto asli, crop interaktif transparan, upload asset 3D (.glb), setting material & lighting, serta spesifikasi lab ekspor.
          </span>
        </div>

        <button
          type="button"
          onClick={handleCreateNewCommodity}
          className="px-4 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-headline text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#D94E13] transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Komoditas Baru</span>
        </button>
      </div>

      {/* Commodity Items Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {commodities.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between gap-5 shadow-xl transition-all hover:border-primary/40 relative overflow-hidden"
          >
            {/* Top Media Showcase Box */}
            <div className="flex flex-col gap-3">
              <div className="w-full h-48 rounded-xl bg-[#120D0A] border border-outline-variant/20 relative flex items-center justify-center overflow-hidden p-4 group">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={160}
                  className="object-contain max-h-36 drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform"
                />

                {/* Top Badges */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  {item.model3d?.enabled && (
                    <span className="px-2 py-0.5 rounded-full font-mono text-[9px] font-bold bg-primary/20 text-primary border border-primary/30 flex items-center gap-1">
                      <Box className="w-2.5 h-2.5" />
                      <span>3D {item.model3d.shapePreset.toUpperCase()}</span>
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                      item.status === 'ACTIVE'
                        ? 'bg-tertiary-container text-on-tertiary-container'
                        : 'bg-outline-variant/40 text-outline'
                    }`}
                  >
                    {item.status === 'ACTIVE' ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>

                <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded font-mono text-[9px] bg-surface-container-high/80 text-outline border border-outline-variant/20">
                  HS {item.hsCode}
                </span>

                {/* Quick Edit Overlay on Image Hover */}
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(item);
                    setActiveTab('image');
                  }}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-on-surface font-mono text-[11px] font-bold"
                >
                  <Crop className="w-5 h-5 text-primary" />
                  <span>Crop / Ganti Foto</span>
                </button>
              </div>

              {/* Title & Category */}
              <div>
                <span className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider">
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
                {item.specs.slice(0, 3).map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between text-on-surface-variant">
                    <span>{s.label}:</span>
                    <strong className="text-on-surface">{s.value}</strong>
                  </div>
                ))}
              </div>

              {/* 3D Model Status Indicator */}
              {item.model3d?.enabled ? (
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-high/60 border border-outline-variant/20 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Box className="w-3.5 h-3.5" />
                    <span>3D Model: {item.model3d.shapePreset}</span>
                  </div>
                  <span className="text-outline">
                    {item.model3d.fileName ? item.model3d.fileName : 'Preset Geometri'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-surface-container-high/30 text-[10px] font-mono text-outline">
                  <Box className="w-3.5 h-3.5 opacity-50" />
                  <span>3D Interactive Nonaktif</span>
                </div>
              )}
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
                  onClick={() => {
                    setEditingItem(item);
                    setActiveTab('info');
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface transition-all cursor-pointer flex items-center gap-1 font-mono text-[11px]"
                  title="Edit Data, Foto & 3D Asset"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Kelola</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCommodity(item.id, item.name)}
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

      {/* Comprehensive Edit / Add Commodity Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 select-none">
          <div className="w-full max-w-[880px] h-[88vh] max-h-[740px] min-h-[580px] bg-[#1A1613] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
            {/* Modal Header - Fixed Top */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface-container-lowest">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-[16px] text-on-surface line-clamp-1">
                    {editingItem.name || 'Tambah Komoditas Baru'}
                  </h3>
                  <span className="font-mono text-[10px] text-outline">
                    ID: {editingItem.id} • HS Code: {editingItem.hsCode}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs - Consistent 4-Column Grid with Fixed Padding */}
            <div className="grid grid-cols-4 border-b border-outline-variant/30 bg-surface-container-low/80 shrink-0 font-mono text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`py-3.5 px-3 border-b-2 flex items-center justify-center gap-2 transition-all cursor-pointer text-center ${
                  activeTab === 'info'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-outline hover:text-on-surface hover:bg-white/5'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span className="truncate">1. Data Produk & FOB</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('image')}
                className={`py-3.5 px-3 border-b-2 flex items-center justify-center gap-2 transition-all cursor-pointer text-center ${
                  activeTab === 'image'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-outline hover:text-on-surface hover:bg-white/5'
                }`}
              >
                <Crop className="w-4 h-4 shrink-0" />
                <span className="truncate">2. Foto Produk & Crop</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('3d')}
                className={`py-3.5 px-3 border-b-2 flex items-center justify-center gap-2 transition-all cursor-pointer text-center ${
                  activeTab === '3d'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-outline hover:text-on-surface hover:bg-white/5'
                }`}
              >
                <Box className="w-4 h-4 shrink-0" />
                <span className="truncate">3. Asset 3D Studio</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`py-3.5 px-3 border-b-2 flex items-center justify-center gap-2 transition-all cursor-pointer text-center ${
                  activeTab === 'specs'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-outline hover:text-on-surface hover:bg-white/5'
                }`}
              >
                <Sliders className="w-4 h-4 shrink-0" />
                <span className="truncate">4. Spesifikasi & Video</span>
              </button>
            </div>

            {/* Modal Content Form Body - Smoothly Scrollable with Zero Scrollbar */}
            <form id="commodity-edit-form" onSubmit={handleSaveEdit} className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col gap-6">
              {/* TAB 1: General Info & FOB Pricing */}
              {activeTab === 'info' && (
                <div className="flex flex-col gap-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-outline uppercase font-bold">
                        Nama Komoditas (Bahasa Indonesia)
                      </label>
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="h-10 px-3.5 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:border-primary outline-none"
                        placeholder="Contoh: Briket Arang Batok Kelapa 100%"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-outline uppercase font-bold">
                        Nama Komoditas (English Export Name)
                      </label>
                      <input
                        type="text"
                        value={editingItem.nameEn}
                        onChange={(e) => setEditingItem({ ...editingItem, nameEn: e.target.value })}
                        className="h-10 px-3.5 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:border-primary outline-none"
                        placeholder="Example: 100% Pure Coconut Shell Briquettes"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-outline uppercase font-bold">Kategori Produk</label>
                      <select
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:border-primary outline-none"
                      >
                        <option value="Coconut Charcoal">Coconut Charcoal</option>
                        <option value="Specialty Coffee">Specialty Coffee</option>
                        <option value="Agriculture Spices">Agriculture Spices</option>
                        <option value="Agro Derivative">Agro Derivative</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-outline uppercase font-bold">HS Code Ekspor</label>
                      <input
                        type="text"
                        value={editingItem.hsCode}
                        onChange={(e) => setEditingItem({ ...editingItem, hsCode: e.target.value })}
                        className="h-10 px-3.5 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:border-primary outline-none"
                        placeholder="Contoh: 4402.90.10"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-outline uppercase font-bold">Status Publikasi</label>
                      <select
                        value={editingItem.status}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            status: e.target.value as 'ACTIVE' | 'DRAFT',
                          })
                        }
                        className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:border-primary outline-none"
                      >
                        <option value="ACTIVE">PUBLISHED (Tayang di Landingpage)</option>
                        <option value="DRAFT">DRAFT (Disimpan Rahasia)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-outline uppercase font-bold">
                        Tarif Acuan FOB / MT (USD)
                      </label>
                      <input
                        type="text"
                        value={editingItem.fobPrice}
                        onChange={(e) => setEditingItem({ ...editingItem, fobPrice: e.target.value })}
                        className="h-10 px-3.5 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-primary font-bold focus:border-primary outline-none"
                        placeholder="Contoh: $1,320 / MT"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-outline uppercase font-bold">
                        Minimum Order Quantity (MOQ)
                      </label>
                      <input
                        type="text"
                        value={editingItem.moq}
                        onChange={(e) => setEditingItem({ ...editingItem, moq: e.target.value })}
                        className="h-10 px-3.5 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:border-primary outline-none"
                        placeholder="Contoh: 1x 20ft FCL (18 MT)"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Image Upload & Interactive Cropper */}
              {activeTab === 'image' && (
                <div className="flex flex-col gap-5 font-mono text-xs">
                  {/* Current Image Preview & Actions */}
                  <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col sm:flex-row items-center gap-5">
                    <div className="w-36 h-36 rounded-xl bg-[#100C09] border border-outline-variant/20 flex items-center justify-center p-2 relative overflow-hidden shrink-0">
                      <Image
                        src={editingItem.image}
                        alt="Preview"
                        width={130}
                        height={130}
                        className="object-contain max-h-32 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-outline">
                        Active
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col gap-2.5 text-center sm:text-left">
                      <div>
                        <h4 className="font-headline font-bold text-sm text-on-surface">
                          Foto Cutout Transparan Produk
                        </h4>
                        <span className="text-[11px] text-outline block mt-0.5">
                          Format WebP / PNG dengan latar belakang transparan disarankan untuk efek floating pada hero stage.
                        </span>
                        <code className="text-[10px] text-primary/80 block mt-1 break-all">
                          {editingItem.image}
                        </code>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">
                        <button
                          type="button"
                          onClick={handleTriggerImageSelect}
                          className="px-3.5 py-2 rounded-xl bg-primary-container text-on-primary-container font-headline font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#D94E13] transition-all cursor-pointer shadow-md"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Unggah & Crop Gambar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setTempImageForCrop(editingItem.image);
                            setIsCropperOpen(true);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-headline font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <Crop className="w-4 h-4 text-primary" />
                          <span>Re-Crop Foto Sekarang</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cropper Features Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-surface-container-low/50 border border-outline-variant/20 text-[11px]">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-on-surface block">Pencegahan Black Margin</strong>
                        <span className="text-outline text-[10px]">
                          Clamped boundary memastikan tidak ada rongga hitam kosong di tepi hasil pemotongan.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-on-surface block">Multi Aspect Ratio</strong>
                        <span className="text-outline text-[10px]">
                          Tersedia preset 1:1 Square (cutout produk), 4:3 Katalog, dan 16:9 Banner Showcase.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <RotateCw className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-on-surface block">Rotasi 90° & Zooming</strong>
                        <span className="text-outline text-[10px]">
                          Kendali zoom halus (1x - 3x) dan rotasi 90 derajat dengan touch & mouse dragging.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: 3D Asset Upload & Interactive Configuration */}
              {activeTab === '3d' && (
                <div className="flex flex-col gap-5 font-mono text-xs">
                  {/* Master 3D Enable Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                        <Box className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="text-on-surface text-sm block">
                          Aktifkan Visualisasi 3D Interaktif
                        </strong>
                        <span className="text-[11px] text-outline">
                          Tampilkan model 3D WebGL real-time yang dapat diputar 360° oleh pembeli internasional.
                        </span>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingItem.model3d?.enabled ?? true}
                        onChange={(e) => {
                          const prev = editingItem.model3d || {
                            shapePreset: 'cube',
                            autoRotate: true,
                            rotationSpeed: 1.0,
                            surfaceFinish: 'matte_charcoal',
                            lightingIntensity: 1.2,
                            cameraDistance: 3.8,
                          };
                          setEditingItem({
                            ...editingItem,
                            model3d: { ...prev, enabled: e.target.checked },
                          });
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {editingItem.model3d?.enabled && (
                    <div className="flex flex-col gap-5">
                      {/* 3D Model File Upload Dropzone */}
                      <div
                        onDragOver={handle3DDragOver}
                        onDragLeave={handle3DDragLeave}
                        onDrop={handle3DDrop}
                        className={`p-5 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center gap-3 relative ${
                          isDragOver3D
                            ? 'border-primary bg-primary/10'
                            : 'border-outline-variant/40 bg-surface-container-lowest/50 hover:border-outline'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                          {isUploading3D ? (
                            <RefreshCw className="w-6 h-6 animate-spin" />
                          ) : (
                            <Upload className="w-6 h-6" />
                          )}
                        </div>

                        <div>
                          <strong className="text-on-surface text-sm block">
                            {editingItem.model3d.fileName
                              ? `Asset Terpasang: ${editingItem.model3d.fileName}`
                              : 'Tarik & Letakkan File Model 3D (.glb / .gltf / .obj)'}
                          </strong>
                          <span className="text-[11px] text-outline block mt-0.5">
                            {editingItem.model3d.fileSize
                              ? `Ukuran berkas: ${(editingItem.model3d.fileSize / 1024 / 1024).toFixed(2)} MB • URL: ${editingItem.model3d.fileUrl}`
                              : 'Format disarankan: .glb (Binary glTF, maks. 35 MB) dengan material PBR terintegrasi.'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleTrigger3DSelect}
                            disabled={isUploading3D}
                            className="px-4 py-2 rounded-xl bg-primary text-on-primary font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#D94E13] transition-all cursor-pointer shadow-md disabled:opacity-50"
                          >
                            {editingItem.model3d.fileUrl ? 'Ganti File 3D' : 'Pilih File 3D (.glb)'}
                          </button>

                          {editingItem.model3d.fileUrl && (
                            <button
                              type="button"
                              onClick={handleRemove3DAsset}
                              className="px-3 py-2 rounded-xl bg-error/20 text-error hover:bg-error/30 font-headline text-xs font-bold transition-all cursor-pointer"
                            >
                              Hapus File 3D
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Technical Guidelines Collapsible Card */}
                      <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setShow3DGuide(!show3DGuide)}
                          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2 text-primary font-bold">
                            <HelpCircle className="w-4 h-4" />
                            <span>Petunjuk Teknis Upload Asset 3D (Klik untuk membaca panduan)</span>
                          </div>
                          {show3DGuide ? (
                            <ChevronUp className="w-4 h-4 text-outline" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-outline" />
                          )}
                        </button>

                        {show3DGuide && (
                          <div className="p-4 pt-2 border-t border-outline-variant/20 flex flex-col gap-2.5 text-[11px] text-on-surface-variant leading-relaxed">
                            <div className="p-2.5 rounded-lg bg-surface-container-high/40 border border-outline-variant/20">
                              <strong className="text-on-surface block mb-1">
                                📌 1. Format Rekomendasi Utama: .glb (Binary glTF)
                              </strong>
                              Gunakan format <code>.glb</code> karena menggabungkan mesh geometri, tekstur PBR, dan material dalam satu file biner mandiri. Format <code>.gltf</code> (teks JSON dengan file terpisah) dapat digunakan namun kurang praktis untuk web deployment.
                            </div>

                            <div className="p-2.5 rounded-lg bg-surface-container-high/40 border border-outline-variant/20">
                              <strong className="text-on-surface block mb-1">
                                📐 2. Batas Poligon (Polygon / Triangle Budget): &lt; 50.000 Tris
                              </strong>
                              Agar rendering tetap responsif di smartphone pembeli (60 FPS tanpa lag), pastikan mesh telah di-decimate / di-optimize di bawah 50.000 poligon (20.000 - 30.000 lebih disukai).
                            </div>

                            <div className="p-2.5 rounded-lg bg-surface-container-high/40 border border-outline-variant/20">
                              <strong className="text-on-surface block mb-1">
                                🎨 3. PBR Texture Workflow & Resolusi
                              </strong>
                              Gunakan alur kerja <strong>Metallic / Roughness</strong> standar. Resolusi peta tekstur (BaseColor, Roughness, Normal) disarankan <strong>1024x1024 px</strong> atau maksimal <strong>2048x2048 px</strong>.
                            </div>

                            <div className="p-2.5 rounded-lg bg-surface-container-high/40 border border-outline-variant/20">
                              <strong className="text-on-surface block mb-1">
                                🧭 4. Pivot Center & Orientasi Sumbu
                              </strong>
                              Pastikan pivot origin (0,0,0) diletakkan di bagian tengah bawah model objek dengan sumbu <strong>Y-Up</strong> agar objek tidak melayang atau miring saat dirender.
                            </div>

                            <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-on-surface">
                              <strong className="text-primary block mb-1">
                                🛡️ 5. Preset Geometri Otomatis Tanpa Upload File
                              </strong>
                              Jika tim 3D belum menyediakan file <code>.glb</code>, cukup pilih salah satu <strong>Preset Geometri</strong> di bawah ini (Kubus Shisha, Heksagonal BBQ, Silinder). Mesin WebGL akan otomatis merender objek secara prosedural!
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 3D Geometry Preset Selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-outline uppercase font-bold">
                          PILIH BENTUK GEOMETRI MODEL 3D:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                          {[
                            { id: 'cube', label: 'Kubus 25mm', sub: 'Shisha Grade' },
                            { id: 'hexagonal', label: 'Heksagonal', sub: 'BBQ 50x150mm' },
                            { id: 'cylinder', label: 'Silinder Stick', sub: 'Finger Briquette' },
                            { id: 'pillow', label: 'Bantal Pillow', sub: 'BBQ Briquette' },
                            {
                              id: 'custom',
                              label: 'File Kustom .GLB',
                              sub: editingItem.model3d.fileUrl ? 'Asset Terpasang' : 'Belum Diupload',
                            },
                          ].map((shape) => {
                            const isSelected = editingItem.model3d?.shapePreset === shape.id;
                            const isCustomDisabled = shape.id === 'custom' && !editingItem.model3d?.fileUrl;

                            return (
                              <button
                                key={shape.id}
                                type="button"
                                disabled={isCustomDisabled}
                                onClick={() => {
                                  const prev = editingItem.model3d!;
                                  setEditingItem({
                                    ...editingItem,
                                    model3d: {
                                      ...prev,
                                      shapePreset: shape.id as any,
                                    },
                                  });
                                }}
                                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[66px] ${
                                  isSelected
                                    ? 'border-primary bg-primary/20 text-on-surface shadow-md'
                                    : isCustomDisabled
                                    ? 'border-outline-variant/20 bg-surface-container-lowest/30 opacity-40 cursor-not-allowed'
                                    : 'border-outline-variant/30 bg-surface-container-lowest hover:border-outline'
                                }`}
                              >
                                <strong className="text-[11px] block">{shape.label}</strong>
                                <span className="text-[9px] text-outline block mt-0.5">{shape.sub}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Surface Finish / PBR Texture Preset */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-outline uppercase font-bold">
                          MATERIAL & PBR SURFACE FINISH:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {[
                            {
                              id: 'matte_charcoal',
                              name: 'Matte Charcoal',
                              desc: 'Karbon Hitam Murni (Deep Black)',
                            },
                            {
                              id: 'porous_texture',
                              name: 'Porous Texture',
                              desc: 'Tekstur Karbon Berpori Retensi Panas',
                            },
                            {
                              id: 'white_ash',
                              name: 'White Ash Coat',
                              desc: 'Lapisan Abu Putih Salju (<2.2%)',
                            },
                            {
                              id: 'polished_agro',
                              name: 'Polished Agro',
                              desc: 'Kilau Biji Kopi / Rempah Ekspor',
                            },
                          ].map((finish) => {
                            const isSelected = editingItem.model3d?.surfaceFinish === finish.id;
                            return (
                              <button
                                key={finish.id}
                                type="button"
                                onClick={() => {
                                  const prev = editingItem.model3d!;
                                  setEditingItem({
                                    ...editingItem,
                                    model3d: {
                                      ...prev,
                                      surfaceFinish: finish.id as any,
                                    },
                                  });
                                }}
                                className={`p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[66px] flex flex-col justify-center ${
                                  isSelected
                                    ? 'border-primary bg-primary/15 shadow-sm'
                                    : 'border-outline-variant/30 bg-surface-container-lowest hover:border-outline'
                                }`}
                              >
                                <strong className="text-on-surface text-[11px] block">{finish.name}</strong>
                                <span className="text-[9px] text-outline block mt-0.5">{finish.desc}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sliders Grid: Rotation, Lighting, Camera Distance */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
                        {/* Auto Rotate & Speed */}
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] text-outline uppercase font-bold flex items-center gap-1">
                              <RotateCw className="w-3 h-3 text-tertiary" />
                              <span>Rotasi Otomatis</span>
                            </label>
                            <input
                              type="checkbox"
                              checked={editingItem.model3d.autoRotate}
                              onChange={(e) => {
                                const prev = editingItem.model3d!;
                                setEditingItem({
                                  ...editingItem,
                                  model3d: { ...prev, autoRotate: e.target.checked },
                                });
                              }}
                              className="accent-primary cursor-pointer"
                            />
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-outline">
                            <span>Kecepatan:</span>
                            <strong className="text-on-surface">{editingItem.model3d.rotationSpeed}x</strong>
                          </div>
                          <input
                            type="range"
                            min="0.2"
                            max="3.0"
                            step="0.1"
                            value={editingItem.model3d.rotationSpeed}
                            onChange={(e) => {
                              const prev = editingItem.model3d!;
                              setEditingItem({
                                ...editingItem,
                                model3d: {
                                  ...prev,
                                  rotationSpeed: parseFloat(e.target.value),
                                },
                              });
                            }}
                            className="w-full accent-primary cursor-pointer"
                          />
                        </div>

                        {/* Studio Lighting Intensity */}
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between text-[10px] text-outline font-bold">
                            <span>PENCAHAYAAN STUDIO</span>
                            <strong className="text-primary">{editingItem.model3d.lightingIntensity}x</strong>
                          </div>
                          <span className="text-[9px] text-outline">Intensitas lampu directional & rim kiln</span>
                          <input
                            type="range"
                            min="0.5"
                            max="2.5"
                            step="0.1"
                            value={editingItem.model3d.lightingIntensity}
                            onChange={(e) => {
                              const prev = editingItem.model3d!;
                              setEditingItem({
                                ...editingItem,
                                model3d: {
                                  ...prev,
                                  lightingIntensity: parseFloat(e.target.value),
                                },
                              });
                            }}
                            className="w-full accent-primary cursor-pointer mt-1"
                          />
                        </div>

                        {/* Camera Distance */}
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between text-[10px] text-outline font-bold">
                            <span>JARAK KAMERA (ZOOM)</span>
                            <strong className="text-secondary">{editingItem.model3d.cameraDistance}m</strong>
                          </div>
                          <span className="text-[9px] text-outline">Jarak pandang awal viewport 3D</span>
                          <input
                            type="range"
                            min="2.0"
                            max="6.0"
                            step="0.2"
                            value={editingItem.model3d.cameraDistance}
                            onChange={(e) => {
                              const prev = editingItem.model3d!;
                              setEditingItem({
                                ...editingItem,
                                model3d: {
                                  ...prev,
                                  cameraDistance: parseFloat(e.target.value),
                                },
                              });
                            }}
                            className="w-full accent-primary cursor-pointer mt-1"
                          />
                        </div>
                      </div>

                      {/* Live 3D Interactive Viewport Preview */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-outline uppercase font-bold flex items-center justify-between">
                          <span>Live 3D Viewport Simulation (Interaktif):</span>
                          <span className="text-primary text-[9px]">WebGL 60 FPS • Real-Time PBR</span>
                        </label>
                        <Commodity3DPreview
                          shapePreset={editingItem.model3d.shapePreset}
                          fileUrl={editingItem.model3d.fileUrl}
                          surfaceFinish={editingItem.model3d.surfaceFinish}
                          autoRotate={editingItem.model3d.autoRotate}
                          rotationSpeed={editingItem.model3d.rotationSpeed}
                          lightingIntensity={editingItem.model3d.lightingIntensity}
                          cameraDistance={editingItem.model3d.cameraDistance}
                          height={280}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: Lab Specs & Video Reel */}
              {activeTab === 'specs' && (
                <div className="flex flex-col gap-4 font-mono text-xs">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-outline uppercase font-bold">
                      Video Reel Showcase URL (Kiln / Factory Tour)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={editingItem.videoUrl}
                        onChange={(e) => setEditingItem({ ...editingItem, videoUrl: e.target.value })}
                        className="w-full h-10 pl-9 pr-3.5 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:border-primary outline-none"
                        placeholder="Contoh: https://youtube.com/watch?v=kiln-retort-demo"
                      />
                      <Video className="w-4 h-4 text-outline absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-outline uppercase font-bold">
                        Spesifikasi Parameter Lab Ekspor:
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingItem({
                            ...editingItem,
                            specs: [...editingItem.specs, { label: 'Parameter Baru', value: '-' }],
                          });
                        }}
                        className="text-[10px] text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Tambah Parameter</span>
                      </button>
                    </div>

                    <div className="flex flex-col gap-2">
                      {editingItem.specs.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={spec.label}
                            onChange={(e) => {
                              const newSpecs = [...editingItem.specs];
                              newSpecs[idx].label = e.target.value;
                              setEditingItem({ ...editingItem, specs: newSpecs });
                            }}
                            className="w-1/2 h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface"
                            placeholder="Nama Parameter (ex: Ash Content)"
                          />
                          <input
                            type="text"
                            value={spec.value}
                            onChange={(e) => {
                              const newSpecs = [...editingItem.specs];
                              newSpecs[idx].value = e.target.value;
                              setEditingItem({ ...editingItem, specs: newSpecs });
                            }}
                            className="w-1/2 h-9 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface font-bold text-primary"
                            placeholder="Nilai (ex: < 2.2%)"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newSpecs = editingItem.specs.filter((_, i) => i !== idx);
                              setEditingItem({ ...editingItem, specs: newSpecs });
                            }}
                            className="p-2 text-outline hover:text-error transition-colors cursor-pointer"
                            title="Hapus parameter ini"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </form>

            {/* Modal Footer Controls - Fixed Bottom Bar Always Visible */}
            <div className="shrink-0 flex items-center justify-between px-6 py-3.5 border-t border-outline-variant/30 bg-surface-container-lowest">
              <span className="font-mono text-[10px] text-outline">
                Perubahan akan langsung disimpan ke data katalog aktif.
              </span>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-headline text-xs font-bold transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  form="commodity-edit-form"
                  className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#D94E13] transition-all cursor-pointer shadow-lg flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
