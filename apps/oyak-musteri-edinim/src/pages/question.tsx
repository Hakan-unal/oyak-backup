import { Box, Flex, Grid, Link } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { NextPageWithLayout } from './_app';
import { getLocalizationText, InternalApi } from '@utils/fetch.util';
import { getUseFormDefaults } from '@utils/form.util';
import { sessionOptions } from '@utils/session.util';

import paths from '@routes/paths';

import { DynamicType } from '@models/common.model';

import TranslatedText from '@components/core/Text';
import { FormInput } from '@components/form/FormInput';
import ButtonWrapper from '@components/forms/application/ButtonWrapper';
import ApplicationLayout from '@components/layout/ApplicationLayout';

const schema = object().shape({
  answer: string().required('general_general_requiredField_text'),
});

const SecurityPage: NextPageWithLayout<null> = () => {
  const navigate = useRouter();

  const { handleSubmit, control } = useForm(
    getUseFormDefaults(schema, {
      answer: '',
    }),
  );

  const handleBack = () => {
    navigate.push(paths.LOGOUT);
  };

  const onSubmit = (data: DynamicType) => {
    mutation.mutate(data.answer);
  };

  const mutation = useMutation({
    mutationFn: (answer: string) =>
      InternalApi.post('/api/Account/SecurityQuestion', { answer }).then(
        (r) => r.data,
      ),
    onSuccess: () => {
      navigate.push(paths.DEFAULT);
    },
  });

  return (
    <Flex direction='column' h='full' w='full'>
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
          <Grid
            columnGap={10}
            gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
          >
            <FormInput
              control={control}
              label='accountOpeningRequest_requestForm_preference_securityAnswer_label'
              name='answer'
              type='text'
            />
            <Box />
            <Link
              color='helper.orange.base'
              fontWeight='bold'
              href={paths.FORGOT_QUESTION}
              mt={2}
            >
              <TranslatedText
                color='helper.orange.base'
                label='accountOpeningRequest_sequrityStep_forgetAnswer_button'
                variant='body1'
              />
            </Link>
          </Grid>
          <ButtonWrapper
            goBack={handleBack}
            isSubmitLoading={mutation.isLoading}
          />
        </Flex>
      </form>
    </Flex>
  );
};

SecurityPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ApplicationLayout title='accountOpeningRequest_sequrityStep_sequrityStep_subtitle'>
      {page}
    </ApplicationLayout>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const user = req.session.user;

  if (!user) {
    return {
      props    : {},
      redirect : {
        destination: paths.LOGIN,
      },
    };
  }

  return {
    props: {
      messages: await getLocalizationText(),
    },
  };
}, sessionOptions);

export default SecurityPage;
