import { FC } from 'react';

import { cn, getStatusColor } from '@/lib';
import { IStatusBadge } from '@/types/components';
import { useTranslations } from 'next-intl';

const StatusBadge: FC<IStatusBadge> = ({ status }) => {
  const t = useTranslations('status');

  return <span className={cn('ml-2 rounded-md px-2.5 py-1.5 text-white', getStatusColor(status))}>{t(status)}</span>;
};

export default StatusBadge;
