import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { getStatus, RemoteApi } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

import { Endpoints } from '@common/endpoints';

async function applicationRoute(req: NextApiRequest, res: NextApiResponse) {
  const { query, body, method } = req;
  const { user, token } = req.session;

  if (!user) {
    res.status(401).json({ message: 'İşlem zaman aşımına uğradı' });
  } else {
    try {
      const body_params = body;
      const query_params = query;

      const response = await RemoteApi(token?.accessToken)
        .request({
          method,
          data   : body_params ?? null,
          params : query_params ?? null,
          url    : Endpoints.Account.Address,
        })
        .then((r) => r.data);

      res.json(response);
    } catch (error) {
      res.status(getStatus(error)).json({ message: (error as Error).message });
    }
  }
}

export default withIronSessionApiRoute(applicationRoute, sessionOptions);
