import React from "react";
import { Link } from "react-router-dom";

import { authRoutes } from "@/routes/auth.routes";

const SignUpConfirm: React.FC = () => {
  React.useEffect(() => {
    document.title = authRoutes.signupConfirm.title;
  });

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <div className="success">
          <img src="/static/svg/envelope.svg" alt="envelope" />
          <h3>Merci de vous être inscrit à un compte Clone Twitter</h3>
          <br />
          <p>Veuillez vérifier votre adresse e-mail afin d'accéder à votre compte Clone Twitter.</p>
          <p>
            Nous avons envoyé un email à <strong>abdimack97@gmail.com</strong> <br /> Pour continuer, veuillez
            vérifier votre boîte de réception et vérifier votre adresse e-mail. Si vous n'avez pas reçu
            l'email, veuillez vérifier votre dossier spam.
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

export default SignUpConfirm;
