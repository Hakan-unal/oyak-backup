import { useTranslation } from 'react-i18next';

import BrandLogo from '@libs/assets/images/svgs/brand-logo.svg';
import Close from '@libs/assets/images/svgs/close.svg';
import LogoutIcon from '@libs/assets/images/svgs/logout.svg';
import Button from '@libs/components/atomic/button/button';
import SidebarItem from '@libs/components/atomic/layout/sidebar-item';
import SidebarLinkItem, {
  SidebarLinkItemProps,
} from '@libs/components/atomic/layout/sidebar-link-item';

interface SidebarProps {
  menuItems: SidebarLinkItemProps[];
  showClose?: boolean;
  closeClicked?: () => void;
  logoutClicked?: () => void;
}

const Sidebar = ({
  menuItems,
  showClose,
  closeClicked,
  logoutClicked,
}: SidebarProps) => {
  const { t } = useTranslation();

  return (
    <div className='h-screen flex flex-col justify-between px-10'>
      <div className='mt-14'>
        <div className='flex flex-row items-center justify-between mb-11'>
          <div className='h-[17px] w-[162px]'>
            <BrandLogo />
          </div>
          {showClose && (
            <Button buttonType='colorless' onClick={closeClicked}>
              <Close height='32px' width='32px' />
            </Button>
          )}
        </div>

        {menuItems?.map((menuItem) => (
          <SidebarLinkItem
            Icon={menuItem.Icon}
            className='h-16 border-b-2'
            href={menuItem.href}
            includeStroke={menuItem.includeStroke}
            key={menuItem.title}
            title={t(menuItem.title)}
          />
        ))}
      </div>
      <div className='mb-4 md:mb-12 lg:mb-14'>
        <Button buttonType='colorless' onClick={logoutClicked}>
          <SidebarItem
            Icon={LogoutIcon}
            isActive={false}
            title={t('sidebar_sidebar_exit_button')}
          />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
