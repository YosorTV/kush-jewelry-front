'use client';

import { FC, useCallback, useEffect, useState } from 'react';

import { AsyncSelect, Input } from '@/components/elements';

import { getNovapostCities } from '@/services/api/get-novapost-cities';
import { getNovapostWarehouses } from '@/services/api/get-novapost-warehouse';
import { useTranslations } from 'next-intl';

type TOption = {
  label: string | null;
  value: string | null;
};

interface INovaPostOptions {
  cityOptions?: TOption | null;
  warehouseOptions?: TOption | null;
  disabled?: boolean;
  onCityChange?: (city: TOption) => void;
  onWarehouseChange?: (warehouse: TOption) => void;
}

export const NovaPostOptions: FC<INovaPostOptions> = ({
  cityOptions,
  warehouseOptions,
  onCityChange,
  onWarehouseChange,
  disabled = false
}) => {
  const [city, setCity] = useState<TOption>(cityOptions);
  const [warehouse, setWarehouse] = useState<TOption>(warehouseOptions);

  const t = useTranslations('system');

  const handleCityChange = (selectedOption: { label: string; value: string } | null) => {
    if (selectedOption) {
      setCity(selectedOption);
      setWarehouse({ label: '', value: '' });
    } else {
      setCity({ label: '', value: '' });
      setWarehouse({ label: '', value: '' });
    }
  };

  const handleWarehouseChange = (selectedOption: { label: string; value: string } | null) => {
    if (selectedOption) {
      setWarehouse(selectedOption);
    } else {
      setWarehouse({ label: '', value: '' });
    }
  };

  useEffect(() => {
    if (typeof onCityChange !== 'undefined' && typeof onWarehouseChange !== 'undefined') {
      onCityChange(city);
      onWarehouseChange(warehouse);
    }
  }, [city, warehouse]);

  const loadCityOptions = useCallback(async (search: string, loadedOptions: any, { page }: { page: number }) => {
    const result = await getNovapostCities({
      page: String(page),
      search,
      limit: '50'
    });

    return {
      options: result,
      hasMore: result.length === 50,
      additional: { page: page + 1 }
    };
  }, []);

  const loadWarehousesOptions = useCallback(
    async (search: string, loadedOptions: any, { page }: { page: number }) => {
      if (!city || !city.value) return { options: [], hasMore: false, additional: { page: page } };

      const result = await getNovapostWarehouses({
        cityId: city.value,
        page: String(page),
        search,
        limit: '50'
      });

      return {
        options: result,
        hasMore: result.length === 50,
        additional: { page: page + 1 }
      };
    },
    [city]
  );

  return (
    <>
      <AsyncSelect
        label={t('city')}
        value={city}
        placeholder={t('search')}
        disabled={disabled}
        onChange={handleCityChange}
        loadOptions={loadCityOptions}
      />

      {city && city?.value && (
        <AsyncSelect
          label={t('warehouse')}
          disabled={disabled}
          placeholder={t('search')}
          key={city.value}
          value={warehouse}
          onChange={handleWarehouseChange}
          loadOptions={loadWarehousesOptions}
        />
      )}

      {city && city?.label && <Input type='hidden' hidden name='city' value={city?.label} className='hidden' />}
      {city && city?.value && <Input type='hidden' hidden name='cityID' value={city.value} className='hidden' />}

      {warehouse && warehouse?.label && (
        <Input type='hidden' hidden name='warehouse' value={warehouse.label} className='hidden' />
      )}
      {warehouse && warehouse?.value && (
        <Input type='hidden' hidden name='warehouseID' value={warehouse.value} className='hidden' />
      )}
    </>
  );
};
