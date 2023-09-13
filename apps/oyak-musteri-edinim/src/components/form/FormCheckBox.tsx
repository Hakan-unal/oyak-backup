import {
  FormControl,
  FormErrorMessage,
  Checkbox,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Control, useController } from 'react-hook-form';

import TranslatedText from '../core/Text';

type Props = {
  control: Control;
  name: string;
  label: string;
  actionable?: React.ReactNode;
  defaultValue?: boolean;
  isDisabled?: boolean;
  variant?: string;
};

const FormCheckBox: React.FC<Props> = ({
  control,
  name,
  label,
  actionable,
  defaultValue,
  isDisabled,
  variant = '',
}) => {
  const { field, fieldState } = useController({ name, control, defaultValue });
  const t = useTranslations();
  const isInvalid = !!fieldState.error;

  return (
    <FormControl isInvalid={isInvalid} mb='0.5' width={{ base: 'full' }}>
      <Stack align='center' direction='row' w='full' wordBreak='break-word'>
        <Checkbox
          {...field}
          isChecked={field.value}
          isDisabled={isDisabled}
          size='xl'
        />
        <Flex
          alignContent='baseline'
          alignItems='start'
          direction='row'
          display='inline'
          fontSize='16px'
          lineHeight='19px'
        >
          {actionable}
          <TranslatedText
            color='basic.400'
            display='inline'
            label={label}
            variant={variant}
          />
        </Flex>
      </Stack>
      <FormErrorMessage my={0}>
        {t(fieldState.error?.message || '')}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormCheckBox;
