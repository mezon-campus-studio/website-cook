/**
 * Next.js middleware
 * Runs on every request before route handlers
 * Add authentication, logging, or routing logic here
 */

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Example: Add custom headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  // Example: Simple auth check for protected routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('auth_token');
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Skip certain paths
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
