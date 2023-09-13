import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { ResponseModel } from '@hooks/queries/response.model';
import { getStatus, RemoteApi } from '@utils/fetch.util';
import { sessionOptions, SessionTokenType } from '@utils/session.util';

import { Endpoints } from '@common/endpoints';

async function otpConfirmRoute(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  const { user, otp, token } = req.session;

  if (!user) {
    res.status(401).json({ message: 'İşlem zaman aşımına uğradı' });
  } else {
    try {
      const otpResponse = await RemoteApi(token?.accessToken)
        .post<ResponseModel<SessionTokenType>>(Endpoints.Common.ConfirmOTP, {
          id   : otp?.uid,
          code : body.otp,
        })
        .then((r) => r.data);

      if (otpResponse.response) {
        req.session.user = {
          ...user,
          isLoggedIn: true,
        };
        req.session.token = otpResponse.response;

        await req.session.save();
        res.status(200).json({});
      } else {
        res.json(otpResponse);
      }
    } catch (error) {
      res.status(getStatus(error)).json({ message: (error as Error).message });
    }
  }
}

export default withIronSessionApiRoute(otpConfirmRoute, sessionOptions);
