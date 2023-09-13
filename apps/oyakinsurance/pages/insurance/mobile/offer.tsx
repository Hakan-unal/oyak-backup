import { Box, Center, Flex, HStack, Image } from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { boolean, object } from "yup";

import Button from "components/core/Button";
import DescriptionItem from "components/core/DescriptionItem";
import CheckboxWithButton from "components/core/form/Checkbox";
import TranslatedText from "components/core/Text";
import ButtonBox from "components/layout/ButtonBox";
import Layout from "components/layout/Layout";
import MobileScopeModal from "components/modals/MobileScopeModal";
import PDFContractModal from "components/modals/PDFContractModal";

import { InternalApi } from "utils/fetch.util";
import { getUseFormDefaults } from "utils/form.util";
import { getLocalizationMessages } from "utils/localization.util";
import { paths, RemoteApiPaths } from "utils/page.util";
import { ProductType } from "utils/products.util";
import { sessionOptions } from "utils/session.util";

interface ResponseModel {
  offerGuid: string;
  company: string;
  product: string;
  offerNumber: string;
  premium: number;
  responseData: any;
  offerStart: string;
  offerEnd: string;
}

const Errors = ({ errors, back }: any) => (
  <Flex direction="column" justify="space-between" minH="86vh" px={4}>
    <Center flexDirection="column" mb="6">
      <Image mb="8" src="/images/svg/fail.svg" />
      <TranslatedText
        align="center"
        fontSize="20px"
        fontWeight="bold"
        label="general_transaction_failed_subtitle"
        lineHeight="24px"
      />
      {errors.length > 0
        ? errors.map((e: any, index: number) => (
            <Box key={index}>{e.Message}</Box>
          ))
        : ""}
    </Center>
    <Button
      label="general_transaction_tryAgain_button"
      onClick={back}
      variant="secondary"
    />
  </Flex>
);

const schema = object().shape({
  readInformationForm: boolean()
    .required("general_form_requiredField_text")
    .oneOf([ true ], "general_form_requiredField_text"),
});

const getOfferData = ({ queryKey }: any) => {
  const [ , brickGuid ] = queryKey;

  return InternalApi.get<ResponseModel[]>(RemoteApiPaths.Offers, {
    params: {
      brickGuid,
    },
  }).then((r) => {
    const data = r.data[0];

    data.responseData = JSON.parse(r.data[0].responseData);

    return data;
  });
};

const Offer = ({ brickGuid }: any) => {
  const { push, back } = useRouter();

  const { data: offer, isLoading } = useQuery(
    [ "mobileOffer", brickGuid ],
    getOfferData,
    {
      onError(error: any) {
        if (error.response.status === 404) {
          push({
            pathname : paths.success,
            query    : { message: error?.response?.data?.message },
          });
        } else {
          push(paths.fail);
        }
      },
    },
  );

  const { control, handleSubmit, watch } = useForm(
    getUseFormDefaults(schema, {
      email : "",
      imei  : "",
    }),
  );

  const isReadForm = watch("readInformationForm");

  const submitHandler = () => {
    push(`${paths.mobilePayment}?offerGuid=${offer?.offerGuid}`);
  };

  const Form = (
    <form
      onSubmit={handleSubmit(submitHandler)}
      style={{
        width          : "100%",
        minHeight      : "100%",
        display        : "flex",
        flexDirection  : "column",
        justifyContent : "space-between",
      }}
    >
      <Flex direction="column" px="4" rowGap={6}>
        <DescriptionItem
          isLoaded={!isLoading}
          label="offerDetails_phoneOffer_nameSurname_text"
          value={
            offer?.responseData
              ? `${offer?.responseData.Name} ${offer?.responseData.LastName}`
              : ""
          }
        />
        <DescriptionItem
          isLoaded={!isLoading}
          label="offerDetails_phoneOffer_tcno_text"
          value={offer?.responseData.TCKN}
        />
        <Box bg="basic.200" h="1.5" mx="-4" />
        <DescriptionItem
          isLoaded={!isLoading}
          label="offerDetails_phoneOffer_productName_text"
          value={offer?.product as string}
        />
        <DescriptionItem
          isLoaded={!isLoading}
          label="offerDetails_phoneOffer_brand_text"
          value={offer?.responseData.PhoneSpec.Brand}
        />
        <DescriptionItem
          isLoaded={!isLoading}
          label="offerDetails_phoneOffer_model_text"
          value={offer?.responseData.PhoneSpec.Model}
        />
        <DescriptionItem
          isLoaded={!isLoading}
          label="offerDetails_phoneOffer_policyNo_text"
          value={offer?.offerNumber || ""}
        />
        <DescriptionItem
          isLoaded={!isLoading}
          label="offerDetails_phoneOffer_policyStartDate_text"
          value={
            offer?.offerStart
              ? new Date(offer?.offerStart as string).toLocaleDateString("tr")
              : ""
          }
        />
        <DescriptionItem
          isLoaded={!isLoading}
          label="offerDetails_phoneOffer_policyEndDate_text"
          value={
            offer?.offerEnd
              ? new Date(offer?.offerEnd as string).toLocaleDateString("tr")
              : ""
          }
        />
        <Box bg="basic.200" mx="-4" px="4" py="4">
          <DescriptionItem
            isLoaded={!isLoading}
            label="offerDetails_phoneOffer_totalAmount_text"
            value={
              offer?.premium
                ? Number(offer?.premium).toLocaleString("tr", {
                    style    : "currency",
                    currency : "TRY",
                  })
                : ""
            }
          />
        </Box>
        <CheckboxWithButton
          actionComponent={
            <PDFContractModal
              buttonLabel="offerDetails_phoneOffer_axa_insurance_button"
              isOpen={isReadForm}
              pdfPath="/documents/cyk-bilgilendirme.pdf"
              title="offerDetails_phoneOffer_axa_insurance_button"
            />
          }
          control={control}
          label="offerDetails_phoneOffer_axa_insurance_text"
          name="readInformationForm"
        />
        <Image
          alignSelf="center"
          alt="asd"
          my={4}
          src="/or_header.png"
          w="256px"
        />
      </Flex>
      <ButtonBox>
        <HStack>
          <MobileScopeModal />
          <Button
            label="general_phoneOffer_approve_button"
            type="submit"
            variant="primary"
            w="full"
          />
        </HStack>
      </ButtonBox>
    </form>
  );

  return (
    <Layout title="general_phoneOffer_offerDetails_title">
      {offer?.responseData.Errors.length > 0 ? (
        <Errors back={back} errors={offer?.responseData.Errors} />
      ) : (
        Form
      )}
    </Layout>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  query,
}) {
  const { brickGuid } = query;

  let response: any = {
    props: {
      brickGuid,
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

export default Offer;
