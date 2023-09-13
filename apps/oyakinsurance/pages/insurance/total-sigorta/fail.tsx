/* eslint-disable max-len */
import { Box, Flex, Image } from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import { useTranslations } from "next-intl";

import TranslatedText from "components/core/Text";
import Layout from "components/layout/Layout";

import { getLocalizationMessages } from "utils/localization.util";
import { paths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";

const Fail = () => {
  const t = useTranslations();
  const [ messages, setMessages ] = React.useState<string>("");

  React.useEffect(() => {
    const error = localStorage.getItem("message");

    setMessages(error || "");
  }, []);

  return (
    <Layout dontShowBack isHideCloseButton>
      <Flex direction="column" justify="center" minH="75vh">
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
          label={t(messages)}
          mt="34px"
          p={4}
        />
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
