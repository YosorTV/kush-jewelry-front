import { FC } from 'react';
import { NextLink, Title } from '@/components/elements';
import { getContactUsData } from '@/services/api/get-contact-us';
import { DEFAULT_LOCALE } from '@/helpers/constants';

interface IContactUSBlock {
  locale: string;
  address?: string;
}

export const ContactUsBlock: FC<IContactUSBlock> = async ({ address, locale = DEFAULT_LOCALE }) => {
  const { data } = await getContactUsData({ locale });

  return (
    <ul className='flex flex-col gap-y-6 pb-6'>
      <li className='flex flex-col gap-y-3'>
        <Title level='3'>{data?.emailTitle}</Title>
        <NextLink href={`mailto:${data?.email}`}>{data?.email}</NextLink>
      </li>
      <li className='flex flex-col gap-y-3'>
        <Title level='3'>{data?.phoneTitle}</Title>
        <div className='flex gap-3'>
          <NextLink href={`tel:${data?.primaryPhone}`}>{data?.primaryPhone}</NextLink>
          <NextLink href={`tel:${data?.secondaryPhone}`}>{data?.primaryPhone}</NextLink>
          <NextLink href={`tel:${data?.tertiaryPhone}`}>{data?.tertiaryPhone}</NextLink>
        </div>
      </li>
      {address && (
        <li className='flex flex-col gap-y-3'>
          <Title level='3'>{data?.addressTitle}</Title>
          <address className='not-italic'>{address}</address>
        </li>
      )}
    </ul>
  );
};
