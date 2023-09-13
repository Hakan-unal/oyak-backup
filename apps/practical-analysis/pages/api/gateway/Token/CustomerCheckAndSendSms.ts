import { HttpStatusCode } from 'axios';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

import { IS_COOKIE_SECURE } from '@libs/api/constants';
import { remoteRequest } from '@libs/api/globalAxios';
import { TokenResponseResponseData } from '@libs/api/oyak/api';
import { HTTP_STATUS } from '@libs/constants/http-status';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DynamicType } from '@libs/models/model';
import { dateDiff } from '@libs/utils/date.utils';

import { COOKIE_KEYS } from 'prac-analysis/constants/cookies';

async function customerCheckAndSendSmsApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query, method, body, url, headers } = req;

  try {
    const loginResponse: TokenResponseResponseData = await remoteRequest(
      url,
      method,
      query,
      body,
      headers,
    );

    if (loginResponse.businessSuccess) {
      const data = {
        ...loginResponse.data,
        sendSmsDate       : new Date(),
        sendSmsRemainTime : loginResponse.data?.smsExpireAt
          ? dateDiff(new Date(), loginResponse.data?.smsExpireAt)
          : 0,
      };

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
        loginResponse.businessSuccess
          ? HTTP_STATUS.OK
          : HTTP_STATUS.BAD_REQUEST,
      )
      .json(loginResponse);
  } catch (error: DynamicType) {
    const status =
      error?.response?.data?.status || error?.response?.status || error?.status;

    res.status(status || HttpStatusCode.RequestTimeout).json(error);
  }
}

export default customerCheckAndSendSmsApi;
