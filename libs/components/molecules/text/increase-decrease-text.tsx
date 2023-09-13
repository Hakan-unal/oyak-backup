import TranslatedText from './translated-text';
import IncreaseDecreasePoint, {
  IncreaseDecreasePointProps,
} from '@libs/components/atomic/point/increase-decrease-point';

interface IncreaseDecreaseTextProps extends IncreaseDecreasePointProps {
  label: string;
}

const IncreaseDecreaseText = ({
  label,
  ...rest
}: IncreaseDecreaseTextProps) => (
  <div className='flex flex-row items-center py-1 sm:p-1.5 gap-2 sm:gap-3'>
    <IncreaseDecreasePoint {...rest} />
    <TranslatedText
      className='text-basic-six font-bold mr-0 sm:mr-3'
      label={label}
    />
  </div>
);

export default IncreaseDecreaseText;
