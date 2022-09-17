import React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import resetPasswordAction from "@/actions/auth/resetPassword.action";
import ButtonCustom from "@/components/widgets/ButtonCustom";
import InputCustom from "@/components/widgets/InputCoustom";
import * as controlField from "@/validators/controlField";
import * as ErrorMessage from "@/utils/function";
import { authRoutes } from "@/routes/auth.routes";
import SpinnersLoding from "@/components/widgets/SpinnersLoding";

const ResetPassword: React.FC<any> = ({ resetPasswordAction }) => {
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [displayError, setDisplayError] = React.useState(false);
  const [detailError, setDetailError] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const { password, confirmPassword } = formData;

  React.useEffect(() => {
    document.title = authRoutes.resetPassword.title;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkPassword = await controlField.passwordValidator(password, confirmPassword);

    if (checkPassword.validate) {
      setLoading(true);
      setDisabled(true);
      setDisplayError(false);
      setDetailError("");
      const res = await resetPasswordAction(uid, token, password, confirmPassword);
      if (res.error) {
        navigate("/not-found/");
      } else {
        navigate(authRoutes.resetPasswordConfirm.path);
        setDisplayError(false);
      }
    } else {
      setLoading(false);
      setDisabled(false);
      ErrorMessage.DispyalErrorMessageFrontend(setDisplayError, setDetailError, checkPassword);
    }
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
          <InputCustom
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            onChange={handleChange}
            isPasswords={true}
             value={password}
          />
          <InputCustom
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confimer mot de passe *"
            onChange={handleChange}
            isPasswords={true}
             value={confirmPassword}
          />
          <ButtonCustom nameClass={"btn-signup"} text={"Se connecter"} isDisabled={disabled} />
        </form>

        <div className="close" onClick={() => navigate(disabled ? "" : "/")}>
          <img src="/static/svg/close.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default connect(null, { resetPasswordAction })(ResetPassword);
