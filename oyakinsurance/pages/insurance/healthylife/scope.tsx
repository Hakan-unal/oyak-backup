import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";

import Button from "components/core/Button";
import TranslatedText from "components/core/Text";
import OyakImageRB from "components/core/OyakImageRB";
import LayoutWithBackground from "components/layout/LayoutWithBackground";
import ButtonBox from "components/layout/ButtonBox";

import { ProductType } from "utils/products.util";
import { getLocalizationMessages } from "utils/localization.util";
import { paths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";

const accordionItems = [
  {
    title       : "promotion_healthyLifeInsurance_coverage_grownupCheckup_subtitle",
    description : "promotion_healthyLifeInsurance_coverage_explanation1_text",
  },
  {
    title:
      "promotion_healthyLifeInsurance_coverage_premiumTeethCheckUp_subtitle",
    description: "promotion_healthyLifeInsurance_coverage_explanation2_text",
  },
  {
    title       : "promotion_healthyLifeInsurance_coverage_ambulance_subtitle",
    description : "promotion_healthyLifeInsurance_coverage_explanation3_text",
  },
  {
    title:
      "promotion_healthyLifeInsurance_coverage_psychologicalConsultant_subtitle",
    description: "promotion_healthyLifeInsurance_coverage_explanation4_text",
  },
];

const Index = () => {
  const router = useRouter();

  const clickHandler = () => {
    router.push(paths.healthylifeForm);
  };

  return (
    <LayoutWithBackground title="general_healthyLifeInsurance_promotion_title">
      <Flex direction="column" justify="space-between" minH="full">
        <Box>
          <Image
            marginX="auto"
            mb={7}
            mt={10}
            src="/images/svg/healthylife.svg"
            w="64"
          />
          <Accordion allowToggle mb={4}>
            {accordionItems.map((item, index) => (
              <AccordionItem key={index}>
                <AccordionButton px="4">
                  <TranslatedText
                    flex={1}
                    label={item.title}
                    textAlign="left"
                    variant="header2"
                  />
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <TranslatedText label={item.description} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <TranslatedText
            label="promotion_healthyLifeInsurance_coverage_explanation5_text"
            mb={4}
            px={4}
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
