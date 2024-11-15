import { formatPrice } from '@/helpers/formatters';
import { cn } from '@/lib';
import { FC } from 'react';

interface IPrice {
  price: number;
  sale?: number;
  currency: any;
  className?: string;
  textClassName?: string;
}

export const Price: FC<Readonly<IPrice>> = ({
  price = 0,
  sale = 0,
  currency,
  className,
  textClassName = 'text-base-200'
}) => {
  const discountAmount = price * (sale / 100);
  const originalPrice = formatPrice(price, currency);
  const salePrice = formatPrice(price - discountAmount, currency);

  return (
    <p
      aria-label={`Price: ${price}`}
      className={cn('flex flex-col-reverse items-start gap-x-5 xs:flex-row', className)}
    >
      {sale > 0 && <span className={cn('text-sm md:text-base', textClassName)}>{salePrice}</span>}
      <span className={cn('text-base md:text-lg', sale > 0 && 'line-through', textClassName)}>{originalPrice}</span>
    </p>
  );
};
