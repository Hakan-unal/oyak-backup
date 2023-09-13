import {
  Box,
  chakra,
  Flex,
  FormControl,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { NextPageWithLayout } from './_app';
import useUser from '@hooks/useUser';
import { getLocalizationText, InternalApi } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

import paths from '@routes/paths';

import { DynamicType } from '@models/common.model';

import Button from '@components/core/Button';
import TranslatedText from '@components/core/Text';
import OtpInputs from '@components/form/FormPinInput';
import ButtonWrapper from '@components/forms/application/ButtonWrapper';
import ApplicationLayout from '@components/layout/ApplicationLayout';
import InfoModal from '@components/modals/InfoModal';

const schema = object().shape({
  otp: string()
    .required('general_general_requiredField_text')
    .min(6, 'En az 6 karakter olmalı.'),
});

const OTPPage: NextPageWithLayout<{
  attempt: number;
  duration: number;
}> = ({ attempt, duration }) => {
  const [ timer, setTimer ] = useState(duration);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { user, refetch } = useUser({});
  const navigate = useRouter();

  const otpMutate = useMutation({
    mutationFn: (data) =>
      InternalApi.post('/api/otp/confirm', data).then((r) => r.data),
    onSuccess: () => refetch(),
  });

  const resendMutation = useMutation({
    mutationFn : () => InternalApi.get('/api/otp/resend').then((r) => r.data),
    onSuccess  : () => navigate.reload(),
  });

  const { push } = useRouter();

  useEffect(() => {
    const tmr = setTimeout(() => {
      if (timer !== 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(tmr);
    };
  }, [ timer ]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode           : 'onSubmit',
    reValidateMode : 'onChange',
    resolver       : yupResolver(schema),
    defaultValues  : { otp: '' },
  });

  const reSendHandler = () => {
    resendMutation.mutate();
  };

  const onSubmit = (data: DynamicType) => {
    otpMutate.mutate(data);
  };

  useEffect(() => {
    if (user?.isLoggedIn) {
      if (user.isExist && user?.application) {
        navigate.push(paths.SECURITY_QUESTION);
      } else if (user.isExist && !user?.application) {
        navigate.push(paths.DEFAULT);
      } else {
        navigate.push(paths.APPLICATION);
      }
    }
  }, [ user ]);

  return (
    <Flex align='center' direction='column' h='full' w='full'>
      <Flex mb={6}>
        <TranslatedText
          display='inline-block'
          label='accountOpeningRequest_login_enterOtp_timeRemaining_text'
          mr={2}
        />
        <TranslatedText
          fontWeight='bold'
          label={'accountOpeningRequest_login_enterOtp_second_text'}
          values={{ second: timer }}
        />
      </Flex>

      <Flex
        align='center'
        as={chakra.form}
        direction='column'
        gap={4}
        height='full'
        justify='space-between'
        onSubmit={handleSubmit(onSubmit)}
        width='full'
      >
        <FormControl isInvalid={!!errors.otp} w='auto'>
          <HStack>
            <OtpInputs
              control={control}
              error={errors.otp as FieldError}
              name='otp'
            />
          </HStack>
        </FormControl>
        <HStack gap={2}>
          <TranslatedText
            label={'accountOpeningRequest_login_enterOtp_remainingAmount_text'}
            mr={2}
            variant='info'
          />
          <Box
            border='4px'
            borderColor='basic.400'
            boxSize={8}
            fontWeight='bold'
            rounded='full'
            textAlign='center'
          >
            {attempt}
          </Box>
          <Button
            isDisabled={attempt === 0 || timer !== 0}
            isLoading={resendMutation.isLoading}
            label='accountOpeningRequest_login_enterOtp_sendAgain_button'
            onClick={reSendHandler}
            variant='link'
            w='auto'
          />
        </HStack>
        <Button
          colorScheme='red'
          label='accountOpeningRequest_login_enterOtp_didntReceiveSms_button'
          onClick={onOpen}
          variant='link'
        />
        <InfoModal
          isCentered
          isOpen={isOpen}
          message='accountOpeningRequest_login_enterOtp_didntReceiveSms_text'
          onClose={onClose}
          title='accountOpeningRequest_login_enterOtp_didntReceiveSms_title'
        />
        <ButtonWrapper
          goBack={() => push('/api/logout')}
          isSubmitDisabled={timer === 0}
        />
      </Flex>
    </Flex>
  );
};

OTPPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ApplicationLayout title='accountOpeningRequest_login_enterOtp_description_text'>
      {page}
    </ApplicationLayout>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const otp = await req.session.otp;

  if (!otp) {
    return {
      redirect: {
        destination : paths.LOGIN,
        statusCode  : 302,
      },
    };
  }

  const resendDate = new Date(otp?.resendAt ?? 0);
  const now = new Date();
  const duration = Math.ceil((resendDate.getTime() - now.getTime()) / 1000);
  const messages = await getLocalizationText();

  return {
    props: {
      messages,
      attempt  : otp?.attempt || 0,
      duration : duration > 0 ? duration : 0,
    },
  };
}, sessionOptions);

export default OTPPage;
