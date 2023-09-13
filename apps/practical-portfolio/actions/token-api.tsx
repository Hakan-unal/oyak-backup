import { CustomerBirthdateCheckRequest } from '@libs/api/oyak/api';
import { tokenApi } from '@libs/api/services';

export const customerCheckAndSendSmsHandler = (
  params: CustomerBirthdateCheckRequest,
) =>
  tokenApi
    .apiTokenCustomerCheckAndSendSmsPost(params)
    .then((response) => response.data);

export const customerApproveSmsHandler = (reqSmsCode?: string) =>
  tokenApi
    .apiTokenCustomerApproveSmsPost(reqSmsCode)
    .then((response) => response.data);

export const sendSmsToCustomerHandler = () =>
  tokenApi.apiTokenSendSmsToCustomerPost().then((response) => response.data);

export const getCustomerInfoHandler = () =>
  tokenApi.apiTokenGetCustomerInfoPost().then((response) => response.data?.data);
