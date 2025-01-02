import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Periksa token untuk rute yang dilindungi
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dosen') ||
    pathname.startsWith('/mahasiswa')
  ) {
    const token = req.cookies.get('token'); // Ambil token dari cookie

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dosen/:path*', '/mahasiswa/:path*']
};
