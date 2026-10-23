import React from 'react';
import ContainerPlannerSection from '@/components/product/ContainerPlannerSection';

export const metadata = {
  title: 'Container Load Planner & Soft-Gated RFQ Desk — NusantaraOrigin',
  description: 'Kalkulator muatan kontainer 20ft vs 40ft High Cube dengan deteksi batas tonase maritim Tanjung Perak.',
};

export default function ContainerPlannerPage() {
  return (
    <div className="w-full max-w-[1160px] mx-auto px-4 lg:px-0 py-8">
      <ContainerPlannerSection />
    </div>
  );
}
