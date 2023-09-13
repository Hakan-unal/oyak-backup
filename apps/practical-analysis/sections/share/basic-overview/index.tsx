import { useMemo } from 'react';

import InfoText from '@libs/components/molecules/text/info-text';
import TranslatedText from '@libs/components/molecules/text/translated-text';

import BasicViewCommentCard from './basic-view-comment-card';
import PerformanceAnalysisChart from './performance-analysis-chart';
import ValuationFactorChart from './valuation-factor-chart';
import ValuationFactorTable from './valuation-factor-table';

interface Props {
  assetId: string;
  shareBalanceFormat?: string;
}

const ShareBasicOverview = ({ assetId, shareBalanceFormat }: Props) => {
  const serviceParams = useMemo(
    () => ({ assetId, shareBalanceFormat }),
    [ assetId, shareBalanceFormat ],
  );

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col sm:flex-row gap-6 mb-8'>
        <div className='w-full flex flex-col gap-4 sm:gap-6'>
          <BasicViewCommentCard serviceParams={serviceParams} />
        </div>
        <div className='w-full flex flex-col gap-4 sm:gap-6'>
          <TranslatedText
            label='general_basicOverview_graph_performanceAnalysis_title'
            textVariant='body1'
          />
          <PerformanceAnalysisChart serviceParams={serviceParams} />
        </div>
      </div>
      <ValuationFactorTable serviceParams={serviceParams} />
      <TranslatedText
        className='mb-8 mt-4'
        label='general_basicOverview_explanation6_text'
        textVariant='body2'
      />
      <ValuationFactorChart serviceParams={serviceParams} />
      <InfoText
        label='general_basicOverview_explanation7_text'
        textColor='text-basic-five'
        textVariant='body4'
      />
    </div>
  );
};

export default ShareBasicOverview;
