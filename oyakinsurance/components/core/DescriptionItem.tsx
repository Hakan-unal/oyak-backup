import { Flex, Skeleton, Text } from "@chakra-ui/react";
import React from "react";

import TranslatedText from "./Text";

interface Props {
  label: string;
  value: string;
  isLoaded?: boolean;
}

const DescriptionItem: React.FC<Props> = ({
  label,
  value,
  isLoaded = false,
}) => (
  <Flex direction="row" justify="space-between">
    <TranslatedText
      color="basic.500"
      fontSize="18px"
      fontWeight="semibold"
      label={label}
      lineHeight="24px"
    />
    <Skeleton height="16px" isLoaded={isLoaded} minW="80px">
      <Text
        color="basic.400"
        fontSize="18px"
        fontWeight="semibold"
        lineHeight="24px"
        textAlign="right"
      >
        {value}
      </Text>
    </Skeleton>
  </Flex>
);

export default DescriptionItem;
