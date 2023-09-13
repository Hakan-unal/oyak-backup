import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "next-intl";

import CheckboxActionButton from "components/core/form/CheckboxActionButton";

interface Props {
  title: string;
  message: string;
  buttonLabel: string;
  type?: "info" | "error";
  actions?: React.ReactNode;
}

const DocumentModal: React.FC<Props> = ({
  title,
  message,
  actions,
  buttonLabel,
}) => {
  const modal = useDisclosure();
  const t = useTranslations();

  return (
    <>
      <CheckboxActionButton clickHandler={modal.onOpen} label={buttonLabel} />
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t(title)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>

          {actions && <ModalFooter>{actions}</ModalFooter>}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DocumentModal;
