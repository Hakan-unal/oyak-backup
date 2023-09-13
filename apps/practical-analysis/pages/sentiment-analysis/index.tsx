import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getSentimentLastScoresHandler } from 'prac-analysis/actions/sentiment-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';
import AssetSkeletonLayout from 'prac-analysis/sections/layout/asset-skeleton-layout';
import SentimentAnalysisComponent from 'prac-analysis/sections/sentiment-analysis';
import { DEFAULT_SENTIMENT } from 'prac-analysis/sections/sentiment-analysis/constants';

const SentimentAnalysis = () => {
  const {
    query: { symbol },
  } = useRouter();

  const [ assetId, setAssetId ] = useState<string | undefined>();

  const { data: assets } = useQuery(QUERY_KEYS.GET_SENTIMENT_LAST_SCORES, () =>
    getSentimentLastScoresHandler(),
  );

  useEffect(() => {
    if (symbol) {
      setAssetId(symbol as string | undefined);
    } else if (!assetId && assets) {
      setAssetId(DEFAULT_SENTIMENT);
    }
  }, [ symbol, assets, assetId ]);

  return (
    <AssetSkeletonLayout assets={assets} initialAssetId={assetId}>
      <SentimentAnalysisComponent assetId={assetId} />
    </AssetSkeletonLayout>
  );
};

export function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default SentimentAnalysis;
