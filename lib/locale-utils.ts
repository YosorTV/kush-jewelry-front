import { DEFAULT_LOCALE, LOCALES } from '@/helpers/constants';

type ValidLocale = typeof LOCALES[number];

/**
 * Validates and sanitizes a locale parameter
 * Returns a valid locale or the default locale if invalid
 */
export const validateLocale = (locale: string | undefined | null): ValidLocale => {
  // Handle undefined, null, or empty strings
  if (!locale || typeof locale !== 'string') {
    console.warn('Invalid locale provided, using default:', DEFAULT_LOCALE);
    return DEFAULT_LOCALE;
  }

  // Clean the locale - remove any unwanted characters or suffixes
  const cleanedLocale = locale.trim().toLowerCase();
  
  // Check for common corrupted values and fix them
  if (cleanedLocale.includes('installhook') || 
      cleanedLocale.includes('.js') || 
      cleanedLocale.includes('.map') ||
      cleanedLocale.length > 5) {
    console.warn('Corrupted locale detected:', locale, '- using default:', DEFAULT_LOCALE);
    return DEFAULT_LOCALE;
  }

  // Check if the locale is in our valid locales list
  if (LOCALES.includes(cleanedLocale as ValidLocale)) {
    return cleanedLocale as ValidLocale;
  }

  // If locale is not valid, return default
  console.warn('Unsupported locale:', locale, '- using default:', DEFAULT_LOCALE);
  return DEFAULT_LOCALE;
};

/**
 * Type guard to check if a string is a valid locale
 */
export const isValidLocale = (locale: string): locale is ValidLocale => {
  return LOCALES.includes(locale as ValidLocale);
};

/**
 * Gets a safe locale from page params or searchParams
 */
export const getSafeLocale = (params: { locale?: string }, searchParams?: { locale?: string }): ValidLocale => {
  // First try params.locale, then searchParams.locale, then default
  const localeFromParams = params?.locale;
  const localeFromSearch = searchParams?.locale;
  
  const validatedLocale = validateLocale(localeFromParams || localeFromSearch);
  
  return validatedLocale;
}; 