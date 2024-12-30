import { postStrapiData } from '../strapi';

export async function pageViewAction(data: any) {
  const response = await postStrapiData(`conversion`, { data });

  return response;
}
