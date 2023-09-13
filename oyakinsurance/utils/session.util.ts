import { CookieSerializeOptions, serialize } from "cookie";
import type { IronSessionOptions } from "iron-session";
import { NextApiResponse } from "next";

const SECURE = process.env.COOKIE_SECURE === "true";

export interface SessionUserType {
  tckn: string;
  fullName: string;
  gsm: string;
  birthDate: string;
}

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {},
) => {
  const stringValue =
    typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

  if (typeof options.maxAge === "number") {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }

  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

const duration = () => {
  const maxAge = 60 * 60 * 24;
  const expires = new Date(maxAge * 1000);

  return {
    expires,
    maxAge,
  };
};

export const sessionOptions: IronSessionOptions = {
  cookieName    : "session",
  password      : process.env.COOKIE_SECRET as string,
  cookieOptions : {
    ...duration(),
    secure: SECURE,
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: SessionUserType;
    token: string;
    accessProducts: Array<any>;
    productTypes: any;
  }
}
