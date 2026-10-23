-- ==============================================================================
-- NUSANTARAEXPORT TEMPLATE 2 (PRD-NO2-COMMODITY-V2)
-- PostgreSQL 16 Relational Database Schema (Supabase SGP)
-- Commodity-Centric & Global Verification Edition
-- Benchmark: Charcoal Chalabi Export Standards
-- ==============================================================================

-- 0. Extensions & Global Enum Types
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
    CREATE TYPE commodity_cat_t AS ENUM ('CHARCOAL', 'COFFEE', 'SPICES', 'DERIVATIVES');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE shape_cat_t AS ENUM ('CUBE', 'HEXAGONAL', 'FINGER', 'FLAT_KALOUD', 'WHOLE_GRAIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE rfq_status_t AS ENUM ('NEW', 'CONTACTED', 'SAMPLE_SENT', 'OFFICIAL_QUOTE', 'DEAL_WON', 'ARCHIVED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Master Table: Komoditas & Jaminan Kualitas Fisik
CREATE TABLE IF NOT EXISTS commodities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(120) UNIQUE NOT NULL,
    hs_code VARCHAR(20) NOT NULL, -- e.g. "4402.90.10"
    category commodity_cat_t NOT NULL,
    title JSONB NOT NULL, -- {"en": "...", "id": "...", "ar": "...", "zh": "..."}
    origin_region VARCHAR(100) NOT NULL, -- "Jawa Timur & Sulawesi"
    is_smokeless BOOLEAN DEFAULT TRUE,
    is_sparkless BOOLEAN DEFAULT TRUE,
    is_odorless BOOLEAN DEFAULT TRUE,
    drop_test_spec VARCHAR(100) DEFAULT '1.5m concrete floor (3x drop intact)',
    fob_price_min NUMERIC(10, 2) NOT NULL,
    fob_price_max NUMERIC(10, 2) NOT NULL,
    moq_containers INT DEFAULT 1,
    monthly_capacity_mt INT DEFAULT 350,
    sgs_test_ref VARCHAR(100), -- "SGS-SUB-2026-88194-COA"
    msds_status VARCHAR(100) DEFAULT 'IMO Non-DG SP925 Verified',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Parameter Uji Laboratorium Analitis (ASTM / ISO)
CREATE TABLE IF NOT EXISTS commodity_lab_specs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commodity_id UUID REFERENCES commodities(id) ON DELETE CASCADE,
    param_name VARCHAR(100) NOT NULL, -- "Ash Content", "Gross Calorific"
    export_limit VARCHAR(100) NOT NULL, -- "< 2.2%", "> 7,500 kcal/kg"
    typical_batch_result VARCHAR(100) NOT NULL, -- "2.05%", "7,580 kcal/kg"
    test_method VARCHAR(100) NOT NULL, -- "ASTM D3174", "ISO 1928"
    display_order INT DEFAULT 0
);

-- 3. Variasi Bentuk, Dimensi & Rasio Butir (Shapes)
CREATE TABLE IF NOT EXISTS commodity_shapes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commodity_id UUID REFERENCES commodities(id) ON DELETE CASCADE,
    shape_category shape_cat_t NOT NULL,
    name VARCHAR(100) NOT NULL, -- "Cube 25mm", "Hexagonal 20x50mm"
    dimension_mm VARCHAR(50) NOT NULL, -- "25 x 25 x 25 mm"
    pieces_per_kg INT NOT NULL, -- 72
    burning_duration_hours NUMERIC(4, 2) NOT NULL, -- 2.50
    recommended_use VARCHAR(150) -- "Premium Shisha Lounge"
);

-- 4. Alur Manajemen & Tahapan Manufaktur Pabrik (5 Tahap)
CREATE TABLE IF NOT EXISTS commodity_processing_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commodity_id UUID REFERENCES commodities(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    title JSONB NOT NULL, -- {"en": "...", "id": "..."}
    control_metric VARCHAR(100) NOT NULL -- "Kadar abu bahan mentah < 2.0%"
);

-- 5. Tabel Prospek RFQ & Tiket Permintaan Pembeli
CREATE TABLE IF NOT EXISTS rfq_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_no VARCHAR(30) UNIQUE NOT NULL, -- RFQ-YYYYMMDD-XXXX
    commodity_id UUID REFERENCES commodities(id) ON DELETE SET NULL,
    shape_id UUID REFERENCES commodity_shapes(id) ON DELETE SET NULL,
    buyer_name VARCHAR(100) NOT NULL,
    buyer_company VARCHAR(150) NOT NULL,
    buyer_country VARCHAR(100) NOT NULL,
    buyer_email VARCHAR(150) NOT NULL,
    buyer_whatsapp VARCHAR(50) NOT NULL,
    container_size VARCHAR(20) NOT NULL, -- "40HC", "20FT"
    total_metric_tons NUMERIC(8, 2) NOT NULL,
    total_master_boxes INT NOT NULL,
    incoterm VARCHAR(10) DEFAULT 'FOB',
    destination_port VARCHAR(100),
    buyer_target_price_usd NUMERIC(10, 2),
    oem_brand_name VARCHAR(100),
    status rfq_status_t DEFAULT 'NEW',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Pengindeksan Database Performa Tinggi
CREATE INDEX IF NOT EXISTS idx_com_slug ON commodities(slug);
CREATE INDEX IF NOT EXISTS idx_lab_com ON commodity_lab_specs(commodity_id, display_order);
CREATE INDEX IF NOT EXISTS idx_shapes_com ON commodity_shapes(commodity_id);
CREATE INDEX IF NOT EXISTS idx_proc_com ON commodity_processing_steps(commodity_id, step_number);
CREATE INDEX IF NOT EXISTS idx_rfq_created ON rfq_inquiries(status, created_at DESC);
