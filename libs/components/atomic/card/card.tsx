import { LabelHTMLAttributes } from 'react';

type CardProps = LabelHTMLAttributes<HTMLDivElement>;

const Card = ({ children, className, ...props }: CardProps) => (
  <div
    className={`w-full p-4 lg:p-6 bg-white rounded-lg  border border-gray-200 shadow ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;
