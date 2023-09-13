import React from "react";
import { Text, TextProps } from "@chakra-ui/react";
import { useTranslations, Formats, TranslationValues } from "next-intl";

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
    <Text
      fontSize="14px"
      lineHeight="18px"
      mb={2}
      whiteSpace="break-spaces"
      {...rest}
    >
      {t(label, values, formats)}
    </Text>
  );
};

export default TranslatedText;
