import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { getStatus, RemoteApi } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

import { Endpoints } from '@common/endpoints';
import { CheckResponse } from '@models/auth.model';
import { ResponseModel } from '@models/response.model';

async function checkRoute(
  req: NextApiRequest,
  res: NextApiResponse<CheckResponse | { message: string }>,
) {
  const { birthdate } = req.body;
  const { user, token } = req.session;

  if (!user) {
    res.status(401).json({ message: 'İşlem zaman aşımına uğradı' });
  } else {
    try {
      const data = {
        birthdate,
        nationalId: user.nationalId,
      };

      const response = await RemoteApi(token?.accessToken)
        .post<ResponseModel<CheckResponse>>(Endpoints.Account.Check, data)
        .then((r) => r.data);

      res.json(response);
    } catch (error) {
      res.status(getStatus(error)).json({ message: (error as Error).message });
    }
  }
}

export default withIronSessionApiRoute(checkRoute, sessionOptions);
