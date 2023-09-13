import type { IronSessionOptions } from 'iron-session';

const SECURE = process.env.COOKIE_SECURE === 'true';

export interface SessionUserType {
  nationalId: string;
  cellPhone: string;
  emailAddress: string;
  isLoggedIn: boolean;
  isExist?: boolean;
  application?: boolean;
  customerExtId?: string;
}

export interface SessionOtpType {
  uid: string;
  attempt: number;
  resendAt: Date;
}

export interface SessionTokenType {
  accessToken: string;
  expiration: string;
}

const MAX_AGE = process.env.NODE_ENV === 'development' ? 30 : 10;

const duration = () => {
  const maxAge = 60 * MAX_AGE;
  const expires = new Date(maxAge * 1000);

  return {
    expires,
    maxAge,
  };
};

export const sessionOptions: IronSessionOptions = {
  cookieName    : 'session',
  password      : process.env.COOKIE_SECRET as string,
  cookieOptions : {
    ...duration(),
    secure: SECURE,
  },
};
declare module 'iron-session' {
  interface IronSessionData {
    user?: SessionUserType;
    otp?: SessionOtpType;
    token?: SessionTokenType;
  }
}
