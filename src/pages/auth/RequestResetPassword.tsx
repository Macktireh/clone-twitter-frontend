import * as React from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { TauthState } from "../../interfaces";
import requestResetPasswordActiond from "../../actions/auth/requestResetPassword.action";
import Button from "../../components/Buttons/buttonSubmit";
import Input from "../../components/Input/Input";
import { authPath } from "../../routes/auth.route";

const RequestResetPassword: React.FC<any> = ({ requestResetPasswordActiond, isAuthenticated }) => {
  const [email, setEmail] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    const res = await requestResetPasswordActiond(email);
    navigate(authPath.requestResetPasswordConfirm);
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Réinitialisation du mot de passe</h2>
          <p style={{ textAlign: "center" }}>
            Mot de passe oublié ? Entrez votre adresse email ci-dessous et si votre adresse email
            existe, nous vous enverrons par e-mail des instructions pour en définir une nouvelle.
          </p>
          <Input id="email" name="email" type="email" label="Email" onChange={handleChange} />
          <Button nameClass={"btn-signup"} text={"Envoyer"} isDisabled={disabled} />
        </form>

        <div className="close" onClick={() => navigate(disabled ? "" : "/")}>
          <img src="/static/svg/close.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: TauthState) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(mapStateToProps, { requestResetPasswordActiond })(RequestResetPassword);
