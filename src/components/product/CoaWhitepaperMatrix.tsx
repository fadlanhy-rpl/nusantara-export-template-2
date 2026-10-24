'use client';

import React, { useState } from 'react';
import { FileText, Download, Truck, CheckCircle2, ShieldCheck, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const COA_I18N = {
  en: {
    kicker: 'EXPORTER QUALITY TRANSPARENCY',
    title: 'ASTM / ISO Laboratory Quality Certification & Global Export Standards',
    desc: 'Every container shipment batch is independently tested by PT SGS Indonesia and Sucofindo. Official Certificate of Analysis (COA) and IMO Non-DG SP925 maritime clearance test sheets are attached to the Bill of Lading (BL).',
    headerSummary: 'CERTIFICATE OF ANALYSIS (COA) SUMMARY — BATCH #SH-2026-COA',
    accreditation: 'ACCREDITATION: KAN LP-024-IDN',
    surveyor: 'SURVEYOR: PT SGS INDONESIA',
    colParam: 'Quality Test Parameter',
    colLimit: 'Export Guarantee Limit',
    colBatch: 'SGS Batch Result #SH-2026',
    colMethod: 'Testing Method',
    colStatus: 'Export Status',
    inspectorSig: 'INSPECTOR SIGNATURE: PT SGS INDONESIA LOGISTICS DIVISION',
    digitalStamp: 'OFFICIAL VERIFICATION STAMP: EMBEDDED DIGITAL COA #99281-2026',
    btnDownload: 'Download Official COA & TDS (.PDF)',
    btnSample: 'Request 2 Kg Physical Sample via DHL',
    sampleNote: 'Free 2kg sample shipped via DHL Express. Courier cost credited 100% against your first container order.',
    modalTitle: 'Request 2 Kg Physical Sample (DHL Express)',
    modalDesc: 'Please enter shipping destination for your lounge, restaurant, or trade office. Shipped within 48 hours complete with SGS lab test reports.',
    lblPic: 'PIC / Buyer Full Name',
    lblCompany: 'Company & City',
    lblShape: 'Briquette Shape',
    lblEmail: 'Business Email',
    lblPhone: 'WhatsApp Number',
    btnSubmit: 'Submit Sample Request via Trade Desk',
    successTitle: 'Sample Request Successfully Received!',
    successDesc: 'Our export logistics team will promptly contact your WhatsApp with the DHL Air Waybill (AWB) tracking number and 3–5 day delivery ETA.',
    btnClose: 'Close',
    rows: [
      {
        param: 'Total Moisture Content',
        limit: 'Maximum 4.5%',
        batch: '4.10%',
        method: 'ASTM D3173',
        status: 'PASS - EXCELLENT',
      },
      {
        param: 'Ash Content',
        limit: 'Maximum 2.2%',
        batch: '2.05% (Snow White Ash)',
        method: 'ASTM D3174',
        status: 'PREMIUM GRADE',
      },
      {
        param: 'Volatile Matter',
        limit: '12.0% – 14.0%',
        batch: '13.20%',
        method: 'ASTM D3175',
        status: 'OPTIMAL HEAT',
      },
      {
        param: 'Fixed Carbon',
        limit: 'Minimum 80.0%',
        batch: '81.50%',
        method: 'By Difference (ASTM D3172)',
        status: 'HIGH PURITY',
      },
      {
        param: 'Gross Calorific Value',
        limit: 'Minimum 7,500 kcal/kg',
        batch: '7,580 kcal/kg',
        method: 'ISO 1928 Oxygen Bomb',
        status: 'MAX THERMAL OUTPUT',
      },
      {
        param: 'Drop Impact Test (1.5m Concrete × 3x)',
        limit: 'Min 98% Intact',
        batch: '99.2% Intact (Zero Cracks)',
        method: 'Factory SOP Hydraulic Test',
        status: 'IMPACT RESISTANT',
      },
      {
        param: 'Self-Heating Substances (SHTC UN 3313)',
        limit: 'Non-DG Special Provision 925 (< 200°C)',
        batch: 'Passed (Stable Temp < 140°C)',
        method: 'UN Tests Part III 33.3.1.3.3',
        status: 'MARITIME APPROVED',
      },
      {
        param: 'Total Sulfur Content',
        limit: 'Maximum 0.05%',
        batch: '0.02%',
        method: 'ASTM D4239',
        status: 'ZERO ODOR',
      },
    ],
  },
  id: {
    kicker: 'TRANSPARANSI KUALITAS EKSPORTIR',
    title: 'Sertifikasi Mutu Laboratorium ASTM / ISO & Standar Ekspor Global',
    desc: 'Setiap batch pengapalan kontainer diuji secara independen oleh PT SGS Indonesia dan Sucofindo. Sertifikat resmi Certificate of Analysis (COA) dan lembar lolos uji maritim IMO Non-DG SP925 terlampir pada Bill of Lading (BL).',
    headerSummary: 'CERTIFICATE OF ANALYSIS (COA) SUMMARY — BATCH #SH-2026-COA',
    accreditation: 'AKREDITASI: KAN LP-024-IDN',
    surveyor: 'SURVEYOR: PT SGS INDONESIA',
    colParam: 'Parameter Uji Mutu',
    colLimit: 'Batas Garansi Ekspor',
    colBatch: 'Hasil Batch SGS #SH-2026',
    colMethod: 'Metode Pengujian',
    colStatus: 'Status Ekspor',
    inspectorSig: 'TANDA TANGAN INSPEKTUR: PT SGS INDONESIA LOGISTICS DIVISION',
    digitalStamp: 'STEMPEL VERIFIKASI RESMI: EMBEDDED DIGITAL COA #99281-2026',
    btnDownload: 'Unduh COA & TDS Resmi (.PDF)',
    btnSample: 'Minta Sampel Fisik 2 Kg via DHL',
    sampleNote: 'Sampel 2kg gratis dikirim via DHL Express. Biaya kurir dikreditkan 100% pada order kontainer pertama Anda.',
    modalTitle: 'Permintaan Sampel Fisik 2 Kg (DHL Express)',
    modalDesc: 'Silakan isi alamat penerimaan sampel lounge, restoran, atau kantor perdagangan Anda. Sampel dikirim dalam 2x24 jam lengkap dengan sertifikat uji SGS.',
    lblPic: 'Nama PIC / Buyer',
    lblCompany: 'Perusahaan & Kota',
    lblShape: 'Bentuk Briket',
    lblEmail: 'Email Bisnis',
    lblPhone: 'Nomor WhatsApp',
    btnSubmit: 'Kirim Permintaan Sampel via Trade Desk',
    successTitle: 'Permintaan Sampel Berhasil Diterima!',
    successDesc: 'Tim logistik ekspor kami akan segera menghubungi WhatsApp Anda dengan nomor Air Waybill (AWB) DHL dan estimasi tiba 3–5 hari kerja.',
    btnClose: 'Tutup',
    rows: [
      {
        param: 'Kadar Air (Total Moisture Content)',
        limit: 'Maksimal 4.5%',
        batch: '4.10%',
        method: 'ASTM D3173',
        status: 'PASS - EXCELLENT',
      },
      {
        param: 'Kadar Abu (Ash Content)',
        limit: 'Maksimal 2.2%',
        batch: '2.05% (Abu Putih Bersih)',
        method: 'ASTM D3174',
        status: 'PREMIUM GRADE',
      },
      {
        param: 'Zat Terbang (Volatile Matter)',
        limit: '12.0% – 14.0%',
        batch: '13.20%',
        method: 'ASTM D3175',
        status: 'OPTIMAL HEAT',
      },
      {
        param: 'Karbon Terikat (Fixed Carbon)',
        limit: 'Minimal 80.0%',
        batch: '81.50%',
        method: 'By Difference (ASTM D3172)',
        status: 'HIGH PURITY',
      },
      {
        param: 'Nilai Kalori Bruto (Gross Calorific Value)',
        limit: 'Minimal 7,500 kcal/kg',
        batch: '7,580 kcal/kg',
        method: 'ISO 1928 Oxygen Bomb',
        status: 'MAX THERMAL OUTPUT',
      },
      {
        param: 'Uji Jatuh Bebas Beton (Drop Test 1.5m × 3x)',
        limit: 'Min 98% Utuh',
        batch: '99.2% Utuh Tanpa Retak',
        method: 'Factory SOP Hydraulic Test',
        status: 'IMPACT RESISTANT',
      },
      {
        param: 'Uji Pemanasan Mandiri (SHTC UN 3313)',
        limit: 'Non-DG Special Provision 925 (< 200°C)',
        batch: 'Passed (Suhu Stabil < 140°C)',
        method: 'UN Tests Part III 33.3.1.3.3',
        status: 'MARITIME APPROVED',
      },
      {
        param: 'Kandungan Total Belerang (Total Sulfur)',
        limit: 'Maksimal 0.05%',
        batch: '0.02%',
        method: 'ASTM D4239',
        status: 'ZERO ODOR',
      },
    ],
  },
  ar: {
    kicker: 'شفافية جودة المصدرين',
    title: 'شهادات جودة مختبرات ASTM / ISO ومعايير التصدير العالمية',
    desc: 'يتم فحص كل دفعة شحن حاويات بشكل مستقل بواسطة PT SGS Indonesia وSucofindo. شهادة التحليل الرسمية (COA) وورقة اجتياز الفحص البحري IMO Non-DG SP925 مرفقة مع بوليصة الشحن (BL).',
    headerSummary: 'ملخص شهادة التحليل المعتمدة (COA) — دفعة #SH-2026-COA',
    accreditation: 'الاعتماد: KAN LP-024-IDN',
    surveyor: 'المعاينة: PT SGS INDONESIA',
    colParam: 'معيار فحص الجودة',
    colLimit: 'حد ضمان التصدير',
    colBatch: 'نتيجة دفعة SGS #SH-2026',
    colMethod: 'طريقة الاختبار',
    colStatus: 'حالة التصدير',
    inspectorSig: 'توقيع المفتش: PT SGS INDONESIA LOGISTICS DIVISION',
    digitalStamp: 'ختم التحقق الرقمي المعتمد: COA #99281-2026',
    btnDownload: 'تحميل COA وورقة البيانات TDS الرسمية (.PDF)',
    btnSample: 'طلب عينة فعلية 2 كغ عبر DHL',
    sampleNote: 'عينة مجانية 2 كغ ترسل عبر DHL Express. تخصم تكلفة الشحن 100% من أول طلب حاوية.',
    modalTitle: 'طلب عينة فعلية 2 كغ (DHL Express)',
    modalDesc: 'يرجى إدخال عنوان استلام العينة للمقهى أو المطعم أو مكتب التجارة. ترسل العينة خلال 48 ساعة مرفقة بتقارير SGS.',
    lblPic: 'اسم المسؤول / المشتري',
    lblCompany: 'الشركة والمدينة',
    lblShape: 'شكل الفحم',
    lblEmail: 'البريد الإلكتروني للعمل',
    lblPhone: 'رقم الواتساب',
    btnSubmit: 'إرسال طلب العينة عبر مكتب التجارة',
    successTitle: 'تم استلام طلب العينة بنجاح!',
    successDesc: 'سيتواصل فريق اللوجستيات مع واتساب الخاص بك برقم التتبع DHL AWB خلال 24-48 ساعة، وموعد وصول 3-5 أيام عمل.',
    btnClose: 'إغلاق',
    rows: [
      {
        param: 'نسبة الرطوبة الكلية (Moisture)',
        limit: 'أقصى حد 4.5%',
        batch: '4.10%',
        method: 'ASTM D3173',
        status: 'ممتاز - معتمد',
      },
      {
        param: 'نسبة الرماد (Ash Content)',
        limit: 'أقصى حد 2.2%',
        batch: '2.05% (رماد أبيض طبيعي)',
        method: 'ASTM D3174',
        status: 'درجة بلاتينية',
      },
      {
        param: 'المواد المتطايرة (Volatile Matter)',
        limit: '12.0% – 14.0%',
        batch: '13.20%',
        method: 'ASTM D3175',
        status: 'حرارة مثالية',
      },
      {
        param: 'الكربون الثابت (Fixed Carbon)',
        limit: 'حد أدنى 80.0%',
        batch: '81.50%',
        method: 'By Difference (ASTM D3172)',
        status: 'نقاء فائق',
      },
      {
        param: 'القيمة الحرارية الإجمالية (Calorific Value)',
        limit: 'حد أدنى 7,500 سعرة/كغ',
        batch: '7,580 سعرة/كغ',
        method: 'ISO 1928 قنبلة أكسجين',
        status: 'أعلى طاقة حرارية',
      },
      {
        param: 'اختبار السقوط الخرساني (1.5م × 3 مرات)',
        limit: 'أدنى حد 98% سليم',
        batch: '99.2% سليم بدون تشقق',
        method: 'اختبار هيدروليكي للمصنع',
        status: 'مقاوم للصدمات',
      },
      {
        param: 'اختبار الاشتعال الذاتي (SHTC UN 3313)',
        limit: 'بنود خاصة غير خطرة IMO SP 925 (< 200°C)',
        batch: 'اجتياز (حرارة مستقرة < 140°C)',
        method: 'UN Tests Part III 33.3.1.3.3',
        status: 'معتمد بحرياً',
      },
      {
        param: 'إجمالي محتوى الكبريت (Total Sulfur)',
        limit: 'أقصى حد 0.05%',
        batch: '0.02%',
        method: 'ASTM D4239',
        status: 'خالي من الرائحة',
      },
    ],
  },
  zh: {
    kicker: '出口商品质透明度',
    title: 'ASTM / ISO 实验室质量认证与全球出口标准',
    desc: '每个集装箱批次均由 PT SGS Indonesia 和 Sucofindo 独立检测。官方质检分析证书 (COA) 和国际海事 IMO Non-DG SP925 检验单附于海运提单 (BL)。',
    headerSummary: '质检分析证书 (COA) 摘要 — 批次 #SH-2026-COA',
    accreditation: '官方资质认可: KAN LP-024-IDN',
    surveyor: '检测机构: PT SGS INDONESIA',
    colParam: '质量检测参数',
    colLimit: '出口保证限值',
    colBatch: 'SGS批次实测结果 #SH-2026',
    colMethod: '检测标准方法',
    colStatus: '出口状态',
    inspectorSig: '检测检验师签字: PT SGS INDONESIA LOGISTICS DIVISION',
    digitalStamp: '官方数字验证印章: EMBEDDED DIGITAL COA #99281-2026',
    btnDownload: '下载官方 COA 与技术数据表 TDS (.PDF)',
    btnSample: '申请 2 Kg DHL 快递实物样品',
    sampleNote: '2kg免费实物样品通过 DHL Express 寄送。快递运费可在您首个集装箱订单中100%全额抵扣。',
    modalTitle: '申请 2 Kg 实物样品 (DHL Express)',
    modalDesc: '请填写您的水烟馆、餐厅或贸易公司收件地址。样品将在48小时内寄出，附带SGS官方实验室检测证书。',
    lblPic: '联系人 / 采购代表姓名',
    lblCompany: '公司名称与所在城市',
    lblShape: '炭块规格形状',
    lblEmail: '企业工作邮箱',
    lblPhone: 'WhatsApp / 手机号',
    btnSubmit: '提交样品申请至出口外贸部',
    successTitle: '样品申请已成功受理！',
    successDesc: '我们的外贸物流团队将立即通过 WhatsApp 发送 DHL 运单号 (AWB)，预计 3–5 个工作日内送达。',
    btnClose: '关闭',
    rows: [
      {
        param: '全水分含量 (Total Moisture Content)',
        limit: '最高 4.5%',
        batch: '4.10%',
        method: 'ASTM D3173',
        status: '达标 - 优级',
      },
      {
        param: '灰分含量 (Ash Content)',
        limit: '最高 2.2%',
        batch: '2.05% (雪白自然灰)',
        method: 'ASTM D3174',
        status: '顶级品质',
      },
      {
        param: '挥发分 (Volatile Matter)',
        limit: '12.0% – 14.0%',
        batch: '13.20%',
        method: 'ASTM D3175',
        status: '最佳热效',
      },
      {
        param: '固定碳 (Fixed Carbon)',
        limit: '最低 80.0%',
        batch: '81.50%',
        method: 'By Difference (ASTM D3172)',
        status: '超高纯度',
      },
      {
        param: '高位发热量 (Gross Calorific Value)',
        limit: '最低 7,500 kcal/kg',
        batch: '7,580 kcal/kg',
        method: 'ISO 1928 氧弹测热法',
        status: '最大热释放',
      },
      {
        param: '混凝土自由跌落试验 (1.5米 × 3次)',
        limit: '至少 98% 完好',
        batch: '99.2% 完好无碎裂',
        method: '工厂SOP液压成型检验',
        status: '抗摔防破损',
      },
      {
        param: '自热物质试验 (SHTC UN 3313)',
        limit: '非危险品特别条款 925 (< 200°C)',
        batch: '顺利通过 (温度稳定 < 140°C)',
        method: 'UN Tests Part III 33.3.1.3.3',
        status: '海运豁免合规',
      },
      {
        param: '总硫含量 (Total Sulfur)',
        limit: '最高 0.05%',
        batch: '0.02%',
        method: 'ASTM D4239',
        status: '无异味产生',
      },
    ],
  },
};

export default function CoaWhitepaperMatrix() {
  const { locale } = useLanguage();
  const t = COA_I18N[locale] || COA_I18N.en;

  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [sampleSubmitted, setSampleSubmitted] = useState(false);

  return (
    <section id="lab-specs" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
          {t.kicker}
        </span>
        <h2 className="font-headline text-[22px] sm:text-[28px] font-bold text-on-surface">
          {t.title}
        </h2>
        <p className="font-body text-[14px] text-outline max-w-3xl">
          {t.desc}
        </p>
      </div>

      {/* Physical Whitepaper Substrate (#F5F1EA) */}
      <div className="w-full bg-[#F5F1EA] text-[#16110E] rounded-xl overflow-hidden shadow-2xl border border-[#B9AFA4]">
        {/* Paper Header */}
        <div className="bg-[#EAE4D9] px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#B9AFA4]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#832700]" />
            <span className="font-headline text-[13px] font-bold tracking-tight text-[#16110E] uppercase">
              {t.headerSummary}
            </span>
          </div>
          <div className="font-mono text-[11px] text-[#59413A] flex items-center gap-3">
            <span>{t.accreditation}</span>
            <span>•</span>
            <span>{t.surveyor}</span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto w-full no-scrollbar">
          <table className="w-full text-left font-body text-[13px] text-[#16110E]">
            <thead>
              <tr className="bg-[#DFD7C9] font-headline text-[11px] text-[#3A3330] uppercase tracking-wider border-b border-[#B9AFA4]">
                <th className="py-3.5 px-6 font-bold">{t.colParam}</th>
                <th className="py-3.5 px-4 font-bold">{t.colLimit}</th>
                <th className="py-3.5 px-4 font-bold">{t.colBatch}</th>
                <th className="py-3.5 px-4 font-bold">{t.colMethod}</th>
                <th className="py-3.5 px-6 font-bold text-right">{t.colStatus}</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[12px] divide-y divide-[#B9AFA4]/40">
              {t.rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-[#EBE5DA] transition-colors ${
                    idx % 2 === 1 ? 'bg-[#F0ECE4]' : 'bg-[#F5F1EA]'
                  }`}
                >
                  <td className="py-3.5 px-6 font-semibold text-[#16110E] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2F6B4F]"></span>
                    <span>{row.param}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#59413A]">{row.limit}</td>
                  <td className="py-3.5 px-4 font-bold text-[#832700]">{row.batch}</td>
                  <td className="py-3.5 px-4 text-[#59413A]">{row.method}</td>
                  <td className="py-3.5 px-6 text-right">
                    <span className="inline-flex px-2 py-0.5 rounded bg-[#2F6B4F]/15 text-[#105137] text-[10px] font-bold tracking-wide">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paper Footer Stamps */}
        <div className="px-6 py-3 bg-[#EAE4D9] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#59413A] border-t border-[#B9AFA4]">
          <span>{t.inspectorSig}</span>
          <span>{t.digitalStamp}</span>
        </div>
      </div>

      {/* Action Strip: Download TDS + Request Physical Sample DHL */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-low p-5 rounded-xl border border-outline-variant/30">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <a
            href="/database/seed.sql"
            download="TDS-NusantaraOrigin-Charcoal-2026.pdf"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/40 text-on-surface hover:text-primary transition-all font-headline text-[13px] font-semibold shadow-sm"
          >
            <Download className="w-4 h-4 text-primary shrink-0" />
            <span>{t.btnDownload}</span>
          </a>

          <button
            onClick={() => setSampleModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container hover:bg-[#D94E13] transition-all font-headline text-[13px] font-semibold shadow-[0_0_16px_rgba(255,138,82,0.35)]"
          >
            <Truck className="w-4 h-4 text-on-primary-container shrink-0" />
            <span>{t.btnSample}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 font-body text-[12px] text-outline text-left">
          <ShieldCheck className="w-5 h-5 text-tertiary shrink-0" />
          <span>{t.sampleNote}</span>
        </div>
      </div>

      {/* Modal Request Sample DHL */}
      {sampleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface-container-low border border-outline-variant/40 rounded-xl max-w-lg w-full p-6 relative shadow-2xl">
            <button
              onClick={() => {
                setSampleModalOpen(false);
                setSampleSubmitted(false);
              }}
              className="absolute top-4 right-4 text-outline hover:text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>

            {!sampleSubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSampleSubmitted(true);
                }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-bold text-[18px] text-on-surface">
                    {t.modalTitle}
                  </h3>
                </div>
                <p className="font-body text-[13px] text-outline">
                  {t.modalDesc}
                </p>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] text-outline uppercase font-semibold">{t.lblPic}</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Tariq Al-Mansoor"
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-outline uppercase font-semibold">{t.lblCompany}</label>
                    <input
                      required
                      type="text"
                      placeholder="Al-Noor Trading, Dubai"
                      className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-outline uppercase font-semibold">{t.lblShape}</label>
                    <select className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container">
                      <option>Cube C25 (25mm)</option>
                      <option>Cube C26 (26mm)</option>
                      <option>Hexagonal BBQ (20x50mm)</option>
                      <option>Finger Stick (20x50mm)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-outline uppercase font-semibold">{t.lblEmail}</label>
                    <input
                      required
                      type="email"
                      placeholder="procurement@buyer.ae"
                      className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-outline uppercase font-semibold">{t.lblPhone}</label>
                    <input
                      required
                      type="tel"
                      placeholder="+971 50 123 4567"
                      className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface text-[13px] focus:outline-none focus:border-primary-container"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-primary-container text-on-primary-container font-headline text-[13px] sm:text-[14px] font-semibold hover:bg-[#D94E13] transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <span>{t.btnSubmit}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 shrink-0" />
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center gap-3 py-6">
                <CheckCircle2 className="w-12 h-12 text-tertiary" />
                <h4 className="font-headline font-bold text-[18px] text-on-surface">
                  {t.successTitle}
                </h4>
                <p className="font-body text-[13px] text-outline max-w-sm">
                  {t.successDesc}
                </p>
                <button
                  onClick={() => setSampleModalOpen(false)}
                  className="mt-3 px-6 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-headline text-[13px] font-semibold transition-colors"
                >
                  {t.btnClose}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
