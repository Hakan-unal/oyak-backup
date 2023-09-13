import {
  Flex,
  HStack,
  Box,
  Link,
  Img,
  Center,
  useDisclosure,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import useStatus from '@hooks/useStatus';
import { InternalApi } from '@utils/fetch.util';

import Button from '@components/core/Button';
import InfoText from '@components/core/InfoText';
import TranslatedText from '@components/core/Text';
import InfoIcon from '@components/icon/Info';
import InfoModal from '@components/modals/InfoModal';

import appStore from '@assets/image/app-store.png';
import playStore from '@assets/image/play-store.png';

type Props = {
  clearSelection: () => void;
  nextStep: () => void;
};

const OnlineInterviewResult = ({ clearSelection, nextStep }: Props) => {
  const [ isOnlineStarted, setIsOnlineStarted ] = useState(false);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [ isAboveXl ] = useMediaQuery('(min-width: 80em)');
  const { status, refetch } = useStatus();

  const { data, refetch: kycCreateRefetch } = useQuery(
    [ 'ocrotp' ],
    () => InternalApi.get('/api/kyc/create').then((r) => r.data.response),
    {
      enabled              : false,
      refetchOnWindowFocus : false,
      refetchOnReconnect   : false,
      refetchOnMount       : false,
    },
  );

  const startOnlineInterview = () => {
    // TODO api call
    kycCreateRefetch();
    setIsOnlineStarted(true);
  };

  const cancelOnlineInterview = () => setIsOnlineStarted(false);

  const finishStepHandler = () => {
    refetch();

    if (status?.kycFLow) {
      nextStep();
    } else {
      onOpen();
    }
  };

  const Main = (
    <>
      <InfoText label='accountOpeningSteps_accountOpeningProcess_modal_onlineInterviewInformation_text' />
      <Box minH={18} w='full'>
        <Button
          label='accountOpeningSteps_accountOpeningProcess_modal_onlineInterview_button'
          onClick={startOnlineInterview}
          variant='primary'
        />
      </Box>
      <Text>
        <TranslatedText
          display='inline-block'
          label='accountOpeningSteps_accountOpeningProcess_modal_changeOnlineInterview_text'
        />{' '}
        <TranslatedText
          color='primary.base'
          cursor='pointer'
          display='inline-block'
          label='general_general_click_button'
          onClick={clearSelection}
        />
      </Text>
    </>
  );

  const t = useTranslations();

  const labelsSplited = t(
    'accountOpeningSteps_accountOpeningProcess_modal_onlineInterviewExplanation_text',
  ).split('Pratik Hesap');

  const OnlineInterview = (
    <>
      <TranslatedText
        fontWeight='semibold'
        label='accountOpeningSteps_accountOpeningProcess_modal_onlineInterview_title'
        my={2}
        pl={6}
      />

      <HStack align='flex-start' my={4}>
        <InfoIcon boxSize={6} fill='basic.400' />
        <Text display={'inline-block'}>
          <TranslatedText
            display='inline'
            fontSize='14px'
            label={labelsSplited[0]}
            lineHeight='19px'
            variant='info'
          />
          <TranslatedText
            display='inline'
            fontSize='14px'
            label='Pratik Hesap'
            lineHeight='19px'
            variant='boldInfo'
          />
          <TranslatedText
            display='inline'
            fontSize='14px'
            label={labelsSplited[1]}
            lineHeight='19px'
            variant='info'
          />
          <br />
          <br />
          <TranslatedText
            display='inline'
            fontSize='14px'
            label='accountOpeningSteps_accountOpeningProcess_modal_videoCall_text'
            lineHeight='19px'
            variant='info'
          />
        </Text>
      </HStack>

      {isAboveXl ? (
        <Flex alignItems='center' direction='column'>
          <Center h='96' height='fit-content'>
            <iframe height={320} src={data?.otpLink} />
          </Center>
        </Flex>
      ) : (
        <Flex direction='column' justifyContent='center' my={4}>
          <HStack justify='center' mb={10}>
            <Link
              href='https://apps.apple.com/us/app/online-hesap/id1601606419'
              target='_blank'
            >
              <Img src={appStore.src} />
            </Link>
            <Link
              href='https://play.google.com/store/apps/details?id=com.ocrlabs.idvaas'
              target='_blank'
            >
              <Img src={playStore.src} />
            </Link>
          </HStack>
        </Flex>
      )}
    </>
  );

  return (
    <Flex
      direction='column'
      gap={4}
      height='full'
      justify='space-between'
      minH={{ base: '55vh', md: 'full' }}
    >
      {!isOnlineStarted ? Main : OnlineInterview}
      <Box h={10}>
        <InfoModal
          actions={
            <Button
              label='general_general_okey_button'
              onClick={onClose}
              variant='secondary'
            />
          }
          closeOnOverlayClick={false}
          isOpen={isOpen}
          message='accountOpeningSteps_accountOpeningProcess_modal_explanation_text'
          onClose={onClose}
          title='general_general_error_title'
        />
      </Box>
      <Flex direction='row' gap={4} justify='end' w='full'>
        <Button
          label='general_general_back_button'
          onClick={isOnlineStarted ? cancelOnlineInterview : clearSelection}
          variant='secondary'
        />
        <Button
          label='general_general_continue_button'
          onClick={finishStepHandler}
          variant='primary'
        />
      </Flex>
    </Flex>
  );
};

export default OnlineInterviewResult;
