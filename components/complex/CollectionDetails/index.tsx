import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { FC } from 'react';

import { Title } from '@/components/elements';
import { ProductCard, StrapiContentBlock, StrapiImage } from '@/components/simple';

import { auth } from '@/auth';
import { getCurrency } from '@/services';
import { IImageFormats, Product } from '@/types/components';

interface ICollectionDetails {
  title?: string;
  content?: BlocksContent;
  products?: any[];
  cover: {
    formats: IImageFormats;
    url: string;
    alternativeText?: string;
  };
}

export const CollectionDetails: FC<ICollectionDetails> = async ({ content, title, cover, products = [] }) => {
  const session = await auth();
  const currency = await getCurrency();

  const printProduct = (product: Product) => {
    return <ProductCard session={session} product={product} key={product.id} currency={currency} />;
  };

  return (
    <article className='flex flex-col'>
      <div className='relative w-full h-full aspect-video max-h-[60dvh]'>
        <Title level='1' variant='heading' className='absolute-center z-10 text-base-300'>
          {title}
        </Title>
        <StrapiImage
          fill
          overlay
          priority
          formats={cover.formats}
          src={cover.url}
          alt={cover?.alternativeText}
          className='absolute aspect-video h-full w-full object-cover'
        />
      </div>
      <div className='flex flex-col gap-10 py-10'>
        {content && (
          <section className='flex flex-1 flex-col gap-5'>
            <StrapiContentBlock content={content} />
          </section>
        )}
        {products.length > 0 && (
          <section className='grid h-min w-full grid-cols-fluid gap-5 px-6'>{products.map(printProduct)}</section>
        )}
      </div>
    </article>
  );
};
