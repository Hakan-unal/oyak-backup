import React from "react";
import { useRouter } from "next/router";
import { Box, Center, Flex, Image } from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";

import ButtonBox from "components/layout/ButtonBox";
import OyakImageRB from "components/core/OyakImageRB";
import Button from "components/core/Button";
import TranslatedText from "components/core/Text";
import LayoutWithBackground from "components/layout/LayoutWithBackground";

import { getLocalizationMessages } from "utils/localization.util";
import { paths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";
import { ProductType } from "utils/products.util";

const Detail = () => {
  const { push } = useRouter();

  const clickHandler = () => {
    push(paths.besForm);
  };

  return (
    <LayoutWithBackground title="general_besForUnderEighteenYearsOld_promotion_title">
      <Flex direction="column" justify="space-between" minH="92vh">
        <Box px="4">
          <Center>
            <Image mb={6} mt={10} src="/images/svg/bes.svg" />
          </Center>

          <TranslatedText
            fontSize="16px"
            fontWeight="700"
            label="promotion_besForUnderEighteenYearsOld_coverage_babyPackage_subtitle"
            lineHeight="22px"
            mt={6}
          />

          <TranslatedText
            label="promotion_besForUnderEighteenYearsOld_coverage_babyPackageExplanation_text"
            mb={4}
          />

          <TranslatedText
            fontSize="16px"
            fontWeight="700"
            label="promotion_besForUnderEighteenYearsOld_coverage_beforeSchoolAgePackage_subtitle"
            my={6}
          />

          <TranslatedText
            label="promotion_besForUnderEighteenYearsOld_coverage_beforeSchoolAgePackageExplanation_text"
            my={4}
          />

          <TranslatedText
            fontSize="16px"
            fontWeight="700"
            label="promotion_besForUnderEighteenYearsOld_coverage_schoolAgePackage_subtitle"
            my={6}
          />

          <TranslatedText
            label="promotion_besForUnderEighteenYearsOld_coverage_schoolAgePackageExplanation_text"
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

export default Detail;
