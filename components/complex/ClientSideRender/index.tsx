'use client';

import { Toaster } from 'sonner';
import { ExternalScripts } from '@/components/scripts';
import { CookieSection } from '@/components/complex/CookieSection';
import { WishlistNotification } from '@/components/simple';
import { Modal } from '../Modal';

export const ClientSideRender = ({ locale, wishlistData }: { locale: string, wishlistData: any }) => {
  return (
    <>
      <CookieSection />
      <ExternalScripts />
      <Toaster position='bottom-right' richColors closeButton />
      <Modal id='my_modal_3'>
        <WishlistNotification locale={locale} data={wishlistData} />
      </Modal> 
    </>
  )
};
