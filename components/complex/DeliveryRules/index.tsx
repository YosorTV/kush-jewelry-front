import { FC } from 'react';

import { AnimatedTag, RuleCard } from '@/components/simple';

import { getDeliveryData } from '@/services/api/get-delivery';

interface IDeliveryRules {
  locale: string;
}

export const DeliveryRules: FC<IDeliveryRules> = async ({ locale = 'uk' }) => {
  const { data } = await getDeliveryData({ locale });

  const printRule = (rule: any) => (
    <RuleCard key={rule.id} icon={rule.icon} title={rule.title} description={rule.description} />
  );

  return (
    <AnimatedTag tag='section' className='mt-6 flex w-svw flex-col gap-y-6 bg-neutral px-5 py-6 md:px-6 xl:flex-row'>
      {data.rules.map(printRule)}
    </AnimatedTag>
  );
};
