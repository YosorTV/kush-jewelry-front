import { formatPrice } from '@/helpers/formatters';
import { cn } from '@/lib';
import { FC } from 'react';

interface IPrice {
  price: number;
  sale?: number;
  currency: any;
  className?: string;
  saleClassName?: string;
  containerClass?: string;
}

export const Price: FC<Readonly<IPrice>> = ({
  price = 0,
  sale = 0,
  currency,
  className,
  containerClass = 'flex-row-reverse',
  saleClassName = 'text-base-200'
}) => {
  const discountAmount = price * (sale / 100);
  const originalPrice = formatPrice(price, currency);
  const salePrice = formatPrice(price - discountAmount, currency);

  return (
    <p aria-label={`Price: ${price}`} className={cn('flex items-center gap-3', containerClass)}>
      {sale > 0 && <span className={cn('text-lg', saleClassName)}>{salePrice}</span>}
      <span
        className={cn(
          sale > 0
            ? 'text-sm text-red-500 line-through md:text-sm lg:text-base'
            : 'md:text-md text-base text-base-200 lg:text-lg',
          className
        )}
      >
        {originalPrice}
      </span>
    </p>
  );
};
