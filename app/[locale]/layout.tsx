import { getMessages, setRequestLocale } from 'next-intl/server';

import { LayoutProps } from '@/types/app/layout.types';

import BaseLayout from '@/components/layouts/Base';

import { auth } from '@/auth';
import { getCurrency, getLayoutData } from '@/services';
import { pageViewAction } from '@/services/actions/pageViewAction';
import { postMetaAction } from '@/services/actions/getMetaAction';

export default async function GlobalLayout({ children, params }: LayoutProps) {
  const { locale = 'uk' } = params;

  setRequestLocale(locale ?? 'uk');

  const [data, messages, currency, session] = await Promise.all([
    getLayoutData({ locale }),
    getMessages(),
    getCurrency(),
    auth()
  ]);

  await postMetaAction(pageViewAction);

  return (
    <BaseLayout
      locale={locale}
      session={session}
      currency={currency}
      messages={messages}
      header={data?.header}
      footer={data?.footer}
      cart={data?.shoppingCart}
    >
      {children}
    </BaseLayout>
  );
}
