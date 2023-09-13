import { Flex, FlexProps, IconButton } from '@chakra-ui/react';
import React from 'react';

import TranslatedText from '@components/core/Text';
import Hamburger from '@components/icon/Hamburger';

interface HeaderProps extends FlexProps {
  onOpen: () => void;
  currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpen,
  currentPath,
  ...rest
}) => (
  <Flex
    alignItems='center'
    bg='white'
    borderBottomColor='basic.200'
    borderBottomWidth='1px'
    height={20}
    justifyContent='flex-start'
    ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 24 }}
    {...rest}
  >
    <IconButton
      aria-label='open menu'
      icon={<Hamburger boxSize={6} />}
      onClick={onOpen}
      variant='unstyled'
    />

    <TranslatedText
      fontSize='2xl'
      fontWeight='bold'
      label={currentPath}
      textAlign='center'
      w='full'
    />
  </Flex>
);
