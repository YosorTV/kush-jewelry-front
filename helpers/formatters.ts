import { DEFAULT_LOCALE } from './constants';

export const formatPrice = (amount: number, currency: number) => {
  let formattedAmount = new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH'
  }).format(Number(currency) * amount);

  formattedAmount = formattedAmount.replace('грн', '₴');

  const [integerPart, fractionalPart] = formattedAmount.split('.');

  return fractionalPart === '00' ? integerPart : formattedAmount;
};

export const formatTotalAmount = (data: any[]) => {
  if (!data) return null;

  const totalPrice = data.reduce((prev, item) => {
    return prev + item.quantity * item.unit_amount;
  }, 0);

  return { totalPrice };
};

export const formatDate = (date: Date) => {
  const fullDate = new Date(date);

  const day = String(fullDate.getDate()).padStart(2, '0');
  const month = String(fullDate.getMonth() + 1).padStart(2, '0');
  const year = fullDate.getFullYear();

  return `${day}.${month}.${year}`;
};

export const formatBySlug = (data: any[], slug: string) => {
  if (!data) return [];

  return data.filter((element) => element?.slug === slug);
};

export const gridCols = (index: number) => {
  if (index % 5 === 0 && index > 4) return 'col-span-2 lg:col-span-2 xl:col-span-1';
  if (index % 5 === 1) return 'col-span-1 lg:col-span-2 xl:col-span-2';
  if (index % 5 === 2) return 'col-span-1 lg:col-span-2 xl:col-span-1';
  if (index % 5 === 3) return 'col-span-1 xl:col-span-2';

  return 'col-span-1';
};

type getInitials = {
  firstName: string;
  lastName: string;
};

export const getInitials = ({ firstName, lastName }: getInitials) => {
  if (!firstName && !lastName) return '';

  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : 'Anonymous';
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';

  return `${firstInitial}${lastInitial}`;
};

export const getProviderErrorMessage = ({ locale = DEFAULT_LOCALE }: { locale: string }) => {
  return locale === 'uk' ? 'Авторізаційна помилка. Не вірний провайдер.' : 'Authorization error. Incorrect provider.';
};
