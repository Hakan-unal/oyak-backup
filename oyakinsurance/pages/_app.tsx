/* eslint-disable import/no-unresolved */
import "../public/assets/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { NextIntlProvider } from "next-intl";
import type { AppProps } from "next/app";
import Script from "next/script";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import { emptyErrorHandler } from "utils/localization.util";

import { customTheme } from "../utils/theme.util";

import "@fontsource/open-sans";

const onError = (error: any) => {
  // eslint-disable-next-line no-console
  console.log({ error });

  localStorage.removeItem("message");

  const getMessage = () => {
    if (error.name === "AxiosError") {
      return (
        error.response?.data?.message || error?.response?.data || error.message
      );
    }

    return error.message;
  };

  localStorage.setItem("message", getMessage());
};

const queryClient = new QueryClient({
  mutationCache  : new MutationCache({ onError }),
  queryCache     : new QueryCache({ onError }),
  defaultOptions : {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-673307376"
        strategy="afterInteractive"
      />
      <Script
        async
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-673307376', {'userId': '${pageProps.userId}'});
          `,
        }}
        strategy="afterInteractive"
      />
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={customTheme}>
          <NextIntlProvider
            messages={pageProps.messages}
            onError={emptyErrorHandler}
          >
            <Component {...pageProps} />
          </NextIntlProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}
