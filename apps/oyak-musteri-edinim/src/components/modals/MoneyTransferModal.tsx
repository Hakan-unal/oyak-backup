import {
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  OrderedList,
} from '@chakra-ui/react';
import React from 'react';

import { useAccountInfoQuery } from '@hooks/queries/useAccountQueries';
import { resetInActiveTimeEvent } from '@utils/event.util';

import TranslatedText from '@components/core/Text';

type Props = Omit<ModalProps, 'children'>;

const MoneyTransferModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { data } = useAccountInfoQuery();

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size='4xl'>
      <ModalOverlay />
      <ModalContent
        height={{ base: '100%', sm: '65%', md: '60%' }}
        onClick={resetInActiveTimeEvent}
        overflowY='auto'
        pb={10}
        px={5}
      >
        <ModalHeader>
          <TranslatedText
            color='basic.500'
            fontSize='22px'
            fontWeight='700'
            label='dashboard_quickActions_moneyTransfer_popup_title'
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <OrderedList listStyleType='none' m={0} stylePosition='inside'>
            {[ ...Array(5).keys() ].map((step) => (
              <ListItem
                bg={step % 2 ? undefined : 'basic.100'}
                key={step}
                px={4}
                py={6}
              >
                <TranslatedText
                  display='inline-block'
                  label={`dashboard_quickActions_moneyTransfer_step${
                    step + 2
                  }_text`}
                  values={{
                    iban          : data?.bankInfo?.iban,
                    fullname      : data?.name,
                    customerExtId : data?.account?.customerExtId,
                  }}
                />
              </ListItem>
            ))}
          </OrderedList>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MoneyTransferModal;
