import { Method } from 'axios';

export type ErrorReason =
  | 'CREDENTIALS_NOT_VALID'
  | 'UNAUTHORIZED_USER'
  | 'USER_ACCOUNT_LOCKED'
  | 'USER_PASSWORD_EXPIRED'
  | 'OTP_REQUIRED'
  | 'OTP_CONFIRMATION_FAILED'
  | 'BAD_REQUEST'
  | 'INACTIVE_USER'
  | 'UNSUCCESSFUL_LOGIN_WITH_COUNT'
  | 'USER_MUST_CHANGE_PASSWORD'
  | 'USER_ACCOUNT_IN_BLACKLIST';

export type ErrorResponse = {
  status: number;
  reason: ErrorReason;
  message: string;
  error: string;
  method: Method | undefined;
};
