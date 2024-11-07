import { getRequestConfig } from 'next-intl/server';
import { routing } from './navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as 'uk' | 'en';

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { messages };
  } catch (error) {
    return { messages: {} };
  }
});
