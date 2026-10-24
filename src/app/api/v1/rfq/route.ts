import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function GET() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('rfq_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return NextResponse.json({ success: true, data });
      }
    } catch (err) {
      console.error('Supabase fetch RFQ error:', err);
    }
  }

  return NextResponse.json({ success: true, data: [] });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      buyer_name,
      buyer_company,
      buyer_country,
      buyer_email,
      buyer_whatsapp,
      container_size = '40HC',
      total_metric_tons = 26.0,
      total_master_boxes = 2600,
      incoterm = 'FOB Tanjung Perak',
      target_price = '',
    } = body;

    if (!buyer_name || !buyer_email || !buyer_whatsapp) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required buyer contact fields',
        },
        { status: 400 }
      );
    }

    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNo = `RFQ-${todayStr}-${randomSuffix}`;

    const rfqRecord = {
      reference_no: referenceNo,
      buyer_name,
      buyer_company,
      buyer_country,
      buyer_email,
      buyer_whatsapp,
      container_size,
      total_metric_tons,
      total_master_boxes,
      incoterm,
      target_price,
      status: 'NEW',
      created_at: new Date().toISOString(),
    };

    // If Supabase is configured, persist to PostgreSQL database
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('rfq_inquiries').insert([rfqRecord]);
      } catch (dbErr) {
        console.error('Failed to save RFQ to Supabase:', dbErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: rfqRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request payload',
      },
      { status: 500 }
    );
  }
}
