'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Check,
  Move,
  Maximize2,
  RefreshCw,
  Crop,
  Sliders,
  Sparkles
} from 'lucide-react';

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedBlob: Blob, previewUrl: string) => void;
  initialAspectRatio?: number; // width / height, e.g. 1 for square, 4/3 for card
}

export default function ImageCropperModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  initialAspectRatio = 1,
}: ImageCropperModalProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [naturalDims, setNaturalDims] = useState({ width: 512, height: 512 });
  const [cropBoxDims, setCropBoxDims] = useState({ width: 280, height: 280 });
  const [aspectRatio, setAspectRatio] = useState<number>(initialAspectRatio);
  const [isProcessing, setIsProcessing] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const cropBoxRef = useRef<HTMLDivElement>(null);

  // Update crop box size dynamically based on current aspect ratio
  const updateCropBoxSize = useCallback(() => {
    if (cropBoxRef.current) {
      const containerW = Math.min(380, window.innerWidth - 64);
      let targetW = containerW;
      let targetH = containerW / aspectRatio;

      if (targetH > 360) {
        targetH = 360;
        targetW = targetH * aspectRatio;
      }

      setCropBoxDims({
        width: Math.round(targetW),
        height: Math.round(targetH),
      });
    }
  }, [aspectRatio]);

  useEffect(() => {
    if (!isOpen) return;
    updateCropBoxSize();
    window.addEventListener('resize', updateCropBoxSize);
    return () => window.removeEventListener('resize', updateCropBoxSize);
  }, [isOpen, updateCropBoxSize]);

  // Compute base dimensions so at zoom = 1 the image fills the crop box completely (cover fit)
  const getBaseDisplayDims = useCallback(
    (natW = naturalDims.width, natH = naturalDims.height, boxW = cropBoxDims.width, boxH = cropBoxDims.height) => {
      const safeW = Math.max(1, natW);
      const safeH = Math.max(1, natH);
      const scale = Math.max(boxW / safeW, boxH / safeH);
      return {
        width: safeW * scale,
        height: safeH * scale,
      };
    },
    [naturalDims.width, naturalDims.height, cropBoxDims.width, cropBoxDims.height]
  );

  // Clamp offset to ensure no empty space enters the crop boundary
  const clampOffset = useCallback(
    (rawOffset: { x: number; y: number }, targetZoom = zoom, targetRot = rotation) => {
      const { width: baseW, height: baseH } = getBaseDisplayDims(
        naturalDims.width,
        naturalDims.height,
        cropBoxDims.width,
        cropBoxDims.height
      );

      const isRotated90 = Math.abs(targetRot % 180) === 90;
      const effW = (isRotated90 ? baseH : baseW) * targetZoom;
      const effH = (isRotated90 ? baseW : baseH) * targetZoom;

      const maxX = Math.max(0, (effW - cropBoxDims.width) / 2);
      const maxY = Math.max(0, (effH - cropBoxDims.height) / 2);

      return {
        x: Math.max(-maxX, Math.min(maxX, rawOffset.x)),
        y: Math.max(-maxY, Math.min(maxY, rawOffset.y)),
      };
    },
    [zoom, rotation, naturalDims, cropBoxDims, getBaseDisplayDims]
  );

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const w = img.naturalWidth || 512;
    const h = img.naturalHeight || 512;
    setNaturalDims({ width: w, height: h });
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
    updateCropBoxSize();
  };

  // Mouse & Touch Pan Controls
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset(
      clampOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setOffset(
      clampOffset({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      })
    );
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleZoomChange = (newZoom: number) => {
    const clampedZoom = Math.max(1, Math.min(3.5, newZoom));
    setZoom(clampedZoom);
    setOffset((prev) => clampOffset(prev, clampedZoom, rotation));
  };

  const handleRotate = () => {
    const nextRot = (rotation + 90) % 360;
    setRotation(nextRot);
    setOffset((prev) => clampOffset(prev, zoom, nextRot));
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  // Export cropped image via Canvas with transparency support (PNG/WebP)
  const handleExecuteCrop = async () => {
    if (!imageRef.current) return;
    setIsProcessing(true);

    try {
      const img = imageRef.current;
      const targetExportW = Math.round(cropBoxDims.width * 2.5); // Hi-DPI export
      const targetExportH = Math.round(cropBoxDims.height * 2.5);

      const canvas = document.createElement('canvas');
      canvas.width = targetExportW;
      canvas.height = targetExportH;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Move canvas origin to center of crop export area
      ctx.translate(targetExportW / 2, targetExportH / 2);
      ctx.rotate((rotation * Math.PI) / 180);

      const { width: baseW, height: baseH } = getBaseDisplayDims(
        naturalDims.width,
        naturalDims.height,
        cropBoxDims.width,
        cropBoxDims.height
      );

      const scaleFactor = targetExportW / cropBoxDims.width;
      const drawW = baseW * zoom * scaleFactor;
      const drawH = baseH * zoom * scaleFactor;
      const drawX = (offset.x * scaleFactor) - (drawW / 2);
      const drawY = (offset.y * scaleFactor) - (drawH / 2);

      // Handle rotated coordinate adjustments
      const isRotated90 = Math.abs(rotation % 180) === 90;
      if (isRotated90) {
        ctx.drawImage(img, -drawW / 2 + (offset.y * scaleFactor), -drawH / 2 + (-offset.x * scaleFactor), drawW, drawH);
      } else {
        ctx.drawImage(img, -drawW / 2 + (offset.x * scaleFactor), -drawH / 2 + (offset.y * scaleFactor), drawW, drawH);
      }

      // Export as high-quality WebP or PNG
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const previewUrl = URL.createObjectURL(blob);
            onCropComplete(blob, previewUrl);
            onClose();
          }
          setIsProcessing(false);
        },
        'image/webp',
        0.95
      );
    } catch (err) {
      console.error('Crop Execution Error:', err);
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const baseDims = getBaseDisplayDims();

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 select-none animate-fade-in">
      <div className="w-full max-w-[520px] bg-[#1C1815] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.9)] flex flex-col gap-4">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
              <Crop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-[15px] text-on-surface">
                Potong & Sesuaikan Gambar Produk
              </h3>
              <span className="font-mono text-[10px] text-outline">
                Geser, perbesar, atau putar gambar sesuai proporsi katalog
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Aspect Ratio Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
          <span className="text-[10px] text-outline uppercase mr-1">Rasio:</span>
          {[
            { label: '1:1 Persegi (Cutout)', ratio: 1 },
            { label: '4:3 Standard', ratio: 4 / 3 },
            { label: '16:9 Showcase', ratio: 16 / 9 },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setAspectRatio(item.ratio);
                setOffset({ x: 0, y: 0 });
                setZoom(1);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                Math.abs(aspectRatio - item.ratio) < 0.05
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Crop Stage Container */}
        <div
          className="relative w-full h-[320px] bg-[#120D0A] rounded-2xl overflow-hidden border border-outline-variant/30 flex items-center justify-center cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background transparency grid */}
          <div className="absolute inset-0 cad-grid opacity-30 pointer-events-none" />

          {/* Active Image (Transformed via CSS matrix) */}
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Source preview"
            onLoad={handleImageLoad}
            style={{
              width: `${baseDims.width}px`,
              height: `${baseDims.height}px`,
              maxWidth: 'none',
              transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg) scale(${zoom})`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            }}
            className="pointer-events-none select-none drop-shadow-xl"
            crossOrigin="anonymous"
          />

          {/* Dark Overlay around crop box */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div
              ref={cropBoxRef}
              style={{
                width: `${cropBoxDims.width}px`,
                height: `${cropBoxDims.height}px`,
              }}
              className="relative rounded-xl border-2 border-primary shadow-[0_0_0_9999px_rgba(0,0,0,0.65)]"
            >
              {/* Rule of thirds grid lines */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                <div className="border-r border-b border-primary/50" />
                <div className="border-r border-b border-primary/50" />
                <div className="border-b border-primary/50" />
                <div className="border-r border-b border-primary/50" />
                <div className="border-r border-b border-primary/50" />
                <div className="border-b border-primary/50" />
                <div className="border-r border-primary/50" />
                <div className="border-r border-primary/50" />
                <div />
              </div>

              {/* Center crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-primary">
                <Move className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls: Zoom Slider, Rotate, Reset */}
        <div className="flex flex-col gap-2.5 pt-1">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleZoomChange(zoom - 0.2)}
              className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-outline hover:text-on-surface"
              title="Perkecil"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              className="flex-1 accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
            />
            <button
              type="button"
              onClick={() => handleZoomChange(zoom + 0.2)}
              className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-outline hover:text-on-surface"
              title="Perbesar"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleRotate}
              className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-outline hover:text-on-surface flex items-center gap-1 text-[11px] font-mono"
              title="Putar 90 Derajat"
            >
              <RotateCw className="w-4 h-4" />
              <span className="hidden sm:inline">Putar</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-outline hover:text-on-surface"
              title="Reset Pengaturan"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 text-xs font-headline">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleExecuteCrop}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#D94E13] transition-all shadow-[0_0_16px_rgba(255,138,82,0.35)] disabled:opacity-50 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{isProcessing ? 'MEMPROSES CROP...' : 'TERAPKAN & SIMPAN'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
