'use client';

import { getStrapiURL } from './utils';

interface IStrapiLoader {
  src: string;
  width: number;
  quality: number | 'auto';
}

export default function strapiLoader({ src, width = 1000, quality = 75 }: IStrapiLoader) {
  if (!src) return null;

  if (src.startsWith('data:')) return src;

  if (src.startsWith('http') || src.startsWith('//')) {
    // Enhanced Cloudinary optimization
    if (src.includes('res.cloudinary.com')) {
      const params = [
        'f_auto', // Auto format (WebP/AVIF when supported)
        'c_limit', // Limit dimensions
        `w_${width}`, // Width
        `q_${quality || 'auto'}`, // Quality
        'dpr_auto', // Auto device pixel ratio
        'fl_progressive', // Progressive JPEG
        'fl_immutable_cache' // Enable immutable caching
      ];

      const [base, publicId] = src.split('/upload/');
      return `${base}/upload/${params.join(',')}/${publicId}`;
    }

    // Enhanced optimization for other CDNs
    if (src.includes('strapi') || src.includes('amazonaws.com') || src.includes('digitaloceanspaces.com')) {
      // Add query parameters for better caching and optimization
      const url = new URL(src);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('f', 'auto'); // Request auto format

      return url.toString();
    }

    return src;
  }

  // For Strapi local images, add optimization parameters
  const strapiUrl = getStrapiURL();
  const optimizedUrl = new URL(src, strapiUrl);

  // Add optimization query parameters if supported by your Strapi setup
  optimizedUrl.searchParams.set('width', width.toString());
  optimizedUrl.searchParams.set('quality', quality.toString());
  optimizedUrl.searchParams.set('format', 'auto');

  return optimizedUrl.toString();
}
