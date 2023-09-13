import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { resetInActiveTimeEvent } from '@utils/event.util';

import PDFDocument from '@components/core/PDFDocument';
import TranslatedText from '@components/core/Text';

interface Props extends Omit<ModalProps, 'children'> {
  pdfFile: string;
  title: string;
  onApprove?: () => void;
  addBase64Header?: boolean;
  isButtonLoading?: boolean;
  isApproved?: boolean;
  isModalTitleBottom?: boolean;
  onLoadError?: () => void;
}

const PDFModal: React.FC<Props> = ({
  title,
  pdfFile,
  addBase64Header = false,
  onApprove,
  isApproved = false,
  isButtonLoading = false,
  isModalTitleBottom = false,
  onLoadError,
  ...modalProps
}) => {
  const [ isHitBottom, setIsHitBottom ] = useState<boolean>();
  const maxWidth = useBreakpointValue({ base: 160, md: '70%' });

  useEffect(() => {
    setIsHitBottom(isApproved);
  }, [ isApproved ]);

  const pdf = addBase64Header
    ? `data:application/pdf;base64,${pdfFile}`
    : pdfFile;

  return (
    <Modal size='6xl' {...modalProps}>
      <ModalOverlay />
      <ModalContent onClick={resetInActiveTimeEvent}>
        {!isModalTitleBottom && (
          <ModalHeader>
            <TranslatedText label={title} />
          </ModalHeader>
        )}

        <ModalCloseButton />
        <ModalBody
          alignContent='center'
          display='flex'
          justifyContent='center'
          maxH='65vh'
          mt={isModalTitleBottom ? 10 : 0}
          overflowX='auto'
        >
          <PDFDocument
            handleEndPage={() => setIsHitBottom(true)}
            onLoadError={onLoadError}
            pdf={pdf}
          />
        </ModalBody>

        <ModalFooter>
          {isHitBottom && (
            <>
              {isModalTitleBottom && (
                <Flex maxWidth={maxWidth} mr='auto'>
                  <TranslatedText label={title} />
                </Flex>
              )}
              <Button
                isDisabled={isApproved}
                isLoading={isButtonLoading}
                onClick={onApprove}
                variant='primary'
              >
                <TranslatedText label='accountOpeningSteps_contractApproval_modal_declare_button' />
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PDFModal;
