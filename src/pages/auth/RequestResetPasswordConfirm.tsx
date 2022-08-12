import * as React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { TAuthUserReducer } from "@/models";
import { authRoutes } from "@/routes/auth.routes";
import { tweetRoutes } from "@/routes/tweet.routes";

const RequestResetPasswordConfirm: React.FC<any> = ({ isAuthenticated }) => {
  React.useEffect(() => {
    document.title = authRoutes.requestResetPasswordConfirm.title;
  });

  if (isAuthenticated) return <Navigate to={tweetRoutes.home.path} />;

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

const mapStateToProps = (state: TAuthUserReducer) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(mapStateToProps, {})(RequestResetPasswordConfirm);
