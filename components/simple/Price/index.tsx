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
  containerClass,
  saleClassName = 'text-base-200'
}) => {
  const discountAmount = price * (sale / 100);
  const originalPrice = formatPrice(price, currency);
  const salePrice = formatPrice(price - discountAmount, currency);

  return (
    <p
      aria-label={`Price: ${price}`}
      className={cn('flex flex-col-reverse items-baseline gap-2.5 xs:flex-row', containerClass)}
    >
      {sale > 0 && <span className={cn('text-lg', saleClassName)}>{salePrice}</span>}
      <span
        className={cn(
          sale > 0 ? 'text-sm line-through md:text-sm lg:text-base' : 'md:text-md text-base lg:text-lg',
          className
        )}
      >
        {originalPrice}
      </span>
    </p>
  );
};
