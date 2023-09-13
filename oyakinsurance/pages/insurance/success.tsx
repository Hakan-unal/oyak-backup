import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";

import { SuccessCard } from "components/response/success";

import { getLocalizationMessages } from "utils/localization.util";
import { messageToNative } from "utils/native.util";
import { paths } from "utils/page.util";
import { sessionOptions } from "utils/session.util";

const Success = () => {
  const {
    query: { message },
  } = useRouter();

  const clickHandler = () => {
    messageToNative("redirect");
  };

  return (
    <SuccessCard
      buttonName="general_transaction_homepage_button"
      onClick={clickHandler}
      subtitle={
        (message as string | undefined) || "general_transaction_successful_text"
      }
      title="general_transaction_successful_subtitle"
    />
  );
};

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
export default Success;
