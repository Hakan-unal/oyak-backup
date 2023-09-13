import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { NextPageWithLayout } from './_app';
import useUser from '@hooks/useUser';
import { getLocalizationText, InternalApi } from '@utils/fetch.util';
import { getUseFormDefaults } from '@utils/form.util';
import { sessionOptions } from '@utils/session.util';

import paths from '@routes/paths';

import { phoneNumberRegex } from '@common/regex';
import { DynamicType } from '@models/common.model';

import TranslatedText from '@components/core/Text';
import FormCheckBox from '@components/form/FormCheckBox';
import { FormInput } from '@components/form/FormInput';
import ButtonWrapper from '@components/forms/application/ButtonWrapper';
import AuthLayout from '@components/layout/AuthLayout';
import KVKKModal from '@components/modals/KVKKModal';

type FormValues = {
  nationalId: string;
  cellPhone: string;
  KVKKApproval: boolean;
};

const schema = yup.object().shape({
  nationalId : yup.string().max(11),
  cellPhone  : yup
    .string()
    .required('general_general_requiredField_text')
    .matches(phoneNumberRegex, 'general_general_missingOrIncorrectEntry_text')
    .min(10, 'general_general_missingOrIncorrectEntry_text')
    .max(10, 'general_general_missingOrIncorrectEntry_text'),
  KVKKApproval: yup
    .bool()
    .required('general_general_requiredField_text')
    .oneOf([ true ], 'general_general_requiredField_text'),
});

const Register: NextPageWithLayout<unknown> = () => {
  const { push: navigate } = useRouter();
  const { user, refetch } = useUser({});
  const modalProps = useDisclosure();

  const defaultValues: FormValues = {
    nationalId   : user?.nationalId as string,
    cellPhone    : '',
    KVKKApproval : false,
  };

  const onSubmit = (formData: DynamicType) => {
    InternalApi.post('api/phone', formData).then(() => {
      refetch();
      navigate(paths.OTP);
    });
  };

  useEffect(() => {
    setValue('nationalId', user?.nationalId);
  }, [ user?.nationalId ]);

  const { handleSubmit, control, setValue } = useForm(
    getUseFormDefaults(schema, defaultValues),
  );

  const returnLogin = () => {
    navigate('/api/logout');
  };

  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: '100%', width: '100%' }}
    >
      <Flex
        direction='column'
        height='full'
        justify='space-between'
        mb={8}
        width='full'
      >
        <FormInput
          isDisabled
          control={control}
          label='accountOpeningRequest_entry_login_TCKN_label'
          name='nationalId'
          type='text'
        />

        <FormInput
          control={control}
          label='accountOpeningRequest_entry_register_phoneNumber_label'
          maxLength={10}
          name='cellPhone'
          type='text'
        />
        <VStack align='start' h='full' mt='4' spacing={4}>
          <FormCheckBox
            actionable={
              <TranslatedText
                _hover={{
                  pointer        : 'cursor',
                  textDecoration : 'underline',
                }}
                color='primary.base'
                fontSize='14px'
                fontWeight='normal'
                label='accountOpeningRequest_entry_register_KVKK_text'
                onClick={modalProps.onOpen}
              />
            }
            control={control}
            label=''
            name='KVKKApproval'
          />
        </VStack>
        <KVKKModal {...modalProps} size='3xl' />
        <ButtonWrapper goBack={returnLogin} />
      </Flex>
    </form>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const user = req.session.user;

  if (user?.application) {
    return {
      props    : {},
      redirect : {
        destination: paths.OTP,
      },
    };
  }

  return {
    props: {
      messages: await getLocalizationText(),
    },
  };
}, sessionOptions);

Register.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Register;
