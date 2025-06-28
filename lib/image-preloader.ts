/**
 * Image Preloader Utility
 * Helps preload critical images for better performance
 */

interface PreloadImageOptions {
  src: string;
  as?: 'image';
  type?: 'image/webp' | 'image/avif' | 'image/jpeg' | 'image/png';
  crossOrigin?: 'anonymous' | 'use-credentials';
  sizes?: string;
}

/**
 * Preload a single image
 */
export const preloadImage = (options: PreloadImageOptions): void => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = options.as || 'image';
  link.href = options.src;

  if (options.type) {
    link.type = options.type;
  }

  if (options.crossOrigin) {
    link.crossOrigin = options.crossOrigin;
  }

  if (options.sizes) {
    link.setAttribute('imagesizes', options.sizes);
  }

  document.head.appendChild(link);
};

/**
 * Preload multiple images
 */
export const preloadImages = (images: PreloadImageOptions[]): void => {
  images.forEach(preloadImage);
};

/**
 * Create responsive image srcset for preloading
 */
export const createResponsiveSrcSet = (baseUrl: string, widths: number[]): string => {
  return widths
    .map((width) => {
      const url = new URL(baseUrl);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('f', 'auto');
      return `${url.toString()} ${width}w`;
    })
    .join(', ');
};

/**
 * Preload hero images on page load
 */
export const preloadCriticalImages = (heroImage?: string, productImages?: string[]): void => {
  if (typeof window === 'undefined') return;

  const imagesToPreload: PreloadImageOptions[] = [];

  // Preload hero image if provided
  if (heroImage) {
    imagesToPreload.push({
      src: heroImage,
      type: 'image/webp',
      sizes: '100vw'
    });
  }

  // Preload first few product images
  if (productImages && productImages.length > 0) {
    productImages.slice(0, 4).forEach((src) => {
      imagesToPreload.push({
        src,
        type: 'image/webp',
        sizes: '(max-width: 768px) 50vw, 25vw'
      });
    });
  }

  preloadImages(imagesToPreload);
};

/**
 * Lazy load images when they come into viewport
 */
export const createIntersectionObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px', // Start loading 50px before entering viewport
    threshold: 0.1
  });
};
