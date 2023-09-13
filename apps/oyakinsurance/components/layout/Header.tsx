import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

import TranslatedText from "components/core/Text";
import BackIcon from "components/icon/BackIcon";
import CloseIcon from "components/icon/CloseIcon";

import { messageToNative } from "utils/native.util";

interface Props {
  dontShowBack?: boolean;
  title: string;
  isHideCloseButton?: boolean;
}

const Header: React.FC<Props> = ({
  dontShowBack = false,
  title,
  isHideCloseButton = false,
}) => {
  const { back } = useRouter();

  const closeHandler = () => {
    messageToNative("close");
  };

  return (
    <Flex
      align="center"
      bg="white"
      direction="row"
      h="12"
      justify="space-between"
      py={1}
      w="full"
    >
      {!dontShowBack && (
        <IconButton
          aria-label="Geri Git"
          bg="transparent"
          icon={<BackIcon boxSize={6} />}
          onClick={back}
          size="md"
        />
      )}
      <TranslatedText
        label={title}
        pt="2"
        textAlign="center"
        variant="header1"
        w="full"
      />
      {!isHideCloseButton && (
        <IconButton
          aria-label="Kapat"
          bg="transparent"
          icon={<CloseIcon boxSize={6} />}
          onClick={closeHandler}
          size="sm"
        />
      )}
    </Flex>
  );
};

export default Header;
