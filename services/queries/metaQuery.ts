import { DEFAULT_LOCALE, META_FIELDS } from '@/helpers/constants';
import { validateLocale } from '@/lib/locale-utils';

export const metaQuery = ({ locale: rawLocale = DEFAULT_LOCALE }) => {
  const locale = validateLocale(rawLocale);
  
  return {
    locale,
    populate: {
      seo: {
        fields: META_FIELDS,
        populate: {
          metaSocial: {
            fields: ['socialNetwork', 'title', 'description'],
            populate: {
              image: { fields: ['url', 'alternativeText'] }
            }
          }
        }
      }
    }
  };
};
