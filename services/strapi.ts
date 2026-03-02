import { flattenAttributes } from '@/lib/utils';
import { deleteData, getData, postData, putData } from '@/lib/fetch';

const getDefaultToken = () => process.env.STRAPI_API_TOKEN || undefined;

export const getStrapiData = async (path: string, queryParams?: any, options?: any) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);

  if (queryParams) {
    url.search = queryParams;
  }

  const defaultToken = getDefaultToken();
  let response;
  try {
    response = await getData(url.href, { token: defaultToken, ...options });
  } catch (error) {
    // Cloud token can be invalid/expired; retry public request for routes configured with auth: false/public access.
    if (defaultToken && Number(error?.status) === 401) {
      response = await getData(url.href, { ...options });
    } else {
      throw error;
    }
  }

  return flattenAttributes(response);
};

export const postStrapiData = async (path: string, data: any, options?: any) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);

  if (options) {
    url.search = new URLSearchParams(options).toString();
  }

  const response = await postData(url.href, data, { token: data?.token || getDefaultToken() });

  return response;
};

export const putStrapiData = async (path: string, data: any, options?: any) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);

  if (options) {
    url.search = new URLSearchParams(options).toString();
  }

  const response = await putData(url.href, data, { token: getDefaultToken() });

  return response;
};

export const deleteStrapiData = async (path: string, options?: any) => {
  const url = new URL(`api/${path}`, process.env.NEXT_PUBLIC_STRAPI_URL);

  const response = await deleteData(url.href, { token: getDefaultToken(), ...options });

  return response;
};
