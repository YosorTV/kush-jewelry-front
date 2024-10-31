'use client';

import { Form, Input, Title } from '@/components/elements';
import { SubmitButton } from '@/components/simple';
import { DeleteButton } from '@/components/simple/DeleteButton';

import { inputFieldAdapter } from '@/adapters/input';
import { NovaPostOptions } from '@/components/simple/NovaPostOptions';
import { DEFAULT_LOCALE } from '@/helpers/constants';
import { schemas } from '@/lib';
import { updateProfileAction } from '@/services';
import { deleteProfile } from '@/services/api/delete-account';

export const ProfileForm = ({ data, state, locale = DEFAULT_LOCALE, token }: any) => {
  const schema = schemas.profile(locale);

  const updatedGeneralFields = data.general.map((input: any) => inputFieldAdapter(input, state));
  const updatedContactsFields = data.contacts.map((input: any) => inputFieldAdapter(input, state));

  const printInputs = (data: any) => {
    return data?.map((input: any) => (
      <Input containerClass='w-full' key={input.id} disabled={input.type === 'email'} {...input} />
    ));
  };

  const formActions = (action: any) => {
    const actionType: any = {
      delete: (
        <DeleteButton
          key={action.id}
          className='w-full rounded-none border-none outline-none md:w-1/2'
          text={action.text ?? 'Delete'}
          loadingText={action?.loadingText ?? 'Loading...'}
          onClick={() => deleteProfile({ userId: state.id, token, locale })}
        />
      ),
      submit: (
        <SubmitButton
          key={action.id}
          className='w-full rounded-none border-none !bg-base-200 !normal-case !text-base-100 outline-none md:w-1/2'
          text={action?.text ?? 'Apply'}
          loadingText={action?.loadingText ?? 'Loading...'}
        />
      )
    };

    return actionType[action.type];
  };

  return (
    <Form
      schema={schema}
      action={updateProfileAction}
      className='mx-auto flex flex-col justify-center gap-5 p-5 lg:w-3/4 lg:p-10'
    >
      <Input type='hidden' hidden name='token' value={token} className='hidden' />
      <Input type='hidden' hidden name='locale' value={locale} className='hidden' />
      <Input type='hidden' hidden name='userId' value={state.id} className='hidden' />
      <Input type='hidden' hidden name='username' value={state.username} className='hidden' />

      <div className='flex flex-col gap-5 lg:flex-row'>{printInputs(updatedGeneralFields)}</div>
      <div className='divider' />
      <div className='flex flex-col gap-y-5'>
        <Title level='3'>{data?.contactsTitle}</Title>
        <div className='flex flex-col gap-5 lg:flex-row'>{printInputs(updatedContactsFields)}</div>
      </div>
      <div className='divider' />
      <div className='flex flex-col gap-y-5'>
        <Title level='3'>{data?.additionalTitle}</Title>
        <div className='flex flex-col gap-5 lg:flex-row'>
          <NovaPostOptions
            cityOptions={{ label: state.city, value: state.cityID }}
            warehouseOptions={{ label: state.warehouse, value: state.warehouseID }}
          />
        </div>
      </div>
      <div className='divider' />
      <div className='flex flex-col items-center justify-center gap-5 md:flex-row'>{data.actions.map(formActions)}</div>
    </Form>
  );
};
