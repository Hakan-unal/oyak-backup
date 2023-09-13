import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { sessionOptions } from '@utils/session.util';

import paths from '@routes/paths';

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.status(308).redirect(paths.LOGIN);
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
