import { FC } from 'react';
import dynamic from 'next/dynamic';

import { CatalogSection, CollectionSection, HeroSection, SpotlightSection } from '@/components/complex';

const ProductList = dynamic(() => import('@/components/simple/ProductList'));

function blockRenderer(block: any, device: string, params: any) {
  switch (block.__component) {
    case 'complex.hero-section':
      return <HeroSection key={block.id} data={block} device={device} />;
    case 'complex.spotlight':
      return <SpotlightSection key={block.id} data={block} />;
    case 'complex.products':
      return <ProductList key={block.id} title={block.title} className='px-5 md:px-6' {...params} />;
    case 'complex.collection-group':
      return <CollectionSection key={block.id} data={block} />;
    case 'complex.category-group':
      return <CatalogSection key={block.id} title={block.title} {...params} />;
    default:
      return null;
  }
}

export const StrapiBlockRender: FC<any> = ({ data = [], device, ...params }: any) => {
  return data.map((block: any) => blockRenderer(block, device, params));
};
