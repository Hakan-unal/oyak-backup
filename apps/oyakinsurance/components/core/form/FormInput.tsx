/* eslint-disable max-len */

import { InputHTMLAttributes } from "react";
import { Control, Controller } from "react-hook-form";
import InputMask from "react-input-mask";

import FieldWrapper from "./FieldWrapper";

export const outOfNumberRegex = /[^\d]/g;

export enum InputPatternEnum {
  Number = "number",
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: any;
  name: string;
  className?: string;
  placeholder?: string;
  control: Control;
  patternType?: InputPatternEnum;
  mask?: string;
}

const ControllerFormInput = ({
  name,
  control,
  error,
  placeholder,
  className,
  patternType,
  mask,
  onChange,
  ...props
}: FormInputProps) => {
  const checkPattern = (value: string): string => {
    let result = value;

    if (patternType === InputPatternEnum.Number) {
      result = value.replace(outOfNumberRegex, "");
    }

    return result;
  };

  return (
    <FieldWrapper className={className} error={error} placeholder={placeholder}>
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          mask ? (
            <InputMask
              mask={mask}
              onChange={(event) => {
                field.onChange(event);
                onChange?.(event);
              }}
              value={props.value}
            >
              {(inputProps: any) => (
                <input
                  autoComplete="off"
                  className="block py-1.5 px-0 w-full text-base font-bold bg-transparent rounded-none border-0 border-b-2 border-basic-four appearance-none focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                  {...inputProps}
                />
              )}
            </InputMask>
          ) : (
            <input
              autoComplete="off"
              className="block py-1.5 px-0 w-full text-base font-bold bg-transparent rounded-none border-0 border-b-2 border-basic-four appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
              {...props}
              {...field}
              onChange={(event) => {
                field.onChange(checkPattern(event.target.value));

                onChange?.(event);
              }}
            />
          )
        }
      />
    </FieldWrapper>
  );
};

export default ControllerFormInput;
