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
        <h2>Votre compte a été créé et activé avec succès !</h2>
        <br />
        <p>Vous pouvez continuer et vous connecter maintenant.</p>
        <br />
        <Link to={authRoutes.login.path} className="btn-login">Se connecter</Link>
      </div>
    </ModalAuth>
  );
};

export default AccountActivationSuccess;
