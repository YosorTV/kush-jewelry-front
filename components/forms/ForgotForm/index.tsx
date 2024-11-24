'use client';

import { forgotPassword } from '@/services';

import { schemas } from '@/lib/zod';

import { Form, Input, NextLink, Title } from '@/components/elements';
import { StepBack, SubmitButton } from '@/components/simple';

export const ForgotForm = ({ data, locale }: any) => {
  const schema = schemas.forgotUserPassword(locale);

  const printInput = (input: any) => <Input key={input.id} {...input} />;

  return (
    <Form
      id='forgot-password-form'
      method='post'
      schema={schema}
      action={forgotPassword}
      className='auth-page_form absolute-center h-full'
    >
      <StepBack className='absolute left-5 top-20' />
      <Title level='1' className='auth-form_title'>
        {data.title}
      </Title>
      <div className='mx-auto flex w-full flex-col py-10 md:w-3/4'>
        <Input hidden readOnly name='locale' value={locale} className='hidden' />
        {data.formFields.map(printInput)}
      </div>
      <div className='w-full md:w-3/4'>
        <SubmitButton
          text={data.submitBtn.text}
          loadingText={data.submitBtn.loadingText}
          className='auth-form_submit'
        />
        <div className='divider m-0 w-full px-5' />
        <NextLink className='auth-link' href={data.loginUrl.url} replace={data.loginUrl.isExternal}>
          {data.loginUrl.text}
        </NextLink>
      </div>
    </Form>
  );
};
