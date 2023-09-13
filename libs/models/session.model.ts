export interface UserProps {
  customerId: string;
}

export interface TokenProps {
  accessToken: AccessTokenProps;
  refreshToken?: RefreshTokenProps;
}

interface AccessTokenProps {
  accessToken?: string;
  validMinutes: number;
  validTime?: Date;
}

interface RefreshTokenProps {
  token?: string | null;
  validMinutes?: number;
  validTime?: string;
}
