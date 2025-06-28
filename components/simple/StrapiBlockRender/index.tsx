import { FC } from 'react';

import { CatalogSection, CollectionSection, HeroSection } from '@/components/complex';
import SpotlightSection from '@/components/complex/SpotlightSection';

function blockRenderer(block: any, device: string, params: any) {
  switch (block.__component) {
    case 'complex.hero-section':
      return <HeroSection key={block.id} data={block} device={device} />;
    case 'complex.spotlight':
      return <SpotlightSection key={block.id} data={block} currency={params.currency} locale={params.locale} />;
    case 'complex.collection-group':
      return <CollectionSection key={block.id} data={block} />;
    case 'complex.category-group':
      return <CatalogSection key={block.id} title={block.title} {...params} />;
    default:
      return null;
  }
}

export const StrapiBlockRender: FC<any> = ({ data = [], device, locale, currency, session, ...params }: any) => {
  return data.map((block: any) => blockRenderer(block, device, { ...params, locale, currency, session }));
};
