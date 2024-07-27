import React from "react";

import ModalAuth from "@/components/auth/ModalAuth";
import { authRoutes } from "@/routes/auth.routes";

const RequestResetPasswordConfirm: React.FC = () => {
  React.useEffect(() => {
    document.title = authRoutes.requestResetPasswordConfirm.title;
  });

  return (
    <ModalAuth>
      <div className="info-auth">
        <img src="/static/svg/envelope.svg" alt="" />
        <h3>Password reset sent</h3>
        <br />
        <p>
          We have sent you an email with instructions to set your password, if an account exists with the email you entered. You should receive it shortly.
        </p>
        <p>
          If you do not receive an email, make sure you entered the address you used to sign up and check your spam folder.
        </p>
      </div>
    </ModalAuth>
  );
};

export default RequestResetPasswordConfirm;
