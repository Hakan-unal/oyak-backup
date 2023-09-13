import Image from 'next/image';

import TranslatedText, { TranslatedTextProps } from './translated-text';
import Text, { TextProps } from '@libs/components/atomic/text/text';

interface HeaderTextProps extends TextProps, TranslatedTextProps {
  symbolName?: string | null;
  iconLink?: string | null;
  hasViop?: boolean | null;
}

const SymbolWithIconText = ({
  symbolName,
  iconLink,
  hasViop,
  textColor = 'text-basic-six',
  className = 'text-xl font-bold',
}: HeaderTextProps) => (
  <div className='flex flex-row justify-center items-center gap-3'>
    {!!iconLink && (
      <Image
        alt='symbol'
        className='rounded-full'
        height={32}
        src={iconLink}
        width={32}
      />
    )}
    <Text className={className} label={symbolName!} textColor={textColor} />
    {hasViop === true && (
      <TranslatedText
        className='bg-basic-three rounded px-1 py-0.5 text-xs'
        label='general_general_viop_label'
      />
    )}
  </div>
);

export default SymbolWithIconText;
