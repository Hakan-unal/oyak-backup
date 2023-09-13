import axios from 'axios';

const APP_DOMAIN = process.env.APP_DOMAIN;
const API_URL = process.env.API_URL;

export const AuthorizationHeaderKey = 'Authorization';
export const AuthorizationPrefix = 'Bearer';

const Api = (
  source: 'remote' | 'internal',
  accessToken?: string,
  throwError = true,
) => {
  const instance = axios.create();

  instance.defaults.headers.common = {
    'Content-Type' : 'application/json',
    Accept         : 'application/json',
  };

  instance.defaults.timeout =
    process.env.NODE_ENV === 'development' ? 0 : 60000;
  instance.defaults.baseURL = source === 'remote' ? API_URL : APP_DOMAIN;

  instance.interceptors.request.use((request) => {
    request.headers.Authorization = `${AuthorizationPrefix} ${accessToken}`;

    return request;
  });

  instance.interceptors.response.use((response) => {
    if (source === 'remote' && response?.data?.isErrorOccured && throwError) {
      {
        response.data;
      }
      throw new Error(response.data.message);
    }

    return response;
  });

  return instance;
};

const RemoteApi = (accessToken?: string, throwError = true) =>
  Api('remote', accessToken, throwError);

const InternalApi = Api('internal');
const locPath = process.env.LOCALIZATION_URL as string;

const getLocalizationText = () => {
  const instance = axios.create();

  instance.interceptors.request.use((config) => {
    config.headers.Authorization = undefined;

    return config;
  });

  return instance.get(locPath).then((r) => r.data);
};

const getStatus = (error) =>
  error?.response?.data?.status ||
  error?.response?.status ||
  error?.status ||
  500;

export { RemoteApi, InternalApi, getLocalizationText, getStatus };
