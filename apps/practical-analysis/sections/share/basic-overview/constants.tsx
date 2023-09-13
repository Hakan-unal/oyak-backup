import { InfoCellProps } from '@libs/models/model';
import { themeColors } from '@libs/theme/index';

export const SENTENCES_PREFIX = 'Cumle';
export const SHOW_LAST_FOUR_YEAR_AND_CURRENT_HEADER_COUNT = -5;
export const SHOW_FIVE_COLUMNS = 5;

export interface SpecialCommentKeywordProps {
  buttonName: string;
  title: string;
  text: string;
}

export const SPECIAL_COMMENT_KEYWORDS: SpecialCommentKeywordProps[] = [
  {
    buttonName : 'general_basicOverview_button2_button',
    title      : 'general_basicDatas_popup_favokİnfo_subtitle',
    text       : 'general_basicOverview_popup_info1_text',
  },
  {
    buttonName : 'general_basicOverview_button3_button',
    title      : 'general_basicOverview_popup_info2_subtitle',
    text       : 'general_basicOverview_popup_info2_text',
  },
  {
    buttonName : 'general_basicOverview_button4_button',
    title      : 'general_basicDatas_popup_netDebt_subtitle',
    text       : 'general_basicOverview_popup_info3_text',
  },
];

export const ValuationFactorsCellDescriptions: Record<string, InfoCellProps> = {
  'F/K': {
    header : 'general_basicOverview_popup_info4_subtitle',
    text   : 'general_basicOverview_popup_info4_text',
  },
  'F/DD': {
    header : 'general_basicOverview_popup_info5_subtitle',
    text   : 'general_basicOverview_popup_info5_text',
  },
  'FD/FAVÖK': {
    header : 'general_basicOverview_popup_info6_subtitle',
    text   : 'general_basicOverview_popup_info6_text',
  },
  'FD/Satışlar': {
    header : 'general_basicOverview_popup_info7_subtitle',
    text   : 'general_basicOverview_popup_info7_text',
  },
};

export const ValuationFactorChartColors = [
  themeColors.graph.valuationFactor.series1,
  themeColors.graph.valuationFactor.series2,
  themeColors.graph.valuationFactor.series3,
  themeColors.graph.valuationFactor.series4,
  themeColors.graph.valuationFactor.series5,
  themeColors.graph.valuationFactor.series6,
];
