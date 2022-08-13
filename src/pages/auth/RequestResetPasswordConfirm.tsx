import * as React from "react";
import { Link } from "react-router-dom";

import { authRoutes } from "@/routes/auth.routes";

const RequestResetPasswordConfirm: React.FC<any> = () => {
  React.useEffect(() => {
    document.title = authRoutes.requestResetPasswordConfirm.title;
  });

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <div className="success">
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
        <Link to="/">
          <div className="close">
            <img src="/static/svg/close.svg" alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RequestResetPasswordConfirm;
