import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { COOKIE_KEYS } from 'prac-advice/constants/cookies';
import paths from 'prac-advice/routes/internal-paths';

const Index = () => {
  const { push } = useRouter();
  const authToken = getCookie(COOKIE_KEYS.AUTHORIZATION_TOKEN);

  useEffect(() => {
    push(authToken ? paths.DASHBOARD : paths.LOGIN);
  }, [ authToken, push ]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default Index;
