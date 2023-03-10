import React from "react";
import { useLocation } from 'react-router-dom';

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
        <h3>Merci de vous être inscrit à un compte Clone Twitter</h3>
        <br />
        <p>Veuillez vérifier votre adresse e-mail afin d'accéder à votre compte Clone Twitter.</p>
        <p>
          Nous avons envoyé un email à <strong>{state as string}</strong> <br /> Pour continuer, veuillez
          vérifier votre boîte de réception et vérifier votre adresse e-mail. Si vous n'avez pas reçu l'email,
          veuillez vérifier votre dossier spam.
        </p>
      </div>
    </ModalAuth>
  );
};

export default SignUpConfirm;
