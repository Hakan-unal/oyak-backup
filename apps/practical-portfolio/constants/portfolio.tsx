import { DynamicType } from '@libs/models/model';

import HighRiskPortfolioIcon from 'prac-portfolio/public/images/svgs/high-risk-portfolio.svg';
import LowRiskPortfolioIcon from 'prac-portfolio/public/images/svgs/low-risk-portfolio.svg';
import MediumRiskPortfolioIcon from 'prac-portfolio/public/images/svgs/medium-risk-portfolio.svg';

export enum PortfolioTypeEnum {
  LowRisk = 'LowRisk',
  MediumRisk = 'MediumRisk',
  HighRisk = 'HighRisk',
}

export type PortfolioType =
  | PortfolioTypeEnum.LowRisk
  | PortfolioTypeEnum.MediumRisk
  | PortfolioTypeEnum.HighRisk;

export const PortfolioTypeIcons: Record<PortfolioType, DynamicType> = {
  LowRisk    : LowRiskPortfolioIcon,
  MediumRisk : MediumRiskPortfolioIcon,
  HighRisk   : HighRiskPortfolioIcon,
};
