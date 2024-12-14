import { FC } from 'react';

import { HeroSection } from '@/components/complex';
import { StrapiContentBlock, AnimatedTag } from '@/components/simple';

import { IAboutSection } from '@/types/components';

export const AboutSection: FC<IAboutSection> = ({ title, description, cover, content }) => {
  const heroData = {
    id: 1,
    title,
    description,
    image: cover,
    link: null as null,
    sub_image: null as null,
    __component: 'complex.hero-section'
  };

  return (
    <section className='flex flex-col'>
      <HeroSection data={heroData} />
      {content && (
        <AnimatedTag tag='section' className='flex flex-1 flex-col gap-5 pb-10'>
          <StrapiContentBlock content={content} imageClass='h-md' />
        </AnimatedTag>
      )}
    </section>
  );
};
