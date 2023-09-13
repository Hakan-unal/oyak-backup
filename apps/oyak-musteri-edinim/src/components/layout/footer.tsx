import {
  Box,
  Container,
  Flex,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import externalPaths from '@routes/external-paths';

import TranslatedText from '@components/core/Text';

import Facebook from '@assets/svgs/Facebook.svg';
import Instagram from '@assets/svgs/Instagram.svg';
import Linkedin from '@assets/svgs/Linkedin.svg';
import Logo from '@assets/svgs/Logo.svg';
import Spotify from '@assets/svgs/Spotify.svg';
import Twitter from '@assets/svgs/Twitter.svg';
import Youtube from '@assets/svgs/Youtube.svg';

export default function Footer() {
  return (
    <Box color={useColorModeValue('gray.700', 'gray.200')} mt={4} width='full'>
      <Container
        align={{ base: 'center', md: 'center' }}
        as={Stack}
        direction={{ base: 'column', sm: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        maxW={'6xl'}
        py={4}
        spacing={4}
      >
        <Flex
          align='center'
          direction={{ base: 'column', lg: 'row' }}
          justify='center'
        >
          <Link
            aria-label='Logo'
            href={externalPaths.OYAK_LINK}
            target='_blank'
          >
            <Logo height='15' width='115' />
          </Link>
          <TranslatedText
            label='dashboard_footer_rights_text'
            values={{ year: new Date().getFullYear() }}
          />
        </Flex>
        <Stack
          direction={{ base: 'row', xl: 'row' }}
          spacing={{ base: 4, sm: 6 }}
        >
          <Link href={externalPaths.CONTACT_US} target='_blank'>
            Bize Ulaşın
          </Link>
          <Link href={externalPaths.KVKK} target='_blank'>
            KVKK
          </Link>
        </Stack>
        <Stack direction={'row'} spacing={6}>
          <Link
            aria-label='Facebook'
            href={externalPaths.FACEBOOK}
            target='_blank'
          >
            <Facebook />
          </Link>
          <Link
            aria-label='Twitter'
            href={externalPaths.TWITTER}
            target='_blank'
          >
            <Twitter />
          </Link>
          <Link
            aria-label='Linkedin'
            href={externalPaths.LINKEDIN}
            target='_blank'
          >
            <Linkedin />
          </Link>
          <Link
            aria-label='Youtube'
            href={externalPaths.YOUTUBE}
            target='_blank'
          >
            <Youtube />
          </Link>
          <Link
            aria-label='Instagram'
            href={externalPaths.INSTAGRAM}
            target='_blank'
          >
            <Instagram fill={'#999999'} />
          </Link>
          <Link
            aria-label='Spotify'
            href={externalPaths.SPOTIFY}
            target='_blank'
          >
            <Spotify fill={'#999999'} />
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
