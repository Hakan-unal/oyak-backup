import React from "react";
import { Image, ImageProps } from "@chakra-ui/react";

const OyakImageRB: React.FC<ImageProps> = (props) => (
  <Image alt="contract" mb="6" src="/or_header.png" {...props} />
);

export default OyakImageRB;
