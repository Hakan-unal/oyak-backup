/* eslint-disable no-console */
import { Button, Center, Divider, VStack } from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { useEffect } from "react";

import { FormInput } from "components/core/form/Input";

import { InternalApi } from "utils/fetch.util";
import { getUseFormDefaults } from "utils/form.util";
import { getLocalizationMessages } from "utils/localization.util";
import { sessionOptions } from "utils/session.util";
import { ProductType } from "utils/products.util";

const schema = object().shape({
  userName  : string().required("Bu alan doldurulmalıdır"),
  password  : string().required("Bu alan doldurulmalıdır"),
  tckn      : string(),
  birthDate : string(),
  gsm       : string(),
  fullName  : string(),
});

const Playroom = ({ hasUser, accessProducts }: any) => {
  const router = useRouter();

  const { setValue, control, handleSubmit } = useForm(
    getUseFormDefaults(schema, {
      userName  : "",
      password  : "",
      tckn      : "",
      fullName  : "",
      gsm       : "",
      birthDate : "",
    }),
  );

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      setValue("userName", "total@oyakgrupsigorta.com");
      setValue("password", "123asd123!A");
    }
  }, []);

  const submitHandler = (data: any) => {
    InternalApi.post("/api/test", data).then(() => router.reload());
  };

  console.log("Access : ", accessProducts);

  return !hasUser ? (
    <Center>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormInput
          control={control}
          label="Kullanıcı Adı"
          name="userName"
          type="text"
        />
        <FormInput
          control={control}
          label="Şifre"
          name="password"
          type="text"
        />
        <FormInput control={control} label="tckn" name="tckn" type="text" />
        <FormInput
          control={control}
          label="full name"
          name="fullName"
          type="text"
        />
        <FormInput control={control} label="gsm" name="gsm" type="text" />
        <FormInput
          control={control}
          helperText="YYYY-MM-DD"
          label="birthDate"
          name="birthDate"
          type="text"
        />
        <Button mt={4} type="submit" variant="primary">
          Giriş Yap
        </Button>
      </form>
    </Center>
  ) : (
    <VStack divider={<Divider />} marginX="auto" mt="10" w="60">
      {accessProducts?.includes(ProductType.MOBILE) && (
        <Link href={"/?selection=mobile"}>Cep telefonu</Link>
      )}
      {accessProducts?.includes(ProductType.PET) && (
        <Link href={"/?selection=pet"}>Evcil Hayvan</Link>
      )}
      {accessProducts?.includes(ProductType.BES) && (
        <Link href={"/?selection=bes"}>18 Yaş altı BES</Link>
      )}
      {accessProducts?.includes(ProductType.FKS) && (
        <Link href={"/?selection=healthylife"}>Sağlıklı Yaşam</Link>
      )}
      {accessProducts?.includes(ProductType.KSKL) && (
        <Link href={"/?selection=totalkasko"}>Total Sigorta</Link>
      )}
    </VStack>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  let accessProducts: Array<string> = [];

  if (req?.session.token) {
    accessProducts = req.session.accessProducts;
  }

  const response: any = {
    props: {
      accessProducts,
      hasUser  : !!req.session.token,
      messages : await getLocalizationMessages(),
      userId   : req.session.user?.tckn || "no user data",
    },
  };

  // TODO(anyone): Must be open when prod deploy
  // if (process.env.NODE_ENV === "production") {
  //   response = {
  //     redirect: {
  //       destination: paths.home,
  //     },
  //   };
  // }

  return response;
}, sessionOptions);
export default Playroom;
