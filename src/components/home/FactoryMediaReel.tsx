'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize2, ShieldCheck, Factory, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const REELS_I18N = {
  en: {
    kicker: 'OPERATIONAL DOCUMENTATION & FACTORY PHYSICAL PROOF',
    heading: 'Manufacturing Facility Tour & Quality Video Reels',
    subtitle: 'International buyers can verify kiln technology, briquette drop tests, 60-mesh ash sieving, and container stuffing with official surveyor seals.',
    badgeImo: 'IMO SP925 PASSED',
    badgeSgs: 'SGS ACCREDITED',
    lblTemp: 'TEMPERATURE',
    lblBinder: 'BINDER QUALITY',
    lblStatus: 'MARITIME STATUS',
    lblPlaylist: 'SELECT FACTORY FACILITY REEL:',
    auditBoxTitle: 'PHYSICAL FACTORY VISITS & AUDITS',
    auditBoxDesc: 'We welcome independent buyer inspectors (SGS, Cotecna, Bureau Veritas, or your private team) for kiln audits, master box weighing, and random sampling before container stuffing in Gresik, East Java.',
    reels: [
      {
        id: 'pyrolysis',
        title: 'Anaerobic Pyrolysis & Sealed Retort Drum Kiln Facility',
        tag: 'STAGE 02 • CARBONIZATION',
        duration: '02:45 / 4K UHD 60FPS',
        poster: '/img/factory-pyrolysis-retort.jpg',
        badge: '100% ANAEROBIC DRUM KILN',
        telemetry: {
          temp: '482°C STABLE',
          flow: 'ZERO SYNTHETIC TAR',
          qc: 'FIXED CARBON > 80%',
        },
        description: 'Controlled carbonization of mature dry coconut shells in sealed pyrolysis drums without direct oxygen contact, completely preventing toxic tar buildup and dirty ash.',
      },
      {
        id: 'drying',
        title: '72-Hour Controlled Industrial Kiln Oven at 70°C Constant',
        tag: 'STAGE 05 • KILN CURING',
        duration: '03:10 / 4K UHD 60FPS',
        poster: '/img/assets/drying-rack.webp',
        badge: 'INDOOR KILN 72 HOURS',
        telemetry: {
          temp: '70.2°C UNIFORM',
          flow: '4.2% CORE MOISTURE',
          qc: 'ZERO WEATHER RISK',
        },
        description: 'Briquette drying avoids open outdoor sun drying that causes mold or humidity swings. Industrial drying ovens circulate steady hot air for 72 continuous hours.',
      },
      {
        id: 'lab-test',
        title: 'ASTM D3174 Spectrometry Testing & Snow White Ash Verification',
        tag: 'QUALITY AUDIT • LAB PROOF',
        duration: '01:50 / 4K UHD 60FPS',
        poster: '/img/pure-white-ash-macro.jpg',
        badge: 'SGS LAB AUDITED',
        telemetry: {
          temp: '815°C INCINERATION',
          flow: 'ASH < 2.2% WHITE',
          qc: 'SP 925 IMO NON-DG',
        },
        description: 'Random samples drawn every 500 master boxes to inspect ash content, volatile matter, and self-heating characteristics (Self-Heating Test UN 3313 Passed).',
      },
      {
        id: 'finished-goods',
        title: 'Precision Geometry Inspection & Export Container Stuffing',
        tag: 'LOGISTICS • TANJUNG PERAK',
        duration: '02:15 / 4K UHD 60FPS',
        poster: '/img/shisha-charcoal-cutout.png',
        badge: 'CONTAINER STUFFING BAY',
        telemetry: {
          temp: 'AMBIENT 28°C',
          flow: '26.0 MT / 40FT HC',
          qc: 'ISO 17712 SEALED',
        },
        description: 'Stuffing 2,600 master boxes (10kg) into 40ft High Cube containers at the Gresik facility, 25 minutes from the Port of Tanjung Perak, Surabaya.',
      },
    ],
  },
  id: {
    kicker: 'DOKUMENTASI OPERASIONAL & BUKTI FISIK PABRIK',
    heading: 'Tur Fasilitas Manufaktur & Video Rekaman Mutu',
    subtitle: 'Pembeli internasional dapat memverifikasi langsung teknologi kiln, uji jatuh briket, pengayakan debu mesh 60, dan pemuatan kontainer berstempel resmi surveyor.',
    badgeImo: 'IMO SP925 PASSED',
    badgeSgs: 'SGS ACCREDITED',
    lblTemp: 'TEMPERATUR',
    lblBinder: 'KUALITAS BINDER',
    lblStatus: 'STATUS MARITIM',
    lblPlaylist: 'PILIH REKAMAN FASILITAS PABRIK:',
    auditBoxTitle: 'KUNJUNGAN PABRIK & AUDIT FISIK',
    auditBoxDesc: 'Kami menyambut inspektur buyer independen (SGS, Cotecna, BV, atau tim Anda) untuk audit kiln, penimbangan kardus, dan pengambilan sampel acak sebelum stuffing kontainer di Gresik, Jawa Timur.',
    reels: [
      {
        id: 'pyrolysis',
        title: 'Fasilitas Pirolisis Anaerobik & Retort Drum Tertutup',
        tag: 'STAGE 02 • CARBONIZATION',
        duration: '02:45 / 4K UHD 60FPS',
        poster: '/img/factory-pyrolysis-retort.jpg',
        badge: '100% ANAEROBIC DRUM KILN',
        telemetry: {
          temp: '482°C STABIL',
          flow: 'ZERO SYNTHETIC TAR',
          qc: 'FIXED CARBON > 80%',
        },
        description: 'Proses karbonisasi tempurung kelapa tua kering dalam drum pirolisis tertutup tanpa kontak oksigen langsung untuk mencegah pembentukan senyawa tar beracun dan abu kotor.',
      },
      {
        id: 'drying',
        title: 'Ruang Oven Kiln 72 Jam Terkontrol pada Suhu Stabil 70°C',
        tag: 'STAGE 05 • KILN CURING',
        duration: '03:10 / 4K UHD 60FPS',
        poster: '/img/assets/drying-rack.webp',
        badge: 'INDOOR KILN 72 HOURS',
        telemetry: {
          temp: '70.2°C UNIFORM',
          flow: '4.2% CORE MOISTURE',
          qc: 'ZERO WEATHER RISK',
        },
        description: 'Pengeringan briket tidak mengandalkan sinar matahari terbuka yang berisiko jamur atau kelembapan fluktuatif, melainkan oven pengering industri dengan sirkulasi udara panas 72 jam.',
      },
      {
        id: 'lab-test',
        title: 'Uji Spektrometri ASTM D3174 & Verifikasi Abu Putih Alami',
        tag: 'QUALITY AUDIT • LAB PROOF',
        duration: '01:50 / 4K UHD 60FPS',
        poster: '/img/pure-white-ash-macro.jpg',
        badge: 'SGS LAB AUDITED',
        telemetry: {
          temp: '815°C INCINERATION',
          flow: 'ASH < 2.2% WHITE',
          qc: 'SP 925 IMO NON-DG',
        },
        description: 'Sampel acak diambil per 500 master box untuk diinspeksi kadar abu, zat terbang, dan sifat pemanasan mandiri (Self-Heating Test UN 3313 Passed).',
      },
      {
        id: 'finished-goods',
        title: 'Inspeksi Geometri Presisi & Stuffing Kontainer Ekspor',
        tag: 'LOGISTICS • TANJUNG PERAK',
        duration: '02:15 / 4K UHD 60FPS',
        poster: '/img/shisha-charcoal-cutout.png',
        badge: 'CONTAINER STUFFING BAY',
        telemetry: {
          temp: 'AMBIENT 28°C',
          flow: '26.0 MT / 40FT HC',
          qc: 'ISO 17712 SEALED',
        },
        description: 'Proses pemuatan 2.600 master box 10kg ke dalam kontainer 40ft High Cube di pabrik Gresik berjarak 25 menit dari Terminal Petikemas Tanjung Perak Surabaya.',
      },
    ],
  },
  ar: {
    kicker: 'التوثيق العملياتي والإثباتات الميدانية للمصنع',
    heading: 'جولة منشأة التصنيع ومقاطع فيديو توثيق الجودة',
    subtitle: 'يمكن للمشترين الدوليين التحقق مباشرة من تكنولوجيا الأفران، واختبارات السقوط، ونخل الرماد عبر شبك 60، وعمليات تحميل الحاويات بأختام المعاينة الرسمية.',
    badgeImo: 'اجتياز معايير IMO SP925',
    badgeSgs: 'اعتماد مختبرات SGS',
    lblTemp: 'درجة الحرارة',
    lblBinder: 'جودة مادة الربط',
    lblStatus: 'الحالة الملاحية',
    lblPlaylist: 'اختر المقطع التوثيقي للمصنع:',
    auditBoxTitle: 'زيارات المصنع والتدقيق الميداني',
    auditBoxDesc: 'نرحب بمفتشي المشترين المستقلين (SGS أو Cotecna أو Bureau Veritas أو فريقكم الخاص) للتدقيق على الأفران، والوزن، وأخذ العينات العشوائية قبل تحميل الحاويات في غريسيك، جاوة الشرقية.',
    reels: [
      {
        id: 'pyrolysis',
        title: 'أفران الكربنة اللاهوائية والأوتوكلاف الأسطواني المغلق',
        tag: 'المرحلة 02 • الكربنة',
        duration: '02:45 / دقة 4K UHD 60FPS',
        poster: '/img/factory-pyrolysis-retort.jpg',
        badge: 'أفران أسطوانية لاهوائية 100%',
        telemetry: {
          temp: '482°C مستقر',
          flow: 'خالي من القطران الكيميائي',
          qc: 'كربون ثابت > 80%',
        },
        description: 'عملية تفحيم قشور جوز الهند المجففة في أسطوانات مغلقة دون أي تلامس مع الأكسجين لمنع تكون القطران والرماد الداكن.',
      },
      {
        id: 'drying',
        title: 'أفران تجفيف صناعية لمدة 72 ساعة بدرجة حرارة ثابتة 70°C',
        tag: 'المرحلة 05 • التجفيف الحراري',
        duration: '03:10 / دقة 4K UHD 60FPS',
        poster: '/img/assets/drying-rack.webp',
        badge: 'تجفيف أفران داخلية 72 ساعة',
        telemetry: {
          temp: '70.2°C متناسق',
          flow: '4.2% رطوبة اللب',
          qc: 'محمي من تقلبات الطقس',
        },
        description: 'تجفيف الفحم لا يعتمد على التجفيف الشمسي المكشوف المعرض للعفن والرطوبة، بل داخل أفران صناعية مغلقة توزع الهواء الساخن طوال 72 ساعة.',
      },
      {
        id: 'lab-test',
        title: 'فحص مطياف ASTM D3174 وإثبات الرماد الأبيض النقي',
        tag: 'تدقيق الجودة • الإثبات المخبري',
        duration: '01:50 / دقة 4K UHD 60FPS',
        poster: '/img/pure-white-ash-macro.jpg',
        badge: 'معتمد من مختبر SGS',
        telemetry: {
          temp: '815°C حرق تام',
          flow: 'رماد < 2.2% أبيض',
          qc: 'SP 925 IMO غير خطرة',
        },
        description: 'أخذ عينات عشوائية لكل 500 كرتون لفحص نسبة الرماد، والمواد المتطايرة، واختبار الاشتعال الذاتي UN 3313 بنجاح.',
      },
      {
        id: 'finished-goods',
        title: 'فحص الأبعاد الهندسية الدقيقة وتعبئة حاويات التصدير',
        tag: 'اللوجستيات • ميناء تانجونغ بيراك',
        duration: '02:15 / دقة 4K UHD 60FPS',
        poster: '/img/shisha-charcoal-cutout.png',
        badge: 'منصة تحميل الحاويات',
        telemetry: {
          temp: 'محيط 28°C',
          flow: '26.0 طن / 40FT HC',
          qc: 'أختام ISO 17712 المعتمدة',
        },
        description: 'عملية تحميل 2,600 كرتون رئيسي (10 كغ) داخل حاويات 40 قدم في مصنعنا بغريسيك على بعد 25 دقيقة من ميناء تانجونغ بيراك بسورابايا.',
      },
    ],
  },
  zh: {
    kicker: '生产车间现场记录与物理实证',
    heading: '制造生产基地全景巡检与高清质检实录',
    subtitle: '全球采购商可直接核验干燥回转窑技术、炭块高空跌落冲击试验、60目精细筛灰以及加盖验货行海事封条的装柜现场。',
    badgeImo: '通过 IMO SP925 海事标准',
    badgeSgs: 'SGS 独立实验室检测资质',
    lblTemp: '核心炉温',
    lblBinder: '天然粘合剂指标',
    lblStatus: '国际海运合规状态',
    lblPlaylist: '选择车间实拍实录:',
    auditBoxTitle: '支持实体工厂验厂与现场审计',
    auditBoxDesc: '我们热诚欢迎全球买家独立检验机构 (SGS、Cotecna、BV 或您的私人团队) 来到印尼东爪哇锦石工厂，在装箱前对回转窑、箱重及抽样进行全面实地审核。',
    reels: [
      {
        id: 'pyrolysis',
        title: '厌氧热解与全密闭转筒炭化炉生产车间',
        tag: '第02阶段 • 炭化工艺',
        duration: '02:45 / 4K 超清 60FPS',
        poster: '/img/factory-pyrolysis-retort.jpg',
        badge: '100% 密闭式无氧转筒窑',
        telemetry: {
          temp: '482°C 恒温',
          flow: '零人工合成焦油',
          qc: '固定碳 > 80%',
        },
        description: '精选老椰壳在密闭热解转筒中进行隔绝氧气炭化，彻底阻断有毒焦油形成并避免黑灰杂质。',
      },
      {
        id: 'drying',
        title: '72小时 70°C 恒温控制工业干燥窑烘干车间',
        tag: '第05阶段 • 熟化干燥',
        duration: '03:10 / 4K 超清 60FPS',
        poster: '/img/assets/drying-rack.webp',
        badge: '室内工业烘房 72小时',
        telemetry: {
          temp: '70.2°C 均匀受热',
          flow: '4.2% 核心水分',
          qc: '零天气潮湿风险',
        },
        description: '炭块干燥坚决不依赖露天太阳暴晒，避免受潮霉变，采用封闭式工业回风干燥窑进行 72 小时连续恒温循环烘干。',
      },
      {
        id: 'lab-test',
        title: 'ASTM D3174 分光测热试验与天然雪白灰分验证',
        tag: '质量审计 • 实验室实证',
        duration: '01:50 / 4K 超清 60FPS',
        poster: '/img/pure-white-ash-macro.jpg',
        badge: 'SGS 官方实验室严苛检测',
        telemetry: {
          temp: '815°C 灼烧灰化',
          flow: '灰分 < 2.2% 纯白',
          qc: 'SP 925 IMO 非危险品',
        },
        description: '每生产 500 个外箱随机抽取样品，严格检测灰分、挥发分以及自热物质试验 (SHTC UN 3313 合格)。',
      },
      {
        id: 'finished-goods',
        title: '高精度几何切角检测与出口集装箱规范装载',
        tag: '国际海运 • 泗水港',
        duration: '02:15 / 4K 超清 60FPS',
        poster: '/img/shisha-charcoal-cutout.png',
        badge: '集装箱标准化装载区',
        telemetry: {
          temp: '室温 28°C',
          flow: '26.0 MT / 40FT HC',
          qc: 'ISO 17712 高保封条',
        },
        description: '在锦石工厂装载 2,600 个 10kg 外箱至 40尺高柜 (High Cube)，距泗水丹戎佩拉国际码头仅 25 分钟车程。',
      },
    ],
  },
};

export default function FactoryMediaReel() {
  const { locale } = useLanguage();
  const t = REELS_I18N[locale] || REELS_I18N.en;

  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const activeReel = t.reels[activeReelIdx] || t.reels[0];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-1">
            {t.kicker}
          </span>
          <h2 className="font-headline text-[24px] sm:text-[32px] font-bold text-on-surface">
            {t.heading}
          </h2>
          <p className="font-body text-[14px] text-outline max-w-2xl mt-1">
            {t.subtitle}
          </p>
        </div>

        {/* Global Compliance Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 font-mono text-[11px] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-tertiary" />
            <span className="text-on-surface">{t.badgeImo}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 font-mono text-[11px] flex items-center gap-1.5">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-on-surface">{t.badgeSgs}</span>
          </div>
        </div>
      </div>

      {/* Main Reel Cinema & Gallery Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Video Player Mockup Stage (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/40 shadow-2xl group">
            {/* Background Image / Poster */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={activeReel.poster}
                alt={activeReel.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-105 filter brightness-105' : 'group-hover:scale-102 filter brightness-90'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 pointer-events-none" />
            </div>

            {/* Top Video HUD Info */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/20 font-mono text-[11px] text-white font-bold">
                  {activeReel.tag}
                </span>
                <span className="px-2 py-1 rounded bg-primary-container text-on-primary-container font-mono text-[10px] font-bold">
                  {activeReel.badge}
                </span>
              </div>
              <div className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/20 font-mono text-[11px] text-white/90">
                {activeReel.duration}
              </div>
            </div>

            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/30 shadow-[0_0_30px_rgba(255,138,82,0.4)] ${
                  isPlaying
                    ? 'bg-black/60 text-white hover:bg-black/80'
                    : 'bg-primary-container text-on-primary-container hover:scale-110 hover:bg-[#D94E13]'
                }`}
                aria-label={isPlaying ? 'Pause video' : 'Play video reel'}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                )}
              </button>
            </div>

            {/* Bottom Telemetry HUD Bar */}
            <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 z-10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-bold text-white text-[15px] sm:text-[17px] line-clamp-1">
                  {activeReel.title}
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-label="Toggle audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3 Telemetry Data Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 font-mono text-[11px]">
                <div className="flex flex-col">
                  <span className="text-[#A1A1AA] text-[9px] uppercase">{t.lblTemp}</span>
                  <span className="text-primary font-bold">{activeReel.telemetry.temp}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#A1A1AA] text-[9px] uppercase">{t.lblBinder}</span>
                  <span className="text-white font-medium">{activeReel.telemetry.flow}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#A1A1AA] text-[9px] uppercase">{t.lblStatus}</span>
                  <span className="text-tertiary font-bold">{activeReel.telemetry.qc}</span>
                </div>
              </div>

              {/* Live Timeline Bar */}
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: isPlaying ? '65%' : '18%' }}
                />
              </div>
            </div>
          </div>

          <p className="font-body text-[13px] text-outline px-1 leading-relaxed">
            {activeReel.description}
          </p>
        </div>

        {/* Right: Reel Playlist & Photo Verification Thumbnails (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="font-mono text-[11px] text-outline uppercase tracking-wider px-1">
            {t.lblPlaylist}
          </div>

          <div className="flex flex-col gap-2.5">
            {t.reels.map((r, idx) => {
              const isSelected = activeReelIdx === idx;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setActiveReelIdx(idx);
                    setIsPlaying(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-surface-container border-primary/60 shadow-lg'
                      : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/60 hover:bg-surface-container'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-black border border-white/10">
                    <img
                      src={r.poster}
                      alt={r.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-mono text-[9px] text-primary font-bold uppercase truncate">
                      {r.tag}
                    </span>
                    <span className="font-headline font-bold text-[13px] text-on-surface line-clamp-1">
                      {r.title}
                    </span>
                    <span className="font-mono text-[10px] text-outline mt-0.5">
                      {r.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Verification Callout Box */}
          <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/30 mt-2 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-mono text-[11px] font-bold">
              <Factory className="w-4 h-4" />
              <span>{t.auditBoxTitle}</span>
            </div>
            <p className="font-body text-[12px] text-outline leading-relaxed">
              {t.auditBoxDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
