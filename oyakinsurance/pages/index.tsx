/* eslint-disable no-console */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";

import { Wrapper } from "components/core/Wrapper";

import { getRedirectedRoute } from "utils/page.util";
import { getLocalizationMessages } from "utils/localization.util";
import { sessionOptions } from "utils/session.util";

export default function Home() {
  return (
    <Flex
      direction="column"
      justify="center"
      minH={{ base: "100vh", md: "100%" }}
    >
      <Wrapper maxW={{ base: "full", md: "xl" }}>
        <Alert
          alignItems="center"
          flexDirection="column"
          height="200px"
          justifyContent="center"
          rounded="xl"
          status="error"
          textAlign="center"
          variant="subtle"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle fontSize="lg" mb={1} mt={4}>
            Yetkiniz Yok
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            İlgili sayfayı görüntülemek için yetkiniz yok.
          </AlertDescription>
        </Alert>
      </Wrapper>
    </Flex>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  query,
  req,
}) {
  if (query.selection) {
    return {
      redirect: {
        destination : getRedirectedRoute(query.selection as string),
        statusCode  : 307,
      },
      props: {
        messages : await getLocalizationMessages(),
        userId   : req.session.user?.tckn || "no user data",
      },
    };
  }

  return {
    props: {
      messages : await getLocalizationMessages(),
      userId   : req.session.user?.tckn || "no user data",
    },
  };
},
sessionOptions);
