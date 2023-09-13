import { withIronSessionSsr } from "iron-session/next";

import { SuccessCard } from "components/response/success";

import { getLocalizationMessages } from "utils/localization.util";
import { sessionOptions } from "utils/session.util";
import { paths } from "utils/page.util";

const TotalInsuranceSuccessPage = () => (
  <SuccessCard
    isHideCloseButton
    subtitle="transaction_transaction_successfulMessage_text"
    title="general_transaction_successful_subtitle"
  />
);

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  let response: any = {
    props: {
      messages : await getLocalizationMessages(),
      userId   : req.session.user?.tckn || "no user data",
    },
  };

  if (!req.session.token) {
    response = {
      redirect: {
        destination: paths.home,
      },
    };
  }

  return response;
}, sessionOptions);
export default TotalInsuranceSuccessPage;
