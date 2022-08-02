import * as React from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import Input from "../../components/Input/Input";
import Button from "../../components/Buttons/buttonSubmit";

import useLogin from "../../hooks/auth/useLogin";

import { ILogin, IState } from "../../interfaces";

import login from "../../actions/auth/login.action";

const Login: React.FC<any> = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = React.useState<ILogin>({
    email: "",
    password: "",
  });
  const [displayError, setDisplayError] = React.useState(false);

  const customHooksLogin = useLogin;

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customHooksLogin(email, password, setDisplayError, login);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Connectez-vous à Mack-Twitter</h2>
          {displayError ? (
            <div className="error-auth">
              <img src="/static/svg/error.svg" alt="icon error" />
              <span>Adresse email ou mot de passe incorrect</span>
            </div>
          ) : null}
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            onChange={handleChange}
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            onChange={handleChange}
          />
          <Button nameClass={"btn-signup"} text={"Se connecter"} />
          <div className="info">
            <h4>
              Mot de passe ?{" "}
              <Link to="/auth/password/reset/send-email/">
                <span>Cliquer ici</span>
              </Link>
            </h4>
            <h4>
              Vous n'avez pas de compte ?{" "}
              <Link to="/auth/signup/">
                <span>Inscrivez-vous</span>
              </Link>
            </h4>
          </div>
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

export default connect(mapStateToProps, { login })(Login);
