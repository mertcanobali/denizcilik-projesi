import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Yönlendirme URL'sini (Base URL) al
  const url = new URL('/login', request.url);
  
  // Çıkış yapıldığı için cookie'yi silip login'e yönlendiriyoruz
  const response = NextResponse.redirect(url, { status: 302 });
  response.cookies.delete('session');
  
  return response;
}
