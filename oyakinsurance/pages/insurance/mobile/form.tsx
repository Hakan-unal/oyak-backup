import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  RadioGroup as CRG,
  Radio,
  Stack,
  useDisclosure,
  Divider,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { useController, useForm } from "react-hook-form";
import { object, string, boolean } from "yup";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "@chakra-ui/icons";

import Button from "components/core/Button";
import { FormInput } from "components/core/form/Input";
import Layout from "components/layout/Layout";
import CheckboxWithButton from "components/core/form/Checkbox";
import TranslatedText from "components/core/Text";
import PDFContractModal from "components/modals/PDFContractModal";
import ButtonBox from "components/layout/ButtonBox";
import { RadioGroup } from "components/core/form/RadioGroup";

import { ProductType } from "utils/products.util";
import { getLocalizationMessages } from "utils/localization.util";
import { getUseFormDefaults } from "utils/form.util";
import { paths, RemoteApiPaths } from "utils/page.util";
import { InternalApi } from "utils/fetch.util";
import { sessionOptions } from "utils/session.util";

const INSTALLMENT = 10;

const InstallMentDrawer = ({ name, control, defaultValue }: any) => {
  const [ buttonLabel, setButtonLabel ] = React.useState<string>(
    "insuranceRequest_form_paymentOptions_placeholder",
  );

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { field, fieldState } = useController({ name, control, defaultValue });
  const t = useTranslations();
  const isInvalid = !!fieldState.error;

  const options = [ ...Array(INSTALLMENT).keys() ].map((a) => (
    <Radio
      flexDirection="row-reverse"
      justifyContent="space-between"
      key={a + 1}
      my="2"
      value={`${a + 1}`}
    >
      {t(`insuranceRequest_form_tray_${a + 1}InstallmentsForTheCashPrice_text`)}
    </Radio>
  ));

  const clickHandler = () => {
    setButtonLabel(
      `insuranceRequest_form_tray_${field.value}InstallmentsForTheCashPrice_text`,
    );
    onClose();
  };

  return (
    <>
      <FormControl isInvalid={isInvalid} w="full">
        <Button
          borderBottom="2px"
          borderBottomColor="basic.300"
          display="flex"
          fontWeight="normal"
          justifyContent="space-between"
          label={buttonLabel}
          onClick={onOpen}
          rightIcon={<ChevronDownIcon />}
          rounded="none"
          textAlign="start"
          variant="unstyled"
          w="full"
        />
        <FormErrorMessage>
          {t(fieldState.error?.message || "")}
        </FormErrorMessage>
      </FormControl>

      <Drawer
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent maxH="75vh" roundedTop="xl">
          <DrawerCloseButton />
          <DrawerHeader>
            {t("insuranceRequest_form_tray_paymentOptions_subtitle")}
          </DrawerHeader>

          <DrawerBody>
            <CRG colorScheme="red" {...field}>
              <Stack direction="column" divider={<Divider />}>
                {options}
              </Stack>
            </CRG>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="red"
              label="general_general_select_button"
              onClick={clickHandler}
              variant="primary"
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const schema = object().shape({
  email: string()
    .required("general_form_requiredField_text")
    .email("insuranceRequest_form_email_errorMessage"),
  imei             : string().required("general_form_requiredField_text"),
  installmentCount : string().required("general_form_requiredField_text"),
  consent          : string()
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

const PersonalForm = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (model: any) =>
      InternalApi.post<{
        brickGuid: string;
        requestData: string;
      }>(RemoteApiPaths.Cep, model).then((r) => r.data),
    onSuccess(data) {
      router.push(`${paths.mobileOffer}?brickGuid=${data.brickGuid}`);
    },
    onError() {
      router.push("/insurance/fail");
    },
  });

  const { control, handleSubmit } = useForm(
    getUseFormDefaults(schema, {
      email            : "",
      imei             : "",
      installmentCount : "",
      broker           : false,
      kvkk             : false,
    }),
  );

  const submitHandler = ({ email, imei, installmentCount }: any) => {
    mutation.mutate({
      email,
      imei,
      installmentCount: Number(installmentCount),
    });
  };

  return (
    <Layout title="insuranceRequest_form_informations_title">
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{
          width          : "100%",
          minHeight      : "90vh",
          display        : "flex",
          flexDirection  : "column",
          justifyContent : "space-between",
        }}
      >
        <Flex direction="column" gap="4" px={4}>
          <FormInput
            control={control}
            label="insuranceRequest_form_email_placeholder"
            name="email"
            type="email"
          />
          <FormInput
            control={control}
            helperText="insuranceRequest_form_phoneForm_explanation_text"
            label="insuranceRequest_form_phoneForm_IMEI_placeholder"
            maxLength={15}
            name="imei"
            type="text"
          />
          <InstallMentDrawer control={control} name="installmentCount" />
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
            m="0"
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
          <Image
            alignSelf="center"
            alt="asd"
            mt={6}
            src="/or_header.png"
            w="256px"
          />
        </Flex>
        <ButtonBox>
          <Button
            isDisabled={mutation.isSuccess}
            isLoading={mutation.isLoading}
            label="insuranceRequest_form_phoneForm_showOfferForm_button"
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
export default PersonalForm;
