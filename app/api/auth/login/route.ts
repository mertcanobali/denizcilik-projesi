import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email ve şifre zorunludur' }, { status: 400 });
    }

    const company = await prisma.company.findUnique({
      where: { email },
    });

    if (!company) {
      return NextResponse.json({ error: 'Böyle bir şirket bulunamadı' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, company.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Hatalı şifre' }, { status: 401 });
    }

    // Token oluştur
    const token = await encrypt({ id: company.id, email: company.email, name: company.name });

    // Cookie'ye yaz
    const response = NextResponse.json({ success: true, redirect: '/dashboard' });
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 saat
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 });
  }
}
