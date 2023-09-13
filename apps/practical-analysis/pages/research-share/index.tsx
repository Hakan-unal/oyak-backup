/* eslint-disable react-hooks/exhaustive-deps */

import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import TabView, {
  TabViewItemProps,
} from '@libs/components/molecules/tab/tab-view';

import { getShareListHandler } from 'prac-analysis/actions/finnet-api';
import { getInstrumentAnalyzeHandler } from 'prac-analysis/actions/setting-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';
import AssetSkeletonLayout from 'prac-analysis/sections/layout/asset-skeleton-layout';
import ShareBasicData from 'prac-analysis/sections/share/basic-data';
import ShareBasicOverview from 'prac-analysis/sections/share/basic-overview';
import ShareResearchDocument from 'prac-analysis/sections/share/research-document';
import ShareTechnicAnalysis from 'prac-analysis/sections/share/technic-analysis';
import ShareTechnicOverview from 'prac-analysis/sections/share/technic-overview';

const ResearchShare = () => {
  const {
    query: { symbol },
  } = useRouter();

  const [ assetId, setAssetId ] = useState<string | undefined>();

  const { data: assets } = useQuery(QUERY_KEYS.GET_INSTRUMENT_ANALYZE, () =>
    getInstrumentAnalyzeHandler({ includesResearchScope: true }),
  );

  const { data: shareList, isLoading: isShareListLoading } = useQuery(
    QUERY_KEYS.SHARE_LIST,
    () => getShareListHandler(),
  );

  useEffect(() => {
    if (symbol) {
      setAssetId(symbol as string | undefined);
    } else if (!assetId && assets) {
      setAssetId(assets?.[0]?.symbol as string);
    }
  }, [ symbol, assets ]);

  const selectedShareInfo = useMemo(
    () => shareList?.find((share) => share.assetId === assetId),
    [ shareList, assetId ],
  );

  const tabs: TabViewItemProps[] = [
    {
      label     : 'general_general_basicOverview_button',
      component : (
        <ShareBasicOverview
          assetId={assetId!}
          shareBalanceFormat={selectedShareInfo?.shareBalanceFormat}
        />
      ),
      isLoading: isShareListLoading,
    },
    {
      label     : 'general_general_basicDatas_button',
      component : (
        <ShareBasicData
          assetId={assetId!}
          shareBalanceFormat={selectedShareInfo?.shareBalanceFormat}
        />
      ),
      isLoading: isShareListLoading,
    },
    {
      label     : 'general_general_technicOverview_button',
      component : (
        <ShareTechnicOverview
          assetId={assetId!}
          shareBalanceFormat={selectedShareInfo?.shareBalanceFormat}
        />
      ),
      isLoading: isShareListLoading,
    },
    {
      label     : 'general_general_technicAnalysis_button',
      component : <ShareTechnicAnalysis assetId={assetId!} />,
      isLoading : isShareListLoading,
    },
    {
      label     : 'general_assetsCoveredByResearch_reports_button',
      component : <ShareResearchDocument assetId={assetId!} />,
      isLoading : isShareListLoading,
    },
  ];

  return (
    <AssetSkeletonLayout assets={assets} initialAssetId={assetId}>
      {assetId && (
        <TabView
          showBottomLine
          outerClassName='p-0 sm:p-4 py-8 sm:py-10'
          tabLabelButtonClassName='pb-4'
          tabs={tabs}
        />
      )}
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

export default ResearchShare;
