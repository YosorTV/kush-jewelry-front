import { FC } from 'react';

import { CollectionCard } from '../CollectionCard';

import Carousel from '@/components/elements/Carousel';
import { cn } from '@/lib';

type PropType = {
  data: any[];
  title?: string;
  slideClass?: string;
  className?: string;
  fill?: string;
  titleClass?: string;
  format: 'standart' | 'mini';
  autoplay?: boolean;
  autoScroll?: boolean;
  loop?: boolean;
};

const CollectionCarousel: FC<PropType> = ({
  data,
  title,
  titleClass,
  autoScroll = false,
  loop = true,
  className = 'w-full',
  slideClass = 'h-full md:h-96',
  fill = 'fill-white',
  format = 'standart'
}) => {
  const printCollectionCard = ({ cover, slug, title, hintText }: any) => {
    return (
      <CollectionCard
        key={slug}
        img={cover}
        slug={slug}
        title={title}
        hintText={hintText}
        className={slideClass}
        textClassName='text-base-200'
      />
    );
  };

  return (
    <Carousel
      fill={fill}
      title={title}
      format={format}
      total={data.length}
      className={className}
      autoScroll={autoScroll}
      options={{ loop }}
      titleClass={cn('text-base-200', titleClass)}
    >
      {data.map(printCollectionCard)}
    </Carousel>
  );
};

export default CollectionCarousel;
