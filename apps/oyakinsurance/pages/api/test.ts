/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from "next";
import { object, string } from "yup";
import { withIronSessionApiRoute } from "iron-session/next";

import { RemoteApi } from "utils/fetch.util";
import { RemoteApiPaths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";

const modelSchema = object().shape({
  userName  : string().required(),
  password  : string().required(),
  tckn      : string(),
  fullName  : string(),
  gsm       : string(),
  birthDate : string(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 01.02.2023 comment TODO  (should revert)

  const { body } = req;
  // TODO(anyone): Must be open when prod deploy
  const isDevelopment = true; // process.env.NODE_ENV === "development";

  if (isDevelopment) {
    await modelSchema.validate(body);

    try {
      const appData = {
        userName : body.userName,
        password : body.password,
      };

      const { token } = await RemoteApi.post<{
        token: string;
        expiration: Date;
      }>(RemoteApiPaths.CreateToken, appData, {
        timeout             : 180000,
        timeoutErrorMessage : "Timeout of 180s exceeded",
      }).then((r) => r.data);

      console.log("Token : ", token);

      req.session.user = {
        tckn      : body?.tckn,
        fullName  : body?.fullName,
        gsm       : body?.gsm,
        birthDate : body?.birthDate,
      };
      req.session.token = token;

      const products = await RemoteApi.get(RemoteApiPaths.Products, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((r) => r.data);

      console.log("Products : ", products);

      req.session.accessProducts = products?.map(
        (product: any) => product.name,
      );
      await req.session.save();
      res.status(200).send("Success");
    } catch (error: any) {
      console.log("err", error);

      let errors: any = null;

      if (error?.errors) {
        errors = error.errors;
      } else if (error.code === "ECONNABORTED") {
        errors = [ error.config.timeoutErrorMessage ];
      } else if (error.code === "ENOTFOUND") {
        errors = [ "Main server not responding" ];
      } else if (error.response?.data.errors) {
        errors = error.response.data.errors;
      }

      res.status(200).send({ errors });
    }
  } else {
    res.status(401).end("Not Allowed");
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
