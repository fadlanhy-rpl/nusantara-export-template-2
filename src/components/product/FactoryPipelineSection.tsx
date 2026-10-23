import React from 'react';
import { Factory, Flame, Filter, Wheat, Layers, ShieldCheck, Thermometer, MapPin } from 'lucide-react';

interface Stage {
  step: string;
  title: string;
  enTitle: string;
  control: string;
  desc: string;
  telemetry: string;
  icon: React.ReactNode;
}

const STAGES: Stage[] = [
  {
    step: 'STAGE 01',
    title: 'Penyortiran Tempurung Kelapa Tua Kering',
    enTitle: 'Selection of 100% Mature Dry Coconut Shells',
    control: 'Kadar abu bahan mentah < 2.0% & kelembapan alami < 12%',
    desc: 'Tempurung kelapa tua pilihan dari Sulawesi dan Sumatera dipisahkan manual dari sabut dan kotoran tanah untuk menjaga kemurnian karbon.',
    telemetry: 'SORTER-INSPECTION: GRADE A PASS',
    icon: <ShieldCheck className="w-5 h-5 text-tertiary" />,
  },
  {
    step: 'STAGE 02',
    title: 'Pirolisis Karbonisasi Drum Tertutup',
    enTitle: 'Closed Retort Drum Pyrolysis Carbonization',
    control: 'Suhu pembakaran stabil 450°C – 500°C tanpa jelaga kayu liar',
    desc: 'Karbonisasi anaerobik tanpa oksigen bebas memastikan pembakaran sempurna tanpa memicu tar kayu beracun atau aroma sangit menusuk hidung.',
    telemetry: 'RETORT CORE TEMP: 482.4°C [ANAEROBIC]',
    icon: <Flame className="w-5 h-5 text-primary" />,
  },
  {
    step: 'STAGE 03',
    title: 'Penggilingan Presisi & Pengayakan Mesh 60',
    enTitle: 'Fine Crushing & 60-Mesh Micro Screening',
    control: 'Tepung arang mikro-partikel super bersih bebas silika & pasir',
    desc: 'Tepung arang diayak melalui saringan getar mesh 60 dua lapis, menyingkirkan partikel kasar dan benda asing yang dapat menyebabkan retak bara.',
    telemetry: 'SIEVE STATUS: MESH 60 REJECTION < 0.3%',
    icon: <Filter className="w-5 h-5 text-secondary" />,
  },
  {
    step: 'STAGE 04',
    title: 'Pencampuran Binder Tapioka Alami 2.5%',
    enTitle: 'Natural 2.5% Food-Grade Tapioca Binder Blending',
    control: '100% Organik food-grade tanpa bahan kimia pembakar sintetis',
    desc: 'Hanya menggunakan pati singkong organik sebagai perekat alami tanpa nitrat, belerang buatan, atau bahan kimia pembakar cepat yang berbahaya.',
    telemetry: 'ORGANIC BINDER: 2.50% HOMOGENEOUS',
    icon: <Wheat className="w-5 h-5 text-tertiary" />,
  },
  {
    step: 'STAGE 05',
    title: 'Pencetakan Hidrolik Presisi & Oven Kiln 72 Jam 70°C',
    enTitle: 'Hydraulic Extrusion & 72-Hour Kiln Drying at 70°C',
    control: 'Kelembapan inti terkunci < 4.5% & uji jatuh 1.5m 3x beton utuh',
    desc: 'Briket dicetak dengan tekanan press 120-ton lalu dikeringkan lambat di ruang oven kiln terkontrol selama 72 jam terus-menerus pada suhu 70°C.',
    telemetry: 'KILN T-SENSOR: 70.2°C STABLE (72H CYCLE)',
    icon: <Layers className="w-5 h-5 text-primary" />,
  },
];

export default function FactoryPipelineSection() {
  return (
    <section className="flex flex-col gap-6 bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 shadow-xl">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
          TRANSPARANSI PROSES HULU KE HILIR
        </span>
        <h2 className="font-headline text-[22px] sm:text-[28px] font-bold text-on-surface">
          Metodologi Manufaktur 5 Tahap & Kontrol Mutu Pabrik
        </h2>
        <p className="font-body text-[14px] text-outline max-w-3xl">
          Menjamin integritas fisik absolut tanpa ketergantungan cuaca, pengayakan debu abu bersih, dan kepatuhan uji pemanasan maritim IMO Non-DG SP925.
        </p>
      </div>

      {/* Proximity & Capacity Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline mb-1 font-mono text-[11px]">
            <span>LOKASI PABRIK & GUDANG</span>
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div className="font-headline text-[15px] font-bold text-on-surface">
            Kawasan Industri Gresik, Jatim
          </div>
          <span className="font-body text-[12px] text-outline mt-1">
            25 KM dari Terminal Petikemas Tanjung Perak (SUB Port)
          </span>
        </div>

        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline mb-1 font-mono text-[11px]">
            <span>OUTPUT KILN TERINTEGRASI</span>
            <Thermometer className="w-4 h-4 text-primary" />
          </div>
          <div className="font-headline text-[22px] font-bold text-primary font-mono">
            350 MT / Bulan
          </div>
          <span className="font-body text-[12px] text-tertiary mt-1">
            24/7 Continuous Kiln & Sensor Termokopel Digital
          </span>
        </div>

        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline mb-1 font-mono text-[11px]">
            <span>STUFFING BAYS KARGO</span>
            <Factory className="w-4 h-4 text-secondary" />
          </div>
          <div className="font-headline text-[22px] font-bold text-on-surface font-mono">
            3 Stuffing Bays
          </div>
          <span className="font-body text-[12px] text-outline mt-1">
            Ramp Hidrolik & Segel Kontainer ISO 17712 High Security
          </span>
        </div>
      </div>

      {/* 5-Stage Interactive Timeline */}
      <div className="flex flex-col gap-4 pt-2">
        {STAGES.map((s, idx) => (
          <div
            key={idx}
            className="p-5 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center shrink-0 mt-0.5">
                {s.icon}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-mono text-[10px] font-bold">
                    {s.step}
                  </span>
                  <span className="font-mono text-[11px] text-tertiary">QC PASS</span>
                </div>
                <h4 className="font-headline font-bold text-[16px] text-on-surface">
                  {s.title}
                </h4>
                <p className="font-body text-[13px] text-outline mt-1 max-w-2xl leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>

            {/* Right Telemetry Chip */}
            <div className="flex flex-col items-start lg:items-end shrink-0 pl-14 lg:pl-0">
              <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                Parameter Kontrol
              </span>
              <span className="font-mono text-[12px] text-primary font-semibold mt-0.5">
                {s.control}
              </span>
              <span className="mt-1 px-2 py-0.5 rounded bg-surface-container-high text-tertiary font-mono text-[10px]">
                {s.telemetry}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
