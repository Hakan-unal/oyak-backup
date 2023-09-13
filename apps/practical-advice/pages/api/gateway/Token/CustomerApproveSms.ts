import { HttpStatusCode } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  AuthorizationHeaderKey,
  AuthorizationPrefix,
  IS_COOKIE_SECURE,
} from '@libs/api/constants';
import { remoteRequest } from '@libs/api/globalAxios';
import { TokenResponse } from '@libs/api/oyak/api';
import { HTTP_STATUS } from '@libs/constants/http-status';
import { DynamicType } from '@libs/models/model';

import { COOKIE_KEYS } from 'prac-advice/constants/cookies';

async function customerApproveSmsApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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
    const otpResponse: DynamicType = await remoteRequest(
      url,
      method,
      query,
      body,
      {
        ...headers,
        [AuthorizationHeaderKey]: `${AuthorizationPrefix} ${loginResponse?.accessToken}`,
      },
    );

    if (otpResponse.businessSuccess) {
      const data = otpResponse.data;

      setCookie(
        COOKIE_KEYS.AUTHORIZATION_TOKEN,
        {
          accessToken: {
            accessToken  : data?.accessToken as string,
            validMinutes : data?.validMinutes as number,
            validTime    : data?.validTime ? new Date(data?.validTime) : undefined,
          },
          refreshToken: data?.refreshToken,
        },
        {
          req,
          res,
          sameSite : 'lax',
          secure   : IS_COOKIE_SECURE,
        },
      );

      deleteCookie(COOKIE_KEYS.LOGIN_RESPONSE, {
        req,
        res,
        sameSite : 'lax',
        secure   : IS_COOKIE_SECURE,
      });
    }

    res
      .status(
        otpResponse.businessSuccess ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST,
      )
      .json(otpResponse);
  } catch (error: DynamicType) {
    const status =
      error?.response?.data?.status || error?.response?.status || error?.status;

    res.status(status || HttpStatusCode.RequestTimeout).json(error);
  }
}

export default customerApproveSmsApi;
