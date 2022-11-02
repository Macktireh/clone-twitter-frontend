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
        <h2>Réinitialisation du mot de passe terminée !</h2>
        <br />
        <p>Votre mot de passe a été bien défini. Vous pouvez continuer et vous connecter maintenant.</p>
        <br />
        <Link to={authRoutes.login.path} className="btn-login">Se connecter</Link>
      </div>
    </ModalAuth>
  );
};

export default ResetPasswordConfirm;
