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
      className={cn('flex flex-col-reverse items-baseline gap-2.5 xs:flex-row', className)}
    >
      {sale > 0 && (
        <span className={cn('md:text-md text-base text-base-300 lg:text-lg', textClassName)}>{salePrice}</span>
      )}
      <span
        className={cn(
          sale > 0 ? 'md:text-md text-base line-through lg:text-base' : 'md:text-md text-base lg:text-lg',
          textClassName
        )}
      >
        {originalPrice}
      </span>
    </p>
  );
};
