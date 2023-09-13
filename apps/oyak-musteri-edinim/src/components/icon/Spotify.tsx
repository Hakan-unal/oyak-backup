import { Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

const Spotify: React.FC<IconProps> = (props) => (
  <Icon height='36' viewBox='0 0 24 24' width='36' {...props}>
    <path
      // eslint-disable-next-line max-len
      d='M9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.1625 1.5 9 1.5ZM11.8125 12.4875C10.05 11.4 7.8375 11.175 5.2125 11.775C4.95 11.85 4.725 11.6625 4.65 11.4375C4.575 11.175 4.7625 10.95 4.9875 10.875C7.8375 10.2375 10.3125 10.5 12.2625 11.7C12.525 11.8125 12.5625 12.1125 12.45 12.3375C12.3 12.5625 12.0375 12.6375 11.8125 12.4875ZM12.5625 10.4625C10.5375 9.225 7.4625 8.85 5.1 9.6C4.8 9.675 4.4625 9.525 4.3875 9.225C4.3125 8.925 4.4625 8.5875 4.7625 8.5125C7.5 7.6875 10.875 8.1 13.2 9.525C13.425 9.6375 13.5375 10.0125 13.35 10.275C13.1625 10.5375 12.825 10.65 12.5625 10.4625ZM4.725 7.3125C4.35 7.425 3.975 7.2 3.8625 6.8625C3.75 6.4875 3.975 6.1125 4.3125 6C6.975 5.2125 11.3625 5.3625 14.1375 7.0125C14.475 7.2 14.5875 7.65 14.4 7.9875C14.2125 8.25 13.7625 8.3625 13.425 8.175C11.025 6.75 7.0125 6.6 4.725 7.3125Z'
    />
  </Icon>
);

export default Spotify;