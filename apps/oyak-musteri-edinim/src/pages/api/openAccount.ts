import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { getStatus, RemoteApi } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

import { Endpoints } from '@common/endpoints';

enum KycType {
  branch = 0,
  courier = 1,
  online = 2,
}

async function openAccountRoute(req: NextApiRequest, res: NextApiResponse) {
  const { user, token } = req.session;

  if (!user) {
    res.status(401).json({ message: 'İşlem zaman aşımına uğradı' });
  } else {
    try {
      const isUserCreated = req.body.isUserCreated;

      const kycTypeSelection = {
        kycType    : KycType[req.body.type],
        nationalId : user.nationalId,
      };

      const selectionQuery = {
        repo          : +req.body.repo,
        digitalBranch : 0,
        extreWithMail : +req.body.mail,
      };

      const response = await RemoteApi(token?.accessToken)
        .put(Endpoints.Account.KycType, null, {
          params: kycTypeSelection,
        })
        .then((r) => r.data);

      if (!isUserCreated) {
        const response = await RemoteApi(token?.accessToken)
          .post(Endpoints.Account.Create, null, {
            params: {
              nationalId: user.nationalId,
            },
          })
          .then((r) => r.data);

        req.session.user = {
          ...user,
          customerExtId: response.customerExtId,
        };

        await RemoteApi(token?.accessToken).post(
          Endpoints.Account.SaveSelection,
          {
            ...selectionQuery,
            customerExtId: response.customerExtId,
          },
        );

        await req.session.save();
      }

      res.json(response);
    } catch (error) {
      res.status(getStatus(error)).json({ message: (error as Error).message });
    }
  }
}

export default withIronSessionApiRoute(openAccountRoute, sessionOptions);
