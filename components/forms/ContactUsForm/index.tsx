'use client';

import { FC } from 'react';

import { schemas } from '@/lib';
import { contactUs } from '@/services';

import { SubmitButton } from '@/components/simple';
import { Form, Input } from '@/components/elements';

interface IContactUsForm {
  data: any;
  locale: string;
  submit: any;
}

export const ContactUsForm: FC<IContactUsForm> = ({ data, locale, submit }) => {
  const schema = schemas.contacts(locale);

  const printInput = (input: any) => <Input key={input.id} {...input} />;

  return (
    <Form id='contactus-password-form' method='post' schema={schema} action={contactUs} className='w-full'>
      <Input hidden readOnly name='locale' value={locale} className='hidden' />
      <div className='flex flex-col gap-y-6'>{data.map(printInput)}</div>
      <SubmitButton text={submit.text} loadingText={submit.loadingText} className='auth-form_submit !my-6' />
    </Form>
  );
};
