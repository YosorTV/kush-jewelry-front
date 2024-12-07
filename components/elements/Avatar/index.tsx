import { FC } from 'react';

import { getInitials } from '@/helpers/formatters';

import { IAvatar } from '@/types/components';

export const Avatar: FC<IAvatar> = ({ firstName, lastName }) => {
  const sign = getInitials({ firstName, lastName });

  return (
    <figure
      title={sign}
      className='flex h-6 w-6 items-center justify-center rounded-full bg-neutral p-5 text-base font-semibold text-white'
    >
      {sign}
    </figure>
  );
};
