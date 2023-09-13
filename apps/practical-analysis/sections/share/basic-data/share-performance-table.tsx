import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { ColumnDef } from '@libs/components/atomic/table/constants';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';
import { FinnetSharedRequestModel } from '@libs/models/finnet';

import { getSharePerformanceChartHandler } from 'prac-analysis/actions/finnet-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface Props {
  serviceParams?: FinnetSharedRequestModel;
}

const SharePerformanceTable = ({ serviceParams }: Props) => {
  const { data, isFetching, refetch } = useQuery(
    QUERY_KEYS.SHARE_PERFORMANCE,
    () => getSharePerformanceChartHandler(serviceParams),
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
          type       : [ CustomColumnEnum.SetInsteadOfEmptyValue ],
        }),
      ) || [],
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

export default SharePerformanceTable;
