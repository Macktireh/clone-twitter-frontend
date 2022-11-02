import React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import accountActivationAction from "@/actions/auth/accountActivation.action";
import { authRoutes } from "@/routes/auth.routes";
import SpinnersLoding from "@/widgets/SpinnersLoding";

type propsTypes = { accountActivationAction: (uidb64: string, token: string) => Promise<{
  response: any;
  error: boolean;
} | undefined>};

const AccountActivation: React.FC<propsTypes> = ({ accountActivationAction }) => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = authRoutes.accountActivation.title;
    (async () => {
      const res = await accountActivationAction(uidb64 as string, token as string);
      if (res && !res.error) {
        navigate(authRoutes.accountActivationSuccess.path);
      } else {
        navigate("/not-found/");
      }
    })();
  });

  return (
    <>
      <SpinnersLoding isLoading={true} />
    </>
  );
};

export default connect(null, { accountActivationAction })(AccountActivation);
