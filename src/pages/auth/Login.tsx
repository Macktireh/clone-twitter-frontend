import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ModalAuth from "@/components/auth/ModalAuth";
import InputCustom from "@/widgets/InputCustom";
import ButtonCustom from "@/widgets/ButtonCustom";
import useLogin from "@/hooks/UseLogin";
import loginAction from "@/actions/auth/login.action";
import { IAuthLogin } from "@/models";
import { authRoutes } from "@/routes/auth.routes";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";

type propsTypes = { loginAction: (isAuthenticated?: boolean) => Promise<void> };

const Login: React.FC<propsTypes> = ({ loginAction }) => {
  const [formData, setFormData] = React.useState<IAuthLogin>({
    email: process.env.REACT_APP_Email || "",
    password: process.env.REACT_APP_Password || "",
  });
  const [displayError, setDisplayError] = React.useState(false);
  const [detailError, setDetailError] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
    <ModalAuth title="Connect to Twitter Clone" loading={loading} disabled={disabled}>
      <div className="box-social-auth">
        <GoogleLoginButton text={"Login with Google"} nameClass="btn-signup-ext btn-signup" />
        <ButtonCustom
          nameClass={"btn-signup-ext"}
          pic={"/static/svg/apple.svg"}
          text={"Login with Apple"}
        />
      </div>
      <div className="sep">
        <hr />
        <span>or</span>
      </div>
      <form onSubmit={onSubmit}>
        {displayError && (
          <div className="error-auth">
            <img src="/static/svg/error.svg" alt="icon error" />
            <span>{detailError}</span>
          </div>
        )}
        <InputCustom
          id="email"
          name="email"
          type="email"
          label="Email"
          onChange={handleChange}
          value={email}
        />
        <InputCustom
          id="password"
          name="password"
          type="password"
          label="Password"
          onChange={handleChange}
          isPasswords={true}
          value={password}
        />
        <ButtonCustom nameClass={"btn-signup"} text={"Sign in"} isDisabled={disabled} />
        <div className="info">
          <h4>
            Forgot your password?<Link to={disabled ? "" : authRoutes.requestResetPassword.path}> Click here</Link>
          </h4>
          <h4>
            Don't have an account?
            <Link to={disabled ? "" : authRoutes.signup.path}> Sign up</Link>
            <br />
            <br />
          </h4>
        </div>
      </form>
    </ModalAuth>
  );
};

export default connect(null, { loginAction })(Login);
