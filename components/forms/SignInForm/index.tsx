'use client';

import { SignInProviders } from '@/components/complex';
import { Form, Input, NextLink, Title } from '@/components/elements';
import { SubmitButton } from '@/components/simple';
import { schemas } from '@/lib/zod';
import { authUserAction } from '@/services';
import { StrapiLinkType } from '@/types/components';
import { useState } from 'react';

export const SignInForm = ({ data, locale = 'uk' }: any) => {
  const schema = schemas.login(locale);

  const [rememberMe, setRememberMe] = useState(false);

  const printInputs = (data: any) => {
    if (!data) return;

    return data.map((input: any) => (
      <Input autoComplete={input.type === 'email' ? 'email' : 'off'} key={input.id} {...input} />
    ));
  };

  const printProviders = (data: any) => {
    return data.map((provider: any) => (
      <SignInProviders key={provider.id} text={provider.text} identifier={provider.key} />
    ));
  };

  const printLinks = (links: StrapiLinkType[]) => {
    return links.map((link: StrapiLinkType) => (
      <NextLink
        key={link.id}
        href={link.url}
        replace={link.isExternal}
        className='link text-sm text-base-200 no-underline underline-offset-8 hover:underline md:text-base'
      >
        {link.text}
      </NextLink>
    ));
  };

  return (
    <Form
      id='signin-form'
      method='post'
      schema={schema}
      action={authUserAction}
      className='auth-page_form absolute-center h-full'
    >
      <div className='relative w-full pt-24'>
        <Title level='1' className='auth-form_title'>
          {data.title}
        </Title>
        <div className='grid grid-cols-1 gap-y-6'>
          <Input hidden readOnly name='locale' defaultValue={locale} className='hidden' />
          {printInputs(data.formFields)}
        </div>
        <div className='flex w-full items-end justify-between gap-5 py-5'>
          {data.rememberMe && (
            <div>
              <Input
                id={data?.rememberMe?.id}
                name={data.rememberMe.name}
                label={data.rememberMe.label}
                onChange={() => setRememberMe(!rememberMe)}
                type='checkbox'
                defaultChecked={rememberMe}
                className='checkbox checked:fill-base-200'
                labelStyle='text-base-200 text-sm whitespace-nowrap md:text-base cursor-pointer'
                containerClass='flex-row flex-row-reverse justify-end items-center gap-x-3'
              />
            </div>
          )}
          <div className='flex flex-col text-base md:text-lg'>{printLinks(data?.additionalLinks)}</div>
        </div>
        <SubmitButton
          text={data.submitBtn.text}
          loadingText={data.submitBtn.loadingText}
          className='auth-form_submit'
        />
        <div className='divider my-2 px-6' />
        {printProviders(data.providers)}
        <div className='divider my-2 px-6' />
        {data.createAccountLink && (
          <NextLink
            key={data.createAccountLink.id}
            href={data.createAccountLink.url}
            replace={data.createAccountLink.isExternal}
            className='auth-link uppercase'
          >
            {data.createAccountLink.text}
          </NextLink>
        )}
      </div>
    </Form>
  );
};
