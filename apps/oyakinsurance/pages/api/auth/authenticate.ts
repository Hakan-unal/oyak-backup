import { unsealData } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions, SessionUserType } from "utils/session.util";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { selection },
    headers: { authtoken },
  } = req;

  const password = process.env.COOKIE_SECRET as string;

  const data = await unsealData<{
    user: SessionUserType;
    token: string;
    accessProducts: any;
  }>(authtoken as string, { password });

  req.session.user = data.user;
  req.session.token = data.token;
  req.session.accessProducts = data.accessProducts;
  await req.session.save();
  res.status(200).redirect(`/?selection=${selection}`);
}

export default withIronSessionApiRoute(handler, sessionOptions);
