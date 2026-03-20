import { query } from "@/lib/db";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Veritabanından şirketi bul
  const res = await query(
    "SELECT * FROM companies WHERE email = $1 AND password = $2",
    [email, password],
  );
  const user = res.rows[0];

  if (!user) {
    return NextResponse.json(
      { error: "Hatalı e-posta veya şifre" },
      { status: 401 },
    );
  }

  // Session oluştur
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({
    id: user.id,
    email: user.email,
    name: user.name,
  });

  const cookieStore = await cookies();
  cookieStore.set("session", session, { expires, httpOnly: true });

  return NextResponse.json({ message: "Giriş başarılı" });
}
