'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { Session } from 'next-auth';
import { toast } from 'sonner';

import { HeartIcon } from '@/assets/icons';
import { Button } from '@/components/elements';

import { cn } from '@/lib';
import { postWishlistItem } from '@/services/api/post-wishlist-item';
import { Product } from '@/types/components';

interface IWishlist {
  product: Product;
  locale: string;
  inWishlist: boolean;
  text?: string;
  session: Session;
  className?: string;
}

export const Wishlist: FC<IWishlist> = ({ product, text, locale, session = null, inWishlist = false, className }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [add, setAdd] = useState(inWishlist);

  useEffect(() => {
    dialogRef.current = document.getElementById('my_modal_3') as HTMLDialogElement;
  }, []);

  const handleAdd = async () => {
    if (!Boolean(session?.accessToken) || session?.user === null) {
      dialogRef.current?.showModal();
    } else {
      setAdd((prev) => !prev);

      const { data } = await postWishlistItem({ locale, product });

      if (data) {
        toast.success(data?.message);
      }
    }
  };

  const setColor = (added: boolean) => (added ? 'fill-red-600' : 'fill-base-300');

  return (
    <Button
      onClick={handleAdd}
      className={cn(text && 'btn btn-block !bg-base-200 !text-base-100', className)}
      title='wishlist'
      aria-label='wishlist'
      icon={{
        before: text ? null : <HeartIcon width={20} height={20} className={cn('h-5 w-5', setColor(add))} />
      }}
    >
      {text && text}
    </Button>
  );
};
