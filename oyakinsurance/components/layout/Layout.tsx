import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import { Wrapper } from "components/core/Wrapper";

import Header from "./Header";

interface Props {
  dontShowBack?: boolean;
  title?: string;
  isHideCloseButton?: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({
  children,
  dontShowBack,
  isHideCloseButton,
  title = "",
}) => (
  <Flex
    direction="column"
    justify="flex-start"
    minH={{ base: "100vh", md: "100%" }}
    overflow="hidden"
    w="full"
  >
    {(!!title || !isHideCloseButton || !dontShowBack) && (
      <Box display="flex" flexShrink={0} position="fixed" w="full" zIndex={999}>
        <Header
          dontShowBack={dontShowBack}
          isHideCloseButton={isHideCloseButton}
          title={title}
        />
      </Box>
    )}
    <Flex flexGrow={1} mt={12} overflowY="auto">
      <Wrapper px="0" w="full">
        {children}
      </Wrapper>
    </Flex>
  </Flex>
);

export default Layout;
