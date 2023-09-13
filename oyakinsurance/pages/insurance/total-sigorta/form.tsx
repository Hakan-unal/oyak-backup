/* eslint-disable import/no-named-as-default */
import { Flex, FormControl, FormErrorMessage, Image } from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { boolean, object, string } from "yup";

import Button from "components/core/Button";
import CheckboxWithButton from "components/core/form/Checkbox";
import FormDatePicker from "components/core/form/FormDatePicker";
import { RadioGroup } from "components/core/form/RadioGroup";
import TranslatedText from "components/core/Text";
import ButtonBox from "components/layout/ButtonBox";
import Layout from "components/layout/Layout";
import PDFContractModal from "components/modals/PDFContractModal";
import ControllerFormInput, {
  InputPatternEnum,
} from "components/core/form/FormInput";

import { InternalApi } from "utils/fetch.util";
import { getUseFormDefaults } from "utils/form.util";
import { getLocalizationMessages } from "utils/localization.util";
import { paths, RemoteApiPaths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";
import { dateRequestFormatter } from "utils/date.utils";

const schema = object().shape({
  tckn      : string().required("general_form_requiredField_text"),
  name      : string().required("general_form_requiredField_text"),
  surname   : string().required("general_form_requiredField_text"),
  birthDate : string().required("general_form_requiredField_text"),
  gsm       : string().required("general_form_requiredField_text"),
  email     : string()
    .required("general_form_requiredField_text")
    .email("insuranceRequest_form_email_errorMessage"),
  campaignCode : string().required("general_form_requiredField_text"),
  consent      : string()
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
  recaptcha: string().required("general_form_requiredField_text"),
});

const TotalForm = () => {
  const { push } = useRouter();
  const captchaRef = useRef<any>(null);
  const t = useTranslations();

  const mutation = useMutation({
    mutationFn: (data: any) =>
      InternalApi.post(RemoteApiPaths.Kskl, data).then(() => {
        captchaRef?.current.reset();
        push(paths.total.success);
      }),
    onError() {
      captchaRef?.current.reset();
      push(paths.total.fail);
    },
  });

  const {
    control,
    setValue,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = useForm(
    getUseFormDefaults(schema, {
      email        : "",
      tckn         : "",
      name         : "",
      surname      : "",
      birthDate    : "",
      gsm          : "",
      campaignCode : "",
    }),
  );

  const submitHandler = (data: any) => {
    if (!data.recaptcha) {
      return;
    }

    mutation.mutate({
      email        : data.email,
      tckn         : data.tckn,
      fullName     : `${data.name} ${data.surname}`,
      birthDate    : dateRequestFormatter(new Date(data.birthDate)),
      gsm          : data.gsm?.replace(/[^\d]/g, ""),
      campaignCode : data.campaignCode,
      captchaToken : data.recaptcha,
    });
  };

  // TODO implement API and FIX loc errors
  return (
    <Layout isHideCloseButton title="insuranceRequest_form_informations_title">
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
          <ControllerFormInput
            control={control}
            error={errors.tckn}
            maxLength={11}
            name="tckn"
            patternType={InputPatternEnum.Number}
            placeholder="form_motorInsurance_form_tckn_placeholder"
            type="tel"
          />
          <ControllerFormInput
            control={control}
            error={errors.name}
            name="name"
            placeholder="form_motorInsurance_form_name_placeholder"
            type="text"
          />
          <ControllerFormInput
            control={control}
            error={errors.surname}
            name="surname"
            placeholder="form_motorInsurance_form_surname_placeholder"
            type="text"
          />
          <FormDatePicker
            control={control}
            error={errors.birthDate}
            name="birthDate"
            placeholder="form_motorInsurance_form_birthDate_placeholder"
          />
          <ControllerFormInput
            control={control}
            error={errors.gsm}
            mask="(999) 999-9999"
            maxLength={10}
            name="gsm"
            placeholder="form_motorInsurance_form_gsm_placeholder"
            type="tel"
          />
          <ControllerFormInput
            control={control}
            error={errors.email}
            name="email"
            placeholder="form_motorInsurance_form_email_placeholder"
            type="email"
          />
          <ControllerFormInput
            control={control}
            error={errors.campaignCode}
            name="campaignCode"
            placeholder="form_motorInsurance_form_campaignCode_placeholder"
            type="text"
          />
          <Flex display="inline" fontSize="14px" lineHeight="19px">
            <TranslatedText
              display="inline"
              label="form_motorInsurance_form_explicitConsent_text"
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
            mb="0"
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
                title="Brokerlik Yetki Belgesi"
              />
            }
            control={control}
            label="insuranceRequest_form_readAndAccept_text"
            name="broker"
          />

          <FormControl isInvalid={!!errors?.recaptcha} w="full">
            <ReCAPTCHA
              hl="tr"
              onChange={(value) => {
                setValue("recaptcha", value);
                clearErrors("recaptcha");
              }}
              ref={captchaRef}
              sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
            />
            <FormErrorMessage>{t(errors?.recaptcha?.message)}</FormErrorMessage>
          </FormControl>

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

export const getServerSideProps = withIronSessionSsr(async function () {
  const response: any = {
    props: {
      messages: await getLocalizationMessages(),
    },
  };

  return response;
}, sessionOptions);
export default TotalForm;
