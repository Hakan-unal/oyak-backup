import { useMemo } from 'react';

import { FinnetSharedRequestModel } from '@libs/models/finnet';

import MovingAverageDistanceAnalysisTable from './moving-average-distance-table';
import PriceChangesTable from './price-changes-table';
import SupportResistanceLevelTable from './support-resistance-level-table';
import TechnicalIndicatorsTable from './technical-indicators-table';

interface Props {
  assetId: string;
  shareBalanceFormat?: string;
}

const ShareTechnicOverview = ({ assetId, shareBalanceFormat }: Props) => {
  const serviceParams: FinnetSharedRequestModel = useMemo(
    () => ({ assetId, shareBalanceFormat }),
    [ assetId, shareBalanceFormat ],
  );

  return (
    <div className='flex flex-col gap-8'>
      <SupportResistanceLevelTable serviceParams={serviceParams} />
      <TechnicalIndicatorsTable serviceParams={serviceParams} />
      <PriceChangesTable serviceParams={serviceParams} />
      <MovingAverageDistanceAnalysisTable serviceParams={serviceParams} />
    </div>
  );
};

export default ShareTechnicOverview;
