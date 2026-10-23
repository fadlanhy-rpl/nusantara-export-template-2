-- ==============================================================================
-- NUSANTARAEXPORT TEMPLATE 2 (PRD-NO2-COMMODITY-V2)
-- PostgreSQL 16 Seed Data (Supabase SGP)
-- Platinum Export Grade Coconut Shell Briquettes
-- ==============================================================================

DO $$
DECLARE
    v_commodity_id UUID;
    v_shape_c25_id UUID;
BEGIN
    -- 1. Insert Master Commodity
    INSERT INTO commodities (
        slug,
        hs_code,
        category,
        title,
        origin_region,
        is_smokeless,
        is_sparkless,
        is_odorless,
        drop_test_spec,
        fob_price_min,
        fob_price_max,
        moq_containers,
        monthly_capacity_mt,
        sgs_test_ref,
        msds_status,
        is_published
    ) VALUES (
        '100-briket-arang-batok-kelapa',
        '4402.90.10',
        'CHARCOAL',
        '{
            "en": "100% Pure Coconut Shell Charcoal Briquettes (Platinum Export Grade)",
            "id": "100% Briket Arang Batok Kelapa Murni (Grade Ekspor Platinum)",
            "ar": "فحم جوز الهند الطبيعي 100% للشيشة والشواء"
        }'::jsonb,
        'Jawa Timur & Sulawesi',
        TRUE,
        TRUE,
        TRUE,
        '1.5m concrete floor (3x drop intact)',
        1280.00,
        1340.00,
        1,
        350,
        'SGS-SUB-2026-88194-COA',
        'IMO Non-DG SP925 UN 3313 Passed',
        TRUE
    )
    ON CONFLICT (slug) DO UPDATE
    SET 
        title = EXCLUDED.title,
        fob_price_min = EXCLUDED.fob_price_min,
        fob_price_max = EXCLUDED.fob_price_max,
        monthly_capacity_mt = EXCLUDED.monthly_capacity_mt,
        sgs_test_ref = EXCLUDED.sgs_test_ref,
        msds_status = EXCLUDED.msds_status
    RETURNING id INTO v_commodity_id;

    -- Clean up previous child records for idempotent re-runs
    DELETE FROM commodity_lab_specs WHERE commodity_id = v_commodity_id;
    DELETE FROM commodity_shapes WHERE commodity_id = v_commodity_id;
    DELETE FROM commodity_processing_steps WHERE commodity_id = v_commodity_id;

    -- 2. Insert ASTM & ISO Analytical Lab Specs
    INSERT INTO commodity_lab_specs (commodity_id, param_name, export_limit, typical_batch_result, test_method, display_order)
    VALUES
        (v_commodity_id, 'Kadar Air (Moisture Content)', '< 4.5%', '4.10%', 'ASTM D3173', 1),
        (v_commodity_id, 'Kadar Abu (Ash Content)', '< 2.2%', '2.05%', 'ASTM D3174', 2),
        (v_commodity_id, 'Zat Terbang (Volatile Matter)', '< 13.0%', '11.80%', 'ASTM D3175', 3),
        (v_commodity_id, 'Karbon Terikat (Fixed Carbon)', '> 82.0%', '84.50%', 'ASTM D3172', 4),
        (v_commodity_id, 'Kalori Bruto (Gross Calorific Value)', '> 7,500 kcal/kg', '7,580 kcal/kg', 'ISO 1928', 5),
        (v_commodity_id, 'Total Belerang (Total Sulfur)', '< 0.05%', '0.02%', 'ASTM D4239', 6);

    -- 3. Insert Shape Geometries, Dimensions & Burning Applications
    INSERT INTO commodity_shapes (commodity_id, shape_category, name, dimension_mm, pieces_per_kg, burning_duration_hours, recommended_use)
    VALUES
        (v_commodity_id, 'CUBE', 'Cube C25', '25 x 25 x 25 mm', 72, 2.50, 'Shisha lounge standar internasional (Dubai, UEA)'),
        (v_commodity_id, 'CUBE', 'Cube C26', '26 x 26 x 26 mm', 64, 2.75, 'Pasar premium Eropa (Jerman, Prancis, Polandia)'),
        (v_commodity_id, 'CUBE', 'Cube C27 / C28', '27 x 27 x 27 mm', 56, 3.25, 'Sesi shisha intensif & mangkuk phunnel besar'),
        (v_commodity_id, 'HEXAGONAL', 'Hexagonal BBQ', '20 x 50 mm', 64, 4.75, 'Restoran yakiniku, steakhouse & commercial grill'),
        (v_commodity_id, 'FINGER', 'Finger / Cylinder', '20 x 50 mm', 72, 2.50, 'Mangkuk rokok tradisional & pasar Yunani / Turki'),
        (v_commodity_id, 'FLAT_KALOUD', 'Flat / Kaloud', '25 x 25 x 18 mm', 96, 2.00, 'Heat Management Device (HMD) / Lotus Kaloud');

    SELECT id INTO v_shape_c25_id FROM commodity_shapes WHERE commodity_id = v_commodity_id AND name = 'Cube C25' LIMIT 1;

    -- 4. Insert 5-Stage Traceable Manufacturing Flow
    INSERT INTO commodity_processing_steps (commodity_id, step_number, title, control_metric)
    VALUES
        (
            v_commodity_id,
            1,
            '{"en": "Selection of 100% Mature Dry Coconut Shells", "id": "Penyortiran Tempurung Kelapa Tua Kering"}'::jsonb,
            'Kadar abu bahan mentah < 2.0% & kelembapan alami < 12%'
        ),
        (
            v_commodity_id,
            2,
            '{"en": "Closed Drum Pyrolysis Carbonization", "id": "Pirolisis Karbonisasi Drum Tertutup"}'::jsonb,
            'Suhu pembakaran stabil 450°C-500°C tanpa jelaga kayu atau hidrokarbon liar'
        ),
        (
            v_commodity_id,
            3,
            '{"en": "Fine Grinding & 60-Mesh Sieving", "id": "Penggilingan Halus & Pengayakan Mesh 60"}'::jsonb,
            'Partikel arang mikro super halus bebas kotoran tanah, pasir, dan silika'
        ),
        (
            v_commodity_id,
            4,
            '{"en": "Natural 2.5% Food-Grade Tapioca Binder Blending", "id": "Pencampuran Binder Tapioka Murni 2.5%"}'::jsonb,
            '100% Organik bebas zat pengikat kimia sintetis atau nitrat pembakar berbahaya'
        ),
        (
            v_commodity_id,
            5,
            '{"en": "Hydraulic Compression & 72-Hour Kiln Drying at 70°C", "id": "Pencetakan Hidrolik Presisi & Oven Kiln 72 Jam 70°C"}'::jsonb,
            'Kontrol kelembapan inti < 4.5% & uji jatuh 1.5m 3x lantai beton utuh'
        );

    -- 5. Insert Benchmark Seed RFQ Inquiry
    INSERT INTO rfq_inquiries (
        reference_no,
        commodity_id,
        shape_id,
        buyer_name,
        buyer_company,
        buyer_country,
        buyer_email,
        buyer_whatsapp,
        container_size,
        total_metric_tons,
        total_master_boxes,
        incoterm,
        destination_port,
        buyer_target_price_usd,
        oem_brand_name,
        status
    ) VALUES (
        'RFQ-20261023-8819',
        v_commodity_id,
        v_shape_c25_id,
        'Tareq Al-Mansoor',
        'Al-Noor Horizon Tobacco Trading LLC',
        'United Arab Emirates',
        'imports@alnoor-horizon.ae',
        '+971501234567',
        '40HC',
        26.00,
        2600,
        'FOB',
        'Jebel Ali Port, Dubai',
        1300.00,
        'SULTAN FLAME PLATINUM',
        'NEW'
    ) ON CONFLICT (reference_no) DO NOTHING;

END $$;
