'use client';

import React from 'react';
import Link from 'next/link';
import Hero3DScene from '@/components/home/Hero3DScene';
import FactoryMediaReel from '@/components/home/FactoryMediaReel';
import CommodityShowcase3D from '@/components/home/CommodityShowcase3D';
import { ShieldCheck, ArrowRight, Flame, Scale, Package, Calculator } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const HOME_I18N = {
  en: {
    heroTag: 'HS CODE: 4402.90.10 • 100% PURE COCONUT SHELL • ZERO WOOD COAL',
    heroH1Pre: 'Indonesian Coconut Shell Charcoal Briquettes, ',
    heroH1Italic: 'Lab-Tested',
    heroH1Post: ' to Global Export Standards.',
    heroDesc: 'Supplying 350+ Metric Tons monthly to international shisha lounges in Dubai, Berlin, and Los Angeles. Guaranteed < 2.2% snow white ash, zero smoke, zero chemical odor, and consistent 2.5-hour burn duration.',
    heroCtaVerify: 'Verify Quality & SGS Lab Results →',
    heroCtaCalc: 'Calculate Container & FOB Price',
    metric1Val: '350 MT',
    metric1Lbl: 'Kiln Output / Month',
    metric2Val: '< 2.2%',
    metric2Lbl: 'Natural Snow White Ash',
    metric3Val: '1.5m 3x Intact',
    metric3Lbl: 'Drop Impact Test',
    stage3dTag1: 'INTERACTIVE 3D BRIQUETTE',
    stage3dTag2: '120-TON HYDRAULIC',
    bentoKicker: 'THREE CORE ENGINEERING PILLARS',
    bentoTitle: 'Transparent Quality Verification Instrument for Global Buyers',
    bento1Title: '100% Coconut Shell Quality Anatomy',
    bento1Desc: 'Snow white ash comparative test vs market adulterated charcoal, 6-geometry CAD diagrams, and ASTM D3174 SGS batch lab test results.',
    bento1Cta: 'Verify Quality Specs',
    bento2Title: '2.5D OEM Box Dieline Studio',
    bento2Desc: 'Custom inner box 1kg/2kg and master carton 10kg/20kg (Kraft, Matte Black, Duplex White) with Middle East GCC 2530 Arabic regulatory text and EAN-13 barcodes.',
    bento2Cta: 'Configure Brand Packaging',
    bento3Title: 'Container Cargo Planner & Soft-Gated RFQ',
    bento3Desc: 'Mathematical CBM volume vs port road weight limits (26.0 MT max for 40ft HC), with official stamped FOB proforma quotation unlock.',
    bento3Cta: 'Calculate Container Cargo',
    showcaseKicker: 'REALISTIC 3D PHYSICAL PRODUCT INSPECTION',
    showcaseTitle: '3D Visual Showcase of Indonesian Commodities',
    showcaseDesc: 'Interactive 3D tilt visual inspection for shisha & BBQ coconut charcoal, Sumatra Mandheling green coffee beans, and Maluku Lalpari cloves.',
    catalogKicker: 'EXPORT PORTFOLIO',
    catalogTitle: 'Full Catalog of Verified Indonesian Commodities',
    catalogAll: 'All Products',
    fobLabel: 'FOB PRICE',
    detailCta: 'Quality Details',
    commodities: [
      {
        slug: '100-briket-arang-batok-kelapa',
        hs_code: '4402.90.10',
        name: '100% Pure Coconut Shell Charcoal Briquettes',
        grade: 'Platinum Shisha & BBQ',
        moq: '1x 20ft FCL (18 MT)',
        fob: '$1,280 – $1,340 / MT',
        desc: 'Natural white ash < 2.2%, 0% chemical or wood adulteration, 2.5 hours consistent glowing heat.',
        highlights: ['Ash < 2.2%', '7,500+ kcal/kg', 'IMO Non-DG SP925', 'Smokeless & Odorless'],
        link: '/products/100-briket-arang-batok-kelapa',
        badge: 'CORE COMMODITY',
        image: '/img/shisha-charcoal-cutout.png',
      },
      {
        slug: 'green-coffee',
        hs_code: '0901.11.00',
        name: 'Sumatra Mandheling & Gayo Green Coffee Beans',
        grade: 'Specialty Grade 1 (Triple Picked)',
        moq: '1x 20ft FCL (19.2 MT / 320 Bags)',
        fob: '$6,800 – $7,400 / MT',
        desc: 'Moisture 11-12%, defect rate < 3%, herbal chocolate aroma with full heavy body from volcanic soil.',
        highlights: ['Moisture 11.5%', 'Defect < 3%', 'Screen 16-18', 'SCA Score 85+'],
        link: '/products/green-coffee',
        badge: 'SPECIALTY GRADE',
        image: '/img/green-coffee-cutout.png',
      },
      {
        slug: 'whole-spices',
        hs_code: '0907.10.00',
        name: 'Maluku Lalpari Cloves & Cassia Vera AA Quills',
        grade: 'Export Grade Lalpari & Sticks AA',
        moq: '1x 20ft FCL (10-14 MT)',
        fob: '$8,200 – $9,600 / MT',
        desc: 'Essential eugenol oil content > 18%, 100% steam cleaned without preservatives or chemical whiteners.',
        highlights: ['Eugenol > 18%', 'Head intact > 95%', 'Moisture < 12%', 'No Mould'],
        link: '/products/whole-spices',
        badge: 'EQUATORIAL HERITAGE',
        image: '/img/cloves-spices-cutout.png',
      },
    ],
  },
  id: {
    heroTag: 'HS CODE: 4402.90.10 • 100% BATOK KELAPA • ZERO WOOD COAL',
    heroH1Pre: 'Briket Arang Batok Kelapa Indonesia, ',
    heroH1Italic: 'Teruji Mutu',
    heroH1Post: ' Laboratorium Dunia.',
    heroDesc: 'Memasok 350+ Metrik Ton per bulan untuk shisha lounge internasional di Dubai, Berlin, dan Los Angeles. Garansi kadar abu < 2.2% putih alami, tanpa asap, tanpa bau kimia, dan durasi bara 2.5 jam konsisten.',
    heroCtaVerify: 'Verifikasi Mutu & Hasil Lab SGS →',
    heroCtaCalc: 'Kalkulasi Kontainer & Harga FOB',
    metric1Val: '350 MT',
    metric1Lbl: 'Output Kiln / Bulan',
    metric2Val: '< 2.2%',
    metric2Lbl: 'Kadar Abu Putih Alami',
    metric3Val: '1.5m 3x Intact',
    metric3Lbl: 'Uji Jatuh Bebas Beton',
    stage3dTag1: 'INTERACTIVE 3D BRIQUETTE',
    stage3dTag2: '120-TON HYDRAULIC',
    bentoKicker: 'TIGA PILAR REKAYASA TEMPLATE 2 V2.0',
    bentoTitle: 'Instrumen Verifikasi Mutu Transparan untuk Buyer Global',
    bento1Title: 'Anatomi Mutu 100% Batok Kelapa',
    bento1Desc: 'Uji komparasi abu putih salju vs abu oplosan pasaran, diagram CAD 6 geometri briket, dan matriks parameter uji ASTM D3174 per batch SGS pengapalan.',
    bento1Cta: 'Buka Verifikasi Mutu',
    bento2Title: '2.5D OEM Box Dieline Studio',
    bento2Desc: 'Kustomisasi kardus inner 1kg/2kg dan master box 10kg/20kg (Kraft, Matte Black, Duplex White) dengan simulasi teks regulasi Arab GCC 2530 dan barcode EAN-13.',
    bento2Cta: 'Konfigurasi Kemasan Brand',
    bento3Title: 'Kalkulator Kargo & Soft-Gated RFQ',
    bento3Desc: 'Perhitungan matematis kubikasi CBM vs batas tonase jalan raya 20ft & 40ft HC (26.0 MT max), dengan formulir pembuka rincian harga FOB berstempel resmi.',
    bento3Cta: 'Hitung Muatan Kontainer',
    showcaseKicker: 'INSPEKSI 3D FISIK PRODUK REALISTIS',
    showcaseTitle: 'Etalase Visual 3D Komoditas Ekspor',
    showcaseDesc: 'Inspeksi visual interaktif 3D tilt untuk briket batok shisha & BBQ, biji kopi hijau Mandheling, serta rempah cengkeh & kayu manis Maluku.',
    catalogKicker: 'PORTOFOLIO EKSPOR',
    catalogTitle: 'Katalog Lengkap Komoditas Ekspor Indonesia',
    catalogAll: 'Semua Produk',
    fobLabel: 'HARGA FOB',
    detailCta: 'Detail Mutu',
    commodities: [
      {
        slug: '100-briket-arang-batok-kelapa',
        hs_code: '4402.90.10',
        name: '100% Briket Arang Batok Kelapa Murni',
        grade: 'Platinum Shisha & BBQ',
        moq: '1x 20ft FCL (18 MT)',
        fob: '$1,280 – $1,340 / MT',
        desc: 'Abu putih alami < 2.2%, 0% bahan kimia atau serbuk kayu, bara menyala 2.5 jam konsisten.',
        highlights: ['Ash < 2.2%', '7,500+ kcal/kg', 'IMO Non-DG SP925', 'Smokeless & Odorless'],
        link: '/products/100-briket-arang-batok-kelapa',
        badge: 'CORE COMMODITY',
        image: '/img/shisha-charcoal-cutout.png',
      },
      {
        slug: 'green-coffee',
        hs_code: '0901.11.00',
        name: 'Sumatra Mandheling & Gayo Green Coffee Beans',
        grade: 'Specialty Grade 1 (Triple Picked)',
        moq: '1x 20ft FCL (19.2 MT / 320 Karung)',
        fob: '$6,800 – $7,400 / MT',
        desc: 'Kadar air 11-12%, defect rate < 3%, citarasa rempah tembakau dengan body tebal khas volcanic soil.',
        highlights: ['Moisture 11.5%', 'Defect < 3%', 'Screen 16-18', 'SCA Score 85+'],
        link: '/products/green-coffee',
        badge: 'SPECIALTY GRADE',
        image: '/img/green-coffee-cutout.png',
      },
      {
        slug: 'whole-spices',
        hs_code: '0907.10.00',
        name: 'Maluku Lalpari Cloves & Cassia Vera AA Quills',
        grade: 'Export Grade Lalpari & Sticks AA',
        moq: '1x 20ft FCL (10-14 MT)',
        fob: '$8,200 – $9,600 / MT',
        desc: 'Kadar minyak esensial eugenol > 18%, tanpa bahan pengawet atau pemutih kimiawi.',
        highlights: ['Eugenol > 18%', 'Head intact > 95%', 'Moisture < 12%', 'No Mould'],
        link: '/products/whole-spices',
        badge: 'EQUATORIAL HERITAGE',
        image: '/img/cloves-spices-cutout.png',
      },
    ],
  },
  ar: {
    heroTag: 'كود النظام المنسق HS: 4402.90.10 • جوز هند نقي 100% • خالي من نشارة الخشب',
    heroH1Pre: 'فحم جوز الهند الإندونيسي الفاخر، ',
    heroH1Italic: 'معتمد ومختبر',
    heroH1Post: ' بأعلى المعايير العالمية.',
    heroDesc: 'توريد أكثر من 350 طن متري شهرياً لمقاهي الشيشة في دبي وبرلين ولوس أنجلوس. رماد أبيض ناصع < 2.2%، بدون دخان أو رائحة كيميائية، واشتعال متواصل لمدة ساعتين ونصف.',
    heroCtaVerify: 'فحص الجودة ونتائج مختبرات SGS ←',
    heroCtaCalc: 'حساب حمولة الحاوية وأسعار FOB',
    metric1Val: '350 طن',
    metric1Lbl: 'إنتاج المصنع / شهرياً',
    metric2Val: '< 2.2%',
    metric2Lbl: 'رماد أبيض طبيعي فائق',
    metric3Val: '1.5م سليم 3x',
    metric3Lbl: 'اختبار السقوط الحر',
    stage3dTag1: 'معاينة ثلاثية الأبعاد 3D تفاعلية',
    stage3dTag2: 'ضغط هيدروليكي 120 طن',
    bentoKicker: 'الركائز الهندسية الثلاث لنظام V2.0',
    bentoTitle: 'أداة شفافة للتحقق من الجودة لمشتري التجارة العالمية',
    bento1Title: 'تشريح جودة فحم جوز الهند 100%',
    bento1Desc: 'مقارنة بصرية للرماد الأبيض النقي ضد الفحم المخلوط المغشوش، ومخططات CAD الهندسية، وفحوصات ASTM D3174 من SGS.',
    bento1Cta: 'فتح التحقق من الجودة',
    bento2Title: 'استوديو تصميم كراتين OEM 2.5D',
    bento2Desc: 'تخصيص علب 1 كغ و2 كغ والكرتون الرئيسي 10 كغ و20 كغ، مع نصوص اللوائح الخليجية العربية GCC 2530 والباركود الدولي.',
    bento2Cta: 'تهيئة عبوات علامتك التجارية',
    bento3Title: 'مخطط حمولة الحاويات وطلب RFQ',
    bento3Desc: 'حسابات هندسية للحجم CBM وحدود أوزان الطرق للموانئ (26.0 طن لحاوية 40ft HC)، مع إمكانية فتح مسودة أسعار FOB المعتمدة.',
    bento3Cta: 'حساب سعة الحاوية',
    showcaseKicker: 'فحص بصري واقعي للمنتجات 3D',
    showcaseTitle: 'معرض السلع الإندونيسية ثلاثي الأبعاد 3D',
    showcaseDesc: 'فحص تفاعلي ثلاثي الأبعاد لفحم الشيشة والشواء، وحبوب البن الأخضر المانديلينغ، وقرنفل ملوكو النقي.',
    catalogKicker: 'محفظة التصدير',
    catalogTitle: 'الكتالوج الشامل للسلع الزراعية الإندونيسية',
    catalogAll: 'جميع السلع',
    fobLabel: 'سعر FOB',
    detailCta: 'تفاصيل الجودة',
    commodities: [
      {
        slug: '100-briket-arang-batok-kelapa',
        hs_code: '4402.90.10',
        name: 'فحم جوز الهند الطبيعي 100% للشيشة والشواء',
        grade: 'درجة بلاتينية فاخرة',
        moq: 'حاوية 20ft FCL (18 طن)',
        fob: '$1,280 – $1,340 / طن',
        desc: 'رماد أبيض طبيعي < 2.2%، خالي 100% من الكيماويات أو خشب الفحم، اشتعال متواصل 2.5 ساعة.',
        highlights: ['رماد < 2.2%', '7,500+ سعرة/كغ', 'معتمد IMO SP925', 'بدون دخان أو رائحة'],
        link: '/products/100-briket-arang-batok-kelapa',
        badge: 'السلعة الأساسية',
        image: '/img/shisha-charcoal-cutout.png',
      },
      {
        slug: 'green-coffee',
        hs_code: '0901.11.00',
        name: 'حبوب البن الأخضر سومطرة مانديلينغ وجايو',
        grade: 'درجة مختصة أولى (فرز ثلاثي)',
        moq: 'حاوية 20ft FCL (19.2 طن / 320 كيس خيش)',
        fob: '$6,800 – $7,400 / طن',
        desc: 'رطوبة 11-12%، نسبة عيوب < 3%، نكهة غنية بالشوكولاتة والتوابل وقوام كثيف مميز.',
        highlights: ['رطوبة 11.5%', 'عيوب < 3%', 'مقاس حبة 16-18', 'تقييم SCA 85+'],
        link: '/products/green-coffee',
        badge: 'درجة مختصة',
        image: '/img/green-coffee-cutout.png',
      },
      {
        slug: 'whole-spices',
        hs_code: '0907.10.00',
        name: 'قرنفل ملوكو لالباري وعيدان قرفة كاسيا فيرا AA',
        grade: 'درجة تصدير فاخرة AA',
        moq: 'حاوية 20ft FCL (10-14 طن)',
        fob: '$8,200 – $9,600 / طن',
        desc: 'محتوى زيت الأوجينول > 18%، تنظيف بالبخار بدون أي مبيضات أو مواد حافظة كيميائية.',
        highlights: ['أوجينول > 18%', 'رؤوس سليمة > 95%', 'رطوبة < 12%', 'خالي من العفن'],
        link: '/products/whole-spices',
        badge: 'تراث استوائي',
        image: '/img/cloves-spices-cutout.png',
      },
    ],
  },
  zh: {
    heroTag: '海关编码 HS: 4402.90.10 • 100% 纯成熟椰壳 • 零掺杂木炭',
    heroH1Pre: '印度尼西亚高品质椰壳炭块，',
    heroH1Italic: '严苛实验室认证',
    heroH1Post: ' 达到全球出口交付标准。',
    heroDesc: '每月向迪拜、柏林和洛杉矶的国际顶级水烟馆及烧烤餐厅出口 350+ 公吨。保证灰分 < 2.2% 纯白自然、无烟、无刺鼻异味、稳定燃烧 2.5 小时。',
    heroCtaVerify: '查验 SGS 官方实验室检测报告 →',
    heroCtaCalc: '集装箱配载与 FOB 价格计算',
    metric1Val: '350 MT',
    metric1Lbl: '月度回转窑产能',
    metric2Val: '< 2.2%',
    metric2Lbl: '天然纯白低灰分',
    metric3Val: '1.5米 3次完好',
    metric3Lbl: '自由跌落冲击测试',
    stage3dTag1: '可交互 3D 炭块透视',
    stage3dTag2: '120吨 液压高密压制',
    bentoKicker: '三大工业级工程支柱',
    bentoTitle: '专为全球 B2B 买家打造的透明质检核验系统',
    bento1Title: '100% 椰壳炭品质结构剖析',
    bento1Desc: '雪白灰分与市面掺假黑灰真实视觉对比、6大出口几何规格 CAD 剖面，以及每批次 SGS 的 ASTM D3174 检测指标。',
    bento1Cta: '开启质量验证',
    bento2Title: '2.5D OEM 包装刀模工作室',
    bento2Desc: '定制 1kg/2kg 内盒与 10kg/20kg 五层外箱 (牛皮纸、哑光黑、白卡涂布)，模拟中东 GCC 2530 阿拉伯语警示文案与 EAN-13 国际条码。',
    bento2Cta: '配置品牌专属包装',
    bento3Title: '集装箱配载计算器 & 询价台',
    bento3Desc: 'CBM 容积与泗水港公路 26.0 MT 限重数学配比算法，解锁印章版官方 FOB 形式发票草案。',
    bento3Cta: '计算集装箱装载',
    showcaseKicker: '逼真 3D 实体出口大宗商品巡检',
    showcaseTitle: '印尼大宗农副出口产品 3D 视觉展台',
    showcaseDesc: '多角度 3D 视角交互检视水烟与烧烤椰壳炭、苏门答腊曼特宁生咖啡豆以及马鲁古优质丁香与肉桂。',
    catalogKicker: '出口产品矩阵',
    catalogTitle: '印尼国家特许出口大宗商品完整目录',
    catalogAll: '查看全部产品',
    fobLabel: 'FOB 离岸参考价',
    detailCta: '查验品质详情',
    commodities: [
      {
        slug: '100-briket-arang-batok-kelapa',
        hs_code: '4402.90.10',
        name: '100% 纯椰壳炭块 (水烟白金级)',
        grade: '白金水烟与商用烧烤级',
        moq: '1x 20ft FCL (18 MT)',
        fob: '$1,280 – $1,340 / MT',
        desc: '天然白灰 < 2.2%，0% 化学助燃剂或木粉掺假，火苗稳定持续燃烧达 2.5 小时。',
        highlights: ['灰分 < 2.2%', '发热量 7,500+ kcal', 'IMO Non-DG SP925', '无烟无异味'],
        link: '/products/100-briket-arang-batok-kelapa',
        badge: '核心基石产品',
        image: '/img/shisha-charcoal-cutout.png',
      },
      {
        slug: 'green-coffee',
        hs_code: '0901.11.00',
        name: '苏门答腊曼特宁与加幼精品阿拉比卡生豆',
        grade: '特级 Grade 1 (三次人工精选 TP)',
        moq: '1x 20ft FCL (19.2 MT / 320 麻袋)',
        fob: '$6,800 – $7,400 / MT',
        desc: '含水率 11-12%，瑕疵率 < 3%，传统湿刨法处理，具有火山土壤独特的草本巧克力厚重醇度。',
        highlights: ['水分 11.5%', '瑕疵率 < 3%', '目数 16-18', 'SCA杯测 85+'],
        link: '/products/green-coffee',
        badge: '特级精选',
        image: '/img/green-coffee-cutout.png',
      },
      {
        slug: 'whole-spices',
        hs_code: '0907.10.00',
        name: '马鲁古 Lalpari 丁香与葛林芝 Cassia AA 肉桂卷',
        grade: '出口级 Lalpari 与 AA 级原支',
        moq: '1x 20ft FCL (10-14 MT)',
        fob: '$8,200 – $9,600 / MT',
        desc: '丁香酚精油含量 > 18%，蒸汽清洁，无化学保鲜防腐剂或漂白剂。',
        highlights: ['丁香酚 > 18%', '带头完整率 > 95%', '水分 < 12%', '无霉变'],
        link: '/products/whole-spices',
        badge: '赤道天然原产',
        image: '/img/cloves-spices-cutout.png',
      },
    ],
  },
};

export default function HomePage() {
  const { locale } = useLanguage();
  const t = HOME_I18N[locale] || HOME_I18N.en;

  return (
    <div className="w-full flex flex-col gap-16 py-8">
      {/* 1. HERO SECTION WITH 3D WEBGL BRIQUETTE */}
      <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            {/* Telemetry Badge Pill */}
            <div className="bg-surface-container border border-primary-container/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-mono text-[11px] text-primary font-medium tracking-wide">
                {t.heroTag}
              </span>
            </div>

            <h1 className="font-headline text-[36px] sm:text-[46px] lg:text-[50px] leading-tight font-extrabold text-on-surface tracking-tight">
              {t.heroH1Pre}
              <span className="font-editorial italic font-normal text-secondary block sm:inline">
                {t.heroH1Italic}
              </span>
              {t.heroH1Post}
            </h1>

            <p className="font-body text-[15px] sm:text-[16px] text-on-surface-variant max-w-2xl leading-relaxed">
              {t.heroDesc}
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap gap-3 items-center pt-2 w-full sm:w-auto">
              <Link
                href="/products/100-briket-arang-batok-kelapa"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-primary-container text-on-primary-container font-headline text-[13px] font-bold uppercase tracking-wider hover:bg-[#D94E13] transition-all shadow-[0_4px_20px_rgba(196,68,15,0.4)] flex items-center justify-center gap-2"
              >
                <span>{t.heroCtaVerify}</span>
              </Link>
              <Link
                href="/container-planner"
                className="w-full sm:w-auto px-5 py-3.5 rounded-lg border border-outline-variant/40 bg-surface-container-high/60 hover:bg-surface-container text-on-surface font-headline text-[13px] transition-all flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-primary" />
                <span>{t.heroCtaCalc}</span>
              </Link>
            </div>

            {/* Key Metric Strip */}
            <div className="w-full bg-surface-container/90 border border-outline-variant/30 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-md mt-4">
              <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-outline-variant/20 pb-3 sm:pb-0 sm:pr-4">
                <span className="font-mono text-[24px] font-bold text-on-surface">{t.metric1Val}</span>
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider mt-0.5">
                  {t.metric1Lbl}
                </span>
              </div>
              <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-outline-variant/20 pb-3 sm:pb-0 sm:px-2">
                <span className="font-mono text-[24px] font-bold text-primary">{t.metric2Val}</span>
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider mt-0.5">
                  {t.metric2Lbl}
                </span>
              </div>
              <div className="flex flex-col sm:pl-2">
                <span className="font-mono text-[24px] font-bold text-tertiary">{t.metric3Val}</span>
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider mt-0.5">
                  {t.metric3Lbl}
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero 3D Stage (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full rounded-2xl bg-surface-container-low border border-outline-variant/40 p-3 shadow-2xl overflow-hidden">
              <div className="w-full h-[440px] rounded-xl overflow-hidden relative bg-surface-container-lowest flex items-center justify-center">
                <Hero3DScene />
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/30 flex items-center justify-between font-mono text-[11px] pointer-events-none">
                  <span className="text-on-surface">{t.stage3dTag1}</span>
                  <span className="text-primary font-bold">{t.stage3dTag2}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE CORE CAPABILITIES (BENTO GRID) */}
      <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-0 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
            {t.bentoKicker}
          </span>
          <h2 className="font-headline text-[24px] sm:text-[32px] font-bold text-on-surface">
            {t.bentoTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 100% Batok Kelapa Murni */}
          <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-lg group">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-[18px] text-on-surface group-hover:text-primary transition-colors">
                {t.bento1Title}
              </h3>
              <p className="font-body text-[13px] text-outline leading-relaxed">
                {t.bento1Desc}
              </p>
            </div>
            <Link
              href="/products/100-briket-arang-batok-kelapa"
              className="mt-6 pt-3 border-t border-outline-variant/20 font-headline text-[12px] uppercase font-bold text-primary flex items-center gap-1 group-hover:underline"
            >
              <span>{t.bento1Cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: 2.5D OEM Packaging Studio */}
          <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-lg group">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-[18px] text-on-surface group-hover:text-primary transition-colors">
                {t.bento2Title}
              </h3>
              <p className="font-body text-[13px] text-outline leading-relaxed">
                {t.bento2Desc}
              </p>
            </div>
            <Link
              href="/oem-studio"
              className="mt-6 pt-3 border-t border-outline-variant/20 font-headline text-[12px] uppercase font-bold text-primary flex items-center gap-1 group-hover:underline"
            >
              <span>{t.bento2Cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Container Load Planner */}
          <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-lg group">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-[18px] text-on-surface group-hover:text-primary transition-colors">
                {t.bento3Title}
              </h3>
              <p className="font-body text-[13px] text-outline leading-relaxed">
                {t.bento3Desc}
              </p>
            </div>
            <Link
              href="/container-planner"
              className="mt-6 pt-3 border-t border-outline-variant/20 font-headline text-[12px] uppercase font-bold text-primary flex items-center gap-1 group-hover:underline"
            >
              <span>{t.bento3Cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FACTORY VIDEO & OPERATIONAL MEDIA REEL */}
      <FactoryMediaReel />

      {/* 4. INTERACTIVE 3D COMMODITY SHOWCASE STAGE */}
      <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-0 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
            {t.showcaseKicker}
          </span>
          <h2 className="font-headline text-[24px] sm:text-[32px] font-bold text-on-surface">
            {t.showcaseTitle}
          </h2>
          <p className="font-body text-[14px] text-outline max-w-2xl">
            {t.showcaseDesc}
          </p>
        </div>

        <CommodityShowcase3D />
      </section>

      {/* 5. MULTI-COMMODITY CATALOG OVERVIEW WITH REAL CUTOUTS */}
      <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-0 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div>
            <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
              {t.catalogKicker}
            </span>
            <h2 className="font-headline text-[22px] sm:text-[28px] font-bold text-on-surface">
              {t.catalogTitle}
            </h2>
          </div>
          <Link
            href="/products"
            className="font-headline text-[12px] uppercase font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>{t.catalogAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.commodities.map((c) => (
            <div
              key={c.slug}
              className="p-5 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 transition-all shadow-lg group overflow-hidden"
            >
              <div className="flex flex-col gap-3">
                {/* Product Thumbnail Header */}
                <div className="relative w-full h-44 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-center overflow-hidden p-3">
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[10px] text-primary font-bold">
                    HS: {c.hs_code}
                  </div>
                  <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-mono text-[10px] font-bold">
                    {c.badge}
                  </div>

                  <img
                    src={c.image}
                    alt={c.name}
                    className="max-h-full max-w-[85%] object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col gap-1 mt-1">
                  <span className="font-mono text-[11px] text-tertiary">{c.grade}</span>
                  <h4 className="font-headline font-bold text-[16px] text-on-surface group-hover:text-primary transition-colors">
                    {c.name}
                  </h4>
                  <p className="font-body text-[13px] text-outline line-clamp-2">
                    {c.desc}
                  </p>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {c.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono text-[10px]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-outline block">{t.fobLabel}</span>
                  <span className="font-mono text-[13px] font-bold text-on-surface">{c.fob}</span>
                </div>
                <Link
                  href={c.link}
                  className="font-headline text-[12px] uppercase font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>{t.detailCta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
