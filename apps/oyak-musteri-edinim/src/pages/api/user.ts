import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { sessionOptions, SessionUserType } from '@utils/session.util';

function userRoute(req: NextApiRequest, res: NextApiResponse<SessionUserType>) {
  if (req.session.user) {
    res.json({
      ...req.session.user,
    });
  } else {
    res.json({
      isLoggedIn    : false,
      emailAddress  : '',
      nationalId    : '',
      cellPhone     : '',
      customerExtId : '',
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
