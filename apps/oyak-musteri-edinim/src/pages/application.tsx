import { Flex } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useSteps, Steps, Step } from 'chakra-ui-steps';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

import { NextPageWithLayout } from './_app';
import useUser from '@hooks/useUser';
import { getLocalizationText, InternalApi } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

import paths from '@routes/paths';

import { Endpoints } from '@common/endpoints';

import TranslatedText from '@components/core/Text';
import IncomeForm from '@components/forms/application/IncomeForm';
import PersonalInfoForm from '@components/forms/application/PersonalInfoForm';
import SecurityForm from '@components/forms/application/SecurityForm';
import ApplicationLayout from '@components/layout/ApplicationLayout';

type FormData = { [key: string]: unknown } | undefined;

const Application: NextPageWithLayout<null> = () => {
  const { user, refetch } = useUser({});

  const { activeStep, nextStep, prevStep } = useSteps({
    initialStep: 0,
  });

  const { push: navigate } = useRouter();
  const [ personal, setPersonal ] = useState<FormData>();
  const [ income, setIncome ] = useState<FormData>();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: FormData) =>
      InternalApi.post(Endpoints.Account.Application, data).then(
        (r) => r.data.response,
      ),
    onSuccess() {
      refetch();
    },
  });

  useEffect(() => {
    if (user?.application) {
      navigate(paths.DEFAULT);
    }
  }, [ user?.application ]);

  const formSubmitHandler = (data: FormData) => {
    const formData = { ...personal, ...income, ...data };

    // TODO(anyone) post data and redirect when endpoint available
    // status && setStatus({ ...status, application: true });
    delete formData.birthdate;
    delete formData.question;

    mutate(formData);
  };

  const steps = [
    {
      label : 'accountOpeningRequest_requestForm_stepper_step1_text',
      form  : (
        <PersonalInfoForm
          defaultValues={personal}
          goBack={() => navigate(paths.LOGOUT)}
          onSubmit={(data) => {
            setPersonal(data);
            nextStep();
          }}
        />
      ),
    },
    {
      label : 'accountOpeningRequest_requestForm_stepper_step2_text',
      form  : (
        <IncomeForm
          defaultValues={income}
          goBack={prevStep}
          onSubmit={(data) => {
            setIncome(data);
            nextStep();
          }}
        />
      ),
    },
    {
      label : 'accountOpeningRequest_requestForm_stepper_step3_text',
      form  : (
        <SecurityForm
          goBack={prevStep}
          isSubmitLoading={isLoading}
          onSubmit={formSubmitHandler}
        />
      ),
    },
  ];

  return (
    <Flex direction='column' h='full' w='full'>
      <Steps
        activeStep={activeStep}
        colorScheme='red'
        fontFamily='roboto'
        labelOrientation='vertical'
        mb={4}
        responsive={false}
        size='sm'
        state={isLoading ? 'loading' : undefined}
      >
        {steps.map(({ label }, index) => (
          <Step
            key={index}
            label={
              <TranslatedText
                color={activeStep >= index ? 'red' : ''}
                label={label}
              />
            }
          >
            {steps[activeStep].form}
          </Step>
        ))}
      </Steps>
    </Flex>
  );
};

Application.getLayout = function getLayout(page: ReactElement) {
  return (
    <ApplicationLayout title='accountOpeningRequest_requestForm_request_information_subtitle'>
      {page}
    </ApplicationLayout>
  );
};
export default Application;

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination : paths.LOGIN,
        statusCode  : 302,
      },
    };
  } else if (user.application) {
    return {
      redirect: {
        destination : paths.DEFAULT,
        statusCode  : 302,
      },
    };
  }

  return {
    props: {
      messages: await getLocalizationText(),
    },
  };
}, sessionOptions);
