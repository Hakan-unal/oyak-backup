import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { NextPageWithLayout } from './_app';
import { useLoginMutation } from '@hooks/mutations/useLoginMutation';
import useUser from '@hooks/useUser';
import { getLocalizationText } from '@utils/fetch.util';
import { getUseFormDefaults } from '@utils/form.util';

import paths from '@routes/paths';

import { tcknRegex } from '@common/regex';
import { DynamicType } from '@models/common.model';

import Button from '@components/core/Button';
import { FormInput } from '@components/form/FormInput';
import AuthLayout from '@components/layout/AuthLayout';

const schema = yup.object().shape({
  nationalId: yup
    .string()
    .required('general_general_requiredField_text')
    .matches(tcknRegex, 'accountOpeningRequest_entry_login_TCKN_errorMessage')
    .min(11, 'accountOpeningRequest_entry_login_TCKN_errorMessage')
    .max(11, 'accountOpeningRequest_entry_login_TCKN_errorMessage'),
});

const Login: NextPageWithLayout<unknown> = () => {
  const { push: navigate } = useRouter();
  const { mutate, isLoading } = useLoginMutation();
  const { user, isLoading: isUserLoading } = useUser({});

  const onSubmit = ({ nationalId }: DynamicType) => {
    mutate(nationalId);
  };

  useEffect(() => {
    if (user && user.nationalId !== '' && !isUserLoading) {
      if (user?.isExist) {
        navigate(paths.OTP);
      } else {
        navigate(paths.REGISTER);
      }
    }
  }, [ user, isUserLoading ]);

  const { control, handleSubmit } = useForm(
    getUseFormDefaults(schema, { nationalId: '' }),
  );

  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: '100%' }}
    >
      <Flex
        direction='column'
        height='full'
        justify='space-between'
        width='full'
      >
        <FormInput
          showCheck
          control={control}
          label='accountOpeningRequest_entry_login_TCKN_label'
          maxLength={11}
          name='nationalId'
          patternType='tckn'
          type='tel'
        />
        <Button
          alignSelf='end'
          isLoading={isLoading}
          label='accountOpeningRequest_entry_login_signUp_button'
          m={0}
          type='submit'
          variant='primary'
        />
      </Flex>
    </form>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
export const getServerSideProps = async function () {
  const messages = await getLocalizationText();

  return {
    props: {
      messages,
    },
  };
};

export default Login;
