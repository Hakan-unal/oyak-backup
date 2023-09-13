import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { i18nextOptions } from './constants';

i18n.use(initReactI18next).init(i18nextOptions);

export const t = i18n.t.bind(i18n);

export default i18n;
