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
      status = 'NEW',
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
      buyer_country: buyer_country || 'International',
      buyer_email,
      buyer_whatsapp,
      container_size,
      total_metric_tons: Number(total_metric_tons) || 26.0,
      total_master_boxes: Number(total_master_boxes) || 2600,
      incoterm,
      target_price,
      status: status || 'NEW',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // If Supabase is configured, persist to PostgreSQL database
    if (isSupabaseConfigured && supabase) {
      try {
        const { error: dbErr } = await supabase.from('rfq_inquiries').insert([rfqRecord]);
        if (dbErr) {
          console.error('Supabase insert rfq error:', dbErr);
        }
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
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Invalid request payload',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { reference_no, status } = body;

    if (!reference_no || !status) {
      return NextResponse.json(
        { success: false, message: 'Missing reference_no or status' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('rfq_inquiries')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('reference_no', reference_no)
        .select();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ success: true, message: 'Updated in memory only' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
