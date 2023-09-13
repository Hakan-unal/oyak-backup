import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { getStatus, RemoteApi } from '@utils/fetch.util';
import { CreateOTP } from '@utils/otp.util';
import { type SessionUserType, sessionOptions } from '@utils/session.util';

import { Endpoints } from '@common/endpoints';
import { LoginResponse } from '@models/auth.model';
import { DynamicType } from '@models/common.model';
import { ResponseModel } from '@models/response.model';

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { nationalId } = await req.body;

  try {
    const { response } = await RemoteApi()
      .post<ResponseModel<LoginResponse> | DynamicType>(
        Endpoints.Account.Login,
        null,
        {
          params: {
            nationalId,
          },
        },
      )
      .then((r) => {
        if (r?.data?.isErrorOccured) {
          res.status(500).json({ message: (r.data as Error).message });
        }

        return r.data;
      });

    const user: SessionUserType = {
      isLoggedIn    : false, // set true after otp
      emailAddress  : '',
      nationalId    : nationalId as string,
      cellPhone     : '',
      isExist       : response.isExist,
      application   : response.status.application,
      customerExtId : '',
    };

    if (user.isExist) {
      const otp = await CreateOTP({
        nationalId        : user.nationalId,
        mobilePhoneNumber : '',
      });

      req.session.otp = { ...otp };
    }

    req.session.user = user;
    await req.session.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(getStatus(error)).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
