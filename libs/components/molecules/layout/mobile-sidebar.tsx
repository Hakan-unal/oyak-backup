import { useRouter } from 'next/router';

import TranslatedText from '../text/translated-text';
import SidebarMenu from '@libs/assets/images/svgs/sidebar-menu.svg';
import Button from '@libs/components/atomic/button/button';
import { SidebarLinkItemProps } from '@libs/components/atomic/layout/sidebar-link-item';

interface MobileSidebarProps {
  menuItems: SidebarLinkItemProps[];
  openClicked?: () => void;
}

const MobileSidebar = ({ menuItems, openClicked }: MobileSidebarProps) => {
  const { pathname } = useRouter();

  const activeMenuItem: SidebarLinkItemProps | undefined = menuItems.find(
    (menuItem) =>
      menuItem.exact
        ? pathname === menuItem.href
        : pathname.startsWith(menuItem.href.toString()),
  );

  return (
    <div className='flex flex-row items-center gap-2'>
      <Button buttonType='colorless' className='left-4' onClick={openClicked}>
        <SidebarMenu />
      </Button>
      <div className='flex justify-center w-full'>
        <TranslatedText
          className='text-2xl font-bold text-center'
          label={activeMenuItem?.title}
        />
      </div>
    </div>
  );
};

export default MobileSidebar;
