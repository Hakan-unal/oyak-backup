import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import React from 'react';

import { resetInActiveTimeEvent } from '@utils/event.util';

import TranslatedText from '@components/core/Text';
import EligibilityTest from '@components/forms/account/EligibilityTest';

type Props = Omit<ModalProps, 'children'>;

const SuitableTestModal: React.FC<Props> = ({ isOpen, onClose }) => (
  <Modal
    isCentered
    closeOnOverlayClick={false}
    isOpen={isOpen}
    onClose={onClose}
    size={{ base: 'full', md: '5xl' }}
  >
    <ModalOverlay />
    <ModalContent onClick={resetInActiveTimeEvent}>
      <ModalHeader
        borderBottom={{ base: '1px', md: '0' }}
        borderColor='basic.300'
      >
        <TranslatedText
          color='basic.500'
          fontSize='22px'
          fontWeight='700'
          label='stepper_accountOpeningSteps_modal_step4_text'
        />
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody maxH='700px' mb={4} overflowY='auto'>
        <EligibilityTest
          goBack={onClose}
          onSubmit={() => {
            onClose();
          }}
        />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default SuitableTestModal;
