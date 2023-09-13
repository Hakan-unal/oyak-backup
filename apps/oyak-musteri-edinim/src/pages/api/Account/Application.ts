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
      const data = {
        ...req.body,
        cellPhone: user.cellPhone,
      };

      const { ...applicationData } = data;

      const response = await RemoteApi(token?.accessToken)
        .post(Endpoints.Account.Application, applicationData)
        .then((r) => r.data);

      // await RemoteApi().post(Endpoints.Account.Iys, {
      //   cellPhone : user.cellPhone,
      //   email     : data.emailAddress,
      //   iysCallCenter,
      //   iysEmail,
      //   iysSms,
      // });

      req.session.user = { ...user, application: true };
      await req.session.save();
      res.json(response);
    } catch (error) {
      res.status(getStatus(error)).json({ message: (error as Error).message });
    }
  }
}

export default withIronSessionApiRoute(applicationRoute, sessionOptions);
