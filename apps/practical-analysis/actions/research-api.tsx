import { GetResearchFilesRequest } from '@libs/api/oyak/api';
import { researchApi } from '@libs/api/services';

export const getResearchGetBulletinFilesHandler = () =>
  researchApi
    .apiResearchGetBulletinFilesPost()
    .then((response) => response.data?.data?.bulletinList);

export const getResearchFilesHandler = (params?: GetResearchFilesRequest) =>
  researchApi
    .apiResearchGetResearchFilesPost(params)
    .then((response) => response.data?.data?.researchFileList);

export const getCommentOfDayHandler = () =>
  researchApi
    .apiResearchGetCommentOfDayPost()
    .then((response) => response.data?.data);
