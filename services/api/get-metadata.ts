import { generateStrapiQuery } from '@/lib';
import { validateLocale } from '@/lib/locale-utils';

import { ExtendedMetadata, IGenerateMeta, Seo } from '@/types/services/api';
import { STRAPI_QUERIES } from '../queries';
import { getStrapiData } from '../strapi';

export async function getMetadata({ path, locale: rawLocale }: IGenerateMeta): Promise<ExtendedMetadata> {
  const locale = validateLocale(rawLocale);

  const metaQP = generateStrapiQuery(STRAPI_QUERIES.META({ locale }));
  const { seo }: { seo: Seo } = await getStrapiData(path, metaQP);

  const facebookMeta = seo?.metaSocial?.find((item) => item.socialNetwork === 'Facebook');
  const twitterMeta = seo?.metaSocial?.find((item) => item.socialNetwork === 'Twitter');

  return {
    // Title metadata
    title: {
      default: `KUSH | ${seo?.metaTitle ?? path}`,
      template: '%s | KUSH'
    },
    // Description metadata
    description: seo?.metaDescription ?? 'Discover exclusive collections of luxury jewelry with KUSH',
    // Robots meta tag
    robots: seo?.metaRobots ?? 'index, follow',
    // Keywords for SEO
    keywords: seo?.keywords?.split(',').map((keyword) => keyword.trim()) ?? [],
    // Open Graph metadata (for social sharing)
    openGraph: {
      title: facebookMeta?.title || seo?.metaTitle,
      description: facebookMeta?.description || seo?.metaDescription,
      images: facebookMeta?.image?.url ? [{ url: facebookMeta.image.url }] : [],
      siteName: 'KUSH JEWELRY',
      locale,
      url: seo?.canonicalURL
    },
    // Twitter Card metadata
    twitter: {
      card: 'summary_large_image',
      title: twitterMeta?.title || seo?.metaTitle,
      description: twitterMeta?.description || seo?.metaDescription,
      images: twitterMeta?.image?.url ? [twitterMeta.image.url] : []
    },
    structuredData: seo?.structuredData ? JSON.parse(seo.structuredData) : null,
    // Canonical URL
    alternates: {
      canonical: seo?.canonicalURL ?? ''
    }
  };
}
