import React from "react";
import { useLocation } from "react-router-dom";

import ModalAuth from "@/components/auth/ModalAuth";
import { authRoutes } from "@/routes/auth.routes";

const SignUpConfirm: React.FC = () => {
  const { state } = useLocation();

  React.useEffect(() => {
    document.title = authRoutes.signupConfirm.title;
  });

  return (
    <ModalAuth>
      <div className="info-auth">
        <img src="/static/svg/envelope.svg" alt="envelope" />
        <h3>Thank you for signing up for a Twitter Clone account.</h3>
        <br />
        <p>Please verify your email address to access your Twitter Clone account.</p>
        <p>
          We have sent an email to <strong>{state as string}</strong> <br /> To continue, please check your inbox and verify your email address. If you did not receive the email, please check your spam folder.
        </p>
      </div>
    </ModalAuth>
  );
};

export default SignUpConfirm;
