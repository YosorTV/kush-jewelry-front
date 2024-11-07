import { Title } from '@/components/elements';
import { StrapiContentBlock } from '@/components/simple';
import { BlocksContent } from '@strapi/blocks-react-renderer';
import { FC } from 'react';

interface IOffertaSection {
  title: string;
  content: BlocksContent;
}

export const OffertaSection: FC<IOffertaSection> = ({ title, content }) => {
  return (
    <section className='container mx-auto my-6 flex flex-col justify-center gap-y-6'>
      <Title level='2' className='text-center'>
        {title}
      </Title>
      <div className='flex flex-col gap-5 p-6'>
        {content && (
          <section className='flex flex-1 flex-col gap-5'>
            <StrapiContentBlock content={content} imageClass='h-2md' />
          </section>
        )}
      </div>
    </section>
  );
};
