import { useRef } from 'react';
import { Trans } from 'react-i18next';

import Text, { TextProps } from '@libs/components/atomic/text/text';
import { DynamicType } from '@libs/models/model';

export interface TranslatedTextProps extends TextProps {
  values?: DynamicType;
  components?:
    | readonly React.ReactElement[]
    | { readonly [tagName: string]: React.ReactElement };
}

const TranslatedText = ({
  label,
  values,
  components,
  textColor,
  textVariant,
  className,
  onClick,
  ...props
}: TranslatedTextProps) => {
  const ref = useRef<DynamicType>(null);

  const handleClick = (params) => {
    if (ref?.current?.scrollHeight > ref?.current?.clientHeight) {
      onClick?.(params);
    }
  };

  return (
    <Text
      className={className}
      defaultRef={ref}
      onClick={handleClick}
      textColor={textColor}
      textVariant={textVariant}
    >
      <Trans
        components={components}
        i18nKey={label || ''}
        values={values}
        {...props}
      />
    </Text>
  );
};

export default TranslatedText;
