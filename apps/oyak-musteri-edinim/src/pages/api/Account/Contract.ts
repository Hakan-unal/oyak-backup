import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { getStatus, RemoteApi } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

import { Endpoints } from '@common/endpoints';

const requestIp = require('request-ip');

async function applicationRoute(req: NextApiRequest, res: NextApiResponse) {
  const { query, body, method } = req;
  const { user, token } = req.session;

  if (!user) {
    res.status(401).json({ message: 'İşlem zaman aşımına uğradı' });
  } else {
    try {
      const params = {
        ...query,
        customerExtId: user.customerExtId,
      };

      const bodyParams = {
        ...body,
        customerExtId : user.customerExtId,
        ipAddress     : requestIp.getClientIp(req),
      };

      const response = await RemoteApi(token?.accessToken)
        .request({
          method,
          data   : bodyParams ?? null,
          params : params ?? null,
          url    : Endpoints.Account.Contract,
        })
        .then((r) => r.data);

      res.json(response);
    } catch (error) {
      res.status(getStatus(error)).json({ message: (error as Error).message });
    }
  }
}

export default withIronSessionApiRoute(applicationRoute, sessionOptions);
