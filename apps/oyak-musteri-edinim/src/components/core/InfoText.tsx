import { HStack, TextProps } from '@chakra-ui/react';
import { TranslationValues } from 'next-intl';
import React from 'react';

import TranslatedText from '@components/core/Text';
import InfoIcon from '@components/icon/Info';

interface Props extends TextProps {
  label: string;
  options?: TranslationValues;
}

const InfoText: React.FC<Props> = ({ label, options = undefined }) => (
  <HStack align='flex-start' my={4}>
    <InfoIcon boxSize={6} fill='basic.400' />
    <TranslatedText
      fontSize='14px'
      label={label}
      lineHeight='19px'
      values={options}
      variant='info'
    />
  </HStack>
);

export default InfoText;
