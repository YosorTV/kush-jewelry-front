import { Title } from '@/components/elements';
import { StrapiContentBlock } from '@/components/simple';

import { BlocksContent } from '@strapi/blocks-react-renderer';
import { FC } from 'react';

interface IRuleSection {
  title?: string;
  content?: BlocksContent;
}

export const RuleSection: FC<IRuleSection> = ({ title, content }) => {
  return (
    <section className='container mx-auto my-6 flex flex-col justify-center gap-y-6'>
      <Title level='1' variant='subheading' className='text-center'>
        {title}
      </Title>
      <StrapiContentBlock content={content} />
    </section>
  );
};
