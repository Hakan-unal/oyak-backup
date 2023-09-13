import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { getStatus, RemoteApi } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

import { Endpoints } from '@common/endpoints';

async function applicationRoute(req: NextApiRequest, res: NextApiResponse) {
  const { user, token } = req.session;

  if (!user) {
    res.status(401).json({ message: 'İşlem zaman aşımına uğradı' });
  } else {
    try {
      const params = req.body;

      const response = await RemoteApi(token?.accessToken, false)
        .post(Endpoints.Address.IsAddressValid, null, {
          params,
        })
        .then((r) => {
          if (r.data.isErrorOccured && r.data.code === 404) {
            r.data.code = 200;
            r.data.isErrorOccured = false;
          }

          return r.data;
        });

      res.json(response);
    } catch (error) {
      res.status(getStatus(error)).json({ message: (error as Error).message });
    }
  }
}

export default withIronSessionApiRoute(applicationRoute, sessionOptions);
