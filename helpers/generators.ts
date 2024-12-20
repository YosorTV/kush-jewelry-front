export const generateHeaderData = (title?: string, data?: any[]) => ({
  title,
  data: data ?? []
});

export const generateProductMetaTags = (product: any) => {
  return [
    { property: 'og:title', content: product.title },
    { property: 'og:description', content: product.description },
    { property: 'og:url', content: `${process.env.NEXT_PUBLIC_URL}/catalog/${product.slug}` },
    { property: 'og:image', content: product.metaImage },
    { property: 'product:category', content: product.category },
    { property: 'product:availability', content: product.available ? 'Available' : 'Not available' },
    { property: 'product:condition', content: product.condition },
    { property: 'product:price:amount', content: product.price },
    { property: 'product:price:currency', content: 'UAH' }
  ];
};

export const generateProductJsonLd = (product: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    brand: {
      '@type': 'Category',
      name: product.category
    },
    image: product.image,
    url: `${process.env.NEXT_PUBLIC_URL}/catalog/${product.slug}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'UAH',
      price: product.price
    }
  };
};
