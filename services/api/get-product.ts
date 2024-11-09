import { auth } from '@/auth';
import { generateStrapiQuery } from '@/lib';
import { Product } from '@/types/components';
import { ISlugQuery } from '@/types/services/quries';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';
import { getWishlistProducts } from './get-wished-products';

export async function getProductData({ locale, slug }: ISlugQuery) {
  const productApi = STRAPI_QUERIES.PRODUCT({ locale, slug });

  const session = await auth();

  const response = await getStrapiData('products', generateStrapiQuery(productApi));

  if (response?.data && response?.data?.length > 0) {
    const product = response.data[0];

    if (session?.user && session?.accessToken) {
      const { data: wishlist } = await getWishlistProducts({
        locale,
        userId: Number(session.user.id),
        token: session.accessToken,
        page: '1',
        pageSize: '5'
      });

      const wishlistProductIds = wishlist
        .flatMap((item: any) => item.products.data)
        .map((product: Product) => product.id);

      return { data: { ...product, inWishlist: wishlistProductIds.includes(product.id) } };
    }

    return { data: { ...product } };
  }

  return { data: null };
}

export async function getProductMeta({ locale, slug }: any) {
  const productMetaApi = STRAPI_QUERIES.META_PRODUCT({ locale, slug });

  const { data } = await getStrapiData('products', generateStrapiQuery(productMetaApi));

  return {
    title: {
      default: `KUSH | ${data[0]?.seo?.metaTitle.toUpperCase()}`,
      template: '%s | KUSH'
    },
    description: data[0]?.seo?.metaDescription ?? '',
    robots: data[0]?.seo?.metaRobots ?? '',
    keywords: data[0]?.seo?.keywords ?? ''
  };
}
