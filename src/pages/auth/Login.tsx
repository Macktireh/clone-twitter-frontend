import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import InputCustom from "@/widgets/InputCustom";
import ButtonCoustom from "@/widgets/ButtonCustom";
import useLogin from "@/hooks/useLogin";
import loginAction from "@/actions/auth/login.action";
import { IAuthUserLogin } from "@/models";
import { authRoutes } from "@/routes/auth.routes";
import SpinnersLoding from "@/widgets/SpinnersLoding";

const Login: React.FC<any> = ({ loginAction }) => {
  const [formData, setFormData] = React.useState<IAuthUserLogin>({
    email: "abdimack97@gmail.com",
    password: "Charco@97",
  });
  const [displayError, setDisplayError] = React.useState(false);
  const [detailError, setDetailError] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
    customHooksLogin(email, password, setLoading, setDisplayError, setDisabled, setDetailError, loginAction);
  };

  return (
    <div className="container-auth">
      <SpinnersLoding isLoading={loading} nameClass={loading ? "" : "displayNone"} />
      <div className="modal-auth">
        <form onSubmit={onSubmit}>
          <h2>Connectez-vous à Mack-Twitter</h2>
          {displayError && (
            <div className="error-auth">
              <img src="/static/svg/error.svg" alt="icon error" />
              <span>{detailError}</span>
            </div>
          )}
          <InputCustom id="email" name="email" type="email" label="Email" onChange={handleChange} value={email} />
          <InputCustom
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            onChange={handleChange}
            value={password}
          />
          <ButtonCoustom nameClass={"btn-signup"} text={"Se connecter"} isDisabled={disabled} />
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
