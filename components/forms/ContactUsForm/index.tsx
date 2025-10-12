'use client';

import { FC } from 'react';

import { schemas } from '@/lib';
import { contactUs } from '@/services';

import { SubmitButton } from '@/components/simple';
import { Form, Input } from '@/components/elements';
import { useEffect, useMemo, useState } from 'react';

interface IContactUsForm {
  data: any;
  locale: string;
  submit: any;
}

export const ContactUsForm: FC<IContactUsForm> = ({ data, locale, submit }) => {
  const schema = schemas.contacts(locale);

  const printInput = (input: any) => <Input key={input.id} {...input} />;

  // 48h lock key per locale to avoid cross-locale conflicts
  const lockKey = useMemo(() => `contactus_lock_${locale}`, [locale]);
  const [lockedUntil, setLockedUntil] = useState<number>(0);
  const isLocked = lockedUntil > Date.now();

  // get the lock key
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(lockKey);
    if (raw) {
      const parsed = parseInt(raw, 10);
      if (!Number.isNaN(parsed)) {
        setLockedUntil(parsed);
      }
    }
  }, [lockKey]);

  // update the lock key
  const handleSuccess = () => {
    if (typeof window === 'undefined') return;
    const fortyEightHoursMs = 48 * 60 * 60 * 1000;
    const until = Date.now() + fortyEightHoursMs;
    window.localStorage.setItem(lockKey, String(until));
    setLockedUntil(until);
  };

  const localeSuccessMessage = useMemo(() => {
    return locale === 'uk'
      ? 'Дякуємо за ваше повідомлення. Команда підтримки отримала ваше повідомлення і відповість вам найближчим часом.'
      : 'Thank you for your message. The support team has received your message and will respond to you as soon as possible.';
  }, [locale]);

  return (
    <Form
      id='contactus-password-form'
      method='post'
      schema={schema}
      action={contactUs}
      className='w-full'
      onSuccess={handleSuccess}
    >
      <Input hidden readOnly name='locale' value={locale} className='hidden' />
      <div className='flex flex-col gap-y-6'>{data.map(printInput)}</div>
      {!isLocked ? (
        <SubmitButton
          text={submit.text}
          loadingText={submit.loadingText}
          className='auth-form_submit !my-6 disabled:cursor-not-allowed disabled:text-white disabled:opacity-50'
          disabled={isLocked}
        />
      ) : (
        <p className='mt-6 bg-success/60 pb-4 pt-3 text-center text-sm text-primary'>*{localeSuccessMessage}</p>
      )}
    </Form>
  );
};
