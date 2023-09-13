import { GraphicDataRequest } from '@libs/api/oyak/api';
import { sentimentApi } from '@libs/api/services';

export const getSentimentGraphicsHandler = (params?: GraphicDataRequest) =>
  sentimentApi
    .apiSentimentGetSentimentGraphicsPost(params)
    .then((response) => response.data?.data?.list);

export const getSentimentMomentumAreasHandler = () =>
  sentimentApi
    .apiSentimentGetSentimentMomentumAreasPost()
    .then((response) => response.data?.data?.list);

export const getSentimentLastScoresHandler = (symbol?: string) =>
  sentimentApi
    .apiSentimentGetSentimentLastScoresPost(symbol)
    .then((response) => response.data?.data?.list);
