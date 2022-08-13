import * as React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Input from "@/components/Input/Input";
import Button from "@/components/Buttons/buttonSubmit";
import useLogin from "@/hooks/useLogin";
import loginAction from "@/actions/auth/login.action";
import { IAuthUserLogin } from "@/models";
import { authRoutes } from "@/routes/auth.routes";

const Login: React.FC<any> = ({ loginAction }) => {
  const [formData, setFormData] = React.useState<IAuthUserLogin>({
    email: "",
    password: "",
  });
  const [displayError, setDisplayError] = React.useState(false);
  const [detailError, setDetailError] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const navigate = useNavigate();
  const customHooksLogin = useLogin;
  const { email, password } = formData;

  React.useEffect(() => {
    document.title = authRoutes.login.title;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customHooksLogin(email, password, setDisplayError, setDisabled, setDetailError, loginAction);
  };

  return (
    <div className="container-auth">
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Connectez-vous à Mack-Twitter</h2>
          {displayError && (
            <div className="error-auth">
              <img src="/static/svg/error.svg" alt="icon error" />
              <span>{detailError}</span>
            </div>
          )}
          <Input id="email" name="email" type="email" label="Email" onChange={handleChange} />
          <Input id="password" name="password" type="password" label="Mot de passe" onChange={handleChange} />
          <Button nameClass={"btn-signup"} text={"Se connecter"} isDisabled={disabled} />
          <div className="info">
            <h4>
              Mot de passe ?{" "}
              <span onClick={() => navigate(disabled ? "" : authRoutes.requestResetPassword.path)}>
                Cliquer ici
              </span>
            </h4>
            <h4>
              Vous n'avez pas de compte ?{" "}
              <span onClick={() => navigate(disabled ? "" : authRoutes.signup.path)}>Inscrivez-vous</span>
              <br />
              <br />
            </h4>
          </div>
        </form>

        <div className="close" onClick={() => navigate(disabled ? "" : "/")}>
          <img src="/static/svg/close.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default connect(null, { loginAction })(Login);
