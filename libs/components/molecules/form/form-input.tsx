import { InputHTMLAttributes } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import Input from '@libs/components/atomic/input/input';
import FieldWrapper from '@libs/components/molecules/field-wrapper/field-wrapper';
import { outOfNumberRegex } from '@libs/utils/regex.utils';

export enum InputPatternEnum {
  Number = 'number',
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  name: string;
  className?: string;
  placeholder?: string;
  control: Control;
  patternType?: InputPatternEnum;
}

const FormInput = ({
  name,
  control,
  error,
  placeholder,
  className,
  patternType,
  onChange,
  ...props
}: FormInputProps) => {
  const checkPattern = (value: string): string => {
    let result = value;

    if (patternType === InputPatternEnum.Number) {
      result = value.replace(outOfNumberRegex, '');
    }

    return result;
  };

  return (
    <FieldWrapper className={className} error={error} placeholder={placeholder}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            {...props}
            onChange={(event) => {
              field.onChange(checkPattern(event.target.value));

              onChange?.(event);
            }}
          />
        )}
      />
    </FieldWrapper>
  );
};

export default FormInput;
