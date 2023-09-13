import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { CreateOTP } from '@utils/otp.util';
import { sessionOptions, SessionUserType } from '@utils/session.util';

async function phoneRoute(
  req: NextApiRequest,
  res: NextApiResponse<SessionUserType | { message: string }>,
) {
  const { user, otp } = req.session;

  if (!user) {
    res.status(401).json({ message: 'İşlem zaman aşımına uğradı' });
  } else {
    if (otp && otp?.attempt > 0) {
      const resendDate = new Date(otp?.resendAt ?? 0);
      const now = new Date();
      const duration = Math.ceil((resendDate.getTime() - now.getTime()) / 1000);

      if (duration < 1) {
        const newOtp = await CreateOTP({
          nationalId        : user.nationalId,
          mobilePhoneNumber : user.cellPhone,
        });

        req.session.otp = { ...newOtp, attempt: otp.attempt - 1 };
      }
    }

    await req.session.save();
    res.status(200).end();
  }
}

export default withIronSessionApiRoute(phoneRoute, sessionOptions);
