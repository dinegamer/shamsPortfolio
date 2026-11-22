import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';
import { maintenanceBamakoPath } from './lib/service-routes';

const routing = {
  locales: [...locales],
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false
} as const;

const localizedMiddleware = createMiddleware(routing);
// This French-only service has no English alternate. Preserve all other locale routing.
const singleLocaleMiddleware = createMiddleware({ ...routing, alternateLinks: false });

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, '');
  if (pathname === maintenanceBamakoPath || locales.some((locale) => pathname === `/${locale}${maintenanceBamakoPath}`)) {
    return singleLocaleMiddleware(request);
  }
  return localizedMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
