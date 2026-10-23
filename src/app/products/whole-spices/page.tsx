'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const SPICES_I18N = {
  en: {
    breadcrumb: 'EXPORT COMMODITIES',
    commodity: 'WHOLE SPICES',
    title: 'Maluku Lalpari Cloves & Cassia Vera AA Quills',
    desc: 'Lalpari whole cloves from the Maluku archipelago featuring essential eugenol oil content > 18% and plump intact heads > 95%, alongside pristine Cassia Vera AA cinnamon quills sourced from the slopes of Mount Kerinci, Sumatra.',
    hsCloves: 'CLOVES HS CODE: 0907.10.00',
    hsCassia: 'CINNAMON HS CODE: 0906.11.00',
    eugenolBadge: 'EUGENOL CONTENT: > 18% GC-MS PASSED',
    cloveTag: 'LALPARI CLOVES',
    cleanTag: 'STEAM CLEANED',
    metric1Label: 'Essential Oil (Eugenol)',
    metric1Sub: 'Natural Strong Aroma',
    metric2Label: 'Intact Clove Heads',
    metric2Sub: 'Minimal Headless (< 5%)',
    metric3Label: 'Maximum Moisture',
    metric3Sub: 'Mould & Fungus Free',
    metric4Label: 'Export Packaging',
    metric4Sub: 'PP Woven + Poly Liner',
    ctaBtn: 'Request Whole Spices Quote via WhatsApp',
    waText: 'Hello NusantaraOrigin, I am interested in Maluku Lalpari Cloves and Cassia Vera AA Cinnamon export pricing.',
  },
  id: {
    breadcrumb: 'KOMODITAS EKSPOR',
    commodity: 'REMPAH UTUH',
    title: 'Maluku Lalpari Cloves & Cassia Vera AA Quills',
    desc: 'Cengkeh utuh Lalpari dari kepulauan Maluku dengan kadar minyak atsiri eugenol > 18% dan kepala utuh > 95%, bersanding dengan kayu manis Cassia Vera AA dari lereng Gunung Kerinci, Sumatra.',
    hsCloves: 'HS CODE CENGKEH: 0907.10.00',
    hsCassia: 'HS CODE KAYU MANIS: 0906.11.00',
    eugenolBadge: 'EUGENOL CONTENT: > 18% GC-MS PASSED',
    cloveTag: 'LALPARI CLOVES',
    cleanTag: 'STEAM CLEANED',
    metric1Label: 'Minyak Atsiri (Eugenol)',
    metric1Sub: 'Aroma Kuat Alami',
    metric2Label: 'Kepala Cengkeh Utuh',
    metric2Sub: 'Minimal Headless (< 5%)',
    metric3Label: 'Kadar Air Maksimal',
    metric3Sub: 'Bebas Jamur & Mould',
    metric4Label: 'Kemasan Master',
    metric4Sub: 'PP Woven + Poly Liner',
    ctaBtn: 'Minta Penawaran Rempah Ekspor via WhatsApp',
    waText: 'Halo NusantaraOrigin, saya tertarik dengan Cengkeh Maluku Lalpari dan Cassia Vera AA.',
  },
  ar: {
    breadcrumb: 'السلع الزراعية التصديرية',
    commodity: 'التوابل الكاملة',
    title: 'قرنفل ملوكو لالباري وعيدان قرفة كاسيا فيرا AA',
    desc: 'قرنفل لالباري كامل من جزر الملوك بنسبة زيت الأوجينول الطيار > 18% ورؤوس سليمة > 95%، إلى جانب عيدان قرفة كاسيا فيرا AA الفاخرة من سفوح جبل كيرينتشي، سومطرة.',
    hsCloves: 'كود القرنفل HS: 0907.10.00',
    hsCassia: 'كود القرفة HS: 0906.11.00',
    eugenolBadge: 'نسبة الأوجينول: > 18% باختبار GC-MS',
    cloveTag: 'قرنفل لالباري فاخر',
    cleanTag: 'تنظيف بالبخار المعقم',
    metric1Label: 'الزيت العطري (الأوجينول)',
    metric1Sub: 'رائحة قوية طبيعية',
    metric2Label: 'رؤوس قرنفل سليمة',
    metric2Sub: 'أقل نسبة تساقط رؤوس (< 5%)',
    metric3Label: 'أقصى نسبة رطوبة',
    metric3Sub: 'خالي تماماً من العفن',
    metric4Label: 'عبوات الشحن الخارجية',
    metric4Sub: 'أكياس PP منسوجة + بطانة بولي',
    ctaBtn: 'طلب عرض سعر شحن التوابل عبر WhatsApp',
    waText: 'مرحباً NusantaraOrigin، أود الاستفسار عن أسعار تصدير قرنفل ملوكو لالباري وعيدان القرفة كاسيا AA.',
  },
  zh: {
    breadcrumb: '出口大宗商品',
    commodity: '天然原支香料',
    title: '马鲁古 Lalpari 优质丁香与葛林芝 Cassia AA 肉桂卷',
    desc: '产自马鲁古群岛的原支精选 Lalpari 丁香，天然丁香酚精油含量高达 18% 以上，带头饱满度 > 95%；配以采摘自苏门答腊葛林芝火山斜坡的高等级 Cassia Vera AA 原支肉桂卷。',
    hsCloves: '丁香海关 HS: 0907.10.00',
    hsCassia: '肉桂海关 HS: 0906.11.00',
    eugenolBadge: '丁香酚含量: > 18% 通过气相色谱质谱法 (GC-MS)',
    cloveTag: 'LALPARI 特级丁香',
    cleanTag: '蒸汽物理清洁无熏硫',
    metric1Label: '挥发性精油 (丁香酚)',
    metric1Sub: '香气馥郁纯正持久',
    metric2Label: '带头饱满完整率',
    metric2Sub: '脱头破损率极低 (< 5%)',
    metric3Label: '最高允许安全水分',
    metric3Sub: '严防受潮霉变与虫蛀',
    metric4Label: '出口标准集装箱包装',
    metric4Sub: '加厚 PP 编织袋 + 防潮塑料内衬',
    ctaBtn: '通过 WhatsApp 咨询原支香料出口报价',
    waText: '您好 NusantaraOrigin，我们对马鲁古 Lalpari 特级丁香和葛林芝 Cassia AA 肉桂卷出口采购感兴趣，请提供外贸报价。',
  },
};

export default function WholeSpicesPage() {
  const { locale } = useLanguage();
  const t = SPICES_I18N[locale] || SPICES_I18N.en;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-0 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 flex flex-col gap-6">
        <nav className="font-mono text-[11px] text-outline uppercase tracking-wider">
          <Link href="/products" className="hover:text-primary">{t.breadcrumb}</Link> / {t.commodity}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <h1 className="font-headline text-[32px] sm:text-[40px] font-extrabold text-on-surface">
              {t.title}
            </h1>
            <p className="font-body text-[15px] text-outline max-w-2xl leading-relaxed">
              {t.desc}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded bg-surface-container font-mono text-[11px]">
                <strong className="text-primary">{t.hsCloves}</strong>
              </span>
              <span className="px-3 py-1 rounded bg-surface-container font-mono text-[11px]">
                <strong className="text-primary">{t.hsCassia}</strong>
              </span>
              <span className="px-3 py-1 rounded bg-tertiary-container/30 text-tertiary font-mono text-[11px] font-bold">
                {t.eugenolBadge}
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="relative w-full h-52 sm:h-60 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center p-4 overflow-hidden shadow-2xl group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-secondary/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <img
                src="/img/cloves-spices-cutout.png"
                alt="Maluku Lalpari Cloves and Cassia Vera Cinnamon"
                className="max-h-full max-w-[90%] object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500 z-10"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between font-mono text-[10px] text-white/90 z-20">
                <span className="text-secondary font-bold">{t.cloveTag}</span>
                <span className="text-[#A1A1AA]">{t.cleanTag}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Chips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">{t.metric1Label}</span>
            <div className="font-mono text-[22px] font-bold text-primary">&gt; 18.2%</div>
            <span className="font-mono text-[11px] text-tertiary">{t.metric1Sub}</span>
          </div>
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">{t.metric2Label}</span>
            <div className="font-mono text-[22px] font-bold text-on-surface">&gt; 95%</div>
            <span className="font-mono text-[11px] text-outline">{t.metric2Sub}</span>
          </div>
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">{t.metric3Label}</span>
            <div className="font-mono text-[22px] font-bold text-on-surface">&lt; 12.0%</div>
            <span className="font-mono text-[11px] text-tertiary">{t.metric3Sub}</span>
          </div>
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">{t.metric4Label}</span>
            <div className="font-mono text-[22px] font-bold text-on-surface">25 KG / 50 KG</div>
            <span className="font-mono text-[11px] text-outline">{t.metric4Sub}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 pt-2">
          <a
            href={`https://wa.me/628113000000?text=${encodeURIComponent(t.waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-headline text-[12px] font-bold uppercase tracking-wider hover:bg-[#D94E13] transition-colors"
          >
            <span>{t.ctaBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
