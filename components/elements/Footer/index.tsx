import { FC } from 'react';

import { Copyright, ListOfPages, SiteSettings, SocialLink } from '@/components/simple';

import { NextLink } from '@/elements/Link';
import { Title } from '@/elements/Title';

import { FooterProps } from '@/types/components';
import { SubscribeForm } from '@/components/forms/SubscribeForm';

export const Footer: FC<FooterProps> = ({ data, locale }) => {
  return (
    <footer className='footer relative flex min-h-40 w-full border-t border-info-content bg-base-100 px-6 py-6 drop-shadow-lg'>
      <div className='flex w-full flex-col gap-y-6'>
        <div className='grid w-full grid-cols-1 gap-x-28 gap-y-3 lg:grid-cols-4 lg:gap-y-6'>
          <nav className='flex w-full flex-col gap-y-6 lg:items-start'>
            <Title level='4'>{data.linksGroupTitle}</Title>
            <ListOfPages
              isFooter
              categories={null}
              collections={null}
              pages={data.links}
              className='flex flex-col flex-wrap gap-6 gap-x-6 xs:flex-row lg:flex-col lg:items-start'
            />
          </nav>
          <nav className='flex w-full flex-col pt-3 lg:items-start lg:pt-0'>
            <address className='flex w-full flex-col gap-y-3 not-italic lg:items-start'>
              <Title level='4'>{data.contactGroupTitle}</Title>
              <ul className='flex flex-col justify-center gap-x-6 font-medium lg:items-start lg:justify-start'>
                <li className='flex flex-col flex-wrap justify-start gap-x-6 gap-y-6 py-3 xs:flex-row lg:flex-col lg:justify-start'>
                  <NextLink className='hover:text-base-200' href={`tel:${data.primaryPhone}`}>
                    {data.primaryPhone}
                  </NextLink>
                  <NextLink className='hover:text-base-200' href={`tel:${data.secondaryPhone}`}>
                    {data.secondaryPhone}
                  </NextLink>
                  <NextLink className='hover:text-base-200' href={`tel:${data.tertiaryPhone}`}>
                    {data.tertiaryPhone}
                  </NextLink>
                </li>
                <li className='py-3 hover:text-base-200 sm:whitespace-nowrap lg:max-w-56'>
                  <span>{data.address}</span>
                </li>
              </ul>
            </address>
          </nav>
          <nav className='relative flex h-min w-full items-center gap-x-3 lg:-top-1.5 lg:justify-end'>
            <Title level='4'>{data.socialGroupTitle}</Title>
            <ul className='flex gap-x-6'>
              {data.socialLinks.map((link: any) => (
                <li key={link.id}>
                  <SocialLink id={link.id} format={link.format} url={link.url} isExternal={link.isExternal} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className='flex w-full items-end justify-between gap-x-6 border-t border-info-content pt-5'>
          <SubscribeForm className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4' formField={data.formField} locale={locale} />
          <SiteSettings className='flex items-center gap-x-6 pb-3' />
        </div>
        <Copyright />
      </div>
    </footer>
  );
};
