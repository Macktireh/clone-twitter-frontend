import React from "react";
import { Link } from "react-router-dom";

import ModalAuth from "@/components/auth/ModalAuth";
import { authRoutes } from "@/routes/auth.routes";

const AccountActivationSuccess: React.FC = () => {
  React.useEffect(() => {
    document.title = authRoutes.accountActivationSuccess.title;
  });

  return (
    <ModalAuth>
      <div className="info-auth">
        <img src="/static/svg/success.svg" alt="" />
        <br />
        <br />
        <h2>Your account has been created and activated successfully!</h2>
        <br />
        <p>You can proceed and log in now.</p>
        <br />
        <Link to={authRoutes.login.path} className="btn-login">Sign in</Link>
      </div>
    </ModalAuth>
  );
};

export default AccountActivationSuccess;
