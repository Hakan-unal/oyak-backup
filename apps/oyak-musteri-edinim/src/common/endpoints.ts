const Common = {
  Branches                : '/api/Common/Branches',
  Occupations             : '/api/Common/Occupations',
  Questions               : '/api/Common/GetQuestions',
  Counties                : '/api/Common/GetCountryList',
  GenerateOTP             : '/api/Common/GenerateOtp',
  ConfirmOTP              : '/api/Common/ConfirmOtp',
  GetMukimlikVergiNoNeden : '/api/Common/GetMukimlikVergiNoNeden',
};

const Address = {
  Cities         : '/api/Address/Cities',
  Districts      : '/api/Address/Districts',
  Neighborhoods  : '/api/Address/Neighborhoods',
  Streets        : '/api/Address/Streets',
  Apartments     : '/api/Address/Apartments',
  Flats          : '/api/Address/Flats',
  IsAddressValid : '/api/Address/IsAddressValid',
};

const Account = {
  Login              : '/api/Account/Login',
  Check              : '/api/Account/Check',
  Status             : '/api/Account/Status',
  Application        : '/api/Account/Application',
  Contract           : '/api/Account/Contract',
  Branch             : '/api/Account/Branch',
  UploadDocuments    : '/api/Account/UploadDocuments',
  Information        : '/api/Account/Information',
  ComplianceTest     : '/api/Account/ComplianceTest',
  Address            : '/api/Account/Address',
  GetCustomerAddress : '/api/Account/GetCustomerAddresses',
  Iys                : '/api/Account/Iys',
  KycType            : '/api/Account/KycType',
  SaveSelection      : '/api/Account/SaveSelection',
  Create             : '/api/Account/Create',
  SecurityQuestion   : '/api/Account/SecurityQuestion',
  GetSecurityAnswer  : '/api/Account/GetSecurityAnswer',
  Approve            : '/api/Account/Approve',
  CourierAddress     : '/api/Account/CourierAddress',
};

const Contract = {
  ApproveOtherContracts : '/api/Contract/ApproveOtherContracts',
  List                  : '/api/Contract/List',
};

const Test = {
  ComplianceTest: '/api/Test/ComplianceTest',
};

const KYC = {
  create: '/api/Kyc/Create',
};

const Profile = {
  SaveSelection: '/api/saveSelection',
};

export const Endpoints = {
  Common,
  Address,
  Account,
  Test,
  KYC,
  Contract,
  Profile,
};
