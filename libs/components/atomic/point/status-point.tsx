import { SizeVariants, StatusPointSize } from './constants';

interface StatusPointProps {
  size: StatusPointSize;
  color: string;
}

const StatusPoint = ({ size, color }: StatusPointProps) => (
  <div className={`${SizeVariants[size]} rounded-full ${color}`} />
);

export default StatusPoint;
