import { Box, Center, Flex } from '@chakra-ui/react';
import React from 'react';

import Footer from './footer';
import Wrapper from './Wrapper';

import TranslatedText from '@components/core/Text';

import Logo from '@assets/svgs/Logo.svg';

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const ApplicationLayout = ({ children, title = '' }: Props) => (
  <Flex direction='column' justify='space-between' minH='100vh'>
    <Wrapper
      display='flex'
      justifyContent='center'
      justifyItems='center'
      pt={{ base: 0, md: 6, lg: 12, xl: 24 }}
    >
      <Center
        bg='white'
        maxW='1024px'
        minH={{ base: '100vh', md: '720px' }}
        rounded={{ base: 'none', md: 'xl' }}
        shadow='lg'
        w='full'
      >
        <Flex
          align='center'
          direction='column'
          flex={1}
          h='full'
          minH={{ base: '100vh', md: 'initial' }}
          pb={{ base: 10, md: 16 }}
          pt={{ base: '140px', md: 16 }}
          px={{ base: 4, md: 16 }}
          w='full'
        >
          <Logo height='30' width='220' />
          <TranslatedText label={title} mb={10} mt={7} variant='info' />
          <Box h='full' w='full'>
            {children}
          </Box>
        </Flex>
      </Center>
    </Wrapper>

    <Footer />
  </Flex>
);

export default ApplicationLayout;
