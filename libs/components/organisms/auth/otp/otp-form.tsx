/* eslint-disable max-len */
import { Control, FieldError } from 'react-hook-form';

import BrandLogo from '@libs/assets/images/svgs/brand-logo.svg';
import Button from '@libs/components/atomic/button/button';
import OtpInputs from '@libs/components/molecules/otp-inputs/otp-inputs';
import TranslatedText from '@libs/components/molecules/text/translated-text';

interface OtpFormProps {
  secondsLeft: number;
  remainSmsCount: number;
  reSendDisabled: boolean;
  handleReSend?: () => void;
  handleInfoButton?: () => void;
  handleBackButton?: () => void;
  handleSubmit?: () => void;
  control: Control;
  errors;
}

const OtpForm = ({
  secondsLeft,
  remainSmsCount,
  reSendDisabled,
  handleReSend,
  handleInfoButton,
  handleBackButton,
  handleSubmit,
  control,
  errors,
}: OtpFormProps) => (
  <div className='w-full h-full flex flex-col items-center justify-between px-4 sm:px-16 pt-14 pb-12 bg-white rounded-2xl'>
    <div className='flex flex-col items-center justify-start bg-white'>
      <BrandLogo className='mb-7' height='30' width='220' />
      <TranslatedText
        className='text-center mb-9'
        label='login_otp_enterOtp_description_text'
        textColor='text-basic-five'
      />
      <TranslatedText
        className='text-sm mb-6'
        components={[ <strong key='0' /> ]}
        label='login_otp_enterOtp_remainingTime_text'
        values={{ second: secondsLeft }}
      />
      <OtpInputs
        control={control}
        error={errors.otpCode as FieldError}
        name='otpCode'
      />
      <div className='flex flex-row mb-14 mt-6'>
        <div className='flex justify-center items-center box-border h-7 w-7 rounded-full mr-2 border-basic-four border-4'>
          {remainSmsCount}
        </div>
        <Button
          buttonType='text'
          disabled={reSendDisabled || remainSmsCount === 0}
          label='login_otp_enterOtp_sendAgain_button'
          onClick={handleReSend}
        />
      </div>
      <Button
        buttonColor='secondary'
        buttonType='text'
        className='font-bold'
        label='login_otp_enterOtp_didntReceiveSms_button'
        onClick={handleInfoButton}
        type='button'
      />
    </div>
    <div className='flex flex-col-reverse sm:flex-row gap-4 w-full sm:justify-end'>
      <Button
        buttonColor='secondary'
        className='text-basic-six bg-white sm:w-[220px]'
        label='general_general_back_button'
        onClick={handleBackButton}
      />
      <Button
        buttonColor='primary'
        className='sm:w-[220px]'
        disabled={secondsLeft <= 0}
        label='general_general_continue_button'
        onClick={handleSubmit}
      />
    </div>
  </div>
);

export default OtpForm;
