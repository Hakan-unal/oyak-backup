import { Link, Spacer, TextProps } from '@chakra-ui/react';
import { TranslationValues } from 'next-intl';
import React from 'react';

import TranslatedText from '@components/core/Text';
import LogoutIcon from '@components/icon/Logout';

interface Props extends TextProps {
  label: string;
  options?: TranslationValues;
  onOpen?: () => void;
}

const LogoutLink: React.FC<Props> = ({ onOpen, label }) => (
  <>
    <Spacer />
    <Link display='flex' flexDirection='row' gap={4} onClick={onOpen}>
      <LogoutIcon boxSize={6} fill='basic.400' />
      <TranslatedText label={label} />
    </Link>
  </>
);

export default LogoutLink;
