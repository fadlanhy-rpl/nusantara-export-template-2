'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Coffee, Sparkles, Scale } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface ShowcaseCommodity {
  id: string;
  name: string;
  category: string;
  hsCode: string;
  image: string;
  secondaryImage?: string;
  secondaryName?: string;
  specs: { label: string; value: string }[];
  origin: string;
  coordinates: string;
  glowColor: string;
  accentColor: string;
  badge: string;
  fob: string;
  moq: string;
  link: string;
}

const SHOWCASE_I18N = {
  en: {
    fobLabel: 'FOB PRICE INDICATION',
    btnVerify: 'Verify Quality & Lab Specs',
    btnSimulate: 'Container Simulator',
    primaryCutout: 'Primary Cutout',
    interactivePill: 'INTERACTIVE 3D PARALLAX STAGE',
    commodities: [
      {
        id: 'charcoal',
        name: '100% Pure Coconut Shell Charcoal Briquettes',
        shortName: 'Coconut Charcoal',
        category: '100% Mature Coconut Shell Carbon',
        hsCode: 'HS 4402.90.10',
        image: '/img/shisha-charcoal-cutout.png',
        secondaryImage: '/img/bbq-charcoal-cutout.png',
        secondaryName: 'Hexagonal BBQ Grade',
        specs: [
          { label: 'Ash Content', value: '< 2.2% Snow White' },
          { label: 'Gross Calorific', value: '7,500+ kcal/kg' },
          { label: 'Burn Duration', value: '2.5 Hours Steady' },
        ],
        origin: 'FACTORY: GRESIK, EAST JAVA (SUB PORT)',
        coordinates: '07°09\'23"S 112°39\'19"E',
        glowColor: 'rgba(232, 116, 42, 0.35)',
        accentColor: '#E8742A',
        badge: 'IMO NON-DG SP925 PASSED • PLATINUM GRADE',
        fob: '$1,280 – $1,340 / MT',
        moq: '1x 20ft FCL (18 MT / 1,800 Boxes)',
        link: '/products/100-briket-arang-batok-kelapa',
      },
      {
        id: 'coffee',
        name: 'Sumatra Mandheling & Gayo Green Coffee Beans',
        shortName: 'Green Coffee',
        category: 'Specialty Grade 1 Arabica (Triple Picked)',
        hsCode: 'HS 0901.11.00',
        image: '/img/green-coffee-cutout.png',
        secondaryImage: '/img/assets/coffee.webp',
        secondaryName: 'Wet-Hulled Process',
        specs: [
          { label: 'Moisture Content', value: '11.5% - 12.0%' },
          { label: 'Defect Rate', value: '< 3% Triple Pick' },
          { label: 'SCA Cupping', value: '85.5+ Points' },
        ],
        origin: 'GAYO & LINTONG HIGHLANDS (1,450 MASL)',
        coordinates: '04°41\'28"N 96°51\'40"E',
        glowColor: 'rgba(62, 142, 92, 0.32)',
        accentColor: '#3E8E5C',
        badge: 'SPECIALTY G1 • TRIPLE PICKED',
        fob: '$6,800 – $7,400 / MT',
        moq: '1x 20ft FCL (19.2 MT / 320 Bags)',
        link: '/products/green-coffee',
      },
      {
        id: 'spices',
        name: 'Maluku Lalpari Cloves & Cassia Vera AA Quills',
        shortName: 'Whole Spices',
        category: 'Handpicked Sun-Dried Export Spices',
        hsCode: 'HS 0907.10.00',
        image: '/img/cloves-spices-cutout.png',
        secondaryImage: '/img/cinnamon-spices-cutout.png',
        secondaryName: 'Kerinci Cassia AA',
        specs: [
          { label: 'Eugenol Oil', value: '> 18.2% GC-MS' },
          { label: 'Head Intact', value: '> 95% Plump' },
          { label: 'Max Moisture', value: '< 12.0% Safe' },
        ],
        origin: 'AMBON (MALUKU) & KERINCI (SUMATRA)',
        coordinates: '03°41\'42"S 128°10\'55"E',
        glowColor: 'rgba(217, 148, 64, 0.32)',
        accentColor: '#D99440',
        badge: 'EXPORT GRADE • STEAM CLEANED',
        fob: '$8,200 – $9,600 / MT',
        moq: '1x 20ft FCL (10-14 MT)',
        link: '/products/whole-spices',
      },
    ],
  },
  id: {
    fobLabel: 'INDIKASI HARGA FOB',
    btnVerify: 'Verifikasi Mutu & Spesifikasi Lab',
    btnSimulate: 'Simulasi Kontainer',
    primaryCutout: 'Tampilan Utama',
    interactivePill: 'PANGGUNG PARALAKS 3D INTERAKTIF',
    commodities: [
      {
        id: 'charcoal',
        name: '100% Briket Arang Batok Kelapa Murni',
        shortName: 'Briket Arang',
        category: '100% Mature Coconut Shell Carbon',
        hsCode: 'HS 4402.90.10',
        image: '/img/shisha-charcoal-cutout.png',
        secondaryImage: '/img/bbq-charcoal-cutout.png',
        secondaryName: 'Hexagonal BBQ Grade',
        specs: [
          { label: 'Kadar Abu', value: '< 2.2% Abu Putih' },
          { label: 'Kalori Bruto', value: '7,500+ kcal/kg' },
          { label: 'Durasi Bara', value: '2.5 Jam Konsisten' },
        ],
        origin: 'PABRIK: GRESIK, JAWA TIMUR (PELABUHAN SUB)',
        coordinates: '07°09\'23"S 112°39\'19"E',
        glowColor: 'rgba(232, 116, 42, 0.35)',
        accentColor: '#E8742A',
        badge: 'IMO NON-DG SP925 PASSED • PLATINUM GRADE',
        fob: '$1,280 – $1,340 / MT',
        moq: '1x 20ft FCL (18 MT / 1,800 Box)',
        link: '/products/100-briket-arang-batok-kelapa',
      },
      {
        id: 'coffee',
        name: 'Sumatra Mandheling & Gayo Green Coffee',
        shortName: 'Kopi Hijau',
        category: 'Specialty Grade 1 Arabica (Triple Picked)',
        hsCode: 'HS 0901.11.00',
        image: '/img/green-coffee-cutout.png',
        secondaryImage: '/img/assets/coffee.webp',
        secondaryName: 'Wet-Hulled Process',
        specs: [
          { label: 'Kadar Air', value: '11.5% - 12.0%' },
          { label: 'Defect Rate', value: '< 3% Triple Pick' },
          { label: 'SCA Cupping', value: '85.5+ Points' },
        ],
        origin: 'DATARAN TINGGI GAYO & LINTONG (1,450 MASL)',
        coordinates: '04°41\'28"N 96°51\'40"E',
        glowColor: 'rgba(62, 142, 92, 0.32)',
        accentColor: '#3E8E5C',
        badge: 'SPECIALTY G1 • TRIPLE PICKED',
        fob: '$6,800 – $7,400 / MT',
        moq: '1x 20ft FCL (19.2 MT / 320 Karung)',
        link: '/products/green-coffee',
      },
      {
        id: 'spices',
        name: 'Maluku Lalpari Cloves & Cassia Vera AA',
        shortName: 'Rempah Cengkeh',
        category: 'Handpicked Sun-Dried Export Spices',
        hsCode: 'HS 0907.10.00',
        image: '/img/cloves-spices-cutout.png',
        secondaryImage: '/img/cinnamon-spices-cutout.png',
        secondaryName: 'Kerinci Cassia AA',
        specs: [
          { label: 'Minyak Eugenol', value: '> 18.2% GC-MS' },
          { label: 'Kepala Utuh', value: '> 95% Plump' },
          { label: 'Kadar Air', value: '< 12.0% Aman' },
        ],
        origin: 'AMBON (MALUKU) & KERINCI (SUMATRA)',
        coordinates: '03°41\'42"S 128°10\'55"E',
        glowColor: 'rgba(217, 148, 64, 0.32)',
        accentColor: '#D99440',
        badge: 'EXPORT GRADE • STEAM CLEANED',
        fob: '$8,200 – $9,600 / MT',
        moq: '1x 20ft FCL (10-14 MT)',
        link: '/products/whole-spices',
      },
    ],
  },
  ar: {
    fobLabel: 'السعر الاسترشادي FOB',
    btnVerify: 'التحقق من الجودة والمواصفات المخبرية',
    btnSimulate: 'محاكاة حمولة الحاوية',
    primaryCutout: 'العرض الأساسي',
    interactivePill: 'منصة تفاعلية ثلاثية الأبعاد 3D',
    commodities: [
      {
        id: 'charcoal',
        name: 'فحم جوز الهند الطبيعي 100% للشيشة والشواء',
        shortName: 'فحم جوز الهند',
        category: 'كربون قشور جوز هند ناضجة 100%',
        hsCode: 'HS 4402.90.10',
        image: '/img/shisha-charcoal-cutout.png',
        secondaryImage: '/img/bbq-charcoal-cutout.png',
        secondaryName: 'درجة شواء سداسي BBQ',
        specs: [
          { label: 'نسبة الرماد', value: '< 2.2% أبيض ناصع' },
          { label: 'الطاقة الحرارية', value: '7,500+ سعرة/كغ' },
          { label: 'مدة الاشتعال', value: 'ساعتان ونصف مستمرة' },
        ],
        origin: 'المصنع: غريسيك، جاوة الشرقية (ميناء SUB)',
        coordinates: '07°09\'23"S 112°39\'19"E',
        glowColor: 'rgba(232, 116, 42, 0.35)',
        accentColor: '#E8742A',
        badge: 'معتمد IMO NON-DG SP925 • درجة بلاتينية',
        fob: '$1,280 – $1,340 / طن',
        moq: 'حاوية 20ft FCL (18 طن / 1,800 كرتون)',
        link: '/products/100-briket-arang-batok-kelapa',
      },
      {
        id: 'coffee',
        name: 'حبوب البن الأخضر سومطرة مانديلينغ وجايو',
        shortName: 'البن الأخضر',
        category: 'أرابيكا مختصة أولى (فرز يدوي ثلاثي)',
        hsCode: 'HS 0901.11.00',
        image: '/img/green-coffee-cutout.png',
        secondaryImage: '/img/assets/coffee.webp',
        secondaryName: 'معالجة التجفيف الرطب التقليدي',
        specs: [
          { label: 'نسبة الرطوبة', value: '11.5% - 12.0%' },
          { label: 'نسبة العيوب', value: '< 3% فرز ثلاثي' },
          { label: 'تقييم SCA', value: '85.5+ نقطة' },
        ],
        origin: 'مرتفعات جايو ولينتونغ (1,450 م فوق البحر)',
        coordinates: '04°41\'28"N 96°51\'40"E',
        glowColor: 'rgba(62, 142, 92, 0.32)',
        accentColor: '#3E8E5C',
        badge: 'درجة مختصة G1 • فرز ثلاثي',
        fob: '$6,800 – $7,400 / طن',
        moq: 'حاوية 20ft FCL (19.2 طن / 320 كيس خيش)',
        link: '/products/green-coffee',
      },
      {
        id: 'spices',
        name: 'قرنفل ملوكو لالباري وعيدان قرفة كاسيا فيرا AA',
        shortName: 'التوابل والقرنفل',
        category: 'توابل تصدير منتقاة ومجففة شمسياً',
        hsCode: 'HS 0907.10.00',
        image: '/img/cloves-spices-cutout.png',
        secondaryImage: '/img/cinnamon-spices-cutout.png',
        secondaryName: 'قرفة كيرينتشي AA',
        specs: [
          { label: 'زيت الأوجينول', value: '> 18.2% GC-MS' },
          { label: 'رؤوس سليمة', value: '> 95% ممتلئة' },
          { label: 'أقصى رطوبة', value: '< 12.0% آمنة' },
        ],
        origin: 'أمبون (ملوكو) وكيرينتشي (سومطرة)',
        coordinates: '03°41\'42"S 128°10\'55"E',
        glowColor: 'rgba(217, 148, 64, 0.32)',
        accentColor: '#D99440',
        badge: 'درجة تصدير • تنظيف بالبخار',
        fob: '$8,200 – $9,600 / طن',
        moq: 'حاوية 20ft FCL (10-14 طن)',
        link: '/products/whole-spices',
      },
    ],
  },
  zh: {
    fobLabel: 'FOB 离岸指导价',
    btnVerify: '查验品质与实验室检测指标',
    btnSimulate: '集装箱装载模拟',
    primaryCutout: '主视角',
    interactivePill: '可交互 3D 视差视觉展台',
    commodities: [
      {
        id: 'charcoal',
        name: '100% 纯椰壳炭块 (水烟白金级)',
        shortName: '纯椰壳炭',
        category: '100% Mature Coconut Shell Carbon',
        hsCode: 'HS 4402.90.10',
        image: '/img/shisha-charcoal-cutout.png',
        secondaryImage: '/img/bbq-charcoal-cutout.png',
        secondaryName: '六角形烧烤炭 Hexagonal BBQ',
        specs: [
          { label: '灰分含量', value: '< 2.2% 纯白雪灰' },
          { label: '高位发热量', value: '7,500+ kcal/kg' },
          { label: '恒温燃烧时长', value: '2.5 小时稳定' },
        ],
        origin: '生产基地: 东爪哇锦石 (丹戎佩拉港)',
        coordinates: '07°09\'23"S 112°39\'19"E',
        glowColor: 'rgba(232, 116, 42, 0.35)',
        accentColor: '#E8742A',
        badge: '通过 IMO NON-DG SP925 • 白金品质',
        fob: '$1,280 – $1,340 / MT',
        moq: '1x 20ft FCL (18 MT / 1,800 箱)',
        link: '/products/100-briket-arang-batok-kelapa',
      },
      {
        id: 'coffee',
        name: '苏门答腊曼特宁与加幼精品阿拉比卡生豆',
        shortName: '精品生豆',
        category: '特级 Grade 1 阿拉比卡 (三次人工精选 TP)',
        hsCode: 'HS 0901.11.00',
        image: '/img/green-coffee-cutout.png',
        secondaryImage: '/img/assets/coffee.webp',
        secondaryName: '传统湿刨法处理 Wet-Hulled',
        specs: [
          { label: '含水率指标', value: '11.5% - 12.0%' },
          { label: '瑕疵豆率', value: '< 3% 三次精选' },
          { label: 'SCA 专业杯测', value: '85.5+ 分' },
        ],
        origin: '加幼与林东火山高地 (海拔 1,450 米)',
        coordinates: '04°41\'28"N 96°51\'40"E',
        glowColor: 'rgba(62, 142, 92, 0.32)',
        accentColor: '#3E8E5C',
        badge: '精品 G1 级 • TRIPLE PICKED',
        fob: '$6,800 – $7,400 / MT',
        moq: '1x 20ft FCL (19.2 MT / 320 麻袋)',
        link: '/products/green-coffee',
      },
      {
        id: 'spices',
        name: '马鲁古 Lalpari 丁香与葛林芝 Cassia AA 肉桂卷',
        shortName: '天然香料',
        category: '手工精选赤道纯天然出口香料',
        hsCode: 'HS 0907.10.00',
        image: '/img/cloves-spices-cutout.png',
        secondaryImage: '/img/cinnamon-spices-cutout.png',
        secondaryName: '葛林芝肉桂卷 Cassia AA',
        specs: [
          { label: '丁香酚精油', value: '> 18.2% GC-MS' },
          { label: '带头完整饱满度', value: '> 95% Plump' },
          { label: '安全最高水分', value: '< 12.0% 安全' },
        ],
        origin: '安汶 (马鲁古) 与 葛林芝 (苏门答腊)',
        coordinates: '03°41\'42"S 128°10\'55"E',
        glowColor: 'rgba(217, 148, 64, 0.32)',
        accentColor: '#D99440',
        badge: '出口级品质 • 蒸汽净化无熏硫',
        fob: '$8,200 – $9,600 / MT',
        moq: '1x 20ft FCL (10-14 MT)',
        link: '/products/whole-spices',
      },
    ],
  },
};

export default function CommodityShowcase3D() {
  const { locale } = useLanguage();
  const t = SHOWCASE_I18N[locale] || SHOWCASE_I18N.en;

  const [activeIdx, setActiveIdx] = useState(0);
  const [subVariant, setSubVariant] = useState<0 | 1>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const targetTilt = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const currentTilt = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const activeCommodity = t.commodities[activeIdx] || t.commodities[0];

  // 60FPS spring damping tilt physics
  useEffect(() => {
    let active = true;
    const update = () => {
      if (!active) return;
      const ease = 0.12;
      currentTilt.current.rx += (targetTilt.current.rx - currentTilt.current.rx) * ease;
      currentTilt.current.ry += (targetTilt.current.ry - currentTilt.current.ry) * ease;
      currentTilt.current.gx += (targetTilt.current.gx - currentTilt.current.gx) * ease;
      currentTilt.current.gy += (targetTilt.current.gy - currentTilt.current.gy) * ease;

      setTilt({
        rx: parseFloat(currentTilt.current.rx.toFixed(2)),
        ry: parseFloat(currentTilt.current.ry.toFixed(2)),
        gx: parseFloat(currentTilt.current.gx.toFixed(1)),
        gy: parseFloat(currentTilt.current.gy.toFixed(1)),
      });

      animFrameRef.current = requestAnimationFrame(update);
    };

    animFrameRef.current = requestAnimationFrame(update);
    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const dx = (x - 0.5) * 2;
    const dy = (y - 0.5) * 2;

    const MAX_TILT = 12;
    targetTilt.current.rx = -dy * MAX_TILT;
    targetTilt.current.ry = dx * MAX_TILT;
    targetTilt.current.gx = x * 100;
    targetTilt.current.gy = y * 100;
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetTilt.current.rx = 0;
    targetTilt.current.ry = 0;
    targetTilt.current.gx = 50;
    targetTilt.current.gy = 50;
  };

  const currentImage = subVariant === 1 && activeCommodity.secondaryImage 
    ? activeCommodity.secondaryImage 
    : activeCommodity.image;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/30 pb-3">
        <div className="flex flex-wrap gap-2">
          {t.commodities.map((c, i) => {
            const isActive = activeIdx === i;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveIdx(i);
                  setSubVariant(0);
                }}
                className={`px-4 py-2 rounded-lg font-headline text-[13px] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container shadow-md'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {i === 0 && <Flame className="w-4 h-4 text-primary" />}
                {i === 1 && <Coffee className="w-4 h-4 text-tertiary" />}
                {i === 2 && <Sparkles className="w-4 h-4 text-secondary" />}
                <span>{c.shortName}</span>
              </button>
            );
          })}
        </div>

        <div className="font-mono text-[11px] text-outline flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span>{t.interactivePill}</span>
        </div>
      </div>

      {/* Main 3D Stage Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[520px] sm:h-[560px] rounded-2xl overflow-hidden select-none transition-shadow duration-500 border border-outline-variant/40 shadow-2xl"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, #1E1A17 0%, #151311 45%, #0D0D0E 90%)`,
          boxShadow: isHovered
            ? `0 30px 60px -12px rgba(0,0,0,0.85), 0 0 45px -10px ${activeCommodity.glowColor}`
            : '0 20px 45px -15px rgba(0,0,0,0.7)',
        }}
      >
        {/* Ambient Grid & Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-300"
          style={{ transform: `translateZ(10px) translate(${-tilt.ry * 0.4}px, ${tilt.rx * 0.4}px)` }}
        >
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(245,245,244,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,244,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] border-t border-dashed border-white/[0.08]" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-white/[0.08]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-dashed border-white/[0.05]" />

          {/* Dynamic Ambient Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full blur-3xl pointer-events-none transition-all duration-700"
            style={{
              backgroundColor: activeCommodity.glowColor,
              opacity: isHovered ? 0.8 : 0.45,
            }}
          />
        </div>

        {/* Top HUD Telemetry */}
        <div
          className="absolute top-0 inset-x-0 p-5 sm:p-6 flex items-start justify-between gap-3 pointer-events-none z-20 transition-transform duration-300"
          style={{ transform: `translateZ(40px) translate(${tilt.ry * 0.5}px, ${-tilt.rx * 0.5}px)` }}
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono shadow-md">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: activeCommodity.accentColor }}
              />
              <span className="text-white font-medium text-[11px] tracking-wide">
                {activeCommodity.badge}
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#A1A1AA] tracking-widest uppercase pl-1">
              {activeCommodity.origin}
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-semibold shadow-md">
              <span className="text-[#A1A1AA] text-[10px]">TARIFF</span>
              <span style={{ color: activeCommodity.accentColor }}>{activeCommodity.hsCode}</span>
            </div>
            <div className="text-[10px] font-mono text-white/40 tracking-wider">
              {activeCommodity.coordinates}
            </div>
          </div>
        </div>

        {/* Sub-variant toggle if secondary image available */}
        {activeCommodity.secondaryImage && (
          <div
            className="absolute top-20 right-5 sm:right-6 z-20 flex flex-col gap-1.5 transition-transform duration-300"
            style={{ transform: 'translateZ(45px)' }}
          >
            <button
              type="button"
              onClick={() => setSubVariant(0)}
              className={`px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${
                subVariant === 0
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                  : 'bg-black/60 text-[#A1A1AA] hover:text-white border border-white/10'
              }`}
            >
              {t.primaryCutout}
            </button>
            <button
              type="button"
              onClick={() => setSubVariant(1)}
              className={`px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${
                subVariant === 1
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                  : 'bg-black/60 text-[#A1A1AA] hover:text-white border border-white/10'
              }`}
            >
              {activeCommodity.secondaryName || 'Secondary View'}
            </button>
          </div>
        )}

        {/* Floating 3D Product PNG Cutout */}
        <div
          className="absolute inset-0 flex items-center justify-center p-8 z-10 pointer-events-none"
          style={{
            transform: `translateZ(65px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.03, 1.03, 1.03)`,
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            key={`${activeIdx}-${subVariant}`}
            className="relative max-w-[85%] max-h-[66%] flex items-center justify-center transition-all duration-700 ease-out"
          >
            <img
              src={currentImage}
              alt={activeCommodity.name}
              draggable={false}
              className="w-auto h-auto max-h-[280px] sm:max-h-[320px] max-w-full object-contain select-none transition-transform duration-500"
              style={{
                filter: `
                  drop-shadow(${tilt.ry * -1.8}px ${30 + tilt.rx * 1.2}px 38px rgba(0, 0, 0, 0.92))
                  drop-shadow(${tilt.ry * -0.8}px ${12 + tilt.rx * 0.5}px 14px rgba(0, 0, 0, 0.65))
                  brightness(1.04) contrast(1.08)
                `,
              }}
            />
          </div>
        </div>

        {/* Bottom Technical HUD Specifications & CTA */}
        <div
          className="absolute bottom-0 inset-x-0 p-5 sm:p-6 pt-10 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/90 to-transparent z-20 space-y-3 pointer-events-auto transition-transform duration-300"
          style={{ transform: `translateZ(35px) translate(${tilt.ry * 0.3}px, ${-tilt.rx * 0.3}px)` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-[11px] font-mono text-[#A1A1AA] uppercase tracking-wider">
                {activeCommodity.category}
              </div>
              <h3 className="font-headline text-[18px] sm:text-[22px] font-bold text-white tracking-tight leading-snug">
                {activeCommodity.name}
              </h3>
            </div>
            <div className="font-mono text-[13px] text-right">
              <span className="text-[#A1A1AA] text-[11px] block">{t.fobLabel}</span>
              <strong className="text-white text-[15px] font-bold">{activeCommodity.fob}</strong>
            </div>
          </div>

          {/* 3 Lab Parameters */}
          <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#14171E]/80 backdrop-blur-md border border-white/10 text-xs font-mono">
            {activeCommodity.specs.map((sp, sIdx) => (
              <div key={sIdx} className="text-center px-1">
                <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider truncate">
                  {sp.label}
                </div>
                <div className="font-bold text-white pt-0.5 text-[11px] sm:text-[13px] truncate">
                  {sp.value}
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href={activeCommodity.link}
              className="flex-1 py-2.5 px-4 rounded-xl text-on-primary-container font-headline text-[13px] font-semibold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              style={{ backgroundColor: activeCommodity.accentColor }}
            >
              <span>{t.btnVerify}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 shrink-0" />
            </Link>
            <Link
              href="/container-planner"
              className="py-2.5 px-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-headline text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Scale className="w-4 h-4 text-primary shrink-0" />
              <span>{t.btnSimulate}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
