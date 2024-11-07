import { LOCALES, LOCALES_PREFIX } from '@/helpers/constants';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  defaultLocale: 'uk',
  locales: LOCALES,
  localePrefix: LOCALES_PREFIX
});

export const { Link, redirect, usePathname, useRouter, getPathname, permanentRedirect } = createNavigation(routing);
