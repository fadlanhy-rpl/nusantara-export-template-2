-- ==============================================================================
-- NUSANTARAORIGIN EXPORT (TEMPLATE-2) — SUPABASE POSTGRESQL SCHEMA
-- Salin dan tempel skrip SQL ini ke menu "SQL Editor" di Dashboard Supabase Anda
-- ==============================================================================

-- 1. TABEL: Inquiries RFQ dari Buyer Internasional
CREATE TABLE IF NOT EXISTS public.rfq_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_no TEXT UNIQUE NOT NULL,
    buyer_name TEXT NOT NULL,
    buyer_company TEXT NOT NULL,
    buyer_country TEXT,
    buyer_email TEXT NOT NULL,
    buyer_whatsapp TEXT NOT NULL,
    container_size TEXT DEFAULT '40HC',
    total_metric_tons NUMERIC(10, 2) DEFAULT 26.0,
    total_master_boxes INTEGER DEFAULT 2600,
    incoterm TEXT DEFAULT 'FOB Tanjung Perak',
    target_price TEXT,
    status TEXT DEFAULT 'NEW', -- NEW, CONTACTED, SAMPLE_SENT, OFFICIAL_QUOTE, DEAL_WON
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL: Kredensial Akun Operator Admin (Terminal-925)
CREATE TABLE IF NOT EXISTS public.admin_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inisialisasi kredensial default jika belum ada
INSERT INTO public.admin_credentials (username, email, password)
VALUES ('admin', 'export@nusantaraorigin.com', 'nusantara2026')
ON CONFLICT (username) DO NOTHING;

-- 3. TABEL: Katalog Komoditas & Aset Media
CREATE TABLE IF NOT EXISTS public.commodities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    hs_code TEXT NOT NULL,
    origin TEXT,
    fob_price_min NUMERIC(10, 2) NOT NULL,
    fob_price_max NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    model_3d_url TEXT,
    specifications JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ATUR HAK AKSES (Row Level Security / RLS)
ALTER TABLE public.rfq_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commodities ENABLE ROW LEVEL SECURITY;

-- Policy untuk RFQ: Publik/Buyer dapat mengirim inquiry (INSERT), siapapun dengan anon key dapat membaca
CREATE POLICY "Allow public insert on rfq_inquiries" 
    ON public.rfq_inquiries FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow anon read on rfq_inquiries" 
    ON public.rfq_inquiries FOR SELECT 
    USING (true);

CREATE POLICY "Allow anon update on rfq_inquiries" 
    ON public.rfq_inquiries FOR UPDATE 
    USING (true);

-- Policy untuk Kredensial Admin
CREATE POLICY "Allow anon read credentials" 
    ON public.admin_credentials FOR SELECT 
    USING (true);

CREATE POLICY "Allow anon update credentials" 
    ON public.admin_credentials FOR UPDATE 
    USING (true);

-- Policy untuk Katalog Komoditas
CREATE POLICY "Allow public read commodities" 
    ON public.commodities FOR SELECT 
    USING (true);

CREATE POLICY "Allow anon update commodities" 
    ON public.commodities FOR ALL 
    USING (true);

-- 5. BUCKET STORAGE UNTUK GAMBAR & MODEL 3D
-- Buat bucket publik bernama 'commodity-assets' untuk menyimpan foto & file 3D (.glb)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('commodity-assets', 'commodity-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy Storage: Izinkan upload dan download publik
CREATE POLICY "Allow public upload to commodity-assets" 
    ON storage.objects FOR INSERT 
    WITH CHECK (bucket_id = 'commodity-assets');

CREATE POLICY "Allow public read from commodity-assets" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'commodity-assets');

CREATE POLICY "Allow public update on commodity-assets" 
    ON storage.objects FOR UPDATE 
    USING (bucket_id = 'commodity-assets');
