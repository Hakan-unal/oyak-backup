import { useQuery } from '@tanstack/react-query';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { InternalApi } from '@utils/fetch.util';
import { SessionUserType } from '@utils/session.util';

import paths from '@routes/paths';

import { SessionStorageKey } from '@constants/common';

export default function useUser({ redirectTo = '', redirectIfFound = false }) {
  const { push, pathname } = useRouter();
  const [ isLoading, setIsLoading ] = useState(true);

  const {
    data: user,
    refetch,
    isFetching,
  } = useQuery([ 'sessionuser' ], () =>
    InternalApi.get<SessionUserType>('/api/user').then((r) => r.data),
  );

  useEffect(() => {
    checkSession();

    if (!redirectTo || !user) {
      return;
    }

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [ user, redirectIfFound, redirectTo ]);

  const checkSession = () => {
    if (pathname !== paths.LOGIN) {
      const session = sessionStorage.getItem(SessionStorageKey.Session);

      if (!session) {
        push(paths.LOGOUT);
        refetch();
      }
    }

    setIsLoading(false);
  };

  return { user, isLoading: isLoading || isFetching, refetch };
}
