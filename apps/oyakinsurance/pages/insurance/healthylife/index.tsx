import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";

import Button from "components/core/Button";
import TranslatedText from "components/core/Text";
import OyakImageRB from "components/core/OyakImageRB";
import ButtonBox from "components/layout/ButtonBox";
import LayoutWithBackground from "components/layout/LayoutWithBackground";

import { getLocalizationMessages } from "utils/localization.util";
import { paths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";
import { ProductType } from "utils/products.util";

const Index = () => {
  const router = useRouter();

  const clickHandler = () => {
    router.push(paths.healthylifeScope);
  };

  return (
    <LayoutWithBackground
      dontShowBack
      title="general_healthyLifeInsurance_promotion_title"
    >
      <Flex direction="column" justify="space-between" minH="88vh">
        <Box px="4">
          <Image
            marginX="auto"
            mb={7}
            mt={10}
            src="/images/svg/healthylife.svg"
            w="64"
          />
          <TranslatedText
            fontSize="20px"
            fontWeight="700"
            label="promotion_healthyLifeInsurance_promotion_healthyLifeInsurance_subtitle"
            lineHeight="26px"
            mb={4}
          />
          <TranslatedText label="promotion_healthyLifeInsurance_promotion_explanation_text" />
        </Box>
        <Box w="full">
          <OyakImageRB mb="4" mx="auto" w="64" />
          <ButtonBox>
            <Button
              label="general_general_continue_button"
              onClick={clickHandler}
              variant="primary"
              w="full"
            />
          </ButtonBox>
        </Box>
      </Flex>
    </LayoutWithBackground>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  let response: any = {
    props: {
      messages : await getLocalizationMessages(),
      userId   : req.session.user?.tckn || "no user data",
    },
  };

  if (
    !req.session.user ||
    !req.session.accessProducts?.includes(ProductType.FKS)
  ) {
    response = {
      redirect: {
        destination: paths.home,
      },
    };
  }

  return response;
}, sessionOptions);
export default Index;
