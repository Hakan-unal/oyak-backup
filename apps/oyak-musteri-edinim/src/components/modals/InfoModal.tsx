import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  TextProps,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import { resetInActiveTimeEvent } from '@utils/event.util';

import { DynamicType } from '@models/common.model';

import TranslatedText from '@components/core/Text';
import Error from '@components/icon/Error';
import Warning from '@components/icon/WarningIcon';

import InfoBig from '@assets/svgs/InfoBig.svg';

const InfoModalColors: Record<string, string> = {
  error   : 'primary.base',
  warning : 'helper.orange.base',
  base    : 'basic.500',
};

interface Props extends Omit<ModalProps, 'children'> {
  title: string;
  message: string;
  type?: 'info' | 'error' | 'warning';
  headerPosition?: 'start' | 'center' | 'end';
  messageStyleProps?: TextProps;
  actions?: React.ReactNode;
  Icon?: DynamicType;
}

const InfoModal: React.FC<Props> = ({
  title,
  message,
  type = 'info',
  actions,
  headerPosition = 'center',
  messageStyleProps,
  Icon,
  ...modalProps
}) => (
  <Modal isCentered {...modalProps}>
    <ModalOverlay />
    <ModalContent onClick={resetInActiveTimeEvent}>
      <ModalHeader mt={4}>
        <Flex alignItems='center' gap={2} justifyContent={headerPosition}>
          {type === 'warning' && (
            <Warning boxSize={6} fill='helper.orange.base' />
          )}
          {type === 'error' && <Error boxSize={6} fill='primary.base' />}
          <TranslatedText
            color={InfoModalColors[type]}
            label={title}
            {...(type === 'warning' && {
              fontSize   : '16px',
              fontWeight : 'bold',
            })}
          />
        </Flex>
      </ModalHeader>
      <ModalCloseButton mt={type === 'warning' ? '4' : ''} />
      <ModalBody>
        <VStack>
          {Icon ? <Icon /> : type === 'info' && <InfoBig />}
          <TranslatedText label={message} {...messageStyleProps} />
        </VStack>
      </ModalBody>
      {actions && <ModalFooter>{actions}</ModalFooter>}
    </ModalContent>
  </Modal>
);

export default InfoModal;
