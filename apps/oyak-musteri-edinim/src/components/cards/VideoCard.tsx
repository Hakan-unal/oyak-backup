/* eslint-disable max-len */
import { Flex, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React from 'react';

import Card from '@components/core/Card';
import HtmlWithText from '@components/core/HtmlWithText';
import Text from '@components/core/Text';

const VideoCard: React.FC = () => {
  const t = useTranslations();

  return (
    <Card h='full' label=''>
      <Flex align='center' direction='row'>
        <Text
          as='b'
          fontSize='16px'
          label='dashboard_videoCard_card_introductionVideos_title'
        />
      </Flex>

      <VStack align='start' mt={9} pb={3} spacing={4}>
        <video
          controls
          playsInline
          height='fit-content'
          preload='auto'
          src={t('dashboard_videoCard_card_videoLink_text')}
          title='YouTube video player'
          width='100%'
        />
        <Text
          as='b'
          fontSize='14px'
          label='dashboard_videoCard_card_videoName_subtitle'
        />

        <HtmlWithText
          as='span'
          fontSize='14px'
          html='dashboard_videoCard_card_videoLink2_text'
          label='dashboard_videoCard_card_videoExplanation_text'
        />
      </VStack>
    </Card>
  );
};

export default VideoCard;
