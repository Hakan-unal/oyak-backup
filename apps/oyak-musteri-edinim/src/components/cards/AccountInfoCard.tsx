/* eslint-disable max-len */
import {
  Box,
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  VStack,
  PopoverTrigger,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';

import { Account, BackInfo } from '@hooks/queries/useAccountQueries';

import Card from '@components/core/Card';
import TranslatedText from '@components/core/Text';
import TextWithLabel from '@components/core/TextWithLabel';
import InfoIcon from '@components/icon/Info';

type Props = {
  customerName?: string;
  account?: Account;
  bankInfo?: BackInfo;
};

const AccountInfoCard: React.FC<Props> = ({ bankInfo }) => (
  <Card label=''>
    <Box border='0px' borderColor='basic.300' borderStyle='dashed' w='100%' />

    <Flex align='center' direction='row'>
      <TranslatedText
        fontSize='18px'
        label='dashboard_customerInformationCard_oyakInvestmentAccountInformations_oyakInvestmentAccountInformations_title'
        mr={2}
      />
      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label='account info'
            bg='white'
            icon={<InfoIcon boxSize={6} fill='basic.400' />}
            size='sm'
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverBody p={4}>
            <TranslatedText
              label='dashboard_customerInformationCard_oyakInvestmentAccountInformations_oyakInvestmentAccountInformations_title'
              mb={4}
              variant='body3'
              w='full'
            />

            <TranslatedText
              label='dashboard_customerInformationCard_oyakInvestmentAccountInformations_popup_text'
              variant='body4'
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>

    <VStack align='start' mt={9} pb={3} spacing={4}>
      <TextWithLabel
        isCopyable
        label='dashboard_customerInformationCard_oyakInvestmentAccountInformations_receivingBank_text'
        text={bankInfo?.receiverBank || '-'}
      />
      <TextWithLabel
        isCopyable
        label='dashboard_customerInformationCard_oyakInvestmentAccountInformations_iban_text'
        text={bankInfo?.iban || '-'}
      />
      <TextWithLabel
        isCopyable
        label='dashboard_customerInformationCard_oyakInvestmentAccountInformations_recipientName_text'
        text={bankInfo?.receiverName || '-'}
      />
      <TextWithLabel
        isCopyable
        label='dashboard_customerInformationCard_oyakInvestmentAccountInformations_explanation_text'
        text={bankInfo?.description || '-'}
      />
    </VStack>
  </Card>
);

export default AccountInfoCard;
