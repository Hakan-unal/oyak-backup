import { HttpStatusCode } from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  AuthorizationHeaderKey,
  AuthorizationPrefix,
  IS_COOKIE_SECURE,
} from '@libs/api/constants';
import { remoteRequest } from '@libs/api/globalAxios';
import { TokenResponse, TokenResponseResponseData } from '@libs/api/oyak/api';
import { HTTP_STATUS } from '@libs/constants/http-status';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DynamicType } from '@libs/models/model';
import { dateDiff } from '@libs/utils/date.utils';

import { COOKIE_KEYS } from 'prac-portfolio/constants/cookies';

async function sendSmsToCustomerApi(req: NextApiRequest, res: NextApiResponse) {
  const { query, method, body, url, headers } = req;

  const loginResponseCookie = getCookie(COOKIE_KEYS.LOGIN_RESPONSE, {
    req,
    res,
    sameSite : 'lax',
    secure   : IS_COOKIE_SECURE,
  });

  const loginResponse: TokenResponse =
    loginResponseCookie && JSON.parse(loginResponseCookie?.toString());

  try {
    const sendSmsResponse: TokenResponseResponseData = await remoteRequest(
      url,
      method,
      query,
      body,
      {
        ...headers,
        [AuthorizationHeaderKey]: `${AuthorizationPrefix} ${loginResponse?.accessToken}`,
      },
    );

    const data = {
      ...sendSmsResponse.data,
      sendSmsDate       : new Date(),
      sendSmsRemainTime : sendSmsResponse.data?.smsExpireAt
        ? dateDiff(new Date(), sendSmsResponse.data?.smsExpireAt)
        : 0,
    };

    if (sendSmsResponse.businessSuccess) {
      setCookie(
        COOKIE_KEYS.LOGIN_RESPONSE,
        {
          ...data,
        },
        {
          req,
          res,
          sameSite : 'lax',
          secure   : IS_COOKIE_SECURE,
        },
      );
    }

    res
      .status(
        sendSmsResponse.businessSuccess
          ? HTTP_STATUS.OK
          : HTTP_STATUS.BAD_REQUEST,
      )
      .json({ ...sendSmsResponse, data });
  } catch (error: DynamicType) {
    const status =
      error?.response?.data?.status || error?.response?.status || error?.status;

    res.status(status || HttpStatusCode.RequestTimeout).json(error);
  }
}

export default sendSmsToCustomerApi;
