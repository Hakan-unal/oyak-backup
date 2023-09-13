import { ColumnDef } from '@libs/components/atomic/table/constants';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';
import { toTitleCase } from '@libs/utils/string.utils';

export const AssetDecisionPointColumnDefs: ColumnDef[] = [
  {
    headerName : 'hourlySigns_assetDecisionPoint_table_decision_title',
    field      : 'decision',
    type       : [ CustomColumnEnum.DecisionType ],
  },
  {
    headerName : 'hourlySigns_assetDecisionPoint_table_profitLoss_title',
    field      : 'profit',
    type       : [ CustomColumnEnum.ProfitType, CustomColumnEnum.NoFilter ],
  },
  {
    headerName : 'hourlySigns_hourlySignsTable_table_decisionDate_title',
    field      : 'decisionDate',
    minWidth   : 125,
    type       : [ CustomColumnEnum.DateTimeType ],
  },
  {
    headerName : 'hourlySigns_hourlySignsTable_table_decisionPrice_title',
    field      : 'signalPrice',
    type       : [ CustomColumnEnum.MoneyType, CustomColumnEnum.NoFilter ],
  },
];

export const StrategyPerformanceColumnDefs: ColumnDef[] = [
  {
    headerName   : 'hourlySigns_strategyAnalysis_table_situation_title',
    field        : 'decision',
    cellClass    : 'font-bold',
    cellRenderer : (cell) => <label>{toTitleCase(cell.value)}</label>,
  },
  {
    headerName : 'hourlySigns_strategyAnalysis_table_totalReturn_title',
    field      : 'totalIncome',
  },
  {
    headerName : 'hourlySigns_strategyAnalysis_table_positionsCount_title',
    field      : 'positionCount',
  },
  {
    headerName : 'hourlySigns_strategyAnalysis_table_averageReturn_title',
    field      : 'averageIncome',
  },
  {
    headerName : 'hourlySigns_strategyAnalysis_table_deviationReturn_title',
    field      : 'deflectionIncome',
  },
];
export const HourlySignalMomentumBuyAnalysisColumnDefs: ColumnDef[] = [
  {
    headerName  : 'hourlySigns_momentumAnalysis_table_buysideMomentumAreas_title',
    field       : 'label',
    headerClass : 'text-green-dark',
    cellClass   : 'font-bold',
  },
  {
    headerName : 'hourlySigns_momentumAnalysis_table_max_title',
    field      : 'max',
    maxWidth   : 80,
  },
  {
    headerName : 'hourlySigns_momentumAnalysis_table_min_title',
    field      : 'min',
    maxWidth   : 80,
  },
];
export const HourlySignalMomentumSellAnalysisColumnDefs: ColumnDef[] = [
  {
    headerName:
      'hourlySigns_momentumAnalysis_table_sellsideMomentumAreas_title',
    field       : 'label',
    headerClass : 'text-primary-dark',
    cellClass   : 'font-bold',
  },
  {
    headerName : 'hourlySigns_momentumAnalysis_table_max_title',
    field      : 'max',
    maxWidth   : 80,
  },
  {
    headerName : 'hourlySigns_momentumAnalysis_table_min_title',
    field      : 'min',
    maxWidth   : 80,
  },
];
