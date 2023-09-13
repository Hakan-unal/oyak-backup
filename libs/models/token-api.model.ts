import { TokenResponse } from '@libs/api/oyak';

export interface CustomTokenResponse extends TokenResponse {
  sendSmsDate: Date;
  sendSmsRemainTime: number;
}
