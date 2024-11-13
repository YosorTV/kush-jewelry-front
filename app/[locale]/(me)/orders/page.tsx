import { Metadata } from 'next';

import { auth } from '@/auth';
import OrdersSection from '@/components/complex/OrdersSection';
import { getOrdersData } from '@/services';
import { PageProps } from '@/types/app/page.types';

import { Title } from '@/components/elements';
import { PaginateController } from '@/components/simple/PaginateController';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  return {
    title: {
      default: `KUSH | ${locale === 'uk' ? 'ЗАМОВЛЕННЯ' : 'ORDERS'}`,
      template: '%s | KUSH'
    }
  };
}

export default async function OrdersPage({ params, searchParams }: PageProps) {
  const { locale } = params;
  const { page, pageSize } = searchParams;

  const session = await auth();
  const t = await getTranslations('system');

  const { data, meta } = await getOrdersData({
    locale,
    email: session.user.email,
    token: session?.accessToken,
    page,
    pageSize
  });

  if (!data) {
    return notFound();
  }

  const isLastPage = meta.pagination.page === meta.pagination.pageCount || !data.length;

  return (
    <section className='mt-10 w-full bg-info-content p-5'>
      <Title level='2' variant='subheading' className='text-center'>
        {t('orders')}
      </Title>
      <div className='divider' />
      <OrdersSection orders={data} emptyTitle={t('emptyList')} />
      <PaginateController
        disabled={isLastPage}
        total={meta.pagination.total}
        perPage={meta?.pagination?.pageSize + meta?.pagination?.pageSize}
      />
    </section>
  );
}
