import { useTranslation } from 'react-i18next';

import { CustomColumnTypesDefinition } from './constants';
import CustomTableHeader from './custom-table-header';
import Loading from '../loading/loading';
import Table, { TableProps } from '@libs/components/atomic/table/table';

const ColumnTypeTable = ({ rowData, ...rest }: TableProps) => {
  const { t } = useTranslation();
  const loadingTemplate = () => <Loading />;

  return (
    <Table
      columnTypes={CustomColumnTypesDefinition}
      components={{
        agColumnHeader: CustomTableHeader,
        ...rest.components,
      }}
      domLayout={rowData && rowData.length > 0 ? 'autoHeight' : 'normal'}
      loadingOverlayComponent={loadingTemplate}
      notFoundMessage={t('general_general_notFound_text')!}
      rowData={rowData}
      {...rest}
    />
  );
};

export default ColumnTypeTable;
