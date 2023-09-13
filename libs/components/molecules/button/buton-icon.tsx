import { ReactNode } from 'react';

import TranslatedText from '../text/translated-text';
import { ButtonProps } from '@libs/components/atomic/button/button';

export interface ButtonIconProps extends ButtonProps {
  buttonPossition?: string;
  icon?: ReactNode;
  textClassName?: string;
  buttonClassName?: string;
  textColor?: string;
}

const IconButton = ({
  label,
  textClassName,
  buttonClassName,
  icon,
  textColor,
  ...props
}: ButtonIconProps) => (
  <button className={buttonClassName} {...props}>
    <TranslatedText
      className={textClassName}
      label={label}
      textColor={textColor}
    />
    {icon}
  </button>
);

export default IconButton;
