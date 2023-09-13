/* eslint-disable max-len */
import { Icon, IconProps } from "@chakra-ui/react";
import React from "react";

const ZoomIcon: React.FC<IconProps> = (props) => (
  <Icon height="24" viewBox="0 0 24 24" width="24" {...props}>
    <path d="M21.707 20.293L17.168 15.754C18.311 14.306 19 12.483 19 10.5C19 5.813 15.187 2 10.5 2C5.813 2 2 5.813 2 10.5C2 15.187 5.813 19 10.5 19C12.484 19 14.306 18.312 15.754 17.168L20.293 21.707C20.488 21.902 20.744 22 21 22C21.256 22 21.512 21.902 21.707 21.707C22.098 21.316 22.098 20.684 21.707 20.293ZM4 10.5C4 6.916 6.916 4 10.5 4C14.084 4 17 6.916 17 10.5C17 14.084 14.084 17 10.5 17C6.916 17 4 14.084 4 10.5Z" />
  </Icon>
);

export default ZoomIcon;
