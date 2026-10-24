import { NextRequest, NextResponse } from 'next/server';
import { BRIQUETTE_COMMODITY_DATA } from '@/lib/commodityData';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // 1. Check Supabase table 'commodities' first if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('commodities')
        .select('*')
        .eq('id', slug)
        .maybeSingle();

      if (!error && data) {
        return NextResponse.json(
          {
            success: true,
            data: {
              id: data.id,
              name: data.name,
              nameEn: data.specifications?.nameEn || data.name,
              category: data.specifications?.category || 'Export Commodity',
              hsCode: data.hs_code,
              origin: data.origin,
              fobPrice: data.specifications?.fobPrice || `$${data.fob_price_min} - $${data.fob_price_max} / MT`,
              moq: data.specifications?.moq || '1x 20ft FCL',
              image: data.image_url,
              videoUrl: data.specifications?.videoUrl || '',
              status: data.specifications?.status || 'ACTIVE',
              specs: data.specifications?.specs || [],
              model3d: data.specifications?.model3d || (data.model_3d_url ? { enabled: true, fileUrl: data.model_3d_url } : undefined),
            },
          },
          {
            status: 200,
            headers: {
              'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
            },
          }
        );
      }
    } catch (err) {
      console.warn('Failed to query commodity from Supabase:', err);
    }
  }

  // 2. Fallback to hardcoded briket specs
  if (slug === '100-briket-arang-batok-kelapa' || slug === 'briket-kelapa') {
    return NextResponse.json(
      {
        success: true,
        data: BRIQUETTE_COMMODITY_DATA,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: 'Commodity not found',
    },
    { status: 404 }
  );
}
