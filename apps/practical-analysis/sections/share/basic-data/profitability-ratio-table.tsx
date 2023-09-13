import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { ColumnDef } from '@libs/components/atomic/table/constants';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import {
  CustomColumnEnum,
  infoColumnCell,
} from '@libs/components/molecules/table/constants';
import useModal from '@libs/hooks/useModal';
import { FinnetSharedRequestModel } from '@libs/models/finnet';

import { SHOW_FIVE_COLUMNS } from '../basic-overview/constants';
import { getProfitabilityRatioTableHandler } from 'prac-analysis/actions/finnet-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface Props {
  serviceParams?: FinnetSharedRequestModel;
}

const ProfitabilityRatioTable = ({ serviceParams }: Props) => {
  const { AlertModal, infoAlert } = useModal();

  const { data, isFetching, refetch } = useQuery(
    QUERY_KEYS.PROFITABILITY_RATIO,
    () => getProfitabilityRatioTableHandler(serviceParams),
  );

  useEffect(() => {
    refetch();
  }, [ refetch, serviceParams ]);

  const columnDef: ColumnDef[] = useMemo(() => {
    const headers: ColumnDef[] = [
      {
        headerName   : 'general_basicDatas_table_profitabilityRatios_text',
        field        : 'Baslik',
        pinned       : 'left',
        minWidth     : 240,
        type         : [ CustomColumnEnum.Bold ],
        cellRenderer : (cell) =>
          infoColumnCell(
            cell,
            'general_basicDatas_table_equityProfit_text',
            showInfoModal,
          ),
      },
    ];

    return headers.concat(
      data?.BaslikListe?.map(
        (header): ColumnDef => ({
          headerName : header?.Baslik,
          field      : header?.PropertyName,
          type       : [ CustomColumnEnum.SetInsteadOfEmptyValue ],
        }),
      )?.slice(0, SHOW_FIVE_COLUMNS) || [],
    );
  }, [ data ]);

  const showInfoModal = () => {
    infoAlert({
      title       : 'general_basicDatas_popup_equityProfit_subtitle',
      text        : 'general_basicDatas_popup_equityProfit_text',
      hideButtons : true,
    });
  };

  return (
    <>
      <ColumnTypeTable
        sizeColumnsToFit
        className='w-full'
        columnDefs={columnDef}
        defaultColDef={{ sortable: false }}
        isLoading={isFetching}
        rowData={data?.JSVeriler || []}
      />
      <AlertModal />
    </>
  );
};

export default ProfitabilityRatioTable;
