import { themeColors } from '@libs/theme/index';

export const DEFAULT_SENTIMENT = 'EREGL';

export const UNDEFINED_VALUE = 'Undefined';

export const MOMENTUM_AREA_LABEL = {
  NegativeStrongMomentum:
    'sentimentAnalysis_sentimentAnalysis_extraNegativeSide_subtitle',
  NegativeMomentum : 'sentimentAnalysis_sentimentAnalysis_negativeSide_subtitle',
  Neutral          : 'sentimentAnalysis_sentimentAnalysis_notr_subtitle',
  PositiveMomentum : 'sentimentAnalysis_sentimentAnalysis_positiveSide_subtitle',
  PositiveStrongMomentum:
    'sentimentAnalysis_sentimentAnalysis_extraPositiveSide_subtitle',
  Undefined: '',
};

export const {
  positiveStrongColor,
  positiveColor,
  neutralColor,
  negativeColor,
  negativeStrongColor,
} = themeColors.graph.sentimentAnalysis;

export const sentimentColors = [
  positiveStrongColor,
  positiveColor,
  neutralColor,
  negativeColor,
  negativeStrongColor,
];

export const pointerColors = [
  'bg-graph-sentimentAnalysis-positiveStrongColor',
  'bg-graph-sentimentAnalysis-positiveColor',
  'bg-graph-sentimentAnalysis-neutralColor',
  'bg-graph-sentimentAnalysis-negativeColor',
  'bg-graph-sentimentAnalysis-negativeStrongColor',
];
