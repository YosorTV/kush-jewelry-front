'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { Session } from 'next-auth';
import { toast } from 'sonner';

import { HeartIcon } from '@/assets/icons';
import { Button } from '@/components/elements';

import { cn } from '@/lib';
import addToWishlist from '@/services/actions/addToWishlist';

interface IWishlist {
  productId: number;
  locale: string;
  inWishlist: boolean;
  text?: string;
  session: Session;
  className?: string;
}

export const Wishlist: FC<IWishlist> = ({ productId, text, locale, session = null, inWishlist = false, className }) => {
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
      const { message } = await addToWishlist({
        locale,
        productId,
        userId: Number(session.user.id),
        access_token: session.accessToken
      });

      if (message) {
        toast.success(message);
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
