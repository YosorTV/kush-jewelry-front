'use server';

import { NextResponse } from 'next/server';

import * as xlsx from 'xlsx';

import { getCurrency, getProductsMeta } from '@/services';
import { formatPrice } from '@/helpers/formatters';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const locale = searchParams.get('locale') || 'uk';

  try {
    const products = await getProductsMeta({ locale });
    const currency = await getCurrency();

    const formattedData = products.map((product: any) => {
      const price =
        locale === 'uk'
          ? formatPrice(product?.other['product:price:amount'], currency).replace(/[^\d.,-]/g, '')
          : product?.other['product:price:amount'];

      const priceCurrency = locale === 'en' ? 'USD' : product.other['product:price:currency'];

      return {
        ID: product.id,
        Title: product?.openGraph?.title || '',
        Description: product.description || '',
        Link: product.openGraph?.url || '',
        'Image Link': product.openGraph?.images[0]?.url || '',
        Availability: product.other['product:product:availability'] || 'in stock',
        Price: `${price} ${priceCurrency}`,
        Category: product.other['product:category'] || '',
        Brand: 'KUSH JEWELRY',
        Condition: 'New'
      };
    });

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(formattedData);

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Catalog');

    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': 'attachment; filename="catalog.xlsx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    });
  } catch (error) {
    console.error('Error generating xlsx file:', error);
    return NextResponse.json({ error: 'Failed to generate XLSX file' }, { status: 500 });
  }
}
