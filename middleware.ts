import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil token dari cookie (sesuaikan nama cookie dengan yang Anda set di AuthContext/Login)
  // Di AuthContext sebelumnya kita pakai localStorage (Client Side),
  // Middleware (Server Side) tidak bisa baca localStorage.
  // JIKA Anda belum set cookie saat login, token ini akan selalu undefined.
  // Tapi untuk logika redirect "Sudah Login" -> Home, ini tidak apa-apa untuk sekarang.
  const token = request.cookies.get('token')?.value; 
  const { pathname } = request.nextUrl;

  // --- HAPUS LOGIKA PROTEKSI HALAMAN UTAMA DI SINI ---
  // Kita biarkan user akses '/' tanpa token.

  // 2. REDIRECT JIKA SUDAH LOGIN
  // Jika user SUDAH login dan mencoba buka '/login' atau '/register',
  // kembalikan ke halaman utama ('/').
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Update Matcher:
  // Kita hanya perlu memantau halaman auth untuk redirect otomatis
  matcher: ['/login', '/register'], 
};