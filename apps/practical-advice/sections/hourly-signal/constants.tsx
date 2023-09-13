import {
  ColumnDef,
  SortDirection,
} from '@libs/components/atomic/table/constants';
import { TabLabelItemProps } from '@libs/components/molecules/tab/tab-label';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { t } from '@libs/locales/i18n';
import { toLowerCase } from '@libs/utils/string.utils';

import paths from 'prac-advice/routes/internal-paths';

export const HourlySignalColumnDefs: ColumnDef[] = [
  {
    headerName   : 'hourlySigns_hourlySignsTable_table_symbol_title',
    field        : 'symbol',
    pinned       : 'left',
    minWidth     : 175,
    type         : [ CustomColumnEnum.LinkType ],
    cellRenderer : (cell) => (
      <div className='flex justify-between items-center'>
        <label className='cursor-pointer'>{cell.value}</label>
        {cell?.data?.hasViopContract && (
          <TranslatedText
            className='bg-basic-three font-normal rounded px-1 py-0.5 text-xxs cursor-pointer'
            label='general_general_viop_label'
          />
        )}
      </div>
    ),
    getQuickFilterText: (cell) =>
      toLowerCase(
        `${cell.value} ${
          cell?.data?.hasViopContract ? t('general_general_viop_label') : ''
        }`,
      ),
  },
  {
    headerName : 'hourlySigns_hourlySignsTable_table_decision_title',
    field      : 'decision',
    type       : [ CustomColumnEnum.DecisionType ],
  },
  {
    headerName : 'hourlySigns_hourlySignsTable_table_profitLoss_title',
    field      : 'profit',
    minWidth   : 125,
    type       : [ CustomColumnEnum.ProfitType, CustomColumnEnum.NoFilter ],
  },
  {
    headerName  : 'hourlySigns_hourlySignsTable_table_decisionDate_title',
    field       : 'decisionDate',
    minWidth    : 125,
    type        : [ CustomColumnEnum.DateTimeType ],
    initialSort : SortDirection.DESC,
  },
  {
    headerName : 'hourlySigns_hourlySignsTable_table_decisionPrice_title',
    field      : 'signalPrice',
    type       : [ CustomColumnEnum.MoneyType, CustomColumnEnum.NoFilter ],
  },
  {
    headerName : 'hourlySigns_hourlySignsTable_table_lastPrice_title',
    field      : 'priceNow',
    type       : [ CustomColumnEnum.MoneyType, CustomColumnEnum.NoFilter ],
  },
];

export const TabLabels: TabLabelItemProps[] = [
  {
    label : 'hourlySigns_hourlySignsTable_tab_hourlySigns_button',
    path  : paths.HOURLY_SIGNAL,
  },
  {
    label : 'hourlySigns_hourlySignsTable_tab_strategyPerformTable_button',
    path  : paths.HOURLY_STRATEGY_PERFORMANCE_CHART,
  },
];

export const HourlySignalStrategyPerformanceColumnDefs: ColumnDef[] = [
  {
    headerName : 'hourlySigns_strategyPerformTable_table_symbol_title',
    field      : 'symbol',
    pinned     : 'left',
    minWidth   : 125,
  },
  {
    headerName:
      'hourlySigns_strategyPerformTable_table_historicalPerformans_title',
    field    : 'decision',
    minWidth : 150,
    type     : [ CustomColumnEnum.DecisionType ],
  },
  {
    headerName : 'hourlySigns_strategyPerformTable_table_return_title',
    field      : 'totalIncome',
    type       : [ CustomColumnEnum.MoneyType, CustomColumnEnum.NoFilter ],
  },
  {
    headerName : 'hourlySigns_strategyPerformTable_table_positionsCount_title',
    field      : 'positionCount',
    type       : [ CustomColumnEnum.NoFilter ],
  },
  {
    headerName : 'hourlySigns_strategyPerformTable_table_avarageReturn_title',
    field      : 'averageIncome',
    type       : [ CustomColumnEnum.MoneyType, CustomColumnEnum.NoFilter ],
  },
  {
    headerName : 'hourlySigns_strategyPerformTable_table_deviationReturn_title',
    field      : 'deflectionIncome',
    type       : [ CustomColumnEnum.MoneyType, CustomColumnEnum.NoFilter ],
  },
  {
    headerName : 'hourlySigns_strategyPerformTable_table_score_title',
    field      : 'score',
    maxWidth   : 125,
    type       : [
      CustomColumnEnum.ProfitType,
      CustomColumnEnum.MoneyType,
      CustomColumnEnum.NoFilter,
    ],
  },
];
