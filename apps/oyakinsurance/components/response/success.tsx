import { Box, Flex, Image } from "@chakra-ui/react";

import Button from "components/core/Button";
import TranslatedText from "components/core/Text";
import Layout from "components/layout/Layout";

interface Props {
  title?: string;
  subtitle?: string;
  buttonName?: string;
  hideButton?: boolean;
  isHideCloseButton?: boolean;
  onClick?: () => void;
}

export const SuccessCard = ({
  title,
  subtitle,
  hideButton = false,
  isHideCloseButton,
  buttonName,
  onClick,
}: Props) => (
  <Layout dontShowBack isHideCloseButton={isHideCloseButton}>
    <Flex direction="column" justify="space-between" minH="88vh" px="4">
      <Flex direction="column" justify="center" minH="75vh">
        <Image src="/images/svg/success.svg" />
        {!!title && (
          <TranslatedText
            align="center"
            fontSize="20px"
            fontWeight="bold"
            label={title}
            lineHeight="24px"
          />
        )}
        {!!subtitle && (
          <TranslatedText
            align="center"
            color="basic.400"
            label={subtitle}
            mt="34px"
            p={4}
          />
        )}
      </Flex>
      <Box>
        {!hideButton && !!buttonName && (
          <Button label={buttonName} onClick={onClick} variant="primary" />
        )}
      </Box>
    </Flex>
  </Layout>
);
