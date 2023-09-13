import 'ag-grid-community/styles/ag-grid.css';

import { AgGridReact, AgGridReactProps, AgReactUiProps } from 'ag-grid-react';
import { RefObject, useCallback, useEffect, useRef } from 'react';

import Loading from '../../molecules/loading/loading';

import { DefaultColumnDefinition } from './constants';
import { DynamicType } from '@libs/models/model';

export interface TableProps<TData = DynamicType>
  extends AgGridReactProps<TData>,
    AgReactUiProps<TData> {
  gridRef?: RefObject<AgGridReact>;
  autoSize?: boolean;
  sizeColumnsToFit?: boolean;
  isLoading?: boolean;
  className: string;
  containerClassName?: string;
  notFoundMessage?: string;
}

const Table = ({
  gridRef,
  autoSize,
  sizeColumnsToFit,
  isLoading,
  className,
  containerClassName = 'flex justify-center',
  notFoundMessage,
  defaultColDef,
  ...rest
}: TableProps) => {
  const defaultRef = useRef<AgGridReact>(null);
  const ref = gridRef ?? defaultRef;

  const resizeColumnHandler = useCallback(() => {
    if (autoSize) {
      ref?.current?.columnApi?.autoSizeAllColumns();
    } else if (sizeColumnsToFit) {
      ref?.current?.api?.sizeColumnsToFit({
        defaultMinWidth: 100,
      });
    }
  }, [ autoSize, ref, sizeColumnsToFit ]);

  useEffect(() => {
    addEventListener('resize', resizeColumnHandler);
  }, [ resizeColumnHandler ]);

  const noRowsTemplate = () => (
    <div className='flex flex-col items-center justify-center p-4 sm:p-0 mt-[24px]'>
      <label className='text-sm text-basic-six'>{notFoundMessage}</label>
    </div>
  );

  return (
    <div className={containerClassName}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={`ag-theme-material ${className}`}>
          <AgGridReact
            cacheQuickFilter
            defaultColDef={{ ...DefaultColumnDefinition, ...defaultColDef }}
            noRowsOverlayComponent={noRowsTemplate}
            onFirstDataRendered={(event) => {
              resizeColumnHandler();

              rest?.onFirstDataRendered?.(event);
            }}
            ref={ref}
            {...rest}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
