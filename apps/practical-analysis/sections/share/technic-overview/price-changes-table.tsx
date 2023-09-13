import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { ColumnDef } from '@libs/components/atomic/table/constants';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { FinnetSharedRequestModel } from '@libs/models/finnet';

import { getPriceChangesChartHandler } from 'prac-analysis/actions/finnet-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface Props {
  serviceParams?: FinnetSharedRequestModel;
}

const PriceChangesTable = ({ serviceParams }: Props) => {
  const { data, isFetching, refetch } = useQuery(QUERY_KEYS.PRICE_CHANGES, () =>
    getPriceChangesChartHandler(serviceParams),
  );

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
      <TranslatedText
        label='general_technicOverview_table_priceChange_title'
        textVariant='body1'
      />
      <ColumnTypeTable
        sizeColumnsToFit
        className='w-full'
        columnDefs={columnDef}
        defaultColDef={{ sortable: false }}
        isLoading={isFetching}
        rowData={data?.JSVeriler?.map((row) => row?.s) || []}
      />
    </div>
  );
};

export default PriceChangesTable;
