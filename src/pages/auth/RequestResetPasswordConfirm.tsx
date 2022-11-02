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
        <h3>Réinitialisation du mot de passe envoyée</h3>
        <br />
        <p>
          Nous vous avons envoyé par email des instructions pour définir votre mot de passe, si un compte
          existe avec l'e-mail que vous avez saisi. Vous devriez les recevoir sous peu.
        </p>
        <p>
          Si vous ne recevez pas d'e-mail, assurez-vous d'avoir entré l'adresse avec laquelle vous vous êtes
          inscrit et vérifiez votre dossier spam.
        </p>
      </div>
    </ModalAuth>
  );
};

export default RequestResetPasswordConfirm;
