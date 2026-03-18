import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { shipId, data } = body;

    if (!shipId || !data) {
      return NextResponse.json({ error: 'Eksik veri: shipId ve data gerekli' }, { status: 400 });
    }

    // Mobil uygulamadan gelen JSON verisini doğrudan Report tablosuna kaydet
    const report = await prisma.report.create({
      data: {
        shipId,
        data,
      }
    });

    return NextResponse.json({ success: true, message: 'Rapor başarıyla alındı', reportId: report.id }, { status: 201 });
  } catch (error) {
    console.error('Mobile API Error:', error);
    return NextResponse.json({ error: 'Rapor kaydedilemedi' }, { status: 500 });
  }
}
