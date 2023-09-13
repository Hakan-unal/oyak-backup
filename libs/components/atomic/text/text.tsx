import { LegacyRef, LabelHTMLAttributes } from 'react';

import { TextVariant, TextVariantType } from './constants';

export interface TextProps extends LabelHTMLAttributes<HTMLLabelElement> {
  defaultRef?: LegacyRef<HTMLLabelElement>;
  label?: string | null;
  textColor?: string;
  textVariant?: TextVariantType;
}

const Text = ({
  defaultRef,
  label,
  textColor = 'text-basic-six',
  className,
  children,
  textVariant,
  ...props
}: TextProps) => (
  <label
    className={`${textColor} ${className} ${
      textVariant && TextVariant[textVariant]
    }`}
    ref={defaultRef}
    {...props}
  >
    {label || children}
  </label>
);

export default Text;
