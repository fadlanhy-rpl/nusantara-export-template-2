'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function TopMarquee() {
  const { locale } = useLanguage();

  const getItems = () => {
    switch (locale) {
      case 'ar':
        return [
          'مصدّر إندونيسي رسمي معتمد (KAN ACCREDITED)',
          'NIB: 9120301928371',
          'شهادة عدم خطورة IMO NON-DG SP925 (UN 3313 SHTC PASSED)',
          'ميناء الشحن: تانجونغ بيراك سورابايا (SUB) & تانجونغ بريوك جاكرتا',
          'الرمز الجمركي HS: 4402.90.10',
          'فحص واختبار مختبر SGS الدولي #SH-2026',
          'شروط التسليم: EXW / FOB / CFR / CIF',
          'الطاقة الإنتاجية الشهرية: 350+ طن متري',
        ];
      case 'zh':
        return [
          '印尼官方认证合规出口商 (KAN 认可)',
          'NIB: 9120301928371',
          '国际海事 IMO NON-DG SP925 豁免认证 (UN 3313 测试通过)',
          '装运始发港: 泗水丹戎佩拉 (SUB) & 雅加达丹戎不碌 (JKT)',
          '海关商品编码 HS CODE: 4402.90.10',
          '瑞士 SGS 官方实验室质检报告 #SH-2026',
          '国际贸易术语: EXW / FOB / CFR / CIF',
          '月均综合产能: 350+ 公吨',
        ];
      case 'id':
        return [
          'EKSPORTIR RESMI TERVERIFIKASI RI (AKREDITASI KAN)',
          'NIB: 9120301928371',
          'IMO NON-DG SPECIAL PROVISION 925 (UN 3313 PASSED)',
          'PELABUHAN MUAT: TANJUNG PERAK (SUB) & TANJUNG PRIOK (JKT)',
          'HS CODE: 4402.90.10',
          'SGS LAB CERTIFIED #SH-2026',
          'INCOTERMS: EXW / FOB / CFR / CIF',
          'OUTPUT KILN: 350+ METRIK TON / BULAN',
        ];
      case 'en':
      default:
        return [
          'VERIFIED INDONESIAN EXPORTER (KAN ACCREDITED)',
          'NIB: 9120301928371',
          'IMO NON-DG SPECIAL PROVISION 925 (UN 3313 PASSED)',
          'PORT OF LOADING: TANJUNG PERAK (SUB) & TANJUNG PRIOK (JKT)',
          'HS CODE: 4402.90.10',
          'SGS LAB CERTIFIED #SH-2026',
          'INCOTERMS: EXW / FOB / CFR / CIF',
          'MONTHLY CAPACITY: 350+ METRIC TONS',
        ];
    }
  };

  const items = getItems();

  return (
    <div className="w-full bg-surface-container-lowest border-b border-outline-variant/30 text-[11px] font-mono tracking-wider overflow-hidden py-2 text-on-surface-variant flex items-center select-none">
      <div className="flex shrink-0 items-center gap-6 animate-marquee whitespace-nowrap">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span className="text-on-surface-variant/90">{item}</span>
            <span className="text-outline-variant/60">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
