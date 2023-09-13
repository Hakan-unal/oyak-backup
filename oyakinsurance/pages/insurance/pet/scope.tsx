import React from "react";
import { useRouter } from "next/router";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslations } from "next-intl";

import ButtonBox from "components/layout/ButtonBox";
import TranslatedText from "components/core/Text";
import OyakImageRB from "components/core/OyakImageRB";
import Button from "components/core/Button";
import LayoutWithBackground from "components/layout/LayoutWithBackground";

import { getLocalizationMessages } from "utils/localization.util";
import { paths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";
import { ProductType } from "utils/products.util";

const Detail = () => {
  const t = useTranslations();

  const {
    push,
    query: { petType, insuranceType },
  } = useRouter();

  const clickHandler = () => {
    push(`${paths.petForm}?petType=${petType}&insuranceType=${insuranceType}`);
  };

  const Basic = () => {
    const explanations = [
      {
        label       : "promotion_petInsurance_coverage_emergencySituations_subtitle",
        description : "promotion_petInsurance_coverage_explanation1_text",
      },
      {
        label:
          "promotion_petInsurance_coverage_financialResponsibility_subtitle",
        description: "promotion_petInsurance_coverage_explanation2_text",
      },
      {
        label:
          "promotion_petInsurance_coverage_missingDeclarationAndReward_subtitle",
        description: "promotion_petInsurance_coverage_explanation3_text",
      },
      {
        label       : "promotion_petInsurance_coverage_additionalDeposit_subtitle",
        description : "promotion_petInsurance_coverage_explanation4_text",
      },
    ];

    const textWithLabel = (
      label: string,
      description: string,
      index: number,
    ) => (
      <Box key={index} my={4}>
        <TranslatedText
          display="inline"
          fontWeight="bold"
          label={label}
          mr={1}
        />
        <TranslatedText display="inline" label={description} />
      </Box>
    );

    return (
      <>
        <TranslatedText
          fontSize="20px"
          fontWeight="bold"
          label="promotion_petInsurance_coverage_inSafeProtectionCoverage_title"
          mt="4"
        />

        {explanations.map((explanation, index) =>
          textWithLabel(explanation.label, explanation.description, index),
        )}
      </>
    );
  };

  const Plus = () => (
    <>
      <TranslatedText
        fontSize="20px"
        fontWeight="bold"
        label="promotion_petInsurance_coverage_plusProtectionCoverage_title"
        mt={3}
      />

      <Text fontSize="14px" lineHeight="18px">
        <b>{t("promotion_petInsurance_coverage_plusExp_text")}</b>{" "}
        {t("promotion_petInsurance_coverage_plusExplanation1_text")}
      </Text>

      <TranslatedText
        label="promotion_petInsurance_coverage_plusExplanation2_text"
        mt={3}
      />

      <TranslatedText
        label="promotion_petInsurance_coverage_plusExplanation3_text"
        mb={10}
        mt={3}
      />
    </>
  );

  return (
    <LayoutWithBackground title="general_petInsurance_promotion_title">
      <Flex direction="column" justify="space-between" minH="full">
        <Box px="4">
          <Image src="/images/svg/pet-main.svg" />
          {insuranceType === "basic" ? <Basic /> : <Plus />}
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

export default Detail;
