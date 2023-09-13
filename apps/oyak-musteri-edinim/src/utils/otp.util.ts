import { RemoteApi } from './fetch.util';

import { Endpoints } from '@common/endpoints';
import { ResponseModel } from '@models/response.model';

interface Model {
  nationalId: string;
  mobilePhoneNumber: string;
}

const add_minutes = (dt: Date, minutes: number) =>
  new Date(dt.getTime() + minutes * 60000);

export const CreateOTP = async (model: Model) => {
  const response = await RemoteApi()
    .post<ResponseModel<string>>(Endpoints.Common.GenerateOTP, model)
    .then((r) => r.data);

  return {
    attempt  : 3,
    uid      : response.response,
    resendAt : add_minutes(new Date(), 2),
  };
};
