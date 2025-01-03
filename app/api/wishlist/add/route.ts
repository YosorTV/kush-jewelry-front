'use server';

import { auth } from '@/auth';
import addToWishlist from '@/services/actions/addToWishlist';
import { addToWishlistMetaAction } from '@/services/actions/addToWishlistMetaAction';
import { withMetaDataAction } from '@/services/actions/withMetaDataAction';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const session = await auth();
  const executeAddToWishlist = await withMetaDataAction(addToWishlistMetaAction);

  const { locale, product } = body;

  const metaData = {
    content_ids: [product.id],
    content_name: product.title,
    content_category: product.category,
    content_price: product.price,
    currency: 'USD'
  };

  try {
    await executeAddToWishlist({ custom_data: metaData });

    const { message } = await addToWishlist({
      locale,
      productId: product.id,
      userId: Number(session.user.id),
      access_token: session.accessToken
    });

    revalidateTag('products');

    return NextResponse.json({ success: true, data: { message } });
  } catch (error) {
    return NextResponse.json({ success: false, data: null, error: error.message }, { status: 500 });
  }
}
