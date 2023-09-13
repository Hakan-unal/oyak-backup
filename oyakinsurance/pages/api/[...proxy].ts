/* eslint-disable no-console */
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "utils/session.util";
import { RemoteApi } from "utils/fetch.util";

async function allRoutes(req: NextApiRequest, res: NextApiResponse) {
  const { query, body, method, url } = req;
  const { user, token } = req.session;

  delete query.proxy;

  if (!token || !user) {
    res.status(401).json({ message: "Not Allowed" });
  } else {
    try {
      const response = await RemoteApi.request({
        method,
        data    : body ?? null,
        params  : query ?? null,
        url,
        headers : {
          Authorization: `Bearer ${token}`,
        },
      }).then((r) => r.data);

      res.status(200).json(response);
    } catch (error: any) {
      console.log(error);

      let message;

      if (error?.response.data) {
        message = error?.response.data.message;
      } else {
        message = (error as Error).message;
      }

      res.status(400).json({ message });
    }
  }
}

export default withIronSessionApiRoute(allRoutes, sessionOptions);
