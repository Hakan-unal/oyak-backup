import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { ColumnDef } from '@libs/components/atomic/table/constants';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';
import { FinnetSharedRequestModel } from '@libs/models/finnet';

import { SHOW_FIVE_COLUMNS } from '../basic-overview/constants';
import { getShareSummaryTableHandler } from 'prac-analysis/actions/finnet-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface Props {
  serviceParams?: FinnetSharedRequestModel;
}

const ShareSummaryTable = ({ serviceParams }: Props) => {
  const { data, isFetching, refetch } = useQuery(QUERY_KEYS.SHARE_SUMMARY, () =>
    getShareSummaryTableHandler(serviceParams),
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
        type       : [ CustomColumnEnum.Bold ],
      },
    ];

    return headers.concat(
      data?.BaslikListe?.map(
        (header): ColumnDef => ({
          headerName : header?.Baslik,
          field      : header?.PropertyName,
          type       : [
            CustomColumnEnum.MoneyType,
            CustomColumnEnum.SetInsteadOfEmptyValue,
          ],
        }),
      )
        ?.reverse()
        ?.slice(0, SHOW_FIVE_COLUMNS) || [],
    );
  }, [ data ]);

  return (
    <ColumnTypeTable
      sizeColumnsToFit
      className='w-full'
      columnDefs={columnDef}
      defaultColDef={{ sortable: false }}
      isLoading={isFetching}
      rowData={data?.JSVeriler?.map((row) => row?.s) || []}
    />
  );
};

export default ShareSummaryTable;
