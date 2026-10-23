'use client';

import React from 'react';
import { Factory, Flame, Filter, Wheat, Layers, ShieldCheck, Thermometer, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FACTORY_I18N = {
  en: {
    kicker: 'END-TO-END FACTORY TRANSPARENCY',
    title: '5-Stage Manufacturing Methodology & Quality Control',
    subtitle: 'Ensuring absolute physical integrity independent of weather, micro-sieved 60-mesh clean ash, and IMO Non-DG SP925 maritime thermal compliance.',
    cards: {
      locationLabel: 'FACTORY & WAREHOUSE LOCATION',
      locationVal: 'Gresik Industrial Estate, East Java',
      locationSub: '25 KM from Tanjung Perak Container Terminal (SUB Port)',
      outputLabel: 'INTEGRATED KILN OUTPUT',
      outputVal: '350 MT / Month',
      outputSub: '24/7 Continuous Kiln & Digital Thermocouple Sensors',
      baysLabel: 'CONTAINER STUFFING BAYS',
      baysVal: '3 Stuffing Bays',
      baysSub: 'Hydraulic Ramps & ISO 17712 High Security Container Seals',
    },
    controlParam: 'Control Parameter',
    qcPass: 'QC PASS',
    stages: [
      {
        step: 'STAGE 01',
        title: 'Selection of 100% Mature Dry Coconut Shells',
        desc: 'Selected mature coconut shells from Sulawesi and Sumatra are manually cleaned of coir fiber, soil, and sand to preserve pure carbon density.',
        control: 'Raw shell ash < 2.0% & natural moisture < 12%',
        telemetry: 'SORTER-INSPECTION: GRADE A PASS',
        icon: <ShieldCheck className="w-5 h-5 text-tertiary" />,
      },
      {
        step: 'STAGE 02',
        title: 'Closed Retort Drum Pyrolysis Carbonization',
        desc: 'Anaerobic carbonization without free oxygen ensures thorough combustion without forming toxic wood tars, wild smoke, or acrid smells.',
        control: 'Stable kiln temp 450°C – 500°C with 0% wood soot',
        telemetry: 'RETORT CORE TEMP: 482.4°C [ANAEROBIC]',
        icon: <Flame className="w-5 h-5 text-primary" />,
      },
      {
        step: 'STAGE 03',
        title: 'Fine Crushing & 60-Mesh Micro Screening',
        desc: 'Charcoal flour is passed through double-deck 60-mesh vibrating screens, eliminating coarse particulates and foreign matter to prevent briquette fissures.',
        control: 'Ultra-clean micro-particle flour free of silica & sand',
        telemetry: 'SIEVE STATUS: MESH 60 REJECTION < 0.3%',
        icon: <Filter className="w-5 h-5 text-secondary" />,
      },
      {
        step: 'STAGE 04',
        title: 'Natural 2.5% Food-Grade Tapioca Binder Blending',
        desc: 'Exclusively organic cassava starch used as natural food-grade binder with 0% nitrates, artificial sulfur, or toxic chemical accelerants.',
        control: '100% Organic food-grade, 0% synthetic chemical oxidizers',
        telemetry: 'ORGANIC BINDER: 2.50% HOMOGENEOUS',
        icon: <Wheat className="w-5 h-5 text-tertiary" />,
      },
      {
        step: 'STAGE 05',
        title: 'Hydraulic Extrusion & 72-Hour Kiln Drying at 70°C',
        desc: 'Briquettes are hydraulically compressed under 120 tons of pressure, then cured in industrial heat circulation ovens for 72 continuous hours at 70°C.',
        control: 'Core moisture locked < 4.5% & 1.5m drop test 3x intact',
        telemetry: 'KILN T-SENSOR: 70.2°C STABLE (72H CYCLE)',
        icon: <Layers className="w-5 h-5 text-primary" />,
      },
    ],
  },
  id: {
    kicker: 'TRANSPARANSI PROSES HULU KE HILIR',
    title: 'Metodologi Manufaktur 5 Tahap & Kontrol Mutu Pabrik',
    subtitle: 'Menjamin integritas fisik absolut tanpa ketergantungan cuaca, pengayakan debu abu bersih, dan kepatuhan uji pemanasan maritim IMO Non-DG SP925.',
    cards: {
      locationLabel: 'LOKASI PABRIK & GUDANG',
      locationVal: 'Kawasan Industri Gresik, Jatim',
      locationSub: '25 KM dari Terminal Petikemas Tanjung Perak (SUB Port)',
      outputLabel: 'OUTPUT KILN TERINTEGRASI',
      outputVal: '350 MT / Bulan',
      outputSub: '24/7 Continuous Kiln & Sensor Termokopel Digital',
      baysLabel: 'STUFFING BAYS KARGO',
      baysVal: '3 Stuffing Bays',
      baysSub: 'Ramp Hidrolik & Segel Kontainer ISO 17712 High Security',
    },
    controlParam: 'Parameter Kontrol',
    qcPass: 'QC PASS',
    stages: [
      {
        step: 'STAGE 01',
        title: 'Penyortiran Tempurung Kelapa Tua Kering',
        desc: 'Tempurung kelapa tua pilihan dari Sulawesi dan Sumatera dipisahkan manual dari sabut dan kotoran tanah untuk menjaga kemurnian karbon.',
        control: 'Kadar abu bahan mentah < 2.0% & kelembapan alami < 12%',
        telemetry: 'SORTER-INSPECTION: GRADE A PASS',
        icon: <ShieldCheck className="w-5 h-5 text-tertiary" />,
      },
      {
        step: 'STAGE 02',
        title: 'Pirolisis Karbonisasi Drum Tertutup',
        desc: 'Karbonisasi anaerobik tanpa oksigen bebas memastikan pembakaran sempurna tanpa memicu tar kayu beracun atau aroma sangit menusuk hidung.',
        control: 'Suhu pembakaran stabil 450°C – 500°C tanpa jelaga kayu liar',
        telemetry: 'RETORT CORE TEMP: 482.4°C [ANAEROBIC]',
        icon: <Flame className="w-5 h-5 text-primary" />,
      },
      {
        step: 'STAGE 03',
        title: 'Penggilingan Presisi & Pengayakan Mesh 60',
        desc: 'Tepung arang diayak melalui saringan getar mesh 60 dua lapis, menyingkirkan partikel kasar dan benda asing yang dapat menyebabkan retak bara.',
        control: 'Tepung arang mikro-partikel super bersih bebas silika & pasir',
        telemetry: 'SIEVE STATUS: MESH 60 REJECTION < 0.3%',
        icon: <Filter className="w-5 h-5 text-secondary" />,
      },
      {
        step: 'STAGE 04',
        title: 'Pencampuran Binder Tapioka Alami 2.5%',
        desc: 'Hanya menggunakan pati singkong organik sebagai perekat alami tanpa nitrat, belerang buatan, atau bahan kimia pembakar cepat yang berbahaya.',
        control: '100% Organik food-grade tanpa bahan kimia pembakar sintetis',
        telemetry: 'ORGANIC BINDER: 2.50% HOMOGENEOUS',
        icon: <Wheat className="w-5 h-5 text-tertiary" />,
      },
      {
        step: 'STAGE 05',
        title: 'Pencetakan Hidrolik Presisi & Oven Kiln 72 Jam 70°C',
        desc: 'Briket dicetak dengan tekanan press 120-ton lalu dikeringkan lambat di ruang oven kiln terkontrol selama 72 jam terus-menerus pada suhu 70°C.',
        control: 'Kelembapan inti terkunci < 4.5% & uji jatuh 1.5m 3x beton utuh',
        telemetry: 'KILN T-SENSOR: 70.2°C STABLE (72H CYCLE)',
        icon: <Layers className="w-5 h-5 text-primary" />,
      },
    ],
  },
  ar: {
    kicker: 'شفافية التصنيع والإنتاج من البداية حتى الشحن',
    title: 'منهجية التصنيع المتقدمة في 5 مراحل ومعايير ضبط الجودة',
    subtitle: 'ضمان السلامة المادية الفيزيائية للفحم دون التأثر بالطقس، ونخل الرماد بشبكة 60 مش، والامتثال للسلامة البحرية IMO Non-DG SP925.',
    cards: {
      locationLabel: 'موقع المصنع والمستودعات',
      locationVal: 'المنطقة الصناعية في غريسيك، جاوة الشرقية',
      locationSub: 'على بعد 25 كم من محطة حاويات ميناء تانجونغ بيراك (SUB)',
      outputLabel: 'الطاقة الإنتاجية المتكاملة للأفران',
      outputVal: '350 طن متري / شهر',
      outputSub: 'أفران حرارية تعمل 24/7 مع أجهزة استشعار رقمية دقيقة',
      baysLabel: 'أرصفة تحميل الحاويات',
      baysVal: '3 منصات تحميل هيدروليكية',
      baysSub: 'منحدرات هيدروليكية وأختام أمنية عالية ISO 17712',
    },
    controlParam: 'معيار الرقابة المخبرية',
    qcPass: 'فحص الجودة ناجح',
    stages: [
      {
        step: 'المرحلة 01',
        title: 'فرز قشور جوز الهند الناضجة والجافة 100%',
        desc: 'تُفرز قشور جوز الهند القديمة والمختارة من سولاويزي وسومطرة يدوياً لإزالة ألياف جوز الهند والأتربة لضمان نقاء الكربون.',
        control: 'نسبة رماد المادة الخام < 2.0% ورطوبة طبيعية < 12%',
        telemetry: 'فحص الفرز اليدوي: الدرجة A ممتاز',
        icon: <ShieldCheck className="w-5 h-5 text-tertiary" />,
      },
      {
        step: 'المرحلة 02',
        title: 'الكربنة اللاهوائية في براميل التحلل المغلقة',
        desc: 'كربنة لاهوائية معزولة عن الأكسجين الحر تضمن احتراقاً متكاملاً بدون قطران خشب سام وبدون أي رائحة نفاذة غير مرغوبة.',
        control: 'درجة حرارة احتراق مستقرة 450°C - 500°C بدون شوائب',
        telemetry: 'حرارة قلب البرميل: 482.4°C [لاهوائي]',
        icon: <Flame className="w-5 h-5 text-primary" />,
      },
      {
        step: 'المرحلة 03',
        title: 'الطحن عالي الدقة والغربلة عبر شبكة 60 مش',
        desc: 'يتم نخل مسحوق الفحم عبر مناخل اهتزازية مزدوجة مقاس 60 مش، لاستبعاد الجزيئات الخشنة التي قد تسبب تشقق المكعبات.',
        control: 'بودرة فحم متناهية الصغر فائقة النقاء خالية من السيليكا والرمال',
        telemetry: 'حالة النخل: نسبة الشوائب المستبعدة < 0.3%',
        icon: <Filter className="w-5 h-5 text-secondary" />,
      },
      {
        step: 'المرحلة 04',
        title: 'خلط رابط التابيوكا العضوي الطبيعي 2.5%',
        desc: 'نستخدم نشا الكسافا العضوي الصالح للأغذية كرابط طبيعي خالٍ تماماً من النترات أو الكبريت الصناعي أو المواد الكيميائية المسرعة للاشتعال.',
        control: 'طبيعي 100% فود جريد، بدون أي مواد كيميائية مصنعة',
        telemetry: 'الرابط الطبيعي: 2.50% تجانس كامل',
        icon: <Wheat className="w-5 h-5 text-tertiary" />,
      },
      {
        step: 'المرحلة 05',
        title: 'الكبس الهيدروليكي 120 طن والتجفيف 72 ساعة في 70°C',
        desc: 'يُضغط الفحم تحت مكابس هيدروليكية بقوة 120 طناً ثم يجفف ببطء في أفران معزولة لمدة 72 ساعة متواصلة بدرجة 70°C.',
        control: 'رطوبة القلب محكمة < 4.5% واختبار السقوط من 1.5م سليم 3 مرات',
        telemetry: 'حساس حرارة الفرن: 70.2°C مستقر (دورة 72 ساعة)',
        icon: <Layers className="w-5 h-5 text-primary" />,
      },
    ],
  },
  zh: {
    kicker: '全流程工厂透明溯源与品质管控',
    title: '五阶段生产工艺方法与工厂严苛品控',
    subtitle: '确保炭块物理结构不受气候影响、60目高密微孔除尘纯净白灰、通过国际海事 IMO Non-DG SP925 自热测试。',
    cards: {
      locationLabel: '工厂与出口仓库位置',
      locationVal: '东爪哇格雷西克工业园区',
      locationSub: '距泗水丹戎佩拉集装箱码头 (SUB) 仅 25 公里',
      outputLabel: '工业干燥窑综合产能',
      outputVal: '350 公吨 / 月',
      outputSub: '24/7 连续恒温工业窑炉与数字热电偶温度监测',
      baysLabel: '集装箱装柜作业平台',
      baysVal: '3 个专用液压装柜车位',
      baysSub: '液压升降平台与 ISO 17712 高保封条',
    },
    controlParam: '核心控制指标',
    qcPass: '质检合格',
    stages: [
      {
        step: 'STAGE 01',
        title: '严选100%充分成熟干燥老椰壳原料',
        desc: '精选来自苏拉威西和苏门答腊的高密度老椰壳，人工逐个分选剥离椰丝与泥沙杂质，确保纯净固定碳基础。',
        control: '原料灰分 < 2.0% 且天然水分 < 12%',
        telemetry: '人工分选检测: A级合格 PASS',
        icon: <ShieldCheck className="w-5 h-5 text-tertiary" />,
      },
      {
        step: 'STAGE 02',
        title: '密闭干馏炭化无氧热解工艺',
        desc: '隔绝空气无氧热解炭化，彻底避免游离氧气产生有毒木焦油、杂质烟雾或刺鼻酸味。',
        control: '炉温恒定控制在 450°C – 500°C 零杂质黑烟',
        telemetry: '干馏炉核心温度: 482.4°C [无氧]',
        icon: <Flame className="w-5 h-5 text-primary" />,
      },
      {
        step: 'STAGE 03',
        title: '精密微粉研磨与60目高密双层筛分',
        desc: '炭粉通过双层高频振动60目超细筛网，彻底剔除粗颗粒及异物，杜绝燃烧过程中裂纹产生。',
        control: '超细微炭粉零二氧化硅及泥沙',
        telemetry: '筛分状态: 60目残渣剔除率 < 0.3%',
        icon: <Filter className="w-5 h-5 text-secondary" />,
      },
      {
        step: 'STAGE 04',
        title: '2.5%食品级天然木薯淀粉均匀粘合混炼',
        desc: '仅使用天然食品级木薯淀粉作为物理粘合剂，绝不添加硝酸盐、硫磺或人工助燃化学品。',
        control: '100% 有机食品级天然粘合剂，零合成氧化助燃剂',
        telemetry: '有机粘合剂比例: 2.50% 均匀度极佳',
        icon: <Wheat className="w-5 h-5 text-tertiary" />,
      },
      {
        step: 'STAGE 05',
        title: '120吨液压精密成型与72小时70°C恒温烘干',
        desc: '120吨超重型液压精密压制成型，随后进入循环温控烘房连续恒温70°C烘烤整整72小时。',
        control: '核心水分锁定 < 4.5% 且 1.5米混泥土地面3次跌落完好',
        telemetry: '烘房热敏传感器: 70.2°C 恒定 (72小时循环)',
        icon: <Layers className="w-5 h-5 text-primary" />,
      },
    ],
  },
};

export default function FactoryPipelineSection() {
  const { locale } = useLanguage();
  const t = FACTORY_I18N[locale] || FACTORY_I18N.en;

  return (
    <section className="flex flex-col gap-6 bg-surface-container-low p-6 lg:p-8 rounded-xl border border-outline-variant/30 shadow-xl">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
          {t.kicker}
        </span>
        <h2 className="font-headline text-[22px] sm:text-[28px] font-bold text-on-surface">
          {t.title}
        </h2>
        <p className="font-body text-[14px] text-outline max-w-3xl">
          {t.subtitle}
        </p>
      </div>

      {/* Proximity & Capacity Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline mb-1 font-mono text-[11px]">
            <span>{t.cards.locationLabel}</span>
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div className="font-headline text-[15px] font-bold text-on-surface">
            {t.cards.locationVal}
          </div>
          <span className="font-body text-[12px] text-outline mt-1">
            {t.cards.locationSub}
          </span>
        </div>

        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline mb-1 font-mono text-[11px]">
            <span>{t.cards.outputLabel}</span>
            <Thermometer className="w-4 h-4 text-primary" />
          </div>
          <div className="font-headline text-[22px] font-bold text-primary font-mono">
            {t.cards.outputVal}
          </div>
          <span className="font-body text-[12px] text-tertiary mt-1">
            {t.cards.outputSub}
          </span>
        </div>

        <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline mb-1 font-mono text-[11px]">
            <span>{t.cards.baysLabel}</span>
            <Factory className="w-4 h-4 text-secondary" />
          </div>
          <div className="font-headline text-[22px] font-bold text-on-surface font-mono">
            {t.cards.baysVal}
          </div>
          <span className="font-body text-[12px] text-outline mt-1">
            {t.cards.baysSub}
          </span>
        </div>
      </div>

      {/* 5-Stage Interactive Timeline */}
      <div className="flex flex-col gap-4 pt-2">
        {t.stages.map((s, idx) => (
          <div
            key={idx}
            className="p-5 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center shrink-0 mt-0.5">
                {s.icon}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-mono text-[10px] font-bold">
                    {s.step}
                  </span>
                  <span className="font-mono text-[11px] text-tertiary">{t.qcPass}</span>
                </div>
                <h4 className="font-headline font-bold text-[16px] text-on-surface">
                  {s.title}
                </h4>
                <p className="font-body text-[13px] text-outline mt-1 max-w-2xl leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>

            {/* Right Telemetry Chip */}
            <div className="flex flex-col items-start lg:items-end shrink-0 pl-14 lg:pl-0">
              <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                {t.controlParam}
              </span>
              <span className="font-mono text-[12px] text-primary font-semibold mt-0.5">
                {s.control}
              </span>
              <span className="mt-1 px-2 py-0.5 rounded bg-surface-container-high text-tertiary font-mono text-[10px]">
                {s.telemetry}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
