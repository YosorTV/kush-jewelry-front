import { STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { validateLocale } from '@/lib/locale-utils';
import { PageProps } from '@/types/app/page.types';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export const getHomeData = async ({ locale: rawLocale }: PageProps['params']): Promise<any> => {
  const locale = validateLocale(rawLocale);
  
  const homeQP = generateStrapiQuery(STRAPI_QUERIES.HOME({ locale }));

  const response = await getStrapiData(STRAPI_ENTRIES.home, homeQP);

  return { data: response };
};
