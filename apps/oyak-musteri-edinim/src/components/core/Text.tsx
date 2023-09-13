import { Text, TextProps } from '@chakra-ui/react';
import { useTranslations, Formats, TranslationValues } from 'next-intl';
import React from 'react';

interface Props extends TextProps {
  label: string;
  values?: TranslationValues;
  formats?: Formats;
}

const TranslatedText: React.FC<Props> = ({
  label,
  values = undefined,
  formats = undefined,
  ...rest
}) => {
  const t = useTranslations();

  return (
    <Text fontFamily='roboto' {...rest}>
      {t(label, values, formats)}
    </Text>
  );
};

export default TranslatedText;
