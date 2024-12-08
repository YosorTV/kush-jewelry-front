import { FC } from 'react';

import { HeroSection } from '@/components/complex';
import { StrapiContentBlock, AnimatedTag } from '@/components/simple';

import { IAboutSection } from '@/types/components';

export const AboutSection: FC<IAboutSection> = ({ title, cover, content }) => {
  const heroData = {
    id: 1,
    __component: 'complex.hero-section',
    description:
      'Ювелірний дім KUSH jewelry: це синергія сміливих фантазій дизайнерів та неймовірна точність кожного руху майстрів.',
    title,
    image: cover,
    sub_image: null as null,
    link: null as null
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
