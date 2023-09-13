import { ChangeEvent, KeyboardEvent, useMemo, useState } from 'react';
import {
  Control,
  Controller,
  FieldError,
  useController,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BACKSPACE_KEY, OTP_LENGTH, REG_DIGIT } from './constants';
import Input from '@libs/components/atomic/input/input';

interface OtpInputsProps {
  error?: FieldError;
  control?: Control;
  name: string;
  inputCount?: number;
}

const OtpInputs = ({
  control,
  error,
  name,
  inputCount = OTP_LENGTH,
}: OtpInputsProps) => {
  const { t } = useTranslation();
  const [ otpValue, setOtpValue ] = useState<string>('');

  const {
    field: { onBlur, onChange },
  } = useController({
    name,
    control,
  });

  const valueItems = useMemo(() => {
    const valueArray = otpValue.split('');
    const items: Array<string> = [];

    for (let i = 0; i < inputCount; i++) {
      const char = valueArray[i];

      if (REG_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [ otpValue, inputCount ]);

  const inputOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { value, previousElementSibling } = event.target as HTMLInputElement;

    if (event.key !== BACKSPACE_KEY || value) {
      return;
    }

    const previousElement = previousElementSibling as HTMLInputElement;

    if (previousElement) {
      previousElement.focus();
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const target = event.target;
    let targetValue = target.value;
    const isValidTargetValue = REG_DIGIT.test(targetValue);

    if (!isValidTargetValue && targetValue) {
      return;
    }

    targetValue = isValidTargetValue ? targetValue : '';

    const newValue = `${otpValue.substring(
      0,
      index,
    )}${targetValue}${otpValue.substring(index + 1)}`;

    if (newValue.length < inputCount + 1) {
      setOtpValue(newValue);
      onChange(newValue);
      onBlur();
    }

    if (!isValidTargetValue) {
      return;
    }

    if (newValue.length >= inputCount) {
      const lastInput = document.getElementById((inputCount - 1).toString());

      lastInput?.focus();
    } else {
      const nextElement = target.nextElementSibling as HTMLInputElement;

      nextElement?.focus();
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <div className='mb-6 '>
          <div className='flex justify-between [&>*]:ml-3'>
            {valueItems.map((digit, index) => (
              <Input
                autoComplete='one-time-code'
                autoFocus={index === 0}
                className={`w-10 h-12 text-center border rounded-lg ${
                  error && 'border-primary-dark'
                }`}
                id={index.toString()}
                key={index}
                onChange={(event) => handleChange(event, index)}
                onKeyDown={inputOnKeyDown}
                type='tel'
                value={digit}
              />
            ))}
          </div>
          {error && (
            <span className='text-xs ml-3 mt-2 text-primary-dark'>
              {t(error.message || '')}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default OtpInputs;
