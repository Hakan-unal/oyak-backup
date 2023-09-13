import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

import i18n from '@libs/locales/i18n';
import { ErrorResponse } from '@libs/models/error-response.model';
import { LocalizationType } from '@libs/models/localization';

interface UseAsyncLocalizationReturn {
  isLoading: boolean;
  error: ErrorResponse | string | null;
}

const useAsyncLocalization = (enabled: boolean): UseAsyncLocalizationReturn => {
  const {
    data = {},
    isLoading,
    isSuccess,
    error,
  } = useQuery<LocalizationType, ErrorResponse | string>(
    'localization',
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_LOCALIZATION}/${i18n.language}.json`, {
          headers: {
            'Cache-Control' : 'no-cache',
            Pragma          : 'no-cache',
            Expires         : '0',
          },
        })
        .then((response) => response?.data),
    {
      enabled,
    },
  );

  const [ isInternalSetupLoading, setIsInternalSetupLoading ] = useState(true);

  const handleInternalSetupReady = () => {
    if (isInternalSetupLoading === true) {
      setIsInternalSetupLoading(false);
    }
  };

  const handlei18n = (language, localizationFile) => {
    i18n.addResourceBundle(
      language,
      'translation',
      localizationFile,
      true,
      true,
    );
  };

  if (isSuccess) {
    handlei18n(i18n.language, data);
    handleInternalSetupReady();
  }

  return { isLoading: isLoading || isInternalSetupLoading, error };
};

export default useAsyncLocalization;
