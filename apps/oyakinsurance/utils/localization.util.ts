import axios from "axios";

const locPath = process.env.LOCALIZATION_URL as string;

export const getLocalizationMessages = () =>
  axios.get(locPath).then((r) => r.data);

// eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function
export function emptyErrorHandler() {}
