import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Heading,
  Flex,
} from "@chakra-ui/react";
import React from "react";

import Button from "components/core/Button";
import TranslatedText from "components/core/Text";

const MobileScopeModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        label="offerDetails_phoneOffer_showCoverage_button"
        onClick={onOpen}
        variant="secondary"
        w="full"
      />
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent
          backgroundImage="url('/bg.png')"
          backgroundRepeat="no-repeat"
        >
          <ModalHeader>Cep Telefonu Sigortası</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <Image
                alignSelf="center"
                alt="k"
                mb={6}
                src="/mobile_valid.svg"
                w={180}
              />
              <Heading mb={4}>
                <TranslatedText
                  fontSize="16px"
                  label="promotion_phoneInsurance_coverage_question_subtitle"
                />
              </Heading>
              <TranslatedText
                label="promotion_phoneInsurance_coverage_explanation1_text"
                mb={4}
              />
              <TranslatedText
                label="promotion_phoneInsurance_coverage_explanation2_text"
                mb={4}
              />
              <Image
                alignSelf="center"
                alt="asd"
                mb={6}
                src="/or_header.png"
                w="256px"
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MobileScopeModal;
