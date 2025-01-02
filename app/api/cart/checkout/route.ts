import { checkoutAction } from '@/services/actions/checkoutAction';
import { withMetaDataAction } from '@/services/actions/withMetaDataAction';
import { NextResponse } from 'next/server';

import { postStrapiData } from '@/services/strapi';
import { ProductItem } from '@/types/components';

export async function POST(req: Request) {
  const body = await req.json();

  const executeCheckout = await withMetaDataAction(checkoutAction);

  const checkoutData = {
    currency: body?.currency,
    value: body?.amount,
    content_ids: body?.products.map((product: ProductItem) => product.id),
    content_name: body?.shop_name,
    contents: body.products.map((product: ProductItem) => ({
      id: product.id,
      quantity: product.quantity,
      price: Number(product.price)
    })),
    customer: {
      firstName: body?.customer.firstName,
      lastName: body?.customer.lastName,
      email: body?.customer.email,
      phone: body?.customer.phone,
      city: body?.customer.customer_city,
      warehouse: body?.customer.customer_warehouse,
      self_delivery: body?.customer.self_delivery
    },
    order_id: body?.order_id,
    description: body?.description
  };

  try {
    const response = await postStrapiData('payment/create', body);
    await executeCheckout(checkoutData);
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    return NextResponse.json({ success: false, data: null, error: error.message }, { status: 500 });
  }
}
