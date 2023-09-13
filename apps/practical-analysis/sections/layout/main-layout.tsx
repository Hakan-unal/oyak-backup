import { getCookie } from 'cookies-next';
import HighchartsLib from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import StockChart from 'highcharts/modules/stock';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import MobileSidebar from '@libs/components/molecules/layout/mobile-sidebar';
import Sidebar from '@libs/components/molecules/layout/sidebar';
import useModal from '@libs/hooks/useModal';

import { SidebarMenuItems } from './constants';
import Footer from './footer';
import { COOKIE_KEYS } from 'prac-analysis/constants/cookies';
import { useSession } from 'prac-analysis/contexts/session.context';
import paths from 'prac-analysis/routes/internal-paths';

const MainLayout = ({ children }) => {
  const { push, pathname } = useRouter();
  const { AlertModal, confirmAlert, closeModal } = useModal();
  const { logout } = useSession();
  const [ mobileSidebarView, setMobileSidebarView ] = useState(true);
  const authToken = getCookie(COOKIE_KEYS.AUTHORIZATION_TOKEN);

  useEffect(() => {
    if (!authToken) {
      push({ pathname: paths.LOGIN, query: { returnUrl: pathname } });
    }
  }, [ authToken, pathname, push ]);

  useEffect(() => {
    if (mobileSidebarView) {
      setMobileSidebarView(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ pathname ]);

  useEffect(() => {
    HighchartsMore(HighchartsLib);
    SolidGauge(HighchartsLib);
    StockChart(HighchartsLib);
  }, []);

  const handleLogout = () => {
    confirmAlert({
      text          : 'sidebar_sidebar_logOut_text',
      approveButton : {
        label       : 'sidebar_sidebar_exit_button',
        buttonType  : 'button',
        buttonColor : 'primary',
        onClick     : logout,
      },
      cancelButton: {
        label       : 'general_general_giveUp_button',
        buttonType  : 'button',
        buttonColor : 'secondary',
        onClick     : closeModal,
      },
    });

    setMobileSidebarView(false);
  };

  if (!authToken) {
    return null;
  }

  return (
    <>
      <div
        className={`w-full h-screen ${
          mobileSidebarView ? 'block' : 'hidden'
        } lg:hidden`}
      >
        <Sidebar
          showClose
          closeClicked={() => setMobileSidebarView(false)}
          logoutClicked={handleLogout}
          menuItems={SidebarMenuItems}
        />
      </div>
      <div
        className={`min-h-screen flex flex-row overflow-x-visible ${
          mobileSidebarView ? 'hidden' : 'block'
        }`}
      >
        <div className='sticky h-screen min-w-sidebar top-0 hidden lg:block'>
          <Sidebar logoutClicked={handleLogout} menuItems={SidebarMenuItems} />
        </div>
        <div className='w-full flex flex-col justify-between bg-basic-one sm:bg-background-main overflow-x-hidden'>
          <div className='w-full block lg:hidden py-6 px-5 bg-basic-one'>
            <MobileSidebar
              menuItems={SidebarMenuItems}
              openClicked={() => setMobileSidebarView(true)}
            />
          </div>
          <div className='px-0 sm:px-4 xl:px-16 pt-0 sm:pt-4 xl:pt-16'>
            {children}
          </div>
          <Footer />
        </div>
      </div>
      <AlertModal />
    </>
  );
};

export default MainLayout;
