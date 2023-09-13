/* eslint-disable no-console */
import { sealData } from "iron-session";
import type { NextApiRequest, NextApiResponse } from "next";
import { object, string } from "yup";

import { RemoteApi } from "utils/fetch.util";
import { RemoteApiPaths } from "utils/page.util";

const modelSchema = object().shape({
  tckn      : string(),
  fullName  : string(),
  gsm       : string(),
  birthDate : string(),
  password  : string().required(),
  userName  : string().required(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method === "POST") {
    try {
      const data = await modelSchema.validate(body);

      const user = {
        tckn      : data.tckn,
        fullName  : data.fullName,
        gsm       : data.gsm,
        birthDate : data.birthDate,
      };

      const appData = { userName: data.userName, password: data.password };

      const { token } = await RemoteApi.post<{
        token: string;
        expiration: Date;
      }>(RemoteApiPaths.CreateToken, appData, {
        timeout             : 45000,
        timeoutErrorMessage : "Timeout of 45s exceeded",
      }).then((r) => r.data);

      const products = await RemoteApi.get(RemoteApiPaths.Products, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((r) => r.data);

      const accessProducts = products?.map((product: any) => product.name);
      const password = process.env.COOKIE_SECRET as string;

      const sealed = await sealData(
        { user, token, accessProducts },
        { password },
      );

      res.status(200).json({
        authtoken: sealed,
      });
    } catch (error: any) {
      console.log(error);
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

export default handler;
