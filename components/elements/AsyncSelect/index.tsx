'use client';

import { FC } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

import { cn } from '@/lib';

import { ClassNamesType, SelectProps } from '@/types/components/elements/select.types';

const classes: ClassNamesType = {
  container: () => 'w-full disabled:cursor-not-allowed disabled:opacity-50',
  singleValue: () => '!text-base-200',
  valueContainer: () => '!text-white !p-0',
  input: () => '!text-base-200',
  menu: () => '!bg-base-100 !rounded-lg mt-1 !z-20',
  control: () => 'flex items-center transition duration-150 !bg-base-100 !min-w-80 !input !input-bordered',
  option: (state) => {
    return cn('cursor-pointer px-4 py-2 !bg-base-100 !text-base-200 hover:bg-neutral hover:text-base-300', {
      '!bg-neutral !text-base-300': state.isFocused
    });
  }
};

export const AsyncSelect: FC<SelectProps> = ({
  loadOptions,
  onChange,
  value,
  label,
  placeholder = 'Search...',
  disabled = false
}) => {
  return (
    <div className='flex flex-col gap-y-1.5'>
      <span className='text-sm font-medium text-base-200'>{label}</span>
      <AsyncPaginate
        isClearable
        menuPosition='absolute'
        menuPlacement='auto'
        isDisabled={disabled}
        value={value}
        defaultOptions
        className={cn(disabled && 'cursor-not-allowed opacity-50')}
        classNames={classes}
        placeholder={placeholder}
        loadOptions={loadOptions}
        onChange={onChange}
        additional={{ page: 1 }}
      />
    </div>
  );
};
