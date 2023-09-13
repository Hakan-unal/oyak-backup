import {
  Flex,
  VStack,
  Box,
  LinkBox,
  LinkOverlay,
  Image,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

import TranslatedText from "components/core/Text";

interface Props {
  header: string;
  price: string;
  petType: "cat" | "dog";
  insuranceType: "basic" | "plus";
  scope: string;
}

const PetOfferCard: React.FC<Props> = ({
  header,
  price,
  petType = "cat",
  insuranceType = "basic",
  scope,
}) => (
  <LinkBox as="div">
    <NextLink
      passHref
      href={`/insurance/pet/scope?petType=${petType}&insuranceType=${insuranceType}`}
    >
      <Flex
        direction="column"
        mb={4}
        position="relative"
        rounded="lg"
        shadow="md"
      >
        <Image
          objectFit="fill"
          roundedTop="lg"
          src={`/images/svg/pet-${petType}-${insuranceType}.svg`}
          w="full"
        />
        <VStack align="start" position="absolute" px={4} spacing="0.5" top="4">
          <LinkOverlay as="div">
            <TranslatedText
              fontSize="16px"
              fontWeight="semibold"
              label={header}
              maxW="36"
            />
          </LinkOverlay>
          <TranslatedText fontSize="18px" fontWeight="bold" label={price} />
        </VStack>
        <Box minH="28" px={4} roundedBottom="lg">
          <TranslatedText label={scope} />
        </Box>
      </Flex>
    </NextLink>
  </LinkBox>
);

export default PetOfferCard;
