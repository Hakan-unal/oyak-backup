import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { IS_COOKIE_SECURE } from '@libs/api/constants';
import Loading from '@libs/components/molecules/loading/loading';

import { COOKIE_KEYS } from 'prac-advice/constants/cookies';
import paths from 'prac-advice/routes/internal-paths';

const GuestApplication = () => {
  const {
    query: { assetId },
    replace,
  } = useRouter();

  useEffect(() => {
    replace({
      pathname : paths.HOURLY_SIGNAL_DETAIL,
      query    : { symbol: assetId },
    });
  }, [ assetId, replace ]);

  return <Loading variant='screen' />;
};

export function getServerSideProps({ req, res, query }) {
  const { token } = query;

  setCookie(COOKIE_KEYS.AUTHORIZATION_TOKEN, token, {
    req,
    res,
    sameSite : 'lax',
    secure   : IS_COOKIE_SECURE,
  });

  return {
    props: {
      protected: false,
    },
  };
}

export default GuestApplication;
