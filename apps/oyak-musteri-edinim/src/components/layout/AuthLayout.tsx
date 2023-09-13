import { Box, Center, Flex, Hide } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

import TranslatedText from '@components/core/Text';

import LoginBanner from '@assets/image/login-banner.png';
import Logo from '@assets/svgs/Logo.svg';

type Props = {
  children?: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => (
  <Flex direction='row' maxHeight='100vh'>
    <Box
      display='flex'
      justifyContent='center'
      justifyItems='center'
      px={{
        base : '0',
        md   : '4',
        lg   : '8',
        xl   : '10',
      }}
      py={{ base: 0, md: 3, lg: 8, xl: 8 }}
      w='full'
    >
      <Center
        bg='white'
        maxW='1024px'
        rounded={{ base: 'none', md: 'xl' }}
        shadow='lg'
        w='full'
      >
        <Flex borderRadius='full' h='full' w='full'>
          <Hide below='md'>
            <Image
              alt='banner'
              height={719}
              src={LoginBanner.src}
              style={{
                borderTopLeftRadius    : '16px',
                borderBottomLeftRadius : '16px',
              }}
              width={440}
            />
          </Hide>
          <Flex
            direction='column'
            flex={1}
            h='full'
            minH={{ base: '100vh', md: 'initial' }}
            overflow='auto'
            pb={{ base: 4, md: 12 }}
            pt={{ base: 4, md: 12 }}
            px={{ base: 4, md: 16 }}
          >
            <Flex
              align={{ base: 'center', sm: 'start' }}
              justify={{ base: 'center', sm: 'flex-start' }}
            >
              <Logo height='30' width='220' />
            </Flex>

            <TranslatedText
              align={{ base: 'center', md: 'left' }}
              label='accountOpeningRequest_entry_login_enterInformation_subtitle'
              mb={10}
              mt={7}
              variant='info'
            />

            {children}
          </Flex>
        </Flex>
      </Center>
    </Box>
  </Flex>
);

export default AuthLayout;
