import 'ag-grid-community/styles/ag-grid.css';

import { useEffect, useState } from 'react';

import { SortDirection } from './constants';
import CaretDown from '@libs/assets/images/svgs/caret-down.svg';
import UnSorted from '@libs/assets/images/svgs/un-sorted.svg';
import { themeColors } from '@libs/theme/index';

const TableHeader = ({ headerName, ...params }) => {
  const sortApi = params?.column?.sort;
  const [ sort, setSort ] = useState('');

  useEffect(() => {
    setSort(sortApi || '');
  }, [ sortApi ]);

  const onClick = () => {
    if (!params.enableSorting) {
      return;
    }

    checkSingleColumnSorting();

    if (sort === '') {
      params?.setSort(SortDirection.DESC);
    } else if (sort === SortDirection.DESC) {
      params?.setSort(SortDirection.ASC);
    } else {
      params?.setSort('');
    }
  };

  const checkSingleColumnSorting = () => {
    const sortedColumns = params?.api?.columnModel?.displayedColumns?.filter(
      (column) => column.sort && column.sort !== '',
    );

    sortedColumns.forEach((sortedColumn) => {
      sortedColumn?.setSort('');
    });
  };

  return (
    <button className='flex items-center w-full h-full' onClick={onClick}>
      <div className='flex flex-row justify-between items-center w-full'>
        <label
          className={`w-4/5 flex justify-start ${params?.column?.colDef?.headerClass} text-start whitespace-pre-wrap cursor-pointer`}
        >
          {headerName ||
            params.column?.colDef?.headerName ||
            params.column?.colDef?.field}
        </label>
        {params.enableSorting &&
          (sort !== '' ? (
            <div
              className={`${
                sort === SortDirection.ASC ? 'rotate-180' : 'rotate-0'
              } flex justify-center items-center h-[5px] w-[10px]`}
            >
              <CaretDown
                fill={themeColors.basic.four}
                height='12px'
                width='10px'
              />
            </div>
          ) : (
            <div
              className={`flex justify-center items-center h-[5px] w-[10px]`}
            >
              <UnSorted />
            </div>
          ))}
      </div>
    </button>
  );
};

export default TableHeader;
