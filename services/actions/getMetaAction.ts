'use server';

import { cookies, headers } from 'next/headers';

import { Session } from 'next-auth';
import { auth } from '@/auth';

type MetaAction<T> = (data: { user?: Session['user']; fbp: string | null; userAgent: string }) => Promise<T>;

export async function postMetaAction<T>(action: MetaAction<T>): Promise<void> {
  const session = await auth();

  const fbp = cookies().get('_fbp')?.value || null;
  const userAgent = headers().get('user-agent') || '';

  await action({ ...session?.user, fbp, userAgent });
}
