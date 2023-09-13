import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const ButtonBox = ({ children }: Props) => (
  <Box borderTop="1px" borderTopColor="basic.200" mt={4} pt="3" px={4} w="full">
    {children}
  </Box>
);

export default ButtonBox;
