import Loading from '@libs/assets/images/svgs/loading.svg';

interface SpinnerProps {
  width?: number;
  height?: number;
}

const Spinner = ({ width, height }: SpinnerProps) => (
  <div className='flex justify-center'>
    <Loading height={height} width={width} />
  </div>
);

export default Spinner;
