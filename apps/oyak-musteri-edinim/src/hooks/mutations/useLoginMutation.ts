import { useMutation } from '@tanstack/react-query';

import useUser from '../useUser';
import { InternalApi } from '@utils/fetch.util';

import { SessionStorageKey } from '@constants/common';

export const useLoginMutation = () => {
  const { refetch } = useUser({});

  return useMutation({
    mutationFn: (nationalId: string) =>
      InternalApi.post('api/login', {
        nationalId,
      }).then((r) => r.data),
    onSuccess() {
      sessionStorage.setItem(SessionStorageKey.Session, 'true');
      refetch();
    },
    retry: 2,
  });
};
