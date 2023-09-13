import { Trans } from 'react-i18next';

import { TranslatedTextProps } from './translated-text';
import Text, { TextProps } from '@libs/components/atomic/text/text';
import { DynamicType } from '@libs/models/model';

interface HeaderTextProps extends TextProps, TranslatedTextProps {
  applyTranslate?: boolean;
  values?: DynamicType;
  components?:
    | readonly React.ReactElement[]
    | { readonly [tagName: string]: React.ReactElement };
}

const HeaderText = ({
  applyTranslate = true,
  label,
  values,
  components,
  textColor = 'text-basic-six',
  className = 'text-base sm:text-lg font-bold',
  ...props
}: HeaderTextProps) => (
  <Text className={className} textColor={textColor}>
    {applyTranslate ? (
      <Trans
        components={components}
        i18nKey={label!}
        values={values}
        {...props}
      />
    ) : (
      label
    )}
  </Text>
);

export default HeaderText;
