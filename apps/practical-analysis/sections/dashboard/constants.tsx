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

export const ModelPortfolioColumnDefs: ColumnDef[] = [
  {
    headerName : 'dashboard_modelPortfoy_table_symbol_text',
    field      : 'symbol',
    type       : [ CustomColumnEnum.LinkType ],
  },
  {
    headerName : 'dashboard_modelPortfoy_table_lastPrice_text',
    field      : 'lastPrice',
    type       : [ CustomColumnEnum.NoFilter ],
  },
  {
    headerName : 'dashboard_modelPortfoy_table_goalPrice_text',
    field      : 'targetPrice',
    type       : [ CustomColumnEnum.NoFilter ],
  },
  {
    headerName : 'dashboard_modelPortfoy_table_fk_text',
    field      : 'fk',
    type       : [ CustomColumnEnum.NoFilter ],
  },
  {
    headerName : 'dashboard_modelPortfoy_table_fdd_text',
    field      : 'fdd',
    type       : [ CustomColumnEnum.NoFilter ],
  },
];
