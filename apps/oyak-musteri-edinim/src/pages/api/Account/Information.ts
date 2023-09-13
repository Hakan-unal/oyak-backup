import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { AccountInfo } from '@hooks/queries/useAccountQueries';
import { getStatus, RemoteApi } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

import { Endpoints } from '@common/endpoints';
import { ResponseModel } from '@models/response.model';

async function applicationRoute(req: NextApiRequest, res: NextApiResponse) {
  const { user, token } = req.session;

  if (!user) {
    res.status(401).json({ message: 'İşlem zaman aşımına uğradı' });
  } else {
    try {
      const { response } = await RemoteApi(token?.accessToken)
        .get<ResponseModel<AccountInfo>>(Endpoints.Account.Information)
        .then((r) => r.data);

      req.session.user = {
        ...user,
        customerExtId: response?.account?.customerExtId,
      };
      await req.session.save();

      res.json(response);
    } catch (error) {
      res.status(getStatus(error)).json({ message: (error as Error).message });
    }
  }
}

export default withIronSessionApiRoute(applicationRoute, sessionOptions);
