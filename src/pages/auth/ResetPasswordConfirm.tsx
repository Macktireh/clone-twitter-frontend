import React from "react";
import { connect } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Button from "@/components/Buttons/buttonSubmit";
import { TAuthUserReducer } from "@/models";
import { authRoutes } from "@/routes/auth.routes";
import { tweetRoutes } from "@/routes/tweet.routes";

const ResetPasswordConfirm: React.FC<any> = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = authRoutes.resetPasswordConfirm.title;
  });

  if (isAuthenticated) return <Navigate to={tweetRoutes.home.path} />;

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
          <Button
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

const mapStateToProps = (state: TAuthUserReducer) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(mapStateToProps, {})(ResetPasswordConfirm);
