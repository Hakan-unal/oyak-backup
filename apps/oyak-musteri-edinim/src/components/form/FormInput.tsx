import {
  FormControl,
  InputGroup,
  Input,
  FormLabel,
  FormErrorMessage,
  Select,
  InputRightElement,
  InputProps,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Control, useController } from 'react-hook-form';

import Regex from '@utils/regex.util';

import Chevron from '@components/icon/Chevron';

type Props =
  | {
      type: 'text' | 'date' | 'email' | 'datetime-local' | 'number' | 'tel';
      patternType?: 'tckn';
      control: Control;
      name: string;
      label: string;
      defaultValue?: string;
      width?: number | string;
      height?: number | string;
      showCheck?: boolean;
      options?: never;
      placeHolder?: never;
      maxLength?: number;
      isDisabled?: boolean;
      inputProps?: InputProps;
    }
  | {
      type: 'select';
      patternType?;
      control: Control;
      name: string;
      label: string;
      width?: number | string;
      height?: number | string;
      showCheck?: never;
      defaultValue?: string;
      placeHolder: string;
      options: { key: string; value: string }[];
      maxLength?: never;
      isDisabled?: boolean;
      inputProps?: never;
    };

export const FormInput: React.FC<Props> = ({
  control,
  name,
  label,
  type = 'text',
  patternType,
  defaultValue = '',
  options,
  width,
  height,
  showCheck = false,
  isDisabled,
  maxLength,
  placeHolder,
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control, defaultValue });
  const t = useTranslations();

  const checkInputType = (value: string): string => {
    let result = value;

    if (patternType === 'tckn') {
      result = value.replace(Regex.Numeric, '');
    }

    return result;
  };

  const getInput = (fieldType: Props['type']) => {
    switch (fieldType) {
      case 'select':
        return (
          options && (
            <Select
              autoComplete='off'
              disabled={isDisabled}
              placeholder={fieldState.isDirty ? '' : t(placeHolder || '')}
              variant='flushed'
              {...field}
              borderBottomColor='basic.300'
            >
              {options.map((o) => (
                <option key={o.key} value={o.key}>
                  {t(o.value)}
                </option>
              ))}
            </Select>
          )
        );

      default:
        return (
          <Input
            autoComplete='off'
            disabled={isDisabled}
            maxLength={maxLength}
            onWheel={(event) => event.currentTarget.blur()}
            pl={0}
            placeholder=' '
            type={type}
            {...field}
            {...rest.inputProps}
            onChange={(event) =>
              field.onChange(checkInputType(event.target.value))
            }
          />
        );
    }
  };

  const isInvalid = !!fieldState.error;

  return (
    <FormControl
      height={height || 10}
      isInvalid={isInvalid}
      variant='floating'
      width={{ base: 'full', md: width || 'full' }}
    >
      <InputGroup>
        {getInput(type)}
        <FormLabel>{t(label)}</FormLabel>
        {showCheck && !isInvalid && fieldState.isTouched && (
          <InputRightElement>
            <Chevron boxSize={6} fill='primary.base' />
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{t(fieldState.error?.message || '')}</FormErrorMessage>
    </FormControl>
  );
};
