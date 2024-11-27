'use client';

import { cormorant } from '@/assets/fonts';
import { Form, Input } from '@/components/elements';
import { SubmitButton } from '@/components/simple';
import { cn, schemas } from '@/lib';
import { subscription } from '@/services';

import { IoIosSend } from 'react-icons/io';

export const SubscribeForm = ({ formField, className, locale }: any) => {
  const schema = schemas.subscription(locale);

  return (
    <Form action={subscription} schema={schema} className={className}>
      <Input name='locale' defaultValue={locale} hidden />
      <Input
        label={formField.label}
        placeholder={formField.placeholder}
        type={formField.type}
        name={formField.name}
        className='w-full'
        labelStyle={cn('text-base flex items-center w-full sm:text-lg xl:text-xl pb-2.5', cormorant.className)}
      >
        <SubmitButton className='absolute right-2' icon={<IoIosSend className='h-6 w-6 fill-base-200' />} />
      </Input>
    </Form>
  );
};
