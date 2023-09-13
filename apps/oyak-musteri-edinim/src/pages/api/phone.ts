import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { CreateOTP } from '@utils/otp.util';
import { sessionOptions, SessionUserType } from '@utils/session.util';

async function phoneRoute(
  req: NextApiRequest,
  res: NextApiResponse<SessionUserType | { message: string }>,
) {
  const { user } = req.session;

  if (!user) {
    res.status(401).json({ message: 'İşlem zaman aşımına uğradı' });
  } else {
    const { cellPhone } = req.body;

    const otp = await CreateOTP({
      nationalId        : user.nationalId,
      mobilePhoneNumber : cellPhone,
    });

    req.session.user = { ...user, cellPhone };
    req.session.otp = { ...otp };
    await req.session.save();
    res.status(200).end();
  }
}

export default withIronSessionApiRoute(phoneRoute, sessionOptions);
