import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { IS_COOKIE_SECURE } from '@libs/api/constants';
import Loading from '@libs/components/molecules/loading/loading';

import { getInstrumentAnalyzeHandler } from 'prac-analysis/actions/setting-api';
import { COOKIE_KEYS } from 'prac-analysis/constants/cookies';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';
import paths from 'prac-analysis/routes/internal-paths';

const GuestApplication = () => {
  const {
    query: { assetId },
    replace,
  } = useRouter();

  const { data: assets } = useQuery(QUERY_KEYS.GET_INSTRUMENT_ANALYZE, () =>
    getInstrumentAnalyzeHandler({ includesResearchScope: true }),
  );

  useEffect(() => {
    if (assetId && assets) {
      let pathname = paths.UNRESEARCHED_SHARE;

      if (assets?.some((asset) => asset.symbol === assetId)) {
        pathname = paths.RESEARCHED_SHARE;
      }

      replace({
        pathname,
        query: { symbol: assetId },
      });
    }
  }, [ assets, assetId, replace ]);

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
