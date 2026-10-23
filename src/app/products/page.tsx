'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Coffee, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const CATALOG_I18N = {
  en: {
    breadcrumb: 'NUSANTARAORIGIN EXPORT PORTAL / MAIN COMMODITY CATALOG',
    title: 'Verified Indonesian Export Commodities Catalog',
    desc: 'All commodities are processed through export-standard industrial facilities, independently certified by international surveyors (SGS / Sucofindo), and ready for FCL ocean container loading from Port of Tanjung Perak & Tanjung Priok.',
    fobLabel: 'Indicative Price:',
    moqLabel: 'Min. Order (MOQ):',
    btnInspect: 'Inspect Lab Specs & Quality Audit',
    commodities: [
      {
        slug: '100-briket-arang-batok-kelapa',
        hs_code: '4402.90.10',
        name: '100% Pure Coconut Shell Charcoal Briquettes',
        grade: 'Platinum Shisha & BBQ Grade',
        moq: '1x 20ft FCL (18 MT / 1,800 Boxes)',
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
        grade: 'Specialty Grade 1 (Triple Picked TP)',
        moq: '1x 20ft FCL (19.2 MT / 320 Bags)',
        fob: '$6,800 – $7,400 / MT',
        desc: 'Moisture 11-12%, defect rate < 3%, herbal tobacco chocolate aroma with full heavy body from volcanic soil.',
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
        desc: 'Essential eugenol oil content > 18%, 100% steam cleaned without chemical preservatives or whiteners.',
        highlights: ['Eugenol > 18%', 'Head intact > 95%', 'Moisture < 12%', 'No Mould'],
        link: '/products/whole-spices',
        badge: 'EQUATORIAL HERITAGE',
        image: '/img/cloves-spices-cutout.png',
      },
    ],
  },
  id: {
    breadcrumb: 'PORTAL EKSPOR NUSANTARAORIGIN / KATALOG UTAMA',
    title: 'Katalog Komoditas Ekspor Terverifikasi',
    desc: 'Seluruh komoditas diproses melalui fasilitas berstandar ekspor, bersertifikat laboratorium independen, dan siap dimuat dalam kontainer FCL dari pelabuhan Tanjung Perak & Tanjung Priok.',
    fobLabel: 'Harga Indikatif:',
    moqLabel: 'Min. Order (MOQ):',
    btnInspect: 'Lihat Spesifikasi Lab & Audit Mutu',
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
    breadcrumb: 'بوابة صادرات NUSANTARAORIGIN / الكتالوج الرئيسي للسلع',
    title: 'كتالوج السلع الزراعية الإندونيسية المعتمدة للتصدير',
    desc: 'تتم معالجة جميع السلع في منشآت صناعية متوافقة مع معايير التصدير الدولي، ومفحوصة بواسطة مكاتب المعاينة الدولية (SGS / Sucofindo)، وجاهزة للشحن البحري FCL من مينائي تانجونغ بيراك وتانجونغ بريوك.',
    fobLabel: 'السعر الاسترشادي:',
    moqLabel: 'الحد الأدنى للطلب (MOQ):',
    btnInspect: 'فحص المواصفات المخبرية وتدقيق الجودة',
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
    breadcrumb: 'NUSANTARAORIGIN 出口门户 / 核心大宗商品总目录',
    title: '经官方检验认证的印尼特许出口大宗商品目录',
    desc: '所有出口大宗农副产品均通过出口级工业制造标准生产，经国际第三方检验机构 (SGS / Sucofindo) 严格批次认证，随时可在泗水丹戎佩拉港与雅加达丹戎不碌港装入整箱 (FCL) 海运集装箱出口。',
    fobLabel: 'FOB 指导单价:',
    moqLabel: '起订量 (MOQ):',
    btnInspect: '查验实验室检测指标与质量审计',
    commodities: [
      {
        slug: '100-briket-arang-batok-kelapa',
        hs_code: '4402.90.10',
        name: '100% 纯椰壳炭块 (水烟白金级)',
        grade: '白金水烟与商用烧烤级',
        moq: '1x 20ft FCL (18 MT / 1,800 箱)',
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

export default function CommoditiesCatalogPage() {
  const { locale } = useLanguage();
  const t = CATALOG_I18N[locale] || CATALOG_I18N.en;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-0 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <nav className="font-mono text-[11px] text-outline uppercase tracking-wider">
          {t.breadcrumb}
        </nav>
        <h1 className="font-headline text-[32px] sm:text-[38px] font-extrabold text-on-surface tracking-tight">
          {t.title}
        </h1>
        <p className="font-body text-[15px] text-outline max-w-2xl">
          {t.desc}
        </p>
      </div>

      {/* 3-Column Commodities Grid with Realistic Product Cutouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {t.commodities.map((c) => (
          <div
            key={c.slug}
            className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-primary/60 transition-all shadow-xl group overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {/* Product Visual Stage */}
              <div className="relative w-full h-48 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-center overflow-hidden p-4 group-hover:border-primary/40 transition-colors">
                <div className="absolute top-2 left-2 z-10 px-2.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[10px] text-primary font-bold">
                  HS: {c.hs_code}
                </div>
                <div className="absolute top-2 right-2 z-10 px-2.5 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-mono text-[10px] font-bold">
                  {c.badge}
                </div>

                <img
                  src={c.image}
                  alt={c.name}
                  className="max-h-full max-w-[85%] object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.7)] group-hover:scale-108 transition-transform duration-500"
                />
              </div>

              <div>
                <span className="font-mono text-[11px] text-tertiary font-semibold block">
                  {c.grade}
                </span>
                <h3 className="font-headline text-[18px] font-bold text-on-surface mt-0.5 group-hover:text-primary transition-colors">
                  {c.name}
                </h3>
              </div>

              <p className="font-body text-[13px] text-outline leading-relaxed line-clamp-2">
                {c.desc}
              </p>

              {/* Highlights Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/20">
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

            <div className="pt-6 mt-4 border-t border-outline-variant/20 flex flex-col gap-3">
              <div className="flex justify-between items-baseline font-mono text-[12px]">
                <span className="text-outline">{t.fobLabel}</span>
                <span className="text-on-surface font-bold text-[14px]">{c.fob}</span>
              </div>
              <div className="flex justify-between items-baseline font-mono text-[11px]">
                <span className="text-outline">{t.moqLabel}</span>
                <span className="text-tertiary">{c.moq}</span>
              </div>

              <Link
                href={c.link}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-headline text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>{t.btnInspect}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180 shrink-0" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
