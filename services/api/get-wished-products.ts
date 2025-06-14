import { DEFAULT_LOCALE, STRAPI_ENTRIES } from '@/helpers/constants';
import { generateStrapiQuery } from '@/lib';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

interface IGetWishlistProducts {
  locale: string;
  userId: number;
  token: string;
  page: string;
  pageSize: string;
}

export const getWishlistProducts = async ({
  locale = DEFAULT_LOCALE,
  userId,
  token,
  page = '1',
  pageSize = '6'
}: IGetWishlistProducts) => {
  const wishlistApi = STRAPI_QUERIES.WISHLIST_PRODUCTS({ locale, userId, page, pageSize });

  const { data = [], meta } = await getStrapiData(STRAPI_ENTRIES.wishlist, generateStrapiQuery(wishlistApi), token);

  return { data, meta };
};
