'use server';

import { unstable_update } from '@/auth';
import { schemas } from '@/lib';
import { revalidateTag } from 'next/cache';
import { putUserData } from '../api/put-user-profile';

export async function updateProfileAction(prevState: any, formData: FormData) {
  const fields = Object.fromEntries(formData);

  const validatedData: any = schemas.profile(fields.locale as string).safeParse(fields);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;

    return {
      ...prevState,
      errors,
      status: 400,
      strapiError: null,
      message: fields.locale === 'uk' ? 'Валідаційна помилка' : 'Missing Fields. Failed to Register.'
    };
  }

  const response = await putUserData(validatedData.data, fields.token as string);

  if (response.error) {
    return {
      ...prevState,
      errors: null,
      status: 400,
      message: response.error.message,
      strapiError: fields.locale === 'uk' ? 'Помилка в запиті.' : 'Bad request.'
    };
  }

  await unstable_update({ ...response }).then(() => revalidateTag('profile'));

  return {
    ...prevState,
    message: fields.locale === 'uk' ? 'Профіль було оновлено.' : 'Profile was updated.',
    status: 200,
    data: response,
    strapiErrors: null
  };
}
