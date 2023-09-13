// TODO(anyone): Check loc.key
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import { IS_COOKIE_SECURE } from '@libs/api/constants';
import Loading from '@libs/components/molecules/loading/loading';
import AuthLayout from '@libs/components/organisms/auth/auth-layout';
import {
  OTP_LENGTH,
  RE_SEND_ENABLE_SECOND,
} from '@libs/components/organisms/auth/constants';
import OtpForm from '@libs/components/organisms/auth/otp/otp-form';
import { SECOND_MS } from '@libs/constants/date-constants';
import useCountDown from '@libs/hooks/useCountDown';
import useModal from '@libs/hooks/useModal';
import { CustomTokenResponse } from '@libs/models/token-api.model';
import { dateDiff } from '@libs/utils/date.utils';
import { getUseFormDefaults } from '@libs/utils/hook-form.utils';

import {
  customerApproveSmsHandler,
  sendSmsToCustomerHandler,
} from 'apps/practical-portfolio/actions/token-api';
import { COOKIE_KEYS } from 'prac-portfolio/constants/cookies';
import paths from 'prac-portfolio/routes/internal-paths';

const otpSchema = Yup.object().shape({
  otpCode: Yup.string()
    .required('general_general_requiredField_text')
    .length(OTP_LENGTH, 'general_general_missing_errorMessage'),
});

interface OtpProps {
  sendSmsRemainTime?: number;
  reSendButtonEnableTime: number;
}

const Otp = ({ sendSmsRemainTime, reSendButtonEnableTime }: OtpProps) => {
  const { replace } = useRouter();
  const { AlertModal, infoAlert } = useModal();
  const [ reSendDisabled, setReSendDisabled ] = useState(true);
  const loginResponseCookie = getCookie(COOKIE_KEYS.LOGIN_RESPONSE);
  const [ firstEntry, setFirstEntry ] = useState(true);

  const loginResponse: CustomTokenResponse =
    loginResponseCookie && JSON.parse(loginResponseCookie?.toString());

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm(
    getUseFormDefaults(otpSchema, {
      reValidateMode: 'onSubmit',
    }),
  );

  const otpCode = watch('otpCode');

  const { mutate: approveSmsMutate, isLoading: isApproveSmsLoading } =
    useMutation(customerApproveSmsHandler, {
      onSuccess: (response) => {
        if (response?.businessSuccess) {
          replace(paths.DASHBOARD);
        }
      },
    });

  const { mutate: resendSmsMutate, isLoading: isResendSmsLoading } =
    useMutation(sendSmsToCustomerHandler, {
      onSuccess: (response) => {
        if (response.businessSuccess) {
          const sendSmsResponse = response.data as CustomTokenResponse;

          resetCounter(sendSmsResponse.sendSmsRemainTime);
          setReSendDisabled(true);
          setTimeout(() => {
            setReSendDisabled(false);
          }, RE_SEND_ENABLE_SECOND * SECOND_MS);
        }
      },
    });

  useEffect(() => {
    if (sendSmsRemainTime && sendSmsRemainTime > 0) {
      resetCounter(sendSmsRemainTime);
    }

    setTimeout(() => {
      setReSendDisabled(false);
    }, reSendButtonEnableTime * SECOND_MS);
  }, []);

  const handleCodeReset = () => {
    if (otpCode) {
      setValue('otpCode', '');
    }
  };

  const handleTimerEnd = () => {
    if (loginResponse?.remainSmsCount === 0) {
      replace(paths.LOGIN);
    }

    if (otpCode) {
      setValue('otpCode', '');
    }
  };

  const { secondsLeft, resetCounter } = useCountDown({
    onReset    : handleCodeReset,
    onTimerEnd : handleTimerEnd,
  });

  useEffect(() => {
    if (!loginResponse) {
      replace(paths.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (otpCode?.length === OTP_LENGTH && firstEntry && secondsLeft > 0) {
      onSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ otpCode ]);

  const handleReSend = () => {
    resendSmsMutate();
  };

  const handleInfoButton = () => {
    infoAlert({
      title          : 'login_otp_enterOtp_didntReceiveSms_title',
      text           : 'login_otp_enterOtp_didntReceiveSms_text',
      hideButtons    : true,
      textMobileSize : 'text-xs',
    });
  };

  const onSubmit = () => {
    if (isApproveSmsLoading) {
      return;
    }

    setFirstEntry(false);
    approveSmsMutate(otpCode);
    setValue('otpCode', '');
  };

  return (
    <>
      {(isApproveSmsLoading || isResendSmsLoading) && (
        <Loading variant='screen' />
      )}
      <AuthLayout>
        <OtpForm
          control={control}
          errors={errors}
          handleBackButton={() => replace(paths.LOGIN)}
          handleInfoButton={handleInfoButton}
          handleReSend={handleReSend}
          handleSubmit={handleSubmit(onSubmit)}
          reSendDisabled={reSendDisabled}
          remainSmsCount={loginResponse?.remainSmsCount ?? 0}
          secondsLeft={secondsLeft}
        />
      </AuthLayout>
      <AlertModal />
    </>
  );
};

export const getServerSideProps = ({ req, res }) => {
  const loginResponseCookie = getCookie(COOKIE_KEYS.LOGIN_RESPONSE, {
    req,
    res,
    sameSite : 'lax',
    secure   : IS_COOKIE_SECURE,
  });

  const loginResponse: CustomTokenResponse =
    loginResponseCookie && JSON.parse(loginResponseCookie?.toString());

  let sendSmsRemainTime: number | undefined;

  if (loginResponse?.smsExpireAt) {
    sendSmsRemainTime = dateDiff(new Date(), loginResponse.smsExpireAt);

    if (sendSmsRemainTime < 0) {
      sendSmsRemainTime = 0;
    }
  }

  const reSendButtonEnableTime =
    RE_SEND_ENABLE_SECOND - dateDiff(loginResponse?.sendSmsDate, new Date());

  return {
    props: {
      protected: false,
      sendSmsRemainTime,
      reSendButtonEnableTime:
        reSendButtonEnableTime < 0 ? 0 : reSendButtonEnableTime,
    },
  };
};

export default Otp;
