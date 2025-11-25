import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // 1. PROTEKSI HALAMAN UTAMA (/)
  // Jika user belum login dan berada di halaman utama (root),
  // lempar ke login.
  if (!token && pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. REDIRECT JIKA SUDAH LOGIN
  // Jika user SUDAH login dan mencoba buka '/login' atau '/register',
  // kembalikan ke halaman utama ('/').
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/', request.url)); // <--- Ganti tujuan ke '/'
  }

  return NextResponse.next();
}

export const config = {
  // UPDATE MATCHER:
  // Kita perlu memantau:
  // 1. '/' (Dashboard utama)
  // 2. '/login'
  // 3. '/register'
  matcher: ['/', '/login', '/register'], 
};