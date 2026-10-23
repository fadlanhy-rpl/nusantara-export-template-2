'use client';

import React from 'react';
import Link from 'next/link';
import { Coffee, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const COFFEE_I18N = {
  en: {
    breadcrumb: 'EXPORT COMMODITIES',
    commodity: 'GREEN COFFEE BEANS',
    title: 'Sumatra Mandheling & Gayo Green Coffee Beans',
    desc: 'Specialty Grade 1 raw Arabica green coffee beans (Triple Picked) from the volcanic highlands of Aceh Gayo and Lintong, North Sumatra. Traditional wet-hulled (giling basah) processing yields rich herbal spice, dark cocoa, and full syrupy body.',
    hsCode: 'HS CODE: 0901.11.00',
    scaScore: 'SCA CUPPING SCORE: 85.5+',
    gradeBadge: 'GRADE: SPECIALTY TRIPLE PICKED (TP)',
    screenTag: 'SCREEN 16 - 18',
    bagTag: '60KG JUTE BAG',
    metric1Label: 'Moisture Content',
    metric1Sub: 'Optimal < 12.0%',
    metric2Label: 'Defect Rate',
    metric2Sub: 'Secondary Defect Max 5',
    metric3Label: 'Screen Size',
    metric3Sub: 'Large Screen Size',
    metric4Label: 'Packaging',
    metric4Sub: 'Jute Bag + GrainPro Liner',
    ctaBtn: 'Request Coffee FCL / LCL Quote via WhatsApp',
    waText: 'Hello NusantaraOrigin, I am interested in Sumatra Mandheling Specialty Green Coffee Beans FCL export pricing.',
  },
  id: {
    breadcrumb: 'KOMODITAS EKSPOR',
    commodity: 'BIJI KOPI HIJAU',
    title: 'Sumatra Mandheling & Gayo Green Coffee Beans',
    desc: 'Biji kopi mentah Specialty Grade 1 (Triple Picked) dari dataran tinggi vulkanik Aceh Gayo dan Lintong, Sumatra Utara. Diproses wet-hulled (giling basah) tradisional untuk citarasa rempah, cokelat hitam, dan kekentalan body penuh.',
    hsCode: 'HS CODE: 0901.11.00',
    scaScore: 'SCA CUPPING SCORE: 85.5+',
    gradeBadge: 'GRADE: SPECIALTY TRIPLE PICKED (TP)',
    screenTag: 'SCREEN 16 - 18',
    bagTag: '60KG JUTE BAG',
    metric1Label: 'Kadar Air',
    metric1Sub: 'Optimal < 12.0%',
    metric2Label: 'Defect Rate',
    metric2Sub: 'Secondary Defect Max 5',
    metric3Label: 'Ukuran Screen',
    metric3Sub: 'Large Screen Size',
    metric4Label: 'Kemasan Karung',
    metric4Sub: 'Jute Bag + GrainPro Liner',
    ctaBtn: 'Minta Penawaran Kopi FCL / LCL via WhatsApp',
    waText: 'Halo NusantaraOrigin, saya tertarik dengan penawaran ekspor Sumatra Mandheling Specialty Green Coffee Beans.',
  },
  ar: {
    breadcrumb: 'السلع الزراعية التصديرية',
    commodity: 'حبوب البن الأخضر',
    title: 'حبوب البن الأخضر سومطرة مانديلينغ وجايو',
    desc: 'حبوب بن أرابيكا خضراء مختصة درجة أولى (فرز يدوي ثلاثي TP) من المرتفعات البركانية في آتشيه جايو ولينتونغ، شمال سومطرة. معالجة بالتجفيف الرطب التقليدي (Wet-Hulled) لتعطي إيحاءات التوابل والشوكولاتة الداكنة وقواماً غنياً.',
    hsCode: 'كود النظام HS: 0901.11.00',
    scaScore: 'تقييم SCA المعتمد: 85.5+',
    gradeBadge: 'الدرجة: مختصة أولى فرز يدوي ثلاثي (TP)',
    screenTag: 'حجم الحبة 16 - 18',
    bagTag: 'أكياس خيش 60 كغ',
    metric1Label: 'نسبة الرطوبة',
    metric1Sub: 'مثالي < 12.0%',
    metric2Label: 'نسبة العيوب',
    metric2Sub: 'العيوب الثانوية أقصاها 5',
    metric3Label: 'حجم الغربال (Screen)',
    metric3Sub: 'حبات كبيرة Screen 16-18',
    metric4Label: 'عبوات الشحن',
    metric4Sub: 'أكياس خيش + بطانة GrainPro',
    ctaBtn: 'طلب عرض سعر شحن البن FCL / LCL عبر WhatsApp',
    waText: 'مرحباً NusantaraOrigin، أود الاستفسار عن أسعار تصدير حبوب البن الأخضر سومطرة مانديلينغ الفاخر.',
  },
  zh: {
    breadcrumb: '出口大宗商品',
    commodity: '精品生咖啡豆',
    title: '苏门答腊曼特宁与加幼精品阿拉比卡生豆',
    desc: '产自北苏门答腊亚齐加幼 (Aceh Gayo) 与林东火山高地的特级 Grade 1 阿拉比卡生咖啡豆 (三次人工精选手选 TP)。采用印尼特色湿刨法处理，呈现浓郁草本香料、黑巧克力以及极具厚重感的醇厚度。',
    hsCode: '海关 HS: 0901.11.00',
    scaScore: 'SCA 专业杯测评分: 85.5+',
    gradeBadge: '等级: 特级精选三次人工手选 (TP)',
    screenTag: '目数 SCREEN 16 - 18',
    bagTag: '60KG 麻袋内衬 GRAINPRO',
    metric1Label: '含水率指标',
    metric1Sub: '最佳区间 < 12.0%',
    metric2Label: '瑕疵豆比例',
    metric2Sub: '次要瑕疵最高不超过 5',
    metric3Label: '生豆规格目数',
    metric3Sub: '大粒径标准 16 – 18',
    metric4Label: '出口外袋包装',
    metric4Sub: '黄麻袋 + 高阻隔 GrainPro 内袋',
    ctaBtn: '通过 WhatsApp 申请咖啡豆整箱 FCL / 拼箱 LCL 报价',
    waText: '您好 NusantaraOrigin，我们对苏门答腊曼特宁特级精品生咖啡豆出口采购感兴趣，请提供报价。',
  },
};

export default function GreenCoffeePage() {
  const { locale } = useLanguage();
  const t = COFFEE_I18N[locale] || COFFEE_I18N.en;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
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
                <strong className="text-primary">{t.hsCode}</strong>
              </span>
              <span className="px-3 py-1 rounded bg-tertiary-container/30 text-tertiary font-mono text-[11px] font-bold">
                {t.scaScore}
              </span>
              <span className="px-3 py-1 rounded bg-surface-container font-mono text-[11px]">
                {t.gradeBadge}
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="relative w-full h-52 sm:h-60 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center p-4 overflow-hidden shadow-2xl group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-tertiary/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <img
                src="/img/green-coffee-cutout.png"
                alt="Sumatra Mandheling Green Coffee Beans"
                className="max-h-full max-w-[90%] object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500 z-10"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between font-mono text-[10px] text-white/90 z-20">
                <span className="text-tertiary font-bold">{t.screenTag}</span>
                <span className="text-[#A1A1AA]">{t.bagTag}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Chips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">{t.metric1Label}</span>
            <div className="font-mono text-[22px] font-bold text-on-surface">11.5%</div>
            <span className="font-mono text-[11px] text-tertiary">{t.metric1Sub}</span>
          </div>
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">{t.metric2Label}</span>
            <div className="font-mono text-[22px] font-bold text-primary">&lt; 3%</div>
            <span className="font-mono text-[11px] text-outline">{t.metric2Sub}</span>
          </div>
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">{t.metric3Label}</span>
            <div className="font-mono text-[22px] font-bold text-on-surface">16 – 18</div>
            <span className="font-mono text-[11px] text-tertiary">{t.metric3Sub}</span>
          </div>
          <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
            <span className="font-mono text-[10px] text-outline uppercase">{t.metric4Label}</span>
            <div className="font-mono text-[22px] font-bold text-on-surface">60 KG</div>
            <span className="font-mono text-[11px] text-outline">{t.metric4Sub}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 pt-2">
          <a
            href={`https://wa.me/628113000000?text=${encodeURIComponent(t.waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-headline text-[13px] font-semibold hover:bg-[#D94E13] transition-colors shadow-md"
          >
            <span>{t.ctaBtn}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
