import { z } from 'zod';

type Locale = 'en' | 'uk' | string;

const PASSWORD_REG_EX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-]).{8,}$/;

const normalizePhoneNumber = (phoneNumber: string) => phoneNumber.replace(/[^\d]/g, '');

const getEmailErrorMessage = (locale: Locale) => {
  const messages: Record<Locale, string> = {
    en: 'Invalid email format. ',
    uk: 'Не вірний формат пошти. '
  };

  return messages[locale] || messages.en;
};

const requiredErrorMessage = (locale: Locale) => {
  const messages: Record<Locale, string> = {
    en: ' Required field. ',
    uk: ' Обовязкове поле. '
  };

  return messages[locale] || messages.en;
};

const requiredPasswordLengthMessage = (locale: Locale) => {
  const messages: Record<Locale, string> = {
    en: 'Password must be at least 8 characters long. ',
    uk: 'Пароль має містити мінімум 8 символів. '
  };

  return messages[locale] || messages.en;
};

const emailSchema = (locale: Locale) => z.string().email(getEmailErrorMessage(locale));

// Allow only Gmail addresses for specific flows (e.g., Contact Us)
const emailGmailSchema = (locale: Locale) =>
  emailSchema(locale).refine((val) => /@gmail\.com$/i.test(String(val || '')), {
    message: locale === 'uk' ? 'Дозволено лише адреси Gmail.' : 'Only Gmail addresses are allowed.'
  });

const passwordSchema = (locale: Locale) =>
  z
    .string()
    .min(8, { message: requiredPasswordLengthMessage(locale) })
    .regex(PASSWORD_REG_EX, {
      message: requiredErrorMessage(locale)
    });

const loginSchema = (locale: Locale) => {
  return z.object({
    identifier: emailSchema(locale),
    password: passwordSchema(locale),
    remember: z.string(),
    locale: z.string().readonly()
  });
};

const requiredTextField = (locale: Locale) =>
  z.string().refine((val) => val.trim() !== '', {
    message: requiredErrorMessage(locale)
  });

const requiredPhoneField = (locale: Locale) =>
  z.string().refine(
    (val) => {
      const normalizedPhoneNumber = normalizePhoneNumber(val);

      return normalizedPhoneNumber.trim() !== '' && /^\d{6,}$/.test(normalizedPhoneNumber);
    },
    {
      message: requiredErrorMessage(locale)
    }
  );

// UA phone number validator: must be in international format starting with 380 and 9 digits after (total 12)
const requiredUaPhoneField = (locale: Locale) =>
  z.string().refine(
    (val) => {
      const normalizedPhoneNumber = normalizePhoneNumber(val);
      return /^380\d{9}$/.test(normalizedPhoneNumber);
    },
    {
      message:
        locale === 'uk'
          ? 'Вкажіть український номер у форматі +380XXXXXXXXX.'
          : 'Enter a Ukrainian phone in format +380XXXXXXXXX.'
    }
  );

const profileSchema = (locale: Locale) => {
  return z.object({
    firstName: requiredTextField(locale),
    lastName: requiredTextField(locale),
    phoneNumber: requiredPhoneField(locale),
    username: z.string().readonly(),
    date: z.string().readonly().optional(),
    userId: z.string().readonly(),
    city: z.string().optional(),
    warehouse: z.string().optional(),
    cityID: z.string().optional(),
    warehouseID: z.string().optional()
  });
};

const signupSchema = (locale: Locale) =>
  z.object({
    firstName: requiredTextField(locale),
    lastName: requiredTextField(locale),
    username: z.string().readonly(),
    phoneNumber: requiredPhoneField(locale),
    password: passwordSchema(locale),
    email: emailSchema(locale)
  });

export const forgotPasswordSchema = (locale: Locale) => z.object({ email: emailSchema(locale) });

export const resetPasswordBaseSchema = (locale: Locale) =>
  z.object({
    password: passwordSchema(locale),
    passwordConfirmation: requiredTextField(locale),
    code: z.string().readonly()
  });

export const resetPasswordSchema = (locale: Locale) => {
  const schema = resetPasswordBaseSchema(locale);

  return schema.refine((data) => data.password === data.passwordConfirmation, {
    message: locale === 'uk' ? 'Паролі не співпадають.' : "Passwords don't matched",
    path: ['passwordConfirmation']
  });
};

export const updatePasswordScema = (locale: Locale) =>
  z.object({
    email: emailSchema(locale),
    password: passwordSchema(locale)
  });

export const subscriptionSchema = (locale: Locale) =>
  z.object({
    email: emailSchema(locale),
    locale: z.string().readonly()
  });

export const contactUsSchema = (locale: Locale) => {
  return z.object({
    email: emailGmailSchema(locale),
    phone: requiredUaPhoneField(locale),
    name: requiredTextField(locale),
    message: requiredTextField(locale),
    locale: z.string().readonly()
  });
};

export const schemas = {
  login: loginSchema,
  signup: signupSchema,
  profile: profileSchema,
  contacts: contactUsSchema,
  subscription: subscriptionSchema,
  resetPassword: resetPasswordSchema,
  'update-password': updatePasswordScema,
  forgotUserPassword: forgotPasswordSchema
};
