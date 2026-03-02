// LiqPay client-side callback route — commented out, replaced by mono
// Mono webhook is sent directly from monobank servers to Strapi (backend),
// so this Next.js proxy route is no longer needed.
//
// import { postStrapiData } from '@/services/strapi';
// import { revalidateTag } from 'next/cache';
// import { NextResponse } from 'next/server';
//
// export async function POST(req: Request) {
//   const body = await req.json();
//   try {
//     const response = await postStrapiData('payment/callback', body);
//     revalidateTag('orders');
//     return NextResponse.json({ success: true, data: response });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ success: false, message: 'LiqPay callback route disabled. Mono webhooks go directly to Strapi.' }, { status: 410 });
}
