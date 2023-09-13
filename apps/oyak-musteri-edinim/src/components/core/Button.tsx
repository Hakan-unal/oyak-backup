import { Button as CButton, ButtonProps } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props extends ButtonProps {
  label: string;
}

const Button: React.FC<Props> = ({ label, ...rest }) => {
  const t = useTranslations();

  return (
    <CButton
      h={{ base: '36px', md: '42px' }}
      w={{ base: 'full', md: 220 }}
      {...rest}
    >
      {t(label)}
    </CButton>
  );
};

export default Button;
