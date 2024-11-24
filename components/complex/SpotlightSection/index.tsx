import { FC } from 'react';

import { SpotlightCarousel } from '@/components/simple';
import AnimatedTag from '@/components/simple/AnimatedTag';

export const SpotlightSection: FC<any> = ({ data }) => {
  return (
    <AnimatedTag tag='section' className='relative flex h-full flex-col bg-neutral'>
      {data?.products?.data?.length > 0 && <SpotlightCarousel title={data.title} data={data.products.data} />}
    </AnimatedTag>
  );
};
