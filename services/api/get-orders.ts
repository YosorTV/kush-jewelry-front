import { generateStrapiQuery } from '@/lib';
import { getStrapiData } from '../strapi';

import { STRAPI_ENTRIES } from '@/helpers/constants';
import { STRAPI_QUERIES } from '../queries';

interface IGetOrders {
  token: string;
  locale: string;
  email: string;
  page: string;
  pageSize: string;
}

export const getOrdersData = async ({ locale, email, token, page = '1', pageSize = '6' }: IGetOrders): Promise<any> => {
  const orderesQP = generateStrapiQuery(STRAPI_QUERIES.ORDERS({ locale, email, page, pageSize }));

  const response = await getStrapiData(STRAPI_ENTRIES.orders, orderesQP, { token, next: { tags: ['orders'] } });

  return { ...response };
};
