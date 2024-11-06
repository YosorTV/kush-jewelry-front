import { FC } from 'react';

import { NextLink, Title } from '@/components/elements';

import { getWishlistNotiifcation } from '@/services/api/get-wishlist-notification';

interface IWishlistNotification {
  locale: string;
}

export const WishlistNotification: FC<IWishlistNotification> = async ({ locale }) => {
  const { data } = await getWishlistNotiifcation({ locale });

  return (
    <div className='flex flex-col gap-y-5'>
      <Title level='3'>{data.title}</Title>
      <p className='text-base text-base-200'>{data.description}</p>
      <NextLink
        href={data?.link?.url}
        title={data?.link?.text}
        replace={data?.link?.isExternal}
        className='auth-link uppercase'
      >
        {data?.link?.text}
      </NextLink>
    </div>
  );
};
