import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";

import { Wrapper } from "components/core/Wrapper";
import MobileCarousel from "components/carousel/MobileCarousel";
import Button from "components/core/Button";
import Header from "components/layout/Header";
import ButtonBox from "components/layout/ButtonBox";

import { getLocalizationMessages } from "utils/localization.util";
import { sessionOptions } from "utils/session.util";
import { paths } from "utils/page.util";
import { ProductType } from "utils/products.util";

const Mobile = () => {
  const { push } = useRouter();

  const goto = () => {
    push("/insurance/mobile/form");
  };

  return (
    <Flex
      backgroundImage="url('/bg.svg')"
      backgroundPosition="top"
      backgroundRepeat="no-repeat"
      backgroundSize="auto"
      direction="row"
      justify="center"
      minH={{ base: "80vh", md: "100%" }}
      pt={0}
    >
      <Flex direction="column" w="full">
        <Header dontShowBack title="general_phoneInsurance_promotion_title" />
        <Wrapper
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          maxW={{ base: "full", md: "xl" }}
          minH="80vh"
          pt="0"
          px="0"
        >
          <MobileCarousel />
          <ButtonBox>
            <Button
              label="general_general_continue_button"
              onClick={goto}
              variant="primary"
              w="full"
            />
          </ButtonBox>
        </Wrapper>
      </Flex>
    </Flex>
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
    !req.session.accessProducts?.includes(ProductType.MOBILE)
  ) {
    response = {
      redirect: {
        destination: paths.home,
      },
    };
  }

  return response;
}, sessionOptions);

export default Mobile;
