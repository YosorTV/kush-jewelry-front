import { DEFAULT_LOCALE, META_FIELDS } from '@/helpers/constants';

export const metaQuery = ({ locale = DEFAULT_LOCALE }) => ({
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
});
