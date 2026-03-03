import { IExchangeRate } from '@/types/helpers/currency.types';
import { getStrapiData } from '../strapi';

// this function inputs nothing, fetches USD/UAH rate from Strapi currency-change endpoint, returns number
export const getCurrency = async () => {
  try {
    const response = await getStrapiData('currency-change');

    const usdRate = response?.find(
      (rate: IExchangeRate) => rate.ccy === 'USD' && rate.base_ccy === 'UAH'
    );

    const rate = Number(usdRate?.sale);
    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error(`Invalid USD/UAH rate: ${usdRate?.sale}`);
    }

    return rate;
  } catch (err) {
    console.error('getCurrency failed:', err);
    throw err;
  }
};
