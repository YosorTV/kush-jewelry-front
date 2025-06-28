import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { auth } from '@/auth';

import { PRIVATE_ROUTES, ROOT } from '@/helpers/constants';
import { routing } from './lib/navigation';

const intlMiddleware = createIntlMiddleware(routing);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPrivateRoute = PRIVATE_ROUTES.includes(nextUrl.pathname);

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(ROOT, nextUrl));
  }

  const consentCookie = req.cookies.get('user-preference');
  let response: NextResponse;

  if (!consentCookie) {
    response = intlMiddleware(req);
    response.cookies.set('user-preference', 'accepted', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });
  } else {
    response = intlMiddleware(req);
  }

  // Add image optimization headers
  if (nextUrl.pathname.includes('/images/') || nextUrl.pathname.includes('/_next/image')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Accept-Ranges', 'bytes');
  }

  // Add preload hints for critical images on specific pages
  if (nextUrl.pathname === '/' || nextUrl.pathname.includes('/catalog')) {
    response.headers.set(
      'Link',
      `<${process.env.NEXT_PUBLIC_STRAPI_URL}/uploads/hero-image.webp>; rel=preload; as=image; type=image/webp`
    );
  }

  // Enable Early Hints for supported browsers
  if (req.headers.get('accept')?.includes('image/avif')) {
    response.headers.set('Accept-CH', 'DPR, Viewport-Width, Width');
  }

  return response;
});

export const config = {
  matcher: [
    '/(uk|en)/:path*',
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'next-action' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ],
  api: {
    bodyParser: {
      sizeLimit: '20mb'
    }
  }
};
