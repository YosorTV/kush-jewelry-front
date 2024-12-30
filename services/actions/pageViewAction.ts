import { postStrapiData } from '../strapi';

export async function PageViewAction(data: any) {
  const response = await postStrapiData(`conversion`, data);

  return response;
}
