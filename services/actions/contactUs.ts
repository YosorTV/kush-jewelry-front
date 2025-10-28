import { schemas } from '@/lib';

import { postUserMessage } from '@/services/api';

import { DEFAULT_LOCALE } from '@/helpers/constants';

export async function contactUs(prevState: any, formData: FormData) {
  const locale = formData.get('locale') || DEFAULT_LOCALE;

  const fields = {
    email: formData.get('email'),
    name: formData.get('name'),
    phone: formData.get('phone'),
    message: formData.get('message'),
    locale: formData.get('locale'),
    // Anti-spam fields
    honeypot: formData.get('website') || '', // honeypot field (should be empty)
    formTimestamp: formData.get('formTimestamp') || '' // timestamp for timing validation
  };

  // Server-side validation (gmail-only email + UA phone + anti-spam checks)
  const validatedData: any = schemas.contacts(locale as string).safeParse(fields);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;

    return {
      ...prevState,
      errors,
      strapiError: null,
      status: 400,
      message: locale === 'uk' ? 'Валідаційна помилка.' : 'Validation error'
    };
  }

  // Remove anti-spam fields before sending to Strapi (not needed in database)
  const { honeypot, formTimestamp, ...dataToSend } = validatedData.data;

  const response = await postUserMessage(dataToSend);

  if (response.error) {
    return {
      ...prevState,
      errors: null,
      status: 400,
      message: response.error.message,
      strapiError: locale === 'uk' ? 'Помилка в запиті.' : 'Bad request.'
    };
  }

  return {
    ...prevState,
    errors: null,
    strapiError: null,
    status: 200,
    message: response.message
  };
}
