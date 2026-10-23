# NusantaraExport Template 2 — "Commodity-Centric & Global Verification" Edition
### The Agro & Charcoal Industrial Series — Dark Cinematic & Verification Edition
**Benchmark:** *Charcoal Chalabi Export Standards*  
**Document Reference:** `PRD-NO2-COMMODITY-V2`  
**Production Stack:** Next.js 16.4 (React 19) + Supabase PostgreSQL 16 + Laravel API Gateway

---

## 🌟 Ikhtisar Proyek

Template 2 v2.0 dirancang khusus untuk mentransformasikan portal web komoditas ekspor Indonesia (*Briket Arang Batok Kelapa 100%, Specialty Coffee, dan Rempah Maluku*) menjadi instrumen verifikasi mutu transparan bagi pembeli internasional (importir shisha Dubai/GCC, distributor BBQ Eropa, roastery AS).

Sistem ini memecahkan 3 friksi industri komoditas terbesar:
1. **Bahan Campuran Palsu (Coal/Wood Adulteration)**: Dibuktikan melalui komparator visual belah-layang (*Split Image Slider*) abu putih bersih murni vs abu gelap oplosan, serta jaminan kadar abu $< 2.2\%$.
2. **Penolakan Kapal Maritim (Dangerous Goods Class 4.2)**: Bebas biaya tambahan kargo berbahaya melalui verifikasi sertifikasi **IMO Non-DG Special Provision 925 (SHTC UN 3313 Passed)**.
3. **Opasitas Pengolahan (Pabrik Fiktif / Makelar)**: Transparansi 5 tahap hulu-ke-hilir (pirolisis drum anaerobik, ayakan mesh 60, binder tapioka 2.5%, dan oven kiln 72 jam stabil 70°C).

---

## 🎨 Arsitektur Visual & Desain Sistem

- **Tema Warna:** *Ember & Ash Industrial Export*
  - **Neutral Canvas (`#17120F`)**: Substrat arang gelap industrial penyerap silau.
  - **Primary Ember (`#C4440F`)**: Aksen bara api bersuhu tinggi untuk konversi utama.
  - **Secondary Glow (`#FF8A52`)**: Pendaran prapembakaran dan sorotan interaktif.
  - **Verified Green (`#2F6B4F`, `#96D4B2`)**: Status kelulusan uji lab SGS dan IMO Non-DG.
  - **Ash White Paper (`#F5F1EA`)**: Lembar fisik kontras tinggi untuk lembar sertifikat COA dan kalkulator kontainer.
- **Tipografi 4-Lapis:**
  - `Montserrat`: Judul utama berwibawa dan kuat.
  - `EB Garamond` (Italic): Aksen puitis narasi provenance dan mutu.
  - `Inter`: Keterbacaan optimal untuk deskripsi kontrak ekspor.
  - `Geist` (Mono): Tampilan data numerik tabular (kode HS, nilai kalori, CBM kontainer, tonase).
- **Komponen Modern (Referensi 21st.dev & shadcn/ui):**
  - *Dual Split-Screen Comparison Slider* (abu batok murni vs oplosan).
  - *Marquee Telemetry Ticker* (status resmi, NIB, pelabuhan, IMO Non-DG).
  - *Number Ticker* (metrik lab & kapasitas output).
  - *Interactive 3D WebGL Briquette* (`three.js`).
  - *CAD Blueprint Vector Diagram* (dimensi presisi pemotongan $\pm 0.5\text{ mm}$).
  - *Soft-Gated Quote Vault* (pembukaan draf penawaran FOB dan direct WhatsApp RFQ).

---

## 📐 Struktur Halaman & Fitur Utama

```
src/app/
├── layout.tsx                                    # Shell Global + Marquee Telemetri + Navbar
├── page.tsx                                      # Homepage: Hero 3D WebGL Briket + Bento Grid
├── products/
│   ├── page.tsx                                  # Katalog Multi-Komoditas Ekspor
│   ├── 100-briket-arang-batok-kelapa/
│   │   └── page.tsx                              # Inti PRD: Pusat Verifikasi Mutu Briket Platinum
│   ├── green-coffee/page.tsx                     # Specialty Green Coffee Mandheling & Gayo
│   └── whole-spices/page.tsx                     # Maluku Lalpari Cloves & Cassia Vera AA
├── oem-studio/page.tsx                           # 2.5D OEM Box Dieline Studio (Kraft, Black, White + Foil)
├── container-planner/page.tsx                    # Simulator Muatan 20ft & 40ft HC + Soft-Gated RFQ
├── factory-audit/page.tsx                        # Transparansi 5 Tahap Manufaktur, Telemetri Suhu & Peta Port
├── admin/rfq/page.tsx                            # Deal Desk & RFQ Pipeline Dashboard
└── api/v1/
    ├── commodities/[slug]/route.ts               # REST API Endpoint Sesuai PRD Section 8
    └── rfq/route.ts                              # RFQ Inquiries Dispatcher
```

---

## 🗄️ Basis Data Relasional PostgreSQL 16 (Supabase)

Skema basis data lengkap dan seeder siap dieksekusi langsung di SQL Editor Supabase:
- **DDL Skema:** [`database/schema.sql`](file:///d:/Template/Export-Import/Template-the%20agro-and-charcoal-industrial-series/Template-2/database/schema.sql)
- **Data Seed Briket Platinum:** [`database/seed.sql`](file:///d:/Template/Export-Import/Template-the%20agro-and-charcoal-industrial-series/Template-2/database/seed.sql)

---

## 🚀 Menjalankan Proyek Secara Lokal

```bash
# Masuk ke direktori
cd "d:\Template\Export-Import\Template-the agro-and-charcoal-industrial-series\Template-2"

# Jalankan mode pengembangan:
pnpm run dev

# Jalankan mode build produksi:
pnpm run build
pnpm run start
```

Buka peramban di: `http://localhost:3000`
- Detail Briket Arang: `http://localhost:3000/products/100-briket-arang-batok-kelapa`
- Studio Kemasan OEM: `http://localhost:3000/oem-studio`
- Container Planner: `http://localhost:3000/container-planner`
- Deal Desk Admin: `http://localhost:3000/admin/rfq`
- API Endpoint: `http://localhost:3000/api/v1/commodities/100-briket-arang-batok-kelapa`
