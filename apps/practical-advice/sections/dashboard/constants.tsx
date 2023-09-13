import { ColumnDef } from '@libs/components/atomic/table/constants';
import { CustomColumnEnum } from '@libs/components/molecules/table/constants';

const SHOW_VIDEO_COUNT = 4;

export const TAKE_SIGNAL_COUNT = 5;

export const VideoLists = [ ...Array(SHOW_VIDEO_COUNT).keys() ].map((i) => ({
  title       : `dashboard_videoCard_card_video${i + 1}_subtitle`,
  description : `dashboard_videoCard_card_videoExplanation${i + 1}_text`,
  link        : `dashboard_videoCard_card_videoLink${i + 1}_text`,
  duration    : `dashboard_videoCard_card_videoTime${i + 1}_text`,
}));

export const HourlySignalColumnDefs: ColumnDef[] = [
  {
    headerName : 'dashboard_hourlySignsTable_table_symbol_title',
    field      : 'symbol',
    pinned     : 'left',
    type       : [ CustomColumnEnum.LinkType ],
  },
  {
    headerName : 'dashboard_hourlySignsTable_table_decision_title',
    field      : 'decision',
    type       : [ CustomColumnEnum.DecisionType ],
  },
  {
    headerName : 'dashboard_hourlySignsTable_table_profitLoss_title',
    field      : 'profit',
    type       : [ CustomColumnEnum.ProfitType ],
  },
];
