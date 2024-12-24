export const generateHeaderData = (title?: string, data?: any[]) => ({
  title,
  data: data ?? []
});

export const generateProductMetaTags = (product: any) => {
  return [
    { property: 'product:category', content: product.category },
    { property: 'product:availability', content: product.available ? 'in stock' : 'out of stock' },
    { property: 'product:price:amount', content: product.price },
    { property: 'product:price:currency', content: 'UAH' }
  ];
};

export const generateProductJsonLd = (product: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    id: product.id,
    description: product.description,
    image: product?.images?.data?.[0]?.url,
    url: `${process.env.NEXT_PUBLIC_URL}/catalog/${product.slug}`,
    brand: {
      '@type': 'Category',
      name: product.category
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'UAH',
      price: product.price,
      availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    }
  };
};
