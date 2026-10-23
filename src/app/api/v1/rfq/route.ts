import { NextRequest, NextResponse } from 'next/server';

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
      incoterm = 'FOB',
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

    return NextResponse.json(
      {
        success: true,
        data: {
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
          status: 'NEW',
          created_at: new Date().toISOString(),
        },
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
