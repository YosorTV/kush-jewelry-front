'use client';

import { Form, Input, Title } from '@/components/elements';
import { SubmitButton } from '@/components/simple';
import { schemas } from '@/lib/zod';
import { resetPassword } from '@/services';

export const ResetForm = ({ data, code, locale }: any) => {
  const schema = schemas.resetPassword(locale);

  const printInputs = (inputs: any) => {
    return inputs?.map((input: any) => <Input validation={input.name === 'password'} key={input.id} {...input} />);
  };

  return (
    <Form
      schema={schema}
      method='post'
      id='reset-password'
      action={resetPassword}
      className='auth-page_form absolute-center h-full'
    >
      <div className='relative w-full'>
        <Title level='1' className='auth-form_title'>
          {data.title}
        </Title>
        <div className='flex flex-col gap-y-5 py-2.5'>
          <Input type='hidden' name='locale' value={locale} containerClass='hidden' />
          <Input type='hidden' name='code' containerClass='hidden' value={code} />
          {printInputs(data.formFields)}
        </div>
        <SubmitButton
          className='auth-form_submit !mt-5'
          text={data.submitBtn?.text}
          loadingText={data.submitBtn?.loadingText}
        />
      </div>
    </Form>
  );
};
