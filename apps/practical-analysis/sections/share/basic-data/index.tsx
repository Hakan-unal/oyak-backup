import { useMemo } from 'react';

import { FinnetSharedRequestModel } from '@libs/models/finnet';

import DividendInformationTable from './dividend-information-table';
import IndebtednessInformationTable from './indebtedness-information-table';
import ProfitabilityRatioTable from './profitability-ratio-table';
import SharePerformanceTable from './share-performance-table';
import ShareSummaryTable from './share-summary-table';
import SummaryFinancialsTable from './summary-financials-table';

interface Props {
  assetId: string;
  shareBalanceFormat?: string;
}

const ShareBasicData = ({ assetId, shareBalanceFormat }: Props) => {
  const serviceParams: FinnetSharedRequestModel = useMemo(
    () => ({ assetId, shareBalanceFormat }),
    [ assetId, shareBalanceFormat ],
  );

  return (
    <div className='flex flex-col gap-8 sm:gap-16'>
      <ShareSummaryTable serviceParams={serviceParams} />
      <SharePerformanceTable serviceParams={serviceParams} />
      <SummaryFinancialsTable serviceParams={serviceParams} />
      <ProfitabilityRatioTable serviceParams={serviceParams} />
      <DividendInformationTable serviceParams={serviceParams} />
      <IndebtednessInformationTable serviceParams={serviceParams} />
    </div>
  );
};

export default ShareBasicData;
