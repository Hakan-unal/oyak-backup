import { Text, TextProps } from '@chakra-ui/react';
import { useTranslations, Formats, TranslationValues } from 'next-intl';
import React from 'react';

interface Props extends TextProps {
  label: string;
  html?: string;
  values?: TranslationValues;
  formats?: Formats;
}

const HtmlWithText: React.FC<Props> = ({
  label,
  html,
  values = undefined,
  formats = undefined,
  ...rest
}) => {
  const t = useTranslations();
  const str1 = t(label, values, formats);
  const str2 = t(html, values, formats);

  // eslint-disable-next-line react/no-danger-with-children
  return (
    <Text
      {...rest}
      dangerouslySetInnerHTML={{
        __html: `${str1} <a target="_blank" style="color:rgb(228, 5, 32)" href="${str2}">${str2}</a>`,
      }}
    />
  );
};

export default HtmlWithText;
