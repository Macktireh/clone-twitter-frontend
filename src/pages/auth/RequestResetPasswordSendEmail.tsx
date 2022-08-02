import * as React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import requestResetPasswordSendEmail from "../../actions/auth/requestResetPasswordSendEmail.action";
import Button from "../../components/Buttons/buttonSubmit";
import Input from "../../components/Input/Input";
import { IState } from "../../interfaces";

const RequestResetPasswordSendEmail: React.FC<any> = ({
  requestResetPasswordSendEmail,
  isAuthenticated,
}) => {
  const [email, setEmail] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await requestResetPasswordSendEmail(email);
    !res.error ? setRedirect(true) : setRedirect(true);
  };

  if (redirect) return <Navigate to="/" />;
  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Réinitialisation du mot de passe</h2>
          <p style={{ textAlign: "center" }}>
            Mot de passe oublié ? Entrez votre adresse email ci-dessous et si
            votre adresse email existe, nous vous enverrons par e-mail des
            instructions pour en définir une nouvelle.
          </p>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            onChange={handleChange}
          />
          <Button nameClass={"btn-signup"} text={"Envoyer"} />
        </form>

        <Link to="/">
          <div className="close">
            <img src="/static/svg/close.svg" alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

type TauthState = { userReducer: IState };

const mapStateToProps = (state: TauthState) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(mapStateToProps, { requestResetPasswordSendEmail })(
  RequestResetPasswordSendEmail
);
