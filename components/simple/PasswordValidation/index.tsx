'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib';

type TValidationRule = {
  key: string;
  number: number;
  condition: boolean;
};

interface IPasswordValidation {
  password: string;
  rules: TValidationRule[];
  error: boolean | string;
}

export const PasswordValidation: FC<IPasswordValidation> = ({ error, rules, password }) => {
  const t = useTranslations('validation');

  const ruleStatusClassName = (condition: boolean, error?: boolean | string) => {
    switch (true) {
      case password === '' && !error:
        return 'text-gray-500';
      case condition:
        return 'text-success';
      case error:
        return 'text-error';
      default:
        return 'text-error';
    }
  };

  const printRule = ({ condition, key, number }: TValidationRule) => (
    <li key={key} className={cn(ruleStatusClassName(condition, error))}>
      <sup>*</sup>
      {t(key, { number })}
    </li>
  );

  const sortedRules = [...rules].sort((a, b) => a.key.localeCompare(b.key));

  return (
    <ul className='mt-5 grid list-inside grid-cols-2 gap-2 text-xs lg:grid-cols-1'>
      {sortedRules.map(printRule).sort()}
    </ul>
  );
};
