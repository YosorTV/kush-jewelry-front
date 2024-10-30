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

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/', '/(uk|en)/:path*']
};
