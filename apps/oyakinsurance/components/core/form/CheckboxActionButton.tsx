import React from "react";
import { Link } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface Props {
  label: string;
  clickHandler: () => void;
}

const CheckboxActionButton = ({ clickHandler, label }: Props) => {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    clickHandler();
  };

  const t = useTranslations();

  return (
    <Link fontWeight="semibold" onClick={onClick}>
      {t(label)}
    </Link>
  );
};

export default CheckboxActionButton;
