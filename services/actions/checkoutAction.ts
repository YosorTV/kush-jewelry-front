import { postStrapiData } from '../strapi';
import { MetaActionProps } from './withMetaDataAction';

export async function checkoutAction<T>({ user_data, custom_data }: MetaActionProps<T>): Promise<void> {
  const response = await postStrapiData(`conversion`, {
    user_data,
    custom_data,
    event_name: 'InitiateCheckout',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website'
  });

  return response;
}
