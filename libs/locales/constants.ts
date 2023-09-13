import { InitOptions } from 'i18next';

export const i18nextOptions: InitOptions = {
  lng               : 'tr',
  fallbackLng       : 'en',
  supportedLngs     : [ 'tr', 'en' ],
  defaultNS         : 'translation',
  resources         : {},
  returnEmptyString : false,
  interpolation     : {
    escapeValue: false,
  },
};
