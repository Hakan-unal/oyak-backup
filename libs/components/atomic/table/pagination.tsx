import 'ag-grid-community/styles/ag-grid.css';

import { AgGridReact } from 'ag-grid-react';
import { RefObject, useEffect, useState } from 'react';

import {
  calculateFromCount,
  calculateToCount,
  FIRST_PAGE,
  getPageButtons,
  getTotalPage,
} from './constants';
import LeftCaret from '@libs/assets/images/svgs/caret-left.svg';
import RightCaret from '@libs/assets/images/svgs/caret-right.svg';
import { themeColors } from '@libs/theme/index';

export interface PageViewProps {
  label: string;
  value: number;
}

export interface TablePaginationReturnProps {
  pageSize: number;
  currentPage: number;
  totalCount: number;
  fromCount: number;
  toCount: number;
}

interface TablePaginationProps {
  gridRef: RefObject<AgGridReact>;
  totalCount: number;
  pageSize: number;
  currentPage: number;
  isVisible?: boolean;
  onChange?: (info: TablePaginationReturnProps) => void;
}

const TablePagination = ({
  gridRef,
  totalCount,
  pageSize,
  currentPage: pagePoint,
  isVisible,
  onChange,
}: TablePaginationProps) => {
  const [ currentPage, setCurrentPage ] = useState<number>(pagePoint);
  const [ pageViews, setPageViews ] = useState<PageViewProps[]>();

  const [ paginationInfo, setPaginationInfo ] =
    useState<TablePaginationReturnProps>({
      pageSize,
      currentPage : pagePoint,
      totalCount,
      fromCount   : calculateFromCount(pagePoint, pageSize),
      toCount     : calculateToCount(totalCount, pagePoint, pageSize),
    });

  const totalPage = getTotalPage(totalCount, pageSize);
  const defaultButtonClass = 'w-6 h-6 text-sm';

  useEffect(() => {
    setCurrentPage(FIRST_PAGE);
  }, [ totalCount, pageSize ]);

  useEffect(() => {
    setPaginationInfo((prev) => ({
      ...prev,
      totalCount,
      currentPage,
      fromCount : calculateFromCount(currentPage, pageSize),
      toCount   : calculateToCount(totalCount + 1, currentPage, pageSize),
    }));
  }, [ currentPage, pageSize, totalCount ]);

  useEffect(() => {
    onChange?.(paginationInfo);
    setPageViews(getPageButtons(paginationInfo.currentPage, totalPage));

    if (gridRef.current?.api) {
      gridRef.current?.api.paginationGoToPage(paginationInfo.currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ gridRef, onChange, paginationInfo ]);

  const buttonClassDefinition = (page: number) =>
    page === paginationInfo.currentPage
      ? `${defaultButtonClass} rounded-full bg-primary-dark text-white font-bold`
      : defaultButtonClass;

  if (!isVisible) {
    return null;
  }

  return (
    <div className='flex flex-row gap-2'>
      {paginationInfo.currentPage !== FIRST_PAGE && (
        <button
          className={`${defaultButtonClass} flex justify-center items-center`}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <LeftCaret fill={themeColors.basic?.six} />
        </button>
      )}
      {pageViews?.map((pageView) => (
        <button
          className={buttonClassDefinition(pageView.value)}
          key={`${pageView.value}_${pageView.label}`}
          onClick={() => setCurrentPage(pageView.value)}
        >
          {pageView.label}
        </button>
      ))}
      {paginationInfo.currentPage < totalPage - 1 && (
        <button
          className={`${defaultButtonClass} flex justify-center items-center`}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <RightCaret fill={themeColors.basic?.six} height='10px' width='6px' />
        </button>
      )}
    </div>
  );
};

export default TablePagination;
