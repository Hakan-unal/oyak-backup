import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "next-intl";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import CheckboxActionButton from "components/core/form/CheckboxActionButton";
import PDFDocument from "components/core/PDFDocument";

interface Props {
  title: string;
  pdfPath: string;
  buttonLabel: string;
  type?: "info" | "error";
  isOpen?: boolean;
}

const PDFContractModal: React.FC<Props> = ({
  title,
  pdfPath,
  buttonLabel,
  isOpen = false,
}) => {
  const modal = useDisclosure();
  const t = useTranslations();

  React.useEffect(() => {
    if (isOpen) {
      modal.onOpen();
    }
  }, [ isOpen ]);

  return (
    <>
      <CheckboxActionButton clickHandler={modal.onOpen} label={buttonLabel} />
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        scrollBehavior="inside"
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignItems="center">
            {t(title)}
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody overflow="unset" w="full">
            <TransformWrapper>
              <TransformComponent
                wrapperStyle={{ height: "85vh", width: "100vw" }}
              >
                <PDFDocument pdf={pdfPath} />
              </TransformComponent>
            </TransformWrapper>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PDFContractModal;
