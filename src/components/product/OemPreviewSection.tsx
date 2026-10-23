'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Palette, ArrowRight, Stamp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const OEM_I18N = {
  en: {
    card1Title: 'OEM Custom Inner Box (1kg & 2kg)',
    card1Desc: 'Print your own branded inner box with Matte Doff, Glossy UV, Hot Stamping Gold Foil, and hermetic vacuum barrier plastic.',
    card1Badge: 'ESMA & GCC 2530 COMPLIANT',
    card1Cta: 'Open Studio',
    card2Title: 'Master Carton 10kg & 20kg (5-Ply Kraft)',
    card2Desc: 'Heavy-duty 5-Ply corrugated master box withstands up to 10 ocean container stacking tiers without corner deformation. Colors: Natural Kraft, Matte Black, or Bright White.',
    card2Badge: 'BURST TEST: > 18 KGF/CM²',
    card2Cta: 'CAD Simulation',
    card3Title: 'Routine Monthly Supply Contract (FCL Routine)',
    card3Desc: 'Lock guaranteed monthly allocation up to 20–30 containers with fixed-price stability, independent third-party surveyor inspection rights, and prioritized berth loading.',
    card3Cta: 'Contact Trade Desk (WhatsApp)',
    waText: 'Hello NusantaraOrigin, we would like to discuss a monthly FCL routine supply contract for coconut charcoal briquettes.',
  },
  id: {
    card1Title: 'OEM Custom Inner Box (1kg & 2kg)',
    card1Desc: 'Cetak inner box brand Anda sendiri dengan finishing Matte Doff, Glossy UV, Hot Stamping Gold Foil, dan plastik kedap udara (vacuum barrier).',
    card1Badge: 'STANDAR ESMA & GCC 2530',
    card1Cta: 'Buka Studio',
    card2Title: 'Master Carton 10kg & 20kg (5-Ply Kraft)',
    card2Desc: 'Kardus master 5-Ply tebal tahan tumpukan maritim hingga 10 tingkat tanpa deformasi sudut. Pilihan warna Kraft Natural, Matte Black, atau Bright White.',
    card2Badge: 'BURST TEST: > 18 KGF/CM²',
    card2Cta: 'Simulasi CAD',
    card3Title: 'Kontrak Pasokan Bulanan (FCL Routine)',
    card3Desc: 'Kunci kuota alokasi hingga 20–30 kontainer per bulan dengan proteksi harga stabil, hak inspeksi surveyor mandiri, dan prioritas muat di pelabuhan.',
    card3Cta: 'Hubungi Trade Desk (WhatsApp)',
    waText: 'Halo NusantaraOrigin, kami ingin berdiskusi tentang kontrak rutin FCL briket arang batok kelapa.',
  },
  ar: {
    card1Title: 'علب داخلية مخصصة OEM (1 كغ و 2 كغ)',
    card1Desc: 'طباعة علب داخلية بعلامتك التجارية مع تشطيبات غير لامعة (Matte)، أو لمعان UV، أو فويل ذهبي فاخر، مع كيس بلاستيكي مفرغ من الهواء مقاوم للرطوبة.',
    card1Badge: 'مطابق لمواصفات ESMA و GCC 2530',
    card1Cta: 'فتح استوديو التصميم',
    card2Title: 'كرتون شحن رئيسي 10 كغ و 20 كغ (5 طبقات كرافت)',
    card2Desc: 'كرتون شحن رئيسي 5 طبقات فائق المتانة يتحمل حتى 10 طبقات تكديس بحري دون أي تشوه في الزوايا. متوفر بلون كرافت طبيعي، أسود فاخر، أو أبيض ناصع.',
    card2Badge: 'مقاومة الانفجار: > 18 كغ/سم²',
    card2Cta: 'محاكاة CAD',
    card3Title: 'عقد توريد شهري منتظم (FCL Routine)',
    card3Desc: 'حجز حصة مضمونة حتى 20–30 حاوية شهرياً مع تثبيت استقرار الأسعار، وحق التفتيش المستقل للمعاينة، وأولوية الشحن في الميناء.',
    card3Cta: 'تواصل مع مكتب الصفقات (WhatsApp)',
    waText: 'مرحباً NusantaraOrigin، نود مناقشة عقد توريد شهري منتظم لحاويات فحم جوز الهند.',
  },
  zh: {
    card1Title: 'OEM 自有品牌内盒定制 (1kg 与 2kg)',
    card1Desc: '支持印刷客户自有商标内盒，提供哑光覆膜、UV上光、烫金工艺 (Gold Foil) 以及高密封防潮真空内膜袋包装。',
    card1Badge: '符合 ESMA 与海湾 GCC 2530 标准',
    card1Cta: '进入定制工作室',
    card2Title: '出口外箱 Master Carton 10kg 与 20kg (五层牛皮瓦楞纸)',
    card2Desc: '加厚五层高强瓦楞外箱，耐压抗摔，支持集装箱海上跨洋堆叠高达 10 层不变形。提供原色牛皮、哑黑及白卡涂布三种外观。',
    card2Badge: '耐破强度: > 18 KGF/CM²',
    card2Cta: 'CAD 包装模拟',
    card3Title: '每月长期集装箱供货合同 (FCL Routine)',
    card3Desc: '锁定每月 20–30 个集装箱的保供配额，享受长期锁定锁价机制、第三方验货行独立验货权以及港口优先订舱装船特权。',
    card3Cta: '联系外贸交易台 (WhatsApp)',
    waText: '您好 NusantaraOrigin，我们希望洽谈椰壳炭集装箱每月定期出口长期供货协议。',
  },
};

export default function OemPreviewSection() {
  const { locale } = useLanguage();
  const t = OEM_I18N[locale] || OEM_I18N.en;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 shadow-xl">
      {/* Col 1: Inner Box OEM */}
      <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <h4 className="font-headline font-bold text-[16px] text-on-surface">
            {t.card1Title}
          </h4>
          <p className="font-body text-[13px] text-outline leading-relaxed">
            {t.card1Desc}
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between font-mono text-[11px]">
          <span className="text-tertiary">{t.card1Badge}</span>
          <Link href="/oem-studio" className="text-primary hover:underline flex items-center gap-1.5 font-headline font-semibold text-[13px]">
            <span>{t.card1Cta}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 shrink-0" />
          </Link>
        </div>
      </div>

      {/* Col 2: Master Carton 10kg & 20kg */}
      <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <h4 className="font-headline font-bold text-[16px] text-on-surface">
            {t.card2Title}
          </h4>
          <p className="font-body text-[13px] text-outline leading-relaxed">
            {t.card2Desc}
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between font-mono text-[11px]">
          <span className="text-primary">{t.card2Badge}</span>
          <Link href="/oem-studio" className="text-primary hover:underline flex items-center gap-1.5 font-headline font-semibold text-[13px]">
            <span>{t.card2Cta}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 shrink-0" />
          </Link>
        </div>
      </div>

      {/* Col 3: Routine Supply Contract */}
      <div className="p-6 bg-gradient-to-br from-surface-container to-surface-container-high rounded-xl border border-primary-container/40 flex flex-col justify-between shadow-lg">
        <div className="flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0_0_12px_rgba(255,138,82,0.4)]">
            <Stamp className="w-5 h-5 text-on-primary-container" />
          </div>
          <h4 className="font-headline font-bold text-[16px] text-on-surface">
            {t.card3Title}
          </h4>
          <p className="font-body text-[13px] text-outline leading-relaxed">
            {t.card3Desc}
          </p>
        </div>
        <div className="mt-4 pt-3">
          <a
            href={`https://wa.me/628113000000?text=${encodeURIComponent(t.waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-2.5 px-4 rounded-xl bg-primary-container text-on-primary-container font-headline text-[13px] font-semibold hover:bg-[#D94E13] transition-colors block shadow-md"
          >
            {t.card3Cta}
          </a>
        </div>
      </div>
    </section>
  );
}
