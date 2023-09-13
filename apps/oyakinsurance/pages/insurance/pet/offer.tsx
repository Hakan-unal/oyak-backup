import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";

import Layout from "components/layout/Layout";
import TranslatedText from "components/core/Text";
import PetOfferCard from "components/cards/PetOfferCard";
import OyakImageRB from "components/core/OyakImageRB";

import { ProductType } from "utils/products.util";
import { getLocalizationMessages } from "utils/localization.util";
import { paths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";

const Offer = () => (
  <Layout title="Teklifler">
    <Flex align="center" direction="column" justify="space-between" minH="full">
      <Tabs isFitted colorScheme="red" w="full">
        <TabList mb="1em">
          <Tab>
            <TranslatedText
              _selected={{ color: "basic.500" }}
              color="basic.300"
              label="promotion_petInsurance_promotion_cat_button"
              variant="header1"
            />
          </Tab>
          <Tab>
            <TranslatedText
              _selected={{ color: "basic.500" }}
              label="promotion_petInsurance_promotion_dog_button"
              variant="header1"
            />
          </Tab>
        </TabList>
        <TabPanels p={2}>
          <TabPanel p={0}>
            <PetOfferCard
              header="promotion_petInsurance_promotion_petSafe_subtitle"
              insuranceType="basic"
              petType="cat"
              price="promotion_petInsurance_promotion_petSafeCatPrice_text"
              scope="promotion_petInsurance_promotion_petSafeDetail_text"
            />
            <PetOfferCard
              header="promotion_petInsurance_promotion_petSafePlus_subtitle"
              insuranceType="plus"
              petType="cat"
              price="promotion_petInsurance_promotion_petSafePlusCatPrice_text"
              scope="promotion_petInsurance_promotion_petSafePlusDetail_text"
            />
          </TabPanel>
          <TabPanel p={0}>
            <PetOfferCard
              header="promotion_petInsurance_promotion_petSafe_subtitle"
              insuranceType="basic"
              petType="dog"
              price="promotion_petInsurance_promotion_petSafeDogPrice_text"
              scope="promotion_petInsurance_promotion_petSafeDetail_text"
            />
            <PetOfferCard
              header="promotion_petInsurance_promotion_petSafePlus_subtitle"
              insuranceType="plus"
              petType="dog"
              price="promotion_petInsurance_promotion_petSafePlusDogPrice_text"
              scope="promotion_petInsurance_promotion_petSafePlusDetail_text"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <OyakImageRB w="60" />
    </Flex>
  </Layout>
);

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

export default Offer;
