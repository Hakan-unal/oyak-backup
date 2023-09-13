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
    router.push(paths.petOffer);
  };

  return (
    <LayoutWithBackground dontShowBack title="Evcil Hayvan Sigotası">
      <Flex direction="column" flex={1} justify="space-between" minH="88vh">
        <Box px="4">
          <Image src="/images/svg/pet-main.svg" />
          <TranslatedText
            fontSize="20px"
            fontWeight="700"
            label="promotion_petInsurance_promotion_explanation_subtitle"
            lineHeight="26px"
            mt={8}
          />

          <TranslatedText
            label="promotion_petInsurance_promotion_explanation_text"
            mt={5}
          />
          <TranslatedText
            fontWeight="bold"
            label="promotion_petInsurance_promotion_explanation2_text"
            mt={5}
          />
        </Box>
        <Box>
          <OyakImageRB mb="4" mx="auto" w="64" />
          <ButtonBox>
            <Button
              label="general_general_continue_button"
              onClick={clickHandler}
              variant="primary"
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
    !req.session.accessProducts?.includes(ProductType.PET)
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
