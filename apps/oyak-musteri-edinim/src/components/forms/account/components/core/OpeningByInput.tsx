import {
  useRadioGroup,
  VStack,
  Flex,
  Box,
  As,
  Center,
  Icon,
  RadioProps,
  useRadio,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Control, useController } from 'react-hook-form';

import TranslatedText from '@components/core/Text';
import Bank from '@components/icon/Bank';
import Pin from '@components/icon/Pin';
import Video from '@components/icon/Video';

type Props = {
  radioProps: RadioProps;
  icon: As;
  label: string;
};

function RadioCard({ radioProps, icon, label }: Props) {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label' w='full'>
      <input {...input} />
      <Flex
        {...checkbox}
        _checked={{
          borderColor: 'primary.base',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        align='flex-start'
        borderRadius='md'
        borderWidth='1px'
        cursor='pointer'
        gap={4}
        h='28'
        justify='start'
        px={5}
        py={3}
      >
        <Box
          {...checkbox}
          _checked={{
            p           : 1,
            borderWidth : 6,
            borderColor : 'primary.base',
          }}
          borderColor='helper.gray.base'
          borderWidth={2}
          p={2}
          rounded='full'
        />
        <Box>
          <Center bg={'red.100'} boxSize='8' mb={2} rounded='lg'>
            <Icon as={icon} boxSize={6} fill='primary.base' />
          </Center>
          <TranslatedText
            fontSize='12px'
            label={label}
            lineHeight='16px'
            variant='info'
          />
        </Box>
      </Flex>
    </Box>
  );
}

type InputProps = {
  control: Control;
  name: string;
  defaultValue: string;
};

const options = [
  {
    value: 'online',
    label:
      'accountOpeningSteps_accountOpeningProcess_modal_onlineInterview_text',
    icon: Video,
  },
  {
    value: 'branch',
    label:
      'accountOpeningSteps_accountOpeningProcess_modal_signatureAtTheBranch_text',
    icon: Bank,
  },
  {
    value: 'courier',
    label:
      'accountOpeningSteps_accountOpeningProcess_modal_signatureByCourier_text',
    icon: Pin,
  },
];

const OpeningByInput: React.FC<InputProps> = ({
  control,
  defaultValue,
  name,
}) => {
  const { field, fieldState } = useController({ control, defaultValue, name });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name         : 'type',
    defaultValue : 'react',
  });

  const t = useTranslations();
  const group = getRootProps();
  const isInvalid = !!fieldState.error;

  return (
    <FormControl isInvalid={isInvalid}>
      <VStack w='full' {...group} {...field} mt='4'>
        <Flex
          align='stretch'
          direction={{ base: 'column', md: 'row' }}
          gap='4'
          justify='space-between'
          w='full'
        >
          {options.map(({ icon, label, value }) => {
            const radio = getRadioProps({ value });

            return (
              <RadioCard
                icon={icon}
                key={value}
                label={label}
                radioProps={radio}
              />
            );
          })}
        </Flex>
      </VStack>
      <FormErrorMessage>{t(fieldState.error?.message || '')}</FormErrorMessage>
    </FormControl>
  );
};

export default OpeningByInput;
