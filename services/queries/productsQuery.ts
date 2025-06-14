import { DEFAULT_LOCALE, IMAGE_FIELDS } from '@/helpers/constants';
import { PageProps } from '@/types/app/page.types';

// Get Products Query
export const productsQuery = ({
  id,
  name,
  locale = DEFAULT_LOCALE,
  category,
  page = '1',
  pageSize = '6',
  ...options
}: PageProps['searchParams']) => {
  let sort;
  const filters: Record<string, any> = {};

  if (options?.sortBy === 'low') {
    sort = ['price:asc'];
  } else if (options?.sortBy === 'high') {
    sort = ['price:desc'];
  } else {
    sort = '';
  }

  if (name) {
    filters.$or = [
      { title: { $containsi: name } },
      { category: { $containsi: name } },
      { collections: { title: { $containsi: name } } },
      { seo: { keywords: { $containsi: name } } }
    ];
  }

  if (category !== '*' && !name) {
    filters.category = { $eq: category };
  }

  if (options.sizes?.length) {
    filters.sizes = { size: { $eq: options.sizes } };
  }

  if (options?.materials) {
    filters.materials = {
      value: { $in: options.materials }
    };
  }

  if (options?.categories?.length > 0) {
    filters.category = { $eq: options.categories };
  }

  if (options.price) {
    const [minPrice, maxPrice] = Array.isArray(options.price) ? options.price : [0, 3000];

    filters.price = {
      $gte: minPrice,
      $lte: maxPrice
    };
  }

  return {
    id,
    locale,
    populate: {
      slug: true,
      colors: true,
      sizes: true,
      materials: true,
      collections: true,
      images: {
        populate: {
          data: {
            fields: IMAGE_FIELDS
          }
        }
      }
    },
    sort,
    filters,
    pagination: {
      page,
      pageSize
    }
  };
};
