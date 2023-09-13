import { CellClickedEvent } from 'ag-grid-community';
import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { ColumnDef } from '@libs/components/atomic/table/constants';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';
import useModal from '@libs/hooks/useModal';
import { FinnetSharedRequestModel } from '@libs/models/finnet';

import { SHOW_FIVE_COLUMNS } from '../basic-overview/constants';
import { getDividendInformationTableHandler } from 'prac-analysis/actions/finnet-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface Props {
  serviceParams?: FinnetSharedRequestModel;
}

const DividendInformationTable = ({ serviceParams }: Props) => {
  const { AlertModal, infoAlert } = useModal();

  const { data, isFetching, refetch } = useQuery(
    QUERY_KEYS.DIVIDEND_INFORMATION,
    () => getDividendInformationTableHandler(serviceParams),
  );

  useEffect(() => {
    refetch();
  }, [ refetch, serviceParams ]);

  const columnDef: ColumnDef[] = useMemo(() => {
    const headers: ColumnDef[] = [
      {
        headerName : data?.Baslik,
        field      : 'Baslik',
        pinned     : 'left',
        minWidth   : 240,
        type       : [ CustomColumnEnum.Bold, CustomColumnEnum.InfoType ],
      },
    ];

    return headers.concat(
      data?.BaslikListe?.map(
        (header): ColumnDef => ({
          headerName : header?.Baslik,
          field      : header?.PropertyName,
          type       : [ CustomColumnEnum.SetInsteadOfEmptyValue ],
        }),
      )
        ?.reverse()
        ?.slice(0, SHOW_FIVE_COLUMNS) || [],
    );
  }, [ data ]);

  const handleCellClicked = (event: CellClickedEvent) => {
    if (!event.column.getColDef().type?.includes(CustomColumnEnum.InfoType)) {
      return;
    }

    infoAlert({
      title       : 'general_basicDatas_popup_dividendEfficiency_subtitle',
      text        : 'general_basicDatas_popup_dividendEfficiency_text',
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
        onCellClicked={handleCellClicked}
        rowData={data?.JSVeriler?.map((row) => row?.s) || []}
      />
      <AlertModal />
    </>
  );
};

export default DividendInformationTable;
