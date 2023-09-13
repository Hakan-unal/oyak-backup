import { useDisclosure } from '@chakra-ui/react';
import React from 'react';

import TranslatedText from '../core/Text';

import PdfModal from '@components/modals/PDFModal';

interface ModalProps {
  title: string;
  pdfPath?: string;
  isApproved: boolean;
  onApprove: () => void;
  addBase64Header?: boolean;
  isModalTitleBottom?: boolean;
}
export const ContractModal: React.FC<ModalProps> = ({
  pdfPath,
  title,
  onApprove,
  isApproved,
  addBase64Header = false,
  isModalTitleBottom = false,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleApprove = () => {
    onApprove();
    onClose();
  };

  return (
    <>
      <TranslatedText
        _hover={{
          pointer        : 'cursor',
          textDecoration : 'underline',
        }}
        color='primary.base'
        display='inline'
        fontSize='14px'
        fontWeight='normal'
        label={title}
        onClick={onOpen}
      />
      {pdfPath && (
        <PdfModal
          addBase64Header={addBase64Header}
          closeOnOverlayClick={false}
          isApproved={isApproved}
          isModalTitleBottom={isModalTitleBottom}
          isOpen={isOpen}
          onApprove={handleApprove}
          onClose={onClose}
          onLoadError={onClose}
          pdfFile={pdfPath}
          title={title}
        />
      )}
    </>
  );
};
