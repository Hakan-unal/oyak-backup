import 'ag-grid-community/styles/ag-grid.css';

import { useRouter } from 'next/router';

import TranslatedText from '../text/translated-text';
import BackIcon from '@libs/assets/images/svgs/back.svg';
import Button from '@libs/components/atomic/button/button';

interface BreadcrumbProps {
  label: string;
  prevPath?: string;
  className?: string;
}

const Breadcrumb = ({ label, prevPath, className }: BreadcrumbProps) => {
  const { back, replace } = useRouter();

  const handleNavigation = (): void => {
    if (prevPath) {
      replace(prevPath);

      return;
    }

    back();
  };

  return (
    <Button
      buttonType='colorless'
      className={`flex flex-row items-center justify-start gap-3 ${className}`}
      onClick={handleNavigation}
    >
      <BackIcon />
      <TranslatedText label={label} />
    </Button>
  );
};

export default Breadcrumb;
