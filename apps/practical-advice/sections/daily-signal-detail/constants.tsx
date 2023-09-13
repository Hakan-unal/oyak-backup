import {
  ColumnDef,
  SortDirection,
} from '@libs/components/atomic/table/constants';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { t } from '@libs/locales/i18n';
import { toLowerCase } from '@libs/utils/string.utils';

export const DailySignalColumnDefs = (
  isSymbolClickable = true,
): ColumnDef[] => [
  {
    headerName   : 'dailyScanningSigns_dailySignsTable_table_symbol_title',
    field        : 'symbol',
    pinned       : 'left',
    minWidth     : 175,
    cellRenderer : (cell) => {
      const clickableClassName = isSymbolClickable ? 'cursor-pointer' : '';

      return (
        <div className='flex justify-between items-center'>
          <label className={clickableClassName}>{cell.value}</label>
          {cell?.data?.hasViopContract && (
            <TranslatedText
              className={`bg-basic-three font-normal rounded px-1 py-0.5 text-xxs ${clickableClassName}`}
              label='general_general_viop_label'
            />
          )}
        </div>
      );
    },

    type               : isSymbolClickable ? [ CustomColumnEnum.LinkType ] : [],
    getQuickFilterText : (cell) =>
      toLowerCase(
        `${cell.value} ${
          cell?.data?.hasViopContract ? t('general_general_viop_label') : ''
        }`,
      ),
  },
  {
    headerName      : 'dailyScanningSigns_dailySignsTable_table_status_title',
    field           : 'breakdownIndicator',
    type            : [ CustomColumnEnum.ArrowType ],
    suppressMovable : false,
  },
  {
    headerName  : 'dailyScanningSigns_dailySignsTable_table_deflectionDate_title',
    field       : 'breakdownDate',
    type        : [ CustomColumnEnum.DateType ],
    initialSort : SortDirection.DESC,
  },
  {
    headerName:
      'dailyScanningSigns_dailySignsTable_table_historicalDeflectionCount_title',
    field    : 'historicalBreakdownCount',
    type     : [ CustomColumnEnum.NoFilter ],
    minWidth : 200,
  },
  {
    headerName:
      'dailyScanningSigns_dailySignsTable_table_historicalChanging_title',
    field    : 'historicalBreakdownReturn',
    type     : [ CustomColumnEnum.NoFilter, CustomColumnEnum.ProfitType ],
    minWidth : 200,
  },
];
