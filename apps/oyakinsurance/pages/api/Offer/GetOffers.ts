/* eslint-disable no-console */
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { RemoteApi } from "utils/fetch.util";
import { RemoteApiPaths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";

async function allRoutes(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { brickGuid },
  } = req;

  const { user, token } = req.session;

  if (!token || !user) {
    res.status(401).json({ message: "Not Allowed" });
  } else {
    try {
      const response = await RemoteApi.get(RemoteApiPaths.Offers, {
        params: {
          brickGuid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((r) => r.data);

      res.status(200).json(response);
    } catch (error: any) {
      let message = "";

      if (error.response?.data) {
        message = error.response?.data?.message;
      } else {
        message = (error as Error).message;
      }

      const status =
        error?.response?.data?.status ||
        error?.response?.status ||
        error?.status;

      res.status(status || 400).json({ message });
    }
  }
}

export default withIronSessionApiRoute(allRoutes, sessionOptions);
