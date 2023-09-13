/* eslint-disable max-len */
import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";

import Button from "components/core/Button";
import Layout from "components/layout/Layout";
import TranslatedText from "components/core/Text";

import { getLocalizationMessages } from "utils/localization.util";
import { paths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";
import { messageToNative } from "utils/native.util";

const Fail = () => {
  const [ messages, setMessages ] = React.useState<string>("");

  const clickHandler = () => {
    messageToNative("redirect");
  };

  React.useEffect(() => {
    const error = localStorage.getItem("message");

    setMessages(error || "");
  }, []);

  return (
    <Layout dontShowBack>
      <Flex direction="column" justify="space-between" minH="88vh" px="4">
        <Flex align="center" direction="column">
          <Box mb={10} p={50}>
            <Image src="/images/svg/fail.svg" />
          </Box>
          <TranslatedText
            align="center"
            fontSize="20px"
            fontWeight="bold"
            label="general_transaction_failed_subtitle"
            lineHeight="24px"
          />

          <TranslatedText
            align="center"
            color="basic.400"
            label={messages}
            mt="34px"
            p={4}
          />
        </Flex>
        <Box>
          <Button
            label="general_transaction_homepage_button"
            onClick={clickHandler}
            variant="primary"
          />
        </Box>
      </Flex>
    </Layout>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  let response: any = {
    props: {
      messages : await getLocalizationMessages(),
      userId   : req.session.user?.tckn || "no user data",
    },
  };

  if (!req.session.token) {
    response = {
      redirect: {
        destination: paths.home,
      },
    };
  }

  return response;
}, sessionOptions);
export default Fail;
