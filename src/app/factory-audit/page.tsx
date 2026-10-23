import React from 'react';
import FactoryPipelineSection from '@/components/product/FactoryPipelineSection';

export const metadata = {
  title: 'Pabrik & Audit Kepatuhan Maritim — NusantaraOrigin',
  description: 'Transparansi 5 tahap manufaktur arang batok kelapa, pengawasan kiln 72 jam, dan IMO Non-DG SP925.',
};

export default function FactoryAuditPage() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FactoryPipelineSection />
    </div>
  );
}
