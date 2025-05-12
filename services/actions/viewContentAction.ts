import { postStrapiData } from '../strapi';
import { MetaActionProps } from './withMetaDataAction';

export async function viewContentAction<T>({ user_data, custom_data }: MetaActionProps<T>): Promise<void> {
  const response = await postStrapiData(`conversion-meta-event`, {
    user_data,
    custom_data,
    event_name: 'ViewContent',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website'
  });

  return response;
}
