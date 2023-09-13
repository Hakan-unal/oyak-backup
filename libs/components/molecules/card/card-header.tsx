import { LabelHTMLAttributes, ReactElement } from 'react';

import HeaderText from '../text/header-text';
import Button, { ButtonProps } from '@libs/components/atomic/button/button';
import Card from '@libs/components/atomic/card/card';

interface CardHeaderProps extends LabelHTMLAttributes<HTMLDivElement> {
  title: string;
  showMore?: ButtonProps;
  leftSide?: ReactElement;
  rightSide?: ReactElement;
}

const CardHeader = ({
  children,
  title,
  showMore,
  leftSide,
  rightSide,
  ...rest
}: CardHeaderProps) => (
  <Card {...rest}>
    <div className='flex flex-row justify-between mb-6'>
      {leftSide || <HeaderText label={title} />}
      <div className='mr-3'>
        {rightSide ||
          (showMore && (
            <Button
              buttonColor='secondary'
              buttonType='text'
              className='font-base font-bold'
              {...showMore}
            />
          ))}
      </div>
    </div>
    {children}
  </Card>
);

export default CardHeader;
