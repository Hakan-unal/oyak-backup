import { SidebarLinkItemProps } from '@libs/components/atomic/layout/sidebar-link-item';

import HomeIcon from 'prac-analysis/public/images/svgs/home-outline.svg';
import ResearchedShareIcon from 'prac-analysis/public/images/svgs/researched-share.svg';
import SentimentAnalysisIcon from 'prac-analysis/public/images/svgs/sentiment-analysis.svg';
import UnResearchedShareIcon from 'prac-analysis/public/images/svgs/unresearched-share.svg';
import paths from 'prac-analysis/routes/internal-paths';

export const SidebarMenuItems: SidebarLinkItemProps[] = [
  {
    title : 'sidebar_sidebar_mainPage_button',
    Icon  : HomeIcon,
    href  : paths.DASHBOARD,
  },
  {
    title : 'sidebar_sidebar_sharesCoveredByTheResearch_button',
    Icon  : ResearchedShareIcon,
    href  : paths.RESEARCHED_SHARE,
  },
  {
    title : 'sidebar_sidebar_sharesNotCoveredByTheResearch_button',
    Icon  : UnResearchedShareIcon,
    href  : paths.UNRESEARCHED_SHARE,
  },

  {
    title : 'sidebar_sidebar_sentimentAnalysis_button',
    Icon  : SentimentAnalysisIcon,
    href  : paths.SENTIMENT_ANALYSIS,
  },
];

export const INSTEAD_OF_NULL_SHARE_VALUE = '-';
