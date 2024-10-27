import { InputProps } from '@/types/components';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
}

export const flattenAttributes = (data: any): any => {
  // Check if data is a plain object; return as is if not
  if (typeof data !== 'object' || data === null || data instanceof Date || typeof data === 'function') {
    return data;
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  // Initialize an object with an index signature for the flattened structure
  let flattened: { [key: string]: any } = {};

  // Iterate over each key in the object
  for (let key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue;

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if ((key === 'attributes' || key === 'data') && typeof data[key] === 'object' && !Array.isArray(data[key])) {
      Object.assign(flattened, flattenAttributes(data[key]));
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(data[key]);
    }
  }

  return flattened;
};

export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const processChild = (child: React.ReactElement, index: number, state: any): React.ReactNode => {
  // If the child is an input element with a name prop, modify it
  if (child?.props?.name) {
    return React.createElement(child.type as React.ComponentType<InputProps>, {
      ...child.props,
      key: `${child.props.name}_${index}`,
      error: state?.errors?.[child?.props?.name] || null
    });
  }
  // If the child has its own children, recursively process them
  if (child?.props?.children) {
    return React.cloneElement(child, {
      ...child.props,
      children: React.Children.map(child.props.children, (childElement, childIndex) =>
        processChild(childElement as React.ReactElement, childIndex, state)
      )
    });
  }
  // If it's not an input or container, return the child unchanged
  return child;
};

export const getImgGrid = ({ images }: { images: any }) => {
  if (images.length < 4) {
    const additionalImages = Array.from({ length: 4 - images.length }, () => ({
      id: uuidv4(),
      url: null,
      width: 600,
      height: 600,
      formats: null,
      alternativeText: 'Placeholder image'
    }));

    return [...images, ...additionalImages];
  }

  return images;
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'sandbox':
      return 'bg-purple-600';
    case 'completed':
    case 'success':
      return 'bg-success';
    case 'error':
      return 'bg-error';
    case 'pending':
      return 'bg-warning';
    default:
      return 'bg-purple-600';
  }
};

export const getStatusBorder = (status: string) => {
  switch (status) {
    case 'sandbox':
      return 'border-purple-600';
    case 'completed':
    case 'success':
      return 'border-success';
    case 'error':
      return 'border-error';
    case 'pending':
      return 'border-warning';
    default:
      return 'border-purple-600';
  }
};
