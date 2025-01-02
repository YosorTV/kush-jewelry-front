'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useCart } from '@/store';
import { AddCartProps } from '@/types/components';

export const AddCart: FC<AddCartProps> = ({ data, isSizesNotAvailable, isDisabled = false }) => {
  const state = useCart();
  const t = useTranslations('cart');

  const [added, setAdded] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const isButtonDisabled = useCallback(() => {
    const { formState } = state;

    const isFormIncompleteWithoutSize = Object.entries(formState).some(
      ([key, value]) => key !== 'size' && value === null
    );

    if (isSizesNotAvailable) {
      return isFormIncompleteWithoutSize || added;
    }

    const isFormIncomplete = Object.values(formState).some((value) => value === null);

    return isFormIncomplete || added || !isDisabled;
  }, [state.formState, isSizesNotAvailable, isDisabled]);

  useEffect(() => {
    state.syncCartData(data);
  }, []);

  useEffect(() => {
    const disabled = isButtonDisabled();

    setDisabled(disabled);
  }, [state.formState, data, isSizesNotAvailable, isDisabled]);

  const handleAdd = useCallback(async () => {
    setAdded(true);

    state.onSubmit(state.formState);

    setTimeout(() => {
      setAdded(false);
    }, 500);
  }, [state.onSubmit, state.formState]);

  return (
    <button
      aria-label='add to cart'
      disabled={disabled}
      onClick={handleAdd}
      className='btn btn-neutral no-animation btn-block rounded-none font-semibold text-white disabled:!bg-gray-500/50'
    >
      {t('add')}
    </button>
  );
};
