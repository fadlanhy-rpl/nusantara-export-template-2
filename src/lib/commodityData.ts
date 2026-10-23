export interface CommodityShape {
  id?: string;
  name: string;
  category: 'CUBE' | 'HEXAGONAL' | 'FINGER' | 'FLAT_KALOUD';
  dimension_mm: string;
  pcs_per_kg: number;
  burn_hours: number;
  recommended_use: string;
}

export interface CommodityLabSpec {
  param: string;
  limit: string;
  batch: string;
  method: string;
}

export interface ProcessingStep {
  step: number;
  title: {
    en: string;
    id: string;
  };
  control_metric: string;
}

export interface CommodityDetail {
  slug: string;
  hs_code: string;
  title: {
    en: string;
    id: string;
    ar?: string;
  };
  origin: string;
  quality_guarantees: {
    smokeless: boolean;
    sparkless: boolean;
    odorless: boolean;
    ash_color: string;
    ash_percentage: string;
    drop_test: string;
    chemical_free: boolean;
  };
  pricing: {
    currency: string;
    fob_min: number;
    fob_max: number;
    moq: string;
    monthly_capacity: string;
  };
  shapes: CommodityShape[];
  lab_specifications: CommodityLabSpec[];
  processing_steps: ProcessingStep[];
  maritime_compliance: {
    sgs_ref: string;
    status: string;
    un_exemption: string;
    test_criteria: string;
  };
}

export const BRIQUETTE_COMMODITY_DATA: CommodityDetail = {
  slug: '100-briket-arang-batok-kelapa',
  hs_code: '4402.90.10',
  title: {
    en: '100% Pure Coconut Shell Charcoal Briquettes (Platinum Export Grade)',
    id: '100% Briket Arang Batok Kelapa Murni (Grade Ekspor Platinum)',
    ar: 'فحم جوز الهند الطبيعي 100% للشيشة والشواء الفاخر',
  },
  origin: 'East Java & Sulawesi, Indonesia (Port: Tanjung Perak, Surabaya)',
  quality_guarantees: {
    smokeless: true,
    sparkless: true,
    odorless: true,
    ash_color: 'Natural Pure White / Light Grey',
    ash_percentage: '< 2.2% White Ash Guarantee',
    drop_test: '1.5m on concrete floor (3x drop intact)',
    chemical_free: true,
  },
  pricing: {
    currency: 'USD',
    fob_min: 1280.0,
    fob_max: 1340.0,
    moq: '1x 20ft FCL (18.0 MT Net / 1,800 Master Boxes)',
    monthly_capacity: '350 Metric Tons',
  },
  shapes: [
    {
      name: 'Cube C25',
      category: 'CUBE',
      dimension_mm: '25 x 25 x 25 mm',
      pcs_per_kg: 72,
      burn_hours: 2.5,
      recommended_use: 'Standard International Shisha Lounges (Dubai, UAE & GCC)',
    },
    {
      name: 'Cube C26',
      category: 'CUBE',
      dimension_mm: '26 x 26 x 26 mm',
      pcs_per_kg: 64,
      burn_hours: 2.75,
      recommended_use: 'Premium European Markets (Germany, France, Poland)',
    },
    {
      name: 'Cube C27 / C28',
      category: 'CUBE',
      dimension_mm: '27 x 27 x 27 mm',
      pcs_per_kg: 56,
      burn_hours: 3.25,
      recommended_use: 'Intensive Shisha Sessions & Large Phunnel Bowls',
    },
    {
      name: 'Hexagonal BBQ',
      category: 'HEXAGONAL',
      dimension_mm: '20 x 50 mm / 20 x 35 mm',
      pcs_per_kg: 64,
      burn_hours: 4.75,
      recommended_use: 'Commercial Grill, Japanese Yakiniku & Premium Steakhouse',
    },
    {
      name: 'Finger / Cylinder',
      category: 'FINGER',
      dimension_mm: '20 x 50 mm',
      pcs_per_kg: 72,
      burn_hours: 2.5,
      recommended_use: 'Traditional Hookah Bowls (Greece, Turkey & Levant)',
    },
    {
      name: 'Flat / Kaloud',
      category: 'FLAT_KALOUD',
      dimension_mm: '25 x 25 x 18 mm',
      pcs_per_kg: 96,
      burn_hours: 2.0,
      recommended_use: 'Heat Management Devices (HMD) / Lotus Kaloud',
    },
  ],
  lab_specifications: [
    {
      param: 'Kadar Air (Moisture Content)',
      limit: '< 4.5%',
      batch: '4.10%',
      method: 'ASTM D3173',
    },
    {
      param: 'Kadar Abu (Ash Content)',
      limit: '< 2.2%',
      batch: '2.05%',
      method: 'ASTM D3174',
    },
    {
      param: 'Zat Terbang (Volatile Matter)',
      limit: '< 13.0%',
      batch: '11.80%',
      method: 'ASTM D3175',
    },
    {
      param: 'Karbon Terikat (Fixed Carbon)',
      limit: '> 82.0%',
      batch: '84.50%',
      method: 'ASTM D3172',
    },
    {
      param: 'Kalori Bruto (Gross Calorific Value)',
      limit: '> 7,500 kcal/kg',
      batch: '7,580 kcal/kg',
      method: 'ISO 1928',
    },
    {
      param: 'Total Belerang (Total Sulfur)',
      limit: '< 0.05%',
      batch: '0.02%',
      method: 'ASTM D4239',
    },
  ],
  processing_steps: [
    {
      step: 1,
      title: {
        en: 'Selection of 100% Mature Dry Coconut Shells',
        id: 'Penyortiran Tempurung Kelapa Tua Kering',
      },
      control_metric: 'Raw material ash < 2.0% & natural moisture < 12%',
    },
    {
      step: 2,
      title: {
        en: 'Closed Drum Pyrolysis Carbonization',
        id: 'Pirolisis Karbonisasi Drum Tertutup',
      },
      control_metric: 'Stable burning temp 450°C-500°C with 0% wood tar residue',
    },
    {
      step: 3,
      title: {
        en: 'Precision Crushing & 60-Mesh Sieving',
        id: 'Penggilingan Presisi & Pengayakan Mesh 60',
      },
      control_metric: 'Ultra-fine charcoal flour completely free of silica/sand',
    },
    {
      step: 4,
      title: {
        en: 'Natural 2.5% Food-Grade Tapioca Binder Blending',
        id: 'Pencampuran Binder Tapioka Alami 2.5%',
      },
      control_metric: '100% food-grade organic, 0% synthetic chemical oxidizers',
    },
    {
      step: 5,
      title: {
        en: 'Hydraulic Compression & 72-Hour Kiln Drying at 70°C',
        id: 'Pencetakan Hidrolik Presisi & Oven Kiln 72 Jam 70°C',
      },
      control_metric: 'Core moisture locked < 4.5% & 1.5m drop test 3x intact',
    },
  ],
  maritime_compliance: {
    sgs_ref: 'SGS-SUB-2026-88194-COA',
    status: 'IMO Non-DG SP925 UN 3313 Passed',
    un_exemption: 'UN 1361 Class 4.2 Exemption Applied',
    test_criteria: 'UN Manual of Tests Part III subsection 33.3.1.3.3 Passed',
  },
};

export const ALL_COMMODITIES = [
  {
    slug: '100-briket-arang-batok-kelapa',
    hs_code: '4402.90.10',
    name: '100% Briket Arang Batok Kelapa Murni',
    category: 'CHARCOAL',
    grade: 'Platinum Shisha & BBQ',
    origin: 'Jawa Timur & Sulawesi',
    moq: '1x 20ft FCL (18 MT)',
    fob: '$1,280 – $1,340 / MT',
    desc: 'Abu putih alami < 2.2%, 0% bahan kimia atau serbuk kayu, bara menyala 2.5 jam konsisten.',
    highlights: ['Ash < 2.2%', '7,500+ kcal/kg', 'IMO Non-DG SP925', 'Smokeless & Odorless'],
    link: '/products/100-briket-arang-batok-kelapa',
    badge: 'CORE COMMODITY',
    image: '/img/shisha-charcoal-cutout.png',
  },
  {
    slug: 'green-coffee',
    hs_code: '0901.11.00',
    name: 'Sumatra Mandheling & Gayo Green Coffee Beans',
    category: 'COFFEE',
    grade: 'Specialty Grade 1 (Triple Picked)',
    origin: 'Aceh Gayo & North Sumatra',
    moq: '1x 20ft FCL (19.2 MT / 320 Jute Bags)',
    fob: '$6,800 – $7,400 / MT',
    desc: 'Kadar air 11-12%, defect rate < 3%, citarasa rempah tembakau dengan body tebal khas volcanic soil.',
    highlights: ['Moisture 11.5%', 'Defect < 3%', 'Screen 16-18', 'SCA Score 85+'],
    link: '/products/green-coffee',
    badge: 'SPECIALTY GRADE',
    image: '/img/green-coffee-cutout.png',
  },
  {
    slug: 'whole-spices',
    hs_code: '0907.10.00',
    name: 'Maluku Lalpari Cloves & Cassia Vera AA Quills',
    category: 'SPICES',
    grade: 'Export Grade Lalpari & Sticks AA',
    origin: 'Ambon, Maluku & Kerinci, Sumatra',
    moq: '1x 20ft FCL (10-14 MT)',
    fob: '$8,200 – $9,600 / MT',
    desc: 'Kadar minyak esensial eugenol > 18%, tanpa bahan pengawet atau pemutih kimiawi.',
    highlights: ['Eugenol > 18%', 'Head intact > 95%', 'Moisture < 12%', 'No Mould'],
    link: '/products/whole-spices',
    badge: 'EQUATORIAL HERITAGE',
    image: '/img/cloves-spices-cutout.png',
  },
];
