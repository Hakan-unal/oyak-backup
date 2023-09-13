import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

import CheckboxWithButton from "components/core/form/Checkbox";
import DocumentModal from "components/modals/DocumentModal";

interface Props {
  onSubmit: () => void;
}

const Consent = ({ onSubmit }: Props) => {
  const { control, watch } = useForm();

  return (
    <Flex direction="column" h="full" justify="space-between">
      <Flex align="center" direction="column">
        <Image alt="contract" mb="4" src="/contract.svg" w="160px" />
        <Image alt="contract" mb="6" src="/or_header.png" />
        <Text mb="6" variant="rBody2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
          molestiae quasi. Voluptatum nemo blanditiis autem, voluptate
        </Text>
        <CheckboxWithButton
          actionComponent={
            <DocumentModal
              buttonLabel="Açık Rıza Metni"
              message="falan"
              title="Açık Rıza Metni"
            />
          }
          control={control}
          label="'ni okudum kabul ediyorum."
          name="consent"
        />
      </Flex>
      <Button
        disabled={!watch("consent")}
        onClick={onSubmit}
        variant="primary"
        w="full"
      >
        Devam Et
      </Button>
    </Flex>
  );
};

export default Consent;
