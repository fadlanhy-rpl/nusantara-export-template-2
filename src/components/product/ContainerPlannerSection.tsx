'use client';

import React, { useState } from 'react';
import { calculateContainerCargo, ContainerType, MASTER_BOX_10KG } from '@/lib/containerCargoCalculator';
import { formatUsd } from '@/lib/utils';
import { Ship, Scale, Box, Lock, Unlock, ArrowRight, MessageCircle, FileText, CheckCircle2, Printer, Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ProformaInvoiceModal from './ProformaInvoiceModal';

const PLANNER_I18N = {
  en: {
    telemetryTag: 'OFFICIAL MARITIME LOGISTICS SIMULATION & FOB PRICING / PRD-NO2 SECTION 7 ENGINE',
    title: 'Container Load Planner & Soft-Gated RFQ Desk',
    subtitle: 'Mathematical precision simulation of 10kg briquette cartons, road-payload enforcement at Port of Tanjung Perak, and access to stamped official FOB quotation drafts.',
    portTag: 'PORT: TANJUNG PERAK (SUB)',
    step1Title: '1. Export Container Parameters',
    isoTag: 'ISO 668 COMPLIANT',
    selectSizeLabel: 'Select Maritime Container Size',
    recommendBadge: 'RECOMMENDED',
    regularBadge: 'REGULAR',
    qtyLabel: 'Allocated Containers Count (FCL)',
    slotsTag: 'FACTORY SLOTS: AVAILABLE',
    fclContainers: 'FCL Containers',
    totalNetWeight: 'Total Net Weight',
    metricTons: 'Metric Tons',
    incotermLabel: 'Incoterm Standard:',
    incotermVal: 'FOB Surabaya (Tanjung Perak)',
    packingLabel: 'Floor Stacked Packing:',
    packingVal: 'Optimal ({boxes} boxes/container)',
    desiccantLabel: 'Desiccant Standard:',
    desiccantVal: '8x 1kg Calcium Chloride Poles',
    schematicTitle: '2D Top-Down Container Cargo Simulation',
    schematicSub: 'Cross-Section View • {container}',
    interiorDim: 'INTERIOR DIMENSIONS:',
    stowageFactor: 'STOWAGE FACTOR: 0.95',
    exportPack10kg: 'MASTER BOXES (10kg EXPORT PACK)',
    floorStackTiers: 'FLOOR STACK: 10 TIERS',
    weightUtil: 'PAYLOAD WEIGHT UTILIZATION:',
    roadSafe: 'ROAD SAFE',
    grossWeight: 'Total Gross Weight:',
    maxPayloadLimit: 'Maximum Road Payload Limit:',
    cbmUtil: 'VOLUME CBM UTILIZATION:',
    optimalDensity: 'OPTIMAL DENSITY',
    utilizedCbm: 'Utilized Volume:',
    effectiveCbm: 'Effective Capacity:',
    valuationTitle: 'Official Valuation Estimate FOB Surabaya',
    statusVerified: 'VERIFIED ACCESS',
    statusLocked: 'LOCKED',
    unlockCardTitle: 'Unlock Detailed Pricing & Official PDF Quotation Draft',
    unlockCardDesc: 'Submit your corporate details to view price breakdown per MT, stuffing schedule, and stamped official proforma quotation from PT Nusantara Origin.',
    lblPic: 'Full Name of PIC',
    lblCompany: 'Company & Country',
    lblEmail: 'Corporate Email',
    lblPhone: 'WhatsApp / Direct Tel',
    btnUnlock: 'Unlock Price Breakdown & Send Official Quotation Draft',
    verifiedAccessBadge: 'VALUATION STATUS: UNLOCKED (VERIFIED BUYER ACCESS)',
    validityTag: 'VALIDITY: 14 DAYS',
    itemCharcoal: '100% Mature Coconut Charcoal Briquettes (Calorific > 7,500 kcal):',
    itemOem: 'Custom OEM 1kg Box + 5-Ply Master Carton:',
    itemOemVal: 'Included ($0)',
    itemThc: 'Port Tanjung Perak THC & Export Handling:',
    itemThcVal: 'Included in FOB',
    itemCert: 'Phytosanitary & IMO Non-DG Certificate SP925:',
    itemCertVal: 'Complimentary',
    btnWhatsapp: 'Send RFQ Directly to WhatsApp Export Director',
    waMsg: 'Hello Export Director at NusantaraOrigin, I am {name} from {company}. I simulated {qty}x {type} ({mt} MT) and would like to receive the official stamped proforma invoice.',
  },
  id: {
    telemetryTag: 'SIMULASI LOGISTIK MARITIM & HARGA FOB RESMI / PRD-NO2 SECTION 7 ENGINE',
    title: 'Container Load Planner & Soft-Gated RFQ Desk',
    subtitle: 'Simulasi presisi matematis muatan kardus briket 10kg, deteksi batas tonase jalan raya pelabuhan Tanjung Perak, dan pembukaan draf harga FOB berstempel resmi.',
    portTag: 'PELABUHAN: TANJUNG PERAK (SUB)',
    step1Title: '1. Parameter Kontainer Ekspor',
    isoTag: 'ISO 668 COMPLIANT',
    selectSizeLabel: 'Pilih Ukuran Kontainer Maritim',
    recommendBadge: 'REKOMENDASI',
    regularBadge: 'REGULAR',
    qtyLabel: 'Jumlah Alokasi Kontainer (FCL)',
    slotsTag: 'SLOT PABRIK: TERSEDIA',
    fclContainers: 'Kontainer FCL',
    totalNetWeight: 'Total Muatan Bersih',
    metricTons: 'Metrik Ton',
    incotermLabel: 'Incoterm Standard:',
    incotermVal: 'FOB Surabaya (Tanjung Perak)',
    packingLabel: 'Floor Stacked Packing:',
    packingVal: 'Optimal ({boxes} box/kontainer)',
    desiccantLabel: 'Desiccant Standard:',
    desiccantVal: '8x 1kg Calcium Chloride Poles',
    schematicTitle: 'Simulasi Ruang Muat Kontainer 2D Top-Down',
    schematicSub: 'Cross-Section View • {container}',
    interiorDim: 'DIMENSI INTERIOR:',
    stowageFactor: 'FAKTOR PENYUSUNAN: 0.95',
    exportPack10kg: 'KARDUS MASTER (KEMASAN EKSPOR 10kg)',
    floorStackTiers: 'TUMPUKAN LANTAI: 10 TINGKAT',
    weightUtil: 'UTILISASI BERAT MUATAN:',
    roadSafe: 'AMAN JALAN RAYA',
    grossWeight: 'Total Berat Kotor:',
    maxPayloadLimit: 'Batas Tonase Maksimal:',
    cbmUtil: 'UTILISASI KUBIKASI CBM:',
    optimalDensity: 'KERAPATAN OPTIMAL',
    utilizedCbm: 'Kubikasi Terpakai:',
    effectiveCbm: 'Kapasitas Efektif:',
    valuationTitle: 'Estimasi Nilai Valuasi Resmi FOB Surabaya',
    statusVerified: 'AKSES TERVERIFIKASI',
    statusLocked: 'TERKUNCI',
    unlockCardTitle: 'Buka Rincian Harga & Draf Quotation Resmi (PDF)',
    unlockCardDesc: 'Masukkan data bisnis Anda untuk membuka breakdown harga per MT, jadwal stuffing pabrik, dan lembar penawaran berstempel resmi PT Nusantara Origin.',
    lblPic: 'Nama Lengkap PIC',
    lblCompany: 'Perusahaan & Negara',
    lblEmail: 'Email Bisnis',
    lblPhone: 'WhatsApp / Direct Tel',
    btnUnlock: 'Buka Rincian Harga & Kirim Draf Penawaran Resmi',
    verifiedAccessBadge: 'STATUS VALUASI: TERBUKA (AKSES BUYER TERVERIFIKASI)',
    validityTag: 'VALIDITAS: 14 HARI',
    itemCharcoal: 'Briket Batok Murni 100% (Kalori > 7,500 kcal):',
    itemOem: 'Custom OEM 1kg Box + 5-Ply Master Carton:',
    itemOemVal: 'Sudah Termasuk ($0)',
    itemThc: 'THC Port Tanjung Perak & Legalitas Ekspor:',
    itemThcVal: 'Included in FOB',
    itemCert: 'Phytosanitary & IMO Non-DG Certificate SP925:',
    itemCertVal: 'Complimentary',
    btnWhatsapp: 'Kirim RFQ Langsung ke WhatsApp Direktur Ekspor',
    waMsg: 'Halo Direktur Ekspor NusantaraOrigin, saya {name} dari {company}. Saya telah melakukan simulasi kargo kontainer {qty}x {type} ({mt} MT) dan ingin mendapatkan Official Proforma Invoice resmi.',
  },
  ar: {
    telemetryTag: 'محاكاة اللوجستيات البحرية الرسمية وأسعار FOB / نظام PRD-NO2',
    title: 'مخطط تحميل الحاويات ومكتب طلب عروض الأسعار RFQ',
    subtitle: 'محاكاة دقيقة لحمولة كراتين الفحم 10 كغ، والالتزام بأوزان الطرق المسموح بها في ميناء تانجونغ بيراك، والاطلاع على مسودة الأسعار الرسمية.',
    portTag: 'الميناء: تانجونغ بيراك (SUB)',
    step1Title: '1. معايير حاويات التصدير',
    isoTag: 'مطابق لمواصفات ISO 668',
    selectSizeLabel: 'اختر حجم الحاوية البحرية',
    recommendBadge: 'موصى به',
    regularBadge: 'عادي',
    qtyLabel: 'عدد الحاويات المحجوزة (FCL)',
    slotsTag: 'المصنع: مواعيد الشحن متوفرة',
    fclContainers: 'حاويات FCL',
    totalNetWeight: 'إجمالي الوزن الصافي',
    metricTons: 'طن متري',
    incotermLabel: 'شرط الشحن القياسي:',
    incotermVal: 'FOB سورابايا (ميناء تانجونغ بيراك)',
    packingLabel: 'طريقة التحميل الأرضي:',
    packingVal: 'مثالي ({boxes} كرتون / حاوية)',
    desiccantLabel: 'ممتصات الرطوبة القياسية:',
    desiccantVal: '8 أعمدة كلوريد الكالسيوم 1 كغ',
    schematicTitle: 'محاكاة ثنائية الأبعاد 2D لتوزيع حمولة الحاوية',
    schematicSub: 'مقطع عرضي علوي • {container}',
    interiorDim: 'الأبعاد الداخلية:',
    stowageFactor: 'معامل التكديس: 0.95',
    exportPack10kg: 'كرتون شحن رئيسي (عبوة تصدير 10 كغ)',
    floorStackTiers: 'التكديس الرأسي: 10 طبقات',
    weightUtil: 'نسبة استغلال الحمولة الوزنية:',
    roadSafe: 'آمن على الطرق السريعة',
    grossWeight: 'إجمالي الوزن القائم:',
    maxPayloadLimit: 'أقصى وزن حمولة مسموح به:',
    cbmUtil: 'نسبة استغلال الحجم التكعيبي CBM:',
    optimalDensity: 'كثافة مثالية',
    utilizedCbm: 'الحجم المستغل:',
    effectiveCbm: 'السعة الفعلية:',
    valuationTitle: 'تقدير القيمة الرسمية FOB سورابايا',
    statusVerified: 'دخول معتمد',
    statusLocked: 'مغلق',
    unlockCardTitle: 'عرض تفاصيل الأسعار ومسودة عرض السعر الرسمية (PDF)',
    unlockCardDesc: 'أدخل بيانات شركتك لفتح تفاصيل السعر للطن المتري، وجدول الشحن في المصنع، وعرض السعر الرسمي المختوم من شركة Nusantara Origin.',
    lblPic: 'اسم المسؤول بالكامل',
    lblCompany: 'الشركة والدولة',
    lblEmail: 'البريد الإلكتروني للعمل',
    lblPhone: 'رقم الواتساب / الهاتف المباشر',
    btnUnlock: 'فتح تفاصيل السعر وإرسال مسودة عرض السعر الرسمي',
    verifiedAccessBadge: 'حالة التسعير: متاح (دخول مشتري معتمد)',
    validityTag: 'الصلاحية: 14 يوماً',
    itemCharcoal: 'فحم جوز هند نقي 100% (طاقة حرارية > 7,500 سعرة):',
    itemOem: 'علب داخلية OEM 1 كغ + كرتون رئيسي 5 طبقات:',
    itemOemVal: 'مشمول مجاناً ($0)',
    itemThc: 'رسوم مناولة ميناء تانجونغ بيراك THC والإجراءات:',
    itemThcVal: 'مشمول في سعر FOB',
    itemCert: 'الشهادة النباتية وشهادة IMO Non-DG SP925:',
    itemCertVal: 'مقدمة مجاناً',
    btnWhatsapp: 'إرسال طلب السعر مباشرة إلى واتساب مدير التصدير',
    waMsg: 'مرحباً مدير التصدير بشركة NusantaraOrigin، أنا {name} من شركة {company}. قمت بمحاكاة شحن {qty}x {type} ({mt} طن متري) وأود الحصول على الفاتورة المبدئية الرسمية.',
  },
  zh: {
    telemetryTag: '官方国际海运物流装箱模拟与 FOB 报价核算系统 / PRD-NO2',
    title: 'Container Load Planner & Soft-Gated RFQ Desk',
    subtitle: '10kg 外箱精密堆叠算法，泗水丹戎佩拉港公路运输载重限值监测，以及解锁盖章版官方 FOB 报价单。',
    portTag: '装运港: 丹戎佩拉港 (SUB)',
    step1Title: '1. 出口集装箱核心参数',
    isoTag: '符合 ISO 668 国际海运标准',
    selectSizeLabel: '选择集装箱规格尺寸',
    recommendBadge: '强烈推荐',
    regularBadge: '常规标准',
    qtyLabel: '集装箱订购数量 (FCL 整箱)',
    slotsTag: '工厂排产装箱位: 现存充裕',
    fclContainers: '个 FCL 整箱',
    totalNetWeight: '货物总净重',
    metricTons: '公吨 (MT)',
    incotermLabel: '国际贸易术语:',
    incotermVal: 'FOB 印度尼西亚泗水港 (Tanjung Perak)',
    packingLabel: '地面无托盘紧密配载:',
    packingVal: '空间最佳化 ({boxes} 箱/集装箱)',
    desiccantLabel: '海运防潮干燥剂标准:',
    desiccantVal: '8支 1kg 氯化钙高吸收防潮棒',
    schematicTitle: '2D 俯视截面集装箱装载空间模拟',
    schematicSub: '剖面图示 • {container}',
    interiorDim: '内部可用尺寸:',
    stowageFactor: '积载因数: 0.95',
    exportPack10kg: '标准外箱 (10kg 出口瓦楞箱)',
    floorStackTiers: '垂直堆码: 10 层',
    weightUtil: '载重利用率 (PAYLOAD WEIGHT):',
    roadSafe: '公路安全标准',
    grossWeight: '货物总毛重:',
    maxPayloadLimit: '集装箱公路最大载重限额:',
    cbmUtil: '容积利用率 (CBM VOLUME):',
    optimalDensity: '最佳装载密度',
    utilizedCbm: '已占用立方数:',
    effectiveCbm: '有效装载容积:',
    valuationTitle: 'FOB 泗水港官方预估货值核算',
    statusVerified: '已获验证授权',
    statusLocked: '暂未解锁',
    unlockCardTitle: '解锁详细价格构成与盖章版报价草案 (PDF)',
    unlockCardDesc: '请填写您的企业采购信息，即刻获取每公吨细分单价、工厂排产装箱期，以及加盖 PT Nusantara Origin 公章的正规形式发票草案。',
    lblPic: '采购负责人姓名',
    lblCompany: '企业全称与所在国家',
    lblEmail: '企业商业工作邮箱',
    lblPhone: 'WhatsApp / 国际手机号码',
    btnUnlock: '解锁价格明细并发送官方盖章报价草案',
    verifiedAccessBadge: '估值状态: 已开放 (已认证采购商通道)',
    validityTag: '报价有效期: 14 天',
    itemCharcoal: '100% 纯椰壳炭块 (发热量 > 7,500 kcal):',
    itemOem: '定制品牌 1kg 内盒 + 5层出口瓦楞外箱:',
    itemOemVal: '已包含全免 ($0)',
    itemThc: '泗水港码头作业费 THC 与报关出口手续:',
    itemThcVal: '包含在 FOB 报价内',
    itemCert: '植物检疫与 IMO Non-DG 特别条款 925 证书:',
    itemCertVal: '免费附赠提供',
    btnWhatsapp: '将 RFQ 询盘直接发送至出口总监 WhatsApp',
    waMsg: '您好 NusantaraOrigin 出口总监，我是来自 {company} 的 {name}。我们刚模拟了 {qty}x {type} ({mt} MT) 货物，希望获取盖章版形式发票 (Proforma Invoice)。',
  },
};

export default function ContainerPlannerSection() {
  const { locale } = useLanguage();
  const t = PLANNER_I18N[locale] || PLANNER_I18N.en;

  const [containerType, setContainerType] = useState<ContainerType>('40HC');
  const [quantity, setQuantity] = useState<number>(2);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);
  const [referenceNo, setReferenceNo] = useState<string>('PI-20261024-8819');

  // Form states
  const [buyerName, setBuyerName] = useState('');
  const [buyerCompany, setBuyerCompany] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerWhatsapp, setBuyerWhatsapp] = useState('');

  const singleResult = calculateContainerCargo(containerType, MASTER_BOX_10KG);

  const totalBoxes = singleResult.effectiveBoxes * quantity;
  const totalNetMt = singleResult.totalNetWeightMt * quantity;
  const totalGrossMt = singleResult.totalGrossWeightMt * quantity;

  // Price estimate (Benchmark $1,280 - $1,340 per MT)
  const minPricePerMt = 1280;
  const maxPricePerMt = 1340;
  const totalMinUsd = totalNetMt * minPricePerMt;
  const totalMaxUsd = totalNetMt * maxPricePerMt;

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !buyerWhatsapp) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/v1/rfq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyer_name: buyerName,
          buyer_company: buyerCompany || 'International Trader',
          buyer_country: 'International',
          buyer_email: buyerEmail,
          buyer_whatsapp: buyerWhatsapp,
          container_size: `${quantity}x ${containerType}`,
          total_metric_tons: Number(totalNetMt.toFixed(1)),
          total_master_boxes: totalBoxes,
          incoterm: 'FOB Tanjung Perak',
          target_price: `$${minPricePerMt} - $${maxPricePerMt}/MT`,
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.reference_no) {
        setReferenceNo(data.data.reference_no);
      }
    } catch (err) {
      console.warn('Failed to submit RFQ to API:', err);
    } finally {
      setIsSubmitting(false);
      setIsUnlocked(true);
    }
  };

  const dynamicWaText = t.waMsg
    .replace('{name}', buyerName || 'Buyer')
    .replace('{company}', buyerCompany || 'Trading Company')
    .replace('{qty}', quantity.toString())
    .replace('{type}', containerType)
    .replace('{mt}', totalNetMt.toFixed(1));

  const whatsappMessage = encodeURIComponent(dynamicWaText);

  return (
    <section id="container-planner" className="w-full bg-[#F5F1EA] text-[#16110E] p-4 sm:p-6 lg:p-8 rounded-2xl border border-[#B9AFA4] shadow-2xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col border-b border-[#B9AFA4]/50 pb-4">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#59413A] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span>{t.telemetryTag}</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
            <div>
              <h2 className="font-headline text-[22px] sm:text-[28px] font-bold text-[#16110E] uppercase tracking-tight">
                {t.title}
              </h2>
              <p className="font-body text-[14px] text-[#59413A] mt-1 max-w-2xl">
                {t.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#16110E] bg-[#EAE4D9] px-3 py-1.5 rounded-lg border border-[#B9AFA4]">
              <span>{t.portTag}</span>
            </div>
          </div>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Controls (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 bg-[#EFE9E0] rounded-xl border border-[#B9AFA4] p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#B9AFA4]/40 pb-2">
              <span className="font-headline text-[13px] font-bold uppercase tracking-wider text-[#16110E]">
                {t.step1Title}
              </span>
              <span className="font-mono text-[11px] text-[#59413A]">{t.isoTag}</span>
            </div>

            {/* Container Type Selector */}
            <div className="flex flex-col gap-2">
              <label className="font-headline text-[11px] uppercase font-bold text-[#16110E]">
                {t.selectSizeLabel}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setContainerType('40HC')}
                  className={`p-3 rounded-lg text-left transition-all border ${
                    containerType === '40HC'
                      ? 'border-primary-container bg-white shadow-md'
                      : 'border-[#B9AFA4] bg-[#F8F5F0] hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline text-[13px] font-bold text-[#16110E]">40ft High Cube</span>
                    <span className="font-mono text-[9px] bg-primary-container text-white px-1.5 py-0.5 rounded font-bold">
                      {t.recommendBadge}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-primary-container font-semibold">
                    76.4 m³ (26.0 MT Max)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setContainerType('20FT')}
                  className={`p-3 rounded-lg text-left transition-all border ${
                    containerType === '20FT'
                      ? 'border-primary-container bg-white shadow-md'
                      : 'border-[#B9AFA4] bg-[#F8F5F0] hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline text-[13px] font-bold text-[#16110E]">20ft Standard</span>
                    <span className="font-mono text-[9px] bg-[#16110E]/10 text-[#16110E] px-1.5 py-0.5 rounded">
                      {t.regularBadge}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-[#59413A] font-semibold">
                    33.2 m³ (18.0 MT Max)
                  </div>
                </button>
              </div>
            </div>

            {/* Stepper Kuantitas Kontainer */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-headline text-[11px] uppercase font-bold text-[#16110E]">
                  {t.qtyLabel}
                </label>
                <span className="font-mono text-[11px] text-[#2A6844] font-bold">
                  {t.slotsTag}
                </span>
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg border border-[#B9AFA4] p-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded bg-[#EFE9E0] hover:bg-[#DFD7C9] text-lg font-bold flex items-center justify-center transition-colors"
                >
                  −
                </button>
                <div className="flex flex-col items-center">
                  <span className="font-headline text-[18px] font-extrabold text-[#16110E]">
                    {quantity} {t.fclContainers}
                  </span>
                  <span className="font-mono text-[11px] text-[#59413A]">
                    {t.totalNetWeight}: {totalNetMt.toFixed(1)} {t.metricTons}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded bg-[#EFE9E0] hover:bg-[#DFD7C9] text-lg font-bold flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Port & Incoterm Specs */}
            <div className="bg-white p-3.5 rounded-lg border border-[#B9AFA4]/50 flex flex-col gap-2 font-mono text-[11px]">
              <div className="flex justify-between items-center pb-1.5 border-b border-[#B9AFA4]/30">
                <span className="text-[#59413A]">{t.incotermLabel}</span>
                <span className="font-bold text-[#16110E]">{t.incotermVal}</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-[#B9AFA4]/30">
                <span className="text-[#59413A]">{t.packingLabel}</span>
                <span className="font-bold text-[#16110E]">
                  {t.packingVal.replace('{boxes}', singleResult.effectiveBoxes.toLocaleString())}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#59413A]">{t.desiccantLabel}</span>
                <span className="font-bold text-[#16110E]">{t.desiccantVal}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Simulation & Soft-Gated Block (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5 bg-white rounded-xl border border-[#B9AFA4] p-6 shadow-md">
            {/* 2D Schematic Simulation */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[#B9AFA4]/30 pb-2">
                <div>
                  <h3 className="font-headline text-[14px] font-bold uppercase text-[#16110E]">
                    {t.schematicTitle}
                  </h3>
                  <span className="font-mono text-[10px] text-[#59413A] uppercase">
                    {t.schematicSub.replace('{container}', singleResult.container.name)}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#EFE9E0] font-mono text-[10px] text-[#16110E] font-bold">
                  SCALE 1:50
                </span>
              </div>

              {/* Schematic Box */}
              <div className="w-full bg-[#16110E] rounded-lg p-3 text-[#ECE0DB] shadow-inner">
                <div className="flex justify-between items-center text-[10px] font-mono text-primary/80 mb-2 border-b border-[#ECE0DB]/10 pb-1 flex-wrap gap-1">
                  <span>{t.interiorDim} {singleResult.container.internalLengthM}m × {singleResult.container.internalWidthM}m × {singleResult.container.internalHeightM}m</span>
                  <span className="text-tertiary">{t.stowageFactor}</span>
                </div>

                {/* Carton Matrix Graphic */}
                <div className="w-full h-24 bg-[#201A17] rounded border border-dashed border-[#ECE0DB]/20 p-2 flex flex-col justify-between overflow-hidden">
                  <div className="grid grid-cols-12 gap-1 w-full h-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="bg-primary-container/80 rounded-sm"></div>
                    ))}
                  </div>
                  <div className="w-full h-8 bg-primary-container/20 border border-primary-container/40 rounded flex items-center justify-between px-2 sm:px-3 text-[10px] sm:text-[11px] font-mono">
                    <span className="text-[#ECE0DB] font-semibold truncate mr-1">
                      {totalBoxes.toLocaleString()} {t.exportPack10kg}
                    </span>
                    <span className="text-tertiary font-bold shrink-0">{t.floorStackTiers}</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1 w-full h-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="bg-primary-container/80 rounded-sm"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dual Progress Bars */}
              <div className="flex flex-col gap-3 pt-1">
                {/* Weight Bar */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-mono text-[11px]">
                    <span className="font-bold text-[#16110E]">{t.weightUtil}</span>
                    <span className="font-bold text-primary-container">{singleResult.weightUtilizationPercent}% ({t.roadSafe})</span>
                  </div>
                  <div className="w-full h-3 bg-[#EFE9E0] rounded-full overflow-hidden border border-[#B9AFA4]">
                    <div
                      className="h-full bg-primary-container rounded-full transition-all duration-500"
                      style={{ width: `${singleResult.weightUtilizationPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center font-mono text-[10px] text-[#59413A] flex-wrap gap-1">
                    <span>{t.grossWeight} {totalGrossMt.toFixed(2)} MT</span>
                    <span>{t.maxPayloadLimit} {(singleResult.container.maxPayloadKg * quantity / 1000).toFixed(1)} MT</span>
                  </div>
                </div>

                {/* Volume CBM Bar */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-mono text-[11px]">
                    <span className="font-bold text-[#16110E]">{t.cbmUtil}</span>
                    <span className="font-bold text-[#2A6844]">{singleResult.cbmUtilizationPercent}% ({t.optimalDensity})</span>
                  </div>
                  <div className="w-full h-3 bg-[#EFE9E0] rounded-full overflow-hidden border border-[#B9AFA4]">
                    <div
                      className="h-full bg-[#2A6844] rounded-full transition-all duration-500"
                      style={{ width: `${singleResult.cbmUtilizationPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center font-mono text-[10px] text-[#59413A] flex-wrap gap-1">
                    <span>{t.utilizedCbm} {(singleResult.utilizedCbm * quantity).toFixed(1)} CBM</span>
                    <span>{t.effectiveCbm} {(singleResult.container.effectiveCbm * quantity).toFixed(1)} CBM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* COMMERCIAL VALUATION (SOFT-GATED) */}
            <div className="border-t-2 border-[#B9AFA4]/40 pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-headline text-[13px] font-bold uppercase tracking-wider text-[#16110E]">
                  {t.valuationTitle}
                </span>
                <span className="font-mono text-[10px] text-[#59413A]">
                  STATUS: {isUnlocked ? t.statusVerified : t.statusLocked}
                </span>
              </div>

              {!isUnlocked ? (
                /* Gated Teaser + Lead Form */
                <div className="rounded-xl border border-[#B9AFA4] bg-gradient-to-b from-[#FAF7F2] to-[#EFE9E0] p-4 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-headline text-[14px] font-bold text-[#16110E]">
                        {t.unlockCardTitle}
                      </h4>
                      <p className="font-body text-[12px] text-[#59413A] mt-0.5">
                        {t.unlockCardDesc}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleUnlock} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase font-bold text-[#59413A]">{t.lblPic}</label>
                      <input
                        required
                        type="text"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="e.g. Tariq Al-Mansoor"
                        className="h-9 px-3 bg-white border border-[#B9AFA4] rounded-md text-[12px] focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase font-bold text-[#59413A]">{t.lblCompany}</label>
                      <input
                        required
                        type="text"
                        value={buyerCompany}
                        onChange={(e) => setBuyerCompany(e.target.value)}
                        placeholder="Al-Noor Trading LLC (UAE)"
                        className="h-9 px-3 bg-white border border-[#B9AFA4] rounded-md text-[12px] focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase font-bold text-[#59413A]">{t.lblEmail}</label>
                      <input
                        required
                        type="email"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="procurement@buyer.ae"
                        className="h-9 px-3 bg-white border border-[#B9AFA4] rounded-md text-[12px] focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase font-bold text-[#59413A]">{t.lblPhone}</label>
                      <input
                        required
                        type="tel"
                        value={buyerWhatsapp}
                        onChange={(e) => setBuyerWhatsapp(e.target.value)}
                        placeholder="+971 50 123 4567"
                        className="h-9 px-3 bg-white border border-[#B9AFA4] rounded-md text-[12px] focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="sm:col-span-2 pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 rounded-xl bg-[#16110E] hover:bg-[#2B231E] text-white font-headline text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-50 cursor-pointer"
                      >
                        <Unlock className="w-4 h-4 text-primary shrink-0" />
                        <span>{isSubmitting ? 'Menghubungkan ke Database...' : t.btnUnlock}</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Unlocked State */
                <div className="rounded-xl border-2 border-primary-container/40 bg-white p-5 flex flex-col gap-4 shadow-md">
                  <div className="flex items-center justify-between pb-2 border-b border-[#B9AFA4]/30">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2A6844]/15 text-[#2A6844] font-mono text-[11px] font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.verifiedAccessBadge}</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#59413A]">{t.validityTag}</span>
                  </div>

                  <div>
                    <div className="font-headline text-[24px] font-extrabold text-[#16110E]">
                      USD {formatUsd(totalMinUsd)} – {formatUsd(totalMaxUsd)}
                    </div>
                    <div className="font-mono text-[12px] text-primary-container font-semibold mt-0.5">
                      ($1,280 – $1,340 / MT • {totalNetMt.toFixed(1)} MT @ {quantity}x {containerType})
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#FAF7F2] border border-[#B9AFA4]/50 p-3 font-mono text-[11px] flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[#16110E]">
                      <span>{t.itemCharcoal}</span>
                      <span className="font-bold">$1,280 / MT</span>
                    </div>
                    <div className="flex justify-between items-center text-[#59413A]">
                      <span>{t.itemOem}</span>
                      <span className="text-[#2A6844] font-semibold">{t.itemOemVal}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#59413A]">
                      <span>{t.itemThc}</span>
                      <span className="text-[#2A6844] font-semibold">{t.itemThcVal}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#59413A]">
                      <span>{t.itemCert}</span>
                      <span className="text-[#2A6844] font-semibold">{t.itemCertVal}</span>
                    </div>
                  </div>

                  {/* Dual Action: Generate Stamped Proforma Invoice & Direct WhatsApp */}
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsInvoiceModalOpen(true)}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#16110E] hover:bg-[#2B231E] text-white font-headline text-[13px] sm:text-[14px] font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-primary shrink-0" />
                      <span>Cetak Proforma Invoice (.PDF)</span>
                    </button>

                    <a
                      href={`https://wa.me/628113000000?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl bg-primary-container hover:bg-[#D94E13] text-on-primary-container font-headline text-[13px] sm:text-[14px] font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <MessageCircle className="w-4 h-4 text-on-primary-container shrink-0" />
                      <span>{t.btnWhatsapp}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180 shrink-0" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Official Stamped Proforma Invoice Modal Preview & Print */}
      <ProformaInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        buyerName={buyerName}
        buyerCompany={buyerCompany}
        buyerEmail={buyerEmail}
        buyerWhatsapp={buyerWhatsapp}
        containerType={containerType}
        quantity={quantity}
        totalNetMt={totalNetMt}
        totalBoxes={totalBoxes}
        totalMinUsd={totalMinUsd}
        totalMaxUsd={totalMaxUsd}
        referenceNo={referenceNo}
      />
    </section>
  );
}
