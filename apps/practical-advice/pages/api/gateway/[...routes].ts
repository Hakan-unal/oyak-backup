import { HttpStatusCode } from 'axios';
import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  AuthorizationHeaderKey,
  AuthorizationPrefix,
  IS_COOKIE_SECURE,
} from '@libs/api/constants';
import { remoteRequest } from '@libs/api/globalAxios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DynamicType } from '@libs/models/model';
import { TokenProps } from '@libs/models/session.model';

import { COOKIE_KEYS } from 'prac-advice/constants/cookies';

async function allApiRoutes(req: NextApiRequest, res: NextApiResponse) {
  const { query, method, body, url, headers } = req;

  const authTokenCookie = getCookie(COOKIE_KEYS.AUTHORIZATION_TOKEN, {
    req,
    res,
    sameSite : 'lax',
    secure   : IS_COOKIE_SECURE,
  });

  try {
    const token: TokenProps | undefined =
      authTokenCookie && JSON.parse(authTokenCookie?.toString());

    const result = await remoteRequest(url, method, query, body, {
      ...headers,
      [AuthorizationHeaderKey]: `${AuthorizationPrefix} ${token?.accessToken.accessToken}`,
    });

    res.json(result);
  } catch (error: DynamicType) {
    const status =
      error?.response?.data?.status || error?.response?.status || error?.status;

    res.status(status || HttpStatusCode.RequestTimeout).json(error);
  }
}

export default allApiRoutes;
