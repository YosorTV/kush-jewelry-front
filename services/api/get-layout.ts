import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export const getLayoutData = async ({ locale }: { locale: string }) => {
  const globalQP = generateStrapiQuery(STRAPI_QUERIES.GLOBAL({ locale }));

  const response = await getStrapiData('global', globalQP);

  return response;
};
