import { FC } from 'react';

import { CatalogSection, CollectionSection, HeroSection, SpotlightSection } from '@/components/complex';

import { ProductList } from '../ProductList';

function blockRenderer(block: any, params: any) {
  switch (block.__component) {
    case 'complex.hero-section':
      return <HeroSection key={block.id} data={block} />;
    case 'complex.spotlight':
      return <SpotlightSection key={block.id} data={block} />;
    case 'complex.products':
      return <ProductList key={block.id} title={block.title} className='px-2.5 md:px-5' {...params} />;
    case 'complex.collection-group':
      return <CollectionSection key={block.id} data={block} />;
    case 'complex.category-group':
      return <CatalogSection key={block.id} title={block.title} {...params} />;
    default:
      return null;
  }
}

export const StrapiBlockRender: FC<any> = ({ data = [], ...params }: any) => {
  return data.map((block: any) => blockRenderer(block, params));
};
