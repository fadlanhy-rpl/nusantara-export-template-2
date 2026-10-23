'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, CheckCircle2, Box, Store, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ShapeItem {
  id: string;
  name: string;
  cadCode: string;
  category: string;
  dimW: string;
  dimH: string;
  dimD: string;
  dimText: string;
  pcsPerKg: number;
  burnHours: number;
  temp: Record<string, string>;
  app: Record<string, string>;
  pack: Record<string, string>;
  badge: Record<string, string>;
}

const SHAPES: Record<string, ShapeItem> = {
  'cube-25': {
    id: 'cube-25',
    name: 'Cube C25',
    cadCode: 'ISO-C25-REV3',
    category: 'CUBE',
    dimW: '25.0 mm',
    dimH: '25.0 mm',
    dimD: '25.0 mm',
    dimText: '25 × 25 × 25 mm',
    pcsPerKg: 72,
    burnHours: 2.5,
    temp: {
      en: '650°C – 700°C steady heat',
      id: '650°C – 700°C konsisten',
      ar: 'حرارة ثابتة 650°C - 700°C',
      zh: '650°C – 700°C 恒温持续',
    },
    app: {
      en: 'Standard international shisha lounges (Dubai, UAE & GCC)',
      id: 'Shisha lounge standar internasional (Dubai, UEA, GCC)',
      ar: 'مقاهي وصالات الشيشة العالمية القياسية (دبي والإمارات والخليج)',
      zh: '国际标准高端水烟馆 (迪拜、阿联酋及海湾国家)',
    },
    pack: {
      en: 'Inner Box 1kg (vacuum sealed) + Master Carton 10kg/20kg (5-Ply)',
      id: 'Inner Box 1kg (vacuum sealed) + Master Carton 10kg/20kg (5-Ply)',
      ar: 'علبة داخلية 1 كجم مفرغة من الهواء + كرتونة رئيسية 10/20 كجم',
      zh: '1kg 内盒 (真空塑封) + 10kg/20kg 5层加厚外箱',
    },
    badge: {
      en: 'GLOBAL BEST SELLER',
      id: 'GLOBAL BEST SELLER',
      ar: 'الأكثر مبيعاً عالمياً',
      zh: '全球畅销款',
    },
  },
  'cube-26': {
    id: 'cube-26',
    name: 'Cube C26',
    cadCode: 'ISO-C26-EU',
    category: 'CUBE',
    dimW: '26.0 mm',
    dimH: '26.0 mm',
    dimD: '26.0 mm',
    dimText: '26 × 26 × 26 mm',
    pcsPerKg: 64,
    burnHours: 2.75,
    temp: {
      en: '670°C – 710°C steady heat',
      id: '670°C – 710°C konsisten',
      ar: 'حرارة ثابتة 670°C - 710°C',
      zh: '670°C – 710°C 恒温持续',
    },
    app: {
      en: 'Premium European market (Germany, France, Poland, Spain)',
      id: 'Pasar premium Eropa (Jerman, Prancis, Polandia, Spanyol)',
      ar: 'الأسواق الأوروبية الفاخرة (ألمانيا، فرنسا، بولندا، إسبانيا)',
      zh: '欧洲高端消费市场 (德国、法国、波兰、西班牙)',
    },
    pack: {
      en: 'Inner Box 1kg (glossy/matte) + Master Box 10kg Corrugated',
      id: 'Inner Box 1kg (glossy/doff) + Master Box 10kg Corrugated',
      ar: 'علبة داخلية 1 كجم لامعة/مطفية + كرتونة رئيسية 10 كجم',
      zh: '1kg 精美彩盒 (哑光/亮光) + 10kg 瓦楞外箱',
    },
    badge: {
      en: 'EUROPEAN STANDARD',
      id: 'EUROPEAN STANDARD',
      ar: 'معيار السوق الأوروبي',
      zh: '欧洲主流标准',
    },
  },
  'cube-27': {
    id: 'cube-27',
    name: 'Cube C27 / C28',
    cadCode: 'ISO-C27-HEAVY',
    category: 'CUBE',
    dimW: '27.0 mm',
    dimH: '27.0 mm',
    dimD: '27.0 mm',
    dimText: '27 × 27 × 27 mm',
    pcsPerKg: 56,
    burnHours: 3.25,
    temp: {
      en: '680°C – 720°C high output',
      id: '680°C – 720°C konsisten',
      ar: 'حرارة مرتفعة 680°C - 720°C',
      zh: '680°C – 720°C 超高持久',
    },
    app: {
      en: 'Extended shisha sessions & large phunnel bowls (VIP Lounges)',
      id: 'Sesi shisha intensif & mangkuk phunnel besar (Lounge VIP)',
      ar: 'جلسات الشيشة الطويلة ورؤوس الفنل الكبيرة (صالات VIP الفاخرة)',
      zh: '长时间加长水烟局与大口径漏斗碗 (VIP贵宾包厢)',
    },
    pack: {
      en: 'Inner Box 1kg + Master Box 10kg Heavy Duty',
      id: 'Inner Box 1kg + Master Box 10kg Heavy Duty',
      ar: 'علبة 1 كجم + كرتونة شحن 10 كجم فائقة المتانة',
      zh: '1kg 内盒 + 10kg 重型外箱',
    },
    badge: {
      en: 'LONG LASTING 3H+',
      id: 'LONG LASTING 3H+',
      ar: 'اشتعال طويل 3+ ساعات',
      zh: '超长燃烧 3小时+',
    },
  },
  'hex-bbq': {
    id: 'hex-bbq',
    name: 'Hexagonal BBQ',
    cadCode: 'ISO-HEX2050',
    category: 'HEXAGONAL',
    dimW: '20.0 mm',
    dimH: '50.0 mm',
    dimD: '20.0 mm',
    dimText: '20 × 50 mm / 20 × 35 mm',
    pcsPerKg: 64,
    burnHours: 4.75,
    temp: {
      en: '700°C – 750°C intense grilling',
      id: '700°C – 750°C konsisten',
      ar: 'حرارة شواء شديدة 700°C - 750°C',
      zh: '700°C – 750°C 强效烧烤',
    },
    app: {
      en: 'Yakiniku, steakhouse, and commercial grill BBQ restaurants',
      id: 'Restoran yakiniku, steakhouse, dan commercial grill BBQ',
      ar: 'مطاعم الياكينيكو وشرائح اللحم والشواء التجاري',
      zh: '日式烧肉、牛排馆及专业商业炭火烤肉店',
    },
    pack: {
      en: 'Bulk Master Box 10kg or 20kg (Heavy Kraft 5-Ply)',
      id: 'Bulk Master Box 10kg atau 20kg (Heavy Kraft 5-Ply)',
      ar: 'كرتونة مجمعة 10 أو 20 كجم (كرافت 5 طبقات قوي)',
      zh: '10kg 或 20kg 散装大箱 (5层重型牛皮纸瓦楞)',
    },
    badge: {
      en: 'RESTAURANT GRILL',
      id: 'RESTAURANT GRILL',
      ar: 'مطاعم وشواء احترافي',
      zh: '商用餐饮烤肉级',
    },
  },
  'finger': {
    id: 'finger',
    name: 'Finger / Cylinder',
    cadCode: 'ISO-CYL2050',
    category: 'FINGER',
    dimW: '20.0 mm',
    dimH: '50.0 mm',
    dimD: '20.0 mm',
    dimText: '20 × 50 mm',
    pcsPerKg: 72,
    burnHours: 2.5,
    temp: {
      en: '650°C – 690°C steady glow',
      id: '650°C – 690°C',
      ar: 'حرارة متوازنة 650°C - 690°C',
      zh: '650°C – 690°C 稳定发热',
    },
    app: {
      en: 'Traditional pipe bowls & Greek, Turkish, Levant markets',
      id: 'Mangkuk rokok tradisional & pasar Yunani, Turki, dan Levant',
      ar: 'الشيشة التقليدية وأسواق اليونان وتركيا وبلاد الشام',
      zh: '传统烟斗烟具、希腊、土耳其及地中海市场',
    },
    pack: {
      en: 'Inner Box 1kg + Master Carton 10kg',
      id: 'Inner Box 1kg + Master Carton 10kg',
      ar: 'علبة 1 كجم + كرتونة شحن 10 كجم',
      zh: '1kg 内盒 + 10kg 外箱',
    },
    badge: {
      en: 'MEDITERRANEAN HIT',
      id: 'MEDITERRANEAN HIT',
      ar: 'الأكثر شعبية في المتوسط',
      zh: '地中海热销款',
    },
  },
  'flat-kaloud': {
    id: 'flat-kaloud',
    name: 'Flat / Kaloud',
    cadCode: 'ISO-FLAT2518',
    category: 'FLAT_KALOUD',
    dimW: '25.0 mm',
    dimH: '18.0 mm',
    dimD: '25.0 mm',
    dimText: '25 × 25 × 18 mm',
    pcsPerKg: 96,
    burnHours: 2.0,
    temp: {
      en: '640°C – 680°C optimal airflow',
      id: '640°C – 680°C',
      ar: 'حرارة مثالية 640°C - 680°C',
      zh: '640°C – 680°C 适配控温',
    },
    app: {
      en: 'Heat Management Device (HMD) / Lotus Kaloud bowls',
      id: 'Heat Management Device (HMD) / Lotus Kaloud Bowl',
      ar: 'أجهزة إدارة الحرارة (HMD) ورؤوس اللوتس كالود',
      zh: '热量管理装置 (HMD) / 莲花控温头 (Lotus Kaloud)',
    },
    pack: {
      en: 'Inner Box 1kg (3 tiers) + Master Carton 10kg',
      id: 'Inner Box 1kg (3 tiers) + Master Carton 10kg',
      ar: 'علبة 1 كجم (3 طبقات) + كرتونة 10 كجم',
      zh: '1kg 内盒 (3层排布) + 10kg 外箱',
    },
    badge: {
      en: 'HMD SPECIALIST',
      id: 'HMD SPECIALIST',
      ar: 'مخصص لأجهزة HMD',
      zh: 'HMD 控温专用',
    },
  },
};

const SHAPES_I18N = {
  en: {
    kicker: 'HYDRAULIC PRESS & EXTRUSION PRECISION',
    title: 'Standard Catalog of Shapes, Dimensions & Cargo Applications',
    subtitle: 'We manufacture high-precision briquette dies using 120-ton hydraulic press machinery with extremely strict tolerances (< ±0.5 mm) for perfect packing density and cargo stability.',
    tolerance: 'TOLERANCE ±0.5mm',
    dimLabel: 'Precision Dimensions (CAD)',
    ratioLabel: 'Pieces per Kilogram Ratio',
    pcsUnit: 'pcs / kg',
    burnLabel: 'Effective Burning Duration',
    burnUnit: 'Hours (Stable)',
    tempLabel: 'Core Burning Temperature',
    appLabel: 'Primary Application',
    packLabel: 'Packaging Recommendation',
    moldLabel: 'Custom Mold Option',
    moldSub: 'Embossed buyer brand logos available on briquette surfaces.',
    moqText: 'MOQ FOR THIS SHAPE:',
    ctaOem: 'Customize Inner & Master Box Packaging',
  },
  id: {
    kicker: 'PRESISI EKSTRUSI & CETAK HIDROLIK',
    title: 'Katalog Standar Bentuk, Dimensi & Aplikasi Kargo',
    subtitle: 'Kami memproduksi cetakan briket presisi tinggi menggunakan mesin press hidrolik 120-ton dengan batas toleransi pemotongan sangat presisi (< ±0.5 mm) untuk kerapatan packing sempurna.',
    tolerance: 'TOLERANSI ±0.5mm',
    dimLabel: 'Dimensi Presisi (CAD)',
    ratioLabel: 'Rasio Butir per Kilogram',
    pcsUnit: 'butir / kg',
    burnLabel: 'Durasi Pembakaran Efektif',
    burnUnit: 'Jam (Stabil)',
    tempLabel: 'Suhu Inti Pembakaran',
    appLabel: 'Aplikasi Utama',
    packLabel: 'Rekomendasi Packing',
    moldLabel: 'Kustomisasi Mold',
    moldSub: 'Tersedia ukiran logo timbul (embossed buyer logo) di permukaan briket.',
    moqText: 'MOQ SHAPE INI:',
    ctaOem: 'Kustomisasi Kemasan Inner/Master Box',
  },
  ar: {
    kicker: 'دقة الكبس الهيدروليكي والبثق الهندسي',
    title: 'كتالوج الأشكال الهندسية والمقاسات واستخدامات الشحن',
    subtitle: 'ننتج قوالب فحم عالية الدقة بمكابس هيدروليكية بقوة 120 طناً مع أدنى نسبة تفاوت في القطع (< ±0.5 مم) لضمان كثافة تعبئة وحماية كاملة أثناء النقل البحري.',
    tolerance: 'نسبة التفاوت ±0.5 مم',
    dimLabel: 'الأبعاد الهندسية الدقيقة (CAD)',
    ratioLabel: 'عدد المكعبات في الكيلوغرام',
    pcsUnit: 'حبة / كجم',
    burnLabel: 'مدة الاحتراق الفعالة',
    burnUnit: 'ساعة (ثابتة)',
    tempLabel: 'درجة حرارة قلب الفحم',
    appLabel: 'الاستخدام الأساسي',
    packLabel: 'التعبئة والتغليف الموصى بها',
    moldLabel: 'حفر شعار مخصص',
    moldSub: 'إمكانية حفر شعار المشتري البارز (Embossed Logo) على سطح كل مكعب.',
    moqText: 'الحد الأدنى لطلب هذا الشكل:',
    ctaOem: 'تخصيص العلب والتغليف OEM',
  },
  zh: {
    kicker: '高压液压成型与挤压几何精度',
    title: '标准几何形状、尺寸规格与货运应用目录',
    subtitle: '我们采用120吨重型液压成型机生产超高精度炭块，切割公差严格控制在 < ±0.5 mm 以内，确保装箱空间极致致密与长途海运完好。',
    tolerance: '公差极限 ±0.5mm',
    dimLabel: '精确几何尺寸 (CAD)',
    ratioLabel: '每公斤炭块粒数',
    pcsUnit: '块 / 公斤',
    burnLabel: '有效持续燃烧时间',
    burnUnit: '小时 (恒温稳定)',
    tempLabel: '炭火核心燃烧温度',
    appLabel: '核心应用场景',
    packLabel: '包装方案推荐',
    moldLabel: '定制压模雕刻',
    moldSub: '支持在炭块表面精密压印买家专属凹凸品牌 Logo。',
    moqText: '该形状规格最小起订量 (MOQ):',
    ctaOem: '定制内外盒 OEM 包装设计',
  },
};

export default function ShapeCadMatrix() {
  const { locale, isRtl } = useLanguage();
  const t = SHAPES_I18N[locale] || SHAPES_I18N.en;

  const [selectedId, setSelectedId] = useState<string>('cube-25');
  const current = SHAPES[selectedId] || SHAPES['cube-25'];

  return (
    <section className="flex flex-col gap-6 bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 shadow-xl">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
          {t.kicker}
        </span>
        <h2 className="font-headline text-[22px] sm:text-[28px] font-bold text-on-surface">
          {t.title}
        </h2>
        <p className="font-body text-[14px] text-outline">
          {t.subtitle}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-surface-container p-1.5 rounded-xl border border-outline-variant/30">
        {Object.values(SHAPES).map((s) => {
          const isSelected = s.id === selectedId;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`px-3.5 py-2 rounded-lg font-headline text-[13px] font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-primary-container text-on-primary-container shadow-md'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      {/* Detail Area: Left CAD Blueprint + Right Spec Attributes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: CAD Blueprint */}
        <div className="lg:col-span-5 bg-surface-container rounded-xl p-5 flex flex-col justify-between border border-outline-variant/30 shadow-inner relative overflow-hidden">
          <div className="flex items-center justify-between font-mono text-[11px] text-outline uppercase tracking-wider mb-2">
            <span>
              CAD BLUEPRINT: <strong className="text-primary">{current.cadCode}</strong>
            </span>
            <span className="flex items-center gap-1 text-tertiary">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              {t.tolerance}
            </span>
          </div>

          {/* SVG Vector Blueprint */}
          <div className="w-full flex-1 min-h-[260px] flex items-center justify-center p-4 relative">
            <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cadGrid2" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cadGrid2)" />
            </svg>

            {/* Isometric Drawing */}
            <svg viewBox="0 0 240 220" className="w-48 sm:w-56 h-auto drop-shadow-xl z-10">
              <defs>
                <linearGradient id="cadGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4A3F39" />
                  <stop offset="100%" stopColor="#2E2824" />
                </linearGradient>
                <linearGradient id="cadGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1E1916" />
                  <stop offset="100%" stopColor="#2E2824" />
                </linearGradient>
                <linearGradient id="cadGradRight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#352D28" />
                  <stop offset="100%" stopColor="#181412" />
                </linearGradient>
              </defs>

              <polygon points="120,30 200,75 120,120 40,75" fill="url(#cadGradTop)" stroke="#FF8A52" strokeWidth="1.5" />
              <polygon points="40,75 120,120 120,195 40,150" fill="url(#cadGradLeft)" stroke="#FF8A52" strokeWidth="1.5" />
              <polygon points="120,120 200,75 200,150 120,195" fill="url(#cadGradRight)" stroke="#FF8A52" strokeWidth="1.5" />

              <line x1="30" y1="75" x2="30" y2="150" stroke="#00E676" strokeWidth="1" strokeDasharray="3 3" />
              <text x="10" y="115" fill="#00E676" fontSize="10" fontFamily="monospace" fontWeight="bold">H: {current.dimH}</text>

              <line x1="120" y1="205" x2="200" y2="160" stroke="#00E676" strokeWidth="1" strokeDasharray="3 3" />
              <text x="155" y="195" fill="#00E676" fontSize="10" fontFamily="monospace" fontWeight="bold">W: {current.dimW}</text>

              <line x1="208" y1="70" x2="128" y2="25" stroke="#00E676" strokeWidth="1" strokeDasharray="3 3" />
              <text x="175" y="45" fill="#00E676" fontSize="10" fontFamily="monospace" fontWeight="bold">D: {current.dimD}</text>
            </svg>
          </div>

          <div className="font-mono text-[10px] text-outline text-center border-t border-outline-variant/20 pt-2">
            HYDRAULIC DIE CODE: {current.cadCode} • TOLERANCE &lt; ±0.5MM
          </div>
        </div>

        {/* Right Column: Spec Attributes */}
        <div className="lg:col-span-7 bg-surface-container rounded-xl p-6 flex flex-col justify-between border border-outline-variant/30 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <div>
                <span className="font-mono text-[11px] text-outline uppercase tracking-wider block">
                  CATEGORY: {current.category}
                </span>
                <h3 className="font-headline text-[22px] font-bold text-on-surface">
                  {current.name}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary-container/20 border border-primary-container/40 text-primary font-mono text-[11px] font-bold">
                {current.badge[locale] || current.badge.en}
              </span>
            </div>

            {/* Attributes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-surface-container-high rounded-lg border border-outline-variant/20 flex flex-col">
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                  {t.dimLabel}
                </span>
                <span className="font-mono text-[14px] text-on-surface font-bold mt-1">
                  {current.dimText} (±0.5 mm)
                </span>
              </div>

              <div className="p-3 bg-surface-container-high rounded-lg border border-outline-variant/20 flex flex-col">
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                  {t.ratioLabel}
                </span>
                <span className="font-mono text-[14px] text-on-surface font-bold mt-1">
                  {current.pcsPerKg} {t.pcsUnit}
                </span>
              </div>

              <div className="p-3 bg-surface-container-high rounded-lg border border-outline-variant/20 flex flex-col">
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                  {t.burnLabel}
                </span>
                <span className="font-mono text-[14px] text-tertiary font-bold mt-1">
                  {current.burnHours} {t.burnUnit}
                </span>
              </div>

              <div className="p-3 bg-surface-container-high rounded-lg border border-outline-variant/20 flex flex-col">
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                  {t.tempLabel}
                </span>
                <span className="font-mono text-[14px] text-primary font-bold mt-1">
                  {current.temp[locale] || current.temp.en}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1 font-body text-[13px] text-on-surface-variant">
              <div className="flex items-start gap-2">
                <Store className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">{t.appLabel}:</strong> {current.app[locale] || current.app.en}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Box className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">{t.packLabel}:</strong> {current.pack[locale] || current.pack.en}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">{t.moldLabel}:</strong> {t.moldSub}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-3">
            <div className="font-mono text-[12px] text-outline">
              {t.moqText} <strong className="text-on-surface">1x 20ft FCL (~18 MT)</strong>
            </div>
            <Link
              href="/oem-studio"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-high text-primary hover:bg-primary-container hover:text-on-primary-container font-headline text-[12px] uppercase font-bold tracking-wider transition-colors"
            >
              <span>{t.ctaOem}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
