import React from "react";
import { Link, useNavigate } from "react-router-dom";

import ButtonCustom from "@/components/widgets/ButtonCustom";
import { authRoutes } from "@/routes/auth.routes";

const ResetPasswordConfirm: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = authRoutes.resetPasswordConfirm.title;
  });

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <div className="success">
          <img src="/static/svg/success.svg" className="icon-success" alt="" />
          <br />
          <br />
          <h2>Réinitialisation du mot de passe terminée !</h2>
          <br />
          <p>Votre mot de passe a été bien défini. Vous pouvez continuer et vous connecter maintenant.</p>
          <br />
          <ButtonCustom
            nameClass={"btn-signin btn-success"}
            text={"Se connecter"}
            handleClick={() => navigate(authRoutes.login.path)}
          />
        </div>
        <Link to="/">
          <div className="close">
            <img src="/static/svg/close.svg" alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
