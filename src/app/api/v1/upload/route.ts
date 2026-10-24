import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

// Strict Whitelist of Allowed Extensions & MIME Types
const ALLOWED_IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const ALLOWED_3D_EXTS = new Set(['.glb', '.gltf', '.bin', '.obj']);

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_3D_SIZE_BYTES = 35 * 1024 * 1024;    // 35 MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const uploadType = (formData.get('type') as string) || 'image';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Tidak ada file yang diunggah.' },
        { status: 400 }
      );
    }

    const originalName = file.name || 'file';
    const ext = path.extname(originalName).toLowerCase();

    // 1. Validation based on upload type
    let targetFolder = 'commodities';
    if (uploadType === '3d-model') {
      targetFolder = 'models';
      if (!ALLOWED_3D_EXTS.has(ext)) {
        return NextResponse.json(
          {
            success: false,
            error: `Format 3D tidak diizinkan (${ext}). Gunakan format .glb, .gltf, atau .obj.`,
          },
          { status: 400 }
        );
      }
      if (file.size > MAX_3D_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            error: `Ukuran file 3D terlalu besar (${(file.size / 1024 / 1024).toFixed(1)} MB). Maksimal 35 MB.`,
          },
          { status: 400 }
        );
      }
    } else {
      // Image upload
      targetFolder = 'commodities';
      if (!ALLOWED_IMAGE_EXTS.has(ext)) {
        return NextResponse.json(
          {
            success: false,
            error: `Format gambar tidak diizinkan (${ext}). Gunakan format .webp, .png, atau .jpg.`,
          },
          { status: 400 }
        );
      }
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            error: `Ukuran gambar terlalu besar (${(file.size / 1024 / 1024).toFixed(1)} MB). Maksimal 10 MB.`,
          },
          { status: 400 }
        );
      }
    }

    // 2. Generate cryptographically safe unique filename
    const safePrefix = uploadType === '3d-model' ? 'model' : 'img';
    const randomHex = crypto.randomBytes(6).toString('hex');
    const safeFilename = `${safePrefix}_${Date.now()}_${randomHex}${ext}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Check if Supabase Storage is configured (Cloud Storage Mode)
    if (isSupabaseConfigured && supabase) {
      try {
        const bucketName = 'commodity-assets';
        const storagePath = `${targetFolder}/${safeFilename}`;

        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(storagePath, buffer, {
            contentType: file.type || 'application/octet-stream',
            upsert: true,
          });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(storagePath);

          if (publicUrlData?.publicUrl) {
            return NextResponse.json({
              success: true,
              url: publicUrlData.publicUrl,
              filename: safeFilename,
              size: file.size,
              type: uploadType,
              storage: 'supabase',
            });
          }
        } else {
          console.warn('Supabase storage upload error, falling back to local:', uploadError.message);
        }
      } catch (storageErr) {
        console.warn('Supabase storage exception, falling back to local:', storageErr);
      }
    }

    // 4. Fallback: Save to Local Filesystem
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', targetFolder);
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, safeFilename);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${targetFolder}/${safeFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: safeFilename,
      size: file.size,
      type: uploadType,
      storage: 'local',
    });
  } catch (error) {
    console.error('File Upload Error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat memproses unggahan file di server.' },
      { status: 500 }
    );
  }
}
