import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

import TranslatedText from './Text';

interface Props extends BoxProps {
  label?: string;
  children?: React.ReactNode;
}

const Card: React.FC<Props> = ({ label, children, ...rest }) => (
  <Box bg='white' p={6} rounded='2xl' shadow='lg' {...rest}>
    {label && <TranslatedText fontSize='18px' label={label} w='full' />}

    {children}
  </Box>
);

export default Card;
