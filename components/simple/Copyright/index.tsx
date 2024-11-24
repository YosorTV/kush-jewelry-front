import { NextLink } from '@/components/elements';
import { StrapiLinkType } from '@/types/components';
import { getTranslations } from 'next-intl/server';

export const Copyright = async () => {
  const t = await getTranslations('');

  const currentYear = new Date().getFullYear();

  const systemPages = [
    { id: 1, url: '/terms-conditions', text: t('system.terms'), isExternal: false },
    { id: 2, url: '/privacy-policy', text: t('system.privacy'), isExternal: false }
  ];

  const printLink = (link: StrapiLinkType) => (
    <NextLink href={link.url} title={link.text} key={link.id}>
      {link.text}
    </NextLink>
  );

  return (
    <div className='flex w-full flex-col items-center gap-y-2.5 pt-5'>
      <div className='flex flex-wrap gap-x-6 gap-y-2.5 text-xs text-base-200'>{systemPages.map(printLink)}</div>
      <span className='whitespace-pre-wrap text-xs'>
        {t('copyright.title')} © {currentYear} KUSH. {t('copyright.subTitle')}.
      </span>
    </div>
  );
};
