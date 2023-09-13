import { CellClickedEvent } from 'ag-grid-community';
import { useRouter } from 'next/router';

import { ModelPortfolioAnalyzeModel } from '@libs/api/oyak/api';
import ColumnTypeTable from '@libs/components/molecules/table/column-type-table';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';

import { ModelPortfolioColumnDefs } from './constants';
import paths from 'prac-analysis/routes/internal-paths';

interface Props {
  data?: ModelPortfolioAnalyzeModel[];
  isLoading?: boolean;
}

const ModelPortfolioTable = ({ data, isLoading }: Props) => {
  const { push } = useRouter();

  const handleCellClicked = (event: CellClickedEvent) => {
    if (!event.column.getColDef().type?.includes(CustomColumnEnum.LinkType)) {
      return;
    }

    push({
      pathname : paths.RESEARCHED_SHARE,
      query    : { symbol: event.value },
    });
  };

  return (
    <ColumnTypeTable
      sizeColumnsToFit
      className='w-full'
      columnDefs={ModelPortfolioColumnDefs}
      defaultColDef={{ sortable: false }}
      isLoading={isLoading}
      onCellClicked={handleCellClicked}
      rowData={data || []}
    />
  );
};

export default ModelPortfolioTable;
