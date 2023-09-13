import {
  Box,
  Divider,
  Flex,
  Grid,
  useBreakpointValue,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { withIronSessionSsr } from 'iron-session/next';
import React, { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { bool, object } from 'yup';

import { NextPageWithLayout } from './_app';
import { useAccountInfoQuery } from '@hooks/queries/useAccountQueries';
import useStatus from '@hooks/useStatus';
import { getLocalizationText, InternalApi, RemoteApi } from '@utils/fetch.util';
import { getUseFormDefaults } from '@utils/form.util';
import { sessionOptions } from '@utils/session.util';

import paths from '@routes/paths';

import { Endpoints } from '@common/endpoints';

import TranslatedText from '@components/core/Text';
import TextWithLabel from '@components/core/TextWithLabel';
import FormCheckBox from '@components/form/FormCheckBox';
import InfoIcon from '@components/icon/Info';
import MainLayout from '@components/layout/MainLayout';

const schema = object().shape({
  repo : bool(),
  mail : bool(),
});

interface SelectionResponse {
  createdOn: string;
  customerId: number;
  emailEkstre: number;
  id: number;
  modifiedOn?: string;
  modifiedUser: string;
  repo: number;
  sanalSube?: number;
  sms?: number;
}

const Profile: NextPageWithLayout<{
  selectionResponse?: SelectionResponse;
}> = ({ selectionResponse }) => {
  const { data } = useAccountInfoQuery();
  const { isOpenAccount, status } = useStatus();
  const isWebScreen = useBreakpointValue({ base: false, md: true });

  const { control, handleSubmit, setValue } = useForm(
    getUseFormDefaults(schema, {
      repo : false,
      mail : false,
    }),
  );

  useEffect(() => {
    setValue('mail', selectionResponse?.emailEkstre !== 0);
    setValue('repo', selectionResponse?.repo !== 0);
  }, []);

  const firstTwoIndex = data?.profile?.cellPhone
    .split('')
    .splice(0, 2)
    .join('');

  // TODO(anyone): should change mask method to regex
  const lastTwoIndex = data?.profile?.cellPhone.split('').splice(8).join('');
  const maskedValue = '******';
  const maskedCellPhoneNumber = firstTwoIndex + maskedValue + lastTwoIndex;

  const profileInfo = [
    {
      text  : data?.name || '-',
      label : 'profileInformations_myProfile_nameSurname_subtitle',
    },
    {
      text  : maskedCellPhoneNumber || '-',
      label : 'profileInformations_myProfile_phoneNumber_subtitle',
    },
    {
      text  : data?.profile?.emailAddress || '-',
      label : 'profileInformations_myProfile_email_subtitle',
    },
    {
      text  : data?.profile?.occupation || '-',
      label : 'profileInformations_myProfile_job_subtitle',
    },
    {
      text  : data?.profile?.address || '-',
      label : 'profileInformations_myProfile_adress_subtitle',
    },
  ];

  const { mutate } = useMutation({
    mutationFn: (data: { [key: string]: string }) =>
      InternalApi.post(Endpoints.Profile.SaveSelection, {
        ...data,
        isUserCreated: status?.create,
      }).then((r) => r.data),
  });

  const onSubmitHandler = (data: { [key: string]: string }) => {
    mutate(data);
  };

  return (
    <Flex
      align='start'
      bg='white'
      direction='column'
      minH={240}
      p='8'
      rounded='2xl'
      w='100%'
    >
      {isWebScreen && (
        <Box mb={12}>
          <TranslatedText
            color='primary.base'
            fontSize='24px'
            fontWeight='bold'
            label='profileInformations_myProfile_myProfile_title'
          />
        </Box>
      )}
      <TranslatedText
        fontSize='18px'
        fontWeight='bold'
        label='profileInformations_myProfile_personalInformation_subtitle'
        mb={8}
        textColor='primary.base'
      />

      <Grid
        columnGap={12}
        gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        rowGap={{ base: 6, lg: 8 }}
        w='full'
      >
        {profileInfo.map((info, index) => {
          if (index === 1 || index === 2) {
            return (
              <Flex direction={'column'} flex='1' key={index}>
                <Flex align='center'>
                  <TranslatedText label={info.label} />
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        aria-label='profile info'
                        bg='white'
                        icon={<InfoIcon boxSize={6} fill='basic.400' />}
                        size='sm'
                      />
                    </PopoverTrigger>
                    <PopoverContent width={{ base: '270px', md: '380px' }}>
                      <PopoverCloseButton p={4} />
                      <PopoverBody p={4}>
                        <TranslatedText
                          label='general_general_info_title'
                          mb={4}
                          variant='body3'
                          w='full'
                        />

                        {index === 1 ? (
                          <TranslatedText
                            label='profileInformations_myProfile_explanation_text'
                            variant='body4'
                          />
                        ) : (
                          <TranslatedText
                            label='profileInformations_myProfile_explanation2_text'
                            variant='body4'
                          />
                        )}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Flex>
                <TranslatedText
                  label={info.text}
                  variant='body1'
                  w='fit-content'
                />
              </Flex>
            );
          }

          return (
            <TextWithLabel
              direction='column'
              gap={2}
              key={index}
              label={info.label}
              labelVariant='body2'
              text={info.text}
              textVariant='body1'
            />
          );
        })}
      </Grid>
      {isOpenAccount ? (
        <>
          <Divider
            borderColor='basic.4'
            borderStyle='dashed'
            my={{ base: '8', md: '10' }}
          />
          <Box mb='40px' w={'full'}>
            <form
              onChange={handleSubmit(onSubmitHandler)}
              style={{ height: '100%' }}
            >
              <TranslatedText
                fontSize='18px'
                fontWeight='bold'
                label='accountOpeningRequest_requestForm_stepper_step3_text'
                mb={8}
                textColor='primary.base'
              />
              <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                <FormCheckBox
                  control={control}
                  label='accountOpeningSteps_accountOpeningProcess_modal_repo_text'
                  name='repo'
                />
                <FormCheckBox
                  control={control}
                  label='accountOpeningSteps_accountOpeningProcess_modal_extractOfAccount_text'
                  name='mail'
                />
              </Flex>
            </form>
          </Box>
        </>
      ) : (
        ''
      )}
    </Flex>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const { user, token } = req.session;

  if (!user?.isLoggedIn) {
    return {
      redirect: {
        destination : paths.LOGIN,
        statusCode  : 302,
      },
    };
  }

  const selectionResponsee = await RemoteApi(token?.accessToken, false)
    .get(Endpoints.Account.SaveSelection, {
      params: {
        nationalId: user?.nationalId,
      },
    })
    .then((r) => r?.data?.response);

  return {
    props: {
      messages          : await getLocalizationText(),
      user              : req.session.user,
      selectionResponse : selectionResponsee,
    },
  };
}, sessionOptions);

export default Profile;
