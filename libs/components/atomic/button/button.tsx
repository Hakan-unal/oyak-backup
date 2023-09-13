import { ButtonHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ButtonColors,
  ButtonType,
  ButtonTypes,
  ButtonVariant,
} from './constants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  buttonType?: ButtonType;
  buttonColor?: ButtonVariant;
}

const Button = ({
  label,
  buttonType = 'button',
  buttonColor = 'primary',
  className,
  children,
  ...props
}: ButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      className={`${ButtonTypes[buttonType]} ${ButtonColors[buttonType][buttonColor]} ${className}`}
      {...props}
    >
      {label ? t(label) : children}
    </button>
  );
};

export default Button;
