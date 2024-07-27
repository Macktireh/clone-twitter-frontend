import React from "react";
import { Link } from "react-router-dom";

import { authRoutes } from "@/routes/auth.routes";
import ModalAuth from "@/components/auth/ModalAuth";

const ResetPasswordConfirm: React.FC = () => {

  React.useEffect(() => {
    document.title = authRoutes.resetPasswordConfirm.title;
  });

  return (
    <ModalAuth>
      <div className="info-auth">
        <img src="/static/svg/success.svg" alt="" />
        <br />
        <br />
        <h2>Password reset complete!</h2>
        <br />
        <p>Your password has been set successfully. You can proceed and log in now.</p>
        <br />
        <Link to={authRoutes.login.path} className="btn-login">Sign in</Link>
      </div>
    </ModalAuth>
  );
};

export default ResetPasswordConfirm;
