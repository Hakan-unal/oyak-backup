import {
  BoxProps,
  CloseButton,
  Divider,
  Flex,
  Link,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import NavLink from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import useStatus from '@hooks/useStatus';

import paths from '@routes/paths';

import Button from '@components/core/Button';
import LogoutLink from '@components/core/LogoutLink';
import FileIcon from '@components/icon/File';
import HomeIcon from '@components/icon/Home';
import ProfileIcon from '@components/icon/Profile';
import InfoModal from '@components/modals/InfoModal';

import Logo from '@assets/svgs/Logo.svg';

const navList = [
  {
    title : 'general_sideBar_dashboard_button',
    path  : paths.DEFAULT,
    Icon  : HomeIcon,
  },
  {
    title : 'general_sideBar_documents_button',
    path  : paths.CONTRACTS,
    Icon  : FileIcon,
  },
  {
    title : 'general_sideBar_myProfil_button',
    path  : paths.PROFILE,
    Icon  : ProfileIcon,
  },
];

type ItemProps = (typeof navList)[0] & { exact?: boolean };

const NavigationItem: React.FC<ItemProps> = ({
  Icon,
  path,
  title,
  exact = true,
}) => {
  const { pathname } = useRouter();
  const t = useTranslations();
  const isActive = exact ? pathname === path : pathname.startsWith(path);
  const color = isActive ? 'primary.base' : 'basic.400';

  return (
    <NavLink passHref href={path} key={title}>
      <Link display='flex' flexDirection='row' gap={4} mt={2}>
        <Icon boxSize={6} fill={color} />
        <Text color={color} fontSize='16px' lineHeight='20px' pt={1}>
          {t(title)}
        </Text>
      </Link>
    </NavLink>
  );
};

interface Props extends BoxProps {
  onClose: () => void;
}

const Sidebar: React.FC<Props> = ({ onClose, ...rest }) => {
  const [ list, setList ] = useState<ItemProps[]>([]);
  const { current } = useStatus();
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const { push: navigate } = useRouter();

  useEffect(() => {
    const nList =
      Number(current) > 2
        ? [ ...navList ]
        : navList.filter((x) => x.path !== paths.CONTRACTS);

    setList(nList);
  }, [ current ]);

  const onLogout = () => {
    navigate(paths.LOGOUT);
  };

  return (
    <Flex
      bg='white'
      h='full'
      p={4}
      pl={10}
      pos='fixed'
      w={{ base: 'full', md: '320px' }}
      {...rest}
      direction='column'
      gap={4}
      justify='flex-start'
    >
      <Flex alignItems='center' h='20' justifyContent='space-between'>
        <Logo height='30' width='220' />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack
        align='start'
        divider={<Divider h={4} />}
        h='full'
        mb={{ base: 20, sm: 4 }}
      >
        {list.map((item) => (
          <NavigationItem key={item.path} {...item} />
        ))}

        <LogoutLink label='general_sideBar_logOut_button' onOpen={onOpen} />
      </VStack>

      <InfoModal
        actions={
          <>
            <Button
              label='general_general_back_button'
              onClick={onCloseModal}
              variant='secondary'
            />
            <Button
              label='general_general_okey_button'
              ml={4}
              onClick={onLogout}
              variant='primary'
            />
          </>
        }
        closeOnOverlayClick={true}
        isOpen={isOpen}
        message='Çıkış yapmak istediğinize emin misiniz?'
        onClose={onCloseModal}
        title='general_general_warning_title'
        type='info'
      />
    </Flex>
  );
};

export default Sidebar;
