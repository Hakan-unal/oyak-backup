import { Flex, TextProps, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import TranslatedText from './Text';
import InfoIcon from '../icon/Info';
import InfoModal from '../modals/InfoModal';

type VariantType =
  | 'info'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'body5'
  | 'body6'
  | 'boldInfo';

interface TextWithInfoModalProps extends TextProps {
  labelText: string;
  modalMessage: string;
  modalTitle: string;
  labelVariant?: VariantType;
  titleText: string;
  textVariant?: VariantType;
}

const TextWithInfoModal: React.FC<TextWithInfoModalProps> = ({
  labelText,
  modalTitle,
  titleText,
  modalMessage,
  textVariant = 'boldInfo',
  labelVariant = 'info',
  ...rest
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Flex direction={'column'} flex='1' {...rest}>
      <Flex>
        <TranslatedText
          label={labelText}
          minWidth='10px'
          variant={labelVariant}
          w='fit-content'
        />
        <InfoIcon boxSize={6} fill='basic.400' onClick={onOpen} />
      </Flex>
      <TranslatedText label={titleText} variant={textVariant} />

      <InfoModal
        isOpen={isOpen}
        message={modalMessage}
        onClose={onClose}
        size='xl'
        title={modalTitle}
      />
    </Flex>
  );
};

export default TextWithInfoModal;
