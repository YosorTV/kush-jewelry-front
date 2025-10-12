'use client';

import { FC, useState } from 'react';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';

import { cn } from '@/lib';

interface InputProps extends PhoneInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  error?: boolean;
  className?: string;
  defaultValue?: string;
}

export const InputPhone: FC<InputProps> = ({ defaultValue, id, name, placeholder, error, className, ...rest }) => {
  const [value, setValue] = useState<string>(defaultValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <PhoneInput
      autoFormat
      value={value}
      onChange={handleChange}
      inputProps={{
        id,
        name,
        placeholder,
        type: 'tel'
      }}
      key={id}
      excludeCountries={['ru', 'by']}
      country='ua'
      onlyCountries={['ua']}
      countryCodeEditable={false}
      regions={['europe']}
      autocompleteSearch
      dropdownClass='top-10 !rounded-lg !bg-base-100 md:!w-72 !w-[90vw]'
      buttonClass='!bg-transparent hover:!bg-transparent !border-none !outline-none'
      inputClass={cn(
        '!pl-12 !input !input-bordered !w-full !cursor-pointer !placeholder:text-gray-500',
        error && '!border-error',
        className
      )}
      {...rest}
    />
  );
};
