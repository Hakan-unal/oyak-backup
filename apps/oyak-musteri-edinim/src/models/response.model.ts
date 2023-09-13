export interface ResponseModel<T> {
  isErrorOccured: boolean;
  message: string;
  code: number;
  response: T;
}
