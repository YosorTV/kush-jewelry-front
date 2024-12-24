import { auth } from '@/auth';
import { generateStrapiQuery } from '@/lib';
import { Product } from '@/types/components';
import { ISlugQuery } from '@/types/services/quries';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';
import { getWishlistProducts } from './get-wished-products';
import { generateProductMetaTags } from '@/helpers';

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
        pageSize: '8'
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

  const metaTags = generateProductMetaTags(data?.[0]);

  const facebookMeta = data?.[0]?.seo?.metaSocial?.find((item: any) => item.socialNetwork === 'Facebook');
  const twitterMeta = data?.[0]?.seo?.metaSocial?.find((item: any) => item.socialNetwork === 'Twitter');

  return {
    title: {
      default: `KUSH | ${data[0]?.seo?.metaTitle.toUpperCase()}`,
      template: '%s | KUSH'
    },
    openGraph: {
      title: facebookMeta?.title ?? data[0]?.seo?.metaTitle,
      description: facebookMeta?.description.toLowerCase() ?? data[0]?.seo?.metaDescription.toLowerCase(),
      url: `${data[0]?.seo?.canonicalURL}`,
      images: [data[0]?.seo?.metaImage],
      siteName: 'KUSH JEWELRY',
      id: String(data?.[0]?.id),
      locale
    },
    twitter: {
      card: 'summary_large_image',
      id: String(data?.[0]?.id),
      title: twitterMeta?.title || data?.[0]?.metaTitle,
      description: twitterMeta?.description?.toLowerCase() || data?.[0]?.metaDescription.toLowerCase(),
      images: twitterMeta?.image?.url ? [twitterMeta.image.url] : []
    },
    id: String(data?.[0]?.id),
    description: data[0]?.seo?.metaDescription ?? 'No description',
    robots: data[0]?.seo?.metaRobots ?? '',
    keywords: data[0]?.seo?.keywords?.split(',').map((keyword: string) => keyword.trim()) ?? [],
    other: metaTags.reduce((acc: Record<string, string>, tag) => {
      acc[tag.property] = tag.content;
      return acc;
    }, {})
  };
}
