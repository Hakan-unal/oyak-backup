import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { object, string, boolean } from "yup";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { withIronSessionSsr } from "iron-session/next";

import Button from "components/core/Button";
import { FormInput } from "components/core/form/Input";
import Layout from "components/layout/Layout";
import CheckboxWithButton from "components/core/form/Checkbox";
import { RadioGroup } from "components/core/form/RadioGroup";
import TranslatedText from "components/core/Text";
import PDFContractModal from "components/modals/PDFContractModal";
import ButtonBox from "components/layout/ButtonBox";

import { getLocalizationMessages } from "utils/localization.util";
import { getUseFormDefaults } from "utils/form.util";
import { paths, RemoteApiPaths } from "utils/page.util";
import { InternalApi } from "utils/fetch.util";
import { sessionOptions } from "utils/session.util";
import { ProductType } from "utils/products.util";

const schema = object().shape({
  email: string()
    .required("general_form_requiredField_text")
    .email("insuranceRequest_form_email_errorMessage"),
  petType       : string().required("general_form_requiredField_text"),
  insuranceType : string().required("general_form_requiredField_text"),
  consent       : string()
    .required("general_form_requiredField_text")
    .oneOf([ "yes" ], "insuranceRequest_form_information1_errorMessage"),
  iys: string()
    .required("general_form_requiredField_text")
    .oneOf([ "yes" ], "insuranceRequest_form_information2_errorMessage"),
  kvkk: boolean()
    .required("general_form_requiredField_text")
    .oneOf([ true ], "general_form_requiredField_text"),
  broker: boolean()
    .required("general_form_requiredField_text")
    .oneOf([ true ], "general_form_requiredField_text"),
});

const petTypes = {
  cat   : "Kedi",
  dog   : "Köpek",
  basic : "Patim Güvende",
  plus  : "Patim Güvende Plus",
};

const PetForm = () => {
  const {
    push,
    query: { petType, insuranceType },
  } = useRouter();

  const mutation = useMutation({
    mutationFn: (data: any) =>
      InternalApi.post(RemoteApiPaths.Pet, data).then(() => {
        push(paths.success);
      }),
    onError() {
      push("/insurance/fail");
    },
  });

  const pType = (petType as "cat") || "dog";
  const iType = (insuranceType as "basic") || "plus";

  const { control, handleSubmit } = useForm(
    getUseFormDefaults(schema, {
      email         : "",
      petType       : petTypes[pType],
      insuranceType : petTypes[iType],
    }),
  );

  const submitHandler = (data: any) => {
    // eslint-disable-next-line no-console
    console.log("Pet data:", data);
    mutation.mutate({
      petType : data.petType,
      petPlus : data.insuranceType,
      email   : data.email,
    });
  };

  return (
    <Layout title="insuranceRequest_form_informations_title">
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
        <Flex direction="column" gap="4" px="4">
          <FormInput
            control={control}
            label="insuranceRequest_form_email_placeholder"
            name="email"
            type="email"
          />
          <FormInput
            control={control}
            inputProps={{ isDisabled: true }}
            label="insuranceRequest_form_petForm_petType_placeholder"
            name="petType"
            type="text"
          />
          <FormInput
            control={control}
            inputProps={{ isDisabled: true }}
            label="insuranceRequest_form_petForm_package_placeholder"
            name="insuranceType"
            type="text"
          />
          <Flex display="inline" fontSize="14px" lineHeight="19px">
            <TranslatedText
              display="inline"
              label="insuranceRequest_form_explicitConsent_text"
              mr={1}
              variant="rBody2"
            />
            <PDFContractModal
              buttonLabel="insuranceRequest_form_explicitConsent_button"
              pdfPath="/documents/ogsb-kvkk-izin.pdf"
              title="insuranceRequest_form_explicitConsent_button"
            />
            <TranslatedText
              display="inline"
              label="insuranceRequest_form_explicitConsentTransfer_text"
              variant="rBody2"
            />
          </Flex>
          <RadioGroup
            control={control}
            label="consent"
            name="consent"
            options={[
              {
                label : "insuranceRequest_form_accept_text",
                value : "yes",
              },
              {
                label : "insuranceRequest_form_doNotAccept_text",
                value : "no",
              },
            ]}
          />
          <CheckboxWithButton
            actionComponent={
              <PDFContractModal
                buttonLabel="insuranceRequest_form_customerClarificationText_button"
                pdfPath="/documents/oyak-aydinlatma-metni.pdf"
                title="Aydınlatma Metni"
              />
            }
            control={control}
            label="insuranceRequest_form_readAndAccept_text"
            name="kvkk"
          />
          <TranslatedText
            label="insuranceRequest_form_electronicMessage_text"
            mb={0}
            variant="rBody2"
          />
          <RadioGroup
            control={control}
            label="consent"
            name="iys"
            options={[
              {
                label : "insuranceRequest_form_yes_text",
                value : "yes",
              },
              {
                label : "insuranceRequest_form_no_text",
                value : "no",
              },
            ]}
          />

          <CheckboxWithButton
            actionComponent={
              <PDFContractModal
                buttonLabel="insuranceRequest_form_brokerAuthorizationCertificate_button"
                pdfPath="/documents/ogsb-yetki-belgesi.pdf"
                title="Oyak Grup Sigorta Broker Yetki Belgesi"
              />
            }
            control={control}
            label="insuranceRequest_form_readAndAccept_text"
            name="broker"
          />
          <Image alignSelf="center" alt="asd" src="/or_header.png" w="256px" />
        </Flex>
        <ButtonBox>
          <Button
            isLoading={mutation.isLoading}
            label="insuranceRequest_form_sendForm_button"
            type="submit"
            variant="primary"
            w="full"
          />
        </ButtonBox>
      </form>
    </Layout>
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
export default PetForm;
