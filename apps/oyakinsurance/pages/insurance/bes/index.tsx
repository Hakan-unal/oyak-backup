import React from "react";
import { Box, Center, Flex, Image } from "@chakra-ui/react";
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
    router.push(paths.besScope);
  };

  return (
    <LayoutWithBackground
      dontShowBack
      title="general_besForUnderEighteenYearsOld_promotion_title"
    >
      <Flex direction="column" justify="space-between" minH="90vh">
        <Box px="4">
          <Center>
            <Image mb={7} mt={10} src="/images/svg/bes.svg" />
          </Center>
          <TranslatedText
            fontSize="16px"
            fontWeight="700"
            label="promotion_besForUnderEighteenYearsOld_promotion_assistantServices_subtitle"
            lineHeight="22px"
            mt={6}
          />

          <TranslatedText
            label="promotion_besForUnderEighteenYearsOld_promotion_assistantServicesExplanation_text"
            mb={4}
          />

          <TranslatedText
            fontSize="16px"
            fontWeight="700"
            label="promotion_besForUnderEighteenYearsOld_promotion_noExpense_subtitle"
            my={6}
          />

          <TranslatedText
            label="promotion_besForUnderEighteenYearsOld_promotion_noExpenseExplanation_text"
            my={4}
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
    !req.session.accessProducts?.includes(ProductType.BES)
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
