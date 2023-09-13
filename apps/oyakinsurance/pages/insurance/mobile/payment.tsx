import { Flex, Image, VStack } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { useMutation } from "react-query";

import Button from "components/core/Button";
import Layout from "components/layout/Layout";
import TranslatedText from "components/core/Text";
import ButtonBox from "components/layout/ButtonBox";

import { getLocalizationMessages } from "utils/localization.util";
import { InternalApi } from "utils/fetch.util";
import { paths, RemoteApiPaths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";
import { ProductType } from "utils/products.util";

const baseUrl = process.env.NEXT_PUBLIC_POCA_APP_DOMAIN;

interface PaymentResponse {
  paymentGuid: string;
  created: Date;
  redirectUrl: string | null;
  paymentStatus: string;
}

const Payment = ({ offerGuid }: any) => {
  const router = useRouter();

  const redirectMutation = useMutation({
    mutationFn: (paymentGuid: any) =>
      InternalApi.get(RemoteApiPaths.RedirectUrl, {
        params: {
          paymentGuid,
        },
      }).then((r) => r.data),
    onSuccess(data) {
      router.push(data.redirectUrl);
    },
    onError() {
      router.push("/insurance/fail");
    },
  });

  const paymentMutation = useMutation({
    mutationFn: () =>
      InternalApi.post<PaymentResponse>(RemoteApiPaths.BuyContract, {
        offerGuid,
        returnUrl: `${baseUrl}/insurance/mobile/paymentcheck`,
      }).then((r) => r.data),
    onSuccess(data) {
      redirectMutation.mutate(data.paymentGuid);
    },
    onError() {
      router.push("/insurance/fail");
    },
  });

  const clickHandler = () => {
    paymentMutation.mutate();
  };

  return (
    <Layout title="payment_phoneInsurance_payment_title">
      <Flex
        direction="column"
        h="88vh"
        justify="space-between"
        minHeight="full"
        w="full"
      >
        <VStack align="flex-start" px="4">
          <TranslatedText
            label="payment_phoneInsurance_creditCard_subtitle"
            variant="header1"
          />
          <TranslatedText label="payment_phoneInsurance_explanation_text" />
        </VStack>
        <VStack>
          <Image
            alignSelf="center"
            alt="Oyak Sigorta Logo"
            mb={6}
            src="/or_header.png"
            w="256px"
          />
          <ButtonBox>
            <Button
              isLoading={
                paymentMutation.isLoading || redirectMutation.isLoading
              }
              label="general_phoneOffer_approve_button"
              onClick={clickHandler}
              type="submit"
              variant="primary"
              w="full"
            />
          </ButtonBox>
        </VStack>
      </Flex>
    </Layout>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  query,
}) {
  const { offerGuid } = query;

  let response: any = {
    props: {
      offerGuid,
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
},
sessionOptions);

export default Payment;
