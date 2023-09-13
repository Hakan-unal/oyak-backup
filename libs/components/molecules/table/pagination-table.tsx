import { AgGridReact } from 'ag-grid-react';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CustomColumnTypesDefinition,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from './constants';
import CustomTableHeader from './custom-table-header';
import Loading from '../loading/loading';
import TranslatedText from '../text/translated-text';
import NotFoundIcon from '@libs/assets/images/svgs/not-found.svg';
import SearchInput from '@libs/components/atomic/input/search-input';
import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
} from '@libs/components/atomic/table/constants';
import TablePagination, {
  TablePaginationReturnProps,
} from '@libs/components/atomic/table/pagination';
import Table, { TableProps } from '@libs/components/atomic/table/table';
import Dropdown, {
  DropdownItemProps,
} from '@libs/components/molecules/dropdown/dropdown';
import { toLowerCase } from '@libs/utils/string.utils';

interface PaginationTableProps extends TableProps {
  currentPage?: number;
  paginationSizeOptions?: DropdownItemProps[];
  onSearchChange?: (value: string) => void;
}

const PaginationTable = ({
  gridRef,
  className,
  currentPage = FIRST_PAGE,
  paginationSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  paginationPageSize = DEFAULT_PAGE_SIZE,
  rowData,
  onSearchChange,
  ...props
}: PaginationTableProps) => {
  const { t } = useTranslation();
  const [ filterText, setFilterText ] = useState<string | undefined>();
  const [ totalCount, setTotalCount ] = useState<number | undefined>();

  const [ currentPageSize, setCurrentPageSize ] =
    useState<number>(paginationPageSize);

  const defaultRef = useRef<AgGridReact>(null);
  const ref = gridRef ?? defaultRef;

  const [ paginationInfo, setPaginationInfo ] = useState<
    TablePaginationReturnProps | undefined
  >();

  useEffect(() => {
    if (!filterText) {
      setTotalCount(rowData?.length);
    }
  }, [ filterText, rowData ]);

  const showPagination: boolean | undefined = useMemo(
    () => (totalCount ? totalCount > currentPageSize : false),
    [ totalCount, currentPageSize ],
  );

  const noRowsTemplate = () => (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-4 sm:p-0`}
    >
      <NotFoundIcon height='150px' width='150px' />
      <TranslatedText
        className='text-sm'
        label='general_general_dontMatchSearch_text'
        textColor='text-basic-six'
      />
    </div>
  );

  const loadingTemplate = () => <Loading />;

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const text = toLowerCase(event.target.value);

    if (onSearchChange) {
      return onSearchChange?.(text);
    }

    setFilterText(text);
  };

  const onFilterChanged = () => {
    if (!filterText) {
      ref?.current?.api?.hideOverlay();

      return setTotalCount(rowData?.length);
    }

    const filteredCount = ref?.current?.api?.getDisplayedRowCount();

    if (filteredCount === 0) {
      ref?.current?.api?.showNoRowsOverlay();
    } else {
      ref?.current?.api?.hideOverlay();
    }

    setTotalCount(filteredCount);
  };

  const handlePageSizeOptionsChanged = (item: DropdownItemProps) => {
    setCurrentPageSize(item.value as number);
  };

  return (
    <div className='flex flex-col justify-center w-full bg-white'>
      <div className='flex flex-row justify-between mb-8 gap-6'>
        <SearchInput
          name='search'
          onChange={handleSearch}
          placeholder={t('general_general_search_placeholder')!}
        />
        <Dropdown
          defaultValue={paginationPageSize}
          onChange={handlePageSizeOptionsChanged}
          options={paginationSizeOptions}
        />
      </div>
      <div className='flex flex-col w-full gap-4'>
        <Table
          pagination
          suppressPaginationPanel
          className={className}
          columnTypes={CustomColumnTypesDefinition}
          components={{
            agColumnHeader: CustomTableHeader,
            ...props.components,
          }}
          domLayout={totalCount && totalCount > 0 ? 'autoHeight' : 'normal'}
          gridRef={ref}
          loadingOverlayComponent={loadingTemplate}
          noRowsOverlayComponent={noRowsTemplate}
          notFoundMessage={t('general_general_notFound_text')!}
          onFilterChanged={onFilterChanged}
          paginationPageSize={currentPageSize}
          quickFilterText={filterText}
          rowData={rowData}
          {...props}
        />
        {showPagination && paginationInfo && (
          <TranslatedText
            className='text-xs text-basic-five'
            label='general_general_showDatasInRange_text'
            values={{
              totalCount : paginationInfo.totalCount,
              fromCount  : paginationInfo.fromCount,
              toCount:
                paginationInfo.toCount > paginationInfo.totalCount
                  ? paginationInfo.totalCount
                  : paginationInfo.toCount,
            }}
          />
        )}
      </div>

      <div className='flex justify-center sm:justify-end mt-6 mb-4'>
        <TablePagination
          currentPage={currentPage}
          gridRef={ref}
          isVisible={showPagination}
          onChange={setPaginationInfo}
          pageSize={currentPageSize}
          totalCount={totalCount as number}
        />
      </div>
    </div>
  );
};

export default PaginationTable;
