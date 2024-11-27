import { Title } from '@/components/elements';
import { FC } from 'react';
import { FaRegClock, FaShippingFast } from 'react-icons/fa';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';

interface IRuleCard {
  icon: 'clock' | 'protect' | 'delivery';
  title: string;
  description: string;
}

type IIconType = { [key in IRuleCard['icon']]: JSX.Element };

export const RuleCard: FC<IRuleCard> = ({ icon, title, description }) => {
  const iconClasses = 'absolute -top-1 h-6 w-6 md:h-8 md:w-8 stroke-white fill-white xl:top-1/4';

  const Icon: IIconType = {
    clock: <FaRegClock className={iconClasses} />,
    protect: <IoShieldCheckmarkOutline className={iconClasses} />,
    delivery: <FaShippingFast className={iconClasses} />
  };

  return (
    <figure className='relative flex w-full items-center md:items-start'>
      {Icon[icon]}
      <figcaption className='mx-10 flex w-full flex-col md:mx-16 md:gap-y-3'>
        {title && (
          <Title level='4' className='!text-xs uppercase !text-white md:!text-base'>
            {title}
          </Title>
        )}
        {description && <p className='hidden w-96 text-sm font-medium text-white xl:flex'>{description}</p>}
      </figcaption>
    </figure>
  );
};
