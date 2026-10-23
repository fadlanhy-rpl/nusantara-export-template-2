import React from 'react';
import HeroTelemetryHud from '@/components/product/HeroTelemetryHud';
import DualSplitScreenComparison from '@/components/product/DualSplitScreenComparison';
import ShapeCadMatrix from '@/components/product/ShapeCadMatrix';
import CoaWhitepaperMatrix from '@/components/product/CoaWhitepaperMatrix';
import OemPreviewSection from '@/components/product/OemPreviewSection';
import ContainerPlannerSection from '@/components/product/ContainerPlannerSection';
import FactoryPipelineSection from '@/components/product/FactoryPipelineSection';

export const metadata = {
  title: '100% Briket Arang Batok Kelapa Murni (Grade Shisha Platinum) — NusantaraOrigin',
  description:
    'Spesifikasi analitis ASTM D3174 abu < 2.2%, kalori > 7,500 kcal/kg, IMO Non-DG Special Provision 925, dan simulator muatan kontainer 40ft HC.',
};

export default function ProductDetailPage() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-0 py-8 flex flex-col gap-10">
      {/* 1. Hero & HS Telemetry */}
      <HeroTelemetryHud />

      {/* 2. Anatomi Kualitas: Dual Split-Screen Visual Proof */}
      <DualSplitScreenComparison />

      {/* 3. Selektor Bentuk & Ukuran Presisi CAD */}
      <ShapeCadMatrix />

      {/* 4. Matriks Parameter Lab ASTM / ISO (Ash White Paper) */}
      <CoaWhitepaperMatrix />

      {/* 5. Alur Pabrik 5 Tahap: Farm to Stuffing */}
      <FactoryPipelineSection />

      {/* 6. OEM Custom Packaging Options */}
      <OemPreviewSection />

      {/* 7. Simulator Muatan Kontainer & Soft-Gated RFQ */}
      <ContainerPlannerSection />
    </div>
  );
}
