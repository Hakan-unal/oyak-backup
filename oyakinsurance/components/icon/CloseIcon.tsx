/* eslint-disable max-len */
import { Icon, IconProps } from "@chakra-ui/react";
import React from "react";

const CloseIcon: React.FC<IconProps> = (props) => (
  <Icon
    height="32"
    viewBox="0 0 32 32"
    width="32"
    {...props}
    transform="rotate(180deg)"
  >
    <path
      d="M15.9999 17.4L9.2332 24.1667C9.05543 24.3444 8.82787 24.4387 8.55054 24.4493C8.27231 24.4609 8.0332 24.3667 7.8332 24.1667C7.6332 23.9667 7.5332 23.7333 7.5332 23.4667C7.5332 23.2 7.6332 22.9667 7.8332 22.7667L14.5999 16L7.8332 9.23333C7.65543 9.05555 7.5612 8.82755 7.55054 8.54933C7.53898 8.27199 7.6332 8.03333 7.8332 7.83333C8.0332 7.63333 8.26654 7.53333 8.5332 7.53333C8.79987 7.53333 9.0332 7.63333 9.2332 7.83333L15.9999 14.6L22.7665 7.83333C22.9443 7.65555 23.1723 7.56088 23.4505 7.54933C23.7279 7.53866 23.9665 7.63333 24.1665 7.83333C24.3665 8.03333 24.4665 8.26666 24.4665 8.53333C24.4665 8.79999 24.3665 9.03333 24.1665 9.23333L17.3999 16L24.1665 22.7667C24.3443 22.9444 24.4385 23.172 24.4492 23.4493C24.4608 23.7275 24.3665 23.9667 24.1665 24.1667C23.9665 24.3667 23.7332 24.4667 23.4665 24.4667C23.1999 24.4667 22.9665 24.3667 22.7665 24.1667L15.9999 17.4Z"
      fill="#2C2C2C"
    />
  </Icon>
);

export default CloseIcon;
