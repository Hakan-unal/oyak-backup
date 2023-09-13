import { useEffect } from 'react';
import { useQuery } from 'react-query';

import Loading from '@libs/components/molecules/loading/loading';
import InfoText from '@libs/components/molecules/text/info-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';

import TechnicAnalysisChart from './technic-analysis-chart';
import { getTradingVolumeAndPriceChartHandler } from 'prac-analysis/actions/finnet-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface TechnicAnalysisProps {
  assetId: string;
}

const ShareTechnicAnalysis = ({ assetId }: TechnicAnalysisProps) => {
  const { data, isLoading, refetch } = useQuery(
    QUERY_KEYS.TRADING_VOLUME_AND_PRICE_CHART,
    () => getTradingVolumeAndPriceChartHandler({ assetId }),
  );

  useEffect(() => {
    refetch();
  }, [ refetch, assetId ]);

  return (
    <div className='flex flex-col bg-basic-one rounded-lg'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='mb-4 md:mb-6'>
            <TranslatedText
              className='font-bold text-basic-six text-sm md:text-base '
              label='general_technicAnalysis_graph_tradingVolumeGraph_title'
            />
          </div>
          <TechnicAnalysisChart assetId={assetId} data={data} />

          <InfoText
            components={[
              <label className='font-bold text-basic-five' key='0' />,
            ]}
            containerClass='mt-4'
            label='general_technicAnalysis_bollinger_text'
            textColor='text-basic-five'
          />
        </>
      )}
    </div>
  );
};

export default ShareTechnicAnalysis;
