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

import { RegisterModalSteps } from '../../hooks/useStatus';
import { resetInActiveTimeEvent } from '@utils/event.util';

import TranslatedText from '@components/core/Text';
import DocumentUploadsForm from '@components/forms/account/DocumentUploadsForm';

type Props = Omit<ModalProps, 'children'>;

const DocumentUploadModal: React.FC<Props> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} size={{ base: '100vh', md: '5xl' }}>
    <ModalOverlay />
    <ModalContent
      mb={{ base: '48', md: 'auto' }}
      mt={{ base: '8', md: 'auto' }}
      onClick={resetInActiveTimeEvent}
    >
      <ModalHeader
        borderBottom={{ base: '1px', md: '0' }}
        borderColor='basic.300'
      >
        <TranslatedText
          color='basic.500'
          fontSize='22px'
          fontWeight='700'
          label='stepper_accountOpeningSteps_modal_step6_text'
        />
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <DocumentUploadsForm
          isHidePreUploadFile
          activeStep={RegisterModalSteps.COMPLETED}
          goBack={onClose}
          onSuccess={() => {
            onClose();
          }}
        />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default DocumentUploadModal;
