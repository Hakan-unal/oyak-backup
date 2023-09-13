import { Box, Flex, Image, Link, useBreakpointValue } from '@chakra-ui/react';
import { withIronSessionSsr } from 'iron-session/next';
import React, { ReactElement } from 'react';

import { NextPageWithLayout } from './_app';
import { useAccountInfoQuery } from '@hooks/queries/useAccountQueries';
import useStatus from '@hooks/useStatus';
import { getLocalizationText } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

import externalPaths from '@routes/external-paths';
import paths from '@routes/paths';

import AccountInfoCard from '@components/cards/AccountInfoCard';
import ApplicationNotFilledCard from '@components/cards/ApplicationNotFilledCard';
import ProfileInfoCard from '@components/cards/ProfileInfoCard';
import QuickActionsCard from '@components/cards/QuickActionsCard';
import VideoCard from '@components/cards/VideoCard';
import MainLayout from '@components/layout/MainLayout';

import banner from '@assets/image/banner.png';
import bannerMobile from '@assets/image/bannerMobile.jpg';

const Home: NextPageWithLayout<null> = () => {
  const { current } = useStatus();
  const { data } = useAccountInfoQuery();
  const bnr = useBreakpointValue({ base: bannerMobile, lg: banner });

  return (
    <Flex
      direction='column'
      gap={4}
      h='full'
      maxW='6xl'
      pt={{ base: 6, md: 0 }}
      px={{ base: 4, md: 0 }}
      w='full'
    >
      <Link href={externalPaths.OYAK_LINK} target='_blank'>
        <Image alt='image' rounded='xl' src={bnr?.src} width={'100%'} />
      </Link>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={4} w='100%'>
        <Flex
          direction='column'
          gap='4'
          h='full'
          mb={4}
          w={{ base: 'full', lg: '50%' }}
        >
          <ProfileInfoCard bankInfo={data?.account} customerName={data?.name} />

          <Box flex={1}>
            {current === '6' ? (
              <QuickActionsCard />
            ) : (
              <ApplicationNotFilledCard />
            )}
          </Box>
        </Flex>

        <Flex
          direction='column'
          gap='4'
          h='full'
          w={{ base: 'full', lg: '50%' }}
        >
          <AccountInfoCard
            account={data?.account}
            bankInfo={data?.bankInfo}
            customerName={data?.name}
          />
          <VideoCard />
        </Flex>
      </Flex>
    </Flex>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const user = req.session.user;

  if (!user?.isLoggedIn) {
    return {
      redirect: {
        destination : paths.LOGIN,
        statusCode  : 302,
      },
    };
  } else if (!user.isExist && !user.application) {
    return {
      redirect: {
        destination : paths.APPLICATION,
        statusCode  : 302,
      },
    };
  }

  return {
    props: {
      messages: await getLocalizationText(),
    },
  };
}, sessionOptions);

export default Home;
