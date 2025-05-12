'use server';

import { headers } from "next/headers";

export async function getCurrentUrl() {
  const headersList = headers();
  const host = headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '';
  const searchParams = headersList.get('x-invoke-query') || '';
  
  return `${protocol}://${host}${pathname}${searchParams ? `?${searchParams}` : ''}`;
}