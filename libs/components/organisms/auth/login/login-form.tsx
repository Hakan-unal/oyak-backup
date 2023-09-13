/* eslint-disable max-len */
import { Control } from 'react-hook-form';

import BrandLogo from '@libs/assets/images/svgs/brand-logo.svg';
import InfoIcon from '@libs/assets/images/svgs/Info.svg';
import Button from '@libs/components/atomic/button/button';
import FormDatePicker from '@libs/components/molecules/form/form-datepicker';
import FormInput, {
  InputPatternEnum,
} from '@libs/components/molecules/form/form-input';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { DEFAULT_MAX_INPUT_LENGTH } from '@libs/constants/common';
import useModal from '@libs/hooks/useModal';
import { themeColors } from '@libs/theme/index';

interface LoginFormProps {
  handleSubmit: () => void;
  control: Control;
  errors;
}

const LoginForm = ({ handleSubmit, control, errors }: LoginFormProps) => {
  const { AlertModal, infoAlert } = useModal();

  const showInfoMessage = () => {
    infoAlert({
      title          : 'login_login_popup_explanation_title',
      text           : 'login_login_popup_explanation_text',
      hideButtons    : true,
      textMobileSize : 'text-xs',
    });
  };

  return (
    <form
      className='h-full flex flex-col items-center justify-between px-4 sm:px-16 pt-14 pb-12 bg-white rounded-none sm:rounded-tr-2xl sm:rounded-br-2xl'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col items-center sm:items-start justify-start mb-10 sm:mb-0'>
        <div className='w-[220px] h-[30px] mb-6'>
          <BrandLogo />
        </div>
        <TranslatedText
          className='text-center mb-10'
          label='login_login_enterInformation_text'
          textColor='text-basic-five'
        />
        <FormInput
          className='mb-3 xs:mb-8'
          control={control}
          error={errors.customerId}
          maxLength={DEFAULT_MAX_INPUT_LENGTH}
          name='customerId'
          patternType={InputPatternEnum.Number}
          placeholder='login_login_customerNumber_placeholder'
          type='tel'
        />
        <FormDatePicker
          className='mb-3 xs:mb-8 '
          control={control}
          error={errors.birthdate}
          name='birthdate'
          placeholder='login_login_birthDate_placeholder'
        />
        <div className='flex flex-row justify-start items-start mb-8 xs:mb-0'>
          <div className='h-[20] w-[20]'>
            <InfoIcon
              className='mr-2'
              fill={themeColors.basic.five}
              height='20'
              width='20'
            />
          </div>
          <TranslatedText
            className='text-sm'
            components={[
              <a
                className='font-bold text-primary-dark cursor-pointer'
                key='login_login_popup_explanation_text'
                onClick={showInfoMessage}
                type='button'
              />,
            ]}
            label='login_login_explanation_text'
            textColor='text-basic-five'
          />
        </div>
      </div>
      <div className='flex w-full justify-end'>
        <Button
          className='sm:w-[220px]'
          label='login_login_signUp_button'
          type='submit'
        />
      </div>
      <AlertModal />
    </form>
  );
};

export default LoginForm;
