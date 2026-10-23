'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Anchor, MapPin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FOOTER_I18N = {
  en: {
    brandDesc: 'Licensed exporter of 100% pure coconut shell charcoal briquettes, specialty green coffee, and Indonesian spices. Strictly compliant with IMO Non-DG Special Provision 925 and certified by SGS laboratory audits.',
    nibKan: 'NIB: 9120301928371 • KAN ACCREDITED',
    col2Title: 'Factory & Export Hub',
    col2Loc: 'Gresik Industrial Estate, East Java (25 KM to Port of Tanjung Perak IDSUB)',
    col2Port: 'Export Gateway: Tanjung Perak (Surabaya) & Tanjung Priok (Jakarta)',
    col3Title: 'Standards & Documents',
    navBriquette: 'Platinum Coconut Charcoal (HS 4402.90)',
    navOem: '2.5D OEM Box Dieline Studio',
    navPlanner: 'Container Cargo & Freight Calculator',
    navFactory: '5-Stage Manufacturing Pipeline & COA',
    navDealDesk: 'Internal Deal Desk (Admin)',
    col4Title: 'Direct Export Desk',
    hoursTitle: 'FACTORY OPERATING HOURS:',
    hoursDesc: 'Monday – Saturday (24 Hours Continuous Kiln)',
    copyright: '© {year} PT Nusantara Origin Industri. All rights reserved.',
    standards: 'IMO NON-DG SP925 COMPLIANT • AFAS FUMIGATION STANDARD',
  },
  id: {
    brandDesc: 'Eksportir berlisensi komoditas briket arang batok kelapa 100%, kopi specialty, dan rempah nusantara. Menjamin kepatuhan standar maritim IMO Non-DG Special Provision 925 dan audit laboratorium SGS.',
    nibKan: 'NIB: 9120301928371 • KAN ACCREDITED',
    col2Title: 'Pabrik & Terminal Muat',
    col2Loc: 'Kawasan Industri Gresik, Jawa Timur (25 KM dari Terminal Tanjung Perak SUB)',
    col2Port: 'Gateway Ekspor: Tanjung Perak (Surabaya) & Tanjung Priok (Jakarta)',
    col3Title: 'Standar & Dokumen',
    navBriquette: 'Briket Batok Kelapa Platinum (HS 4402.90)',
    navOem: '2.5D OEM Box Dieline Studio',
    navPlanner: 'Container Cargo & Freight Calculator',
    navFactory: 'Metodologi Manufaktur 5 Tahap & COA',
    navDealDesk: 'Internal Deal Desk (Admin)',
    col4Title: 'Direct Export Desk',
    hoursTitle: 'JAM OPERASIONAL PABRIK:',
    hoursDesc: 'Senin – Sabtu (24 Jam Continuous Kiln)',
    copyright: '© {year} PT Nusantara Origin Industri. Seluruh hak cipta dilindungi undang-undang.',
    standards: 'IMO NON-DG SP925 COMPLIANT • AFAS FUMIGATION STANDARD',
  },
  ar: {
    brandDesc: 'مصدّر مرخّص لفحم جوز الهند النقي 100%، والبن الأخضر المختص، والتوابل الإندونيسية. التزام صارم بمعايير الملاحة الدولية IMO Non-DG SP925 وفحوصات مختبرات SGS.',
    nibKan: 'ترخيص NIB: 9120301928371 • اعتماد KAN الوطني',
    col2Title: 'المصنع وميناء الشحن',
    col2Loc: 'المنطقة الصناعية في غريسيك، جاوة الشرقية (25 كم من ميناء تانجونغ بيراك SUB)',
    col2Port: 'بوابات التصدير: تانجونغ بيراك (سورابايا) وتانجونغ بريوك (جاكرتا)',
    col3Title: 'المعايير والوثائق',
    navBriquette: 'فحم جوز الهند البلاتيني (HS 4402.90)',
    navOem: 'استوديو تصميم كراتين OEM 2.5D',
    navPlanner: 'حاسبة حمولة الحاويات وأسعار الشحن',
    navFactory: 'مراحل التصنيع الخمس وشهادات التحليل COA',
    navDealDesk: 'مكتب الصفقات الداخلي (لوحة التحكم)',
    col4Title: 'مكتب الصادرات المباشر',
    hoursTitle: 'ساعات عمل المصنع:',
    hoursDesc: 'الإثنين – السبت (أفران تعمل على مدار 24 ساعة)',
    copyright: '© {year} PT Nusantara Origin Industri. جميع الحقوق محفوظة.',
    standards: 'مطابق لبنود IMO NON-DG SP925 • معايير التبخير الدولية AFAS',
  },
  zh: {
    brandDesc: '印尼国家特许出口商，专营 100% 纯椰壳炭块、精品生咖啡豆及天然香料。全面通过国际海事 IMO Non-DG 特殊条款 925 认证与 SGS 独立实验室批次检测。',
    nibKan: '进出口资质 NIB: 9120301928371 • 印尼国家 KAN 认证',
    col2Title: '生产基地与装运码头',
    col2Loc: '东爪哇省锦石工业园 (距泗水丹戎佩拉国际码头仅 25 公里)',
    col2Port: '核心出口港: 泗水丹戎佩拉港 (SUB) 与雅加达丹戎不碌港 (JKT)',
    col3Title: '标准规程与技术文档',
    navBriquette: '白金级水烟椰壳炭块 (HS 4402.90)',
    navOem: '2.5D OEM 包装刀模工作室',
    navPlanner: '集装箱配载与海运价格计算器',
    navFactory: '五步精炼制造工艺与官方 COA',
    navDealDesk: '内部订单大厅 (Admin)',
    col4Title: '出口外贸直连台',
    hoursTitle: '工厂连续运转时间:',
    hoursDesc: '周一至周六 (工业回转干燥窑 24 小时连续作业)',
    copyright: '© {year} PT Nusantara Origin Industri. 版权所有，保留一切权利。',
    standards: '符合 IMO NON-DG SP925 海事标准 • AFAS 国际熏蒸检疫标准',
  },
};

export default function Footer() {
  const { locale } = useLanguage();
  const t = FOOTER_I18N[locale] || FOOTER_I18N.en;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#120D0A] border-t border-outline-variant/30 text-on-surface-variant pt-16 pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Credentials */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="font-headline font-extrabold text-[18px] text-on-surface uppercase tracking-tight">
                Nusantara<span className="text-primary">Origin</span>
              </span>
            </div>
            <p className="font-body text-[13px] text-outline leading-relaxed">
              {t.brandDesc}
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-tertiary">
              <ShieldCheck className="w-4 h-4 text-tertiary" />
              <span>{t.nibKan}</span>
            </div>
          </div>

          {/* Col 2: Hub & Fasilitas Pabrik */}
          <div className="flex flex-col gap-3 font-body text-[13px]">
            <span className="font-headline font-bold text-[14px] text-on-surface uppercase tracking-wider">
              {t.col2Title}
            </span>
            <div className="flex items-start gap-2 text-outline">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{t.col2Loc}</span>
            </div>
            <div className="flex items-start gap-2 text-outline">
              <Anchor className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>{t.col2Port}</span>
            </div>
            <span className="font-mono text-[11px] text-outline/80 mt-1">
              GEO-COORDINATES: 7°09&apos;42.1&quot;S 112°38&apos;15.4&quot;E
            </span>
          </div>

          {/* Col 3: Navigasi Cepat & Standar */}
          <div className="flex flex-col gap-2 font-body text-[13px]">
            <span className="font-headline font-bold text-[14px] text-on-surface uppercase tracking-wider mb-1">
              {t.col3Title}
            </span>
            <Link href="/products/100-briket-arang-batok-kelapa" className="hover:text-primary transition-colors">
              {t.navBriquette}
            </Link>
            <Link href="/oem-studio" className="hover:text-primary transition-colors">
              {t.navOem}
            </Link>
            <Link href="/container-planner" className="hover:text-primary transition-colors">
              {t.navPlanner}
            </Link>
            <Link href="/factory-audit" className="hover:text-primary transition-colors">
              {t.navFactory}
            </Link>
            <Link href="/admin/rfq" className="hover:text-primary transition-colors font-mono text-[11px] text-outline">
              {t.navDealDesk}
            </Link>
          </div>

          {/* Col 4: Kontak Direct Trade Desk */}
          <div className="flex flex-col gap-3 font-body text-[13px]">
            <span className="font-headline font-bold text-[14px] text-on-surface uppercase tracking-wider">
              {t.col4Title}
            </span>
            <div className="flex items-center gap-2 text-outline">
              <Mail className="w-4 h-4 text-primary" />
              <span>trade@nusantaraorigin.com</span>
            </div>
            <div className="flex items-center gap-2 text-outline">
              <Phone className="w-4 h-4 text-primary" />
              <span>+62 811-3000-0000 (WhatsApp Live)</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/30 text-[11px] font-mono mt-1">
              <div className="text-on-surface font-semibold">{t.hoursTitle}</div>
              <div className="text-outline">{t.hoursDesc}</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-outline-variant/20 pt-6 flex flex-col sm:flex-row items-center justify-between text-[12px] font-mono text-outline gap-4">
          <div>
            {t.copyright.replace('{year}', currentYear.toString())}
          </div>
          <div className="flex items-center gap-4">
            <span>{t.standards}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
