'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Flame, Scale, Timer, Ship, Download, ArrowRight, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface MetricProps {
  label: string;
  value: string;
  subtext: string;
  targetNumber?: number;
  suffix?: string;
  isHighlight?: boolean;
}

function AnimatedMetric({ label, value, subtext, targetNumber, suffix = '', isHighlight = false }: MetricProps) {
  const [displayNum, setDisplayNum] = useState(0);

  useEffect(() => {
    if (!targetNumber) return;
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = targetNumber / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setDisplayNum(targetNumber);
        clearInterval(timer);
      } else {
        setDisplayNum(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetNumber]);

  return (
    <div className="flex flex-col p-4 bg-surface-container rounded-xl border border-outline-variant/30 shadow-md">
      <div className="flex items-center justify-between text-outline mb-1">
        <span className="font-mono text-[11px] uppercase tracking-wider">{label}</span>
      </div>
      <div className={`font-mono text-[26px] font-bold ${isHighlight ? 'text-primary' : 'text-on-surface'}`}>
        {targetNumber ? `${displayNum.toLocaleString()}${suffix}` : value}
      </div>
      <span className="font-body text-[12px] text-tertiary font-medium mt-0.5">{subtext}</span>
    </div>
  );
}

const HUD_I18N = {
  en: {
    breadcrumb: ['EXPORT COMMODITIES', 'COCONUT SHELL CHARCOAL', '100% PLATINUM SHISHA GRADE'],
    title: '100% Pure Coconut Shell Charcoal Briquettes',
    titleAccent: '(Export Grade Shisha Platinum)',
    subtitle: 'Export-grade 100% pure mature coconut shell charcoal briquettes conforming to international shisha lounge standards in Dubai, Berlin, and Los Angeles. Zero wood coal mixing, zero synthetic oxidizers, and consistent 2.5-hour burn duration.',
    badges: {
      hs: 'HS CODE: 4402.90.10',
      imo: 'IMO NON-DG SPECIAL PROVISION 925 (SHTC PASSED)',
      sgs: 'SGS LAB CERTIFIED #SH-2026-COA',
      zeroWood: 'ZERO WOOD COAL GUARANTEE',
    },
    metrics: {
      ashLabel: 'Total Ash Content',
      ashVal: '2.05%',
      ashSub: 'Natural Snow White Ash (< 2.2%)',
      calorificLabel: 'Gross Calorific',
      calorificSub: 'Stable High Heat & 0% Sparks',
      burnLabel: 'Burning Duration',
      burnVal: '2.5 Hours',
      burnSub: '150 Minutes Constant Glow',
      moqLabel: 'Minimum Order (MOQ)',
      moqVal: '1x 20ft FCL',
      moqSub: '18 Metric Tons (1,800 Boxes)',
    },
    actions: {
      tds: 'Download TDS & Lab COA (.PDF)',
      planner: 'Calculate Container & View FOB Price',
      port: 'PORT OF DISPATCH: FOB SURABAYA (TANJUNG PERAK)',
    },
  },
  id: {
    breadcrumb: ['KOMODITAS EKSPOR', 'BRIKET BATOK KELAPA', '100% GRADE PLATINUM SHISHA'],
    title: '100% Briket Arang Batok Kelapa Murni',
    titleAccent: '(Grade Ekspor Shisha Platinum)',
    subtitle: 'Briket arang batok kelapa tua murni kualitas ekspor standar shisha lounge internasional di Dubai, Berlin, dan Los Angeles. Tanpa campuran serbuk kayu, tanpa zat kimia pengoksidasi, dan pembakaran konsisten hingga 2.5 jam.',
    badges: {
      hs: 'HS CODE: 4402.90.10',
      imo: 'IMO NON-DG SPECIAL PROVISION 925 (SHTC PASSED)',
      sgs: 'SGS LAB CERTIFIED #SH-2026-COA',
      zeroWood: 'ZERO WOOD COAL GUARANTEE',
    },
    metrics: {
      ashLabel: 'Kadar Abu Total',
      ashVal: '2.05%',
      ashSub: 'Abu Putih Alami (Snow White)',
      calorificLabel: 'Kalori Bruto',
      calorificSub: 'Panas Stabil & Tinggi',
      burnLabel: 'Durasi Pembakaran',
      burnVal: '2.5 Jam',
      burnSub: '150 Menit Non-Stop Panas',
      moqLabel: 'Minimum Order (MOQ)',
      moqVal: '1x 20ft FCL',
      moqSub: '18 Metric Tonnes (1,800 Box)',
    },
    actions: {
      tds: 'Unduh TDS & COA Laboratorium (.PDF)',
      planner: 'Kalkulasi Kontainer & Buka Harga FOB',
      port: 'PORT OF DISPATCH: FOB SURABAYA (TANJUNG PERAK)',
    },
  },
  ar: {
    breadcrumb: ['السلع التصديرية', 'فحم قشور جوز الهند', 'درجة بلاتينية فاخرة 100%'],
    title: 'فحم جوز هند طبيعي 100% للشيشة والشواء',
    titleAccent: '(درجة بلاتينية فاخرة للشرق الأوسط)',
    subtitle: 'مكعبات فحم قشور جوز هند طبيعية 100% مطابقة لمعايير مقاهي الشيشة العالمية في دبي وبرلين ولوس أنجلوس. خالية من فحم الخشب، بدون مواد كيميائية مسرعة، واحتراق مستقر يدوم 2.5 ساعة متواصلة.',
    badges: {
      hs: 'رمز النظام المنسق: 4402.90.10',
      imo: 'معفى من البضائع الخطرة IMO NON-DG SP925',
      sgs: 'معتمد من مختبر SGS الدولي #SH-2026',
      zeroWood: 'ضمان 0% فحم خشب أو شوائب',
    },
    metrics: {
      ashLabel: 'نسبة الرماد الكلية',
      ashVal: '2.05%',
      ashSub: 'رماد أبيض ناصع طبيعي (< 2.2%)',
      calorificLabel: 'القيمة الحرارية الكلية',
      calorificSub: 'حرارة ثابتة ومرتفعة وبدون شرر',
      burnLabel: 'مدة الاشتعال',
      burnVal: '2.5 ساعة',
      burnSub: '150 دقيقة حرارة مستمرة',
      moqLabel: 'الحد الأدنى للطلب (MOQ)',
      moqVal: '1x 20ft FCL',
      moqSub: '18 طن متري (1,800 كرتونة)',
    },
    actions: {
      tds: 'تحميل تقرير التحليل المخبري (.PDF)',
      planner: 'حاسبة الحاويات وعرض سعر FOB',
      port: 'ميناء الشحن: فوب سورابايا (تانجونغ بيراك)',
    },
  },
  zh: {
    breadcrumb: ['出口大宗商品', '椰壳炭块', '100% 顶级白金水烟级'],
    title: '100% 纯天然椰壳炭块',
    titleAccent: '(白金出口级 水烟与烧烤)',
    subtitle: '100% 纯天然成熟椰壳出口级炭块，符合迪拜、柏林和洛杉矶国际高档水烟馆严苛标准。零杂木煤炭掺假、零化学助燃氧化剂、持久稳定燃烧2.5小时。',
    badges: {
      hs: '海关编码 HS: 4402.90.10',
      imo: '国际海事 IMO NON-DG SP925 豁免',
      sgs: 'SGS 官方实验室质检报告 #SH-2026',
      zeroWood: '100% 纯椰壳 零杂木煤炭保证',
    },
    metrics: {
      ashLabel: '总灰分含量',
      ashVal: '2.05%',
      ashSub: '天然纯白雪灰 (< 2.2%)',
      calorificLabel: '总发热量',
      calorificSub: '高热值稳定持久且无火星',
      burnLabel: '燃烧时间',
      burnVal: '2.5 小时',
      burnSub: '150 分钟恒温持续燃烧',
      moqLabel: '最小起订量 (MOQ)',
      moqVal: '1x 20ft FCL',
      moqSub: '18 公吨整柜 (1,800 箱)',
    },
    actions: {
      tds: '下载技术规格书 TDS 与 SGS 报告 (.PDF)',
      planner: '测算集装箱与开具 FOB 报价',
      port: '始发装运港: 泗水丹戎佩拉 (SUB PORT)',
    },
  },
};

export default function HeroTelemetryHud() {
  const { locale, isRtl } = useLanguage();
  const t = HUD_I18N[locale] || HUD_I18N.en;

  return (
    <section className="flex flex-col gap-6 bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 shadow-xl relative overflow-hidden">
      {/* Glow flare */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Monospace breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-outline flex-wrap">
        <Link href="/products" className="hover:text-primary transition-colors">
          {t.breadcrumb[0]}
        </Link>
        <span>/</span>
        <span className="hover:text-primary transition-colors">{t.breadcrumb[1]}</span>
        <span>/</span>
        <span className="text-primary font-semibold">{t.breadcrumb[2]}</span>
      </nav>

      {/* Headline & Visual Stage Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <h1 className="font-headline text-[32px] sm:text-[40px] lg:text-[44px] leading-tight text-on-surface tracking-tight font-extrabold">
            {t.title}{' '}
            <span className="font-editorial italic font-normal text-secondary block sm:inline">
              {t.titleAccent}
            </span>
          </h1>
          <p className="font-body text-[15px] sm:text-[16px] text-on-surface-variant max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>

          {/* Compliance Badges Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant/30 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span>
                <strong className="text-primary font-bold">{t.badges.hs}</strong>
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tertiary-container/30 border border-tertiary-container/50 text-tertiary-fixed font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4 text-tertiary" />
              <span>{t.badges.imo}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant/30 font-mono text-[11px]">
              <Award className="w-4 h-4 text-secondary" />
              <span>{t.badges.sgs}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container/20 border border-primary-container/40 text-primary-fixed font-mono text-[11px]">
              <Flame className="w-4 h-4 text-primary" />
              <span>{t.badges.zeroWood}</span>
            </div>
          </div>
        </div>

        {/* Right Product Photo Showcase (4 Cols) */}
        <div className="lg:col-span-4 relative">
          <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center p-4 overflow-hidden shadow-2xl group">
            {/* Glowing Ember Backlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/25 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <img
              src="/img/shisha-charcoal-cutout.png"
              alt="100% Batok Kelapa Charcoal Briquettes Cutout"
              className="max-h-full max-w-[90%] object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500 z-10"
            />

            <div className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between font-mono text-[10px] text-white/90 z-20">
              <span className="text-primary font-bold">CUBE C25 (25MM)</span>
              <span className="text-[#A1A1AA]">72 PCS / KG</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quick Spec Metric Chips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <AnimatedMetric
          label={t.metrics.ashLabel}
          value={t.metrics.ashVal}
          subtext={t.metrics.ashSub}
          isHighlight={false}
        />
        <AnimatedMetric
          label={t.metrics.calorificLabel}
          value="7,580"
          targetNumber={7580}
          suffix=" kcal/kg"
          subtext={t.metrics.calorificSub}
          isHighlight={true}
        />
        <AnimatedMetric
          label={t.metrics.burnLabel}
          value={t.metrics.burnVal}
          subtext={t.metrics.burnSub}
          isHighlight={false}
        />
        <AnimatedMetric
          label={t.metrics.moqLabel}
          value={t.metrics.moqVal}
          subtext={t.metrics.moqSub}
          isHighlight={false}
        />
      </div>

      {/* Action Row */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-outline-variant/20">
        <Link
          href="#lab-specs"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface hover:text-primary transition-colors font-headline text-[13px] uppercase tracking-wider font-semibold"
        >
          <Download className="w-4 h-4 text-primary" />
          <span>{t.actions.tds}</span>
        </Link>
        <Link
          href="/container-planner"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-[#D94E13] transition-colors font-headline text-[13px] uppercase tracking-wider font-bold shadow-[0_0_16px_rgba(255,138,82,0.35)]"
        >
          <span>{t.actions.planner}</span>
          <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
        </Link>
        <span className="font-mono text-[11px] text-outline ml-auto">
          {t.actions.port}
        </span>
      </div>
    </section>
  );
}
