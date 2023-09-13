/* eslint-disable no-console */

import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { RemoteApi } from "utils/fetch.util";
import { RemoteApiPaths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";

// eslint-disable-next-line max-len
const flagText = "Cep telefonunuz kampanya kapsamında bulunmuyor.";

async function brickPaths(req: NextApiRequest, res: NextApiResponse) {
  const { query, body, method, url } = req;

  delete query.paths;

  try {
    const captchaResponse = await axios.post(
      `${process.env.CAPTCHA_VERIFY_API}?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${body.captchaToken}`,
    );

    if (!captchaResponse.data?.success) {
      return res.status(401).json({ message: "Lütfen tekrar deneyiniz" });
    }

    const appData = {
      userName : process.env.TOTAL_API_USERNAME,
      password : process.env.TOTAL_API_PASSWORD,
    };

    const { token } = await RemoteApi.post<{
      token: string;
      expiration: Date;
    }>(RemoteApiPaths.CreateToken, appData, {
      timeout             : 45000,
      timeoutErrorMessage : "Timeout of 45s exceeded",
    }).then((r) => r.data);

    req.session.token = token;
    await req.session.save();

    await RemoteApi.post(
      RemoteApiPaths.AddMyRight,
      {
        tckn                : body.tckn,
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

    const response = await RemoteApi.request({
      method,
      data    : { ...body } ?? null,
      params  : query ?? null,
      url,
      headers : {
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => r.data);

    res.status(200).json(response);
  } catch (error: any) {
    let message = "general_general_error_text";

    if (error?.response?.data) {
      if (error?.response.data.message) {
        message = error?.response.data.message;
      }

      if (message?.includes(flagText)) {
        res.status(200).json(error?.response.data);
      }
    }

    res.status(400).json(message);
  }
}

export default withIronSessionApiRoute(brickPaths, sessionOptions);
