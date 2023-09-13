/* eslint-disable no-console */

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { RemoteApi } from "utils/fetch.util";
import { RemoteApiPaths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";

// eslint-disable-next-line max-len
const flagText = "Cep telefonunuz kampanya kapsamında bulunmuyor.";

async function brickPaths(req: NextApiRequest, res: NextApiResponse) {
  const { query, body, method, url } = req;
  const { user, token } = req.session;

  delete query.paths;

  if (!token || !user) {
    res.status(401).json({ message: "Not Allowed" });
  } else {
    try {
      await RemoteApi.post(
        RemoteApiPaths.AddMyRight,
        {
          tckn                : body.tckn || user?.tckn,
          callCenter          : true,
          email               : true,
          sms                 : true,
          explicitConsentText : true,
          legalInformation    : true,
          fibaEmeklilik       : true,
          katılımEmeklilik    : true,
          brokerAuthorization : true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((r) => r.data);

      let data = body;

      if (user) {
        data = { ...user, ...body };
      }

      console.log("Data : ", data);

      const response = await RemoteApi.request({
        method,
        data,
        params  : query ?? null,
        url,
        headers : {
          Authorization: `Bearer ${token}`,
        },
      }).then((r) => r.data);

      res.status(200).json(response);
    } catch (error: any) {
      let message;

      if (error?.response.data) {
        message = error?.response.data.message;

        if (message?.includes(flagText)) {
          res.status(200).json(error?.response.data);
        }
      } else {
        message = (error as Error).message;
      }

      res.status(400).json(message);
    }
  }
}

export default withIronSessionApiRoute(brickPaths, sessionOptions);
