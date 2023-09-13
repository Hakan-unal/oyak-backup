import { ChakraProvider } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import '@fontsource/roboto';
import '@styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { NextIntlProvider } from 'next-intl';
import { ReactElement, ReactNode, useEffect } from 'react';

import type { AppProps } from 'next/app';

import { resetInActiveTimeEvent } from '@utils/event.util';
import { customTheme } from '@utils/theme.util';

import paths from '@routes/paths';

import { HTTP_STATUS } from '@constants/http-status';
import { DynamicType } from '@models/common.model';

const { ToastContainer, toast } = createStandaloneToast();

// eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function
function empty() {}

export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<unknown>;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { push } = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);
  const component = getLayout(<Component {...pageProps} />);
  const messages = (pageProps as DynamicType)?.messages;

  useEffect(() => {
    window.addEventListener('click', resetInActiveTimeEvent);

    return () => window.removeEventListener('click', resetInActiveTimeEvent);
  }, []);

  const queryClientCatchError = (error: DynamicType) => {
    const status =
      error?.response?.data?.status || error?.response?.status || error?.status;

    const errorResponseData = error?.response?.data;

    let description =
      errorResponseData?.data?.message ||
      errorResponseData?.error?.message ||
      errorResponseData?.message ||
      errorResponseData;

    const isLogout = status === HTTP_STATUS.UNAUTHORIZED;

    if (isLogout) {
      description = 'general_general_sessionEnded_text';
    }

    if (error.code === 'ECONNABORTED') {
      description = 'general_general_timeout_text';
    }

    if (isLogout) {
      push(paths.LOGOUT);
    }

    toast.closeAll();
    toast({
      position    : 'top',
      description : messages?.[description] || description,
      status      : 'error',
      duration    : 3000,
      isClosable  : true,
    });
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime            : 200,
        staleTime            : 0,
        refetchOnWindowFocus : false,
        retry                : 0,
        onError              : queryClientCatchError,
      },
      mutations: {
        onError: queryClientCatchError,
      },
    },
  });

  return (
    <>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-ERLHCXETPP'
        strategy='afterInteractive'
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);} 
        gtag('js', new Date()); 
        gtag('config', 'G-ERLHCXETPP');`,
        }}
        id='google-analytics'
        strategy='afterInteractive'
      />
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={customTheme}>
          <NextIntlProvider messages={messages} onError={empty}>
            <Head>
              <title>Oyak Yatırım | Müşteri Edinim</title>
            </Head>
            {component}
          </NextIntlProvider>
          <ToastContainer />
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
