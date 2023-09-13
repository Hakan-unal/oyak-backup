/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable complexity */
import { ColDef, ColGroupDef } from 'ag-grid-community';

import { PageViewProps } from './pagination';
import { DynamicType } from '@libs/models/model';
import { toLowerCase } from '@libs/utils/string.utils';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export type ColumnDef<TData = DynamicType> = ColDef<TData> | ColGroupDef<TData>;

export const DefaultColumnDefinition: ColDef = {
  sortable     : true,
  resizable    : false,
  unSortIcon   : true,
  sortingOrder : [ 'desc', 'asc', null ],
  lockPosition : 'left',
  getQuickFilterText(params) {
    return toLowerCase(params.value);
  },
};

export const calculateFromCount = (currentPage: number, pageSize: number) =>
  currentPage * pageSize + 1;

export const calculateToCount = (
  totalCount: number,
  currentPage: number,
  pageSize: number,
) => {
  const lastCount = (currentPage + 1) * pageSize;

  return lastCount > totalCount ? totalCount : lastCount;
};

export const getTotalPage = (totalCount: number, pageSize: number) =>
  Number.parseInt((totalCount / pageSize).toString()) +
  (totalCount % pageSize !== 0 ? 1 : 0);

export const DEFAULT_PAGE_SIZE = 10;
export const FIRST_PAGE = 0;
export const MORE_THAN_SYMBOL = '...';

export const getPageButtons = (
  currentPage: number,
  totalPage: number,
): PageViewProps[] => {
  let isFirstPageInclude = true;
  let isLastPageInclude = true;

  const pageView: PageViewProps[] = [
    {
      label : (currentPage + 1)?.toString(),
      value : currentPage,
    },
  ];

  if (currentPage !== FIRST_PAGE) {
    let currentPreviousPage = currentPage;

    isFirstPageInclude = false;
    pageView.splice(0, 0, {
      label : currentPreviousPage?.toString(),
      value : --currentPreviousPage,
    });

    if (currentPreviousPage === FIRST_PAGE) {
      isFirstPageInclude = true;
    } else if (currentPreviousPage > 2) {
      pageView.splice(0, 0, {
        label : MORE_THAN_SYMBOL,
        value : --currentPreviousPage,
      });
    } else if (currentPreviousPage > 1) {
      pageView.splice(0, 0, {
        label : currentPreviousPage?.toString(),
        value : --currentPreviousPage,
      });
    }
  }

  if (currentPage + 1 !== totalPage) {
    let currentNextPage = currentPage;

    isLastPageInclude = false;
    pageView.push({
      label : (currentNextPage + 2).toString(),
      value : ++currentNextPage,
    });

    if (currentNextPage === totalPage - 1) {
      isLastPageInclude = true;
    } else if (currentNextPage < totalPage - 3) {
      pageView.push({
        label : MORE_THAN_SYMBOL,
        value : ++currentNextPage,
      });
    } else if (currentNextPage < totalPage - 2) {
      pageView.push({
        label : (currentNextPage + 2)?.toString(),
        value : ++currentNextPage,
      });
    }
  }

  if (!isFirstPageInclude) {
    pageView.splice(0, 0, {
      label : (FIRST_PAGE + 1).toString(),
      value : FIRST_PAGE,
    });
  }

  if (!isLastPageInclude) {
    pageView.push({
      label : totalPage?.toString(),
      value : totalPage - 1,
    });
  }

  return pageView;
};

export const TABLE_ROW_HEIGHT = 40;
