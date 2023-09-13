import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { getStatus, RemoteApi } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

async function allRoutes(req: NextApiRequest, res: NextApiResponse) {
  const { query, body, method, url } = req;
  const { user, token } = req.session;

  if (!user) {
    res.status(401).json({ message: 'İşlem zaman aşımına uğradı' });
  } else {
    try {
      const response = await RemoteApi(token?.accessToken)
        .request({
          method,
          data   : body ?? null,
          params : query ?? null,
          url,
        })
        .then((r) => r.data);

      res.json(response);
    } catch (error) {
      res.status(getStatus(error)).json({ message: (error as Error).message });
    }
  }
}

export default withIronSessionApiRoute(allRoutes, sessionOptions);
