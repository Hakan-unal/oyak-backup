import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { getStatus, RemoteApi } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

import { Endpoints } from '@common/endpoints';
import { UserStatus } from '@models/auth.model';
import { ResponseModel } from '@models/response.model';

const initialStatus: UserStatus = {
  approve         : false,
  check           : false,
  application     : false,
  accountStatusId : 0,
  branch          : false,
  adress          : false,
  saveSelection   : false,
  create          : false,
  kycFLow         : false,
  complianceTest  : false,
  contract        : false,
  uploadDocuments : false,
};

async function statusRoute(req: NextApiRequest, res: NextApiResponse) {
  const { user, token } = req.session;

  if (!user) {
    res.status(401).json({ message: 'İşlem zaman aşımına uğradı' });
  } else {
    try {
      const response = await RemoteApi(token?.accessToken)
        .get<ResponseModel<UserStatus>>(Endpoints.Account.Status)
        .then((r) => {
          if (r.data.isErrorOccured && r.data.code === 417) {
            r.data.code = 200;
            r.data.isErrorOccured = false;
            r.data.response = { ...initialStatus };
          }

          return r.data;
        });

      res.json(response);
    } catch (error) {
      res.status(getStatus(error)).json({ message: (error as Error).message });
    }
  }
}

export default withIronSessionApiRoute(statusRoute, sessionOptions);
