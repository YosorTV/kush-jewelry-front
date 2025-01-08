import { generateProductMetaTags } from '@/helpers';

export const metaProductsDataAdapter = ({ data, locale }: any) => {
  if (!data) return [];

  const adaptedData = data.map((item: any) => {
    const metaTags = generateProductMetaTags(item);

    const facebookMeta = item.seo?.metaSocial?.find((item: any) => item.socialNetwork === 'Facebook');
    const twitterMeta = item.seo?.metaSocial?.find((item: any) => item.socialNetwork === 'Twitter');

    return {
      title: {
        default: `KUSH | ${item?.seo?.metaTitle.toUpperCase()}`,
        template: '%s | KUSH'
      },
      openGraph: {
        title: facebookMeta?.title ?? item?.seo?.metaTitle,
        description: facebookMeta?.description.toLowerCase() ?? item?.seo?.metaDescription?.toLowerCase(),
        locale,
        url: `${item?.seo?.canonicalURL}`,
        images: [item?.seo?.metaImage],
        siteName: 'KUSH JEWELRY',
        retailer_item_id: String(item.id)
      },
      twitter: {
        card: 'summary_large_image',
        id: String(item.id),
        title: twitterMeta?.title || item.metaTitle,
        description: twitterMeta?.description?.toLowerCase() || item.metaDescription?.toLowerCase(),
        images: twitterMeta?.image?.url ? [twitterMeta.image.url] : []
      },
      id: String(item.id),
      description: item?.seo?.metaDescription ?? 'No description',
      robots: item?.seo?.metaRobots ?? '',
      keywords: item?.seo?.keywords?.split(',').map((keyword: string) => keyword.trim()) ?? [],
      other: metaTags.reduce((acc: Record<string, string>, tag) => {
        acc[tag.property] = tag.content;
        return acc;
      }, {})
    };
  });

  return adaptedData;
};
