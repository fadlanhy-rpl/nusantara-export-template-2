'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { CheckCircle2, AlertTriangle, MoveHorizontal, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ASH_I18N = {
  en: {
    kicker: 'CALORIFIC RESIDUE COMPARISON',
    title: 'Visual Proof: Combustion & White Ash Quality',
    subtitle: 'Direct visual comparison between our pure coconut shell charcoal and adulterated market briquettes. Pure white ash guarantees clean shisha flavor without sulfur or coal contamination.',
    sliderHint: 'Drag slider left / right',
    badgePure: '100% PURE COCONUT SHELL (ASH < 2.2%)',
    badgeDirty: 'MARKET ADULTERATION (COAL / WOOD ASH > 4%)',
    cardDirty: {
      title: 'Operational Risks of Adulterated Briquettes (Coal / Wood Sawdust)',
      bullets: [
        'High Dark Ash (> 4.0%): Heavy, dirty dark-brown ash rapidly accumulates on shisha bowls and chokes airflow.',
        'Pungent Chemical Odors: Releases acrid wood smoke or toxic coal sulfur that ruins premium tobacco molasses.',
        'Dangerous Sparks & Fissures: Prone to sudden sparks and cracks when puffed, posing burn risks to lounge carpets or guests.',
      ],
    },
    cardPure: {
      title: 'NusantaraOrigin Quality Guarantee (100% Mature Coconut Carbon)',
      bullets: [
        'Snow-White Ash (< 2.2%): Extremely fine, dense natural white ash that stays intact and does not sift through foil.',
        '100% Odorless & Smokeless: Anaerobic drum pyrolysis produces pure fixed carbon with zero eye irritation or sour smoke.',
        '1.5m Free Fall Intact: Drop test 3x on solid concrete floors passed with zero cracks; stable 2.5-hour burn time.',
      ],
    },
  },
  id: {
    kicker: 'KOMPARASI RESIDU KALORIFIK',
    title: 'Pembuktian Visual Kualitas Abu & Pembakaran',
    subtitle: 'Bandingkan langsung residu pembakaran briket batok murni kami dengan arang oplosan pasaran. Abu putih bersih menjamin cita rasa shisha murni tanpa kontaminasi sulfur atau batu bara.',
    sliderHint: 'Tarik slider ke kiri / kanan',
    badgePure: '100% BATOK KELAPA MURNI (ABU < 2.2%)',
    badgeDirty: 'ARANG OPLOSAN PASARAN (BATU BARA / KAYU > 4%)',
    cardDirty: {
      title: 'Risiko Arang Oplosan (Batu Bara / Serbuk Kayu)',
      bullets: [
        'Kadar Abu Tinggi (> 4.0%): Residu abu berwarna cokelat tua kotor dan berat, cepat menumpuk di atas tungku shisha.',
        'Aroma Menyengat: Mengandung jelaga kayu atau sulfur batu bara yang merusak cita rasa tembakau premium.',
        'Percikan Api (Sparks): Rawan meletup dan retak saat ditiup, berisiko merusak karpet lounge atau melukai tamu.',
      ],
    },
    cardPure: {
      title: 'Standar Mutu NusantaraOrigin (100% Batok Murni)',
      bullets: [
        'Abu Putih Alami (< 2.2%): Residu abu sangat tipis (snow white), padat dan tidak mudah rontok menembus alumunium foil.',
        '100% Bebas Bau & Asap: Pirolisis drum tertutup menghasilkan karbon murni tanpa asap pedih di mata atau bau sangit.',
        'Bara Utuh & Tahan Banting: Uji jatuh beton 1.5 meter 3x tetap utuh tanpa retak (Drop Test Passed), panas stabil 2.5 jam.',
      ],
    },
  },
  ar: {
    kicker: 'مقارنة بقايا الاحتراق الحراري',
    title: 'الإثبات البصري المخبري لجودة الرماد والاحتراق',
    subtitle: 'مقارنة بصرية مباشرة بين رماد فحم قشور جوز الهند الطبيعي وفحم السوق المغشوش. الرماد الأبيض النقي يضمن نكهة معسل خالصة بدون كبريت.',
    sliderHint: 'اسحب المؤشر لليمين / اليسار',
    badgePure: 'قشور جوز هند طبيعية 100% (رماد < 2.2%)',
    badgeDirty: 'فحم تجاري مغشوش (رماد داكن > 4%)',
    cardDirty: {
      title: 'مخاطر الفحم المغشوش (الممزوج بالفحم الحجري ونشارة الخشب)',
      bullets: [
        'نسبة رماد عالية (> 4.0%): رماد بني داكن ثقيل يتراكم بسرعة فوق رأس الشيشة ويسد مجرى الهواء.',
        'روائح كيميائية خانقة: يحتوي على قطران الخشب أو كبريت الفحم الحجري الذي يفسد نكهة المعسل الفاخر.',
        'تطاير الشرر والتشقق: عرضة للتطاير والفرقعة المفاجئة، مما يشكل خطراً بحرق سجاد الصالات أو إصابة الزبائن.',
      ],
    },
    cardPure: {
      title: 'معايير جودة نوسانتارا أوريجين (فحم قشور جوز هند 100%)',
      bullets: [
        'رماد أبيض ناصع كالثلج (< 2.2%): رماد ناعم جداً ومتماسك لا يتساقط ولا يخترق ورق القصدير.',
        'خالٍ تماماً 100% من الرائحة والدخان: تحلل حراري لا هوائي ينتج كربوناً نقياً دون أي دخان حارق للعين.',
        'مكعب صلب مقاوم للصدمات: اجتاز فحص السقوط من ارتفاع 1.5 متر 3 مرات على الخرسانة دون أي كسر.',
      ],
    },
  },
  zh: {
    kicker: '热值燃烧残渣实测对比',
    title: '燃烧白灰与炭块物理品质全景实拍对比',
    subtitle: '直观对比我们纯天然椰壳炭与市面掺假炭块的燃烧残余。纯白细灰确保水烟纯正果香，绝无硫磺或木焦油污染。',
    sliderHint: '左右拖动滑块进行对比',
    badgePure: '100% 纯天然成熟椰壳炭 (灰分 < 2.2%)',
    badgeDirty: '市面常见劣质掺假炭 (煤炭/杂木灰分 > 4%)',
    cardDirty: {
      title: '使用劣质掺假炭块（煤粉/杂木屑）的运营风险',
      bullets: [
        '高灰分黑灰 (> 4.0%): 燃烧产生厚重脏污的深褐色残渣，迅速在水烟碗上方堆积阻塞通气。',
        '刺鼻化学烟气: 释放木焦油黑烟或煤炭硫磺异味，严重破坏高端水烟膏的原生风味。',
        '火星爆裂飞溅: 抽吸或吹气时极易爆星开裂，存在烧毁地毯甚至烫伤客人的严重安全隐患。',
      ],
    },
    cardPure: {
      title: 'NusantaraOrigin 顶级出口品质保障 (100% 纯椰壳)',
      bullets: [
        '纯白雪灰 (< 2.2%): 极细致紧凑的纯白灰分，自然固结绝不穿透锡纸污染烟草。',
        '100% 真正无烟无味: 密闭无氧干馏彻底消除有毒木焦油，绝无刺鼻熏眼烟雾。',
        '1.5米混泥土地面3次跌落完好: 经受严苛跌落抗震测试，燃烧稳定持续达2.5小时以上。',
      ],
    },
  },
};

export default function DualSplitScreenComparison() {
  const { locale } = useLanguage();
  const t = ASH_I18N[locale] || ASH_I18N.en;

  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  return (
    <section className="flex flex-col gap-6 bg-surface-container-low p-6 lg:p-8 rounded-2xl border border-outline-variant/30 shadow-xl font-poppins">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-1">
            {t.kicker}
          </span>
          <h2 className="font-headline text-[24px] sm:text-[30px] font-bold text-on-surface">
            {t.title}
          </h2>
          <p className="font-body text-[14px] text-outline mt-1 max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>
        <div className="font-mono text-[12px] text-on-surface-variant bg-surface-container px-3.5 py-1.5 rounded-lg border border-outline-variant/30 flex items-center gap-2 self-start md:self-auto shrink-0 select-none">
          <MoveHorizontal className="w-4 h-4 text-primary animate-pulse" />
          <span>{t.sliderHint}</span>
        </div>
      </div>

      {/* Interactive Drag Stage (Full width 0% - 100%) */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        onTouchMove={onTouchMove}
        className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-outline-variant/40 shadow-2xl bg-black"
      >
        {/* RIGHT IMAGE: Arang Oplosan Pasaran (Dirty Brown Ash) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/img/dirty-coal-ash-macro.jpg"
            alt={t.badgeDirty}
            fill
            className="object-cover filter contrast-105"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Clean Floating Badge */}
          <div className="absolute bottom-5 right-5 z-10 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-error/40 font-mono text-[11px] font-bold text-error flex items-center gap-1.5 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-error" />
            <span>{t.badgeDirty}</span>
          </div>
        </div>

        {/* LEFT IMAGE: 100% Batok Murni (Pure Snow White Ash) with Dynamic Clip */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="relative w-full h-full min-w-[320px]" style={{ width: containerRef.current?.clientWidth || '100%' }}>
            <Image
              src="/img/pure-white-ash-macro.jpg"
              alt={t.badgePure}
              fill
              className="object-cover filter brightness-105"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Clean Floating Badge */}
            <div className="absolute bottom-5 left-5 z-10 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-tertiary/40 font-mono text-[11px] font-bold text-tertiary flex items-center gap-1.5 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span>{t.badgePure}</span>
            </div>
          </div>
        </div>

        {/* Center Draggable Divider Line & Knob */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-20 flex items-center justify-center -translate-x-1/2 shadow-[0_0_16px_rgba(255,138,82,0.9)]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-2xl border-2 border-primary hover:scale-105 transition-transform">
            <MoveHorizontal className="w-5 h-5 text-on-primary-container" />
          </div>
        </div>
      </div>

      {/* DUAL COMPARISON CARDS BELOW (NO TEXT IS EVER CLIPPED) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Card A: Arang Oplosan */}
        <div className="p-5 rounded-xl bg-surface-container border border-error/30 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-error font-bold text-[14px]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{t.cardDirty.title}</span>
          </div>
          <ul className="flex flex-col gap-2 text-[13px] text-outline">
            {t.cardDirty.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-error font-bold">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card B: 100% Batok Murni */}
        <div className="p-5 rounded-xl bg-surface-container border border-tertiary/40 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-tertiary font-bold text-[14px]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{t.cardPure.title}</span>
          </div>
          <ul className="flex flex-col gap-2 text-[13px] text-on-surface-variant">
            {t.cardPure.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
