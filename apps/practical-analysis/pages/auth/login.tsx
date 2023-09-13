import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

import Loading from '@libs/components/molecules/loading/loading';
import LoginForm from '@libs/components/organisms/auth/login/login-form';
import LoginLayout from '@libs/components/organisms/auth/login/login-layout';
import { IsDevelopment } from '@libs/constants/common';
import { BIRTHDATE_MIN_DATE } from '@libs/constants/date-constants';
import { DynamicType } from '@libs/models/model';
import { dateRequestFormatter } from '@libs/utils/date.utils';
import { getUseFormDefaults } from '@libs/utils/hook-form.utils';

import { customerCheckAndSendSmsHandler } from 'prac-analysis/actions/token-api';
import { COOKIE_KEYS } from 'prac-analysis/constants/cookies';
import paths from 'prac-analysis/routes/internal-paths';

const loginSchema = Yup.object().shape({
  birthdate: Yup.date()
    .required('general_general_requiredField_text')
    .min(new Date(BIRTHDATE_MIN_DATE), 'general_general_incorrect_errorMessage')
    .max(new Date(), 'general_general_incorrect_errorMessage'),
  customerId: Yup.string().required('general_general_requiredField_text'),
});

const Login = () => {
  const { replace } = useRouter();
  const authToken = getCookie(COOKIE_KEYS.AUTHORIZATION_TOKEN);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm(getUseFormDefaults(loginSchema));

  const { mutate, isLoading } = useMutation(customerCheckAndSendSmsHandler, {
    onSuccess: (response) => {
      if (response?.businessSuccess) {
        replace({ pathname: paths.OTP });
      }
    },
  });

  useEffect(() => {
    if (IsDevelopment) {
      setValue('customerId', '713106');
      setValue('birthdate', new Date('1988-06-13'));
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      replace(paths.DASHBOARD);
    }
  }, [ authToken, replace ]);

  const onSubmit = ({ birthdate, customerId }: DynamicType) => {
    mutate({
      birthdate: dateRequestFormatter(new Date(birthdate)),
      customerId,
    });
  };

  return (
    <LoginLayout>
      {isLoading && <Loading variant='screen' />}
      <LoginForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
      />
    </LoginLayout>
  );
};

export default Login;
