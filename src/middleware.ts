/**
 * Next.js Middleware
 * Auth session yönetimi ve route koruması
 * Ana sayfa redirect: External ziyaretçiler → /montaj-kampanyalarimiz
 */

import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Ana sayfa redirect logic
  if (request.nextUrl.pathname === '/') {
    const referrer = request.headers.get('referer');
    const host = request.headers.get('host');
    
    // Eğer referrer yoksa (direkt giriş, google vb.) veya external referrer ise
    const isExternalOrDirect = !referrer || !referrer.includes(host || '');
    
    // Query param ile ana sayfaya dönüş kontrolü (internal navigation)
    const forceHome = request.nextUrl.searchParams.get('home') === 'true';
    
    if (isExternalOrDirect && !forceHome) {
      // External ziyaretçileri kampanyalara yönlendir
      return NextResponse.redirect(new URL('/montaj-kampanyalarimiz', request.url));
    }
  }
  
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
