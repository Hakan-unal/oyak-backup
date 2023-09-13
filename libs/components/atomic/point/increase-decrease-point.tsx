import {
  IncreaseDecreaseType,
  SizeVariants,
  StatusPointSize,
} from './constants';
import ArrowCross from '@libs/assets/images/svgs/arrow-cross.svg';

export interface IncreaseDecreasePointProps {
  pointType: IncreaseDecreaseType;
  size?: StatusPointSize;
}

const IncreaseDecreasePoint = ({
  pointType,
  size = '4xl',
}: IncreaseDecreasePointProps) => {
  const increasing = pointType === 'increase';

  return (
    <div
      className={`${SizeVariants[size]} flex justify-center items-center rounded-full bg-basic-two border-basic-three border-2`}
    >
      {pointType !== '' && (
        <div className={`${increasing ? 'rotate-0' : 'rotate-90'}`}>
          <ArrowCross
            className={`stroke-2 ${
              increasing ? 'stroke-green-dark' : 'stroke-primary-dark'
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default IncreaseDecreasePoint;
