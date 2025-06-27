import { deleteParams, getParams, postParams, putParams } from '@/helpers/constants';

const fetcher = async (url: string, options?: any) => {
  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.error) {
      return {
        data: null,
        error: result.error.message,
        status: result.error.status
      };
    }

    return result;
  } catch (error) {
    console.error('Fetch error:', {
      url,
      error: error.message,
      name: error.name,
      stack: error.stack,
    });

    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please try again later');
    }

    if (error.message.includes('fetch')) {
      throw new Error('Network error - please check your connection');
    }

    throw error;
  }
};

export const getData = async (path: string, options?: any) => {
  const response = await fetcher(path, getParams(options));

  return response;
};

export const postData = async (path: string, data: any, options?: any) => {
  const response = await fetcher(path, postParams({ body: data, ...options }));

  return response;
};

export const putData = async (path: string, data: any, options?: any) => {
  const response = await fetcher(path, putParams({ body: data, ...options }));

  return response;
};

export const deleteData = async (path: string, options?: any) => {
  const response = await fetcher(path, deleteParams(options));

  return response;
};
