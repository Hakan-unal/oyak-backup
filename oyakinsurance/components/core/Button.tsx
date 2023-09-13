import React from "react";
import { Button as CButton, ButtonProps } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface Props extends ButtonProps {
  label: string;
}

const Button: React.FC<Props> = ({ label, ...rest }) => {
  const t = useTranslations();

  return (
    <CButton h="52px" w="full" {...rest}>
      {t(label)}
    </CButton>
  );
};

export default Button;
