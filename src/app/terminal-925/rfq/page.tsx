'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Inbox, CheckCircle2, Clock, Truck, FileText, Search, ArrowUpRight, Filter, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface RfqItem {
  ref: string;
  buyer: string;
  company: string;
  country: string;
  container: string;
  tonnage: number;
  incoterm: string;
  targetPrice: string;
  status: 'NEW' | 'CONTACTED' | 'SAMPLE_SENT' | 'OFFICIAL_QUOTE' | 'DEAL_WON';
  date: string;
}

const ADMIN_I18N = {
  en: {
    title: 'Internal Deal Desk & RFQ Pipeline',
    sub: 'Gresik Processing Hub (IDMES) • Live Cluster Sync',
    benchTag: 'FOB Tanjung Perak Benchmark:',
    metric1Label: 'New Inquiries',
    metric1Sub: '+3 incoming today from GCC & EU',
    metric2Label: 'Accumulated Volume',
    metric2Sub: 'Equivalent to 16x 40ft HC Containers',
    metric3Label: 'Pipeline Valuation',
    metric3Sub: 'Average $1,280/MT FOB',
    metric4Label: 'DHL Sample Queue',
    metric4Sub: 'Ready for dispatch at Gresik Lab',
    searchPlaceholder: 'Search PIC or Company...',
    thRef: 'Ref No.',
    thBuyer: 'Buyer & Company',
    thCountry: 'Country',
    thContainer: 'Container / MT',
    thIncoterm: 'Incoterm',
    thTarget: 'Target Price',
    thStatus: 'Status',
    thAction: 'Action',
    btnContact: 'Contact',
    statusNew: 'NEW INQUIRY',
    statusSample: 'SAMPLE SENT',
    statusQuote: 'OFFICIAL QUOTE',
    statusDeal: 'DEAL CLOSED',
    statusContacted: 'CONTACTED',
  },
  id: {
    title: 'Internal Deal Desk & RFQ Pipeline',
    sub: 'Terminal Gresik Processing Hub (IDMES) • Live Cluster Sync',
    benchTag: 'FOB Tanjung Perak Benchmark:',
    metric1Label: 'Inquiries Baru',
    metric1Sub: '+3 masuk hari ini dari GCC & EU',
    metric2Label: 'Akumulasi Volume',
    metric2Sub: 'Setara 16x Kontainer 40ft HC',
    metric3Label: 'Valuasi Pipeline',
    metric3Sub: 'Rata-rata $1,280/MT FOB',
    metric4Label: 'Antrean Sampel DHL',
    metric4Sub: 'Siap dispatch di Lab Gresik',
    searchPlaceholder: 'Cari PIC atau Perusahaan...',
    thRef: 'No. Referensi',
    thBuyer: 'Buyer & Perusahaan',
    thCountry: 'Negara',
    thContainer: 'Kontainer / MT',
    thIncoterm: 'Incoterm',
    thTarget: 'Target Harga',
    thStatus: 'Status',
    thAction: 'Aksi',
    btnContact: 'Hubungi',
    statusNew: 'BARU MASUK',
    statusSample: 'SAMPEL TERKIRIM',
    statusQuote: 'DRAF PENAWARAN',
    statusDeal: 'DEAL CLOSED',
    statusContacted: 'DIHUBUNGI',
  },
  ar: {
    title: 'مكتب الصفقات الداخلي ومتابعة عروض الأسعار RFQ',
    sub: 'مركز معالجة غريسيك (IDMES) • مزامنة حية',
    benchTag: 'مؤشر ميناء تانجونغ بيراك FOB:',
    metric1Label: 'الطلبات الجديدة',
    metric1Sub: '+3 طلبات واردة اليوم من الخليج وأوروبا',
    metric2Label: 'إجمالي الحجم التراكمي',
    metric2Sub: 'ما يعادل 16 حاوية 40 قدم HC',
    metric3Label: 'قيمة الصفقات المتوقعة',
    metric3Sub: 'بمتوسط 1,280 دولار/طن FOB',
    metric4Label: 'عينات DHL المنتظرة',
    metric4Sub: 'جاهزة للشحن من مختبر غريسيك',
    searchPlaceholder: 'بحث عن المشتري أو الشركة...',
    thRef: 'رقم المرجع',
    thBuyer: 'المشتري والشركة',
    thCountry: 'الدولة',
    thContainer: 'الحاوية / طن',
    thIncoterm: 'شرط الشحن',
    thTarget: 'السعر المستهدف',
    thStatus: 'الحالة',
    thAction: 'الإجراء',
    btnContact: 'تواصل',
    statusNew: 'طلب جديد',
    statusSample: 'عينة أرسلت',
    statusQuote: 'مسودة رسمية',
    statusDeal: 'صفقة مغلقة',
    statusContacted: 'تم التواصل',
  },
  zh: {
    title: '内部订单大厅与外贸 RFQ 询盘漏斗',
    sub: '东爪哇锦石出口处理中心 (IDMES) • 实时集群同步',
    benchTag: '泗水港基准 FOB 离岸价:',
    metric1Label: '最新外贸询盘',
    metric1Sub: '今日新增 3 笔来自海湾及欧洲采购商',
    metric2Label: '累计采购容积',
    metric2Sub: '相当于 16 个 40尺高柜 (HC)',
    metric3Label: '在谈订单总货值',
    metric3Sub: '平均 FOB 离岸价 $1,280/MT',
    metric4Label: '待发 DHL 样品',
    metric4Sub: '已于锦石实验室质检封装完毕待发',
    searchPlaceholder: '搜索采购商代表或企业名称...',
    thRef: '询盘参考编号',
    thBuyer: '采购商与公司',
    thCountry: '目标国家',
    thContainer: '集装箱 / 吨位',
    thIncoterm: '贸易术语',
    thTarget: '目标报价',
    thStatus: '当前进度',
    thAction: '操作',
    btnContact: '立即联系',
    statusNew: '新询盘',
    statusSample: '已寄送样品',
    statusQuote: '已出官方报价草案',
    statusDeal: '已成单成交',
    statusContacted: '已对接洽谈',
  },
};

const INITIAL_RFQS: RfqItem[] = [
  {
    ref: 'RFQ-20261023-8819',
    buyer: 'Tareq Al-Mansoor',
    company: 'Al-Noor Horizon Tobacco LLC',
    country: 'United Arab Emirates',
    container: '2x 40ft HC',
    tonnage: 52.0,
    incoterm: 'FOB Surabaya',
    targetPrice: '$1,300/MT',
    status: 'NEW',
    date: 'Hari ini, 14:22',
  },
  {
    ref: 'RFQ-20261022-7721',
    buyer: 'Klaus Reinhardt',
    company: 'Nordic Charcoal & Grill GmbH',
    country: 'Germany',
    container: '1x 40ft HC',
    tonnage: 26.0,
    incoterm: 'CIF Hamburg',
    targetPrice: '$1,420/MT',
    status: 'SAMPLE_SENT',
    date: 'Kemarin, 09:15',
  },
  {
    ref: 'RFQ-20261021-6540',
    buyer: 'Dimitrios Papadopoulos',
    company: 'Hellenic Hookah Distributors',
    country: 'Greece',
    container: '1x 20ft FCL',
    tonnage: 18.0,
    incoterm: 'FOB Surabaya',
    targetPrice: '$1,290/MT',
    status: 'OFFICIAL_QUOTE',
    date: '21 Okt 2026',
  },
  {
    ref: 'RFQ-20261020-5412',
    buyer: 'Fahad Al-Otaibi',
    company: 'Riyadh Shisha Palace Trading',
    country: 'Saudi Arabia',
    container: '4x 40ft HC',
    tonnage: 104.0,
    incoterm: 'CFR Jeddah Port',
    targetPrice: '$1,320/MT',
    status: 'DEAL_WON',
    date: '20 Okt 2026',
  },
  {
    ref: 'RFQ-20261019-4390',
    buyer: 'Jean-Luc Moreau',
    company: 'Le Grill Gourmet S.A.R.L.',
    country: 'France',
    container: '1x 40ft HC',
    tonnage: 26.0,
    incoterm: 'FOB Tanjung Perak',
    targetPrice: '$1,310/MT',
    status: 'CONTACTED',
    date: '19 Okt 2026',
  },
];

export default function AdminRfqPage() {
  const { locale } = useLanguage();
  const t = ADMIN_I18N[locale] || ADMIN_I18N.en;

  const [rfqs, setRfqs] = useState<RfqItem[]>(INITIAL_RFQS);
  const [filter, setFilter] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  // Sync live RFQs from API / Supabase
  React.useEffect(() => {
    fetch('/api/v1/rfq')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const mapped: RfqItem[] = res.data.map((d: any) => ({
            ref: d.reference_no,
            buyer: d.buyer_name,
            company: d.buyer_company,
            country: d.buyer_country || 'International',
            container: `${d.container_size || '40HC'}`,
            tonnage: Number(d.total_metric_tons) || 26.0,
            incoterm: d.incoterm || 'FOB Tanjung Perak',
            targetPrice: d.target_price || 'Market FOB',
            status: d.status || 'NEW',
            date: new Date(d.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
          }));

          setRfqs((prev) => {
            const existingRefs = new Set(prev.map((p) => p.ref));
            const newItems = mapped.filter((m) => !existingRefs.has(m.ref));
            return [...newItems, ...prev];
          });
        }
      })
      .catch((err) => console.warn('Fetch live RFQs warning:', err));
  }, []);

  const filteredRfqs = rfqs.filter((item) => {
    if (filter !== 'ALL' && item.status !== filter) return false;
    if (search && !item.buyer.toLowerCase().includes(search.toLowerCase()) && !item.company.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleUpdateStatus = async (ref: string, newStatus: RfqItem['status']) => {
    setRfqs((prev) =>
      prev.map((item) => (item.ref === ref ? { ...item, status: newStatus } : item))
    );

    try {
      await fetch('/api/v1/rfq', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference_no: ref, status: newStatus }),
      });
    } catch (err) {
      console.warn('Failed to update RFQ status in Supabase:', err);
    }
  };

  // Live Metric Computations
  const totalLeads = rfqs.length;
  const totalVolumeMt = rfqs.reduce((acc, r) => acc + (r.tonnage || 0), 0);
  const totalValuation = rfqs.reduce((acc, r) => acc + (r.tonnage || 0) * 1280, 0);
  const sampleCount = rfqs.filter((r) => r.status === 'SAMPLE_SENT').length;

  const getStatusBadge = (status: RfqItem['status']) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-mono text-[10px] font-bold">{t.statusNew}</span>;
      case 'SAMPLE_SENT':
        return <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-mono text-[10px] font-bold">{t.statusSample}</span>;
      case 'OFFICIAL_QUOTE':
        return <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-mono text-[10px] font-bold">{t.statusQuote}</span>;
      case 'DEAL_WON':
        return <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-mono text-[10px] font-bold">{t.statusDeal}</span>;
      case 'CONTACTED':
      default:
        return <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono text-[10px] font-bold">{t.statusContacted}</span>;
    }
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-6 sm:gap-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
            <span className="font-headline font-bold text-[20px] text-on-surface uppercase">
              {t.title}
            </span>
          </div>
          <span className="font-mono text-[11px] text-outline">
            {t.sub}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[12px] bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/30">
          <span className="text-secondary">{t.benchTag}</span>
          <strong className="text-on-surface">$1,320/MT</strong>
        </div>
      </div>

      {/* 4 Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-outline uppercase">{t.metric1Label}</span>
          <div className="font-mono text-[28px] font-bold text-on-surface my-1">{totalLeads} Leads</div>
          <span className="font-mono text-[11px] text-tertiary">{t.metric1Sub}</span>
        </div>

        <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-outline uppercase">{t.metric2Label}</span>
          <div className="font-mono text-[28px] font-bold text-on-surface my-1">{totalVolumeMt.toFixed(1)} MT</div>
          <span className="font-mono text-[11px] text-outline">{t.metric2Sub}</span>
        </div>

        <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-outline uppercase">{t.metric3Label}</span>
          <div className="font-mono text-[28px] font-bold text-primary my-1">${Math.round(totalValuation).toLocaleString('en-US')} USD</div>
          <span className="font-mono text-[11px] text-tertiary">{t.metric3Sub}</span>
        </div>

        <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-outline uppercase">{t.metric4Label}</span>
          <div className="font-mono text-[28px] font-bold text-on-surface my-1">{sampleCount} Paket</div>
          <span className="font-mono text-[11px] text-secondary">{t.metric4Sub}</span>
        </div>
      </div>

      {/* Pipeline Table Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-surface-container p-3 rounded-xl border border-outline-variant/30">
        {/* Filters */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {['ALL', 'NEW', 'CONTACTED', 'SAMPLE_SENT', 'OFFICIAL_QUOTE', 'DEAL_WON'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg font-headline text-[11px] uppercase font-bold whitespace-nowrap transition-colors cursor-pointer ${
                filter === f
                  ? 'bg-primary-container text-on-primary-container'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-outline absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="h-9 pl-9 pr-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface font-body text-[12px] focus:outline-none focus:border-primary-container w-full sm:w-64"
          />
        </div>
      </div>

      {/* RFQ Pipeline Data Table */}
      <div className="w-full bg-surface-container rounded-xl border border-outline-variant/30 overflow-hidden shadow-xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left font-body text-[13px] text-on-surface">
            <thead>
              <tr className="bg-surface-container-high font-headline text-[11px] text-outline uppercase tracking-wider border-b border-outline-variant/30">
                <th className="py-3 px-4 font-bold">{t.thRef}</th>
                <th className="py-3 px-4 font-bold">{t.thBuyer}</th>
                <th className="py-3 px-4 font-bold">{t.thCountry}</th>
                <th className="py-3 px-4 font-bold">{t.thContainer}</th>
                <th className="py-3 px-4 font-bold">{t.thIncoterm}</th>
                <th className="py-3 px-4 font-bold">{t.thTarget}</th>
                <th className="py-3 px-4 font-bold">{t.thStatus}</th>
                <th className="py-3 px-4 font-bold text-right">{t.thAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-mono text-[12px]">
              {filteredRfqs.map((r) => (
                <tr key={r.ref} className="hover:bg-surface-container-high/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-primary">{r.ref}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-headline font-bold text-on-surface text-[13px]">{r.buyer}</div>
                    <div className="text-outline text-[11px]">{r.company}</div>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{r.country}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-on-surface">{r.container}</span>
                    <span className="text-outline block text-[10px]">({r.tonnage} MT)</span>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant">{r.incoterm}</td>
                  <td className="py-3.5 px-4 font-bold text-secondary">{r.targetPrice}</td>
                  <td className="py-3.5 px-4">
                    <select
                      value={r.status}
                      onChange={(e) => handleUpdateStatus(r.ref, e.target.value as RfqItem['status'])}
                      className="bg-surface-container-high text-on-surface font-mono text-[11px] font-bold px-2 py-1 rounded-lg border border-outline-variant/40 focus:outline-none focus:border-primary-container cursor-pointer transition-colors"
                    >
                      <option value="NEW">{t.statusNew}</option>
                      <option value="CONTACTED">{t.statusContacted}</option>
                      <option value="SAMPLE_SENT">{t.statusSample}</option>
                      <option value="OFFICIAL_QUOTE">{t.statusQuote}</option>
                      <option value="DEAL_WON">{t.statusDeal}</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={`https://wa.me/628113000000?text=${encodeURIComponent(`Follow-up RFQ ${r.ref} untuk ${r.company}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-headline text-[11px] font-bold transition-colors"
                    >
                      <span>{t.btnContact}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
