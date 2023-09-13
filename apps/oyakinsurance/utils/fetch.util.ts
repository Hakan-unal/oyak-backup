import https from "https";

import axios from "axios";

const APP_DOMAIN = process.env.APP_DOMAIN;
const API_URL = process.env.API_URL;

const Api = (source: "remote" | "internal") => {
  const instance = axios.create();
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  instance.defaults.httpsAgent = httpsAgent;
  instance.defaults.headers.common = {
    "Content-Type" : "application/json",
    Accept         : "application/json",
  };
  instance.defaults.timeout = 60000;
  instance.defaults.baseURL = source === "remote" ? API_URL : APP_DOMAIN;

  instance.interceptors.response.use(
    (response) => {
      // TODO check service response for error handling
      if (source === "internal" && response.data.isErrorOccured) {
        {
          response.data;
        }
        throw new Error(response.data.message);
      }

      return response;
    },
    (error) => Promise.reject(error),
  );

  if (process.env.NODE_ENV === "development") {
    instance.interceptors.request.use((request) => request);
  }

  return instance;
};

const RemoteApi = Api("remote");
const InternalApi = Api("internal");

export { RemoteApi, InternalApi };
