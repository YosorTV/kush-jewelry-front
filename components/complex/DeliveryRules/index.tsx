import AnimatedTag from '@/components/simple/AnimatedTag';
import { RuleCard } from '@/components/simple/RuleCard';
import { getDeliveryData } from '@/services/api/get-delivery';
import { FC } from 'react';

interface IDeliveryRules {
  locale: string;
}

export const DeliveryRules: FC<IDeliveryRules> = async ({ locale = 'uk' }) => {
  const { data } = await getDeliveryData({ locale });

  const printRule = (rule: any) => (
    <RuleCard key={rule.id} icon={rule.icon} title={rule.title} description={rule.description} />
  );

  return (
    <AnimatedTag tag='section' className='mt-6 flex w-svw flex-col gap-y-6 bg-neutral px-2.5 py-5 md:px-5 xl:flex-row'>
      {data.rules.map(printRule)}
    </AnimatedTag>
  );
};
