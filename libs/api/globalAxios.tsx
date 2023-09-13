/* eslint-disable max-params */
import globalAxios from 'axios';

import {
  AuthorizationHeaderKey,
  SERVICE_TIMEOUT,
  WhiteListPath,
} from '@libs/api/constants';
import { IsDevelopment } from '@libs/constants/common';

const ApiTag = '/api';
const GatewayTag = '/gateway';
const FinnetTag = '/HisseAnalizAPI';

globalAxios.interceptors.request.use(function (config) {
  const isIncludeWhiteListPath = WhiteListPath.some((path) =>
    config.url?.includes(path),
  );

  if (!config.url || isIncludeWhiteListPath) {
    return config;
  }

  if (!config.url.includes(GatewayTag)) {
    if (config.url.includes(FinnetTag)) {
      config.url = ApiTag + GatewayTag + config.url;
    } else {
      config.url = config.url
        ?.replace('http://localhost', '')
        ?.replace(ApiTag, ApiTag + GatewayTag);
    }
  }

  return config;
});

export const remoteRequest = (url, method, query, body, headers) => {
  let requestUrl = url?.replace(GatewayTag, '');
  let isFinnetRequest = false;

  if (url.includes(FinnetTag)) {
    isFinnetRequest = true;
    requestUrl = requestUrl?.replace(ApiTag, '');
  }

  return globalAxios
    .create()
    .request({
      method,
      headers: {
        accept                   : headers.accept,
        'content-type'           : headers['content-type'],
        'accept-encoding'        : headers['accept-encoding'],
        'accept-language'        : headers['accept-language'],
        [AuthorizationHeaderKey] : headers[AuthorizationHeaderKey],
      },
      data    : body ?? null,
      params  : query ?? null,
      baseURL : isFinnetRequest
        ? process.env.NEXT_PUBLIC_FINNET_API_URL
        : process.env.NEXT_PUBLIC_OYAK_API_URL,
      url     : requestUrl,
      timeout : IsDevelopment ? 0 : SERVICE_TIMEOUT,
    })
    .then((r) => r.data);
};
