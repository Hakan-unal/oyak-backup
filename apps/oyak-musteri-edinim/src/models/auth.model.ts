interface UserStatus {
  accountStatusId: number;
  isExist?: boolean;
  nationalId?: string;
  check: boolean;
  application: boolean;
  adress: boolean;
  branch: boolean;
  create: boolean;
  kycFLow: boolean;
  saveSelection: boolean;
  contract: boolean;
  complianceTest: boolean;
  uploadDocuments: boolean;
  approve: boolean;
}
interface CheckResponse {
  customerExtId: number;
  contractId: number;
  status: UserStatus;
}
interface LoginResponse {
  isExist: boolean;
  status: UserStatus;
  message: string;
}

export type { UserStatus, CheckResponse, LoginResponse };
