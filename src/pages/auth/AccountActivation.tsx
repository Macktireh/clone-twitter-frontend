import * as React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import accountActivationAction from "../../actions/auth/accountActivation.action";
import { authPath } from "../../routes/auth.route";

const AccountActivation: React.FC<any> = ({ accountActivationAction }) => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const res = await accountActivationAction(uidb64, token);
      if (!res.error) {
        navigate(authPath.accountActivationSuccess);
      } else {
        navigate("/not-found/");
      }
    })();
  });

  return <div></div>;
};

export default connect(null, { accountActivationAction })(AccountActivation);
