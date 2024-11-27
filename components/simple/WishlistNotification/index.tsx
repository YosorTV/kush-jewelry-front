import { FC } from 'react';

import { NextLink, Title } from '@/components/elements';

import { getWishlistNotiifcation } from '@/services/api/get-wishlist-notification';

interface IWishlistNotification {
  locale: string;
}

export const WishlistNotification: FC<IWishlistNotification> = async ({ locale }) => {
  const { data } = await getWishlistNotiifcation({ locale });

  return (
    <div className='flex flex-col gap-y-10'>
      <Title level='3' variant='subheading' className='!text-xl'>
        {data?.title}
      </Title>
      {data?.description && <p className='text-base text-base-200'>{data?.description}</p>}
      <NextLink href={data?.link?.url} title={data?.link?.text} replace={data?.link?.isExternal} className='auth-link'>
        {data?.link?.text}
      </NextLink>
    </div>
  );
};
