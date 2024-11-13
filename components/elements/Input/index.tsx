'use client';

import { cn } from '@/lib';

import { InputProps } from '@/types/components';

import 'react-phone-input-2/lib/style.css';

import { InputDefault } from '@/components/elements/Input/InputDefault';
import { InputPassword } from '@/components/elements/Input/InputPassword';
import { InputPhone } from '@/components/elements/Input/InputPhone';
import { useMemo } from 'react';
import DatePicker from '../DatePicker';

export const Input = ({
  name,
  className,
  error,
  validation = false,
  placeholder,
  type,
  label,
  labelStyle,
  containerClass,
  isLoading,
  children,
  id,
  ...rest
}: InputProps) => {
  const inputByType = useMemo(() => {
    switch (type) {
      case 'password':
        return (
          <InputPassword
            id={id}
            key={id}
            name={name}
            validation={validation}
            placeholder={placeholder}
            error={Boolean(error)}
            {...rest}
          />
        );

      case 'tel':
        return (
          <InputPhone
            id={id}
            key={id}
            name={name}
            placeholder={placeholder}
            className={className}
            error={Boolean(error)}
            {...(rest as any)}
          />
        );

      case 'date':
        return (
          <DatePicker
            id={id}
            key={id}
            name={name}
            placeholder={placeholder}
            className={className}
            error={Boolean(error)}
            defaultValue={rest?.defaultValue as string}
          />
        );

      default:
        return (
          <InputDefault
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            className={className}
            error={Boolean(error)}
            {...rest}
          />
        );
    }
  }, [className, error, id, name, placeholder, rest, type, validation]);

  return (
    <div className={cn('relative flex flex-col gap-y-2', containerClass, type === 'hidden' && 'hidden')}>
      {label && (
        <label htmlFor={id} className={cn('label label-text p-0', labelStyle)}>
          {label}
        </label>
      )}
      <div className='relative flex'>
        {inputByType}
        {children}
      </div>
      {isLoading && (
        <span className='loading loading-dots loading-md absolute right-3 top-10 md:right-20 md:top-3 lg:right-3' />
      )}
      {error && !validation && <span className='relative text-xs text-error'>{error}</span>}
    </div>
  );
};
