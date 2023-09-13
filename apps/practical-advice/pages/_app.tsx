/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-types */
import '@libs/api/globalAxios';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';

import { HTTP_STATUS } from '@libs/constants/http-status';
import useModal from '@libs/hooks/useModal';
import i18n from '@libs/locales/i18n';
import { DynamicType } from '@libs/models/model';

import Wrapper from './wrapper';
import { SessionProvider } from 'prac-advice/contexts/session.context';
import MainLayout from 'prac-advice/sections/layout/main-layout';
import { logoutCookie } from 'prac-advice/utils/cookie.utils';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const content = getLayout(<Component {...pageProps} />);
  const { AlertModal, infoAlert, warnAlert } = useModal();

  const queryClientCatchError = (error: DynamicType) => {
    console.log('ERROR : ', error);

    const status =
      error?.response?.data?.status || error?.response?.status || error?.status;

    console.log('STATUS : ', status);

    if (status === HTTP_STATUS.UNAUTHORIZED) {
      infoAlert({
        text            : 'general_general_sessionEnded_text',
        buttonOnPress   : logoutCookie,
        hideCloseButton : true,
        toggleModal     : false,
      });
    } else if (status === HTTP_STATUS.BAD_REQUEST) {
      const errorResponseData = error?.response?.data;

      const message: string =
        errorResponseData?.error?.message ||
        errorResponseData?.message ||
        errorResponseData;

      warnAlert(message);
    } else {
      warnAlert('general_general_error_text');
    }

    // TODO(eren.tur): Write handle error
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
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <I18nextProvider i18n={i18n}>
          <Wrapper>
            {pageProps.protected ? <MainLayout>{content}</MainLayout> : content}
          </Wrapper>
        </I18nextProvider>
      </SessionProvider>
      <AlertModal />
    </QueryClientProvider>
  );
}
