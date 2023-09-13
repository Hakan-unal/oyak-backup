import { deleteCookie } from 'cookies-next';

import { COOKIE_KEYS } from 'prac-advice/constants/cookies';

export const logoutCookie = () => deleteCookie(COOKIE_KEYS.AUTHORIZATION_TOKEN);
