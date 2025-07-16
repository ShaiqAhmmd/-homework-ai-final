import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export default clerkMiddleware((auth, request) => {
  const ref = request.nextUrl.searchParams.get('ref');

  if (ref) {
    const response = NextResponse.next();
    response.cookies.set('referral', ref, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    return response;
  }

  return NextResponse.next();
});

// ✅ This matcher applies Clerk to ALL routes except static
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};