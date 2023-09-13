/* eslint-disable no-console */
import { withIronSessionSsr } from "iron-session/next";

import { Fail } from "components/response/failed";
import { SuccessCard } from "components/response/success";

import { RemoteApi } from "utils/fetch.util";
import { getLocalizationMessages } from "utils/localization.util";
import { messageToNative } from "utils/native.util";
import { paths, RemoteApiPaths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";

interface Props {
  error?: any;
  paymentGuid: string;
  created: Date;
  redirectUrl: string;
  paymentStatus: string;
}

const PaymentCheck = (props: Props) => {
  const { paymentStatus, redirectUrl, paymentGuid } = props;

  const clickHandler = () => {
    messageToNative("redirect");
  };

  return paymentStatus === "Failure" ? (
    <Fail paymentGuid={paymentGuid} tryAgainUrl={redirectUrl} />
  ) : (
    <SuccessCard
      buttonName="general_transaction_homepage_button"
      onClick={clickHandler}
      subtitle="general_transaction_successful_text"
      title="general_transaction_successful_subtitle"
    />
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  query,
}) {
  const { guid } = query;
  let serverResponse: any;
  let response: any;

  if (!req.session.user) {
    response = {
      redirect: {
        destination: paths.home,
      },
    };

    return response;
  }

  try {
    // wait for 1 seconds
    await new Promise((r) => setTimeout(r, 1000));

    serverResponse = await RemoteApi.post(
      RemoteApiPaths.CheckPaymenStatus,
      null,
      {
        headers: {
          Authorization: `Bearer ${req.session.token}`,
        },
        params: { paymentGuid: guid },
      },
    ).then((r) => r.data);
    response = {
      props: {
        ...serverResponse,
        messages : await getLocalizationMessages(),
        userId   : req.session.user?.tckn || "no user data",
      },
    };
  } catch (error) {
    console.log(error);

    // serverResponse.error = error;
  }

  return response;
},
sessionOptions);

export default PaymentCheck;
