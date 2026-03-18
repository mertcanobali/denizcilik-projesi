import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    return NextResponse.json({ message: "Rapor başarıyla alındı", data });
  } catch (error) {
    return NextResponse.json({ error: "Sistemsel bir hata oluştu" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shipId = searchParams.get("shipId");
  return NextResponse.json({ message: "Geminin günlük raporları getirilecek", shipId });
}
