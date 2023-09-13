import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { ColumnDef } from '@libs/components/atomic/table/constants';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import useModal from '@libs/hooks/useModal';
import { FinnetSharedRequestModel } from '@libs/models/finnet';
import { themeColors } from '@libs/theme/index';

import { getMovingAverageAnalysisChartHandler } from 'prac-analysis/actions/finnet-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';
import Info from 'prac-analysis/public/images/svgs/Info.svg';

interface Props {
  serviceParams?: FinnetSharedRequestModel;
}

const MovingAverageDistanceAnalysisTable = ({ serviceParams }: Props) => {
  const { data, isFetching, refetch } = useQuery(
    QUERY_KEYS.MOVING_AVERAGE_ANALYSIS,
    () => getMovingAverageAnalysisChartHandler(serviceParams),
  );

  const { AlertModal, infoAlert } = useModal();

  const showInfoModal = () => {
    infoAlert({
      title       : 'general_technicOverview_popup_movingAverageDistance_subtitle',
      text        : 'general_technicOverview_popup_movingAverageDistance_text',
      hideButtons : true,
    });
  };

  useEffect(() => {
    refetch();
  }, [ refetch, serviceParams ]);

  const columnDef: ColumnDef[] = useMemo(
    () =>
      data?.BaslikListe?.map(
        (header): ColumnDef => ({
          headerName : header?.Baslik,
          field      : header?.PropertyName,
          type       : [
            CustomColumnEnum.SetInsteadOfEmptyValue,
            CustomColumnEnum.ProfitType,
          ],
        }),
      ) || [],
    [ data ],
  );

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <TranslatedText
          label='general_technicOverview_table_movingAverageDistance_title'
          textVariant='body1'
        />
        <span className='cursor-pointer' onClick={showInfoModal}>
          <Info fill={themeColors.basic.six} height='20px' width='20px' />
        </span>
      </div>
      <ColumnTypeTable
        sizeColumnsToFit
        className='w-full'
        columnDefs={columnDef}
        defaultColDef={{ sortable: false }}
        isLoading={isFetching}
        rowData={data?.JSVeriler?.map((row) => row?.s) || []}
      />
      <AlertModal />
    </div>
  );
};

export default MovingAverageDistanceAnalysisTable;
