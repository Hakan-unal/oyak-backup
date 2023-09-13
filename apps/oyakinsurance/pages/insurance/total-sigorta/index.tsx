import { Box, Center, Flex, Image } from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";

import Button from "components/core/Button";
import OyakImageRB from "components/core/OyakImageRB";
import TranslatedText from "components/core/Text";
import ButtonBox from "components/layout/ButtonBox";
import LayoutWithBackground from "components/layout/LayoutWithBackground";

import { getLocalizationMessages } from "utils/localization.util";
import { paths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";

const Index = () => {
  const router = useRouter();

  const clickHandler = () => {
    router.push(paths.total.form);
  };

  return (
    <LayoutWithBackground
      dontShowBack
      isHideCloseButton
      title="promotion_motorInsurance_promotion_motorInsurance_title"
    >
      <Flex direction="column" justify="space-between" minH="90vh">
        <Box px="4">
          <Center>
            <Image mb={2} mt={10} src="/images/svg/total.svg" />
          </Center>
          <Flex direction={"row"} mb={7} mt={0}>
            <Image src="/images/svg/oyak.svg" />

            <Image ml={5} src="/images/svg/axa.svg" />
          </Flex>

          <TranslatedText
            label="promotion_motorInsurance_promotion_promotion_text"
            mb={4}
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

export const getServerSideProps = withIronSessionSsr(async function () {
  const response: any = {
    props: {
      messages: await getLocalizationMessages(),
    },
  };

  return response;
}, sessionOptions);
export default Index;
