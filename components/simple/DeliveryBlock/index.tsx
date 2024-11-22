import { Accordion } from '@/components/elements';
import { getDeliveryData } from '@/services/api/get-delivery';
import { FC } from 'react';

interface IDeliveryBlock {
  locale: string;
}

export const DeliveryBlock: FC<IDeliveryBlock> = async ({ locale = 'uk' }) => {
  const { data: delivery } = await getDeliveryData({ locale });

  const DELIVERY_OPTIONS = [
    {
      title: delivery?.title,
      component: <p className='whitespace-pre-line text-pretty text-base-200'>{delivery?.description}</p>
    }
  ];

  return <Accordion data={DELIVERY_OPTIONS} />;
};
