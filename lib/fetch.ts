import { deleteParams, getParams, postParams, putParams } from '@/helpers/constants';

// Custom error classes for better error handling
class HTTPError extends Error {
  public status: number;
  public url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = 'HTTPError';
    this.status = status;
    this.url = url;
  }
}

class NetworkError extends Error {
  public originalError: Error;

  constructor(message: string, originalError: Error) {
    super(message);
    this.name = 'NetworkError';
    this.originalError = originalError;
  }
}

class ParseError extends Error {
  public originalError: Error;

  constructor(message: string, originalError: Error) {
    super(message);
    this.name = 'ParseError';
    this.originalError = originalError;
  }
}

const fetcher = async (url: string, options?: any) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 Fetching: ${url}`);
    }

    const response = await fetch(url, { ...options });

    if (!response.ok) {
      const errorDetails = {
        url,
        status: response.status,
        statusText: response.statusText,
        method: options?.method || 'GET',
        headers: options?.headers
      };

      console.error('❌ HTTP Error Details:', errorDetails);

      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorBody = await response.json();
        if (errorBody?.error?.message) {
          errorMessage = errorBody.error.message;
        } else if (errorBody?.message) {
          errorMessage = errorBody.message;
        }
      } catch (parseError) {
        console.warn('Could not parse error response body:', parseError);
      }

      throw new HTTPError(errorMessage, response.status, url);
    }

    const result = await response.json();

    if (result?.error) {
      return {
        data: null,
        error: result.error.message,
        status: result.error.status
      };
    }

    return result;
  } catch (error) {
    console.error('💥 Fetch error:', error);

    if (error instanceof HTTPError) {
      throw error;
    }

    if (error instanceof Error && (error.message.includes('fetch') || error.name === 'TypeError')) {
      throw new NetworkError('Network error - please check your connection', error);
    }

    if (error instanceof Error && error.name === 'SyntaxError') {
      throw new ParseError('Invalid server response format', error);
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
