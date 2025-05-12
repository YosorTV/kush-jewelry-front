import { postStrapiData } from '../strapi';
import { MetaActionProps } from './withMetaDataAction';

export async function pageViewAction({ user_data }: MetaActionProps<undefined>): Promise<void> {
  const response = await postStrapiData(`conversion-meta-event`, {
    user_data,
    event_name: 'PageView',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website'
  });

  return response;
}
