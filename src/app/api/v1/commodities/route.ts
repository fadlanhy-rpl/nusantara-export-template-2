import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

function parsePrice(str: string) {
  const matches = str.match(/\d+([.,]\d+)?/g);
  if (!matches || matches.length === 0) return { min: 1200, max: 1500 };
  const nums = matches.map((m) => parseFloat(m.replace(/,/g, '')));
  if (nums.length === 1) return { min: nums[0], max: nums[0] };
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

export async function GET() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('commodities')
        .select('*')
        .order('updated_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map((row) => ({
          id: row.id,
          name: row.name,
          nameEn: row.specifications?.nameEn || row.name,
          category: row.specifications?.category || 'Export Commodity',
          hsCode: row.hs_code || '',
          fobPrice: row.specifications?.fobPrice || `$${row.fob_price_min} / MT`,
          moq: row.specifications?.moq || '1x 20ft FCL',
          image: row.image_url || '/img/shisha-charcoal-cutout.png',
          videoUrl: row.specifications?.videoUrl || '',
          status: (row.specifications?.status as 'ACTIVE' | 'DRAFT') || 'ACTIVE',
          specs: row.specifications?.specs || [],
          model3d: row.specifications?.model3d || {
            enabled: !!row.model_3d_url,
            fileUrl: row.model_3d_url || undefined,
            shapePreset: 'cube',
            autoRotate: true,
            rotationSpeed: 1.0,
            surfaceFinish: 'matte_charcoal',
            lightingIntensity: 1.2,
            cameraDistance: 3.8,
          },
        }));

        return NextResponse.json({ success: true, data: mapped });
      }
    } catch (err) {
      console.error('Failed to fetch commodities from Supabase:', err);
    }
  }

  return NextResponse.json({ success: true, data: [] });
}

export async function POST(request: NextRequest) {
  try {
    const item = await request.json();

    if (!item.id || !item.name) {
      return NextResponse.json(
        { success: false, message: 'Missing commodity id or name' },
        { status: 400 }
      );
    }

    const { min, max } = parsePrice(item.fobPrice || '');

    const record = {
      id: item.id,
      name: item.name,
      hs_code: item.hsCode || '4402.90.00',
      origin: 'Indonesia',
      fob_price_min: min,
      fob_price_max: max,
      image_url: item.image || null,
      model_3d_url: item.model3d?.fileUrl || null,
      specifications: {
        nameEn: item.nameEn || item.name,
        category: item.category || 'Export Commodity',
        fobPrice: item.fobPrice || `$${min} / MT`,
        moq: item.moq || '1x 20ft FCL',
        videoUrl: item.videoUrl || '',
        status: item.status || 'ACTIVE',
        specs: item.specs || [],
        model3d: item.model3d || null,
      },
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('commodities').upsert(record);
      if (error) {
        console.error('Supabase commodities upsert error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, data: record }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing commodity id' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('commodities').delete().eq('id', id);
      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'Missing id or status' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured && supabase) {
      // First get existing specifications to merge
      const { data: existing } = await supabase
        .from('commodities')
        .select('specifications')
        .eq('id', id)
        .maybeSingle();

      const newSpecs = {
        ...(existing?.specifications || {}),
        status,
      };

      const { error } = await supabase
        .from('commodities')
        .update({
          specifications: newSpecs,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, id, status }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
