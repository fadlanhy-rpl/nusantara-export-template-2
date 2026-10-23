import { NextRequest, NextResponse } from 'next/server';
import { BRIQUETTE_COMMODITY_DATA } from '@/lib/commodityData';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (slug === '100-briket-arang-batok-kelapa') {
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
