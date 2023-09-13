import Button from '@libs/components/atomic/button/button';
import Card from '@libs/components/atomic/card/card';

import PortfolioSummaryInfo, {
  PortfolioSummaryInfoProps,
} from './portfolio-summary-info';

interface PortfolioSummaryInfoCardProps extends PortfolioSummaryInfoProps {
  buttonName: string;
  onButtonClick?: () => void;
}

const PortfolioSummaryInfoCard = ({
  buttonName,
  onButtonClick,
  showInfoIcon,
  ...rest
}: PortfolioSummaryInfoCardProps) => (
  <Card>
    <PortfolioSummaryInfo showInfoIcon={showInfoIcon || true} {...rest} />
    <Button
      className='sm:w-full mt-6'
      label={buttonName}
      onClick={onButtonClick}
    />
  </Card>
);

export default PortfolioSummaryInfoCard;
