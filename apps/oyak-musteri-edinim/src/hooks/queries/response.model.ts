type ResponseModel<T> = {
  isErrorOccured: boolean;
  message: string | null;
  code: number;
  response: T;
};

export type { ResponseModel };
