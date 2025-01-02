import { addToCartAction } from '@/services/actions/addToCartAction';
import { withMetaDataAction } from '@/services/actions/withMetaDataAction';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const executeAddToCart = await withMetaDataAction(addToCartAction);

  try {
    await executeAddToCart(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
