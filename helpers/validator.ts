import { IDeliveryForm } from '@/types/store';
import { AuthError } from 'next-auth';

export const isFormIncomplete = (data: IDeliveryForm): boolean => {
  const { firstName, lastName, email, phoneNumber, self, novapostCity, novapostWarehouse } = data;

  const isBasicInfoIncomplete = !firstName || !lastName || !email || !phoneNumber;

  if (self) {
    return isBasicInfoIncomplete;
  }

  return isBasicInfoIncomplete || !novapostCity?.value || !novapostWarehouse?.value;
};

export const isAuthorizationArgumentError = (error: AuthError): boolean => {
  const hasCause = 'cause' in error && typeof error.cause === 'object';
  const hasErrorInstance = hasCause && error.cause?.err instanceof Error;
  const isIllegalArgumentError = hasErrorInstance && error.cause.err.message === 'Illegal arguments: string, object';

  return hasCause && hasErrorInstance && isIllegalArgumentError;
};
