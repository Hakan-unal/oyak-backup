// TODO(anyone):loc.key will be added
// TODO(eren.tur): Change item logo
import { SidebarLinkItemProps } from '@libs/components/atomic/layout/sidebar-link-item';

import CompareIcon from 'prac-portfolio/public/images/svgs/compare.svg';
import HomeIcon from 'prac-portfolio/public/images/svgs/home-outline.svg';
import PortfolioIcon from 'prac-portfolio/public/images/svgs/portfolio.svg';
import paths from 'prac-portfolio/routes/internal-paths';

export const SidebarMenuItems: SidebarLinkItemProps[] = [
  {
    title : 'Anasayfa',
    Icon  : HomeIcon,
    href  : paths.DASHBOARD,
  },
  {
    title         : 'Portföyler',
    Icon          : PortfolioIcon,
    href          : paths.PORTFOLIO,
    includeStroke : true,
  },
  {
    title : 'Karşılaştır',
    Icon  : CompareIcon,
    href  : paths.COMPARE,
  },
];
