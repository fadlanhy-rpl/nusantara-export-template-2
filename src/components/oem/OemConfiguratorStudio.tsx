'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Palette, Upload, ShieldCheck, Check, Eye, Download, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import OemBox3DViewer from './OemBox3DViewer';
import { useLanguage } from '@/context/LanguageContext';

type MaterialType = 'kraft' | 'matte_black' | 'white_duplex';
type ViewMode = '3d' | 'flat' | 'pallet';
type PackFormat = '1kg' | '2kg' | '10kg_bulk' | '20kg_bulk';

const STUDIO_I18N = {
  en: {
    navCommodities: 'EXPORT COMMODITIES',
    navOem: 'OEM & PRIVATE LABEL SERVICES',
    navStudio: 'PACKAGING CONFIGURATOR STUDIO',
    title: '2.5D OEM Private Label Studio',
    titleAccent: '& Custom Export Packaging',
    subtitle: 'Customize your export brand packaging with high-precision factory dieline specifications. Choose cardboard material, gold foil hot-stamping, and Middle Eastern (GCC) or European regulatory text.',
    sec1Title: 'Export Packaging Format',
    opt1kgTitle: '1kg Inner Box (10x1kg per Master Box)',
    opt1kgDesc: 'Dimensions 100×100×100 mm • Duplex 250gsm',
    opt2kgTitle: '2kg Inner Box (5x2kg per Master Box)',
    opt2kgDesc: 'Dimensions 200×100×100 mm • Duplex 300gsm',
    opt10kgTitle: 'Master Carton 10kg (Bulk BBQ Packing)',
    opt10kgDesc: 'Heavy-duty 5-Ply Corrugated K150',
    sec2Title: 'Paper Substrate & Finishing',
    matKraft: 'Kraft 275g',
    matKraftSub: 'Eco Rustic',
    matBlack: 'Matte Black',
    matBlackSub: 'Luxury Shisha',
    matWhite: 'Bright White',
    matWhiteSub: 'Duplex 300g',
    finishMatte: 'Matte Doff / Matte UV (Waterproof)',
    finishMatteTag: 'STANDARD',
    finishGold: 'Hot-Stamping Gold Foil (Logo & Brand)',
    finishSpotUv: 'Spot UV Glossy Ornament',
    sec3Title: 'Brand Identity & Regulation',
    lblBrand: 'Buyer Brand Name (Headline)',
    lblTagline: 'Sub-Headline / Slogan',
    chkArabic: 'Arabic Warning Text (ESMA & GCC GSO 2530 Standards)',
    chkBarcode: 'EAN-13 Barcode & Batch Lab QR Code',
    chkCert: 'Official Certifications (Halal & IMO Non-DG SP925)',
    btnView3d: '3D Box Perspective',
    btnViewFlat: '2D Flat CAD Dieline',
    btnViewPallet: 'Pallet Stuffing',
    legibilityTitle: 'Front Panel Dieline Print Specification',
    lblColBrand: 'BRAND LOGO & TRADEMARK:',
    lblColTagline: 'TAGLINE / GRADE:',
    lblColFinish: 'FINISHING:',
    lblColReg: 'EXPORT REGULATION:',
    btnSendWa: 'Send Mock-Up to Factory WhatsApp',
    waMsg: 'Hello NusantaraOrigin, I would like to request factory confirmation for OEM brand mock-up: {brand} ({format})',
    b2bStandard: 'B2B Standard',
    matLabelKraft: 'Eco Rustic Kraft Paperboard (275 gsm)',
    matLabelBlack: 'Matte Anthracite Black (Luxury Shisha)',
    matLabelWhite: 'Bright White Duplex Coated (300 gsm)',
    cadAccuCut: 'VECTOR CAD ACCU-CUT',
    foilYes: 'Gold Foil',
    foilNo: 'No Foil',
    matteYes: 'Matte UV',
    matteNo: 'Standard',
    flatCadTitle: '2D FLAT CAD DIELINE (100×100×100 mm)',
    palletTitle: 'MARITIME PALLET STUFFING (EURO PALLET)',
    palletSub: 'EURO PALLET 1200 × 1000 mm • WRAP SHRINK FILM',
    diecutTol: 'Die-cut Tolerance: ±0.5 mm • Inner Vacuum Sealed',
    printMarks: 'Bleed +3mm • Crease Cyan 0.25pt • CMYK + Pant. 871C (Gold)',
    formatLabel: 'FORMAT:',
    materialLabel: 'MATERIAL:',
  },
  id: {
    navCommodities: 'KOMODITAS EKSPOR',
    navOem: 'LAYANAN OEM & PRIVATE LABEL',
    navStudio: 'STUDIO KONFIGURATOR KEMASAN',
    title: '2.5D OEM Private Label Studio',
    titleAccent: '& Kemasan Ekspor Kustom',
    subtitle: 'Kustomisasi kemasan brand ekspor Anda dengan spesifikasi dieline pabrik presisi tinggi. Pilih material kardus, laminasi foil emas, dan teks regulasi Timur Tengah (GCC) maupun Eropa.',
    sec1Title: 'Format Kemasan Ekspor',
    opt1kgTitle: 'Kotak Dalam 1kg (10x1kg per Master Box)',
    opt1kgDesc: 'Dimensi 100×100×100 mm • Duplex 250gsm',
    opt2kgTitle: 'Kotak Dalam 2kg (5x2kg per Master Box)',
    opt2kgDesc: 'Dimensi 200×100×100 mm • Duplex 300gsm',
    opt10kgTitle: 'Master Carton 10kg (Bulk BBQ Packing)',
    opt10kgDesc: 'Kardus tebal 5-Ply Corrugated K150',
    sec2Title: 'Substrat Kertas & Finishing',
    matKraft: 'Kraft 275g',
    matKraftSub: 'Eco Rustic',
    matBlack: 'Matte Black',
    matBlackSub: 'Luxury Shisha',
    matWhite: 'Bright White',
    matWhiteSub: 'Duplex 300g',
    finishMatte: 'Laminasi Doff / Matte UV (Waterproof)',
    finishMatteTag: 'STANDAR',
    finishGold: 'Hot-Stamping Foil Emas (Logo & Nama)',
    finishSpotUv: 'Spot UV Glossy Ornamen',
    sec3Title: 'Identitas Merek & Regulasi',
    lblBrand: 'Nama Merek Buyer (Headline)',
    lblTagline: 'Sub-Headline / Slogan',
    chkArabic: 'Peringatan Bahasa Arab (Standar ESMA & GCC GSO 2530)',
    chkBarcode: 'Barcode EAN-13 & QR Code Batch Lab',
    chkCert: 'Sertifikasi Resmi (Halal MUI & IMO Non-DG SP925)',
    btnView3d: 'Perspektif 3D Box',
    btnViewFlat: 'Dieline Flat 2D CAD',
    btnViewPallet: 'Pallet Stuffing',
    legibilityTitle: 'Pratinjau Cetak Dieline Muka Depan (Front Panel Spec)',
    lblColBrand: 'BRAND LOGO & MERK:',
    lblColTagline: 'TAGLINE / MUTU:',
    lblColFinish: 'FINISHING:',
    lblColReg: 'REGULASI EKSPOR:',
    btnSendWa: 'Kirim Mock-Up ke WhatsApp Pabrik',
    waMsg: 'Halo NusantaraOrigin, saya ingin meminta konfirmasi mock-up kemasan OEM brand: {brand} ({format})',
    b2bStandard: 'Standar B2B',
    matLabelKraft: 'Eco Rustic Kraft Paperboard (275 gsm)',
    matLabelBlack: 'Matte Anthracite Black (Luxury Shisha)',
    matLabelWhite: 'Bright White Duplex Coated (300 gsm)',
    cadAccuCut: 'AKURASI POTONG CAD VEKTOR',
    foilYes: 'Foil Emas',
    foilNo: 'Tinta Standar',
    matteYes: 'Laminasi Doff',
    matteNo: 'Tanpa Lapisan',
    flatCadTitle: 'DIELINE CAD DATAR 2D (100×100×100 mm)',
    palletTitle: 'PENATAAN PALLET MARITIM (EURO PALLET)',
    palletSub: 'EURO PALLET 1200 × 1000 mm • WRAP SHRINK FILM',
    diecutTol: 'Toleransi Pisau Pond: ±0.5 mm • Kemasan Vakum Dalam',
    printMarks: 'Bleed +3mm • Garis Lipat Cyan 0.25pt • CMYK + Pant. 871C (Emas)',
    formatLabel: 'FORMAT KEMASAN:',
    materialLabel: 'MATERIAL:',
  },
  ar: {
    navCommodities: 'السلع الزراعية التصديرية',
    navOem: 'خدمات OEM والعلامات التجارية الخاصة',
    navStudio: 'استوديو تهيئة العبوات والكراتين',
    title: 'استوديو OEM للعلامات الخاصة 2.5D',
    titleAccent: 'وتصاميم عبوات التصدير المخصصة',
    subtitle: 'تخصيص عبوات علامتك التجارية التصديرية وفق أدق مخططات المصنع. اختر خامات الكرتون، والفويل الذهبي الفاخر، والنصوص التحذيرية المطابقة لمعايير الخليج (GCC) وأوروبا.',
    sec1Title: 'صيغة عبوة التصدير',
    opt1kgTitle: 'علبة داخلية 1 كغ (10x1 كغ في الكرتون الرئيسي)',
    opt1kgDesc: 'الأبعاد 100×100×100 مم • دوبلكس 250 جم',
    opt2kgTitle: 'علبة داخلية 2 كغ (5x2 كغ في الكرتون الرئيسي)',
    opt2kgDesc: 'الأبعاد 200×100×100 مم • دوبلكس 300 جم',
    opt10kgTitle: 'كرتون شحن رئيسي 10 كغ (شواء سائب)',
    opt10kgDesc: 'كرتون مقوى 5 طبقات فائق المتانة K150',
    sec2Title: 'خامات الورق والتشطيبات الفاخرة',
    matKraft: 'كرافت 275 جم',
    matKraftSub: 'طبيعي وبيئي',
    matBlack: 'أسود مطفي (Matte)',
    matBlackSub: 'شيشة فاخرة',
    matWhite: 'أبيض ناصع',
    matWhiteSub: 'دوبلكس 300 جم',
    finishMatte: 'طبقة حماية غير لامعة Matte UV (مقاومة للرطوبة)',
    finishMatteTag: 'قياسي',
    finishGold: 'بصمة فويل ذهبي بارز (شعار واسم الماركة)',
    finishSpotUv: 'زخارف ملمعة Spot UV',
    sec3Title: 'هوية العلامة التجارية واللوائح',
    lblBrand: 'اسم العلامة التجارية للمشتري (الرئيسي)',
    lblTagline: 'الشعار التسويقي الفرعي',
    chkArabic: 'التحذيرات باللغة العربية (معايير ESMA وهيئة التقييس الخليجية 2530)',
    chkBarcode: 'الباركود الدولي EAN-13 ورمز الاستجابة السريعة QR للدفعة',
    chkCert: 'شهادات الاعتماد الرسمية (حلال وشهادة IMO Non-DG SP925)',
    btnView3d: 'منظور العلبة ثلاثي الأبعاد 3D',
    btnViewFlat: 'مخطط القطع المنبسط 2D CAD',
    btnViewPallet: 'ترتيب الطبالي البحرية (Pallet)',
    legibilityTitle: 'مواصفات الطباعة المعتمدة للواجهة الأمامية',
    lblColBrand: 'شعار واسم الماركة:',
    lblColTagline: 'الشعار / درجة الجودة:',
    lblColFinish: 'التشطيب:',
    lblColReg: 'اللوائح التصديرية:',
    btnSendWa: 'إرسال النموذج إلى واتساب المصنع',
    waMsg: 'مرحباً NusantaraOrigin، أود تأكيد نموذج العبوة المخصصة للماركة: {brand} ({format})',
    b2bStandard: 'معايير B2B المعتمدة',
    matLabelKraft: 'كرتون كرافت طبيعي صديق للبيئة (275 جم)',
    matLabelBlack: 'أسود أنثراسيت مطفي فاخر (شيشة فاخرة)',
    matLabelWhite: 'أبيض ناصع مطلي دوبلكس (300 جم)',
    cadAccuCut: 'قص دقيق بمتجهات CAD',
    foilYes: 'فويل ذهبي',
    foilNo: 'حبر قياسي',
    matteYes: 'طبقة مطفية UV',
    matteNo: 'بدون طلاء',
    flatCadTitle: 'مخطط القطع المنبسط ثنائي الأبعاد 2D CAD (100×100×100 مم)',
    palletTitle: 'ترتيب الطبالي البحرية (EURO PALLET)',
    palletSub: 'طبلية أوروبية 1200 × 1000 مم • تغليف غشاء حراري',
    diecutTol: 'دقة وتفاوت القص: ±0.5 مم • تفريغ هواء داخلي',
    printMarks: 'إزاحة ألوان +3 مم • خط طي 0.25pt • CMYK + ذهبي فاخر',
    formatLabel: 'صيغة العبوة:',
    materialLabel: 'الخامة:',
  },
  zh: {
    navCommodities: '出口大宗商品',
    navOem: 'OEM 与自有品牌代工',
    navStudio: '包装工业刀模配置工作室',
    title: '2.5D OEM 品牌定制工作室',
    titleAccent: '& 专属外贸出口包装',
    subtitle: '基于工厂高精密包装刀模图规范，定制您的专属出口品牌外箱与内盒。自由选择瓦楞纸板材质、烫金工艺 (Gold Foil) 以及中东海湾 GCC 与欧洲进出口合规警示文案。',
    sec1Title: '出口包装规格形式',
    opt1kgTitle: '1kg 精美彩盒内盒 (每外箱装 10x1kg)',
    opt1kgDesc: '内盒尺寸 100×100×100 mm • 白卡涂布 250gsm',
    opt2kgTitle: '2kg 加大彩盒内盒 (每外箱装 5x2kg)',
    opt2kgDesc: '内盒尺寸 200×100×100 mm • 白卡涂布 300gsm',
    opt10kgTitle: '10kg 散装出口外箱 (商用烧烤散装)',
    opt10kgDesc: '加厚五层高强瓦楞纸板 K150',
    sec2Title: '纸张基材与表面整饰工艺',
    matKraft: '牛皮纸 275g',
    matKraftSub: '环保质朴',
    matBlack: '炭黑哑光',
    matBlackSub: '奢华水烟',
    matWhite: '亮白涂布',
    matWhiteSub: '双面白卡 300g',
    finishMatte: '哑光覆膜 / 哑光防潮 UV (Waterproof)',
    finishMatteTag: '出厂标准',
    finishGold: '烫金工艺 Hot-Stamping (Logo 与品牌名)',
    finishSpotUv: '局部立体 UV 晶亮图案',
    sec3Title: '品牌标识与进出口合规文案',
    lblBrand: '采购商品牌名称 (主标题 Headline)',
    lblTagline: '副标题 / 广告语宣传词',
    chkArabic: '阿拉伯语健康警示文案 (符合 ESMA 与海湾 GCC GSO 2530 法规)',
    chkBarcode: 'EAN-13 国际商品条形码与批次溯源 QR 码',
    chkCert: '官方合规资质认证标识 (Halal 认证与 IMO SP925 海事豁免)',
    btnView3d: '3D 旋转立体包装盒透视',
    btnViewFlat: '2D 展平工业矢量 CAD 刀模',
    btnViewPallet: '集装箱托盘装载堆叠',
    legibilityTitle: '包装正面印刷刀模面板技术指标',
    lblColBrand: '品牌标志与商标:',
    lblColTagline: '宣传语 / 质量等级:',
    lblColFinish: '表面工艺:',
    lblColReg: '出口法规要求:',
    btnSendWa: '发送设计效果图至工厂 WhatsApp',
    waMsg: '您好 NusantaraOrigin，我希望确认 OEM 品牌包装效果图打样: {brand} ({format})',
    b2bStandard: '出口 B2B 工业标准',
    matLabelKraft: '环保质朴牛皮纸板 (275 gsm)',
    matLabelBlack: '炭黑高级哑光纸板 (高端水烟专版)',
    matLabelWhite: '亮白高光涂布白卡 (300 gsm)',
    cadAccuCut: '高精工业矢量 CAD 刀模',
    foilYes: '烫金工艺',
    foilNo: '标准印刷',
    matteYes: '哑光防潮 UV',
    matteNo: '出厂标准',
    flatCadTitle: '2D 工业平面展开 CAD 刀模图 (100×100×100 mm)',
    palletTitle: '海运托盘打托堆叠模拟 (EURO 标准欧标托盘)',
    palletSub: '欧标托盘 1200 × 1000 mm • 工业热缩缠绕膜封装',
    diecutTol: '模切公差: ±0.5 mm • 内置真空保鲜密封',
    printMarks: '出血位 +3mm • 压痕线 Cyan 0.25pt • CMYK + 专金 871C',
    formatLabel: '包装规格:',
    materialLabel: '基材材质:',
  },
};

export default function OemConfiguratorStudio() {
  const { locale } = useLanguage();
  const t = STUDIO_I18N[locale] || STUDIO_I18N.en;

  const [packFormat, setPackFormat] = useState<PackFormat>('1kg');
  const [material, setMaterial] = useState<MaterialType>('matte_black');
  const [viewMode, setViewMode] = useState<ViewMode>('3d');

  // Customizer inputs
  const [brandName, setBrandName] = useState('AL-FAKHER CROWN PLATINUM');
  const [tagline, setTagline] = useState('100% PURE INDONESIAN COCONUT CHARCOAL');
  const [arabicTextEnabled, setArabicTextEnabled] = useState(true);
  const [barcodeEnabled, setBarcodeEnabled] = useState(true);
  const [certLogosEnabled, setCertLogosEnabled] = useState(true);

  // Finishing toggles
  const [matteUv, setMatteUv] = useState(true);
  const [goldFoil, setGoldFoil] = useState(true);
  const [spotUv, setSpotUv] = useState(false);

  // Material textures & styles
  const getBoxStyle = () => {
    switch (material) {
      case 'kraft':
        return {
          bg: '#8B5A2B',
          bgLight: '#A66E38',
          bgDark: '#6E451E',
          text: '#F5EBE1',
          accent: goldFoil ? '#F0D38D' : '#FFB59C',
          border: '#4A2F13',
          label: t.matLabelKraft,
        };
      case 'white_duplex':
        return {
          bg: '#F2EFEB',
          bgLight: '#FAF8F5',
          bgDark: '#DDD9D2',
          text: '#1C1917',
          accent: goldFoil ? '#B8860B' : '#C4440F',
          border: '#C4BEB5',
          label: t.matLabelWhite,
        };
      case 'matte_black':
      default:
        return {
          bg: '#1C1A18',
          bgLight: '#2A2724',
          bgDark: '#121110',
          text: '#F5F2EB',
          accent: goldFoil ? '#FFD700' : '#FF8A52',
          border: '#38332E',
          label: t.matLabelBlack,
        };
    }
  };

  const style = getBoxStyle();

  const dynamicWaText = t.waMsg
    .replace('{brand}', brandName)
    .replace('{format}', packFormat);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 font-poppins">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <nav className="flex items-center gap-2 font-mono text-[11px] text-outline uppercase tracking-wider">
          <Link href="/products" className="hover:text-primary">{t.navCommodities}</Link>
          <span>/</span>
          <span>{t.navOem}</span>
          <span>/</span>
          <span className="text-primary font-bold">{t.navStudio}</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-headline text-[30px] sm:text-[36px] font-extrabold text-on-surface tracking-tight">
              {t.title}{' '}
              <span className="font-editorial italic font-normal text-secondary">
                {t.titleAccent}
              </span>
            </h1>
            <p className="font-body text-[14px] text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
              {t.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-surface-container px-3.5 py-1.5 rounded-lg border border-outline-variant/30 text-tertiary font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span>DIELINE ENGINE v4.2 LIVE</span>
          </div>
        </div>
      </div>

      {/* 12-Column Split Configurator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-surface-container-low rounded-2xl border border-outline-variant/30 p-4 sm:p-6 flex flex-col gap-6 shadow-xl">
          {/* Section 1: Format Kemasan */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <span className="font-headline text-[13px] font-bold text-on-surface flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container text-[11px] font-mono flex items-center justify-center font-bold">
                  1
                </span>
                {t.sec1Title}
              </span>
              <span className="font-mono text-[11px] text-outline">{t.b2bStandard}</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => setPackFormat('1kg')}
                className={`p-3 rounded-xl text-left transition-all flex items-start gap-3 border ${
                  packFormat === '1kg'
                    ? 'border-primary-container bg-surface-container shadow-md'
                    : 'border-outline-variant/30 bg-surface-container-lowest/50 hover:bg-surface-container'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  packFormat === '1kg' ? 'border-primary-container' : 'border-outline-variant'
                }`}>
                  {packFormat === '1kg' && <div className="w-2 h-2 rounded-full bg-primary-container"></div>}
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-[13px] font-bold text-on-surface">
                    {t.opt1kgTitle}
                  </span>
                  <span className="font-mono text-[11px] text-outline">
                    {t.opt1kgDesc}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPackFormat('2kg')}
                className={`p-3 rounded-xl text-left transition-all flex items-start gap-3 border ${
                  packFormat === '2kg'
                    ? 'border-primary-container bg-surface-container shadow-md'
                    : 'border-outline-variant/30 bg-surface-container-lowest/50 hover:bg-surface-container'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  packFormat === '2kg' ? 'border-primary-container' : 'border-outline-variant'
                }`}>
                  {packFormat === '2kg' && <div className="w-2 h-2 rounded-full bg-primary-container"></div>}
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-[13px] font-bold text-on-surface">
                    {t.opt2kgTitle}
                  </span>
                  <span className="font-mono text-[11px] text-outline">
                    {t.opt2kgDesc}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPackFormat('10kg_bulk')}
                className={`p-3 rounded-xl text-left transition-all flex items-start gap-3 border ${
                  packFormat === '10kg_bulk'
                    ? 'border-primary-container bg-surface-container shadow-md'
                    : 'border-outline-variant/30 bg-surface-container-lowest/50 hover:bg-surface-container'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  packFormat === '10kg_bulk' ? 'border-primary-container' : 'border-outline-variant'
                }`}>
                  {packFormat === '10kg_bulk' && <div className="w-2 h-2 rounded-full bg-primary-container"></div>}
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-[13px] font-bold text-on-surface">
                    {t.opt10kgTitle}
                  </span>
                  <span className="font-mono text-[11px] text-outline">
                    {t.opt10kgDesc}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Material & Substrat */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <span className="font-headline text-[13px] font-bold text-on-surface flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container text-[11px] font-mono flex items-center justify-center font-bold">
                  2
                </span>
                {t.sec2Title}
              </span>
              <span className="font-mono text-[11px] text-tertiary">ISO-12647-2</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMaterial('kraft')}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                  material === 'kraft'
                    ? 'border-2 border-primary-container bg-surface-container shadow'
                    : 'border-outline-variant/30 bg-surface-container hover:border-outline'
                }`}
              >
                <span className="w-full h-8 rounded-lg shadow-inner" style={{ backgroundColor: '#8B5A2B' }}></span>
                <span className="font-mono text-[11px] text-on-surface text-center leading-tight">
                  {t.matKraft}<br />
                  <span className="text-outline text-[9px]">{t.matKraftSub}</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMaterial('matte_black')}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                  material === 'matte_black'
                    ? 'border-2 border-primary-container bg-surface-container shadow'
                    : 'border-outline-variant/30 bg-surface-container hover:border-outline'
                }`}
              >
                <span className="w-full h-8 rounded-lg shadow-inner" style={{ backgroundColor: '#1C1A18' }}></span>
                <span className="font-mono text-[11px] text-primary text-center leading-tight font-semibold">
                  {t.matBlack}<br />
                  <span className="text-secondary text-[9px]">{t.matBlackSub}</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMaterial('white_duplex')}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                  material === 'white_duplex'
                    ? 'border-2 border-primary-container bg-surface-container shadow'
                    : 'border-outline-variant/30 bg-surface-container hover:border-outline'
                }`}
              >
                <span className="w-full h-8 rounded-lg shadow-inner" style={{ backgroundColor: '#F2EFEB' }}></span>
                <span className="font-mono text-[11px] text-on-surface text-center leading-tight">
                  {t.matWhite}<br />
                  <span className="text-outline text-[9px]">{t.matWhiteSub}</span>
                </span>
              </button>
            </div>

            {/* Special Finishing Options */}
            <div className="flex flex-col gap-2 pt-1 text-[13px]">
              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
                <span className="flex items-center gap-2 text-on-surface">
                  <input
                    type="checkbox"
                    checked={matteUv}
                    onChange={(e) => setMatteUv(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary-container"
                  />
                  <span>{t.finishMatte}</span>
                </span>
                <span className="font-mono text-[11px] text-tertiary">{t.finishMatteTag}</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
                <span className="flex items-center gap-2 text-on-surface">
                  <input
                    type="checkbox"
                    checked={goldFoil}
                    onChange={(e) => setGoldFoil(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary-container"
                  />
                  <span>{t.finishGold}</span>
                </span>
                <span className="font-mono text-[11px] text-secondary">+$0.03/pc</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
                <span className="flex items-center gap-2 text-on-surface">
                  <input
                    type="checkbox"
                    checked={spotUv}
                    onChange={(e) => setSpotUv(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary-container"
                  />
                  <span>{t.finishSpotUv}</span>
                </span>
                <span className="font-mono text-[11px] text-outline">+$0.015/pc</span>
              </label>
            </div>
          </div>

          {/* Section 3: Brand Text & Regulatory Labels */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <span className="font-headline text-[13px] font-bold text-on-surface flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container text-[11px] font-mono flex items-center justify-center font-bold">
                  3
                </span>
                {t.sec3Title}
              </span>
              <span className="font-mono text-[11px] text-outline">GCC / EU</span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] uppercase font-bold text-outline">
                {t.lblBrand}
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container font-mono"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] uppercase font-bold text-outline">
                {t.lblTagline}
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container font-mono"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-2 pt-1 text-[12px]">
              <label className="flex items-center gap-2 text-on-surface cursor-pointer">
                <input
                  type="checkbox"
                  checked={arabicTextEnabled}
                  onChange={(e) => setArabicTextEnabled(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary-container"
                />
                <span>{t.chkArabic}</span>
              </label>

              <label className="flex items-center gap-2 text-on-surface cursor-pointer">
                <input
                  type="checkbox"
                  checked={barcodeEnabled}
                  onChange={(e) => setBarcodeEnabled(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary-container"
                />
                <span>{t.chkBarcode}</span>
              </label>

              <label className="flex items-center gap-2 text-on-surface cursor-pointer">
                <input
                  type="checkbox"
                  checked={certLogosEnabled}
                  onChange={(e) => setCertLogosEnabled(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary-container"
                />
                <span>{t.chkCert}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Perspective Studio Canvas Viewport (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden flex flex-col shadow-2xl relative">
            {/* Viewport Toolbar */}
            <div className="min-h-12 bg-surface-container-low border-b border-outline-variant/30 px-3 sm:px-4 py-2 sm:py-0 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1 rounded-md font-headline text-[12px] font-semibold transition-all cursor-pointer ${
                    viewMode === '3d'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {t.btnView3d}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('flat')}
                  className={`px-3 py-1 rounded-md font-headline text-[12px] font-semibold transition-all cursor-pointer ${
                    viewMode === 'flat'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {t.btnViewFlat}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('pallet')}
                  className={`px-3 py-1 rounded-md font-headline text-[12px] font-semibold transition-all cursor-pointer ${
                    viewMode === 'pallet'
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {t.btnViewPallet}
                </button>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-outline">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span>{t.cadAccuCut}</span>
              </div>
            </div>

            {/* Canvas Stage */}
            <div className="w-full min-h-[480px] cad-grid relative p-6 flex flex-col items-center justify-center overflow-hidden">
              {viewMode === '3d' && (
                <div className="w-full flex flex-col items-center gap-4 py-2">
                  {/* REALISTIC 3D ROTATABLE PACKAGING BOX (THREE.JS / WEBGL) */}
                  <OemBox3DViewer
                    material={material}
                    packFormat={packFormat}
                    brandName={brandName}
                    tagline={tagline}
                    goldFoil={goldFoil}
                    matteUv={matteUv}
                    spotUv={spotUv}
                    arabicTextEnabled={arabicTextEnabled}
                    barcodeEnabled={barcodeEnabled}
                    certLogosEnabled={certLogosEnabled}
                  />

                  {/* LEGIBILITY CARD: Clear Preview Below (Every detail 100% readable) */}
                  <div className="w-full bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-2 shadow-md">
                    <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                      <span className="font-headline font-bold text-[13px] text-on-surface">
                        {t.legibilityTitle}
                      </span>
                      <span className="font-mono text-[11px] text-tertiary font-bold">
                        {style.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px] pt-1 font-mono">
                      <div className="flex flex-col">
                        <span className="text-outline text-[10px]">{t.lblColBrand}</span>
                        <strong className="text-primary truncate">{brandName}</strong>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-outline text-[10px]">{t.lblColTagline}</span>
                        <span className="text-on-surface truncate">{tagline}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-outline text-[10px]">{t.lblColFinish}</span>
                        <span className="text-secondary font-semibold">
                          {goldFoil ? t.foilYes : t.foilNo} • {matteUv ? t.matteYes : t.matteNo}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-outline text-[10px]">{t.lblColReg}</span>
                        <span className="text-tertiary font-semibold">GCC GSO 2530 & SP925</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {viewMode === 'flat' && (
                <div className="w-full max-w-md bg-surface-container p-5 rounded-xl border border-outline-variant/30 flex flex-col items-center gap-3">
                  <span className="font-mono text-[11px] text-tertiary">{t.flatCadTitle}</span>
                  <div className="w-full h-64 border-2 border-dashed border-primary/40 rounded-lg flex flex-col items-center justify-center p-4 text-center bg-surface-container-high/40">
                    <span className="font-headline font-bold text-[16px] text-on-surface">{brandName}</span>
                    <span className="font-body text-[12px] text-outline mt-1">{tagline}</span>
                    <span className="font-mono text-[11px] text-primary mt-2">
                      {t.diecutTol}
                    </span>
                    <span className="font-mono text-[10px] text-tertiary mt-1">
                      {t.printMarks}
                    </span>
                  </div>
                </div>
              )}

              {viewMode === 'pallet' && (
                <div className="w-full max-w-md bg-surface-container p-5 rounded-xl border border-outline-variant/30 flex flex-col items-center gap-3">
                  <span className="font-mono text-[11px] text-tertiary">{t.palletTitle}</span>
                  <div className="w-full h-64 border border-outline-variant/30 rounded-lg flex flex-col justify-end p-4 bg-surface-container-high/40">
                    <div className="grid grid-cols-5 gap-1.5 w-full h-44">
                      {Array.from({ length: 35 }).map((_, i) => (
                        <div key={i} className="bg-primary-container/85 rounded-sm border border-black/40"></div>
                      ))}
                    </div>
                    <div className="w-full h-7 bg-[#8B5A2B] rounded mt-2 flex items-center justify-center font-mono text-[11px] text-white font-bold">
                      {t.palletSub}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Viewport Footer Bar */}
            <div className="px-6 py-3.5 bg-surface-container-low border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-outline">
                {t.formatLabel} {packFormat.toUpperCase()} • {t.materialLabel} {material.toUpperCase()}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/628113000000?text=${encodeURIComponent(dynamicWaText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-headline text-[13px] font-semibold hover:bg-[#D94E13] transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>{t.btnSendWa}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
