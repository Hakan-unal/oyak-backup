import { Flex } from "@chakra-ui/react";
import React from "react";

import Layout from "./Layout";

interface Props {
  dontShowBack?: boolean;
  title?: string;
  isHideCloseButton?: boolean;
  children: React.ReactNode;
}

const LayoutWithBackground: React.FC<Props> = ({
  children,
  dontShowBack,
  isHideCloseButton,
  title = "",
}) => (
  <Flex
    backgroundImage="url('/bg.svg')"
    backgroundPosition="top"
    backgroundRepeat="no-repeat"
    backgroundSize="auto"
    direction="row"
    justify="center"
    minH={{ base: "80vh", md: "100%" }}
    pt={0}
  >
    <Layout
      dontShowBack={dontShowBack}
      isHideCloseButton={isHideCloseButton}
      title={title}
    >
      {children}
    </Layout>
  </Flex>
);

export default LayoutWithBackground;
