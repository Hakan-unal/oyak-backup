export const paths = {
  home             : "/",
  mobile           : "/insurance/mobile",
  mobileForm       : "/insurance/mobile/form",
  mobileOffer      : "/insurance/mobile/offer",
  mobilePayment    : "/insurance/mobile/payment",
  pet              : "/insurance/pet",
  petOffer         : "/insurance/pet/offer",
  petScope         : "/insurance/pet/scope",
  petForm          : "/insurance/pet/form",
  success          : "/insurance/success",
  fail             : "/insurance/fail",
  paymentfailed    : "/insurance/payment_failed",
  healthylife      : "/insurance/healthylife",
  healthylifeForm  : "/insurance/healthylife/form",
  healthylifeScope : "/insurance/healthylife/scope",
  bes              : "/insurance/bes",
  besForm          : "/insurance/bes/form",
  besScope         : "/insurance/bes/scope",
  total            : {
    root    : "/insurance/total-sigorta",
    form    : "/insurance/total-sigorta/form",
    success : "/insurance/total-sigorta/success",
    fail    : "/insurance/total-sigorta/fail",
  },
};

export const RemoteApiPaths = {
  CreateToken       : "/api/Account/CreateToken",
  Cep               : "/api/Brick/CEP",
  Bes               : "/api/Brick/BES",
  Kskl              : "/api/Brick/KSKL",
  Pet               : "/api/Brick/PET",
  FKS               : "/api/Brick/FKS",
  GetContracts      : "/api/Contract/GetContracts",
  LeadReport        : "/api/Lead/GetLeadReport",
  Offers            : "/api/Offer/GetOffers",
  BuyContract       : "/api/Payment/BuyContract",
  RedirectUrl       : "/api/Payment/GetRedirectUrl",
  CheckPaymenStatus : "/api/Payment/CheckPaymentStatus",
  Products          : "/api/Product/GetProducts",
  Statistics        : "/api/Statistics/GetStatistics",
  AddMyRight        : "/api/CustomerRights/AddMyRight",
};

export const getRedirectedRoute = (selection: string) => {
  switch (selection) {
    case "mobile":
      return paths.mobile;
    case "pet":
      return paths.pet;
    case "healthylife":
      return paths.healthylife;
    case "bes":
      return paths.bes;
    case "totalkasko":
      return paths.total;
    default:
      return paths.home;
  }
};
