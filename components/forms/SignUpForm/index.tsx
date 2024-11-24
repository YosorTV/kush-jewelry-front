'use client';

import { FC } from 'react';

import { schemas } from '@/lib';
import { createUserAction } from '@/services';

import { Form, Input, Title } from '@/components/elements';
import { SubmitButton } from '@/components/simple';

import { StepBack } from '@/components/simple/StepBack';
import { InputProps } from '@/types/components';

interface ISignUpForm {
  formFields: any[];
  title: string;
  className?: string;
  cta: any;
  locale: string;
}

export const SignUpForm: FC<ISignUpForm> = ({ title, formFields, className, locale, cta }) => {
  const schema = schemas.signup(locale);

  const printInputs = (data: InputProps[]) => {
    return data.map((input: InputProps) => {
      return <Input key={input.id} validation={input.type === 'password'} containerClass='col-span-1' {...input} />;
    });
  };

  return (
    <Form
      method='post'
      id='signup-form'
      schema={schema}
      action={createUserAction}
      className='auth-page_form absolute-center h-full'
    >
      <StepBack className='absolute left-5 top-2' />
      <div className='relative w-full'>
        <Title level='1' className='auth-form_title'>
          {title}
        </Title>
        <Input id='locale' name='locale' value={locale} containerClass='hidden' type='text' hidden readOnly />
        <div className='grid grid-cols-1 gap-y-5 pt-5'>{printInputs(formFields)}</div>
        <div className='divider m-0 mb-5 w-full px-5' />
        <SubmitButton text={cta.text} loadingText={cta.loadingText} className='auth-form_submit' />
      </div>
    </Form>
  );
};
