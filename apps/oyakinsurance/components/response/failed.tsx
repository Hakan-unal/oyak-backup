/* eslint-disable max-len */
import React from "react";
import { Center, Flex, HStack, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Button from "components/core/Button";
import Layout from "components/layout/Layout";
import TranslatedText from "components/core/Text";

import { messageToNative } from "utils/native.util";

interface Props {
  tryAgainUrl: string;
  paymentGuid: string;
}
export const Fail = (props: Props) => {
  const { push } = useRouter();

  const clickHandler = () => {
    messageToNative("redirect");
  };

  const tryAgainHandler = () => {
    push(props.tryAgainUrl);
  };

  return (
    <Layout dontShowBack title="Cep Telefonu Sigortası">
      <Flex direction="column" justify="space-between" minH="88vh" px="4">
        <Center flexDirection="column" mb="6">
          <Image mb="8" src="/images/svg/fail.svg" />
          <TranslatedText
            align="center"
            fontSize="20px"
            fontWeight="bold"
            label="general_transaction_paymentFailed_subtitle"
            lineHeight="24px"
          />
        </Center>
        <HStack>
          <Button
            label="general_transaction_homepage_button"
            onClick={clickHandler}
            variant="secondary"
          />
          <Button
            label="general_transaction_tryAgain_button"
            onClick={tryAgainHandler}
            variant="primary"
          />
        </HStack>
      </Flex>
    </Layout>
  );
};
