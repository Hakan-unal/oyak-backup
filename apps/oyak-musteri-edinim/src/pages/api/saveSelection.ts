import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { getStatus, RemoteApi } from '@utils/fetch.util';
import { sessionOptions } from '@utils/session.util';

import { Endpoints } from '@common/endpoints';

async function saveSelectionRoute(req: NextApiRequest, res: NextApiResponse) {
  const { user, token } = req.session;

  try {
    const selectionQuery = {
      repo          : +req.body.repo,
      digitalBranch : 0,
      extreWithMail : +req.body.mail,
    };

    await RemoteApi(token?.accessToken).post(Endpoints.Account.SaveSelection, {
      ...selectionQuery,
      customerExtId: user?.customerExtId,
    });

    await req.session.save();
  } catch (error) {
    res.status(getStatus(error)).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(saveSelectionRoute, sessionOptions);
