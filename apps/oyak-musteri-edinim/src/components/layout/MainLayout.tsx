import { Center, Flex } from '@chakra-ui/react';
import React from 'react';

import Footer from './footer';
import Wrapper from './Wrapper';
import Navigation from '../navigation/Navigation';

type Props = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: Props) => (
  <Flex direction={{ base: 'column', md: 'row' }} minH='100%'>
    <Navigation />
    <Wrapper
      display='flex'
      flexDir='column'
      justifyContent='space-between'
      marginLeft={{ base: 0, md: '320px' }}
      minH='100vh'
      pt={{
        base : 2,
        md   : 8,
        lg   : 14,
        xl   : 16,
      }}
    >
      <Center w='full'>{children}</Center>

      <Footer />
    </Wrapper>
  </Flex>
);

export default MainLayout;
