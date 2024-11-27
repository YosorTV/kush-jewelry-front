'use client';

import { CloseIcon } from '@/assets/icons';
import { cn } from '@/lib';
import { usePathname } from '@/lib/navigation';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';

interface IModal {
  id: string;
  className?: string;
}

const Modal: FC<PropsWithChildren<IModal>> = ({ id = 'my_modal_3', children, className }) => {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    dialogRef.current = document.getElementById(id) as HTMLDialogElement;

    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [id, pathname]);

  return (
    <dialog ref={dialogRef} id={id} className='modal !rounded-none'>
      <div className={cn('modal-box !rounded-none', className)}>
        <form method='dialog'>
          <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
            <CloseIcon height={24} width={24} className='h-6 w-6' />
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
