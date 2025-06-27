import { DEFAULT_LOCALE, IMAGE_FIELDS } from '@/helpers/constants';
import { validateLocale } from '@/lib/locale-utils';

// Home Query
export const homeQuery = ({ locale: rawLocale = DEFAULT_LOCALE }) => {
  const locale = validateLocale(rawLocale);
  
  return {
    locale,
    populate: {
      blocks: {
        populate: {
          products: {
            populate: {
              images: {
                fields: IMAGE_FIELDS,
              },
            },
          },
          image: {
            fields: IMAGE_FIELDS,
          },
          sub_image: {
            fields: IMAGE_FIELDS,
          },
          link: {
            populate: true,
          },
        },
      },
    },
  };
};
