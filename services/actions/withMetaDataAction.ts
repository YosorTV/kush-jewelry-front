'use server';

import { cookies, headers } from 'next/headers';
import { Session } from 'next-auth';
import { auth } from '@/auth';

export type MetaActionProps<T> = {
  user_data?: Session['user'] & { fbp: string | null; userAgent: string };
  custom_data?: T;
};

type MetaAction<T> = (data: MetaActionProps<T>) => Promise<void>;

export async function withMetaDataAction<T>(action: MetaAction<T>): Promise<(customData?: T) => Promise<void>> {
  const session = await auth();
  const fbp = cookies().get('_fbp')?.value || null;
  const userAgent = headers().get('user-agent') || '';

  return async (customData?: T) => {
    await action({
      user_data: { ...session?.user, fbp, userAgent },
      custom_data: customData
    });
  };
}
