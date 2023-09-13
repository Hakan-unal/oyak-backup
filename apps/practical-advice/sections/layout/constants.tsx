import DailySignalIcon from '@libs/assets/images/svgs/daily-signal.svg';
import HomeIcon from '@libs/assets/images/svgs/home-outline.svg';
import HourlySignalIcon from '@libs/assets/images/svgs/hourly-signal.svg';
import PairsTradeIcon from '@libs/assets/images/svgs/pairs-trade.svg';
import { SidebarLinkItemProps } from '@libs/components/atomic/layout/sidebar-link-item';

import paths from 'prac-advice/routes/internal-paths';

export const SidebarMenuItems: SidebarLinkItemProps[] = [
  {
    title : 'sidebar_sidebar_mainPage_button',
    Icon  : HomeIcon,
    href  : paths.DASHBOARD,
  },
  {
    title         : 'sidebar_sidebar_hourlySigns_button',
    Icon          : HourlySignalIcon,
    href          : paths.HOURLY_SIGNAL,
    includeStroke : true,
  },
  {
    title         : 'sidebar_sidebar_dailySigns_button',
    Icon          : DailySignalIcon,
    href          : paths.DAILY_SIGNAL,
    includeStroke : true,
  },
  {
    title         : 'sidebar_sidebar_pairsTrade_button',
    Icon          : PairsTradeIcon,
    href          : paths.PAIRS_TRADE,
    includeStroke : true,
  },
];
