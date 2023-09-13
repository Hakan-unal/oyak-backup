import {
  Center,
  createStandaloneToast,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const { ToastContainer } = createStandaloneToast();

import CopyIcon from '../icon/Vector';

import { DynamicType } from '@models/common.model';

import Card from '@components/core/Card';
import TranslatedText from '@components/core/Text';
import { copyToClipboard } from '@components/core/TextWithLabel';

type Props = {
  customerName?: string;
  bankInfo?: DynamicType;
};

const ProfileInfoCard: React.FC<Props> = ({ customerName, bankInfo }) => {
  const [ name, setName ] = useState('');

  useEffect(() => {
    if (customerName) {
      const arr = customerName?.trim().split(' ');

      setName(`${arr?.at(0)?.charAt(0)}${arr?.at(-1)?.charAt(0)}`);
    }
  }, [ customerName ]);

  return (
    <Card>
      <Flex alignItems='center' gap={8} justifyContent='flex-start'>
        <Center
          borderRadius={50}
          borderTopColor='yellow'
          color='black'
          h='50px'
          p={4}
          style={{ borderColor: 'black', border: '2px red solid' }}
          w='50px'
        >
          <Text>{name}</Text>
        </Center>
        <Flex flexDirection='column' gap={5}>
          <Flex
            flexDirection={{
              base : 'column',
              sm   : 'row',
              lg   : 'column',
              xl   : 'row',
            }}
            gap={{ base: 0, sm: 3, lg: 0, xl: 3 }}
          >
            <TranslatedText label='dashboard_welcomeCard_card_welcome_title' />
            <Text as='b'>{customerName || '-'}</Text>
          </Flex>
          {bankInfo?.customerExtId && (
            <Flex alignItems='center' gap={{ base: 5, sm: 8, lg: 5, xl: 8 }}>
              <TranslatedText
                label='dashboard_customerInformationCard_accountInformations_accountNo_text'
                minWidth='71px'
                variant='info'
              />
              <Flex alignItems='center'>
                <Text variant='boldInfo'>{bankInfo?.customerExtId || '-'}</Text>
                <IconButton
                  aria-label='Add to friends'
                  bg='white'
                  icon={<CopyIcon boxSize={4} fill='primary.base' />}
                  onClick={() => copyToClipboard(bankInfo?.customerExtId)}
                  size='xs'
                />
                <ToastContainer />
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProfileInfoCard;
