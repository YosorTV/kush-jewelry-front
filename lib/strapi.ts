'use client';

import { getStrapiURL } from './utils';

interface IStrapiLoader {
  src: string;
  width: number;
  quality: number | 'auto';
}

export default function strapiLoader({ src, width = 75, quality = 100 }: IStrapiLoader) {
  if (src == null) return null;
  if (src.startsWith('data:')) return src;
  if (src.startsWith('http') || src.startsWith('//')) {
    if (src.includes('res.cloudinary.com')) {
      const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];

      const [base, publicId] = src.split('/upload/');
      return `${base}/upload/${params.join(',')}/${publicId}`;
    }

    return src;
  }

  return `${getStrapiURL()}${src}`;
}
