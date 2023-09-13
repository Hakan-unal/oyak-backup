import { Box, BoxProps } from "@chakra-ui/react";

export const Wrapper: React.FC<BoxProps> = (props) => (
  <Box
    px={{
      base : 2,
      md   : 8,
      lg   : 14,
      xl   : 16,
    }}
    py={{ base: 4, xl: 0 }}
    w="full"
    {...props}
  />
);
