import { Flex, Grid, useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { NextPageWithLayout } from './_app';
import { getLocalizationText, InternalApi, RemoteApi } from '@utils/fetch.util';
import { getUseFormDefaults } from '@utils/form.util';
import { sessionOptions } from '@utils/session.util';

import paths from '@routes/paths';

import { Endpoints } from '@common/endpoints';
import { DynamicType } from '@models/common.model';
import { ResponseModel } from '@models/response.model';

import Button from '@components/core/Button';
import { FormInput } from '@components/form/FormInput';
import ButtonWrapper from '@components/forms/application/ButtonWrapper';
import ApplicationLayout from '@components/layout/ApplicationLayout';
import InfoModal from '@components/modals/InfoModal';

const schema = object().shape({
  cellPhone: string().required('general_general_requiredField_text'),
});

const ForgotQuestionPage: NextPageWithLayout<null> = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { push, back } = useRouter();

  const onSubmit = (data: DynamicType) => {
    mutation.mutate(data.cellPhone);
  };

  const mutation = useMutation({
    mutationFn: (cellPhone: string) =>
      InternalApi.post('/api/Account/SecurityAnswer', {
        cellPhone,
      }).then((r) => r.data),
    onSuccess: () => {
      onOpen();
    },
  });

  const { handleSubmit, control } = useForm(
    getUseFormDefaults(schema, {
      cellPhone: '',
    }),
  );

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
              inputProps={{ type: 'number' }}
              label='accountOpeningRequest_sequrityStep_phoneConfirmation_phoneNumber_label'
              name='cellPhone'
              type='text'
            />
          </Grid>
          <InfoModal
            isCentered
            actions={
              <Button
                label='accountOpeningRequest_entry_login_signUp_button'
                m='auto'
                onClick={() => push(paths.SECURITY_QUESTION)}
                variant='secondary'
              />
            }
            closeOnOverlayClick={false}
            isOpen={isOpen}
            message='accountOpeningRequest_sequrityStep_phoneConfirmation_popupInformation_text'
            onClose={onClose}
            title='general_general_info_title'
          />
          <ButtonWrapper goBack={back} isSubmitLoading={mutation.isLoading} />
        </Flex>
      </form>
    </Flex>
  );
};

ForgotQuestionPage.getLayout = function getLayout(page: ReactElement) {
  return <ApplicationLayout title={page.props.title}>{page}</ApplicationLayout>;
};
export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const { user, token } = req.session;

  if (!user) {
    return {
      props: {
        messages : '',
        title    : '',
      },
      redirect: {
        destination: paths.LOGIN,
      },
    };
  }

  const { response } = await RemoteApi(token?.accessToken, false)
    .post<ResponseModel<string>>(Endpoints.Account.GetSecurityAnswer, {
      nationalId: user?.nationalId,
    })
    .then((r) => {
      if (r.data.isErrorOccured && r.data.code === 400) {
        (r.data.isErrorOccured = false),
        (r.data.code = 200),
        (r.data.response = r.data.message);
      }

      return r.data;
    });

  return {
    props: {
      title    : response || '',
      messages : await getLocalizationText(),
    },
  };
}, sessionOptions);
export default ForgotQuestionPage;
