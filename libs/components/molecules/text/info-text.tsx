import TranslatedText, { TranslatedTextProps } from './translated-text';
import InfoIcon from '@libs/assets/images/svgs/Info.svg';
import { themeColors } from '@libs/theme/index';

interface InfoTextProps extends TranslatedTextProps {
  containerClass?: string;
}

const InfoText = ({ containerClass, ...rest }: InfoTextProps) => (
  <div className={`flex flex-row justify-start items-start ${containerClass}`}>
    <div className='h-[20] w-[20]'>
      <InfoIcon
        className='mr-2'
        fill={themeColors.basic.five}
        height='20'
        width='20'
      />
    </div>
    <TranslatedText {...rest} />
  </div>
);

export default InfoText;
