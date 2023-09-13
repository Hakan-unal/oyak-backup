import { t } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';

import { ColumnDef } from '@libs/components/atomic/table/constants';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import {
  CustomColumnEnum,
  infoColumnCell,
} from '@libs/components/molecules/table/constants';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import useModal from '@libs/hooks/useModal';
import { FinnetSharedRequestModel } from '@libs/models/finnet';

import {
  SHOW_LAST_FOUR_YEAR_AND_CURRENT_HEADER_COUNT,
  ValuationFactorsCellDescriptions,
} from './constants';
import { getValuationFactorTableHandler } from 'prac-analysis/actions/finnet-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface Props {
  serviceParams?: FinnetSharedRequestModel;
}

const ValuationFactorTable = ({ serviceParams }: Props) => {
  const { data, isFetching, refetch } = useQuery(
    QUERY_KEYS.VALUATION_FACTOR,
    () => getValuationFactorTableHandler(serviceParams),
  );

  const { AlertModal, infoAlert } = useModal();

  const showInfoModal = (cell) => {
    infoAlert({
      title       : cell.value && ValuationFactorsCellDescriptions[cell.value].header,
      text        : cell.value && ValuationFactorsCellDescriptions[cell.value].text,
      hideButtons : true,
    });
  };

  useEffect(() => {
    refetch();
  }, [ refetch, serviceParams ]);

  const columnDef: ColumnDef[] = useMemo(() => {
    const headers: ColumnDef[] = [
      {
        headerName   : 'general_basicDatas_table_assetSummary_title',
        field        : 'Baslik',
        pinned       : 'left',
        minWidth     : 130,
        type         : [ CustomColumnEnum.Bold ],
        cellRenderer : (cell) =>
          cell.value !== t('general_basicOverview_table_pddd_text')
            ? infoColumnCell(cell, undefined, showInfoModal)
            : cell.value,
      },
    ];

    return headers.concat(
      data?.BaslikListe?.slice(SHOW_LAST_FOUR_YEAR_AND_CURRENT_HEADER_COUNT)
        ?.map(
          (header): ColumnDef => ({
            headerName : header?.Baslik,
            field      : header?.PropertyName,
            type       : [
              CustomColumnEnum.MoneyType,
              CustomColumnEnum.SetInsteadOfEmptyValue,
            ],
          }),
        )
        ?.reverse() || [],
    );
  }, [ data ]);

  return (
    <>
      <TranslatedText
        className='mb-4 sm:mb-6'
        label='general_basicOverview_table_valuationMultipliers_title'
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
      <AlertModal />
    </>
  );
};

export default ValuationFactorTable;
