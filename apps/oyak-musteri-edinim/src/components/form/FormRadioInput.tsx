import {
  FormControl,
  FormErrorMessage,
  Stack,
  Radio,
  RadioGroup,
  FormLabel,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Control, useController } from 'react-hook-form';

interface Props {
  control: Control;
  name: string;
  label: string;
  defaultValue?: string;
  options: { key: string; value: string }[];
}

export const FormRadioInput: React.FC<Props> = ({
  control,
  name,
  label,
  defaultValue = '',
  options,
}) => {
  const { field, fieldState } = useController({ name, control, defaultValue });
  const t = useTranslations();
  const isInvalid = !!fieldState.error;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel> {t(label)} </FormLabel>
      <RadioGroup defaultValue='1' {...field} fontSize='14px' variant='body4'>
        <Stack>
          {options.map((o) => (
            <Radio fontSize='14px' key={o.key} value={o.key}>
              {' '}
              {t(o.value)}{' '}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <FormErrorMessage>{t(fieldState.error?.message || '')}</FormErrorMessage>
    </FormControl>
  );
};
