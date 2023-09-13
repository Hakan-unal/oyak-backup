/* eslint-disable no-console */
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "utils/session.util";
import { RemoteApi } from "utils/fetch.util";
import { RemoteApiPaths } from "utils/page.util";

async function allRoutes(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { user, token } = req.session;

  if (!token || !user) {
    res.status(401).json({ message: "Not Allowed" });
  } else {
    try {
      const response = await RemoteApi.post(
        RemoteApiPaths.BuyContract,
        {},
        {
          params  : body,
          headers : {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((r) => r.data);

      res.status(200).json(response);
    } catch (error: any) {
      console.log({ data: error });

      res.status(400).json({ message: (error as Error).message });
    }
  }
}

export default withIronSessionApiRoute(allRoutes, sessionOptions);
