export const generateHeaderData = (title?: string, data?: any[]) => ({
  title,
  data: data ?? []
});

export const generateProductMetaTags = (product: any) => {
  if (!product) return [];

  return [
    { property: 'product:category', content: product.category },
    { property: 'product:availability', content: product.available ? 'in stock' : 'out of stock' },
    { property: 'product:price:amount', content: product.price },
    { property: 'product:price:currency', content: 'UAH' },
    { property: 'product:retailer_item_id', content: product.id },
    { property: 'product:brand', content: `KUSH_${product.category}` },
    { property: 'product:item_group_id', content: product.id }
  ];
};

export const generateProductJsonLd = (product: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    productID: `${product.title}_${product.id}`,
    description: product.description,
    image: product?.images?.data?.[0]?.url,
    url: `${process.env.NEXT_PUBLIC_URL}/catalog/${product.slug}`,
    brand: {
      '@type': 'Category',
      name: product.category,
      id: product.id
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'UAH',
      id: product.id,
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    },
    additionalProperty: {
      '@type': product.category,
      propertyID: `${product.title}_${product.id}`,
      value: product.category
    }
  };
};
