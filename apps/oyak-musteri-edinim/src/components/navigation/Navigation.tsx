import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Header } from './Header';
import Sidebar from './Sidebar';

import paths from '@routes/paths';

const Navigation = () => {
  const [ currentPath, setCurrentPath ] = useState('');
  const { events } = useRouter();
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    events.on('routeChangeComplete', () => onClose());

    return () => {
      events.on('routeChangeComplete', () => onClose());
    };
  }, [ events, onClose ]);

  useEffect(() => {
    let pathname = 'general_sideBar_dashboard_button';

    if (router.pathname.includes(paths.PROFILE)) {
      pathname = 'general_sideBar_myProfil_button';
    }

    if (router.pathname.includes(paths.CONTRACTS)) {
      pathname = 'general_sideBar_documents_button';
    }

    setCurrentPath(pathname);
  }, [ router.pathname ]);

  return (
    <Box>
      <Sidebar display={{ base: 'none', md: 'flex' }} onClose={onClose} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        onClose={onClose}
        onOverlayClick={onClose}
        placement='left'
        returnFocusOnClose={false}
        size='full'
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Header
        currentPath={currentPath}
        display={{ base: 'flex', md: 'none' }}
        onOpen={onOpen}
      />
    </Box>
  );
};

export default Navigation;
