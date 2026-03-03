import { flattenAttributes } from '@/lib/utils';
import { deleteData, getData, postData, putData } from '@/lib/fetch';

export const getStrapiData = async (path: string, queryParams?: any, options?: any) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);

  if (queryParams) {
    url.search = queryParams;
  }

  const response = await getData(url.href, { ...options });

  return flattenAttributes(response);
};

export const postStrapiData = async (path: string, data: any, options?: any) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);

  if (options) {
    url.search = new URLSearchParams(options).toString();
  }

  const response = await postData(url.href, data, { token: data.token });

  return response;
};

export const putStrapiData = async (path: string, data: any, options?: any) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);

  if (options) {
    url.search = new URLSearchParams(options).toString();
  }

  const response = await putData(url.href, data);

  return response;
};

export const deleteStrapiData = async (path: string, options?: any) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);

  const response = await deleteData(url.href, options);

  return response;
};
